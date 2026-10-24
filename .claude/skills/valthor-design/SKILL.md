---
name: valthor-design
description: "Valthor's own design system ('Turno noche') for UI work on the Valthor app (valthor-crm-v2, platform.valthor.app, web and mobile). Use it whenever you build, change, review or migrate a screen, component, email layout or UI copy in the app, even for a small tweak like a button, an empty state or a color, and whenever someone says the app looks generic, 'made with AI', old, or inconsistent. It replaces shadcn/Tailwind defaults and the old violet-to-fuchsia kit with Valthor's tokens, components, voice and banned-pattern list. For the marketing website (valthor.app) it only sets the shared brand rules (logo, positioning, voice) because the website keeps its own design."
---

# Valthor design system — Turno noche

Valthor is an AI suite for Latin American SMBs (not a "CRM"). Its promise is *Agent as a Service*: the customer doesn't get a tool to work with, they get work already done and they supervise it. The interface has to make that visible. The design rule that comes from it: **if a screen gives the owner work, it's wrong; if it takes work away, it's right.**

"Turno noche" (night shift) is the visual idea: the product is a dark cabin that keeps working all night (the **frame**, `noche`), with light content inside that is comfortable to read (the **sheet**, `fondo` + `papel`). One pink color, `alerta`, appears only when something needs the owner.

The approved visual reference is "versión 2" of the Conversaciones mockup (Oct 2026): pill-shaped controls, borderless panels separated by tone, big tight titles, a few floating elements, colored avatars.

## Before you write any UI code

1. Read `references/foundations.md` (colors, type scale, radii, spacing) once per session.
2. If the repo doesn't have the tokens yet, install `references/tokens.css` into the global stylesheet first (see `references/migration.md` → "Step 0"). Never hardcode the hex values in components.
3. Find the closest component in `references/components.md` and build from its spec instead of from the shadcn default.
4. Write the copy following `references/voice.md` (Rioplatense Spanish with voseo).
5. Website work (valthor.app): read `references/web.md` **first and only**. The website keeps its current design; Turno noche does not apply there beyond logo, positioning and voice. Skip the rest of this file.
6. Migrating an existing screen: follow `references/migration.md`.

## The three questions for every screen

Ask them before you finish. They catch most mistakes.

1. **Can you tell what the AI did from what a person did?** Everything the AI did sits on `ia` and is signed "Tu IA" in `ia-firma`. A team member's message is the only filled `violeta` bubble.
2. **Is there pink?** If yes, it must be something the owner has to resolve now (a customer waiting for a person, the AI couldn't answer, a stuck appointment or sale). If no, the screen is saying "everything is under control" — that is also a message. Errors are `error`, pending setup is `aviso`; neither is pink.
3. **Does it give work or take it away?** One primary action per screen in `violeta`. If there are two violet buttons, one is wrong. Never a disabled field that lets the user do nothing — replace it with the action that unblocks them (see BarraFlotante).

## Core rules

**Layout**
- Desktop: `noche` sidebar (248 px, collapsible to 72) + a `fondo` sheet with `rounded-hoja` (28 px) set into the frame. Screen title top-left in `titulo` (32 px / 800 / -0.03em). Panels in `papel`, `rounded-panel` (24 px), **no border, no shadow**.
- Mobile (< 768 px): **no sidebar**. Title on the `noche` frame (34 px), content on a `papel` sheet with 28 px top corners, and a **floating pill bottom nav** (Inicio, Chats, Agenda, Ventas, Más). List and detail are two screens, never two squeezed panels. Inbox and Agenda are used mostly on the phone: design them mobile-first.
- Controls are 44 px tall on mobile, 40 px on desktop. Inputs on mobile use 16 px text (iOS zoom).

**Shape**
- Everything you tap is a pill (`rounded-full`): buttons, inputs, search, selectors, tags, switches, floating bars.
- Containers grow in radius with size: rows `rounded-fila` 14, bubbles and TeNecesita `rounded-burbuja` 20, panels `rounded-panel` 24, sheet `rounded-hoja` 28. No other radii.
- Separate by tone and space, not lines. `linea` only for dividers inside dense content and secondary-button borders on `papel`.
- Only floating things get a shadow, and only `shadow-flotante`: the chat action bar, the mobile nav, menus, dialogs.

**Color** — one job per color (full table in foundations):
- `noche` frame · `fondo`/`papel` sheet · `tinta`, `tinta-2`, `tinta-3` text (nothing lighter than `tinta-3` for text).
- `violeta` = the one primary action and links. Never titles or metrics.
- `ia` / `ia-firma` = what the AI did (bubbles, drafts, suggestions, selected row).
- `alerta` (+ `sobre-alerta` text) = te necesita, as a filled block or counter. Small text on `papel` uses `alerta-texto`.
- `exito`, `aviso`, `error` (+ `-suave`) = system states. `canal-*` = channel marks only. `avatar-*` = avatar backgrounds only.
- Dark mode exists: always use tokens, never hex, so both themes work.

**Type** — one family, **Onest**. Nine styles only: `web-display`, `web-titulo`, `titulo`, `subtitulo`, `numero`, `cuerpo`, `cuerpo-fuerte`, `chico`, `micro`. Nothing smaller than 12 px. Sentence case everywhere. Metrics in `tinta` with `tabular-nums`.

**Icons** — Lucide line icons, stroke 1.6–1.75, 18–22 px, colored like their text. No filled icons, no icons in colored boxes, **no `Sparkles` to mean "AI"** (the AI is identified by `ia` + "Tu IA").

**Logo** — SVGs in `assets/logos/`. In the app: white version on `noche` (`valthor-logo-blanco.svg`, `valthor-isotipo-blanco.svg` when collapsed). The gradient color version is for the website and sales material; in the app it is the only gradient allowed. Never write "CRM" next to the logo.

## Banned (these make Valthor look AI-generated)

Gradients of any kind in UI (`bg-gradient-brand*`, `text-gradient-brand`, `bg-app`, gradient text, gradient buttons) · shadows on cards/panels (`shadow-float*`, `shadow-sm…2xl`, `ring-foreground/*`) · borders around panels · hover lift/scale (`hover:-translate-y`, `scale-[1.02]`), 3D tilt, gloss · `animate-pulse-dot` and decorative motion · `backdrop-blur` · uppercase + tracking eyebrows · emojis in the interface (customer reactions inside chat are content and stay) · `→` appended to text or buttons · raw hex or raw Tailwind palette colors (`text-green-600`, `bg-amber-50`) · arbitrary sizes (`text-[0.7rem]`, `text-[10.5px]`) and radii (`rounded-[18px]`) · the old violet `#7b2ff7` / fuchsia `#d633e8` · Inter/Plus Jakarta Sans for new work · "Sparkles" icon as AI marker · empty states without an action · tuteo ("Selecciona") in copy.

Run `scripts/check_ui.sh <path>` before you finish to list any of these in the files you touched.

## Motion

Motion answers an action (open, expand, confirm) and shows what changed: 150–220 ms, ease-out, opacity + small translate. No ambient or looping animation. Respect `prefers-reduced-motion`.

## Definition of done for any UI change

- Uses only tokens from `tokens.css`; works in light and dark.
- Mobile layout checked at 390 px wide: no sidebar, bottom nav, 44 px targets, nothing overflows.
- Passes the three questions above.
- `scripts/check_ui.sh` reports nothing new in the touched files.
- Text contrast ≥ 4.5:1 (the tokens already pass when used as documented); visible keyboard focus (`foco` ring); icon-only buttons have `aria-label`.
- Copy in voseo, verbs on buttons, empty states with their action.

## Who does this work

The visual migration is done by Mati's team with Claude Code, not by the backend/engine owner. Product and visual decisions (what a screen shows, which action is primary) are Mati's. Stay in the frontend: `src/app/**`, `src/components/**`, global styles, fonts, assets. Don't touch API routes, server actions' logic, data fetching, database, the agent engine (onel-agents), the router or channel adapters — if a UI change seems to need one of those, stop and say so instead of changing it.

Because CI is not running, there is no automatic safety net: work on a branch, keep each change small (one screen or one primitive per PR), run the app locally, and show before/after screenshots at 390 px and 1440 px, in light and dark, before asking for a merge. If a design rule conflicts with how the code works, explain the conflict in plain language instead of silently working around it.
