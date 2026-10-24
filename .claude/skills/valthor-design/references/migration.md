# Migrating existing screens

Context (audit of `valthor-crm-v2`, Oct 2026): the problem is adoption, not direction. Inicio and the Automatizaciones list already follow the clean style; most other screens were built with the old "demo" kit (violet→fuchsia gradient, floating shadows, 3D tilt). The tokens themselves invite the old look while they exist, so the first step is changing the base, then screens in order.

## Step 0 — base (three small PRs, they affect every screen)

The team doing this is not the backend owner, and CI is down, so the base goes in small, reversible steps. Each PR: branch, run the app locally, screenshots of Inicio, Conversaciones and Agenda at 390 and 1440 px in light and dark, before and after.

**PR 0a — tokens and font, no visual change expected yet.**
1. Before editing, read `src/app/globals.css`, `src/app/layout.tsx` and `package.json` to confirm the Tailwind version and how fonts are loaded. Report it in one line.
2. Add the `:root` / `.dark` blocks, the `@theme inline` utilities and the type `@utility` classes from `references/tokens.css`. **Do not** paste the shadcn mapping block yet, and keep every old variable, so nothing changes on screen.
3. Load Onest with `next/font/google` and add it as a second font variable; don't switch `--font-sans` yet.
4. Copy `assets/logos/*.svg` to `public/brand/`.
5. Add `scripts/check_ui.sh` to the repo and a `package.json` script (`"check:ui"`) that runs it on files changed against `main`. No CI hook (CI is down); it's run by hand before each PR.

**PR 0b — the switch.** Paste the shadcn mapping block, switch `--font-sans` and `--font-heading` to Onest, swap the logo in the sidebar and auth screens for the white SVG. This one changes how every screen looks: check all main screens in both themes and list anything that broke.

**PR 0c — primitives.** Restyle `src/components/ui/`: `card.tsx` → Panel spec (no ring, border or shadow, `rounded-panel`); `button.tsx` → Boton spec (pills, 44/40 px); `input.tsx` → Campo spec; `EmptyState.tsx` → add an optional `action` prop (existing callers keep working). Add a comment in `globals.css` marking the old utilities (`bg-gradient-brand*`, `text-gradient-brand`, `bg-app`, `shadow-float*`, `animate-pulse-dot`, `.kanban-card`) as deprecated; don't delete them until no screen uses them.

If something in the base needs a change outside the frontend, stop and ask.

## Step 1+ — screens, in this order

1. **Primera impresión**: login, signup, forgot/reset password, invite, onboarding/bienvenida. Today they sit on gradient washes with gradient buttons.
2. **Uso diario**: Conversaciones (`chats/`, highest score in the audit) → Comentarios de Meli and Reels (they share a kit with chats) → Contactos (emoji card titles) → Agenda (raw Tailwind colors).
3. **Resto**: Fidelización (`bg-app` + kanban card), Integraciones (gradient H1, lift cards), Entrenamiento IA (dashed gradient boxes), Ventas (decide if the kanban keeps any motion — default: no tilt, no gloss), Correo, Inmobiliaria.

Reference screens already close to the system: Inicio (`HomeScreen.tsx`), Automatizaciones list/detail.

One screen per PR. Each PR: before/after screenshots at 1440 px and 390 px, `check_ui.sh` clean on touched files.

## Replacement table

| Old | New |
|---|---|
| `bg-gradient-brand`, `bg-gradient-brand-rich` on buttons | Boton principal (`bg-violeta`) |
| `bg-gradient-brand` on icon tiles | plain icon in `text-tinta-2`, no tile |
| `bg-gradient-brand-soft`, `bg-app` page/section wash | `bg-fondo` (page) or `bg-papel` (panel) |
| `text-gradient-brand` on titles/KPIs | `text-tinta` with the `titulo` / `numero` style |
| `shadow-float`, `shadow-sm…xl`, `ring-1 ring-foreground/10` on cards | nothing — Panel separates by tone |
| `shadow-float` on popovers/menus | `shadow-flotante` |
| `border` + `rounded-xl` panel | `rounded-panel bg-papel` |
| `rounded-xl` on buttons/chips/inputs | `rounded-full` |
| `rounded-2xl`, `rounded-3xl`, `rounded-[18px]` etc. | `rounded-burbuja` / `rounded-panel` / `rounded-hoja` by size |
| `hover:-translate-y-*`, `hover:scale-*`, tilt, gloss | `hover:bg-fondo` (rows) or nothing |
| `animate-pulse-dot` | static dot, or nothing |
| `backdrop-blur` | solid `bg-papel` / `bg-noche` |
| `uppercase tracking-*` eyebrow | sentence-case label `chico font-semibold text-tinta-2`, or delete it |
| `text-[0.7rem]`, `text-[11px]`, `text-[10.5px]`… | `chico` (13) or `micro` (12) |
| emoji in titles/labels (🎁 👥 📝 🎂 🔥) | Lucide icon or nothing |
| `Sparkles` icon for AI | `bg-ia` surface + "Tu IA" signature |
| `→` in text | remove |
| `text-green-600`, `bg-amber-50`, hex | `text-exito`, `bg-aviso-suave`, etc. |
| `#7C3AED`, `#7b2ff7`, `#d633e8` | `violeta` / `violeta-luz` by context |
| "IA desactivada" + "Activar IA" buttons | Interruptor "Tu IA" |
| disabled composer when the 24 h window is closed | BarraFlotante "Mandar plantilla" |
| sidebar on mobile | BarraInferior; sidebar `hidden md:flex` |
| two-pane list+detail on mobile | two routes/screens |

## Gotchas

- Don't override Tailwind's default `rounded-sm/md/lg/xl` scale: old screens would change silently. The system uses named radii (`rounded-panel`, …) on purpose.
- Keep chat reactions (customer emojis) — they are content, not UI.
- The Mercado Libre yellow, Google sign-in colors and WhatsApp green inside their own logos are allowed (brand marks), only as marks.
- Dark mode: test every migrated screen in both themes; `noche` and `fondo` are close in dark, which is expected (the frame merges).
