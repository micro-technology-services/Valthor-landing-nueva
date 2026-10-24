# Foundations

Source of truth: the "Valthor — Turno noche" design system (tokens v2). `tokens.css` in this folder is generated from it.

## Color

Light / dark values. Use the CSS variable (`var(--noche)`) or the Tailwind utility (`bg-noche`, `text-tinta-3`), never the hex.

| Token | Light | Dark | Use |
|---|---|---|---|
| `noche` | #1b1530 | #120e22 | El marco del producto: menú lateral en escritorio, barra superior y barra inferior en el celular, cabecera y primera pantalla de la web. Nunca como fondo de contenido para leer. |
| `noche-2` | #2f2650 | #2a2245 | Elementos apoyados sobre noche: avatar, ítem activo del menú, botón secundario dentro del marco. |
| `noche-linea` | #3a3160 | #352c58 | Divisores y bordes dentro del marco noche. |
| `noche-texto` | #ffffff | #ffffff | Texto principal sobre noche. |
| `noche-texto-2` | #c9c2dc | #b8b0ce | Texto secundario e íconos inactivos sobre noche (10:1 en claro). |
| `fondo` | #f4f2f8 | #17132a | Fondo del área de contenido, detrás de los paneles. También el relleno de buscadores, selectores y burbujas del cliente dentro de un panel papel. |
| `papel` | #ffffff | #1e1933 | Superficie de contenido: paneles, listas, la hoja del celular. Va sobre fondo, sin borde. |
| `tinta` | #1b1530 | #f2effa | Texto principal sobre papel y fondo. |
| `tinta-2` | #4a4360 | #cfc8e2 | Texto secundario: descripciones, subtítulos. |
| `tinta-3` | #625a78 | #a59dbd | Texto terciario: horas, metadatos, placeholders (5,9:1 sobre fondo). Es el más claro permitido para texto. |
| `linea` | #e0dbec | #322a4d | Divisores dentro de un panel y borde de los botones secundarios sobre papel. Los paneles no llevan borde: se separan del fondo por tono. |
| `violeta` | #4c2a9e | #b9a4ff | La acción principal de cada pantalla, links y estado seleccionado sobre papel. Un solo botón violeta por pantalla. |
| `violeta-hover` | #3b1f80 | #cbbbff | Hover y presionado de violeta. |
| `sobre-violeta` | #ffffff | #1b1530 | Texto e íconos sobre violeta. |
| `violeta-luz` | #b9a4ff | #b9a4ff | Ítem activo y acciones dentro del marco noche. No usar sobre papel (no llega a 4,5:1). |
| `ia` | #ece8f6 | #2a2346 | La voz de la IA: fondo de sus burbujas, borradores y sugerencias, y la fila seleccionada de una lista. Todo lo que hizo la IA vive sobre este color. |
| `ia-firma` | #4c2a9e | #cbbbff | La firma "Tu IA" debajo de cada mensaje o acción de la IA. |
| `alerta` | #ff7a93 | #ff7a93 | Te necesita: lo único que el dueño tiene que resolver. Siempre como bloque lleno con texto sobre-alerta. Si una pantalla no tiene este color, la IA tiene todo bajo control. |
| `sobre-alerta` | #1b1530 | #1b1530 | Texto y botón sobre alerta (7:1). |
| `alerta-texto` | #b4234a | #ff9aae | Te necesita en tamaño chico sobre papel: contador, punto en un ítem de lista, "1 vencido". El rosa lleno no alcanza contraste como punto suelto. |
| `exito` | #1f7a4d | #5fd39a | Venta cerrada, pago aprobado, conectado. |
| `exito-suave` | #e3f4ea | #173527 | Fondo de etiquetas de éxito. |
| `aviso` | #8a5a00 | #f2c46b | Configuración pendiente o algo que conviene revisar sin urgencia. No es te necesita. |
| `aviso-suave` | #fff3d6 | #3a2e12 | Fondo de avisos. |
| `error` | #b42318 | #ff8a80 | Algo falló en el sistema: un pago rechazado, una integración caída, un campo inválido. |
| `error-suave` | #fdecea | #3d1a1a | Fondo de mensajes de error. |
| `foco` | #7c5cff | #b9a4ff | Anillo de foco de teclado, 2 px por fuera del control. |
| `canal-whatsapp` | #25d366 | #25d366 | Solo el ícono del canal WhatsApp. Nunca fondos ni botones. |
| `canal-instagram` | #e1306c | #e1306c | Solo el ícono del canal Instagram. |
| `canal-facebook` | #1877f2 | #1877f2 | Solo el ícono del canal Facebook. |
| `canal-mercadolibre` | #ffe600 | #ffe600 | Solo el ícono de Mercado Libre, siempre con su contorno oscuro. |
| `avatar-rosa` | #ffd9e0 | #4a2531 | Fondo de avatar sin foto, con iniciales en tinta. Se asigna por contacto según su nombre, siempre el mismo color para la misma persona. Nunca como fondo de otra cosa. |
| `avatar-azul` | #d9ecff | #1f3550 | Fondo de avatar sin foto, con iniciales en tinta. Se asigna por contacto según su nombre, siempre el mismo color para la misma persona. Nunca como fondo de otra cosa. |
| `avatar-verde` | #dff3e4 | #1c3a28 | Fondo de avatar sin foto, con iniciales en tinta. Se asigna por contacto según su nombre, siempre el mismo color para la misma persona. Nunca como fondo de otra cosa. |
| `avatar-amarillo` | #ffe9c7 | #45361a | Fondo de avatar sin foto, con iniciales en tinta. Se asigna por contacto según su nombre, siempre el mismo color para la misma persona. Nunca como fondo de otra cosa. |
| `avatar-lila` | #ece8f6 | #2a2346 | Fondo de avatar sin foto, con iniciales en tinta. Se asigna por contacto según su nombre, siempre el mismo color para la misma persona. Nunca como fondo de otra cosa. |

Avatar colors are assigned by name so the same person always gets the same one: sum the char codes of the display name, modulo 5, over `[avatar-rosa, avatar-azul, avatar-verde, avatar-amarillo, avatar-lila]`. Initials in `tinta`, 700.

## Type

One family: **Onest** (Google Fonts, weights 400–800). In Next.js load it with `next/font/google` and set it as `--font-sans`. Use `tabular-nums` for numbers, times and money.

| Style | Size / line | Weight | Tracking | Use |
|---|---|---|---|---|
| `web-display` | 56px / 58px | 800 | -0.025em | Solo el título principal de cada página de la web. En celular baja a 36/40. |
| `web-titulo` | 36px / 40px | 800 | -0.02em | Títulos de sección de la web. |
| `titulo` | 32px / 36px | 800 | -0.03em | Título de pantalla, uno por pantalla. En el celular 34/38 sobre el marco noche. |
| `subtitulo` | 18px / 24px | 700 | -0.01em | Título de panel o sección dentro de una pantalla. |
| `numero` | 34px / 38px | 800 | -0.03em | Métricas. Siempre en tinta, nunca en degradado ni en violeta. |
| `cuerpo` | 15px / 22px | 400 | 0 | Texto de interfaz y mensajes. En campos del celular sube a 16px para que iOS no haga zoom. |
| `cuerpo-fuerte` | 15px / 22px | 600 | 0 | Botones, nombres en listas, etiquetas de campo. |
| `chico` | 13px / 18px | 500 | 0 | Metadatos, ayudas debajo de campos, firma "Tu IA". |
| `micro` | 12px / 16px | 500 | 0 | El tamaño mínimo. Horas, contadores, textos de la barra inferior. Nada más chico que esto. |

`tokens.css` defines these as Tailwind v4 utilities with the same names (`titulo`, `cuerpo`, `chico`…) plus `destacado` (17/22/700, the TeNecesita headline). Use the names; on Tailwind v3 add them as a plugin. `text-sm` (14) and `text-base` (16, mobile inputs) are also allowed. Any other `text-[..px]` is banned.

## Radius

| Utility | px | Use |
|---|---|---|
| `rounded-imagen` | 8 | Images inside bubbles, product thumbnails |
| `rounded-fila` | 14 | List rows, small containers inside a panel |
| `rounded-burbuja` | 20 | Chat bubbles (sender corner 6 px), TeNecesita card |
| `rounded-panel` | 24 | Panels |
| `rounded-hoja` | 28 | The content sheet over the `noche` frame |
| `rounded-full` | 999 | Buttons, inputs, search, selectors, tags, avatars, switches, floating bars |

## Spacing

4 px base, same as Tailwind: `gap-2` 8, `gap-3` 12, `p-4` 16, `gap-5`/`p-5` 20, `p-6` 24, `gap-8` 32. Panels pad 20–24 px. Mobile side margin 16 px. Leave 96 px at the bottom of mobile lists for the floating nav.

## Shadow

Only `shadow-flotante` (`0 8px 24px rgba(27,21,48,.16)`, darker in dark mode), only on floating elements.

## Control heights

44 px mobile, 40 px desktop, 32 px only in dense desktop toolbars. Floating bar button on mobile: 48 px.
