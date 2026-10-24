// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

// Files whose changes count as a change to each page, for the sitemap's
// <lastmod>. Shared parts (layout, header, footer) are left out on purpose:
// lastmod should move only when a page's own content changes.
const PAGE_SOURCES = {
  '/': ['src/content/home.json', 'src/content/faq.json', 'src/pages/index.astro', 'src/components/home'],
  '/planes': ['src/content/planes.json', 'src/pages/planes.astro'],
  '/preguntas-frecuentes': [
    'src/content/preguntas-frecuentes.json',
    'src/content/faq.json',
    'src/content/landings',
    'src/pages/preguntas-frecuentes.astro',
  ],
  '/privacidad': ['src/content/legal/privacidad.md'],
  '/terminos': ['src/content/legal/terminos.md'],
};
const sourcesFor = (path) =>
  PAGE_SOURCES[path] ?? [`src/content/landings${path}.md`, 'src/components/landing/LandingPage.astro'];

// Commits at the edge of a shallow clone carry the date of the clone, not of
// the change, so a page whose last change is one of them gets no lastmod.
const shallow = existsSync('.git/shallow') ? readFileSync('.git/shallow', 'utf8').split('\n').filter(Boolean) : [];

function lastChange(path) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%H %cI', '--', ...sourcesFor(path)], { encoding: 'utf8' }).trim();
    const [hash, date] = out.split(' ');
    if (!hash || shallow.includes(hash)) return undefined;
    return date;
  } catch {
    return undefined; // no git history available: omit lastmod
  }
}

export default defineConfig({
  site: 'https://www.valthor.app',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const path = new URL(item.url).pathname.replace(/(.)\/$/, '$1');
        const lastmod = lastChange(path);
        if (lastmod) item.lastmod = lastmod;
        else delete item.lastmod;
        return item;
      },
    }),
  ],
});
