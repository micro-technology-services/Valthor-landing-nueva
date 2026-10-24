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
- **Español rioplatense con «vos»** en todos los textos (vos tenés, podés, probá, agendá): nada de «tú» (tienes, puedes, prueba) ni de «vosotros». El control automático lo detecta en todas las páginas menos Privacidad y Términos, que no se tocan.
- **No publicar:** precios, funciones que no están activas (carritos abandonados, vuelta de stock, comentarios de Instagram, Telegram, TikTok, Shopify, demo interactiva, app en las tiendas) ni métricas sin fuente. El control automático también las detecta.
- **Iniciar sesión:** el menú de arriba tiene un enlace «Iniciar sesión» junto a «Probar gratis», con el mismo destino (la plataforma). Se cambia en `src/content/site.json` (`cta.login`).
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

### Visitantes de Europa (aviso de cookies)

A quien entra desde Europa (se detecta por la zona horaria del navegador) le aparece un aviso de cookies. Hasta que toca **Aceptar** no se carga Google ni Meta, y sus clics no se miden; si toca **Rechazar**, no se mide nada. Puede cambiar la decisión desde «Configurar cookies», al pie de la página (solo visible en Europa). El resto de los países se mide como siempre. El texto del aviso está en `src/components/CookieBanner.astro` y la explicación legal en la sección 9 de Privacidad.

Los botones envían estos eventos:

| Botón | GA4 | Meta Pixel |
| --- | --- | --- |
| Hablá con Valthor por WhatsApp y botón flotante de WhatsApp | `whatsapp_click` y `generate_lead` | `Lead` |
| o agendá una llamada | `booking_click` y `generate_lead` | `Lead` |
| Probar gratis | `trial_start_click` y `sign_up` | `StartTrial` |

`generate_lead` y `sign_up` son los eventos recomendados de GA4: en GA4 → **Administrar** → **Eventos**, márcalos como **evento clave** para verlos como conversiones. Además, todos disparan la conversión de Google Ads como antes. Para comprobarlo, usa la vista DebugView de GA4 y el «Probador de eventos» del Administrador de eventos de Meta.

### Redes sociales oficiales (`PUBLIC_SAME_AS`)

Los perfiles oficiales que Google y los asistentes de IA asocian a MTS Group salen de la variable `PUBLIC_SAME_AS` en Vercel: las URLs separadas por comas, hoy `https://www.instagram.com/valthor_ia,https://www.facebook.com/profile.php?id=61594883491922`. Si está vacía, no se publica ningún perfil.

## Después de publicar: Google y buscadores de IA

- **Google Search Console:** agrega la propiedad `https://www.valthor.app` y elige verificar con **Etiqueta HTML**. Copia solo el código que va dentro de `content="…"` y cárgalo en Vercel como `PUBLIC_GSC_VERIFICATION` (Production y Preview), vuelve a desplegar y toca **Verificar**. Después envía el sitemap `https://www.valthor.app/sitemap-index.xml` y pide la indexación de la portada.
- **Bing Webmaster Tools:** importa la propiedad desde Search Console (sirve también para ChatGPT y Copilot, que usan el índice de Bing).
- Los asistentes de IA tienen un resumen del sitio en `https://www.valthor.app/llms.txt` y el texto completo en `/llms-full.txt`. Se actualizan solos cuando cambias los textos.
