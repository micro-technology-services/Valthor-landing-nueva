---
title: "Cómo responder las preguntas de Mercado Libre con IA"
slug: responder-preguntas-mercado-libre-con-ia
description: "Deja que la IA redacte las respuestas a las preguntas de tus publicaciones de Mercado Libre, revísalas y publícalas en un clic, sin poner en riesgo tu cuenta."
summary: "Conectas tu cuenta de Mercado Libre, activas la IA en las publicaciones que más preguntas reciben y, cuando llega una pregunta, revisas el borrador y tocas «Publicar respuesta». La IA redacta; tú decides qué se publica."
category: valthor
level: Básico
duration: "7 min"
date: 2026-11-09
author: Equipo Valthor
tags: [mercado libre, preguntas, ecommerce, ia, ventas]
specs:
  Nivel: Básico
  Requisitos: "Cuenta de Valthor (rol administrador para conectar) y cuenta de vendedor en Mercado Libre"
  Costo: "Redactar es gratis; cada respuesta publicada consume 1 crédito"
  Dónde se usa: "Comentarios de Meli, en el menú de Valthor"
gated: false
featured: false
draft: false
---

En Mercado Libre, la publicación que responde primero suele quedarse con la venta. El problema es que las preguntas llegan a cualquier hora y casi siempre son las mismas: talle, color, envío, garantía. En esta guía configuras Valthor para que la IA te deje cada respuesta redactada y tú solo tengas que revisarla y publicarla.

> [!NOTE] La IA redacta, tú publicas
> En Mercado Libre, Valthor nunca publica una respuesta solo. Siempre la aprueba una persona. Es una decisión a propósito: una respuesta mal dada queda a la vista de todos y puede afectar la reputación de tu cuenta.

## Conecta tu cuenta de Mercado Libre

Si ya conectaste Mercado Libre para importar tu catálogo o ver tus pedidos, salta a la siguiente sección.

1. Entra a Valthor y abre **Integraciones**. Solo un administrador puede entrar ahí.
2. Busca **Fuentes de datos · catálogo** y, en la tarjeta de Mercado Libre, toca **Conectar**.
3. Elige el país de tu cuenta. Tienes que autorizar en el sitio del país donde la abriste.
4. Inicia sesión en Mercado Libre y acepta los permisos.
5. Al volver, la tarjeta pasa a **Conectado**. Desde ese momento, las preguntas nuevas de tus publicaciones aparecen en **Comentarios de Meli**.

## Activa la IA en tus publicaciones

La IA se activa publicación por publicación. Así empiezas por las que más preguntas reciben y vas sumando las demás.

1. Abre **Comentarios de Meli** en el menú.
2. Elige una publicación de la lista. A la derecha ves sus preguntas y los datos de la publicación: precio, stock y visitas.
3. En **IA en esta publicación**, toca **Activar la IA en esta publicación**. Desde ese momento, cada pregunta nueva llega con un borrador.
4. Opcional: en **Instrucciones adicionales**, escribe lo que la IA tiene que saber de esa publicación y que no está en la ficha. Se aplica a las próximas respuestas.

| Si la publicación… | Te recomendamos |
| --- | --- |
| Recibe muchas preguntas repetidas (talle, color, envío) | Activar la IA |
| Tiene condiciones especiales (preventa, a medida, usado) | Activar la IA y escribir esas condiciones en **Instrucciones adicionales** |
| Recibe pocas preguntas o muy técnicas | Dejar la IA apagada y responder tú |

> [!PROMPT] Ejemplo de instrucciones adicionales
> Pégalo en «Instrucciones adicionales» y cambia los datos entre corchetes.

```text
Este producto se entrega en [3 a 5] días hábiles a todo el país por Mercado Envíos.
La garantía es de [6 meses] con el fabricante.
Si preguntan por un talle que no figura en las variantes, responde que no está disponible
y sugiere el más cercano. No inventes datos que no estén en la publicación.
```

## Revisa y publica cada respuesta

Cuando entra una pregunta en una publicación con la IA activa, Valthor la muestra con la etiqueta **Borrador IA**.

1. En **Comentarios de Meli**, filtra por **Con borrador IA** para ver solo las que esperan tu revisión.
2. Abre la pregunta y lee el borrador.
3. Si no te convence, toca **Otra sugerencia** para que la IA proponga otra respuesta, o toca **Editar** y corrígela tú.
4. Toca **Publicar respuesta**. La respuesta aparece en tu publicación de Mercado Libre.

Si una pregunta no tiene borrador, por ejemplo porque la IA está apagada en esa publicación, toca **Responder** y luego **Sugerir con IA** para pedir una propuesta. Redactar nunca consume créditos; solo se cobra la respuesta que publicas.

> [!WARNING] Antes de publicar
> Lo que publicas queda visible para cualquiera que vea la publicación, y Mercado Libre no permite editarlo ni borrarlo después. Revisa siempre precios, plazos y condiciones. Además, Valthor bloquea las respuestas que parecen incluir un número de teléfono, porque Mercado Libre no permite compartir datos de contacto en las preguntas.

## Saca el máximo provecho

- **Revisa a diario el filtro Sin responder.** Ahí ves las preguntas que todavía no tienen respuesta, con o sin borrador.
- **Las respuestas que das desde Mercado Libre también cuentan.** Valthor las detecta y las marca como **Respondida desde MercadoLibre**, para que nadie del equipo conteste dos veces.
- **Las preguntas repetidas se agrupan.** Si varias personas preguntan lo mismo en una publicación, las ves juntas.
- **Usa los borradores para mejorar tu publicación.** Si la misma pregunta se repite mucho, agrega esa información a la ficha de Mercado Libre: vas a recibir menos preguntas y más compras directas.

Si además vendes por WhatsApp, Instagram o Facebook, el mismo catálogo de Mercado Libre puede alimentar las respuestas de la IA en esos canales. Lo explicamos en la página de [preguntas de Mercado Libre](/funciones/preguntas-mercado-libre) y en la de [ecommerce](/rubros/ecommerce).

<details class="para-curiosos">
<summary>Para curiosos: qué pasa por detrás</summary>

Cuando alguien pregunta en tu publicación, Mercado Libre avisa a Valthor y la pregunta entra a **Comentarios de Meli**. Si la IA está activa en esa publicación, redacta un borrador con los datos de la publicación, la información de tu negocio y tus instrucciones adicionales.

Nada se publica hasta que alguien toca **Publicar respuesta**. Cada pocos minutos, Valthor también revisa las preguntas que respondiste directamente en Mercado Libre, para mostrarlas como respondidas.

</details>
