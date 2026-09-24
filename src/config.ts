// ============================================================
//  PIXELATED — SITE CONFIGURATION
//  This file holds site-wide settings: branding, delivery
//  fees, categories, and shared type presets.
//
//  Product inventory is managed separately in src/products.ts
// ============================================================

export const site = {
  name: 'Pixelated',
  tagline: 'Wall Art That Speaks.',
  whatsapp: '923303007682',
  currency: 'Rs.',
  freeShippingThreshold: 5000,
  email: 'infopixelated.pk@gmail.com',
};

// ============================================================
//  PAYMENT CONFIG — all advance-payment details in one place.
//  Change any of these values to update the checkout page.
//  The QR code image should be placed in: public/payment/
//  Then set qrImage to: "/payment/your-qr.png"
// ============================================================
export const paymentConfig = {
  // Where order confirmation emails are sent. Change this to
  // route orders to a different inbox.
  orderEmail: 'orders@pixelated.pk',
  // Advance payment details shown on the checkout page
  raast: {
    qrImage: '/payment/raast-qr.png',
    accountName: 'Pixelated Store',
    accountNumber: '03001234567',
    methodLabel: 'JazzCash',
  },
};

// ============================================================
//  DELIVERY CHARGES — edit this one table to change fees
//  Cities not listed here use `defaultDeliveryFee`.
//  The correct fee is shown at checkout based on selected city.
// ============================================================
export const deliveryFees: Record<string, number> = {
  'Karachi': 150,
  'Lahore': 200,
  'Islamabad': 250,
  'Rawalpindi': 250,
  'Faisalabad': 220,
  'Multan': 280,
  'Peshawar': 300,
  'Quetta': 350,
  'Hyderabad': 180,
  'Sialkot': 230,
  'Gujranwala': 230,
  'Bahawalpur': 280,
  'Sukkur': 300,
  'Mardan': 320,
  'Sargodha': 250,
  'Mirpur': 300,
  'Abbottabad': 320,
  'Muzaffarabad': 350,
  'Rahim Yar Khan': 300,
  'Sahiwal': 250,
};
export const defaultDeliveryFee = 300;
// Cities shown in the checkout dropdown (keys of deliveryFees, sorted)
export const cities = Object.keys(deliveryFees).sort();

export function getDeliveryFee(city: string): number {
  return deliveryFees[city] ?? defaultDeliveryFee;
}

// ============================================================
//  SIZE PRESETS — products reference these by id, or define
//  custom ProductSize objects inline in products.ts.
// ============================================================
export interface ProductSize {
  id: string;
  label: string;   // display label, e.g. 'A4 · 8.3×11.7"'
  widthIn: number;  // real width in inches (for size chart)
  heightIn: number; // real height in inches (for size chart)
  price: number;
}

export const sizePresets: Record<string, ProductSize> = {
  mt_12x18: { id: 'mt_12x18', label: '12×18"', widthIn: 12, heightIn: 18, price: 2499 },
};

// Standard border colors used by the product page for each purchasable format.
// The storefront currently sells metal posters only.
export const standardBorderColors: Record<string, string> = {
  metal: '#94A3B8',
};

// ============================================================
//  CATEGORIES
// ============================================================
export interface Category {
  slug: string;
  name: string;
  code: string;
  tagline: string;
  description: string;
  gradient: [string, string];
  motif: string;
  accent: string;
  comingSoon?: boolean;
  format?: string; // which format page this category belongs to
  image?: string; // optional real photo path/URL; falls back to gradient if omitted
}

// ============================================================
//  FORMAT / CATEGORY CATALOG
//  Pixelated is currently a metal-poster-only storefront.
// ============================================================
export interface FormatCategory {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  gradient: [string, string];
  motif: string;
  accent: string;
  comingSoon?: boolean;
  link?: string;
  image?: string;
  hideFromNav?: boolean;
}

export const formatCategories: FormatCategory[] = [
  {
    slug: 'metal-poster',
    name: 'Metal Posters',
    tagline: 'Brushed aluminium prints with vivid color.',
    description: 'High-contrast prints on brushed aluminium — deep blacks, bright highlights, a modern edge.',
    gradient: ['#475569', '#1E293B'],
    motif: 'burst',
    accent: '#94A3B8',
    link: '/categories/metal-poster',
    image: '/images/formats/metal-poster.jpg',
    hideFromNav: true,
  },
  {
    slug: 'custom-metal',
    name: 'Custom Metal',
    tagline: 'Put your own design on metal.',
    description: 'Upload your photo, artwork or logo and turn it into a custom brushed-aluminium metal poster.',
    gradient: ['#12233A', '#2A3F5E'],
    motif: 'spark',
    accent: '#C9A24B',
    link: '/category/metal-custom',
    image: '/images/categories/metal-custom.jpg',
    hideFromNav: true,
  },
];

export const categories: Category[] = [
  { slug: 'metal-anime', name: 'Anime', code: 'MAN', tagline: 'From the frame to your wall.', description: 'Iconic anime moments on brushed aluminium — vivid color, deep blacks, a modern edge.', gradient: ['#3A1C71', '#D76D77'], motif: 'burst', accent: '#D76D77', format: 'metal-poster', image: '/images/categories/metal-anime.jpg' },
  { slug: 'metal-movies', name: 'Movies', code: 'MVM', tagline: 'Cinema, reimagined in metal.', description: 'Cinematic artwork on brushed aluminium — poster-grade color with a metallic sheen.', gradient: ['#0F2027', '#2C5364'], motif: 'film', accent: '#2C5364', format: 'metal-poster', image: '/images/categories/metal-movies.jpg' },
  { slug: 'metal-sports', name: 'Sports', code: 'MSP', tagline: 'Legends, immortalised.', description: 'The moments that defined the game, on brushed aluminium — action poses, iconic stances, stadium silhouettes.', gradient: ['#F12711', '#F5AF19'], motif: 'chevron', accent: '#F5AF19', format: 'metal-poster', image: '/images/categories/metal-sports.jpg' },
  { slug: 'metal-home-decor', name: 'Home Decor', code: 'MHD', tagline: 'Walls with warmth.', description: 'Botanicals, abstracts and minimalist line art, printed on brushed aluminium for a sharp, modern finish.', gradient: ['#0B486B', '#56AB2F'], motif: 'leaf', accent: '#56AB2F', format: 'metal-poster', image: '/images/categories/metal-home-decor.jpg' },
  { slug: 'metal-marvel-dc', name: 'Marvel / DC', code: 'MMD', tagline: 'Heroes, assembled.', description: 'Comic-book classics and cinematic key art on brushed aluminium — vivid color, deep blacks, a modern edge.', gradient: ['#ED213A', '#932503'], motif: 'shield', accent: '#ED213A', format: 'metal-poster', image: '/images/categories/metal-marvel-dc.jpg' },
  { slug: 'metal-custom', name: 'Custom Prints', code: 'MCU', tagline: 'Your wall, your story.', description: 'Upload your photo or artwork — we print it on brushed aluminium in your chosen size.', gradient: ['#12233A', '#2A3F5E'], motif: 'spark', accent: '#C9A24B', format: 'metal-poster', image: '/images/categories/metal-custom.jpg' },
  { slug: 'metal-garage', name: 'Garage', code: 'MGR', tagline: 'Straight from the garage.', description: 'Automotive art on brushed aluminium — speed, design, and the soul of the machine, with a metallic edge.', gradient: ['#1A1A2E', '#E94560'], motif: 'chevron', accent: '#E94560', format: 'metal-poster', image: '/images/categories/metal-garage.jpg' },

  // Five reserved slots keep the catalog at 12 cards. Rename these when the new collections are decided.
  { slug: 'type-8', name: 'Type #8', code: 'TY8', tagline: 'Coming soon.', description: 'A new metal collection is on its way.', gradient: ['#334155', '#0F172A'], motif: 'spark', accent: '#94A3B8', format: 'metal-poster', comingSoon: true },
  { slug: 'type-9', name: 'Type #9', code: 'TY9', tagline: 'Coming soon.', description: 'A new metal collection is on its way.', gradient: ['#334155', '#0F172A'], motif: 'spark', accent: '#94A3B8', format: 'metal-poster', comingSoon: true },
  { slug: 'type-10', name: 'Type #10', code: 'T10', tagline: 'Coming soon.', description: 'A new metal collection is on its way.', gradient: ['#334155', '#0F172A'], motif: 'spark', accent: '#94A3B8', format: 'metal-poster', comingSoon: true },
  { slug: 'type-11', name: 'Type #11', code: 'T11', tagline: 'Coming soon.', description: 'A new metal collection is on its way.', gradient: ['#334155', '#0F172A'], motif: 'spark', accent: '#94A3B8', format: 'metal-poster', comingSoon: true },
  { slug: 'type-12', name: 'Type #12', code: 'T12', tagline: 'Coming soon.', description: 'A new metal collection is on its way.', gradient: ['#334155', '#0F172A'], motif: 'spark', accent: '#94A3B8', format: 'metal-poster', comingSoon: true },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function categoriesByFormat(format: string): Category[] {
  return categories.filter((c) => c.format === format);
}

export function formatPrice(n: number): string {
  return `${site.currency}${n.toLocaleString('en-PK')}`;
}

