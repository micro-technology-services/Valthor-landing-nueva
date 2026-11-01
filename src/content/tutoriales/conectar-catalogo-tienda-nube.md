---
title: "Cómo conectar tu catálogo de Tienda Nube a Valthor"
slug: conectar-catalogo-tienda-nube
description: "Importa tus productos de Tienda Nube para que Valthor responda precios y stock con los datos reales de tu tienda, por WhatsApp, Instagram y Facebook."
summary: "Conectas tu tienda, eliges qué productos importar y confirmas. Desde ese momento Valthor cotiza con tus precios y tu stock, y los actualiza cada noche o cuando tocas «Actualizar precios y stock»."
category: valthor
level: Básico
duration: "8 min"
date: 2026-10-28
author: Equipo Valthor
tags: [tienda nube, catálogo, ecommerce, primeros pasos]
video: https://www.youtube.com/watch?v=VIDEO_ID_PENDIENTE
specs:
  Nivel: Básico
  Requisitos: "Cuenta de Valthor y una tienda en Tienda Nube con permisos de administrador"
  Costo: Incluido en tu plan
  Dónde se usa: "Catálogo de Valthor, respuestas por WhatsApp, Instagram y Facebook"
resourceUrl: https://www.notion.so/valthor/checklist-catalogo-pendiente
socialUrl: https://www.instagram.com/valthor_ia
gated: false
featured: true
draft: true
---

Cuando un cliente pregunta «¿tienen la remera negra en M?», la respuesta tiene que salir de tu tienda, no de la memoria de nadie. En esta guía conectas tu catálogo de Tienda Nube a Valthor en unos minutos.

> [!TIP] Antes de empezar
> Revisa que tus productos tengan nombre, precio y stock cargados en Tienda Nube. Lo que está vacío allá también llega vacío a Valthor.

## Conecta tu tienda

1. Entra a Valthor y abre **Catálogo** en el menú.
2. Toca **+ Productos** y elige **Importar de una tienda**.
3. Selecciona **Tienda Nube**. Se abre una ventana para iniciar sesión en tu tienda.
4. Acepta los permisos. Valthor solo **lee** tu catálogo: no cambia nada en tu tienda.

https://www.youtube.com/watch?v=VIDEO_ID_PENDIENTE

## Elige qué productos importar

No hace falta traer todo. Si vendes por WhatsApp solo una parte de tu catálogo, importa esa parte y tendrás respuestas más precisas.

| Si tu tienda tiene… | Te recomendamos |
| --- | --- |
| Menos de 200 productos | Importar todo |
| Varias categorías y solo vendes algunas por chat | Importar por categoría |
| Productos sin stock hace meses | Dejarlos afuera |

> [!WARNING] Límite de productos
> Puedes importar hasta 2.000 productos desde Tienda Nube. Si tienes más, empieza por los que más te consultan.

## Confirma y revisa el resultado

1. Toca **Confirmar**. La importación tarda entre unos segundos y unos minutos según la cantidad.
2. Abre algunos productos y revisa precio, stock y variantes (talle, color).
3. Haz una prueba: escribe al número de tu negocio y pregunta por un producto.

Si quieres que la IA describa tus productos con un tono propio, puedes darle esta indicación desde la configuración de tu asistente:

> [!PROMPT] Indicación para describir productos
> Pégala en «Personalidad» y ajusta los datos entre corchetes.

```text
Cuando un cliente pregunte por un producto, responde con el nombre exacto,
el precio actual y si hay stock en el talle o color que pidió.
Si no hay stock, ofrece la alternativa más parecida de [categoría].
Usa un tono [cercano y breve] y no inventes datos que no estén en el catálogo.
```

## Mantén el catálogo al día

Valthor actualiza precios y stock **todos los días, durante la noche**. Si cambias un precio a la mañana y quieres que se use ya, toca **Actualizar precios y stock** en el Catálogo.

> [!TIP] Productos nuevos
> Los productos que crees después en Tienda Nube no entran solos: impórtalos con **+ Productos** cuando los publiques.

<details class="para-curiosos">
<summary>Para curiosos: qué pasa por detrás</summary>

Valthor guarda una copia de los datos que eligiste (nombre, descripción, precio, stock, variantes e imágenes) y la usa para buscar el producto que mejor responde a cada pregunta. La búsqueda entiende frases como «algo para regalar a mi mamá» y no solo nombres exactos.

La copia no escribe en tu tienda: una venta por chat no descuenta stock en Tienda Nube.

</details>
