# Components

Specs and reference markup (React + Tailwind, using the utilities from `tokens.css`). Adapt to the repo's existing component files instead of creating duplicates: if `src/components/ui/button.tsx` exists, restyle it to this spec rather than adding a new Button.

Contents: Panel · Boton · TeNecesita · Burbuja · BarraFlotante · BarraInferior · MenuLateral · Selector · Interruptor · Avatar · FilaDeLista · Etiqueta · Campo · EstadoVacio · Metrica

---

## Panel

The basic container. `papel` on `fondo`, `rounded-panel`, padding 20–24 px, **no border, no shadow**. Groups inside are separated by space (`gap-5`), not dividers.

```tsx
<section className="rounded-panel bg-papel p-5">…</section>
```

shadcn `Card` must be restyled to exactly this (remove `ring-1 ring-foreground/10`, `shadow-*`, `border`).

## Boton

Pill, verb on the label. Heights: `h-11` mobile, `md:h-10` desktop. Text `cuerpo-fuerte`.

| Variant | Classes |
|---|---|
| Principal (one per screen) | `rounded-full bg-violeta text-sobre-violeta hover:bg-violeta-hover px-5` |
| Secundario | `rounded-full bg-fondo text-tinta px-5` (on `papel`); on `fondo` use `bg-papel` |
| Fantasma | `rounded-full text-violeta px-3` |
| Sobre noche (floating bars, frame) | `rounded-full bg-papel text-tinta font-bold px-5` |
| Solo ícono | `size-10 rounded-full bg-fondo text-tinta-2` + `aria-label` |

Focus: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foco`. Disabled: `disabled:opacity-40`. No gradients, no shadows, no trailing "→", no generic labels ("Enviar", "Aceptar").

## TeNecesita

The signature piece. Appears only when something needs the owner; the only use of `alerta`.

```tsx
<div className="flex items-center gap-3 rounded-burbuja bg-alerta p-4 pl-5 text-sobre-alerta">
  <div className="flex flex-1 flex-col gap-0.5">
    <span className="chico font-semibold">Te necesita</span>
    <span className="destacado">1 chat espera a una persona</span>
  </div>
  <button className="h-11 rounded-full bg-sobre-alerta px-5 cuerpo-fuerte text-noche-texto">Atender</button>
</div>
```

- Triggers: a customer asked for a person or got angry; the AI couldn't answer and handed off; an appointment or sale is stuck on an owner decision.
- Several pending items → one card with one row each (big number + text + small pill button). Never two pink cards on one screen.
- Small version in lists: a line "Te necesita: …" in `text-alerta-texto font-semibold` and the counter as `bg-alerta text-sobre-alerta` pill. In nav: a 10 px `bg-alerta` dot with a 2 px ring of the background color.
- Not for errors (`error`), setup reminders (`aviso`), news or metrics.

## Burbuja (chat message)

Four voices, distinguishable at a glance:

| Voice | Side | Style | Signature below |
|---|---|---|---|
| Customer | left | `bg-fondo` (inside a `papel` panel), `rounded-burbuja rounded-tl-[6px]` | time in `micro text-tinta-3` |
| AI | right | `bg-ia text-tinta rounded-burbuja rounded-tr-[6px]` | "Tu IA, 17:09" `chico font-semibold text-ia-firma` |
| Team member | right | `bg-violeta text-sobre-violeta rounded-burbuja rounded-tr-[6px]` | "Vos, 16:48" or the name, `chico text-tinta-3` |
| System | center | no bubble, `chico text-tinta-3 text-center` | — |

Padding `px-4 py-3`, text `cuerpo`. Max width 68 % desktop, 86 % mobile. Dates ("Ayer") in a `h-7 rounded-full bg-fondo px-3 chico text-tinta-3` pill. Images inside: `rounded-imagen`, 8 px margin. Links show the store name ("Tienda Nube"), not the raw URL; long text uses `break-words`. Audio: dark play circle (`bg-tinta`) + waveform bars in `tinta-3`/`noche-texto-2` + duration.

## BarraFlotante

The action of the moment, floating over the content, with one sentence explaining why. Replaces any disabled input or dead end.

```tsx
<div className="absolute inset-x-5 bottom-5 flex items-center gap-3 rounded-full bg-noche py-2 pl-[22px] pr-2 shadow-flotante">
  <span className="flex-1 chico text-noche-texto-2">Pasaron 24 h sin respuesta. Para escribirle, mandá una plantilla aprobada.</span>
  <button className="h-11 rounded-full bg-papel px-5 cuerpo-fuerte font-bold text-tinta">Mandar plantilla</button>
</div>
```

Mobile: if the text wraps, use `rounded-hoja p-4 flex-col gap-3` and a full-width 48 px button. One action only. Content behind leaves bar height + 24 px free. Examples: 24 h window closed → "Mandar plantilla"; AI is handling the chat → "Tomar chat".

## BarraInferior (mobile nav)

Floating pill dock, < 768 px only. `fixed inset-x-4 bottom-[calc(16px+env(safe-area-inset-bottom))] rounded-full bg-noche p-1.5 shadow-flotante flex justify-around`.

- Items: Inicio, Chats, Agenda, Ventas, Más (the rest of the sections live in a "Más" sheet).
- Inactive: icon only, 22 px, `text-noche-texto-2`, 56×52 hit area, `aria-label`.
- Active: expands to a `bg-papel text-tinta` pill with icon in `text-violeta` + label (`chico font-bold`).
- Te necesita: 10 px `bg-alerta` dot.
- Hidden inside a conversation and inside form steps (the BarraFlotante takes its place).

## MenuLateral (desktop nav)

`bg-noche`, 248 px, collapsible to 72 px with the white isotipo. Logo white at the top. Everyday destinations without a group title; settings under "Configurás una vez" in `chico text-noche-texto-2` — sentence case, never uppercase.

Items: `flex h-10 items-center gap-3 rounded-full px-3 text-sm text-noche-texto-2`, icon 19 px stroke 1.6. Active: `bg-papel text-tinta font-semibold` with icon `text-violeta`. Te necesita counter on the right (`bg-alerta text-sobre-alerta`). Bottom: credits card `rounded-burbuja bg-noche-2 p-3.5` with the number and a `bg-violeta-luz` bar on `bg-noche-linea`, then the user.

## Selector (segmented control)

For 2–5 views of the same list ("Todas, Míos, Pendientes, IA"). Replaces underline tabs and loose filter buttons.

```tsx
<div role="tablist" className="flex gap-1 rounded-full bg-fondo p-1">
  <button role="tab" aria-selected className="h-9 flex-1 rounded-full bg-tinta text-sm font-semibold text-papel">Todas</button>
  <button role="tab" aria-selected={false} className="h-9 flex-1 rounded-full text-sm text-tinta-2">Míos</button>
</div>
```

## Interruptor (switch)

For something that stays on: the AI in a chat, a reminder, an automation. Track 44×28 (40×26 mobile), `rounded-full`, 22 px `bg-papel` knob. Off: `bg-noche-texto-2` (or `bg-tinta-3` on noche). On: `bg-violeta`, knob right. Always labeled inside a pill (`bg-fondo`, or `bg-noche-2` on the frame): "Tu IA". `role="switch"` + `aria-checked`. Applies instantly, no save button. Replaces "Activar IA" / "IA desactivada" button pairs.

## Avatar

44 px in desktop lists, 48 px on mobile and chat header, 32–34 px when tight. Photo if available; otherwise two initials in `tinta` 700 on the `avatar-*` color picked by name (see foundations). Channel dot bottom-right: 16–18 px circle in `bg-canal-whatsapp|instagram|facebook|mercadolibre` with a 2 px ring of the surface color. Don't write the channel name in the row. Own account: `bg-violeta-luz`.

## FilaDeLista (conversation / contact row)

`flex items-center gap-3 rounded-fila p-3 hover:bg-fondo`. Avatar, then name (`cuerpo-fuerte font-bold`) with time (`micro text-tinta-3`) on the same line, then preview (`text-sm text-tinta-2 truncate`) with unread counter (`bg-tinta text-papel` pill, 22 px — not pink). Selected row: `bg-ia`. A row that needs the owner shows "Te necesita: …" in `text-alerta-texto` and a pink counter. Previews written by the team start with "Vos:". Unsupported messages read "Mensaje que WhatsApp no deja leer", never "[unsupported]".

## Etiqueta (tag)

Pill, `h-[30px]` (24 px in dense rows), `px-3 chico font-semibold`.

| Variant | Classes | Example |
|---|---|---|
| Neutral | `bg-fondo text-tinta-2` | interests, lead temperature ("Tibia"), origin |
| Destacada | `bg-tinta text-papel` | the current sales stage only |
| IA | `bg-ia text-ia-firma` | "Borrador de tu IA" |
| Éxito | `bg-exito-suave text-exito` | "Venta cerrada" |
| Aviso | `bg-aviso-suave text-aviso` | "Sin recordatorio" |
| Error | `bg-error-suave text-error` | "Pago rechazado" |

No emoji temperatures (🔥🌤️❄️): plain words. There is no pink tag.

## Campo (input)

Filled, no border. Label above in `chico font-semibold text-tinta-2` (always visible; placeholder never replaces it). Single line: `h-11 rounded-full bg-fondo px-[18px] text-base md:cuerpo` (16 px on mobile so iOS doesn't zoom, 15 px from md up). Multiline: same fill, `rounded-burbuja`. Placeholder `text-tinta-3` with a real example ("Ej.: Si preguntan por stock, decí que quedan pocas unidades"). Focus: `bg-papel` + `foco` ring. Error: `bg-error-suave`, message below in `text-error` saying how to fix it. Search on `noche`: `bg-noche-2 text-noche-texto`.

## EstadoVacio (empty state)

Inside a `Panel`, centered, `py-8`: title in `subtitulo` saying what's missing, one sentence in `text-tinta-2` saying what it's for, and the primary pill button that fills it. The current `EmptyState` component needs an `action` prop — 43 screens use it.

| Screen | Title | Action |
|---|---|---|
| Agenda without providers | Todavía no cargaste prestadores | Cargar prestador |
| Empty catalog | Tu IA todavía no conoce tus productos | Conectar tienda |
| Chats, none selected | Elegí una conversación de la lista | (none — the list is the action) |
| Reminders | No tenés recordatorios para hoy | Ver agenda (fantasma) |

Thor (the mascot) may appear only in first-time empty states of Inicio and Chats.

## Metrica

Label `chico font-semibold text-tinta-3` → number `numero text-tinta` → optional change pill (`bg-exito-suave text-exito` up, `bg-error-suave text-error` down, always with the sign written: "+12 %", "−94 %") or "¿Cómo se calcula?" link. Several metrics share one Panel in a grid, separated by space. A zero caused by missing setup says so and offers the action: "0 turnos confirmados. Activá los recordatorios".
