// ============================================================
//  PIXELATED — SITEMAP GENERATOR
//  Reads real product & category data and writes public/sitemap.xml
//  Runs automatically before every build (wired into package.json).
//  You never need to edit this when you add products — it just works.
// ============================================================

import { writeFileSync } from 'fs';
import { products } from '../src/products';
import { categories, formatCategories } from '../src/config';

const SITE_URL = 'https://pixelatedpk.vercel.app'; // update if you move to a custom domain

type UrlEntry = { loc: string; changefreq: string; priority: string };

const urls: UrlEntry[] = [];

// Homepage
urls.push({ loc: `${SITE_URL}/`, changefreq: 'daily', priority: '1.0' });

// Categories index
urls.push({ loc: `${SITE_URL}/categories`, changefreq: 'weekly', priority: '0.8' });

// Format-level category pages (frames-canvas, square-frames-canvas, metal-poster)
for (const fc of formatCategories) {
  if (fc.comingSoon) continue; // skip formats not launched yet
  urls.push({ loc: `${SITE_URL}/categories/${fc.slug}`, changefreq: 'weekly', priority: '0.8' });
}

// Individual category pages
for (const c of categories) {
  if (c.comingSoon) continue;
  urls.push({ loc: `${SITE_URL}/category/${c.slug}`, changefreq: 'weekly', priority: '0.7' });
}

// Individual product pages — only real, in-stock items
for (const p of products) {
  if (!p.inStock) continue;
  urls.push({ loc: `${SITE_URL}/product/${p.id}`, changefreq: 'weekly', priority: '0.6' });
}

// Terms page
urls.push({ loc: `${SITE_URL}/terms`, changefreq: 'yearly', priority: '0.3' });

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

writeFileSync('public/sitemap.xml', xml);
console.log(`Sitemap generated with ${urls.length} URLs → public/sitemap.xml`);
