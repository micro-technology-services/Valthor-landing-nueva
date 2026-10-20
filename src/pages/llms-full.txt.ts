// /llms-full.txt: the full text of the function, industry, alliance and plan
// pages in plain Markdown, for AI assistants that read a whole site at once.
import type { APIRoute } from 'astro';
import { getSite } from '../lib/content';
import { getPageIndex } from '../lib/pages';

export const GET: APIRoute = async () => {
  const site = await getSite();
  const { landings, plans } = await getPageIndex();
  const url = (p: string) => `${site.url}${p}`;
  const strip = (s: string) => s.replace(/\*\*/g, '');

  const pages = landings.map((l) => {
    const d = l.data;
    return `# ${d.h1}

URL: ${url('/' + l.id)}
Actualizado: ${d.updated}

${d.intro}

## ${d.pain.title}

${d.pain.items.map((i) => `- ${i}`).join('\n')}

${d.pain.text}

## ${d.features.title}
${d.features.text ? `\n${d.features.text}\n` : ''}
${d.features.items.map((f) => `- **${f.title}${f.note ? ` (${f.note})` : ''}:** ${f.text}${f.website ? ` Sitio: ${f.website}` : ''}`).join('\n')}
${l.body?.trim() ? `\n${strip(l.body.trim())}\n` : ''}
## Preguntas frecuentes

${d.faqs.map((f) => `### ${f.question}\n\n${f.answer}`).join('\n\n')}
`;
  });

  const planText = `# ${plans.h1}

URL: ${url('/planes')}

${plans.intro}

${plans.plans.map((p) => `## Plan ${p.name} (${p.businesses})\n\n${p.tagline}\n\n${p.includes.map((i) => `- ${i.text}`).join('\n')}`).join('\n\n')}

## ${plans.allPlans.title}

${plans.allPlans.items.map((i) => `- ${i}`).join('\n')}

${plans.faqs.map((f) => `### ${f.question}\n\n${f.answer}`).join('\n\n')}
`;

  const text = [`# Valthor: contenido completo\n\nFuente: ${site.url}. Resumen en ${url('/llms.txt')}.`, ...pages, planText].join('\n\n---\n\n');
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
