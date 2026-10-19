// Schemas for every editable content file in src/content/.
// If a text file is edited with a mistake (a missing field, a typo in a key),
// the build fails with a message pointing at the file and the field.
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const link = z.object({ label: z.string(), href: z.string() });

const seo = z.object({
  title: z.string().min(50).max(60),
  description: z.string().min(140).max(160),
});

const message = z.object({
  from: z.enum(['client', 'ai']),
  text: z.string().optional(),
  audio: z.string().optional(),
  meta: z.string().optional(),
});

const site = defineCollection({
  loader: file('src/content/site.json', { parser: (text) => ({ site: JSON.parse(text) }) }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    url: z.string().url(),
    organization: z.object({ legalName: z.string(), city: z.string(), country: z.string() }),
    cta: z.object({ demo: link, trial: link.extend({ shortLabel: z.string() }), booking: link, whatsapp: link }),
    nav: z.array(link),
    footer: z.object({
      columns: z.array(z.object({ title: z.string(), links: z.array(link) })),
      copyright: z.string(),
      legal: z.array(link),
    }),
  }),
});

const home = defineCollection({
  loader: file('src/content/home.json', { parser: (text) => ({ home: JSON.parse(text) }) }),
  schema: z.object({
    seo,
    hero: z.object({
      badge: z.string(),
      title: z.string(),
      lead: z.string(),
      trust: z.array(z.string()),
      mockup: z.object({
        label: z.string(),
        url: z.string(),
        tag: z.string(),
        listTitle: z.string(),
        chats: z.array(
          z.object({
            initials: z.string(),
            name: z.string(),
            preview: z.string(),
            color: z.string(),
            status: z.string().optional(),
            active: z.boolean().optional(),
          }),
        ),
        thread: z.object({
          name: z.string(),
          initials: z.string(),
          meta: z.string(),
          messages: z.array(message),
          outcome: z.string(),
        }),
      }),
    }),
    clients: z.object({
      eyebrow: z.string(),
      title: z.string(),
      logos: z.array(
        z.object({
          name: z.string(),
          image: z.string().optional(),
          invert: z.boolean().optional(),
          style: z.enum(['spaced', 'sans', 'grotesk', 'light', 'italic']).optional(),
        }),
      ),
    }),
    problem: z.object({
      eyebrow: z.string(),
      title: z.string(),
      pains: z.array(z.string()),
      text: z.string(),
      chat: z.object({ label: z.string(), name: z.string(), messages: z.array(message), caption: z.string() }),
    }),
    jobs: z.object({
      eyebrow: z.string(),
      title: z.string(),
      items: z.array(z.object({ title: z.string(), text: z.string(), href: z.string().optional() })),
    }),
    agent: z.object({
      eyebrow: z.string(),
      title: z.string(),
      chips: z.array(z.object({ emoji: z.string(), title: z.string(), text: z.string() })),
      phone: z.object({ label: z.string(), business: z.string(), status: z.string(), messages: z.array(message) }),
      comparison: z.array(z.object({ before: z.string(), after: z.string() })),
      text: z.string(),
    }),
    steps: z.object({
      title: z.string(),
      text: z.string(),
      items: z.array(z.object({ title: z.string(), text: z.string() })),
    }),
    roas: z.object({
      eyebrow: z.string(),
      title: z.string(),
      text: z.string(),
      cards: z.object({
        label: z.string(),
        sold: z.object({ label: z.string(), value: z.string(), note: z.string() }),
        roas: z.object({ label: z.string(), value: z.string() }),
        ads: z.object({
          label: z.string(),
          rows: z.array(z.object({ name: z.string(), value: z.string(), warn: z.boolean().optional() })),
        }),
        disclaimer: z.string(),
      }),
    }),
    industries: z.object({
      eyebrow: z.string(),
      title: z.string(),
      items: z.array(z.object({ title: z.string(), text: z.string(), href: z.string().optional() })),
      linkLabel: z.string(),
    }),
    alliances: z.object({
      eyebrow: z.string(),
      title: z.string(),
      text: z.string(),
      items: z.array(
        z.object({
          logo: z.enum(['kuad', 'gymflow', 'zeus']),
          alt: z.string(),
          title: z.string(),
          text: z.string(),
          href: z.string(),
        }),
      ),
      linkLabel: z.string(),
    }),
    integrations: z.object({
      title: z.string(),
      text: z.string(),
      items: z.array(
        z.object({
          name: z.string(),
          icon: z.string().optional(),
          monogram: z.string().optional(),
          color: z.string().optional(),
        }),
      ),
    }),
    faq: z.object({ title: z.string(), moreLabel: z.string() }),
    closing: z.object({ title: z.string() }),
  }),
});

const faq = defineCollection({
  loader: file('src/content/faq.json'),
  schema: z.object({
    category: z.string(),
    question: z.string(),
    answer: z.string(),
    showOnHome: z.boolean().default(false),
  }),
});

// Function, industry and alliance pages: the 7-block template.
// `source` on every feature points to the audit row or README override
// that backs the claim (used to build docs/CLAIMS_CHECKLIST.md).
const landings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/landings' }),
  schema: z.object({
    kind: z.enum(['funcion', 'rubro', 'alianza']),
    seo,
    breadcrumb: z.string(),
    updated: z.string(),
    eyebrow: z.string(),
    h1: z.string(),
    intro: z.string(),
    highlights: z.array(z.string()).min(2).max(4),
    pain: z.object({ title: z.string(), items: z.array(z.string()).min(3).max(5), text: z.string() }),
    features: z.object({
      title: z.string(),
      text: z.string().optional(),
      items: z
        .array(
          z.object({
            id: z.string().optional(),
            logo: z.enum(['kuad', 'gymflow', 'zeus']).optional(),
            title: z.string(),
            text: z.string(),
            note: z.string().optional(),
            source: z.string(),
          }),
        )
        .min(3),
    }),
    conversation: z.object({
      title: z.string(),
      text: z.string(),
      business: z.string(),
      messages: z.array(message).min(3),
    }),
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })).min(4).max(6),
    cta: z.object({ title: z.string(), text: z.string() }),
    related: z.array(z.object({ title: z.string(), text: z.string(), href: z.string() })).min(2).max(3),
  }),
});

const plans = defineCollection({
  loader: file('src/content/planes.json', { parser: (text) => ({ planes: JSON.parse(text) }) }),
  schema: z.object({
    seo,
    eyebrow: z.string(),
    h1: z.string(),
    intro: z.string(),
    plans: z.array(
      z.object({
        name: z.string(),
        tagline: z.string(),
        businesses: z.string(),
        featured: z.boolean().optional(),
        includes: z.array(z.object({ text: z.string(), source: z.string() })),
      }),
    ),
    allPlans: z.object({ title: z.string(), items: z.array(z.string()) }),
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })).min(3).max(6),
    cta: z.object({ title: z.string(), text: z.string() }),
  }),
});

const faqPageContent = defineCollection({
  loader: file('src/content/preguntas-frecuentes.json', { parser: (text) => ({ page: JSON.parse(text) }) }),
  schema: z.object({ seo, h1: z.string(), intro: z.string(), cta: z.object({ title: z.string(), text: z.string() }) }),
});

const legal = defineCollection({
  loader: glob({ pattern: '*.md', base: 'src/content/legal' }),
  schema: z.object({
    title: z.string(),
    seo,
    updated: z.string(),
  }),
});

export const collections = { site, home, faq, legal, landings, plans, faqPage: faqPageContent };
