# Auditoría de funcionalidades: qué hace HOY Valthor

**Para:** CEO, Marketing y Ventas
**Fecha:** 15/10/2026
**Base:** código del repositorio `valthor-crm-v2`, commit `1f8d61e`. Es una auditoría de solo lectura: no se modificó nada.

---

## 0. Cómo leer este documento

| Estado | Significa |
|---|---|
| **ACTIVA** | Funciona en producción, de punta a punta. |
| **PARCIAL** | Funciona, pero con límites importantes o solo en algunos canales. |
| **MAQUETA** | Hay pantalla, pero no hay motor detrás (no hace nada real). |
| **OCULTA / SIN TERMINAR** | El código existe, pero está apagado en producción o le faltan piezas. |

**Tres datos de contexto que Ventas tiene que conocer:**

1. **El CRM no conversa por sí mismo.** La IA que responde corre en nuestro motor de agentes (onel) y los mensajes pasan por nuestro hub de mensajería. Este repo configura, muestra y mide. Lo que se marca "no verificable desde el código" ocurre en esos servicios.
2. **La IA viene APAGADA por defecto en todos los canales.** El cliente tiene que encenderla (siempre o por horario).
3. **Hay funciones que dependen del plan:**
   - **Pro o superior:** automatizaciones, campañas, captura por QR y verticales.
   - **Enterprise:** fidelización y gamificación.

---

## 1. Veredicto sobre las afirmaciones de la web

| # | Afirmación | Veredicto | Motivo (una línea) |
|---|---|---|---|
| 1 | La IA atiende 24/7 en WhatsApp, Instagram y Facebook a la vez | **VERDADERO** (con condición) | Un solo agente atiende los 3 canales a la vez. Viene apagado: hay que encenderlo (24/7 o por horario). |
| 2 | Sincronización de catálogo y stock en tiempo real con Tienda Nube y Mercado Libre | **PARCIAL** | Se importa a mano y se actualiza 1 vez por noche o con un botón. **No es tiempo real**, solo lee la tienda (no escribe) y las ventas no descuentan stock. |
| 3 | Entiende notas de voz | **PARCIAL / NO VERIFICABLE DESDE EL CÓDIGO** | Existe el cobro por "transcripción de audio entrante" y el motor de IA la registra. La transcripción ocurre fuera de este repo y el texto no se muestra en la bandeja. |
| 4 | Manda links de pago (Mercado Pago / tarjeta / cuotas) y cierra la venta | **PARCIAL** | Mercado Pago sí: la IA genera el link y, cuando se aprueba el pago, la venta se marca ganada. Requiere configuración. Tarjeta y cuotas = lo que ofrezca el checkout de Mercado Pago; no hay otra pasarela. |
| 5 | Detecta intención de compra en comentarios de Instagram/Facebook y responde por DM | **FALSO (hoy)** | Lo de Instagram está construido pero **oculto en producción**, esperando que Meta apruebe el permiso. Funciona por palabra clave, no por "intención". Facebook: no existe. |
| 6 | Campañas masivas personalizadas (carrito abandonado, vuelta de stock, cupones) | **PARCIAL** | Existe "Difusión" por WhatsApp: hasta 200 contactos por envío, solo plantillas aprobadas, personaliza nombre + un texto fijo (ej.: código de cupón). Sin programación. Carrito abandonado y vuelta de stock no existen. |
| 7 | Recuperación de carritos abandonados | **FALSO** | Aparece como "Próximamente". El servidor rechaza crearla. |
| 8 | Panel: tasa de conversión de la IA, carritos recuperados, total vendido, ROAS | **PARCIAL** | Conversión, total vendido y ROAS: **sí** (ROAS en plan Pro+ con la cuenta de Meta Ads conectada). Carritos recuperados: el indicador existe pero **siempre queda vacío**. |
| 9 | Calificación / scoring de leads | **VERDADERO** | La IA etiqueta cada lead caliente/tibio/frío, y cada oportunidad tiene una probabilidad por reglas visibles. |
| 10 | Derivación a humano: pausar la IA y que una persona tome la conversación | **VERDADERO** | Tomar el chat, pausar, asignar a persona o grupo y devolver a la IA. También derivación automática. |
| 11 | App móvil para seguir las ventas | **PARCIAL** | No hay app publicada en las tiendas: hay una versión instalable desde el navegador y una app en preparación. No hay aviso de "nueva venta". |
| 12 | Contactos, historial y pipeline armados automáticamente (CRM) | **VERDADERO** | Cada conversación crea el contacto. La IA mueve las oportunidades entre etapas. Un solo pipeline por negocio. |
| 13 | Agendar turnos | **VERDADERO** | La IA agenda, reprograma y cobra seña con Mercado Pago. Se sincroniza con Google/Outlook. |
| 14 | Conexión oficial a la API de WhatsApp Business | **VERDADERO** | Se conecta por la API oficial de Meta (no por QR). Plantillas oficiales aprobadas por Meta. |
| 15 | Demo interactiva de la plataforma | **FALSO** | No hay demo pública. Existen: prueba gratis de 15 días (pide tarjeta o WhatsApp verificado), el "Playground" para probar al agente ya registrado y el tour guiado. |

**Resumen para la web:**
- **Se puede afirmar:** 1, 9, 10, 12, 13, 14.
- **Hay que matizar:** 2, 3, 4, 6, 8, 11.
- **Hay que sacar o marcar "Próximamente":** 5, 7, 15.

---

## 2. Inventario de funcionalidades

### 2.1 Atención y conversación

#### Bandeja de conversaciones unificada — ACTIVA
- **Qué le da al dueño:** todos los chats de WhatsApp, Instagram y Facebook en una sola pantalla, con la IA respondiendo y la persona interviniendo cuando quiere.
- **Cómo se usa:** menú **Conversaciones** → elegir chat → responder (texto, imagen, audio grabado, documento, plantilla) → notas internas, archivar, reacciones.
- **Canales:** WhatsApp, Instagram y Facebook Messenger.
- **Límites:**
  - Ventana de 24 h de Meta: pasado ese plazo, en WhatsApp solo se puede escribir con plantilla aprobada y en Instagram no se puede escribir.
  - Telegram, TikTok y Web Chat aparecen como "Próximamente".
- **Evidencia:** `src/app/(dashboard)/chats/`, `src/modules/chat/`, `src/modules/chat/domain/window-policy.ts`.

#### Conexión de canales (API oficial de Meta) — ACTIVA
- **Qué le da al dueño:** conecta su WhatsApp, Instagram y Facebook oficiales en minutos.
- **Cómo se usa:** **Integraciones** → "Canales de comunicación" → **Conectar** → ventana de Meta → autorizar. Hace falta ser administrador.
- **Canales:** WhatsApp (API oficial; admite usar el mismo número en la app de WhatsApp Business), Instagram y Facebook.
- **Límites:** no hay conexión por QR no oficial.
- **Evidencia:** `src/app/(dashboard)/integrations/IntegrationsScreen.tsx`, `src/app/api/integrations/connect-sessions/`, `src/modules/channels/`.

#### Agente de IA que vende y atiende — ACTIVA (corre en el motor onel)
- **Qué le da al dueño:** un vendedor que responde solo, con la personalidad, las reglas y el conocimiento del negocio.
- **Cómo se usa:**
  1. Ir a **Entrenamiento IA**.
  2. Completar las pestañas Personalidad, Conocimiento (textos, Excel, catálogo), Pasar a humano y Etiquetas.
  3. Probar el agente en el **Playground** (no consume créditos).
  4. En Conversaciones → "Configurar Agente IA", encender la IA por canal: siempre, o con horario semanal. Ahí también se elige la espera antes de responder y la pausa si el dueño contesta desde el celular.
- **Canales:** WhatsApp, Instagram, Facebook y el chat de la app de socios (gimnasios).
- **Límites:**
  - Viene apagada.
  - Consume créditos: 1 crédito cada 10 respuestas por chat en 24 h.
- **Evidencia:** `src/app/(dashboard)/training/`, `src/app/(dashboard)/chats/AiConfigModal.tsx`, `src/modules/companies/domain/ai-settings.ts`, `src/services/onel/`.

#### Derivación a humano — ACTIVA
- **Qué le da al dueño:** la IA se aparta cuando hace falta una persona y nadie pierde la conversación.
- **Cómo se usa:**
  - Desde el chat: **Tomar**, **Pausar** (1 a 15 min), **Asignar a** una persona, **Derivar a un grupo**, **Devolver a la IA**.
  - Automático: en Entrenamiento → "Pasar a humano" (pide hablar con una persona, está enojado o reclama, o toca ciertos temas).
  - Los grupos se arman en **Usuarios y permisos**.
- **Canales:** todos los conectados.
- **Evidencia:** `src/modules/chat-routing/`, `src/modules/work-groups/`, `src/modules/training/domain/handoff.ts`, `src/app/(dashboard)/chats/ChatHeader.tsx`.

#### Notas de voz — PARCIAL
- **Qué le da al dueño:** el cliente puede mandar audios y el equipo puede grabar audios desde el CRM.
- **Cómo se usa:** el micrófono en el campo de respuesta graba y envía audio.
- **Límites:**
  - La transcripción de los audios entrantes ocurre en el motor de IA y no se puede verificar desde este código.
  - En la bandeja solo se ve el reproductor, no el texto.
- **Evidencia:** `src/app/(dashboard)/chats/Composer.tsx`, `useAudioRecorder.ts`, regla de cobro `AI_TRANSCRIPTION` en `drizzle/0042_credits_engine.sql`.

#### Plantillas de WhatsApp — ACTIVA
- **Qué le da al dueño:** permite escribirle al cliente fuera de la ventana de 24 h y hacer envíos masivos.
- **Cómo se usa:** **Plantillas de WhatsApp** → crear (encabezado, texto, botones) → Meta la aprueba → se ve el estado.
- **Límites:** no trae plantillas prearmadas (carrito, cupón, etc.); cada negocio arma las suyas.
- **Evidencia:** `src/app/(dashboard)/templates/`, `src/modules/whatsapp-templates/`.

### 2.2 Ventas y cobro

#### Pipeline de ventas (oportunidades) — ACTIVA
- **Qué le da al dueño:** ve cada venta en curso y en qué etapa está. La IA mueve las tarjetas sola.
- **Cómo se usa:** **Ventas** → tablero por etapas (editables) → abrir oportunidad → monto, carrito desde el catálogo, link de pago, notas, archivos, motivo de pérdida. También permite importar CSV/Excel.
- **Límites:** un solo pipeline por negocio.
- **Evidencia:** `src/modules/sales/`, `src/app/(dashboard)/sales/`.

#### Calificación de leads — ACTIVA
- **Qué le da al dueño:** sabe a quién llamar primero.
- **Cómo funciona:**
  - La IA marca caliente, tibio o frío.
  - Cada oportunidad tiene una probabilidad: sube si el cliente preguntó el precio o los medios de pago, y baja con los días de silencio.
  - La pantalla explica por qué tiene ese valor y una persona puede corregirlo.
- **Evidencia:** `src/modules/sales/domain/opportunity-probability.ts`, `src/modules/sales/domain/lead-ai.ts`.

#### Links de pago con Mercado Pago — ACTIVA (con configuración)
- **Qué le da al dueño:** la IA (o el vendedor) manda el link en el chat y, cuando se aprueba el pago, la venta se cierra sola.
- **Cómo se usa:**
  1. **Integraciones** → conectar Mercado Pago (cuenta propia del negocio).
  2. Entrenamiento → activar las herramientas de venta del agente.
  3. Opcional: definir el % de seña.
  4. Manualmente: "Generar link de pago" en la oportunidad.
- **Admite:** cobro total, seña o saldo.
- **Límites:**
  - El monto lo calcula el sistema (la IA no lo inventa).
  - Las cuotas y tarjetas son las que ofrezca Mercado Pago.
  - **Un pago aprobado no crea un "Pedido"**, solo cierra la oportunidad.
  - No hay otra pasarela para clientes (Stripe es solo para cobrar la suscripción de Valthor).
- **Evidencia:** `src/modules/payments/`, `src/services/mercadopago/`, `src/app/api/webhooks/mercadopago/route.ts`, `src/app/api/sales/payment-link/route.ts`.

#### Catálogo de productos — PARCIAL
- **Qué le da al dueño:** la IA cotiza con precios y stock reales del negocio.
- **Cómo se usa:**
  1. **Catálogo** → "+ Productos" → "Importar de una tienda".
  2. Elegir los productos → confirmar.
  3. Para actualizar: botón "Actualizar precios y stock" (además se actualiza solo cada noche).
- **Otras formas de cargar productos:** a mano, por Excel, o "completar desde el link".
- **Integraciones:** Tienda Nube, Mercado Libre y Magento.
- **Límites:**
  - **No es tiempo real.**
  - Los productos nuevos de la tienda no entran solos.
  - No escribe en la tienda.
  - Tope de 2.000 productos (Tienda Nube y Mercado Libre) y de 20.000 (Magento).
  - Shopify, Kuad y Zeus: "Próximamente".
- **Evidencia:** `src/modules/catalog/`, `src/app/(dashboard)/catalog/`, `src/app/api/cron/catalog-refresh`.

#### Pedidos y envíos — ACTIVA
- **Qué le da al dueño:** todos los pedidos pagados en un lugar, con una vista sin precios para el depósito.
- **Cómo se usa:**
  - **Pedidos**: ver, "Sincronizar tienda" o "Cargar pedido" a mano.
  - **Envíos**: estado (preparando, enviado, entregado), transportista y número de seguimiento.
  - La IA responde "¿dónde está mi pedido?".
- **Integraciones:** Tienda Nube y Mercado Libre (Magento no trae pedidos).
- **Límites:** los cambios de estado no vuelven a la tienda.
- **Evidencia:** `src/modules/orders/`, `src/app/(dashboard)/orders/`, `src/app/(dashboard)/shipments/`.

#### Preguntas de Mercado Libre — ACTIVA
- **Qué le da al dueño:** las preguntas de sus publicaciones llegan con la respuesta ya redactada por la IA.
- **Cómo se usa:**
  1. Conectar Mercado Libre.
  2. Ir a **Comentarios de Meli** y activar la IA por publicación.
  3. Revisar el borrador → **Publicar respuesta**.
- **Límites:**
  - Siempre aprueba una persona; nunca se publica solo, para evitar sanciones de Mercado Libre.
  - Cada respuesta publicada consume 1 crédito.
- **Evidencia:** `src/modules/mercadolibre-questions/`, `src/app/(dashboard)/mercadolibre-preguntas/`.

### 2.3 Marketing y recuperación

#### Difusión masiva por WhatsApp — PARCIAL
- **Qué le da al dueño:** manda una promo a muchos clientes a la vez, con su nombre.
- **Cómo se usa:**
  1. **Contactos** → filtrar (por etiqueta, origen, anuncio, lista, estado) → seleccionar.
  2. "Crear difusión" → elegir una plantilla aprobada.
  3. Completar las variables (nombre del contacto o un texto fijo, por ejemplo un cupón) → Enviar.
- **Canales:** solo WhatsApp.
- **Límites:**
  - Máximo 200 contactos por envío.
  - No se puede programar.
  - No hay historial de difusiones.
  - No acepta plantillas con imagen o video.
  - Cada mensaje consume 1 crédito.
- **Evidencia:** `src/app/(dashboard)/contacts/BroadcastDialog.tsx`, `src/app/api/contacts/broadcast/route.ts`.

#### Automatizaciones de recupero (secuencias) — ACTIVA (Pro+)
- **Qué le da al dueño:** seguimientos automáticos que rescatan ventas frenadas, y le muestra cuánta plata recuperaron.
- **Cómo se usa:** **Automatizaciones IA** → elegir un disparador → armar pasos (mensaje, canal, demora, plantilla de respaldo) → activar.
- **Disparadores disponibles:**
  - El cliente dejó de responder.
  - Recompra: X días después de una compra.
  - Oportunidad estancada.
- **Canales:** WhatsApp, Instagram y correo.
- **Límites:**
  - La única variable es `{nombre}`.
  - "Carrito abandonado", "Pedir reseña" y los disparadores por palabra clave dicen "Próximamente".
  - Envía solo dentro del horario del negocio.
- **Evidencia:** `src/modules/automations/`, `src/app/(dashboard)/automations/automation-catalog.ts`.

#### Atribución de anuncios de Meta + ROAS — ACTIVA (Pro+)
- **Qué le da al dueño:** sabe qué anuncio le trae ventas reales, no solo mensajes.
- **Cómo se usa:** **Campañas** → ver contactos, ventas y $ vendido por anuncio. Conectando Meta Ads se agregan gasto, costo por venta, ROAS y anuncios que gastan sin traer a nadie.
- **Extra Enterprise:** devuelve las ventas a Meta (API de Conversiones) para que optimice los anuncios. Solo WhatsApp.
- **Canales:** anuncios a WhatsApp, Instagram y Messenger, más links propios `/c/código`.
- **Límites:**
  - Los datos de Meta Ads se actualizan cada 6 h.
  - El ROAS no se calcula si las monedas difieren.
- **Evidencia:** `src/modules/campaigns/`, `src/services/meta-ads/`, `src/services/meta-capi/`.

#### Automatizaciones de comentarios de Instagram — OCULTA
- **Qué haría:** alguien comenta una palabra clave → respuesta pública → DM con botón → entrega de un PDF, video o link.
- **Estado:** el código está hecho, pero la pantalla no se muestra en producción hasta que Meta apruebe el permiso de comentarios. La pantalla "Comentarios de Reels" es una **maqueta** para el video de revisión de Meta.
- **Evidencia:** `src/modules/workspace-modules/domain/preview-screens.ts`, `src/modules/automations/ig-automations.module.ts`, `src/app/(dashboard)/reels/mock-data.ts`.

### 2.4 Métricas

#### Inicio — "Resultados de tu IA" — ACTIVA
- **Qué le da al dueño:** ve en una pantalla cuánto vendió y cuánto trabajó su IA.
- **Indicadores reales:**
  - Vendió tu IA ($) y cantidad de ventas.
  - Conversión de conversación a venta.
  - Horas trabajadas por la IA y tiempo de respuesta.
  - Porcentaje atendido fuera de horario y porcentaje resuelto sin humano.
  - Turnos agendados y confirmados.
  - Pipeline abierto, pronóstico del mes y "Te necesita ahora".
- **Límites:**
  - "Carritos recuperados" queda siempre vacío.
  - El retorno sobre los créditos aparece recién con 30 días y 5 ventas, y solo en USD.
- **Evidencia:** `src/app/(dashboard)/HomeScreen.tsx`, `src/modules/ai-results/`.

### 2.5 CRM

#### Contactos — ACTIVA
- **Qué le da al dueño:** su base de clientes se arma sola.
- **Cómo funciona:**
  - Se crean automáticamente desde cada conversación.
  - También se pueden cargar a mano o importar por CSV.
  - Detección y fusión de duplicados, etiquetas (la IA puede ponerlas) y origen del anuncio.
  - Campos completados por la IA: los de la venta siempre; los de la persona dependen de una configuración del motor.
- **Evidencia:** `src/modules/contacts/`, `src/app/(dashboard)/contacts/`, `src/app/(dashboard)/AiFieldsDialog.tsx`.

#### Listas de clientes con precio propio — ACTIVA
- **Qué le da al dueño:** clientes mayoristas o VIP con su propia lista de precios y su propio PDF o Excel, que la IA usa.
- **Cómo se usa:** **Listas de clientes** → crear la lista → ajuste de precio (%) y archivos → asignar contactos (la IA sugiere, una persona aprueba).
- **Evidencia:** `src/modules/customer-lists/`.

#### Correo con IA — ACTIVA
- **Qué le da al dueño:** los mails entrantes llegan con la respuesta redactada por la IA.
- **Cómo se usa:** conectar Gmail o Outlook en **Correo** → revisar el borrador → aprobar y enviar. Un botón convierte el mail en contacto + oportunidad.
- **Límites:**
  - No está en la bandeja unificada.
  - Siempre aprueba una persona.
- **Evidencia:** `src/modules/email/`, `src/services/nylas/`.

### 2.6 Agenda, cursos y fidelización

#### Agenda y turnos con seña — ACTIVA
- **Qué le da al dueño:** la IA agenda, reprograma, cobra la seña y recuerda el turno.
- **Cómo se usa:**
  1. **Agenda** → configurar prestadores, servicios y horarios.
  2. Conectar Google o Outlook.
  3. Activar las herramientas de agenda en el agente.
  4. Definir la seña con Mercado Pago.
- **Límites:**
  - La reprogramación por IA hay que habilitarla a mano.
  - Las comisiones por prestador se calculan, pero no mueven plata.
- **Evidencia:** `src/modules/booking/`, `src/modules/availability/`, `src/services/booking-mcp/`, `src/app/(dashboard)/agenda/`.

#### Cursos y eventos con cupo — ACTIVA
- **Qué le da al dueño:** la IA ofrece fechas, llena cupos, cobra seña y maneja la lista de espera.
- **Cómo se usa:** **Cursos y eventos** → crear el curso y sus fechas (precio, promo, cupo, mínimo, lista de espera) → la IA inscribe por chat.
- **Límites:**
  - No hay página pública de inscripción.
  - Las herramientas de la IA se habilitan a mano.
- **Evidencia:** `src/modules/courses/`.

#### Fidelización con puntos — ACTIVA (Enterprise)
- **Qué le da al dueño:** el programa de puntos hace que el cliente vuelva a comprar.
- **Cómo se usa:** **Fidelización** → reglas de puntos, premios, cupones, vencimientos y 4 automatizaciones (cumpleaños, puntos por vencer, sube de nivel, reactivación), que vienen apagadas.
- **Catálogo público:** `/premios`.
- **Límites:** canjear premios por chat con la IA está a medias.
- **Evidencia:** `src/modules/loyalty/`, `src/app/premios/`.

### 2.7 Otras funcionalidades

#### Captura por QR — ACTIVA (Pro+)
- **Qué le da al dueño:** convierte a la gente de una feria o stand en contactos, sin tener un canal conectado.
- **Cómo se usa:** **Captura por QR** → crear → modo registro con IA o encuesta → imprimir el QR → exportar los contactos.
- **Evidencia:** `src/modules/events/`, `src/app/evento/`.

#### White label y agencias — ACTIVA
- **Qué le da al dueño (la agencia):** revende Valthor con su marca y su dominio, y gana una comisión del 20% al 50%.
- **Cómo se usa:** panel **Agencia** → abrir cuentas, cambiar el plan, cargar créditos, ver la factura.
- **Evidencia:** `src/modules/agencies/`, `src/app/(agency)/agencia/`.

#### Vertical Gimnasios + GymFlow — ACTIVA (Pro+)
- **Qué le da al dueño:**
  - Socios en riesgo de abandonar.
  - Registro de asistencia y auto check-in por QR.
  - Rutinas hechas por la IA y revisadas por el entrenador.
  - Sedes y gamificación.
  - Sincronización diaria con GymFlow.
- **Límites:** la app para socios no está en este repo (solo su API).
- **Evidencia:** `src/modules/gym/`, `src/modules/gymflow/`, `src/app/api/member/v1/`.

#### Vertical Inmobiliaria — OCULTA
- **Qué haría:** fichas de propiedades, cruce entre comprador y propiedad, tasación, web pública de propiedades e IA que conoce la cartera.
- **Límites:**
  - Está oculta en producción.
  - Zonaprop y Argenprop solo por copiar y pegar.
- **Evidencia:** `src/modules/real-estate/`, `src/modules/workspace-modules/domain/vertical-availability.ts`.

#### Thor (asistente del dueño) — OCULTA
- **Qué haría:** responde "cómo se hace" y preguntas sobre el propio negocio ("¿qué producto no se vende?").
- **Límites:** apagado para clientes (`THOR_ENABLED_FOR_CUSTOMERS`); solo lo ven los administradores de la plataforma.
- **Evidencia:** `src/modules/thor/`.

#### App móvil — PARCIAL
- **Estado:**
  - Existe una app que envuelve la web (`mobile/`), pero **no está publicada** en las tiendas.
  - Hoy se usa desde el navegador del celular o instalada como app web.
  - Avisa sobre chats que esperan a una persona y mensajes nuevos, **no sobre ventas**.
- **Evidencia:** `mobile/`, `public/manifest.webmanifest`, `src/modules/notifications/domain/push-prefs.ts`.

#### Web Chat, Telegram, TikTok, Shopify — PRÓXIMAMENTE
- **Estado:** son tarjetas sin conexión real. El Web Chat tiene una base técnica, pero no hay pantalla ni flujo.
- **Evidencia:** `src/app/(dashboard)/integrations/IntegrationsScreen.tsx` (líneas 107 a 150), `src/modules/webchat/`.

---

## 3. Valor oculto: lo que existe y la web no vende

| Funcionalidad | Por qué vende |
|---|---|
| **Atribución de anuncios de Meta + ROAS real por anuncio** | "Sabé qué anuncio te trae ventas, no mensajes." Diferencial fuerte. |
| **API de Conversiones de Meta** (Enterprise) | Meta optimiza los anuncios con las ventas reales. |
| **Agenda con seña por Mercado Pago + Google/Outlook** | Turnos sin ausencias y cobrados por adelantado. |
| **Cursos y eventos con cupo y lista de espera** | Academias, talleres, turismo. |
| **Respuestas a preguntas de Mercado Libre con IA** | Atención en ML más rápida y sin riesgo de sanción. |
| **Correo con borradores de IA** | Gmail y Outlook dentro del CRM. |
| **Recupero automático** (cliente que no respondió, recompra, oportunidad fría) con plata recuperada medida | Es "recupero de ventas" real, aunque no sea de carrito. |
| **Pedidos y envíos** (vista de depósito, "¿dónde está mi pedido?" respondido por la IA) | Postventa automatizada. |
| **Listas de clientes con precios propios** (mayoristas, VIP) | Ideal para B2B y distribuidoras. |
| **Fidelización con puntos, cupones y catálogo de premios** | Recompra. |
| **Captura por QR** (registro con IA o encuesta) | Ferias, locales, eventos. |
| **Vertical Gimnasios** (socios en riesgo, rutinas IA, check-in QR, GymFlow) | Producto vertical completo. |
| **White label para agencias** con comisión del 20% al 50% | Canal de reventa. |
| **Grupos de trabajo y asignación de chats** | Equipos de venta grandes. |
| **Multi-negocio** (1, 3 o 7 negocios según el plan) | Dueños con varias marcas. |
| **Playground** para probar al agente sin gastar créditos | Ayuda a vender confianza en la IA. |
| **Importación de catálogo desde Magento** | Tiendas grandes, además de Tienda Nube y Mercado Libre. |
| **Exclusión de contactos personales** | La IA no le contesta a la familia. |

---

## 4. Recomendaciones para Marketing (prioridad)

1. **Sacar ya** de la web, o marcar "Próximamente":
   - recuperación de carritos abandonados;
   - vuelta de stock;
   - detección de comentarios en Instagram/Facebook;
   - demo interactiva.
2. **Reescribir** "sincronización en tiempo real" como "catálogo conectado a Tienda Nube, Mercado Libre y Magento, actualizado todos los días".
3. **Reescribir** "app móvil" como "manejalo desde el celular" hasta que la app esté en las tiendas.
4. **Precisar** "cuotas y tarjeta": "links de pago de Mercado Pago, con los medios y cuotas que tengas habilitados".
5. **Agregar** lo del punto 3, sobre todo el ROAS por anuncio, la agenda con seña y las preguntas de Mercado Libre.
6. **Producto:** el indicador "Carritos recuperados" del Inicio aparece siempre vacío. Conviene ocultarlo hasta que exista la función, porque contradice lo que se promete.
