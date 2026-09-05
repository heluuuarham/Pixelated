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
  whatsapp: '923272506521',
  currency: 'Rs.',
  freeShippingThreshold: 5000,
  email: 'hello@pixelated.pk',
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
//  BORDER COLORS — shared list used by framed products
//  Products can use this default list (by omitting borderColors)
//  or define their own custom list inline in products.ts.
//  Edit this list to change the default available colors.
// ============================================================
export interface BorderColor {
  id: string;
  name: string;
  hex: string;
  priceModifier?: number; // optional, added to the size price
}

export const standardBorderColors: BorderColor[] = [
  { id: 'black', name: 'Matte Black', hex: '#1a1a1a' },
  { id: 'white', name: 'Ivory White', hex: '#F5F1E8' },
  { id: 'gold', name: 'Antique Gold', hex: '#C9A24B', priceModifier: 200 },
];

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
  a5:    { id: 'a5',    label: 'A5 · 5.8×8.3"',   widthIn: 5.8,  heightIn: 8.3,  price: 1490 },
  a4:    { id: 'a4',    label: 'A4 · 8.3×11.7"',  widthIn: 8.3,  heightIn: 11.7, price: 2490 },
  a3:    { id: 'a3',    label: 'A3 · 11.7×16.5"', widthIn: 11.7, heightIn: 16.5, price: 3990 },
  '12x16': { id: '12x16', label: '12×16"',        widthIn: 12,   heightIn: 16,   price: 3490 },
  '16x20': { id: '16x20', label: '16×20"',        widthIn: 16,   heightIn: 20,   price: 4990 },
  '18x24': { id: '18x24', label: '18×24"',        widthIn: 18,   heightIn: 24,   price: 6490 },
  // Frames-canvas variant-specific sizes
  fr_a4:   { id: 'fr_a4',   label: 'A4 · 8.3×11.7"',  widthIn: 8.3,  heightIn: 11.7, price: 1199 },
  fr_a3:   { id: 'fr_a3',   label: 'A3 · 11.7×16.5"', widthIn: 11.7, heightIn: 16.5, price: 1399 },
  cv_8x12:  { id: 'cv_8x12',  label: '8×12"',          widthIn: 8,    heightIn: 12,   price: 999 },
  cv_12x18: { id: 'cv_12x18', label: '12×18"',          widthIn: 12,   heightIn: 18,   price: 1299 },
  mt_12x18: { id: 'mt_12x18', label: '12×18"',       widthIn: 12,   heightIn: 18,   price: 2499 },
  sq_8x8:  { id: 'sq_8x8',  label: '8×8"',           widthIn: 8,    heightIn: 8,    price: 1399 },
  sq_12x12:{ id: 'sq_12x12',label: '12×12"',          widthIn: 12,   heightIn: 12,   price: 1599 },
  // Square Frames & Canvas — framed sizes (8×8 and 12×12)
  sqfr_8x8:   { id: 'sqfr_8x8',   label: '8×8"',   widthIn: 8,  heightIn: 8,  price: 1199 },
  sqfr_12x12: { id: 'sqfr_12x12', label: '12×12"', widthIn: 12, heightIn: 12, price: 1399 },
  // Square Frames & Canvas — canvas sizes (8×8 and 12×12)
  sqcv_8x8:   { id: 'sqcv_8x8',   label: '8×8"',   widthIn: 8,  heightIn: 8,  price: 999 },
  sqcv_12x12: { id: 'sqcv_12x12', label: '12×12"', widthIn: 12, heightIn: 12, price: 1299 },
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
  format?: string; // 'frames-canvas' | 'square-frames-canvas' | 'metal-poster' — which format page this category belongs to
}

// ============================================================
//  FORMAT CATEGORIES — shown on the homepage as top-level cards.
//  "Frames & Canvas" links to the theme categories page.
//  Coming-soon formats are grayed out and not clickable.
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
}

export const formatCategories: FormatCategory[] = [
  { slug: 'frames-canvas', name: 'Rectangle Frames & Canvas', tagline: 'Glass-front framed prints & gallery-wrapped canvas.', description: 'Every design is available as a glass-front framed print with your choice of border color, or as a gallery-wrapped canvas on a wooden frame. Premium materials, made to order.', gradient: ['#12233A', '#2A3F5E'], motif: 'shield', accent: '#C9A24B', link: '/categories/frames-canvas' },
  { slug: 'square-frames-canvas', name: 'Square Frames & Canvas', tagline: 'Square-format framed prints & canvas.', description: 'The same great designs in a square format — glass-front framed prints with your choice of border color, or gallery-wrapped canvas on a wooden frame. Available in 8×8 and 12×12.', gradient: ['#1A3A5C', '#2D5A87'], motif: 'shield', accent: '#5B9BD5', link: '/categories/square-frames-canvas' },
  { slug: 'metal-poster', name: 'Metal Poster', tagline: 'Brushed aluminium prints with vivid color.', description: 'High-contrast prints on brushed aluminium — deep blacks, bright highlights, a modern edge.', gradient: ['#475569', '#1E293B'], motif: 'burst', accent: '#94A3B8', link: '/categories/metal-poster' },
];

export const categories: Category[] = [
  // ---- FRAMES & CANVAS categories ----
  { slug: 'anime', name: 'Anime', code: 'ANI', tagline: 'From the frame to your wall.', description: 'Iconic moments from the series you live for — licensed-style poster art on premium metal, wood and canvas.', gradient: ['#3A1C71', '#D76D77'], motif: 'burst', accent: '#D76D77', format: 'frames-canvas' },
  { slug: 'movies', name: 'Movies', code: 'MOV', tagline: 'Cinema, framed.', description: 'Poster-grade artwork from the films that stayed with you. Cinematic colour, museum-grade print.', gradient: ['#0F2027', '#2C5364'], motif: 'film', accent: '#2C5364', format: 'frames-canvas' },
  { slug: 'sports', name: 'Sports', code: 'SPT', tagline: 'Legends, immortalised.', description: 'The moments that defined the game. Action poses, iconic stances, stadium silhouettes.', gradient: ['#F12711', '#F5AF19'], motif: 'chevron', accent: '#F5AF19', format: 'frames-canvas' },
  { slug: 'home-decor', name: 'Home Decor', code: 'DEC', tagline: 'Walls with warmth.', description: 'Botanicals, abstracts and minimalist line art designed to anchor a room.', gradient: ['#0B486B', '#56AB2F'], motif: 'leaf', accent: '#56AB2F', format: 'frames-canvas' },
  { slug: 'marvel-dc', name: 'Marvel / DC', code: 'MDC', tagline: 'Heroes, assembled.', description: 'Comic-book classics and cinematic key art from the universes you grew up with.', gradient: ['#ED213A', '#932503'], motif: 'shield', accent: '#ED213A', format: 'frames-canvas' },
  { slug: 'custom-prints', name: 'Custom Prints', code: 'CUS', tagline: 'Your wall, your story.', description: 'Upload your photo or artwork — we print it on your chosen material and size.', gradient: ['#12233A', '#2A3F5E'], motif: 'spark', accent: '#C9A24B', format: 'frames-canvas' },
  { slug: 'garage', name: 'Garage', code: 'GAR', tagline: 'STRAIGHT FROM THE GARAGE', description: 'From classic muscle to modern hypercars — automotive art that captures speed, design, and the soul of the machine.', gradient: ['#1A1A2E', '#E94560'], motif: 'chevron', accent: '#E94560', format: 'frames-canvas' },

  // ---- METAL POSTER categories ----
  { slug: 'metal-anime', name: 'Anime', code: 'MAN', tagline: 'From the frame to your wall.', description: 'Iconic anime moments on brushed aluminium — vivid color, deep blacks, a modern edge.', gradient: ['#3A1C71', '#D76D77'], motif: 'burst', accent: '#D76D77', format: 'metal-poster' },
  { slug: 'metal-movies', name: 'Movies', code: 'MVM', tagline: 'Cinema, framed.', description: 'Cinematic artwork on brushed aluminium — poster-grade color with a metallic sheen.', gradient: ['#0F2027', '#2C5364'], motif: 'film', accent: '#2C5364', format: 'metal-poster' },
  { slug: 'metal-custom', name: 'Custom Prints', code: 'MCU', tagline: 'Your wall, your story.', description: 'Upload your photo or artwork — we print it on brushed aluminium in your chosen size.', gradient: ['#12233A', '#2A3F5E'], motif: 'spark', accent: '#C9A24B', format: 'metal-poster' },
  { slug: 'metal-garage', name: 'Garage', code: 'MGR', tagline: 'STRAIGHT FROM THE GARAGE', description: 'Automotive art on brushed aluminium — speed, design, and the soul of the machine, with a metallic edge.', gradient: ['#1A1A2E', '#E94560'], motif: 'chevron', accent: '#E94560', format: 'metal-poster' },

  // ---- SQUARE FRAMES & CANVAS categories ----
  { slug: 'sq-anime', name: 'Anime', code: 'SQA', tagline: 'From the frame to your wall.', description: 'Iconic anime moments in square format — glass-front framed prints or gallery-wrapped canvas.', gradient: ['#3A1C71', '#D76D77'], motif: 'burst', accent: '#D76D77', format: 'square-frames-canvas' },
  { slug: 'sq-movies', name: 'Movies', code: 'SQM', tagline: 'Cinema, framed.', description: 'Cinematic artwork in square format — poster-grade colour, museum-grade print.', gradient: ['#0F2027', '#2C5364'], motif: 'film', accent: '#2C5364', format: 'square-frames-canvas' },
  { slug: 'sq-sports', name: 'Sports', code: 'SQS', tagline: 'Legends, immortalised.', description: 'The moments that defined the game, in square format.', gradient: ['#F12711', '#F5AF19'], motif: 'chevron', accent: '#F5AF19', format: 'square-frames-canvas' },
  { slug: 'sq-home-decor', name: 'Home Decor', code: 'SQD', tagline: 'Walls with warmth.', description: 'Botanicals, abstracts and minimalist line art in square format.', gradient: ['#0B486B', '#56AB2F'], motif: 'leaf', accent: '#56AB2F', format: 'square-frames-canvas' },
  { slug: 'sq-marvel-dc', name: 'Marvel / DC', code: 'SQM', tagline: 'Heroes, assembled.', description: 'Comic-book classics and cinematic key art in square format.', gradient: ['#ED213A', '#932503'], motif: 'shield', accent: '#ED213A', format: 'square-frames-canvas' },
  { slug: 'sq-custom-prints', name: 'Custom Prints', code: 'SQC', tagline: 'Your wall, your story.', description: 'Upload your photo or artwork — we print it in square format on your chosen material and size.', gradient: ['#12233A', '#2A3F5E'], motif: 'spark', accent: '#C9A24B', format: 'square-frames-canvas' },
  { slug: 'sq-garage', name: 'Garage', code: 'SQG', tagline: 'STRAIGHT FROM THE GARAGE', description: 'Automotive art in square format — speed, design, and the soul of the machine.', gradient: ['#1A1A2E', '#E94560'], motif: 'chevron', accent: '#E94560', format: 'square-frames-canvas' },
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
