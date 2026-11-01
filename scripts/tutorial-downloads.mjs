// Builds the downloads of a tutorial from its Markdown file, so the web page,
// the PDF and the guide for AI never say different things:
//   - public/tutoriales/<slug>/<pdf>  : the built page printed to PDF (with its
//     screenshots and the gated part unlocked).
//   - public/tutoriales/<slug>/<md>   : the same content as plain Markdown for
//     ChatGPT, Claude or Gemini, with a brief for the AI on top.
//
// Usage (needs a build first, because the PDF is printed from dist/):
//   npm run build && node scripts/tutorial-downloads.mjs <slug> <pdf-name> <md-name>
//   npm run build   # again, so the new files are in dist/
//
// Uses Playwright's Chromium, which is preinstalled where the site is built by
// Claude Code; locally: npx playwright install chromium.
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { extname, join } from 'node:path';

const [slug, pdfName, mdName] = process.argv.slice(2);
if (!slug || !pdfName || !mdName) {
  console.error('Uso: node scripts/tutorial-downloads.mjs <slug> <archivo.pdf> <archivo.md>');
  process.exit(1);
}
const SITE = 'https://www.valthor.app';
const source = readFileSync(join('src/content/tutoriales', `${slug}.md`), 'utf8');
const [, front, body] = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/) ?? [];
if (!front) throw new Error(`No frontmatter in src/content/tutoriales/${slug}.md`);
const field = (k) => front.match(new RegExp(`^${k}:\\s*"?(.*?)"?\\s*$`, 'm'))?.[1] ?? '';
const title = field('title');
const outDir = join('public/tutoriales', slug);
mkdirSync(outDir, { recursive: true });

// ---------------------------------------------------------------------------
// 1. Guide for AI (.md)

const LABELS = { TIP: 'Consejo', NOTE: 'Nota', WARNING: 'Atención', PROMPT: 'Mensaje sugerido' };
function toAiMarkdown(md) {
  return (
    md
      .replace(/<!--\s*gate\s*-->\n?/g, '')
      // The downloads section points to these same files.
      .replace(/## Descarga[\s\S]*?(?=\n## |\n<details|$)/, '')
      .replace(/<details[^>]*>\n<summary>([\s\S]*?)<\/summary>/g, '## $1')
      .replace(/<\/details>\n?/g, '')
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, '*(En la pantalla: $1.)*')
      .replace(/\]\(\/(?!\/)/g, `](${SITE}/`)
      // > [!TIP] Title\n> text  →  > **Consejo: Title.** text
      .replace(/^> \[!(\w+)\][ \t]*(.*)\n((?:> .*\n?)*)/gm, (_m, type, t, rest) => {
        const label = LABELS[type.toUpperCase()] ?? type;
        const text = rest.replace(/^> /gm, '').trim();
        return `> **${label}${t ? `: ${t}` : ''}.** ${text}\n`;
      })
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}
const brief = `# ${title}

## Para la IA que lee este archivo

La persona que te pasó este archivo usa Valthor, una plataforma de ventas por WhatsApp con IA para pequeñas y medianas empresas. Quiere configurar lo que explica esta guía en su negocio y no es experta en marketing ni en tecnología.

Cómo ayudarla:
- Guíala **de a un paso por vez**. Espera a que te diga que lo hizo antes de seguir.
- Pídele una **captura de pantalla** cuando no esté claro dónde está o qué ve.
- Usa palabras simples y háblale en su idioma.
- Básate en las instrucciones de abajo. Si lo que ve en Valthor no coincide, créele a su pantalla y sugiérele escribir a soporte.
- Para lo que se hace fuera de Valthor (Meta, Google Ads, su página web), explica dónde tocar con el nombre de cada menú.
- **Nunca le pidas contraseñas, claves, tokens ni códigos de acceso**, y si empieza a pegarte uno, frénala: se cargan directo en Valthor, en Meta o en Google, nunca en el chat.
- Empieza preguntándole qué quiere lograr hoy y arranca por ese apartado.

Fuente: ${SITE}/tutoriales/${slug}

---

`;
writeFileSync(join(outDir, mdName), brief + toAiMarkdown(body) + '\n');
console.log(`✓ ${join(outDir, mdName)}`);

// ---------------------------------------------------------------------------
// 2. PDF printed from the built page

const page = join('dist/tutoriales', `${slug}.html`);
if (!existsSync(page)) throw new Error(`${page} not found: run npm run build first`);
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.jpg': 'image/jpeg' };
const server = createServer((req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = join('dist', path);
  if (!extname(file) && existsSync(`${file}.html`)) file = `${file}.html`;
  if (!existsSync(file) || statSync(file).isDirectory()) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' }).end(readFileSync(file));
}).listen(0);
const port = server.address().port;

// require() so a globally installed Playwright also resolves (it is not a dependency of the site).
const { chromium } = createRequire(import.meta.url)('playwright');
const browser = await chromium.launch();
const tab = await browser.newPage();
// Analytics and third parties are not needed to print.
await tab.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
await tab.goto(`http://localhost:${port}/tutoriales/${slug}`, { waitUntil: 'load' });
await tab.evaluate(() => {
  document.querySelector('[data-gate]')?.classList.remove('is-locked');
  document.querySelector('[data-gate-rest]')?.removeAttribute('inert');
  // Drop the downloads section (it links to this same PDF).
  const h = [...document.querySelectorAll('.prose h2')].find((e) => /Descarga/.test(e.textContent ?? ''));
  if (h) {
    let n = h.nextElementSibling;
    h.remove();
    while (n && n.tagName !== 'H2' && n.tagName !== 'DETAILS') {
      const next = n.nextElementSibling;
      n.remove();
      n = next;
    }
  }
  document.querySelectorAll('details').forEach((d) => d.setAttribute('open', ''));
  document.querySelectorAll('img[loading="lazy"]').forEach((i) => i.setAttribute('loading', 'eager'));
});
await tab.addStyleTag({
  content: `
    .site-header, .site-footer, .wa-fab, .cookie-banner, .crumbs, .toc-col, .related, .closing,
    .gate-card, .gate-done, .video, .copy-btn, .skip-link, astro-dev-toolbar { display: none !important; }
    .tut-hero { padding: 40px 0 32px !important; }
    .article-area { padding: 28px 0 0 !important; }
    .layout { display: block !important; }
    .content { max-width: none !important; }
    .prose h2 { break-after: avoid; }
    .prose img, .callout, .prompt-block, .code-block, .table-wrap, .ficha, tr { break-inside: avoid; }
    .prose img { max-height: 640px; width: auto; margin: 0 auto; }
    .prompt-box pre { padding-top: 16px !important; }
    html, body { background: #fff !important; }
    .prose pre { white-space: pre-wrap !important; word-break: break-word; }
  `,
});
await tab.waitForFunction(() => [...document.images].every((i) => i.complete));
await tab.pdf({
  path: join(outDir, pdfName),
  format: 'A4',
  printBackground: true,
  margin: { top: '14mm', bottom: '16mm', left: '0', right: '0' },
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate: `<div style="width:100%;font-size:8px;color:#64748b;padding:0 14mm;display:flex;justify-content:space-between;font-family:sans-serif"><span>${title} · valthor.app/tutoriales</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
});
await browser.close();
server.close();
console.log(`✓ ${join(outDir, pdfName)}`);
