// /llms.txt: plain-text summary for AI assistants (https://llmstxt.org).
// Built from the content files, so it stays in sync with the site.
import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';
import { getSite, getFaqs } from '../lib/content';
import { getPageIndex } from '../lib/pages';

export const GET: APIRoute = async () => {
  const site = await getSite();
  const home = (await getEntry('home', 'home'))!.data;
  const { main, legal } = await getPageIndex();
  const faqs = await getFaqs();
  const url = (p: string) => `${site.url}${p === '/' ? '' : p}`;

  const text = `# Valthor

> ${home.hero.lead}

Valthor es una suite de IA para PyMEs de ${site.organization.legalName} (${site.organization.city}, Argentina), con clientes en Argentina, Chile, España y Estados Unidos. La IA de Valthor atiende WhatsApp (API oficial de Meta), Instagram y Facebook con el catálogo y las reglas del negocio, entiende audios, envía links de pago de Mercado Pago, agenda turnos con seña, deriva a una persona cuando hace falta y mide qué anuncio de Meta trae ventas. Incluye un CRM con contactos, pipeline de ventas y calificación de clientes. MTS Group es Meta Business Partner. Prueba gratis de 15 días; el precio se define en una llamada según el plan y el uso.

## Páginas

${main.map((p) => `- [${p.name}](${url(p.path)}): ${p.description}`).join('\n')}

## Preguntas frecuentes

${faqs.map((f) => `- ${f.question} ${f.answer}`).join('\n')}

## Contacto

- [Ver una demo por WhatsApp](${site.cta.demo.href})
- [Probar gratis 15 días](${site.cta.trial.href})
- [Agendar una llamada](${site.cta.booking.href})

## Optional

- [Versión completa para asistentes de IA](${url('/llms-full.txt')}): todo el contenido de las páginas en texto plano.
${legal.map((l) => `- [${l.name}](${url(l.path)})`).join('\n')}
`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
