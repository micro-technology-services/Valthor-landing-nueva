# Valthor — design tokens of the current site

Extracted from `template.html` (the decoded home, all styles inline) and checked against
`reference/current-site-screenshots/`. This is the visual language the Astro rebuild must keep.

## 1. Color

### Brand
| Token | Value | Use |
| --- | --- | --- |
| `--accent` | `#8B5CF6` (violet-500) | Primary brand color: gradients, badges, links, icon rail active state |
| `--accent2` | `#D946EF` (fuchsia-500) | Gradient end, glow dot, ROAS figure |
| Brand gradient | `linear-gradient(135deg, #8B5CF6, #D946EF)` | Buttons, chat bubbles from the AI, avatar chips, send button |
| Text gradient | `linear-gradient(120deg, #8B5CF6, #D946EF)` + `background-clip:text` | The highlighted half of H1/H2 ("que nunca deja de vender.") |

The design canvas offered alternates (`#7C3AED`, `#6366F1` for accent; `#EC4899`, `#A855F7` for accent2) but the published site uses the defaults above.

### Dark surfaces
| Token | Value | Use |
| --- | --- | --- |
| `bg-dark` | `#0E0A1A` | Page/body background, most dark sections |
| `bg-dark-2` | `#120c22` | Second stop of dark section gradients (`linear-gradient(180deg,#0E0A1A,#120c22)` and reverse) |
| `app-bg` | `#0f1729` | Mockup chat pane, floating metric cards |
| `app-panel` | `#0b1220` | Mockup sidebar / list / frame |
| `app-bar` | `#0d1526` | Mockup window title bar |
| `app-bubble-in` | `#1c2740` | Incoming bubble inside the inbox mockup |
| `phone-body` | `#0b0b0f` | Phone frame |
| Hairline on dark | `rgba(255,255,255,.06)` – `.1` | Dividers, card borders |
| Glass card | `background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.1)` | "Paso 1/2/3" cards |

### Text on dark
`#fff` headings · `rgba(255,255,255,.6)` section body (18px) · `.5` hero paragraph · `.55` tag line · `.45/.35/.3` meta text in mockups and footer.

### Light surfaces
| Token | Value | Use |
| --- | --- | --- |
| `bg-light` | `#fff` | Clients strip, integrations, "no duerme", WhatsApp card section |
| `bg-lavender` | `#f4f2fb` + two radial glows | Feature-cards section |
| WA card | `linear-gradient(90deg,#faf5ff,#eef2ff)`, border `#e9d5ff` | "Conexión oficial con WhatsApp API" banner |
| Hairline on light | `#eef0f4`, `#e5e7eb` | Card borders, section top border |
| Icon chip | `#f1f5f9` | Round integration logo holders |

### Text on light
`#111827` headings · `#4B5563` body · `#64748B` muted/eyebrow · `#0a1633` "Meta" wordmark.

### Channel / status colors (mockups only)
WhatsApp `#25D366` → `#128C7E`; Instagram `#feda75 → #d62976 → #962fbf`; WA bubble out `#dcf8c6`; WA wallpaper `#e9e2d7`; window dots `#ff5f57 #febc2e #28c840`; tag "Soporte" `#38bdf8` on `rgba(56,189,248,.15)`; avatars `#34d399→#10b981`, `#475569`, `#a16207`, `#be123c`.

## 2. Gradients and glows

| Where | Value |
| --- | --- |
| Hero background | `radial-gradient(1200px 700px at 70% -10%, rgba(139,92,246,.28), transparent 60%), radial-gradient(900px 600px at 10% 30%, rgba(217,70,239,.14), transparent 55%), #0E0A1A` |
| Hero top glow (toggle `glow`) | absolute 680×420 at `top:-160px`, `radial-gradient(closest-side, rgba(139,92,246,.45), transparent)`, `filter: blur(40px)` |
| Side glow (Agente IA) | 500×400 at `right:-100px; top:40%`, `radial-gradient(closest-side, rgba(217,70,239,.18), transparent)`, `blur(50px)` |
| Implementación | `radial-gradient(800px 500px at 20% 20%, rgba(139,92,246,.16), transparent 60%), #0E0A1A` |
| Demo | `radial-gradient(900px 600px at 50% -5%, rgba(139,92,246,.2), transparent 60%), #0E0A1A` |
| CTA final | `radial-gradient(900px 500px at 50% 0%, rgba(139,92,246,.3), transparent 60%), #0E0A1A` |
| Lavender cards section | `radial-gradient(700px 460px at 18% 22%, rgba(139,92,246,.16), transparent 60%), radial-gradient(700px 460px at 84% 80%, rgba(217,70,239,.13), transparent 60%), #f4f2fb` |
| Hero divider | 120×1px `linear-gradient(90deg, transparent, rgba(255,255,255,.3), transparent)` |
| Logo hover | `drop-shadow(0 0 30px rgba(217,70,239,1)) brightness(1.45) saturate(1.35)`, `scale(1.16)` |
| Selection | `rgba(139,92,246,.3)` |

## 3. Typography

Self-hosted from the bundle (`fonts/`), all `font-display: swap`, variable files (one file serves all weights per subset):

| Family | Weights used | Role |
| --- | --- | --- |
| **Space Grotesk** | 300, 500, 600, 700 | Headings, eyebrows, wordmark, numbers in metric cards |
| **Plus Jakarta Sans** | 400, 500, 600, 700 (+ italic 400–600 shipped) | Body, buttons, UI text in mockups |

Only the `latin` + `latin-ext` subsets are needed for Spanish.

### Type scale (desktop → mobile ≤720px)
| Element | Font | Size / line-height / tracking | Mobile |
| --- | --- | --- | --- |
| H1 hero | Space Grotesk 700 | 68px / 1.02 / -.025em, `text-wrap: balance`, max 900px | 34px / 1.1 |
| H2 section | Space Grotesk 700 | 46px / 1.05 / -.025em | 28px / 1.15 |
| H2 light big ("no duerme") | Space Grotesk 700 | 50px / 1.04 | 28px |
| H2 integraciones | Space Grotesk 700 | 44px / -.025em | 28px |
| H2 clients | Space Grotesk 700 | 40px / 1.1, color accent | 24px |
| H2 CTA final | Space Grotesk 700 | 54px / 1.04 / -.03em | 30px / 1.12 |
| H3 card | Space Grotesk 700 | 24px / 1.15 | — |
| H3 WA banner | Space Grotesk 700 | 30px | — |
| H4 step | Space Grotesk 600 | 21px | — |
| Body section | Plus Jakarta 400 | 18px / 1.6 | — |
| Body card | Plus Jakarta 400 | 15px / 1.6 | — |
| Hero paragraph | Plus Jakarta 400 | 15px / 1.6 at .5 white | — |
| Eyebrow pill | Space Grotesk 600 | 12px, `.14em`, uppercase | — |
| Eyebrow plain (light) | Space Grotesk 700 | 13px, `.24em`, uppercase, `#64748B` | — |
| Hero tag line | Space Grotesk 600 | 15px, `.18em`, uppercase, .55 white | 11px, .06em |
| Wordmark "VALTHOR" | Space Grotesk 700 | 21px, `.16em` + "by MTS" 10px 500 `.34em` accent | — |

Highlight styles inside headings: text-gradient span (dark sections) or `<em>` italic in accent color (light sections: *catálogo*, *vendedor*).

## 4. Spacing and layout

- Content width: `max-width: 1200px; margin: 0 auto` (hero mockup 1080px, WA banner 1140px, demo 1160px).
- Section padding: `96px 32px` (standard), `90px 32px` (cards), `80px 0 84px` (clients), `100px 32px 0` (CTA + footer). Mobile: `52px 20px`.
- Two-column rows: `display:flex; gap:64px; align-items:center; flex-wrap:wrap`, each column `flex:1; min-width:340px`. Mobile: stacked, `gap:28px`. Reportes uses `wrap-reverse` so the text comes first on mobile.
- Card grid: `repeat(auto-fit, minmax(320px, 1fr))`, gap 24px.
- Nav: `padding: 24px 32px; gap: 40px`; logo 54px tall.
- Common rhythm: eyebrow → 24px → H2 → 22px → body → 30–32px → button.

## 5. Radii

| Value | Use |
| --- | --- |
| 100px | Hero announcement pill |
| 38px / 28px | Phone body / phone screen |
| 22px | WhatsApp banner |
| 20px | Feature cards |
| 18px | Browser-frame mockup, light cards (campaign, chat) |
| 16px | Step cards, demo frame |
| 13–14px | Hero CTA, floating chips, metric cards, bubbles |
| 11–12px | Buttons, inputs, inner images |
| 7–9px | Eyebrow pill, tags |
| 50% | Avatars, channel circles, integration chips, WhatsApp FAB |

## 6. Shadows

| Value | Use |
| --- | --- |
| `0 40px 100px rgba(0,0,0,.6), 0 0 0 1px rgba(139,92,246,.1)` | Browser-frame mockup |
| `0 30px 70px rgba(0,0,0,.6)` | Phone; `rgba(0,0,0,.5)` campaign card |
| `0 18px 40px rgba(0,0,0,.4)` / `0 14px 36px rgba(0,0,0,.4)` | Floating cards and chips on dark |
| `0 10px 28px rgba(139,92,246,.4)` | Standard gradient button |
| `0 14px 38px rgba(139,92,246,.5)` | Large CTA |
| `0 16px 42px rgba(139,92,246,.55), 0 0 26px rgba(217,70,239,.5)` | Button hover |
| `0 4px 18px rgba(15,23,42,.04)` | Light feature card |
| `0 24px 60px rgba(15,23,42,.1)` | Light chat card |
| `0 6px 18px rgba(15,23,42,.08)` | Integration chip (hover: brand-colored glow, `translateY(-8px) scale(1.12)`) |
| `0 8px 24px rgba(0,0,0,.35)` | WhatsApp FAB |

## 7. Components

### Buttons
- **Primary (gradient)**: brand gradient, `#fff`, Plus Jakarta 600, 16px, `padding:15px 26px`, radius 12px, shadow `0 10px 28px rgba(139,92,246,.4)`, trailing chevron icon. Hero: 17px, `16px 28px`, radius 13px. Final CTA: 18px, `17px 34px`.
- **Shine effect** (`.cta-shine`): skewed white highlight sweeps across on hover (`@keyframes vshine .9s`), plus `translateY(-3px) scale(1.04)`, stronger shadow, `brightness(1.08) saturate(1.18)`.
- **Nav link**: `rgba(255,255,255,.7)`, 15px 500. On mobile the "Iniciar sesión" link becomes a small gradient button and the nav CTA hides.
- There is no secondary/outline button on the current site; the new design needs one (ghost: transparent, 1px `rgba(255,255,255,.2)` border, white text) for "Agendar una llamada".

### Badges / pills
- **Hero pill**: `border:1px solid rgba(139,92,246,.4); background:rgba(139,92,246,.1); radius:100px; padding:8px 16px`, glowing 7px dot in accent2, 13px 600 text at .85 white.
- **Section eyebrow (dark)**: `background:rgba(139,92,246,.16); color:accent; radius:8px; padding:7px 14px`, Space Grotesk 12px uppercase.
- **Step tag**: `rgba(139,92,246,.18)` + accent text, 12px 600, radius 7px.
- **Inbox tags**: "Ventas" accent on `rgba(139,92,246,.18)`, "Soporte" `#38bdf8`.

### Cards
- **Feature card (light)**: white, `1px solid #eef0f4`, radius 20px, padding 32px, H3 + text + image pinned to bottom (192px tall, radius 12px). Hover lifts.
- **Step card (dark glass)**: see Glass card above, padding 24px.
- **WhatsApp banner**: lavender gradient banner, WhatsApp circle icon in the H3, "∞ Meta / Business Partner" lockup on the right.

### Mockup: browser-frame inbox (hero)
Frame 1080px wide, radius 18px. Title bar `#0d1526` with three traffic-light dots and URL text. Body 430px tall, three columns:
1. **Icon rail** 58px (`#0b1220`): gradient logo tile + 5 stroke icons (chat active on `rgba(139,92,246,.18)`, contacts, chart, send, settings at bottom).
2. **Conversation list** 262px: "Chats" title, search field, 4 rows (38px avatar with initials, name, time, preview with ellipsis, optional tag). Active row: `linear-gradient(90deg, rgba(139,92,246,.16), transparent)` + 2px accent left border.
3. **Thread**: header (avatar, name, "Asignado a VALTHOR Agente IA" in accent), bubbles (incoming `#1c2740`, outgoing brand gradient with "✦ Agente IA · 09:20" meta at .7 opacity, radius `14 14 3 14`), a white payment-link card, composer with gradient send button.
Mobile: rail and list hidden, only the thread shows.

### Mockup: phone with floating cards (Agente IA)
Phone 262×510, `#0b0b0f`, radius 38px, Dynamic-Island pill, gradient header with logo + "en línea", WhatsApp wallpaper `#e9e2d7`, bubbles `#dcf8c6` (out) / `#fff` (in), 11px text. Three white chips (140px, radius 13px, emoji + bold title + muted line: Objetivo / Voz de marca / Estrategia) float on the left, joined to the phone by dashed curves `stroke: rgba(139,92,246,.45); dasharray 5 5`. Mobile: chips and wires hidden, phone centered.

### Mockup: channel graph (Multicanalidad)
Three 50px channel circles (WhatsApp, Instagram, black) floating on the left, dashed curves to white chat cards on the right, one dark card "Categoría de interés". Hidden on mobile.

### Mockup: floating metric cards (Reportes)
Dark cards (`#0f1729`, border `rgba(255,255,255,.08)`, radius 14px, padding 16px) positioned absolutely and floating: label 11px at .5 white, big number Space Grotesk 700 26–30px, progress bar / mini bar chart / conic donut in brand colors. Mobile: stacked, max 280px, animation off.

### Logo marquee (clients)
White section, eyebrow + accent H2, a single row scrolling with `vmarquee 48s linear infinite` (content duplicated), edges faded with `mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)`, 62px gap. Logos 42px tall, `grayscale(1)`, `opacity:.55`, full opacity on hover. Some clients are plain text wordmarks styled in the two fonts.

### Integration chips
80px circles `#f1f5f9`, logo with 20px padding, brand-colored glow on hover. Wrapped flex row, gap 24px, max 880px.

### WhatsApp floating button
Fixed `bottom:24px; right:24px`, 58px circle `#25D366`, white glyph, `aria-label` present, shadow `0 8px 24px rgba(0,0,0,.35)`.

### Footer
Inside the final CTA section: top hairline `rgba(255,255,255,.08)`, logo + wordmark left, legal links (13px, .45 white) and © line right. Mobile: stacked.

## 8. Motion

`vfloat` (±12px, 5–6.5s), `vfloat2` (±18px, 6–7s) on floating cards/chips; `vpulse` (opacity .5↔.9); `vmarquee`; `vshine`. Transitions .2–.35s ease. The rebuild should wrap all of these in `@media (prefers-reduced-motion: no-preference)`.

## 9. Dark vs light section order (current home)

| # | Section | Background |
| --- | --- | --- |
| 1 | Hero + inbox mockup | dark (hero glows) |
| 2 | Clients marquee | light `#fff` |
| 3 | Multicanalidad | dark gradient `#0E0A1A → #120c22` |
| 4 | Agente IA (phone) | dark `#0E0A1A` + side glow |
| 5 | Integraciones | light `#fff` |
| 6 | Campañas | dark gradient `#120c22 → #0E0A1A` |
| 7 | Reportes (metric cards) | dark |
| 8 | Feature cards | lavender `#f4f2fb` + glows |
| 9 | WhatsApp API banner | light |
| 10 | Implementación (steps) | dark + glow |
| 11 | "No duerme" + chat card | light |
| 12 | Demo interactiva (iframe) | dark — **dropped in the rebuild** |
| 13 | CTA final + footer | dark + top glow |

## 10. Accessibility issues to fix while porting

Measured contrast (WCAG 2.x):

| Pair | Ratio | Verdict / fix |
| --- | --- | --- |
| `#8B5CF6` text on `#0E0A1A` | 4.60 | Passes AA barely; OK for large text |
| `#8B5CF6` eyebrow on its 16% tint over dark | 3.94 | **Fails** → use `#A78BFA` (≈7:1) for small purple text on dark |
| `#8B5CF6` text on white | 4.23 | **Fails** for body text → use `#7C3AED` (5.7:1) on light |
| White on `#D946EF` (gradient end) | 3.46 | **Fails** for 15–17px button text → gradient `#7C3AED → #C026D3` (≥4.7:1 across) keeps the look |
| `rgba(255,255,255,.45/.4/.35/.3)` on dark | 4.49 / 3.78 / 3.16 / 2.63 | **Fail** → floor real text at `.6` (7.3:1); keep lower alphas only for decorative mockup text marked `aria-hidden` |
| `#64748B` on white / on `#f4f2fb` | 4.76 / 4.29 | OK on white; on lavender use `#4B5563` |

Other: no visible focus styles (add a 2px `#A78BFA` outline with offset); CTAs are `<button>` with JS `window.open` (make them real `<a href>`); logos in nav/footer lack `alt`; decorative SVGs lack `aria-hidden`; only one `<footer>`, no `<main>`/`<header>` landmarks; `<title>` is just "Valthor"; `lang` attribute missing.
