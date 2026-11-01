# Cómo agregar un tutorial

Cada tutorial es **un solo archivo Markdown** en esta carpeta (`src/content/tutoriales/`). Para publicar uno nuevo no hace falta tocar código: creas el archivo, lo revisas en la vista previa y lo publicas.

Este archivo (`README.md`) no se publica.

## 1. Crea el archivo

- Nómbralo igual que el `slug`: `mi-tutorial.md` → se publica en `www.valthor.app/tutoriales/mi-tutorial`.
- Copia uno de los ejemplos (`conectar-catalogo-tienda-nube.md` o `prompts-fotos-de-producto-con-ia.md`) y cámbiale el contenido.

## 2. Completa el encabezado (frontmatter)

Va arriba de todo, entre dos líneas `---`.

```yaml
---
title: "Cómo conectar tu catálogo de Tienda Nube a Valthor"
slug: conectar-catalogo-tienda-nube
description: "Una línea que resume el tutorial (se usa en las tarjetas y en Google)."
summary: "«En corto»: 2 o 3 líneas con lo que la persona va a lograr."
category: valthor              # valthor | ia-para-tu-negocio
level: Básico                  # Básico | Intermedio | Avanzado
duration: "8 min"
date: 2026-10-28               # año-mes-día; ordena la lista (el más nuevo primero)
author: Equipo Valthor         # opcional, por defecto «Equipo Valthor»
cover: /tutoriales/mi-tutorial/portada.webp   # opcional
coverAlt: "Descripción de la portada"          # opcional, recomendado si hay portada
tags: [tienda nube, catálogo, ecommerce]
video: https://www.youtube.com/watch?v=XXXXXXXXXXX   # opcional (YouTube o Instagram)
specs:                         # opcional: se muestra como «Ficha»
  Nivel: Básico
  Requisitos: "Cuenta de Valthor y tienda en Tienda Nube"
  Costo: Incluido en tu plan
  Dónde se usa: "WhatsApp, Instagram y Facebook"
resourceUrl: https://github.com/...   # opcional: GitHub, Google Drive o Notion
socialUrl: https://www.instagram.com/p/...   # opcional: link chico «Visto en Instagram»
gated: false                   # true = pide nombre y correo para ver la guía completa
featured: false                # true = aparece destacado arriba de la lista
draft: true                    # true = borrador (no se publica)
---
```

| Campo | Obligatorio | Notas |
| --- | --- | --- |
| `title` | Sí | El título de la página. En Google se ve como «{title} \| Tutoriales Valthor». |
| `slug` | Sí | Solo minúsculas, números y guiones. Es la dirección de la página: no lo cambies después de publicar. |
| `description` | Sí | Una línea. Ideal entre 140 y 160 caracteres (es la descripción de Google). |
| `summary` | Sí | El recuadro «En corto». |
| `category` | Sí | `valthor` («Cómo usar Valthor») o `ia-para-tu-negocio` («IA para tu negocio»). |
| `level` | Sí | `Básico`, `Intermedio` o `Avanzado`, con tilde y mayúscula. |
| `duration` | Sí | Texto libre, por ejemplo `"8 min"`. |
| `date` | Sí | Formato `2026-10-28`. |
| `tags` | No | Lista entre corchetes. Sirven para la búsqueda y para elegir los tutoriales relacionados. |
| `specs` | No | Pares «Nombre: valor». Puedes usar los nombres que quieras. |
| `cover` | No | Imagen en `public/tutoriales/<slug>/`, idealmente 1200 × 630 (también se usa al compartir en redes). Sin portada, la tarjeta muestra un degradado de la marca. |
| `gated`, `featured`, `draft` | No | `true` o `false`. Por defecto, `false`. |

Si falta un campo obligatorio o un valor no es válido, la vista previa falla y te dice en qué archivo y campo está el problema.

## 3. Escribe el contenido

Debajo del encabezado va el texto en Markdown normal. Escribe en español neutro con «tú» (tienes, puedes, conecta) y sin las palabras «agente» ni «CRM» en los títulos.

### Secciones

Cada `## Título` es una sección. Se numeran solas (01, 02, 03…) y forman el índice «Ir directo a».

```markdown
## Conecta tu tienda
```

### Pasos

Una lista numerada se muestra como pasos con círculos. Si el tutorial tiene pasos, Google lo recibe como guía paso a paso (HowTo).

```markdown
1. Entra a Valthor y abre **Catálogo**.
2. Toca **+ Productos**.
```

### Tablas

```markdown
| Si tu tienda tiene… | Te recomendamos |
| --- | --- |
| Menos de 200 productos | Importar todo |
```

### Avisos (consejo y atención)

```markdown
> [!TIP] Título del consejo
> Texto del consejo.

> [!WARNING] Título del aviso
> Texto del aviso.
```

También existe `[!NOTE]`. El título es opcional.

### Bloques de prompt (con botón «Copiar»)

Un aviso `[!PROMPT]` **seguido inmediatamente** de un bloque de código. La primera línea es el título; la segunda, una nota corta que se muestra arriba del recuadro.

````markdown
> [!PROMPT] Fondo blanco de catálogo
> Sube tu foto y pega el prompt tal cual.

```text
Toma el producto de la foto y colócalo sobre un fondo blanco…
```
````

Cualquier otro bloque de código (entre tres comillas invertidas) también tiene botón «Copiar».

### Video

Pega el link de YouTube o de Instagram **solo, en su propia línea**, y se muestra como video:

```markdown
https://www.youtube.com/watch?v=XXXXXXXXXXX
```

El video carga recién cuando la persona toca «Ver video». Si pones el link en `video:` del encabezado y no lo pegas en el texto, se muestra arriba del tutorial.

### Imágenes

Guárdalas en `public/tutoriales/<slug>/` y úsalas así:

```markdown
![Pantalla del Catálogo con el botón + Productos](/tutoriales/mi-tutorial/catalogo.webp)
```

El texto entre corchetes describe la imagen para quien no la ve: no lo dejes vacío.

### Apéndice «Para curiosos»

Un bloque que se abre y se cierra. Deja una línea en blanco después de `<summary>` y antes de `</details>`:

```markdown
<details class="para-curiosos">
<summary>Para curiosos: qué pasa por detrás</summary>

Texto del apéndice, con **Markdown** normal.

</details>
```

### Guía con registro (`gated: true`)

Con `gated: true`, escribe esta línea donde quieres cortar:

```markdown
<!-- gate -->
```

Lo que está arriba se ve completo. Lo de abajo se ve borroso, con la tarjeta «Desbloquea la guía completa»:

- **Recíbela por WhatsApp:** abre WhatsApp con el mensaje «Hola, quiero la guía: {título}». El número se configura en la variable `VALTHOR_WHATSAPP_NUMBER` (solo dígitos, con código de país).
- **Formulario:** nombre y correo (obligatorios), WhatsApp (opcional) y la casilla «Acepto que me contacten por WhatsApp» (desmarcada; si la marcan, el WhatsApp pasa a ser obligatorio). Se envía a la variable `LEAD_WEBHOOK_URL` como `{ name, email, telefono, consent, tutorialSlug, source: "tutoriales", mensaje: "Pidió la guía: {título}", utm_campaign: "tutoriales" }`; `telefono` solo viaja si lo completaron. Sin la casilla marcada, Valthor no inscribe al contacto en automatizaciones de WhatsApp. Si el envío sale bien, la guía se desbloquea y queda desbloqueada en ese navegador.
  - **Recomendado:** un formulario web de Valthor (Campañas → Formularios), con la dirección `https://platform.valthor.app/api/public/forms/<token>`. Cada persona entra como contacto, y la guía que pidió queda en la consulta y en la campaña «tutoriales».
  - Si usas otro servicio (Zapier, Make, n8n…), tiene que aceptar pedidos desde `www.valthor.app` (CORS).

El texto completo queda igual en la página, para que Google y los asistentes de IA lo lean: el desenfoque solo pide los datos, no protege el contenido. No pongas detrás del corte nada que no pueda ser público.

## 4. Revisa y publica

1. Mientras `draft: true`, el tutorial se ve en `npm run dev` (con la etiqueta «Borrador») pero **no** se publica en www.valthor.app. Para verlo en un build local: `TUTORIALES_SHOW_DRAFTS=true npm run build && npm run preview`.
2. Cuando esté listo, cambia a `draft: false`.
3. Sigue el proceso de siempre (vista previa en el pull request y merge), como explica [`docs/GUIA.md`](../../../docs/GUIA.md). Al publicarse, el tutorial entra solo en la lista, en el sitemap y en los relacionados.

## Reglas del control automático

`npm run verify` revisa todas las páginas. En `/tutoriales` se permite el «tú», pero siguen valiendo el resto de las reglas: nada de precios con símbolo de moneda, ni de funciones que no están activas (por ejemplo, carritos abandonados o «tiempo real»), ni de porcentajes sin fuente como «80 %».
