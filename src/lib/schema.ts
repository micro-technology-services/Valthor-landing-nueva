// JSON-LD builders. Every page gets Organization, the founder, WebSite and
// Valthor (SoftwareApplication); pages add their own nodes.
const SITE = 'https://www.valthor.app';

/** Official definition. Use it verbatim wherever Valthor needs defining. */
export const DEFINITION =
  'Valthor es la suite de IA para PyMEs de MTS Group: atiende, vende, cobra y agenda por WhatsApp, Instagram y Facebook.';

export const COUNTRIES = ['Argentina', 'Chile', 'España', 'Estados Unidos'];

export const INTEGRATIONS = [
  'Tienda Nube',
  'Mercado Libre',
  'Magento',
  'Mercado Pago',
  'Kuad System',
  'ZEUS ERP & POS',
  'GymFlow',
  'Google Calendar',
  'Outlook',
  'Gmail',
  'WhatsApp',
  'Instagram',
  'Facebook',
];

const list = (items: string[]) => `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`;

/** Short fact list that follows the definition in /llms.txt and /llms-full.txt. */
export const FACTS = `- Empresa: MTS Group S.A.S., Buenos Aires, Argentina.
- Países con clientes: ${list(COUNTRIES)}.
- WhatsApp: API oficial de WhatsApp Business de Meta (no usa WhatsApp por QR).
- Prueba gratis de 15 días. El precio se define en una llamada según el plan y el uso.
- Integraciones: ${list(INTEGRATIONS)}.`;

// Official profiles of Valthor / MTS Group, from the PUBLIC_SAME_AS env var
// (comma-separated URLs).
const sameAs: string[] = (import.meta.env.PUBLIC_SAME_AS ?? '')
  .split(',')
  .map((u: string) => u.trim())
  .filter(Boolean);

export const organization = {
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'MTS Group S.A.S.',
  legalName: 'MTS Group S.A.S.',
  brand: { '@type': 'Brand', '@id': `${SITE}/#brand`, name: 'Valthor', ...(sameAs.length ? { sameAs } : {}) },
  url: SITE,
  logo: `${SITE}/valthor-logo.png`,
  description: DEFINITION,
  founder: { '@id': `${SITE}/#founder` },
  areaServed: COUNTRIES.map((name) => ({ '@type': 'Country', name })),
  knowsAbout: ['Inteligencia artificial', 'WhatsApp Business API', 'Atención al cliente', 'Ventas conversacionales'],
  ...(sameAs.length ? { sameAs } : {}),
  address: { '@type': 'PostalAddress', addressLocality: 'Buenos Aires', addressCountry: 'AR' },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    url: 'https://wa.me/5491131381205',
    availableLanguage: ['es'],
  },
};

export const founder = {
  '@type': 'Person',
  '@id': `${SITE}/#founder`,
  name: 'Matías Peralta',
  jobTitle: 'CEO',
  worksFor: { '@id': `${SITE}/#organization` },
  sameAs: ['https://www.youtube.com/@matiperaltatech'],
};

export const softwareApplication = {
  '@type': 'SoftwareApplication',
  '@id': `${SITE}/#software`,
  name: 'Valthor',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Suite de IA para PyMEs',
  operatingSystem: 'Web',
  inLanguage: 'es',
  url: SITE,
  description: DEFINITION,
  featureList: [
    'Atiende por WhatsApp (API oficial de WhatsApp Business de Meta)',
    'Atiende por Instagram',
    'Atiende por Facebook',
    'Vende con tu catálogo',
    'Cobra con links de Mercado Pago',
    'Agenda turnos',
  ],
  countriesSupported: COUNTRIES,
  // The free trial only: no prices are published (see scripts/verify-build.mjs).
  offers: {
    '@type': 'Offer',
    name: 'Prueba gratis de 15 días',
    description: 'Prueba gratis de 15 días, sin cargo.',
    url: 'https://platform.valthor.app/login',
    eligibleDuration: { '@type': 'QuantitativeValue', value: 15, unitCode: 'DAY' },
  },
  publisher: { '@id': `${SITE}/#organization` },
  ...(sameAs.length ? { sameAs } : {}),
};

export function faqPage(faqs: { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Inicio', path: '/' }, ...items].map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE}${it.path === '/' ? '' : it.path}`,
    })),
  };
}

export const website = {
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  url: SITE,
  name: 'Valthor',
  inLanguage: 'es',
  publisher: { '@id': `${SITE}/#organization` },
};

export function webPage({
  path,
  name,
  description,
  mentions = [],
}: {
  path: string;
  name: string;
  description: string;
  /** Other organizations named on the page, e.g. alliance partners. */
  mentions?: { name: string; url: string }[];
}) {
  return {
    '@type': 'WebPage',
    '@id': `${SITE}${path}#webpage`,
    url: `${SITE}${path}`,
    name,
    description,
    inLanguage: 'es',
    isPartOf: { '@id': `${SITE}/#website` },
    about: { '@id': `${SITE}/#software` },
    publisher: { '@id': `${SITE}/#organization` },
    ...(mentions.length ? { mentions: mentions.map((m) => ({ '@type': 'Organization', ...m })) } : {}),
  };
}
