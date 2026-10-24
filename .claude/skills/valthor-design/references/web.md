# Website (valthor.app)

The marketing site lives in its own repo (Valthor-landing-nueva, Astro, deployed on Vercel). Same system, a few extra rules. It is built by the team with Claude Code; keep it fast and accessible (web-quality checks: Lighthouse performance and accessibility ≥ 90, images in AVIF/WebP with sizes, fonts preloaded with `font-display: swap`).

## Decisions already made (product)

- Main CTA: **"Probar gratis 15 días"** (primary pill). Secondary: **"Hablá con Valthor por WhatsApp"** (pill with border, or on noche a `noche-2` pill).
- No public prices on the home page; plans live on their own page. Prefer "agendá una llamada" for pricing questions.
- Neutral Spanish for the site (it sells in several countries), voseo inside the product.
- Valthor is presented as an **AI suite for SMBs**, never as a "CRM". Don't write "CRM" next to the logo or in headlines.
- Partners section (Kuad System, GymFlow, ZEUS ERP) stays; partners don't approve copy.
- No interactive demo on the home page.

## Layout

- Header and first screen (hero) on `noche`: white logo (`valthor-logo-blanco.svg`), title in `web-display` (56/58, 800, −0.025em; 36/40 on mobile) in `noche-texto`, subtitle in `noche-texto-2`, primary CTA as a `bg-papel text-tinta` pill, secondary as `bg-noche-2` pill.
- The hero's visual is the product itself: a conversation mockup built with the real Burbuja / TeNecesita / BarraFlotante components (customer, "Tu IA" signature, a closed sale) — not an abstract illustration, gradient blob or stock photo.
- Sections after the hero alternate `papel` and `fondo`, `py-24` desktop / `py-16` mobile, content max-width 1120 px, left-aligned text blocks (≤ 70 characters per line).
- Section titles in `web-titulo`. No uppercase eyebrows above them, no numbered "01 / 02" markers unless the content is a real sequence (the 3-step setup is one).
- Cards for features/industries: `rounded-panel bg-papel p-6` on `fondo`, no shadow, no hover lift; the whole card is the link (no "Ver más →").
- Client logos: monochrome (`tinta-3` filter or the logo's own single-color version), static row or slow marquee that respects reduced motion.
- Footer on `noche`.
- The gradient color logo is allowed on light sections and sales material; inside the hero (on noche) use the white logo.

## Copy that already works (keep it)

"Tu equipo comercial con IA. Atiende, vende, cobra y agenda mientras vos supervisás." · "No te damos una herramienta. Te damos cinco trabajos resueltos." · "Atendiendo en 2 horas." · "Dejá de responder mensajes. Empezá a supervisar ventas." Remove the "→" after links and the emojis in the example cards.
