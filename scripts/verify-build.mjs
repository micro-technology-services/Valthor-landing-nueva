// Checks every built page in dist/ against the SEO and content rules of the
// rebuild. Run after `npm run build`:  npm run verify
// Exits with code 1 when a rule fails.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const htmlFiles = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? htmlFiles(p) : p.endsWith('.html') ? [p] : [];
  });

const errors = [];
const warnings = [];
const fail = (page, msg) => errors.push(`${page}: ${msg}`);
const warn = (page, msg) => warnings.push(`${page}: ${msg}`);

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)));
const textOf = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/g, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();
const meta = (html, attr, name) =>
  decode(html.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`))?.[1] ?? '');

// The copy is in Argentine voseo (vos tenés, podés). Tuteo forms and
// vosotros are flagged on every page except the legal ones.
const TUTEO =
  /(?<![\p{L}])(tú|ti|contigo|tienes|quieres|puedes|necesitas|sabes|usas|conectas|cargas|enseñas|enciendes|supervisas|respondes|pierdes|pagas|pides|escribes|pruebas|decides|prefieres|encuentras|eliges|manejas|asignas|creas|envías|importas|tocas|defines|configuras|registras|habilitas|conversas|devuelves|tomas|descubre|empieza|escríbenos|pruébalo|créala|aquí tienes|deja que|haz que|conoce qué|vosotros|vuestro|vuestra|tenéis|podéis|queréis)(?![\p{L}])/iu;
const LEGAL_PAGES = new Set(['/privacidad', '/terminos']);
// Claims the README says must never appear (not live today).
const FORBIDDEN = [
  /carritos? abandonados?/i,
  /recupera(r|ción de) carritos?/i,
  /vuelta de stock|ingresos? de stock/i,
  /comentarios? de (instagram|facebook)/i,
  /intenci[oó]n de compra/i,
  /pedir rese[ñn]as?|solicitud(es)? de rese[ñn]as?/i,
  /telegram/i,
  /tiktok/i,
  /web ?chat/i,
  /shopify/i,
  /tiempo real/i,
  /app store|google play|tiendas de aplicaciones|app exclusiva/i,
  /demo interactiva/i,
  /\bthor\b/i,
  /inmobiliari/i,
  /\b80 ?%/,
  /valthor\.io/i,
  /calendar\.app\.google/i,
];
const PRICE = /(US\$|USD|ARS|\$\s?\d)/;
// CTA labels come from src/content/site.json.
const site = JSON.parse(readFileSync('src/content/site.json', 'utf8'));
const ALLOWED_CTA = new Set([site.cta.demo.label, site.cta.trial.label, site.cta.trial.shortLabel]);

const files = htmlFiles(DIST);
const titles = new Map();
const existing = new Set(
  files.map((f) => '/' + relative(DIST, f).replace(/\.html$/, '').replace(/(^|\/)index$/, '')).map((p) => p.replace(/\/$/, '') || '/'),
);

for (const file of files) {
  const page = '/' + relative(DIST, file).replace(/\.html$/, '').replace(/(^|\/)index$/, '');
  if (page === '/404') continue;
  const html = readFileSync(file, 'utf8');
  const text = textOf(html);

  if (!/<html lang="es">/.test(html)) fail(page, 'missing lang="es"');

  const h1s = html.match(/<h1[\s>]/g) ?? [];
  if (h1s.length !== 1) fail(page, `expected exactly one <h1>, found ${h1s.length}`);

  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  if (title.length < 50 || title.length > 60) fail(page, `title is ${title.length} chars (50-60): "${title}"`);
  if (titles.has(title)) fail(page, `title duplicated with ${titles.get(title)}`);
  titles.set(title, page);

  const desc = meta(html, 'name', 'description');
  if (desc.length < 140 || desc.length > 160) fail(page, `meta description is ${desc.length} chars (140-160)`);

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? '';
  if (!canonical.startsWith('https://www.valthor.app')) fail(page, `canonical not on https://www.valthor.app: "${canonical}"`);

  for (const [attr, name] of [
    ['property', 'og:title'],
    ['property', 'og:description'],
    ['property', 'og:image'],
    ['property', 'og:url'],
    ['name', 'twitter:card'],
    ['name', 'twitter:image'],
  ]) {
    if (!meta(html, attr, name)) fail(page, `missing ${name}`);
  }
  const og = meta(html, 'property', 'og:image').replace('https://www.valthor.app', '');
  if (og && !existsSync(join(DIST, og))) fail(page, `og:image file not found: ${og}`);

  // JSON-LD
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const types = [];
  for (const b of blocks) {
    try {
      const data = JSON.parse(b);
      if (data['@context'] !== 'https://schema.org') fail(page, 'JSON-LD @context must be https://schema.org');
      for (const node of data['@graph'] ?? [data]) {
        types.push(node['@type']);
        if (node['@type'] === 'FAQPage') {
          if (!node.mainEntity?.length) fail(page, 'FAQPage without mainEntity');
          for (const q of node.mainEntity ?? [])
            if (q['@type'] !== 'Question' || !q.name || q.acceptedAnswer?.['@type'] !== 'Answer' || !q.acceptedAnswer.text)
              fail(page, `FAQPage item malformed: ${q.name}`);
        }
        if (node['@type'] === 'BreadcrumbList')
          node.itemListElement.forEach((it, i) => {
            if (it['@type'] !== 'ListItem' || it.position !== i + 1 || !it.name || !/^https:\/\/www\.valthor\.app/.test(it.item))
              fail(page, `BreadcrumbList item ${i + 1} malformed`);
          });
        if (node['@type'] === 'Organization' && (!node.name || !node.url || !node.logo)) fail(page, 'Organization missing name/url/logo');
        if (node['@type'] === 'SoftwareApplication' && (!node.name || !node.applicationCategory || !node.operatingSystem))
          fail(page, 'SoftwareApplication missing name/applicationCategory/operatingSystem');
      }
      // No prices in JSON-LD. The only offer allowed is the free trial.
      if (/"(price|lowPrice|highPrice|priceCurrency|priceSpecification)"/.test(b)) fail(page, 'JSON-LD contains a price');
      for (const m of b.matchAll(/"offers":\{"@type":"Offer","name":"([^"]*)"/g))
        if (m[1] !== 'Prueba gratis de 15 días') fail(page, `JSON-LD offer other than the free trial: ${m[1]}`);
      if ((b.match(/"offers"/g) ?? []).length !== (b.match(/"offers":\{"@type":"Offer","name":"Prueba gratis de 15 días"/g) ?? []).length)
        fail(page, 'JSON-LD contains offers other than the free trial');
    } catch (e) {
      fail(page, `invalid JSON-LD: ${e.message}`);
    }
  }
  if (!types.includes('Organization')) fail(page, 'JSON-LD missing Organization');
  if (page === '/' && !types.includes('SoftwareApplication')) fail(page, 'JSON-LD missing SoftwareApplication');
  if (page !== '/' && !types.includes('BreadcrumbList')) fail(page, 'JSON-LD missing BreadcrumbList');
  const hasFaqMarkup = /<details[^>]*id="faq-/.test(html);
  if (hasFaqMarkup && !types.includes('FAQPage')) fail(page, 'FAQs rendered but no FAQPage JSON-LD');
  if (!hasFaqMarkup && types.includes('FAQPage')) fail(page, 'FAQPage JSON-LD without visible FAQs');
  if (hasFaqMarkup) {
    // Every FAQ answer must be in the static HTML.
    const faq = JSON.parse(blocks[0])['@graph'].find((n) => n['@type'] === 'FAQPage');
    for (const q of faq.mainEntity) {
      if (!text.includes(q.acceptedAnswer.text)) fail(page, `FAQ answer not in HTML: "${q.name}"`);
    }
  }

  // Images: alt and explicit size on every <img>
  for (const img of html.match(/<img [^>]*>/g) ?? []) {
    if (!/ alt(="|[\s>])/.test(img)) fail(page, `<img> without alt: ${img.slice(0, 90)}`);
    if (!/ width="\d+"/.test(img) || !/ height="\d+"/.test(img)) fail(page, `<img> without width/height: ${img.slice(0, 90)}`);
  }

  // Icon-only links/buttons need an accessible name
  for (const a of html.match(/<a [^>]*>(?:(?!<\/a>)[\s\S])*<\/a>/g) ?? []) {
    if (!textOf(a) && !/aria-label="[^"]+"/.test(a) && !/<img [^>]*alt="[^"]+"/.test(a)) fail(page, `link without accessible name: ${a.slice(0, 90)}`);
  }

  // Landmarks
  for (const tag of ['<header', '<main', '<footer', '<nav']) if (!html.includes(tag)) fail(page, `missing landmark ${tag}>`);

  // Copy rules
  // Visible text plus JSON-LD (FAQ answers) and the meta description
  const ld = (html.match(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g) ?? []).join(' ');
  const v = !LEGAL_PAGES.has(page) && (text + ' ' + desc + ' ' + ld).match(TUTEO);
  if (v) fail(page, `tuteo/vosotros found (use voseo): "${v[0]}"`);
  for (const re of FORBIDDEN) {
    const m = (text + ' ' + title + ' ' + desc + ' ' + html.match(/href="[^"]*"/g)?.join(' ')).match(re);
    if (m && !(page === '/privacidad' && /tiempo real/.test(m[0]))) fail(page, `forbidden claim: "${m[0]}"`);
  }
  if (PRICE.test(text) && !text.includes('Datos de ejemplo')) fail(page, `possible price: "${text.match(PRICE)[0]}"`);

  // CTAs: only the allowed labels on .btn links; the booking link only in the
  // final CTA section, never in the header or hero.
  for (const m of html.matchAll(/<a [^>]*class="[^"]*\bbtn\b[^"]*"[^>]*>([\s\S]*?)<\/a>/g)) {
    const label = textOf(m[1]);
    if (!ALLOWED_CTA.has(label)) fail(page, `CTA label not allowed: "${label}"`);
  }
  const header = html.match(/<header class="site-header"[\s\S]*?<\/header>/)?.[0] ?? '';
  const hero = html.match(/<section class="(?:hero|page-hero)"[\s\S]*?<\/section>/)?.[0] ?? '';
  if (/calendar\.google\.com/.test(header + hero)) fail(page, 'booking link in header or hero');
  if (!html.includes('https://wa.me/5491131381205')) fail(page, 'missing WhatsApp button');
  if (!html.includes("gtag('config', 'AW-18428663865')")) fail(page, 'missing Google Ads tag');

  // Internal links must point to built pages
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const path = m[1].replace(/\/$/, '') || '/';
    if (/\.(png|xml|txt|webp|svg|woff2|ico)$/.test(path) || path.startsWith('/_astro')) continue;
    if (!existing.has(path)) warn(page, `link to a page that does not exist yet: ${path}`);
  }

  console.log(`✓ ${page.padEnd(32)} h1=1  title=${title.length}  desc=${desc.length}  json-ld=${types.join(',')}  words=${text.split(' ').length}`);
}

for (const f of ['robots.txt', 'sitemap-index.xml', 'llms.txt']) if (!existsSync(join(DIST, f))) fail('/', `missing ${f}`);
const robots = readFileSync(join(DIST, 'robots.txt'), 'utf8');
for (const bot of ['Googlebot', 'Bingbot', 'GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'])
  if (!robots.includes(`User-agent: ${bot}`)) fail('robots.txt', `missing ${bot}`);
if (!robots.includes('Sitemap: https://www.valthor.app/sitemap-index.xml')) fail('robots.txt', 'missing Sitemap line');

// Plain-text files for AI assistants follow the same copy rules
for (const f of ['llms.txt', 'llms-full.txt']) {
  const t = readFileSync(join(DIST, f), 'utf8');
  const v = t.match(TUTEO);
  if (v) fail(f, `tuteo/vosotros found (use voseo): "${v[0]}"`);
  for (const re of FORBIDDEN) if (re.test(t)) fail(f, `forbidden claim: "${t.match(re)[0]}"`);
  if (PRICE.test(t)) fail(f, `possible price: "${t.match(PRICE)[0]}"`);
  for (const m of t.matchAll(/\((https:\/\/www\.valthor\.app[^)]*)\)/g)) {
    const path = m[1].replace('https://www.valthor.app', '') || '/';
    if (!existing.has(path) && !existsSync(join(DIST, path))) fail(f, `link to missing page: ${path}`);
  }
}

const uniqueWarnings = [...new Set(warnings.map((w) => w.split(': ').slice(1).join(': ')))];
if (uniqueWarnings.length) console.log(`\nWarnings:\n  ${uniqueWarnings.join('\n  ')}`);
if (errors.length) {
  console.error(`\n✗ ${errors.length} problem(s):\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log(`\nAll ${files.length} pages pass.`);
