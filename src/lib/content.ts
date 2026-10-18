import faqOrder from '../content/faq.json';
import { getEntry, getCollection } from 'astro:content';

export async function getSite() {
  const entry = await getEntry('site', 'site');
  if (!entry) throw new Error('src/content/site.json is missing');
  return entry.data;
}

export async function getFaqs(filter?: (f: { id: string; showOnHome: boolean }) => boolean) {
  // Keep the order of src/content/faq.json.
  const order = faqOrder.map((f) => f.id);
  const all = await getCollection('faq');
  return all
    .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
    .map((e) => ({ id: e.id, ...e.data }))
    .filter((f) => (filter ? filter(f) : true));
}
