# valthor.app

Marketing site for Valthor (MTS Group S.A.S.), built with [Astro](https://astro.build) as a fully static site and deployed on Vercel (`www.valthor.app`; the apex redirects to `www` at the Vercel domain level).

Owner guide in Spanish (edit, preview, publish): [`docs/GUIA.md`](docs/GUIA.md).

## Commands

| Command | What it does |
| --- | --- |
| `npm ci` | Install dependencies (Node ≥ 22.22) |
| `npm run dev` | Local dev server |
| `npm run build` | Static build into `dist/` |
| `npm run verify` | Checks every built page: one H1, title 50–60 / description 140–160 chars, canonical, OG/Twitter, JSON-LD shape, `alt` and sizes on images, landmarks, CTA labels, tuteo (copy is in Argentine voseo; legal pages exempt), forbidden claims, prices, broken internal links, robots/sitemap/llms |
| `node scripts/claims-checklist.mjs` | Regenerates `docs/CLAIMS_CHECKLIST.md` |
| `node scripts/make-images.mjs` | Regenerates the share image, favicon and logo in `public/` |
| `node scripts/extract-bundle.mjs` | Re-extracts the old bundled site into `legacy-extract/` |

## Layout

- `src/content/`: all copy (JSON/Markdown), validated by `src/content.config.ts`.
- `src/pages/`: routes. `[...landing].astro` renders every file in `src/content/landings/` with the 7-block template (`src/components/landing/LandingPage.astro`).
- `src/components/`, `src/layouts/BaseLayout.astro`: SEO head, JSON-LD, analytics, header, footer, WhatsApp button.
- `src/pages/llms.txt.ts`, `llms-full.txt.ts`: plain-text summaries for AI assistants.
- `legacy-extract/`: the decoded old site and `DESIGN.md` (design tokens). Not deployed.
- `reference/`: inputs for the rebuild (design, audit, screenshots). Not deployed.

## Analytics

Google Ads `AW-18428663865` is always on. GA4 and Meta Pixel are added only when `PUBLIC_GA4_ID` / `PUBLIC_META_PIXEL_ID` are set (see `.env.example`). `PUBLIC_GSC_VERIFICATION` adds the Search Console meta tag; `PUBLIC_SAME_AS` (comma-separated URLs) fills Organization `sameAs`. gtag.js and fbevents.js both load on the first interaction (or after 6 s).

CTA links carry `data-track`:

| `data-track` | GA4 event | Meta Pixel | Google Ads conversion |
| --- | --- | --- | --- |
| `whatsapp_click` (WhatsApp demo CTA, floating button) | `whatsapp_click` + `generate_lead` | `Lead` | yes |
| `booking_click` (tertiary «o agendá una llamada») | `booking_click` + `generate_lead` | `Lead` | yes |
| `trial_start_click` («Probar gratis») | `trial_start_click` + `sign_up` | `StartTrial` | yes |

CTA hierarchy: primary = WhatsApp demo, secondary = free trial, tertiary booking link only in the final CTA section. Labels and URLs live in `src/content/site.json`.
