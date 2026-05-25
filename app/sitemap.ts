import { MetadataRoute } from 'next';
import { listChapters } from '@/lib/chapters';

const BASE = 'https://faanclub.co';

export default function sitemap(): MetadataRoute.Sitemap {
  const chapters = listChapters();

  const chapterUrls = chapters.map((c) => ({
    url: `${BASE}/cookbook/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    { url: BASE,                      lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/cookbook`,        lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/kitchen`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/kitchen/drills`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/kitchen/games`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/open-tables`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/about`,           lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.4 },
    ...chapterUrls,
  ];
}
