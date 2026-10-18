// JSON-LD builders. Every page gets Organization; pages add their own nodes.
const SITE = 'https://valthor.app';

export const organization = {
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'MTS Group S.A.S.',
  legalName: 'MTS Group S.A.S.',
  brand: { '@type': 'Brand', name: 'Valthor' },
  url: SITE,
  logo: `${SITE}/valthor-logo.png`,
  address: { '@type': 'PostalAddress', addressLocality: 'Buenos Aires', addressCountry: 'AR' },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    url: 'https://wa.me/5491131381205',
    availableLanguage: ['es'],
  },
};

export function softwareApplication(description: string) {
  return {
    '@type': 'SoftwareApplication',
    '@id': `${SITE}/#software`,
    name: 'Valthor',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'CRM y agente de IA para WhatsApp',
    operatingSystem: 'Web',
    inLanguage: 'es',
    url: SITE,
    description,
    publisher: { '@id': `${SITE}/#organization` },
  };
}

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
