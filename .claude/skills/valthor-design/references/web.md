# Website (valthor.app)

**Decision (Mati, Oct 2026): the website keeps its own current design.** A "Turno noche" redesign of the homepage was tried and rejected: the current site looks more modern and sells better. The Turno noche system is for the product (valthor-crm-v2), not for the marketing site.

So, in the website repo (Valthor-landing-nueva, Astro, Vercel):

- **Do not restyle the site** to Turno noche: no new tokens, no font swap, no layout changes, no replacing its components with the app's components. Don't run `check_ui.sh` against the website; its patterns are for the app.
- New pages and sections **copy the existing site's own components, spacing and styles**. Look at the closest existing section and follow it.
- Keep it fast and accessible (Lighthouse performance and accessibility ≥ 90, images AVIF/WebP with sizes, fonts preloaded with `font-display: swap`).

## What the website and the app share

These are the only brand rules that apply to the website:

- **Logo**: use the SVGs from `assets/logos/` (no "CRM"). On dark sections, the white version or the color version; never add "CRM" next to it.
- **Positioning**: Valthor is an **AI suite for SMBs** by MTS Group, never "a CRM" in headlines, titles, meta descriptions or alt texts.
- **Voice**: neutral Spanish on the site (it sells in several countries), concrete verbs, no marketing filler ("potenciá", "mágico", "revolucioná").
- **Product screenshots and mockups** shown on the site should look like the real app (Turno noche) once the app is migrated, so what a prospect sees is what they get.

## Product decisions already made for the site

- Main CTA "Probar gratis 15 días"; secondary "Hablá con Valthor por WhatsApp".
- No public prices on the home page; plans on their own page.
- Partners section (Kuad System, GymFlow, ZEUS ERP) stays; partners don't approve copy.
- No interactive demo on the home page.
