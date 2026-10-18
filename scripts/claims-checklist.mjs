// Builds docs/CLAIMS_CHECKLIST.md: every feature claim on the site and the
// audit row (reference/AUDITORIA_FUNCIONALIDADES.md) or README override that
// backs it. Landing and plan claims come from the `source` fields in
// src/content; home and FAQ claims are listed here.
// Usage: node scripts/claims-checklist.mjs
import { readFileSync, readdirSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const A = 'Auditoría';
const R = 'README · Owner-confirmed facts';

const home = [
  ['Responde en WhatsApp, Instagram y Facebook con tu catálogo y tus precios', `${A} §1 fila 1 (VERDADERO) y §2.1 Agente de IA (ACTIVA)`],
  ['Entiende audios', `${R}: transcripción de audios entrantes en producción`],
  ['Envía el link de Mercado Pago y cierra la venta cuando se aprueba el pago', `${A} §2.2 Links de pago con Mercado Pago (ACTIVA, con configuración)`],
  ['Agenda turnos, reprograma, cobra la seña y los recuerda; Google y Outlook', `${A} §1 fila 13 (VERDADERO) y §2.6 Agenda y turnos con seña (ACTIVA)`],
  ['Sigue a cada cliente hasta que compra / vuelve a escribir a quien no respondió, recompra, ventas frías', `${A} §2.3 Automatizaciones de recupero (ACTIVA, Pro+)`],
  ['Mide cuánto vendió tu IA y qué anuncio de Meta trae ventas; ROAS real; anuncios que gastan sin vender', `${A} §2.3 Atribución de anuncios de Meta + ROAS (ACTIVA, Pro+) y §2.4 Inicio (ACTIVA)`],
  ['API oficial de WhatsApp', `${A} §1 fila 14 (VERDADERO) y §2.1 Conexión de canales (ACTIVA)`],
  ['Meta Business Partner', `${R}: MTS Group / Valthor es Meta Business Partner`],
  ['Atendiendo en 2 horas', `${R}: un cliente nuevo atiende en unas 2 horas`],
  ['Sin cambiar tu número', `${A} §2.1 Conexión de canales: admite usar el mismo número en la app de WhatsApp Business`],
  ['Lo pruebas gratis en el Playground antes de encenderlo', `${A} §2.1 Agente de IA, paso 3 (no consume créditos) y §1 fila 15`],
  ['Todo el día o por horario', `${A} §2.1 Agente de IA, paso 4`],
  ['Cuando hace falta una persona, te pasa la conversación', `${A} §1 fila 10 (VERDADERO) y §2.1 Derivación a humano (ACTIVA)`],
  ['Ecommerce: stock, talles, envíos y «¿dónde está mi pedido?»', `${A} §2.2 Catálogo (PARCIAL) y Pedidos y envíos (ACTIVA)`],
  ['Gimnasios: socios en riesgo, check-in por QR y rutinas con IA', `${A} §2.7 Vertical Gimnasios + GymFlow (ACTIVA, Pro+)`],
  ['Cursos y eventos: cupos, seña y lista de espera por chat', `${A} §2.6 Cursos y eventos con cupo (ACTIVA)`],
  ['Mayoristas: una lista de precios por cliente que la IA respeta', `${A} §2.5 Listas de clientes con precio propio (ACTIVA)`],
  ['Alianzas e integración con Kuad System, GymFlow y ZEUS ERP', `${R}: integraciones Kuad System, GymFlow y ZEUS ERP en producción`],
  ['Integraciones: Tienda Nube, Mercado Libre, Magento; catálogo actualizado todos los días', `${A} §2.2 Catálogo de productos (PARCIAL: 1 vez por noche o con botón) y recomendación §4.2`],
  ['Integraciones: Mercado Pago', `${A} §2.2 Links de pago (ACTIVA)`],
  ['Integraciones: Google Calendar, Outlook, Gmail', `${A} §2.6 Agenda (Google/Outlook) y §2.5 Correo con IA (Gmail/Outlook, ACTIVA)`],
  ['Clientes en Argentina, Chile, España y Estados Unidos', 'Dueño, mensaje del 18/10/2026 en esta sesión'],
];

const faqSources = {
  'que-es': `${A} §2.1 Agente (ACTIVA), §2.2 Links de pago (ACTIVA), §2.6 Agenda (ACTIVA), §2.1 Derivación (ACTIVA), §2.5 Contactos (ACTIVA)`,
  programar: `${A} §2.1 Agente: configuración en pantallas; ${R}: atendiendo en 2 horas`,
  paises: 'Dueño, mensaje del 18/10/2026 en esta sesión',
  'api-oficial': `${A} §1 fila 14 (VERDADERO); ${R}: Meta Business Partner`,
  canales: `${A} §1 fila 1 (VERDADERO) y §2.1 Bandeja unificada (ACTIVA)`,
  'mismo-numero': `${A} §2.1 Conexión de canales (ACTIVA)`,
  horario: `${A} §0 dato 2 (viene apagada) y §2.1 Agente, paso 4`,
  audios: `${R}: transcripción de audios entrantes`,
  'costo-whatsapp': 'Tarifa de Meta por conversación (no es una función de Valthor)',
  'no-sabe': `${A} §2.1 Derivación a humano (ACTIVA)`,
  cobro: `${A} §2.2 Links de pago con Mercado Pago (ACTIVA): cuotas y tarjetas según Mercado Pago`,
  'precios-ia': `${A} §2.2 Links de pago: «el monto lo calcula el sistema (la IA no lo inventa)»`,
  'tienda-erp': `${A} §2.2 Catálogo (Tienda Nube, Mercado Libre, Magento); ${R}: Kuad System y ZEUS ERP`,
  prueba: `${A} §1 fila 15: prueba gratis de 15 días y Playground`,
  costo: 'Sin precio publicado (regla del README)',
  celular: `${A} §2.7 App móvil (PARCIAL) y recomendación §4.3: «manéjalo desde el celular», app web instalable`,
};

const rows = [];
const fm = (file) => readFileSync(file, 'utf8').split('---')[1];
const walk = (dir) => readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? walk(join(dir, f)) : [join(dir, f)]));

for (const file of walk('src/content/landings').sort()) {
  const page = '/' + file.replace('src/content/landings/', '').replace(/\.md$/, '');
  const y = fm(file);
  for (const m of y.matchAll(/- (?:id: [^\n]+\n\s+)?(?:logo: [^\n]+\n\s+)?title: "([^"]+)"\n\s+text: "([^"]+)"(?:\n\s+note: "([^"]+)")?\n\s+source: "([^"]+)"/g)) {
    rows.push([page, `**${m[1]}**${m[3] ? ` (${m[3]})` : ''}: ${m[2]}`, m[4]]);
  }
}
const plans = JSON.parse(readFileSync('src/content/planes.json', 'utf8'));
for (const p of plans.plans) for (const i of p.includes) rows.push(['/planes', `Plan ${p.name}: ${i.text}`, i.source]);
const faqs = JSON.parse(readFileSync('src/content/faq.json', 'utf8'));
for (const f of faqs) {
  if (!faqSources[f.id]) throw new Error(`Add a source for FAQ "${f.id}" in scripts/claims-checklist.mjs`);
  rows.push(['/preguntas-frecuentes' + (f.showOnHome ? ' y /' : ''), `${f.question} ${f.answer}`, faqSources[f.id]]);
}

const esc = (s) => s.replace(/\|/g, '\\|');
const md = `# Lista de afirmaciones y su respaldo

Generada con \`node scripts/claims-checklist.mjs\`. Cada afirmación sobre lo que hace Valthor apunta a la fila de \`reference/AUDITORIA_FUNCIONALIDADES.md\` (auditoría del 15/10/2026) o a la confirmación del dueño en \`reference/README.md\` que la respalda.

Reglas que se cumplen en todo el sitio (las controla \`npm run verify\`): sin carritos abandonados, vuelta de stock, comentarios de Instagram/Facebook, reseñas automáticas, Telegram, TikTok, Web Chat, Shopify, «tiempo real», app en tiendas, demo interactiva, Thor, inmobiliarias, precios ni métricas sin fuente. Las funciones que dependen del plan se marcan «Plan Pro o superior».

## Portada (/)

| Afirmación | Respaldo |
| --- | --- |
${home.map(([c, s]) => `| ${esc(c)} | ${esc(s)} |`).join('\n')}

Las métricas de la sección de atribución ($5.330.200, ROAS 6,4x) llevan la etiqueta visible «Datos de ejemplo».

## Páginas de funciones, rubros, alianzas, planes y preguntas frecuentes

| Página | Afirmación | Respaldo |
| --- | --- | --- |
${rows.map(([p, c, s]) => `| ${p} | ${esc(c)} | ${esc(s)} |`).join('\n')}

## Pendiente de confirmar por el dueño

- Nombre del plan de entrada: en el sitio figura como **«Inicial»** (la auditoría no lo nombra; solo menciona Pro y Enterprise y «1, 3 o 7 negocios según el plan»).
`;
writeFileSync('docs/CLAIMS_CHECKLIST.md', md);
console.log(`docs/CLAIMS_CHECKLIST.md: ${home.length + rows.length} claims`);
