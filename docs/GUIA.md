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
- **Español neutro con «tú»:** nada de «vos» (tenés, podés) ni de «vosotros». El control automático lo detecta.
- **No publicar:** precios, funciones que no están activas (carritos abandonados, vuelta de stock, comentarios de Instagram, Telegram, TikTok, Shopify, demo interactiva, app en las tiendas) ni métricas sin fuente. El control automático también las detecta.
- **Botones:** solo «Probar gratis 15 días» y «Agendar una llamada». Sus enlaces se cambian en un solo lugar: `src/content/site.json`.
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

La etiqueta de Google Ads (AW-18428663865) ya está activa. Para activar GA4 y el Meta Pixel:

1. En Vercel → proyecto **valthorweb** → **Settings** → **Environment Variables**.
2. Agrega `PUBLIC_GA4_ID` con tu ID de GA4 (empieza con `G-`) y `PUBLIC_META_PIXEL_ID` con el ID del Pixel.
3. Marca «Production» y «Preview», guarda y vuelve a desplegar (Deployments → los tres puntos → **Redeploy**).

Los botones envían estos eventos: `trial_start_click` (Probar gratis), `booking_click` (Agendar una llamada) y `whatsapp_click` (botón de WhatsApp). Además, todos disparan la conversión de Google Ads como antes.

## Después de publicar: Google y buscadores de IA

- **Google Search Console:** agrega la propiedad `https://www.valthor.app`, envía el sitemap `https://www.valthor.app/sitemap-index.xml` y pide la indexación de la portada.
- **Bing Webmaster Tools:** importa la propiedad desde Search Console (sirve también para ChatGPT y Copilot, que usan el índice de Bing).
- Los asistentes de IA tienen un resumen del sitio en `https://www.valthor.app/llms.txt` y el texto completo en `/llms-full.txt`. Se actualizan solos cuando cambias los textos.
