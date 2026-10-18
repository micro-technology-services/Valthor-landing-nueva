// Decodes the legacy self-unpacking index.html (Claude Design export) into
// legacy-extract/: the decoded template (the home's .dc.html design source),
// nested page bundles (recursively), images, fonts, scripts and CSS, plus a
// README listing every file.
//
// Usage: node scripts/extract-bundle.mjs [input.html] [outDir]
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, rmSync, existsSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { join, resolve, relative } from 'node:path';

// The bundled home was removed from the repo root; its untouched copy lives in legacy-extract/.
const input = resolve(process.argv[2] ?? 'legacy-extract/index.legacy.html');
const outDir = resolve(process.argv[3] ?? 'legacy-extract');

const EXT = {
  'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/svg+xml': 'svg',
  'font/woff2': 'woff2', 'font/woff': 'woff', 'text/javascript': 'js', 'text/css': 'css',
  'text/html': 'html', 'application/octet-stream': 'bin',
};

function island(html, type) {
  const m = html.match(new RegExp(`<script type="__bundler/${type}">([\\s\\S]*?)</script>`));
  return m ? JSON.parse(m[1]) : null;
}

function sniff(bytes, mime) {
  const head = bytes.subarray(0, 4).toString('latin1');
  if (head === 'wOF2') return 'woff2';
  if (head === 'wOFF') return 'woff';
  if (head === '\x89PNG') return 'png';
  return EXT[mime] ?? 'bin';
}

const dirFor = (ext) =>
  ['png', 'jpg', 'webp', 'svg'].includes(ext) ? 'images' : ['woff2', 'woff'].includes(ext) ? 'fonts' :
  ext === 'js' ? 'scripts' : ext === 'css' ? 'css' : 'other';

// Readable names for fonts, derived from the @font-face rule that uses them.
function fontNames(template) {
  const names = {};
  const re = /\/\* ([\w-]+) \*\/\s*@font-face \{\s*font-family: '([^']+)';\s*font-style: (\w+);[\s\S]*?url\("?([0-9a-f-]{36})"?\)/g;
  for (const [, subset, family, style, uuid] of template.matchAll(re)) {
    names[uuid] ??= `${family.toLowerCase().replace(/\s+/g, '-')}-${style}-${subset}`;
  }
  return names;
}

// Readable names for images, from the alt text where they are used.
function imageNames(template) {
  const names = {};
  for (const [, uuid, alt] of template.matchAll(/<img src="([0-9a-f-]{36})"[^>]*?alt="([^"]+)"/g)) {
    const slug = alt.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    if (slug) names[uuid] ??= slug;
  }
  return names;
}

const rows = [];

function extract(html, dir, label) {
  const manifest = island(html, 'manifest');
  const template = island(html, 'template');
  const pageOrder = island(html, 'page_order') ?? [];
  const extResources = island(html, 'ext_resources') ?? [];
  if (!manifest || template == null) throw new Error(`${label}: no __bundler/manifest or __bundler/template`);

  const named = {
    ...fontNames(template),
    ...imageNames(template),
    ...Object.fromEntries(extResources.map((r) => [r.uuid, r.id.split('/').slice(-3).join('_').replace(/[^\w.@-]/g, '_').replace(/\.js$/, '')])),
  };
  const pathFor = {};

  for (const [uuid, entry] of Object.entries(manifest)) {
    let bytes = Buffer.from(entry.data, 'base64');
    if (entry.compressed) bytes = gunzipSync(bytes);
    const note = [entry.compressed ? 'was gzip' : '', `uuid ${uuid}`];

    if (pageOrder.includes(uuid)) {
      // Nested page bundle (an iframe target): extract it recursively.
      const text = bytes.toString('utf8');
      const title = (text.match(/<title>([^<]*)<\/title>/)?.[1] ?? uuid).trim();
      const sub = `pages/${title.toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
      mkdirSync(join(dir, sub), { recursive: true });
      writeFileSync(join(dir, sub, 'bundle.html'), bytes);
      rows.push({ rel: relative(outDir, join(dir, sub, 'bundle.html')), mime: entry.mime, size: bytes.length, note: [`Nested page bundle "${title}" (iframe target)`, ...note] });
      pathFor[uuid] = `${sub}/template.html`;
      if (island(text, 'manifest')) extract(text, join(dir, sub), title);
      continue;
    }

    const ext = sniff(bytes, entry.mime);
    const sub = dirFor(ext);
    const base = named[uuid] ?? uuid;
    let rel = `${sub}/${base}.${ext}`;
    for (let i = 2; Object.values(pathFor).includes(rel); i++) rel = `${sub}/${base}-${i}.${ext}`;
    mkdirSync(join(dir, sub), { recursive: true });
    writeFileSync(join(dir, rel), bytes);
    pathFor[uuid] = rel;
    if (extResources.some((r) => r.uuid === uuid)) note.unshift('External CDN resource');
    if (entry.mime !== `${EXT[ext] ? entry.mime : ''}` || EXT[entry.mime] !== ext) note.unshift(`declared ${entry.mime}`);
    rows.push({ rel: relative(outDir, join(dir, rel)), mime: entry.mime, size: bytes.length, note });
  }

  // Template = the page's design source (Claude Design <x-dc> markup).
  let tpl = template;
  for (const [uuid, rel] of Object.entries(pathFor)) tpl = tpl.split(uuid).join(rel);
  writeFileSync(join(dir, 'template.html'), tpl);
  writeFileSync(join(dir, 'template.raw.html'), template);
  rows.push({ rel: relative(outDir, join(dir, 'template.html')), mime: 'text/html', size: tpl.length, note: [`Decoded __bundler/template of ${label} (design source, x-dc markup), uuids rewritten to the paths here`] });
  rows.push({ rel: relative(outDir, join(dir, 'template.raw.html')), mime: 'text/html', size: template.length, note: [`Same, uuids untouched`] });

  // Every <style> block of the template, split into @font-face rules and the rest.
  const styles = [...tpl.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
  const faces = styles.match(/\/\*[^*]*\*\/\s*@font-face \{[\s\S]*?\}/g) ?? [];
  let rest = styles;
  for (const f of faces) rest = rest.replace(f, '');
  mkdirSync(join(dir, 'css'), { recursive: true });
  if (faces.length) {
    writeFileSync(join(dir, 'css/fonts.css'), faces.join('\n').replaceAll('url("fonts/', 'url("../fonts/'));
    rows.push({ rel: relative(outDir, join(dir, 'css/fonts.css')), mime: 'text/css', size: faces.join('').length, note: [`${faces.length} @font-face rules from ${label}`] });
  }
  if (rest.trim()) {
    writeFileSync(join(dir, 'css/styles.css'), rest.trim() + '\n');
    rows.push({ rel: relative(outDir, join(dir, 'css/styles.css')), mime: 'text/css', size: rest.length, note: [`Global <style> rules from ${label} (most styling is inline in template.html)`] });
  }
}

// Start clean: remove only what this script generates (DESIGN.md, legal/ and
// the input copy are kept).
const html = readFileSync(input, 'utf8');
for (const d of ['css', 'fonts', 'images', 'pages', 'scripts', 'template.html', 'template.raw.html'])
  rmSync(join(outDir, d), { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
extract(html, outDir, 'home');
if (resolve(input) !== join(outDir, 'index.legacy.html')) copyFileSync(input, join(outDir, 'index.legacy.html'));
rows.unshift({ rel: 'index.legacy.html', mime: 'text/html', size: html.length, note: ['Untouched copy of the old bundled home'] });

const fmt = (n) => (n > 1024 ? `${(n / 1024).toFixed(1)} KB` : `${n} B`);
rows.sort((a, b) => a.rel.localeCompare(b.rel));
writeFileSync(join(outDir, 'README.md'), [
  '# legacy-extract',
  '',
  'Generated by `node scripts/extract-bundle.mjs` from the old bundled `index.html` (a Claude Design export).',
  'Reference only: nothing here is deployed. Design tokens are documented in `DESIGN.md`.',
  'The old static legal pages are kept in `legal/` (now served as `/privacidad` and `/terminos`).',
  '',
  '| File | MIME (declared) | Size | Notes |',
  '| --- | --- | --- | --- |',
  ...rows.map((r) => `| \`${r.rel}\` | ${r.mime} | ${fmt(r.size)} | ${r.note.filter(Boolean).join('; ')} |`),
  '',
].join('\n'));
console.log(`Extracted ${rows.length} files to ${relative(process.cwd(), outDir)}/`);
