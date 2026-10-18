// /llms.txt: plain-text summary for AI assistants (https://llmstxt.org).
// Page list and wording come from the content files, so it stays in sync.
import type { APIRoute } from 'astro';
import { getEntry, getCollection } from 'astro:content';
import { getSite, getFaqs } from '../lib/content';

export const GET: APIRoute = async () => {
  const site = await getSite();
  const home = (await getEntry('home', 'home'))!.data;
  const legal = await getCollection('legal');
  const faqs = await getFaqs();
  const url = (p: string) => `${site.url}${p === '/' ? '' : p}`;

  const pages = [{ name: 'Inicio', path: '/', description: home.seo.description }];

  const text = `# Valthor

> ${home.hero.lead}

Valthor es una suite de IA para PyMEs de ${site.organization.legalName} (${site.organization.city}, Argentina). Un agente de IA atiende WhatsApp (API oficial de Meta), Instagram y Facebook con el catálogo y las reglas del negocio, envía links de pago de Mercado Pago, agenda turnos con seña, deriva a una persona cuando hace falta y mide qué anuncio de Meta trae ventas. Es Meta Business Partner. Prueba gratis de 15 días.

## Páginas

${pages.map((p) => `- [${p.name}](${url(p.path)}): ${p.description}`).join('\n')}

## Preguntas frecuentes

${faqs.map((f) => `- ${f.question} ${f.answer}`).join('\n')}

## Contacto

- [Probar gratis 15 días](${site.cta.trial.href})
- [Agendar una llamada](${site.cta.booking.href})
- [WhatsApp](${site.cta.whatsapp.href})

## Legal

${legal.map((l) => `- [${l.data.title}](${url('/' + l.id)})`).join('\n')}
`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
