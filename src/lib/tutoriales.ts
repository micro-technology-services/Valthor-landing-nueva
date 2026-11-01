// Tutorials (/tutoriales): loading, ordering, body transforms, related
// tutorials and JSON-LD. Content lives in src/content/tutoriales/*.md and
// the authoring guide is src/content/tutoriales/README.md.
//
// The Markdown is rendered by Astro's loader (entry.rendered.html) and then
// enriched here with plain string transforms, so the site needs no Markdown
// plugins or new dependencies: callouts, prompt blocks, copy buttons, video
// embeds, numbered H2s, scrollable tables and the gate marker.
import { getCollection, type CollectionEntry } from 'astro:content';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

export type Tutorial = CollectionEntry<'tutoriales'>;

const SITE = 'https://www.valthor.app';

const env = (name: string): string | undefined => {
  const fromVite = (import.meta.env as Record<string, string | undefined>)[name];
  return (fromVite ?? process.env[name])?.trim() || undefined;
};

/**
 * WhatsApp number that sends the gated guides (digits only, with country code).
 * TODO: confirm the number that will send the guides and set
 * VALTHOR_WHATSAPP_NUMBER in Vercel. Until then it falls back to the sales
 * number used by the rest of the site, so the button never points nowhere.
 */
export const VALTHOR_WHATSAPP_NUMBER = (env('VALTHOR_WHATSAPP_NUMBER') ?? '5491131381205').replace(/\D/g, '');

/** Endpoint that receives the unlock form (name, email, tutorialSlug, source). Empty = not configured. */
export const LEAD_WEBHOOK_URL = env('LEAD_WEBHOOK_URL') ?? '';

export const CATEGORIES = {
  valthor: 'Cómo usar Valthor',
  'ia-para-tu-negocio': 'IA para tu negocio',
} as const;
export type Category = keyof typeof CATEGORIES;

/**
 * Drafts show in `npm run dev`. Production builds leave them out unless
 * TUTORIALES_SHOW_DRAFTS=true (useful for a local preview of the build).
 */
const SHOW_DRAFTS = import.meta.env.DEV || env('TUTORIALES_SHOW_DRAFTS') === 'true';

/** Published tutorials (plus drafts in dev), newest first. */
export async function getTutoriales(): Promise<Tutorial[]> {
  const all = await getCollection('tutoriales', (t) => SHOW_DRAFTS || !t.data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const tutorialPath = (t: Tutorial) => `/tutoriales/${t.data.slug}`;

export function formatDate(d: Date): string {
  return new Intl.DateTimeFormat('es', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d);
}

/** Up to `n` related tutorials: same category first, then most shared tags, then newest. */
export function relatedTutorials(current: Tutorial, all: Tutorial[], n = 3): Tutorial[] {
  const tags = new Set(current.data.tags.map((t) => t.toLowerCase()));
  return all
    .filter((t) => t.data.slug !== current.data.slug)
    .map((t) => ({
      t,
      score:
        (t.data.category === current.data.category ? 100 : 0) +
        t.data.tags.filter((tag) => tags.has(tag.toLowerCase())).length,
    }))
    .sort((a, b) => b.score - a.score || b.t.data.date.getTime() - a.t.data.date.getTime())
    .slice(0, n)
    .map((x) => x.t);
}

// ---------------------------------------------------------------------------
// Video embeds

export interface VideoEmbed {
  provider: 'youtube' | 'instagram';
  src: string;
  url: string;
}

export function videoEmbed(url: string): VideoEmbed | null {
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^www\.|^m\./, '');
  if (host === 'youtube.com' || host === 'youtu.be') {
    const id =
      host === 'youtu.be'
        ? u.pathname.slice(1)
        : (u.searchParams.get('v') ?? u.pathname.match(/^\/(?:shorts|embed|live)\/([^/?]+)/)?.[1]);
    if (!id) return null;
    return { provider: 'youtube', src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`, url };
  }
  if (host === 'instagram.com') {
    const m = u.pathname.match(/^\/(p|reel|tv)\/([^/?]+)/);
    if (!m) return null;
    return { provider: 'instagram', src: `https://www.instagram.com/${m[1]}/${m[2]}/embed`, url };
  }
  return null;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Click-to-load video: nothing loads from YouTube/Instagram until the visitor presses play. */
export function videoHtml(v: VideoEmbed, title: string): string {
  const name = v.provider === 'youtube' ? 'YouTube' : 'Instagram';
  return `<figure class="video video-${v.provider}">
<div class="video-frame"><button type="button" class="video-play" data-embed-src="${esc(v.src)}" data-embed-title="${esc(title)}" aria-label="Reproducir video: ${esc(title)}"><svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true" focusable="false"><path d="M8 5.5v13l11-6.5z"/></svg><span>Ver video</span></button></div>
<figcaption><a href="${esc(v.url)}" rel="noopener" target="_blank">Ver en ${name}<span class="sr-only"> (se abre en otra pestaña)</span></a></figcaption>
</figure>`;
}

// ---------------------------------------------------------------------------
// Body transforms

export interface TocItem {
  id: string;
  text: string;
  num: string;
}

export interface TutorialBody {
  /** Everything before the gate marker (or the whole body). */
  before: string;
  /** Everything after `<!-- gate -->`, or '' when there is no marker. */
  after: string;
  toc: TocItem[];
  /** True when the body has an ordered list (used for HowTo JSON-LD). */
  hasSteps: boolean;
  /** Video URLs already embedded inside the body. */
  embedded: string[];
}

const CALLOUTS: Record<string, { cls: string; label: string }> = {
  TIP: { cls: 'tip', label: 'Consejo' },
  NOTE: { cls: 'note', label: 'Nota' },
  WARNING: { cls: 'warning', label: 'Atención' },
};

const ICONS = {
  tip: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>',
  note: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  warning: '<path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17h.01"/>',
};
const icon = (k: keyof typeof ICONS) =>
  `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[k]}</svg>`;

const stripTags = (s: string) => s.replace(/<[^>]+>/g, '');

function copyButton(label: string, target: string): string {
  return `<button type="button" class="copy-btn" data-copy="${target}" aria-label="${esc(label)}"><span data-copy-label>Copiar</span></button>`;
}

/** Parses `<blockquote><p>[!TYPE] Title\nrest…</p>…</blockquote>` into its parts. */
function parseMarker(inner: string) {
  const m = inner.match(/^\s*<p>\[!(\w+)\][ \t]*([^\n<]*)(?:\n|<\/p>)([\s\S]*)$/);
  if (!m) return null;
  let rest = m[3].trim();
  // When the title line was followed by a newline, the first paragraph is
  // still open: re-open it so the remaining HTML stays balanced.
  if (!inner.match(/^\s*<p>\[!\w+\][^\n<]*<\/p>/)) rest = `<p>${rest}`;
  rest = rest.replace(/^<p>\s*<\/p>/, '').trim();
  return { type: m[1].toUpperCase(), title: m[2].trim(), rest };
}

async function imageSize(src: string): Promise<{ width: number; height: number } | null> {
  const file = join(process.cwd(), 'public', decodeURI(src));
  if (!src.startsWith('/') || !existsSync(file)) return null;
  try {
    const { width, height } = await sharp(file).metadata();
    return width && height ? { width, height } : null;
  } catch {
    return null;
  }
}

export async function transformBody(html: string): Promise<TutorialBody> {
  let n = 0;
  const uid = () => `tb-${++n}`;
  const embedded: string[] = [];

  // 1. Prompt blocks: a [!PROMPT] callout immediately followed by a code block.
  html = html.replace(
    // The inner part may not cross another blockquote, or an earlier callout would be swallowed.
    /<blockquote>((?:(?!<\/?blockquote)[\s\S])*?)<\/blockquote>\s*<pre\b[^>]*>(<code[\s\S]*?<\/code>)<\/pre>/g,
    (all, inner: string, code: string) => {
      const p = parseMarker(inner);
      if (!p || p.type !== 'PROMPT') return all;
      const id = uid();
      const title = p.title || 'Prompt';
      const note = stripTags(p.rest).trim();
      return `<section class="prompt-block" aria-labelledby="${id}-t">
<header class="prompt-head"><p class="prompt-kicker">Prompt</p><h3 class="prompt-title" id="${id}-t">${title}</h3>${note ? `<p class="prompt-note">${note}</p>` : ''}</header>
<div class="prompt-box">${copyButton(`Copiar prompt: ${stripTags(title)}`, id)}<pre id="${id}" tabindex="0">${code}</pre></div>
</section>`;
    },
  );

  // 2. Callouts: > [!TIP] / > [!NOTE] / > [!WARNING] (optional title on the same line).
  html = html.replace(/<blockquote>([\s\S]*?)<\/blockquote>/g, (all, inner: string) => {
    const p = parseMarker(inner);
    if (!p || !CALLOUTS[p.type]) return all;
    const c = CALLOUTS[p.type];
    const title = p.title || c.label;
    return `<aside class="callout callout-${c.cls}" aria-label="${esc(c.label)}">${icon(c.cls as keyof typeof ICONS)}<div><p class="callout-title">${title}</p>${p.rest}</div></aside>`;
  });

  // 3. Remaining code blocks get a copy button (prompt blocks, already done, have id="tb-…").
  html = html.replace(/<pre\b(?![^>]*\bid="tb-)([^>]*)>(<code[\s\S]*?<\/code>)<\/pre>/g, (_all, attrs: string, code: string) => {
    const id = uid();
    const lang = attrs.match(/data-language="([^"]+)"/)?.[1];
    const label = lang && !['text', 'plaintext', 'txt'].includes(lang) ? lang : 'Código';
    return `<div class="code-block"><div class="code-head"><span>${esc(label)}</span>${copyButton('Copiar código', id)}</div><pre id="${id}"${attrs.replace(/\s*tabindex="0"/, '')} tabindex="0">${code}</pre></div>`;
  });

  // 4. A paragraph that is only a YouTube or Instagram link becomes an embed.
  html = html.replace(/<p><a href="([^"]+)">([^<]+)<\/a><\/p>/g, (all, href: string, text: string) => {
    const url = href.replace(/&amp;/g, '&');
    if (text.replace(/&amp;/g, '&') !== url) return all;
    const v = videoEmbed(url);
    if (!v) return all;
    embedded.push(url);
    return videoHtml(v, 'Video del tutorial');
  });

  // 5. Tables scroll sideways on small screens instead of breaking the layout.
  html = html.replace(/<table>[\s\S]*?<\/table>/g, (t) => `<div class="table-wrap" role="region" aria-label="Tabla" tabindex="0">${t}</div>`);

  // 6. External links open in a new tab.
  html = html.replace(/<a href="(https?:\/\/[^"]+)">/g, (all, href: string) =>
    href.startsWith(SITE) ? all : `<a href="${href}" rel="noopener" target="_blank">`,
  );

  // 7. Images: lazy, and with their real size when the file is in /public.
  const imgs = [...html.matchAll(/<img ([^>]*?)\/?>/g)];
  for (const m of imgs) {
    const attrs = m[1];
    if (/ width=/.test(` ${attrs}`)) continue;
    const src = attrs.match(/src="([^"]+)"/)?.[1] ?? '';
    const size = await imageSize(src);
    const extra = `${size ? ` width="${size.width}" height="${size.height}"` : ''} loading="lazy" decoding="async"`;
    html = html.replace(m[0], `<img ${attrs.trim()}${extra}>`);
  }

  // 8. Numbered H2s (01, 02…) outside the «Para curiosos» appendix, for the TOC.
  const toc: TocItem[] = [];
  const detailsRanges = [...html.matchAll(/<details[\s\S]*?<\/details>/g)].map((m) => [m.index!, m.index! + m[0].length]);
  const inDetails = (i: number) => detailsRanges.some(([a, b]) => i >= a && i < b);
  html = html.replace(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g, (all, id: string, inner: string, offset: number) => {
    if (inDetails(offset)) return all;
    const num = String(toc.length + 1).padStart(2, '0');
    toc.push({ id, text: stripTags(inner), num });
    return `<h2 id="${id}"><span class="h2-num" aria-hidden="true">${num}</span>${inner}</h2>`;
  });

  // 9. Gate: everything after <!-- gate --> is the locked part.
  const [before, ...rest] = html.split(/<!--\s*gate\s*-->/);
  return { before, after: rest.join(''), toc, hasSteps: /<ol>/.test(html), embedded };
}

// ---------------------------------------------------------------------------
// JSON-LD

export function tutorialJsonLd(t: Tutorial, body: TutorialBody, image: string) {
  const d = t.data;
  const url = `${SITE}${tutorialPath(t)}`;
  const author =
    d.author === 'Equipo Valthor'
      ? { '@type': 'Organization', name: 'Equipo Valthor', url: SITE }
      : { '@type': 'Person', name: d.author };
  // Gated guides follow Google's paywalled-content markup, so the full text in
  // the HTML is declared as gated and is not read as cloaking.
  const gating =
    d.gated && body.after
      ? {
          isAccessibleForFree: false,
          hasPart: { '@type': 'WebPageElement', isAccessibleForFree: false, cssSelector: '.gate-rest' },
        }
      : { isAccessibleForFree: true };
  const article = {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: d.title,
    description: d.description,
    image: `${SITE}${image}`,
    datePublished: d.date.toISOString().slice(0, 10),
    dateModified: d.date.toISOString().slice(0, 10),
    inLanguage: 'es',
    author,
    publisher: { '@id': `${SITE}/#organization` },
    mainEntityOfPage: url,
    articleSection: CATEGORIES[d.category],
    keywords: d.tags.join(', '),
    ...gating,
  };
  if (!body.hasSteps || body.toc.length < 2) return [article];
  const howTo = {
    '@type': 'HowTo',
    '@id': `${url}#howto`,
    name: d.title,
    description: d.description,
    image: `${SITE}${image}`,
    inLanguage: 'es',
    step: body.toc.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.text,
      url: `${url}#${encodeURIComponent(s.id)}`,
    })),
    ...gating,
  };
  return [article, howTo];
}
