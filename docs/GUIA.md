# Guía para editar y publicar la web de Valthor

Esta guía es para el dueño del sitio. No hace falta saber programar.

## Dónde está cada texto

Todos los textos están en la carpeta `src/content/` del repositorio. Los archivos `.json` y `.md` se editan como texto.

| Quiero cambiar… | Archivo |
| --- | --- |
| Textos de la portada | `src/content/home.json` |
| Preguntas frecuentes generales (portada y /preguntas-frecuentes) | `src/content/faq.json` |
| Página «Agente de IA para WhatsApp» | `src/content/landings/funciones/agente-ia-whatsapp.md` |
| Página «CRM para WhatsApp» | `src/content/landings/funciones/crm-whatsapp.md` |
| Páginas de rubros (Ecommerce, Turnos, Gimnasios) | `src/content/landings/rubros/…md` |
| Página de Alianzas | `src/content/landings/alianzas.md` |
| Planes | `src/content/planes.json` |
| Introducción de /preguntas-frecuentes | `src/content/preguntas-frecuentes.json` |
| Menú, pie de página, botones y WhatsApp | `src/content/site.json` |
| Privacidad y Términos | `src/content/legal/privacidad.md` y `terminos.md` |

## Cómo editar un texto (desde el navegador)

1. Entra a <https://github.com/micro-technology-services/Valthor-landing-nueva>.
2. Arriba a la izquierda, cambia la rama de `Main` a la rama de trabajo (por ejemplo `seo-rebuild`). **Nunca edites directamente en `Main`**: eso publica al instante.
3. Abre el archivo de la tabla de arriba y toca el ícono del lápiz («Edit this file»).
4. Cambia solo el texto que está **entre comillas**. No borres comillas, comas, dos puntos ni llaves.
5. Abajo, en «Commit changes», escribe qué cambiaste (por ejemplo «Cambio el título de la portada») y confirma.

### Reglas que conviene saber

- **Resaltado en violeta:** en los títulos, lo que va entre asteriscos se ve resaltado. Ejemplo: `"El mejor vendedor de tu equipo *no duerme.*"`.
- **Título para Google (`seo.title`):** entre 50 y 60 caracteres. **Descripción (`seo.description`):** entre 140 y 160. Si no se cumple, la vista previa falla y te avisa en qué archivo y campo está el problema.
- **Español neutro con «tú»** en los textos: nada de «vos» (tenés, podés) ni de «vosotros». El control automático lo detecta. La única excepción son los textos de los botones definidos en `src/content/site.json` («Hablá con Valthor por WhatsApp», «o agendá una llamada»).
- **No publicar:** precios, funciones que no están activas (carritos abandonados, vuelta de stock, comentarios de Instagram, Telegram, TikTok, Shopify, demo interactiva, app en las tiendas) ni métricas sin fuente. El control automático también las detecta.
- **Botones:** el principal es «Hablá con Valthor por WhatsApp» (abre WhatsApp con un mensaje para pedir una demo); el secundario, «Probar gratis 15 días» («Probar gratis» en el menú de arriba). El enlace «o agendá una llamada» aparece solo en la sección final de cada página. Los textos y enlaces se cambian en un solo lugar: `src/content/site.json` (sección `cta`).
- Si agregas una función nueva en una página de funciones o rubros, completa el campo `source` con la fila de la auditoría que la respalda.

## Cómo ver la vista previa

Cada vez que guardas un cambio en una rama que no es `Main`, Vercel arma una vista previa en 1 o 2 minutos.

1. Abre el pull request de la rama, por ejemplo <https://github.com/micro-technology-services/Valthor-landing-nueva/pull/20>.
2. Busca el comentario de **Vercel** y toca **Preview** (o «Visit Preview»).
3. Inicia sesión con tu cuenta de Vercel si te lo pide: las vistas previas son privadas.
4. Si el estado dice **Error** en lugar de **Ready**, toca el enlace del despliegue y lee el mensaje: casi siempre es un título o una descripción con la cantidad de caracteres fuera de rango, o una coma o comilla borrada.

## Cómo publicar en www.valthor.app

Cuando la vista previa está bien:

1. En el pull request, si todavía dice **Draft**, toca **Ready for review**.
2. Toca **Merge pull request** y luego **Confirm merge**.
3. Vercel publica en www.valthor.app en 1 o 2 minutos. Puedes seguirlo en la pestaña «Deployments» del proyecto en Vercel.
4. Si algo sale mal, en Vercel → Deployments, abre el despliegue anterior y toca **Promote to Production** («Instant Rollback») para volver a la versión de antes en segundos.

## Analítica (Google Analytics 4 y Meta Pixel)

### Cómo conseguir el ID de GA4 (empieza con `G-`)

1. Entra a <https://analytics.google.com> con la cuenta de Google de la empresa (la misma de Google Ads, si puedes).
2. Si es la primera vez, toca **Empezar a medir**. Si ya tienes Analytics, toca el engranaje **Administrar** (abajo a la izquierda) → **+ Crear** → **Propiedad**.
3. Nombre de la cuenta: «MTS Group». Nombre de la propiedad: «Valthor web». Zona horaria: Argentina. Moneda: peso argentino.
4. Completa los datos del negocio y elige los objetivos (por ejemplo, «Generar clientes potenciales»). Acepta las condiciones.
5. Cuando pregunte la plataforma, elige **Web**. URL: `www.valthor.app`. Nombre del flujo: «Valthor web». Toca **Crear flujo**.
6. En la pantalla que aparece, copia el **ID de medición**: tiene la forma `G-XXXXXXXXXX`. No hace falta instalar ninguna etiqueta: la web ya está preparada.
7. Recomendado: en **Administrar** → **Vínculos de Google Ads**, vincula la cuenta de Google Ads para ver las conversiones juntas.

### Cómo conseguir el ID del Meta Pixel (solo números)

1. Entra a <https://business.facebook.com> con la cuenta que administra la página de Valthor.
2. Abre el **Administrador de eventos** (menú ☰ → «Administrador de eventos»).
3. Toca **Conectar orígenes de datos** (el botón verde con +) → **Web** → **Conectar**.
4. Nombre: «Valthor web». Escribe `www.valthor.app` si te lo pide y elige la opción de configurar el código **manualmente** o «Configurar después».
5. El ID aparece debajo del nombre del conjunto de datos («ID: 123456789012345»). Cópialo: son solo números.

### Cargar los dos IDs en Vercel

La etiqueta de Google Ads (AW-18428663865) ya está activa. Para activar GA4 y el Meta Pixel:

1. En Vercel → proyecto **valthorweb** → **Settings** → **Environment Variables**.
2. Agrega `PUBLIC_GA4_ID` con tu ID de GA4 (empieza con `G-`) y `PUBLIC_META_PIXEL_ID` con el ID del Pixel.
3. Marca «Production» y «Preview», guarda y vuelve a desplegar (Deployments → los tres puntos → **Redeploy**).

Los botones envían estos eventos:

| Botón | GA4 | Meta Pixel |
| --- | --- | --- |
| Hablá con Valthor por WhatsApp y botón flotante de WhatsApp | `whatsapp_click` | `Lead` |
| o agendá una llamada | `booking_click` | `Lead` |
| Probar gratis | `trial_start_click` | `StartTrial` |

Además, todos disparan la conversión de Google Ads como antes. Para comprobarlo, usa la vista DebugView de GA4 y el «Probador de eventos» del Administrador de eventos de Meta.

## Después de publicar: Google y buscadores de IA

- **Google Search Console:** agrega la propiedad `https://www.valthor.app`, envía el sitemap `https://www.valthor.app/sitemap-index.xml` y pide la indexación de la portada.
- **Bing Webmaster Tools:** importa la propiedad desde Search Console (sirve también para ChatGPT y Copilot, que usan el índice de Bing).
- Los asistentes de IA tienen un resumen del sitio en `https://www.valthor.app/llms.txt` y el texto completo en `/llms-full.txt`. Se actualizan solos cuando cambias los textos.
