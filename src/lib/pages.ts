// Every indexable page with its title and description, built from the
// content files. Used by /llms.txt and /llms-full.txt.
import { getEntry, getCollection } from 'astro:content';

export async function getPageIndex() {
  const home = (await getEntry('home', 'home'))!.data;
  const plans = (await getEntry('plans', 'planes'))!.data;
  const faqPage = (await getEntry('faqPage', 'page'))!.data;
  const landings = await getCollection('landings');
  const legal = await getCollection('legal');
  const order = { funcion: 1, rubro: 2, alianza: 3 } as const;
  return {
    main: [
      { name: 'Inicio', path: '/', description: home.seo.description },
      ...landings
        .sort((a, b) => order[a.data.kind] - order[b.data.kind] || a.id.localeCompare(b.id))
        .map((l) => ({ name: l.data.h1, path: `/${l.id}`, description: l.data.seo.description })),
      { name: plans.h1, path: '/planes', description: plans.seo.description },
      { name: faqPage.h1, path: '/preguntas-frecuentes', description: faqPage.seo.description },
    ],
    legal: legal.map((l) => ({ name: l.data.title, path: `/${l.id}`, description: l.data.seo.description })),
    landings,
    plans,
  };
}
