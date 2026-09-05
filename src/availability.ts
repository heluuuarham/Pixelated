// ============================================================
//  AVAILABILITY CONTROL — ONE PLACE TO TOGGLE EVERYTHING
//
//  Change any value from `true` to `false` and that branch
//  becomes "Not Available" across the whole storefront.
//  Unavailable items STAY VISIBLE with a gray overlay —
//  they never disappear.
//
//  Hierarchy (top to bottom):
//    1. FORMAT   — turn off an entire format (Rectangle F&C, Square F&C, Metal)
//    2. CATEGORY — turn off one category within a format (e.g. Anime under Metal)
//    3. VARIANT  — turn off one variant for a category (e.g. Canvas for Movies)
//    4. PRODUCT  — turn off a single product (in products.ts, inStock field)
// ============================================================

// --- FORMAT-LEVEL TOGGLES ---
export const formatAvailability: Record<string, boolean> = {
  'frames-canvas': true,
  'square-frames-canvas': true,
  'metal-poster': true,
};

// --- CATEGORY-LEVEL TOGGLES ---
export const categoryAvailability: Record<string, boolean> = {
  // Rectangle Frames & Canvas
  'anime': true,
  'movies': true,
  'sports': true,
  'home-decor': true,
  'marvel-dc': true,
  'custom-prints': true,
  'garage': true,

  // Square Frames & Canvas
  'sq-anime': true,
  'sq-movies': true,
  'sq-sports': true,
  'sq-home-decor': true,
  'sq-marvel-dc': true,
  'sq-custom-prints': true,
  'sq-garage': true,

  // Metal Poster
  'metal-anime': true,
  'metal-movies': true,
  'metal-custom': true,
  'metal-garage': true,
};

// --- VARIANT-LEVEL TOGGLES (per category) ---
// Key = category slug, value = map of variant type → available.
// If a variant is not listed here, it defaults to available.
//
// Example: to turn off Canvas for the Movies category in Rectangle F&C:
//   'movies': { canvas: false },
export const variantAvailability: Record<string, Partial<Record<string, boolean>>> = {
  // Rectangle Frames & Canvas
  'anime': {},
  'movies': {},
  'sports': {},
  'home-decor': {},
  'marvel-dc': {},
  'custom-prints': {},
  'garage': {},

  // Square Frames & Canvas
  'sq-anime': {},
  'sq-movies': {},
  'sq-sports': {},
  'sq-home-decor': {},
  'sq-marvel-dc': {},
  'sq-custom-prints': {},
  'sq-garage': {},

  // Metal Poster
  'metal-anime': {},
  'metal-movies': {},
  'metal-custom': {},
  'metal-garage': {},
};

// ============================================================
//  HELPER FUNCTIONS — used by components, no need to edit
// ============================================================

import { categories, formatCategories, type Category, type FormatCategory } from '@/config';
import { type Product, type VariantType } from '@/products';

export function isFormatAvailable(formatSlug: string): boolean {
  return formatAvailability[formatSlug] ?? true;
}

export function isCategoryAvailable(categorySlug: string): boolean {
  const cat = categories.find((c) => c.slug === categorySlug);
  if (!cat) return false;
  if (cat.format && !isFormatAvailable(cat.format)) return false;
  return categoryAvailability[categorySlug] ?? true;
}

export function isVariantAvailable(categorySlug: string, variant: VariantType): boolean {
  if (!isCategoryAvailable(categorySlug)) return false;
  const map = variantAvailability[categorySlug];
  if (!map) return true;
  return map[variant] ?? true;
}

export function isProductAvailable(product: Product): boolean {
  if (!product.inStock) return false;
  return isCategoryAvailable(product.category);
}

export function purchasableVariants(product: Product): VariantType[] {
  const all: VariantType[] = [];
  if (product.variants.framed) all.push('framed');
  if (product.variants.canvas) all.push('canvas');
  if (product.variants.metal) all.push('metal');
  return all.filter((v) => isVariantAvailable(product.category, v));
}

export function allFormatCategories(): FormatCategory[] {
  return formatCategories;
}

export function allCategories(formatSlug?: string): Category[] {
  return formatSlug
    ? categories.filter((c) => c.format === formatSlug)
    : categories;
}
