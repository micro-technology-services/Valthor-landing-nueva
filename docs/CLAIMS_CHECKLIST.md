# Lista de afirmaciones y su respaldo

Generada con `node scripts/claims-checklist.mjs`. Cada afirmación sobre lo que hace Valthor apunta a la fila de `reference/AUDITORIA_FUNCIONALIDADES.md` (auditoría del 15/10/2026) o a la confirmación del dueño en `reference/README.md` que la respalda.

Reglas que se cumplen en todo el sitio (las controla `npm run verify`): sin carritos abandonados, vuelta de stock, comentarios de Instagram/Facebook, reseñas automáticas, Telegram, TikTok, Web Chat, Shopify, «tiempo real», app en tiendas, demo interactiva, Thor, inmobiliarias, precios ni métricas sin fuente. Las funciones que dependen del plan se marcan «Plan Pro o superior».

## Portada (/)

| Afirmación | Respaldo |
| --- | --- |
| Responde en WhatsApp, Instagram y Facebook con tu catálogo y tus precios | Auditoría §1 fila 1 (VERDADERO) y §2.1 Agente de IA (ACTIVA) |
| Entiende audios | README · Owner-confirmed facts: transcripción de audios entrantes en producción |
| Envía el link de Mercado Pago y cierra la venta cuando se aprueba el pago | Auditoría §2.2 Links de pago con Mercado Pago (ACTIVA, con configuración) |
| Agenda turnos, reprograma, cobra la seña y los recuerda; Google y Outlook | Auditoría §1 fila 13 (VERDADERO) y §2.6 Agenda y turnos con seña (ACTIVA) |
| Sigue a cada cliente hasta que compra / vuelve a escribir a quien no respondió, recompra, ventas frías | Auditoría §2.3 Automatizaciones de recupero (ACTIVA, Pro+) |
| Mide cuánto vendió tu IA y qué anuncio de Meta trae ventas; ROAS real; anuncios que gastan sin vender | Auditoría §2.3 Atribución de anuncios de Meta + ROAS (ACTIVA, Pro+) y §2.4 Inicio (ACTIVA) |
| API oficial de WhatsApp | Auditoría §1 fila 14 (VERDADERO) y §2.1 Conexión de canales (ACTIVA) |
| Meta Business Partner | README · Owner-confirmed facts: MTS Group / Valthor es Meta Business Partner |
| Atendiendo en 2 horas | README · Owner-confirmed facts: un cliente nuevo atiende en unas 2 horas |
| Sin cambiar tu número | Auditoría §2.1 Conexión de canales: admite usar el mismo número en la app de WhatsApp Business |
| Lo pruebas gratis en el Playground antes de encenderlo | Auditoría §2.1 Agente de IA, paso 3 (no consume créditos) y §1 fila 15 |
| Todo el día o por horario | Auditoría §2.1 Agente de IA, paso 4 |
| Cuando hace falta una persona, te pasa la conversación | Auditoría §1 fila 10 (VERDADERO) y §2.1 Derivación a humano (ACTIVA) |
| Ecommerce: stock, talles, envíos y «¿dónde está mi pedido?» | Auditoría §2.2 Catálogo (PARCIAL) y Pedidos y envíos (ACTIVA) |
| Gimnasios: socios en riesgo, check-in por QR y rutinas con IA | Auditoría §2.7 Vertical Gimnasios + GymFlow (ACTIVA, Pro+) |
| Cursos y eventos: cupos, seña y lista de espera por chat | Auditoría §2.6 Cursos y eventos con cupo (ACTIVA) |
| Mayoristas: una lista de precios por cliente que la IA respeta | Auditoría §2.5 Listas de clientes con precio propio (ACTIVA) |
| Alianzas e integración con Kuad System, GymFlow y ZEUS ERP | README · Owner-confirmed facts: integraciones Kuad System, GymFlow y ZEUS ERP en producción |
| Integraciones: Tienda Nube, Mercado Libre, Magento; catálogo actualizado todos los días | Auditoría §2.2 Catálogo de productos (PARCIAL: 1 vez por noche o con botón) y recomendación §4.2 |
| Integraciones: Mercado Pago | Auditoría §2.2 Links de pago (ACTIVA) |
| Integraciones: Google Calendar, Outlook, Gmail | Auditoría §2.6 Agenda (Google/Outlook) y §2.5 Correo con IA (Gmail/Outlook, ACTIVA) |
| Clientes en Argentina, Chile, España y Estados Unidos | Dueño, mensaje del 18/10/2026 en esta sesión |

Las métricas de la sección de atribución ($5.330.200, ROAS 6,4x) llevan la etiqueta visible «Datos de ejemplo».

## Páginas de funciones, rubros, alianzas, planes y preguntas frecuentes

| Página | Afirmación | Respaldo |
| --- | --- | --- |
| /funciones/agente-ia-whatsapp | **Responde con tu catálogo y tus reglas**: Le enseñás tu negocio en pantallas simples: personalidad, conocimiento (textos, Excel y catálogo), cuándo pasar a una persona y etiquetas. | Auditoría §2.1 · Agente de IA que vende y atiende (ACTIVA) |
| /funciones/agente-ia-whatsapp | **WhatsApp, Instagram y Facebook a la vez**: Un solo agente atiende los tres canales y todas las conversaciones llegan a una misma bandeja. | Auditoría §1 fila 1 (VERDADERO) y §2.1 · Bandeja de conversaciones unificada (ACTIVA) |
| /funciones/agente-ia-whatsapp | **Entiende audios**: Tus clientes mandan notas de voz y la IA las entiende y responde. | README · Owner-confirmed facts: transcripción de audios entrantes en producción |
| /funciones/agente-ia-whatsapp | **Envía el link de Mercado Pago y cierra la venta**: La IA genera el link de pago desde tu cuenta de Mercado Pago, con el monto calculado por el sistema. Cuando se aprueba el pago, la venta queda cerrada. | Auditoría §2.2 · Links de pago con Mercado Pago (ACTIVA, con configuración) |
| /funciones/agente-ia-whatsapp | **Te pasa la conversación cuando hace falta**: Si el cliente pide una persona, se enoja o toca un tema que definiste, la IA se aparta. Tomás el chat, lo pausás o lo asignás, y después se lo devolvés. | Auditoría §2.1 · Derivación a humano (ACTIVA) |
| /funciones/agente-ia-whatsapp | **Vos decidís cuándo atiende**: Lo encendés por canal, todo el día o con un horario semanal, y elegís cuánto espera antes de responder. | Auditoría §2.1 · Agente de IA, paso 4 (ACTIVA) |
| /funciones/agente-ia-whatsapp | **Califica a cada cliente**: Marca a cada contacto como caliente, tibio o frío para que sepas a quién llamar primero. | Auditoría §2.2 · Calificación de leads (ACTIVA) |
| /funciones/crm-whatsapp | **Bandeja unificada**: Todos los chats de WhatsApp, Instagram y Facebook en una pantalla. Respondés con texto, imagen, audio, documento o plantilla, y dejás notas internas. | Auditoría §2.1 · Bandeja de conversaciones unificada (ACTIVA) |
| /funciones/crm-whatsapp | **Contactos que se crean solos**: Cada conversación crea el contacto, con etiquetas, origen del anuncio y detección de duplicados. También podés importar tu base por CSV. | Auditoría §2.5 · Contactos (ACTIVA) y §1 fila 12 (VERDADERO) |
| /funciones/crm-whatsapp | **Pipeline de ventas que mueve la IA**: Ves cada venta en curso en un tablero por etapas. La IA mueve las tarjetas y vos agregás montos, productos, notas y el link de pago. | Auditoría §2.2 · Pipeline de ventas (ACTIVA) |
| /funciones/crm-whatsapp | **Sabés a quién llamar primero**: La IA marca cada cliente como caliente, tibio o frío, y cada oportunidad tiene una probabilidad que la pantalla explica y vos podés corregir. | Auditoría §2.2 · Calificación de leads (ACTIVA) |
| /funciones/crm-whatsapp | **Trabajo en equipo**: Asignás chats a una persona o a un grupo, pausás la IA o la retomás cuando quieras. | Auditoría §2.1 · Derivación a humano (ACTIVA) |
| /funciones/crm-whatsapp | **Plantillas y envíos masivos**: Creás plantillas de WhatsApp que aprueba Meta para escribir fuera de la ventana de 24 horas, y enviás una promo con el nombre de cada cliente a hasta 200 contactos por envío. | Auditoría §2.1 · Plantillas de WhatsApp (ACTIVA) y §2.3 · Difusión masiva (PARCIAL: hasta 200 contactos, plantillas aprobadas) |
| /funciones/crm-whatsapp | **Seguimiento automático** (Plan Pro o superior): Le vuelve a escribir a quien dejó de responder, invita a recomprar y reactiva oportunidades estancadas. | Auditoría §2.3 · Automatizaciones de recupero (ACTIVA, Pro+) |
| /rubros/ecommerce | **Responde con tu catálogo real**: Importás tus productos desde Tienda Nube, Mercado Libre o Magento, o los cargás por Excel. Los precios y el stock se actualizan cada noche y cuando tocás «Actualizar». | Auditoría §2.2 · Catálogo de productos (PARCIAL: actualización diaria, no instantánea) |
| /rubros/ecommerce | **También con Kuad System y ZEUS ERP**: Si tu tienda está en Kuad System o tu stock en ZEUS ERP, Valthor vende por WhatsApp con esos datos. | README · Owner-confirmed facts: integraciones Kuad System y ZEUS ERP en producción |
| /rubros/ecommerce | **Cobra con Mercado Pago**: Envía el link de pago desde tu cuenta, con los medios y cuotas que tengas habilitados. Cuando se aprueba, la venta queda cerrada. | Auditoría §2.2 · Links de pago con Mercado Pago (ACTIVA, con configuración) |
| /rubros/ecommerce | **Pedidos y envíos**: Ves los pedidos pagados de Tienda Nube y Mercado Libre, cargás el transportista y el seguimiento, y la IA responde «¿dónde está mi pedido?». | Auditoría §2.2 · Pedidos y envíos (ACTIVA) |
| /rubros/ecommerce | **Preguntas de Mercado Libre**: Las preguntas de tus publicaciones llegan con la respuesta redactada por la IA. Una persona la revisa y la publica. | Auditoría §2.2 · Preguntas de Mercado Libre (ACTIVA) |
| /rubros/ecommerce | **Recupera ventas frenadas** (Plan Pro o superior): Le vuelve a escribir a quien dejó de responder e invita a recomprar unos días después de una compra. | Auditoría §2.3 · Automatizaciones de recupero (ACTIVA, Pro+) |
| /rubros/ecommerce | **Qué anuncio vende** (Plan Pro o superior): Conecta cada venta con el anuncio de Meta que la originó y, con tu cuenta de Meta Ads, te muestra el ROAS de cada uno. | Auditoría §2.3 · Atribución de anuncios de Meta + ROAS (ACTIVA, Pro+) |
| /rubros/gimnasios | **Socios en riesgo**: Valthor marca a los socios en riesgo de abandonar para que les escribas antes de que se vayan. | Auditoría §2.7 · Vertical Gimnasios + GymFlow (ACTIVA, Pro+) |
| /rubros/gimnasios | **Asistencia y check-in por QR**: Registrás la asistencia y los socios hacen su propio check-in con un código QR. | Auditoría §2.7 · Vertical Gimnasios + GymFlow (ACTIVA, Pro+) |
| /rubros/gimnasios | **Rutinas con IA**: La IA arma la rutina y el entrenador la revisa antes de entregarla. | Auditoría §2.7 · Vertical Gimnasios + GymFlow (ACTIVA, Pro+) |
| /rubros/gimnasios | **Sedes y gamificación**: Manejás varias sedes y usás la gamificación para motivar a los socios a volver. | Auditoría §2.7 · Vertical Gimnasios + GymFlow (ACTIVA, Pro+) |
| /rubros/gimnasios | **Integración con GymFlow**: Si usás GymFlow, Valthor sincroniza los datos todos los días. | Auditoría §2.7 (sincronización diaria con GymFlow) y README · integración GymFlow en producción |
| /rubros/gimnasios | **Atención por WhatsApp**: El agente de IA responde horarios, planes y consultas por WhatsApp, Instagram y Facebook, y te pasa el chat cuando hace falta. | Auditoría §2.1 · Agente de IA (ACTIVA) y Derivación a humano (ACTIVA) |
| /rubros/turnos | **Da turnos según tu disponibilidad**: Configurás prestadores, servicios y horarios, y la IA ofrece los turnos libres por chat. | Auditoría §2.6 · Agenda y turnos con seña (ACTIVA) |
| /rubros/turnos | **Cobra la seña con Mercado Pago**: Definís el porcentaje de seña y la IA envía el link de pago para confirmar el turno. | Auditoría §2.6 · Agenda y turnos con seña (ACTIVA) y §2.2 · Links de pago (seña o saldo) |
| /rubros/turnos | **Reprograma y recuerda**: La IA recuerda el turno y, si lo habilitás, también lo reprograma cuando el cliente lo pide. | Auditoría §2.6 · Agenda y turnos con seña (ACTIVA; reprogramación por IA se habilita a mano) |
| /rubros/turnos | **Sincronizado con Google y Outlook**: Conectás Google Calendar u Outlook y los turnos aparecen en tu calendario. | Auditoría §1 fila 13 (VERDADERO) y §2.6 |
| /rubros/turnos | **Comisiones por profesional**: Valthor calcula la comisión de cada prestador sobre los turnos atendidos. | Auditoría §2.6 · Agenda y turnos (las comisiones se calculan, no mueven dinero) |
| /rubros/turnos | **Cursos y eventos con cupo**: Si das clases o talleres, la IA ofrece fechas, llena cupos, cobra la seña y maneja la lista de espera. | Auditoría §2.6 · Cursos y eventos con cupo (ACTIVA) |
| /planes | Plan Inicial: Agente de IA en WhatsApp, Instagram y Facebook | Auditoría §2.1 · Agente de IA (ACTIVA) |
| /planes | Plan Inicial: Bandeja unificada y derivación a una persona | Auditoría §2.1 · Bandeja unificada y Derivación a humano (ACTIVAS) |
| /planes | Plan Inicial: Contactos, pipeline de ventas y calificación de clientes | Auditoría §2.2 Pipeline y Calificación, §2.5 Contactos (ACTIVAS) |
| /planes | Plan Inicial: Links de pago de Mercado Pago | Auditoría §2.2 · Links de pago (ACTIVA) |
| /planes | Plan Inicial: Agenda de turnos con seña | Auditoría §2.6 · Agenda y turnos con seña (ACTIVA) |
| /planes | Plan Inicial: Catálogo, pedidos y envíos | Auditoría §2.2 · Catálogo (PARCIAL) y Pedidos y envíos (ACTIVA) |
| /planes | Plan Pro: Todo lo del plan Inicial | Auditoría §0 · funciones por plan |
| /planes | Plan Pro: Automatizaciones de seguimiento y recompra | Auditoría §0 y §2.3 · Automatizaciones de recupero (ACTIVA, Pro+) |
| /planes | Plan Pro: Atribución de anuncios de Meta y ROAS | Auditoría §0 y §2.3 · Atribución de anuncios (ACTIVA, Pro+) |
| /planes | Plan Pro: Captura de contactos por QR | Auditoría §0 y §2.7 · Captura por QR (ACTIVA, Pro+) |
| /planes | Plan Pro: Vertical de Gimnasios con GymFlow | Auditoría §0 y §2.7 · Vertical Gimnasios (ACTIVA, Pro+) |
| /planes | Plan Enterprise: Todo lo del plan Pro | Auditoría §0 · funciones por plan |
| /planes | Plan Enterprise: Fidelización con puntos, cupones y premios | Auditoría §0 y §2.6 · Fidelización con puntos (ACTIVA, Enterprise) |
| /planes | Plan Enterprise: Gamificación | Auditoría §0 · Enterprise: fidelización y gamificación |
| /planes | Plan Enterprise: Envío de ventas a Meta (API de Conversiones) | Auditoría §2.3 · Atribución de anuncios, extra Enterprise |
| /preguntas-frecuentes | ¿Qué es Valthor? Valthor es la suite de IA para PyMEs de MTS Group: atiende, vende, cobra y agenda por WhatsApp, Instagram y Facebook. Responde con tu catálogo y tus reglas, envía links de pago de Mercado Pago y deriva a una persona cuando hace falta. Todo queda registrado con tus contactos y tus ventas. | Auditoría §2.1 Agente (ACTIVA), §2.2 Links de pago (ACTIVA), §2.6 Agenda (ACTIVA), §2.1 Derivación (ACTIVA), §2.5 Contactos (ACTIVA) |
| /preguntas-frecuentes y / | ¿Necesito saber programar? No. Conectás tus canales, cargás tu catálogo y tus reglas en pantallas simples, y Valthor queda atendiendo en unas 2 horas. | Auditoría §2.1 Agente: configuración en pantallas; README · Owner-confirmed facts: atendiendo en 2 horas |
| /preguntas-frecuentes y / | ¿En qué países funciona? Hoy Valthor tiene clientes en Argentina, Chile, España y Estados Unidos. La plataforma y el agente trabajan en español. | Dueño, mensaje del 18/10/2026 en esta sesión |
| /preguntas-frecuentes y / | ¿Usa la API oficial o un WhatsApp por QR? La API oficial de WhatsApp Business. Somos Meta Business Partner, así que tu número no corre riesgo de bloqueo por usar herramientas no autorizadas. | Auditoría §1 fila 14 (VERDADERO); README · Owner-confirmed facts: Meta Business Partner |
| /preguntas-frecuentes | ¿Qué canales atiende la IA? WhatsApp, Instagram y Facebook Messenger. Un solo agente responde en los tres a la vez y todas las conversaciones llegan a una misma bandeja. | Auditoría §1 fila 1 (VERDADERO) y §2.1 Bandeja unificada (ACTIVA) |
| /preguntas-frecuentes | ¿Puedo usar mi número de WhatsApp actual? Sí. Conectás tu número por la API oficial de Meta y podés seguir usándolo también en la app de WhatsApp Business. | Auditoría §2.1 Conexión de canales (ACTIVA) |
| /preguntas-frecuentes | ¿La IA atiende las 24 horas? Vos decidís. La encendés por canal para que atienda todo el día o solo en el horario que elijas. Viene apagada hasta que la encendés. | Auditoría §0 dato 2 (viene apagada) y §2.1 Agente, paso 4 |
| /preguntas-frecuentes y / | ¿Entiende audios? Sí. Tus clientes pueden mandar notas de voz y la IA las entiende y responde. | README · Owner-confirmed facts: transcripción de audios entrantes |
| /preguntas-frecuentes y / | ¿Cuánto cuesta WhatsApp aparte de Valthor? Meta cobra algunos mensajes directamente a tu cuenta, según su tarifa. Te lo explicamos con tus números en la llamada. | Tarifa de Meta por conversación (no es una función de Valthor) |
| /preguntas-frecuentes y / | ¿Qué pasa si la IA no sabe responder? Te pasa la conversación. También lo hace si el cliente pide hablar con una persona o se enoja. Vos tomás el chat y luego se lo devolvés a la IA. | Auditoría §2.1 Derivación a humano (ACTIVA) |
| /preguntas-frecuentes | ¿Cómo cobra la IA? Envía un link de pago de Mercado Pago desde tu propia cuenta. Cuando el pago se aprueba, la venta queda cerrada en el CRM. Los medios de pago y las cuotas son los que tengas habilitados en Mercado Pago. | Auditoría §2.2 Links de pago con Mercado Pago (ACTIVA): cuotas y tarjetas según Mercado Pago |
| /preguntas-frecuentes | ¿La IA puede inventar un precio? No. El monto del link de pago lo calcula el sistema con los precios de tu catálogo; la IA no lo inventa. | Auditoría §2.2 Links de pago: «el monto lo calcula el sistema (la IA no lo inventa)» |
| /preguntas-frecuentes y / | ¿Con qué se integra Valthor? Valthor se integra con Tienda Nube, Mercado Libre, Magento, Mercado Pago, Kuad System, ZEUS ERP & POS, GymFlow, Google Calendar, Outlook, Gmail, WhatsApp, Instagram y Facebook. El catálogo de tu tienda o tu ERP se actualiza todos los días. | Auditoría §2.2 Catálogo (Tienda Nube, Mercado Libre, Magento) y Links de pago (Mercado Pago), §2.6 Agenda (Google/Outlook), §2.5 Correo con IA (Gmail/Outlook), §2.7 GymFlow, §1 fila 1 (WhatsApp, Instagram y Facebook); README · Owner-confirmed facts: Kuad System, GymFlow y ZEUS ERP |
| /preguntas-frecuentes | ¿Se conecta con mi tienda o mi ERP? Sí, con Tienda Nube, Mercado Libre, Magento, Kuad System y ZEUS ERP & POS. El catálogo se actualiza todos los días. | Auditoría §2.2 Catálogo (Tienda Nube, Mercado Libre, Magento); README · Owner-confirmed facts: Kuad System y ZEUS ERP |
| /preguntas-frecuentes y / | ¿Puedo probarlo antes de pagar? Sí. Tenés 15 días de prueba gratis y un Playground para conversar con tu agente antes de encenderlo. | Auditoría §1 fila 15: prueba gratis de 15 días y Playground |
| /preguntas-frecuentes | ¿Cuánto cuesta Valthor? Depende del plan y de cuánto trabaje la IA. Armamos la propuesta con tus números en una llamada, y antes podés probarlo gratis durante 15 días. | Sin precio publicado (regla del README) |
| /preguntas-frecuentes | ¿Puedo manejarlo desde el celular? Sí. Valthor funciona desde el navegador del celular y podés instalarlo como app web para tener tus conversaciones a mano. | Auditoría §2.7 App móvil (PARCIAL) y recomendación §4.3: «manéjalo desde el celular», app web instalable |

## Pendiente de confirmar por el dueño

- Nombre del plan de entrada: en el sitio figura como **«Inicial»** (la auditoría no lo nombra; solo menciona Pro y Enterprise y «1, 3 o 7 negocios según el plan»).
