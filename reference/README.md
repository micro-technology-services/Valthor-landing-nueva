# Reference material for the SEO rebuild

These files are inputs for rebuilding the site. They are not part of the published site.

| File | What it is |
| --- | --- |
| `home-design.dc.html` | New home page designed in Claude Design. **Source of truth for content, copy and section order.** Written in neutral Spanish. |
| `current-site-screenshots/` | Screenshots of the current live site, in scroll order. **Source of truth for the visual style** (glows, gradients, mockups, light/dark sections). |
| `AUDITORIA_FUNCIONALIDADES.md` | Code audit of what Valthor really does (15/10/2026). Any feature claim on the site must be backed here, except the overrides below. |

## Image mapping in `home-design.dc.html`

The design file references uploaded images by blob id. Use the local files in `public/logos/` instead:

| Blob id in the design | Local file |
| --- | --- |
| `/_blob/d9abca83782d963dc49a80d05f32b4e5` | `public/logos/valthor-icon.png` |
| `/_blob/3255c07ed70a6c2456b4cd098eada141` | `public/logos/valthor-wordmark.png` |
| `/_blob/323acca8f98c24b8e74999a6bea2575c` | `public/logos/valthor-full.png` |
| `/_blob/2c85756a220854477f09729fd800ad3b` | `public/logos/kuad.png` |
| `/_blob/afd38ccc5bca98ba2e4d0d7ca5923301` | `public/logos/gymflow.png` |
| `/_blob/aed29fa378e49dea64e1e762ddb0c468` | `public/logos/zeus.png` |

## Owner-confirmed facts (override the audit, 18/10/2026)

- Voice notes: incoming audio transcription works in production. OK to say "entiende audios".
- Kuad System, GymFlow and ZEUS ERP integrations all work in production. OK to say "integración".
- MTS Group / Valthor is a Meta Business Partner. OK to show the badge.
- A new client is up and answering in about 2 hours. OK to say "atendiendo en 2 horas".

## Never claim (not live)

Abandoned-cart recovery, back-in-stock alerts, Instagram/Facebook comment automation or "purchase intent detection", automatic review requests, Telegram, TikTok, Web Chat, Shopify, real-time stock sync, an app in the app stores, an interactive demo, Thor, real-estate vertical, prices, and any metric without a real data source (e.g. "80% resolved").
