// ============================================================
//  PIXELATED — METAL PRODUCT INVENTORY
//  The storefront now sells one format only: brushed aluminium
//  metal posters. Product IDs for the existing metal catalog are
//  intentionally frozen so existing Supabase product photos keep
//  working after the old formats are removed.
// ============================================================

import { sizePresets, type ProductSize } from '@/config';

// ============================================================
//  PRODUCT TYPES
// ============================================================

export interface VariantInfo {
  sizes: ProductSize[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  variants: {
    metal?: VariantInfo;
  };
  palette: [string, string, string];
  motif: string;
  photos: string[];
  sizeChartImage: string;
  inStock: boolean;
  tags: string[];
  featured?: boolean;
}

export const featuredCount = 8;

// Frozen IDs from the previous catalog. These MUST NOT be regenerated
// from array position: Supabase product photos use these IDs.
export const featuredProductIds: string[] = [
  'p106', 'p107', 'p108', 'p109',
  'p110', 'p111', 'p112', 'p113',
];

function p(
  category: string,
  name: string,
  description: string,
  palette: [string, string, string],
  motif: string,
  tags: string[],
  inStock = true,
): Omit<Product, 'id' | 'photos' | 'sizeChartImage' | 'featured'> {
  return {
    category,
    name,
    description,
    variants: {
      metal: { sizes: [sizePresets.mt_12x18] },
    },
    palette,
    motif,
    inStock,
    tags,
  };
}

const rawProducts: Omit<Product, 'id' | 'photos' | 'sizeChartImage' | 'featured'>[] = [
  p('metal-anime', 'Crimson Dawn Metal', 'A lone swordsman stands silhouetted against the rising sun, blade drawn. On brushed aluminium, the crimson and gold gain a vivid, reflective intensity that paper can\'t match.', ['#7F1D1D', '#FBBF24', '#1E293B'], 'burst', ['action', 'solo', 'sunrise'], true),
  p('metal-anime', 'Ocean of Stars Metal', 'A girl reaches toward a sky filled with constellations. On metal, the deep ocean blues and starlight yellows gain a luminous, almost electric quality.', ['#0EA5E9', '#1E3A8A', '#FDE68A'], 'burst', ['sky', 'dream', 'blue'], true),
  p('metal-anime', 'Thunder Step Metal', 'Speed rendered as a single explosive stride. On brushed aluminium, the yellow and brown palette evokes lightning striking dry earth — vivid, sharp, unstoppable.', ['#F59E0B', '#7C2D12', '#0F172A'], 'chevron', ['speed', 'yellow'], true),
  p('metal-anime', 'Fox Spirit Metal', 'Nine tails fan out at dusk, glowing amber against a darkening sky. On metal, the orange and brown palette has a warm, fire-like radiance.', ['#F97316', '#7C2D12', '#1C1917'], 'burst', ['spirit', 'orange'], true),
  p('metal-anime', 'Blade of Dawn Metal', 'The cut that split the sky in two. Crimson red and gold on brushed aluminium — the metal gives the blade a real, cold sheen. Dramatic at any size.', ['#DC2626', '#FCD34D', '#111827'], 'burst', ['sword', 'action'], true),
  p('metal-anime', 'Silent Sakura Metal', 'Petals drift over a quiet village at dusk. On brushed aluminium, the colors gain a vivid, reflective intensity that paper can\'t match.', ['#F472B6', '#831843', '#FEF3C7'], 'leaf', ['calm', 'pink', 'village'], true),
  p('metal-anime', 'Iron Resolve Metal', 'The mecha that stood last on the battlefield. On brushed aluminium, the contrast sharpens into something almost electric.', ['#475569', '#0F172A', '#EF4444'], 'shield', ['mecha', 'red', 'robot'], true),
  p('metal-anime', 'Moonlit Vow Metal', 'A promise made under a full moon. On brushed aluminium, the tones take on a cool, metallic sheen.', ['#6366F1', '#1E1B4B', '#E0E7FF'], 'leaf', ['night', 'blue'], true),
  p('metal-anime', 'Ember Eyes Metal', 'The flame that never dies. On brushed aluminium, every highlight gets a crisp, high-contrast edge.', ['#EA580C', '#7F1D1D', '#0C0A09'], 'burst', ['fire', 'demon'], true),
  p('metal-anime', 'Garden of Echoes Metal', 'Memories in full bloom. On brushed aluminium, the palette turns bold and gallery-bright.', ['#10B981', '#064E3B', '#FCE7F3'], 'leaf', ['soft', 'green'], true),
  p('metal-anime', 'Steel Heart Metal', 'The knight who chose love over duty. On brushed aluminium, the detail holds a sharp, modern edge.', ['#94A3B8', '#1E293B', '#F87171'], 'shield', ['knight', 'romance'], true),
  p('metal-anime', 'Phantom Drift Metal', 'A ghost ship sails through clouds rather than water. On brushed aluminium, the color deepens into a rich, reflective finish.', ['#0891B2', '#0E7490', '#E2E8F0'], 'film', ['sea', 'mystery'], true),
  p('metal-anime', 'Crimson Lotus Metal', 'The bloom after the battle. On brushed aluminium, the scene gains a sleek, contemporary polish.', ['#BE123C', '#831843', '#FECDD3'], 'leaf', ['flower', 'red'], true),
  p('metal-anime', 'Skybound Metal', 'The boy who chased horizons. On brushed aluminium, the highlights take on a bright, almost luminous quality.', ['#3B82F6', '#1D4ED8', '#FEF9C3'], 'burst', ['sky', 'adventure'], true),
  p('metal-anime', 'Last Stand Metal', 'The final frame of the war. On brushed aluminium, the whole piece reads sharper, more vivid, more alive.', ['#B91C1C', '#450A0A', '#FBBF24'], 'chevron', ['war', 'epic'], true),
  p('metal-movies', 'Neon Boulevard Metal', 'A rain-soaked night in Los Angeles. On brushed aluminium, the pink neon reflections in puddles gain a vivid, electric quality — noir in its purest visual form.', ['#EC4899', '#1E1B4B', '#FDE047'], 'film', ['noir', 'city', 'rain'], true),
  p('metal-movies', 'Desert Mirage Metal', 'A sci-fi epic across the dunes. On metal, the amber and brown palette gains a harsh, sun-bleached intensity — the vast landscape made visceral.', ['#D97706', '#78350F', '#FEF3C7'], 'chevron', ['sci-fi', 'desert'], true),
  p('metal-movies', 'Starfall Metal', 'A war among the stars. On brushed aluminium, the indigo and violet with warm yellow starlight gain a deep, luminous contrast — space as a battlefield.', ['#6366F1', '#312E81', '#FDE68A'], 'burst', ['space', 'epic'], true),
  p('metal-movies', 'Concrete Jungle Metal', 'The city as a character. On metal, the slate grey with amber light gains a sharp, photographic quality — every window a story, every edge precise.', ['#475569', '#1E293B', '#F59E0B'], 'film', ['urban', 'grit'], true),
  p('metal-movies', 'Crimson Dynasty Metal', 'An empire of blood and silk. On brushed aluminium, the deep red with gold accents on a near-black base becomes opulent, dangerous, royal.', ['#B91C1C', '#450A0A', '#FCD34D'], 'shield', ['epic', 'royal'], true),
  p('metal-movies', 'Midnight Express Metal', 'The train that never stops. On brushed aluminium, the colors gain a vivid, reflective intensity that paper can\'t match.', ['#1E40AF', '#0C4A6E', '#E0E7FF'], 'film', ['thriller', 'train'], true),
  p('metal-movies', 'Golden Hour Heist Metal', 'The last job at sunset. On brushed aluminium, the contrast sharpens into something almost electric.', ['#F59E0B', '#7C2D12', '#111827'], 'film', ['crime', 'sunset'], true),
  p('metal-movies', 'Frozen Outpost Metal', 'Survival at forty below. On brushed aluminium, the tones take on a cool, metallic sheen.', ['#0EA5E9', '#0C4A6E', '#E0F2FE'], 'shield', ['survival', 'ice'], true),
  p('metal-movies', 'The Quiet Lake Metal', 'A horror in still water. On brushed aluminium, every highlight gets a crisp, high-contrast edge.', ['#0F766E', '#134E4A', '#A7F3D0'], 'film', ['horror', 'lake'], true),
  p('metal-movies', 'Velvet Heist Metal', 'A smooth crime in a smooth city. On brushed aluminium, the palette turns bold and gallery-bright.', ['#7E22CE', '#3B0764', '#FBCFE8'], 'film', ['style', 'purple'], true),
  p('metal-movies', 'Wasteland Riders Metal', 'The road warriors return. On brushed aluminium, the detail holds a sharp, modern edge.', ['#B45309', '#451A03', '#FDE68A'], 'chevron', ['post-apoc', 'cars'], true),
  p('metal-movies', 'The Last Letter Metal', 'A romance told in postage. On brushed aluminium, the color deepens into a rich, reflective finish.', ['#DC2626', '#7F1D1D', '#FEF3C7'], 'leaf', ['romance', 'soft'], true),
  p('metal-movies', 'Deep Blue Metal', 'The abyss looks back. On brushed aluminium, the scene gains a sleek, contemporary polish.', ['#0EA5E9', '#0C4A6E', '#BAE6FD'], 'film', ['deep-sea', 'thriller'], true),
  p('metal-movies', 'Paper Moon Metal', 'A black-and-white kind of night. On brushed aluminium, the highlights take on a bright, almost luminous quality.', ['#6B7280', '#1F2937', '#F9FAFB'], 'film', ['classic', 'mono'], true),
  p('metal-movies', 'Empire of Sand Metal', 'The kingdom the desert swallowed. On brushed aluminium, the whole piece reads sharper, more vivid, more alive.', ['#D97706', '#92400E', '#FEF3C7'], 'shield', ['epic', 'desert'], true),
  p('metal-custom', 'Your Photo, Metal', 'Upload your photo and we print it on brushed aluminium. The metal gives photos a sharp, vivid quality with deep blacks and bright highlights. Perfect for high-contrast images and modern interiors.', ['#475569', '#1E293B', '#E2E8F0'], 'spark', ['photo', 'metal'], true),
  p('metal-custom', 'Your Logo, Metal', 'Your brand, metal-grade. Send us your logo and we will print it on brushed aluminium. The metal gives logos a sharp, premium quality that paper can\'t match. Perfect for offices and storefronts.', ['#A07E2F', '#7A5E22', '#1E1B4B'], 'shield', ['brand', 'logo'], true),
  p('metal-custom', 'Your Art, Metal', 'Upload your own artwork or illustration and we print it on brushed aluminium. The metal gives digital art a vivid, gallery-quality finish with deep contrast and bright highlights.', ['#0EA5E9', '#0C4A6E', '#E0F2FE'], 'spark', ['art', 'metal'], true),
  p('metal-custom', 'Pet Portrait (Metal)', 'Your companion, immortalised. On brushed aluminium, the detail holds a sharp, modern edge.', ['#F472B6', '#831843', '#FEF3C7'], 'leaf', ['pet', 'portrait'], true),
  p('metal-custom', 'Family Frame (Metal)', 'Generations on one wall. On brushed aluminium, the color deepens into a rich, reflective finish.', ['#F59E0B', '#7C2D12', '#FEF3C7'], 'leaf', ['family', 'portrait'], true),
  p('metal-custom', 'Wedding Vow (Metal)', 'Your words, our typography. On brushed aluminium, the scene gains a sleek, contemporary polish.', ['#BE123C', '#831843', '#FCE7F3'], 'leaf', ['wedding', 'text'], true),
  p('metal-custom', 'City Skyline (Metal)', 'Your city, our line art. On brushed aluminium, the highlights take on a bright, almost luminous quality.', ['#1E293B', '#0F172A', '#FBBF24'], 'chevron', ['city', 'line'], true),
  p('metal-custom', 'Kids\' Doodle (Metal)', 'Your child\'s art, gallery-grade. On brushed aluminium, the whole piece reads sharper, more vivid, more alive.', ['#EC4899', '#831843', '#FDE68A'], 'burst', ['kids', 'fun'], true),
  p('metal-custom', 'Quote Wall (Metal)', 'A sentence that stays with you. On brushed aluminium, the colors gain a vivid, reflective intensity that paper can\'t match.', ['#1E1B4B', '#0F172A', '#FDE68A'], 'spark', ['quote', 'text'], true),
  p('metal-custom', 'Map of Memory (Metal)', 'A place that means everything. On brushed aluminium, the contrast sharpens into something almost electric.', ['#0EA5E9', '#0C4A6E', '#FEF3C7'], 'leaf', ['map', 'place'], true),
  p('metal-custom', 'Logo Plate (Metal)', 'Your brand, metal-grade. On brushed aluminium, the tones take on a cool, metallic sheen.', ['#A07E2F', '#7A5E22', '#1E1B4B'], 'shield', ['brand', 'logo'], true),
  p('metal-custom', 'Song Lyric (Metal)', 'The line you can\'t stop singing. On brushed aluminium, every highlight gets a crisp, high-contrast edge.', ['#7E22CE', '#3B0764', '#FBCFE8'], 'spark', ['music', 'text'], true),
  p('metal-custom', 'Anniversary Date (Metal)', 'A number that changed everything. On brushed aluminium, the palette turns bold and gallery-bright.', ['#DC2626', '#7F1D1D', '#FECDD3'], 'spark', ['date', 'love'], true),
  p('metal-custom', 'Recipe Plate (Metal)', 'Grandma\'s recipe, preserved. On brushed aluminium, the detail holds a sharp, modern edge.', ['#16A34A', '#14532D', '#FEF3C7'], 'leaf', ['food', 'text'], true),
  p('metal-custom', 'Constellation Map (Metal)', 'The sky the night you were born. On brushed aluminium, the color deepens into a rich, reflective finish.', ['#1E1B4B', '#0F172A', '#FDE68A'], 'burst', ['stars', 'night'], true),
  p('metal-garage', 'Midnight Muscle Metal', 'A V8 under moonlight. On brushed aluminium, the deep red and charcoal with chrome highlights gain a real, reflective edge — the classic American muscle car in vivid metal.', ['#B91C1C', '#450A0A', '#475569'], 'chevron', ['muscle', 'classic', 'night'], true),
  p('metal-garage', 'Neon Drift Metal', 'A JDM legend slicing through neon-lit rain. On metal, the cyan and magenta with a dark urban backdrop gain an electric, vivid intensity — Tokyo midnight, frozen in aluminium.', ['#0EA5E9', '#6D28D9', '#0F172A'], 'burst', ['jdm', 'neon', 'night'], true),
  p('metal-garage', 'Hypercar Dawn Metal', 'The first light on carbon fibre. On brushed aluminium, the blue and silver with a warm golden horizon gain a precise, technical brilliance — the hypercar in its element.', ['#1E40AF', '#475569', '#FCD34D'], 'shield', ['hypercar', 'blue', 'dawn'], true),
  p('metal-garage', 'Circuit Breaker Metal', 'The apex, the kerb, the perfect line. On metal, the red and white with a dark asphalt base gain a sharp, high-contrast intensity — track geometry in vivid aluminium.', ['#DC2626', '#1E293B', '#F8FAFC'], 'chevron', ['track', 'red', 'speed'], true),
  p('metal-garage', 'Speed Demon Metal', 'A top-speed run on the salt flats. On brushed aluminium, the white and grey with a blinding blue sky gain a stark, crystalline quality — speed rendered in metal.', ['#94A3B8', '#1E293B', '#0EA5E9'], 'chevron', ['speed', 'white', 'salt'], true),
  p('metal-garage', 'Desert Rally Metal', 'Dust, gravel, and pure horsepower. On brushed aluminium, the detail holds a sharp, modern edge.', ['#F59E0B', '#92400E', '#FEF3C7'], 'chevron', ['rally', 'desert', 'orange'], true),
  p('metal-garage', 'Garage Days Metal', 'A workshop, a wrench, a dream. On brushed aluminium, the color deepens into a rich, reflective finish.', ['#92400E', '#451A03', '#FEF3C7'], 'film', ['garage', 'warm', 'classic'], true),
  p('metal-garage', 'Lowrider Sunset Metal', 'Chrome and candy paint at golden hour. On brushed aluminium, the scene gains a sleek, contemporary polish.', ['#7C3AED', '#4C1D95', '#FBBF24'], 'burst', ['lowrider', 'purple', 'sunset'], true),
  p('metal-garage', 'Electric Silence Metal', 'The future moves without a sound. On brushed aluminium, the highlights take on a bright, almost luminous quality.', ['#0EA5E9', '#E0F2FE', '#94A3B8'], 'shield', ['ev', 'blue', 'future'], true),
  p('metal-garage', 'Classic Coupe Metal', 'Timeless lines, timeless curves. On brushed aluminium, the whole piece reads sharper, more vivid, more alive.', ['#166534', '#14532D', '#FCD34D'], 'film', ['classic', 'green', 'vintage'], true),
  p('metal-garage', 'Pit Stop Metal', 'Four seconds, four tyres. On brushed aluminium, the colors gain a vivid, reflective intensity that paper can\'t match.', ['#F59E0B', '#0F172A', '#DC2626'], 'burst', ['f1', 'amber', 'precision'], true),
  p('metal-garage', 'Road Trip Metal', 'The highway that goes forever. On brushed aluminium, the contrast sharpens into something almost electric.', ['#1E40AF', '#F59E0B', '#FBCFE8'], 'film', ['road', 'blue', 'sunset'], true),
  p('metal-garage', 'Street Racer Metal', 'Two lanes, one winner. On brushed aluminium, the tones take on a cool, metallic sheen.', ['#DC2626', '#1E40AF', '#0F172A'], 'chevron', ['street', 'red', 'night'], true),
  p('metal-garage', 'Convertible Coast Metal', 'Top down, ocean side. On brushed aluminium, every highlight gets a crisp, high-contrast edge.', ['#0D9488', '#134E4A', '#FEF3C7'], 'leaf', ['convertible', 'teal', 'coast'], true),
  p('metal-garage', 'Truck Legend Metal', 'Built tough, built to last. On brushed aluminium, the palette turns bold and gallery-bright.', ['#92400E', '#166534', '#F59E0B'], 'shield', ['truck', 'brown', 'rugged'], true),
  p('metal-sports', 'The Bicycle Kick Metal', 'Defying gravity, defining the game. On brushed aluminium, the colors gain a vivid, reflective intensity that paper can\'t match.', ['#F59E0B', '#7C2D12', '#0F172A'], 'chevron', ['football', 'iconic'], true),
  p('metal-sports', 'Last Second Shot Metal', 'The buzzer-beater that echoed. On brushed aluminium, the contrast sharpens into something almost electric.', ['#DC2626', '#7F1D1D', '#FBBF24'], 'burst', ['basketball', 'clutch'], true),
  p('metal-sports', 'The Cover Drive Metal', 'Elegance in willow and leather. On brushed aluminium, the tones take on a cool, metallic sheen.', ['#0EA5E9', '#0C4A6E', '#FDE68A'], 'chevron', ['cricket', 'classic'], true),
  p('metal-sports', 'Knockout Punch Metal', 'The fist that changed history. On brushed aluminium, every highlight gets a crisp, high-contrast edge.', ['#B91C1C', '#450A0A', '#FCD34D'], 'burst', ['boxing', 'power'], true),
  p('metal-sports', 'The Long Drive Metal', 'Fairway to glory. On brushed aluminium, the palette turns bold and gallery-bright.', ['#10B981', '#064E3B', '#FEF3C7'], 'leaf', ['golf', 'green'], true),
  p('metal-sports', 'Sprint Finish Metal', 'The line that decided gold. On brushed aluminium, the detail holds a sharp, modern edge.', ['#F59E0B', '#92400E', '#0F172A'], 'chevron', ['athletics', 'speed'], true),
  p('metal-sports', 'The Slam Dunk Metal', 'Above the rim, above the rest. On brushed aluminium, the color deepens into a rich, reflective finish.', ['#7C3AED', '#4C1D95', '#FDE047'], 'burst', ['basketball', 'power'], true),
  p('metal-sports', 'Goalkeeper\'s Dive Metal', 'The save that stopped time. On brushed aluminium, the scene gains a sleek, contemporary polish.', ['#0EA5E9', '#0C4A6E', '#FBBF24'], 'shield', ['football', 'defense'], true),
  p('metal-sports', 'The Serve Metal', 'An ace under the sun. On brushed aluminium, the highlights take on a bright, almost luminous quality.', ['#F97316', '#7C2D12', '#FEF3C7'], 'burst', ['tennis', 'precision'], true),
  p('metal-sports', 'Corner Flag Metal', 'The celebration that shook the stadium. On brushed aluminium, the whole piece reads sharper, more vivid, more alive.', ['#16A34A', '#14532D', '#FBBF24'], 'chevron', ['football', 'joy'], true),
  p('metal-sports', 'The Knockout Combo Metal', 'Two hits, one ending. On brushed aluminium, the colors gain a vivid, reflective intensity that paper can\'t match.', ['#DC2626', '#7F1D1D', '#0F172A'], 'burst', ['boxing', 'combo'], true),
  p('metal-sports', 'Wicket Celebration Metal', 'The roar after the wicket. On brushed aluminium, the contrast sharpens into something almost electric.', ['#0D9488', '#134E4A', '#FDE68A'], 'chevron', ['cricket', 'fire'], true),
  p('metal-sports', 'The Header Metal', 'Airborne, unstoppable. On brushed aluminium, the tones take on a cool, metallic sheen.', ['#1D4ED8', '#1E3A8A', '#FDE047'], 'burst', ['football', 'air'], true),
  p('metal-sports', 'Final Lap Metal', 'The last curve before glory. On brushed aluminium, every highlight gets a crisp, high-contrast edge.', ['#EA580C', '#7C2D12', '#0F172A'], 'chevron', ['racing', 'final'], true),
  p('metal-sports', 'The Free Kick Metal', 'Bending it beyond reach. On brushed aluminium, the palette turns bold and gallery-bright.', ['#0EA5E9', '#0C4A6E', '#FDE68A'], 'burst', ['football', 'curve'], true),
  p('metal-home-decor', 'Monstera Morning Metal', 'Light through living leaves. On brushed aluminium, the detail holds a sharp, modern edge.', ['#10B981', '#064E3B', '#FEF3C7'], 'leaf', ['botanical', 'green'], true),
  p('metal-home-decor', 'Desert Lines Metal', 'Minimalist dunes at dusk. On brushed aluminium, the color deepens into a rich, reflective finish.', ['#D97706', '#92400E', '#FEF3C7'], 'chevron', ['abstract', 'warm'], true),
  p('metal-home-decor', 'Ocean Calm Metal', 'A still sea, a still mind. On brushed aluminium, the scene gains a sleek, contemporary polish.', ['#0EA5E9', '#0C4A6E', '#E0F2FE'], 'leaf', ['calm', 'blue'], true),
  p('metal-home-decor', 'Terrazzo Dream Metal', 'A modern speckled composition. On brushed aluminium, the highlights take on a bright, almost luminous quality.', ['#EC4899', '#831843', '#FDE68A'], 'burst', ['abstract', 'pink'], true),
  p('metal-home-decor', 'Line Face Metal', 'One-line portrait, endless feeling. On brushed aluminium, the whole piece reads sharper, more vivid, more alive.', ['#1E293B', '#0F172A', '#F8FAFC'], 'leaf', ['line-art', 'mono'], true),
  p('metal-home-decor', 'Sunset Arch Metal', 'Architecture in golden hour. On brushed aluminium, the colors gain a vivid, reflective intensity that paper can\'t match.', ['#F59E0B', '#7C2D12', '#FEF3C7'], 'chevron', ['arch', 'warm'], true),
  p('metal-home-decor', 'Bloom No. 7 Metal', 'A single flower, fully seen. On brushed aluminium, the contrast sharpens into something almost electric.', ['#BE185D', '#831843', '#FCE7F3'], 'leaf', ['floral', 'pink'], true),
  p('metal-home-decor', 'Mist over Pines Metal', 'A forest waking up. On brushed aluminium, the tones take on a cool, metallic sheen.', ['#0D9488', '#134E4A', '#F0FDFA'], 'leaf', ['forest', 'teal'], true),
  p('metal-home-decor', 'Brass Geometry Metal', 'Warm metallic shapes on dark. On brushed aluminium, every highlight gets a crisp, high-contrast edge.', ['#A07E2F', '#7A5E22', '#1E1B4B'], 'burst', ['geometric', 'brass'], true),
  p('metal-home-decor', 'Wave Study Metal', 'A Hokusai-inspired modern swell. On brushed aluminium, the palette turns bold and gallery-bright.', ['#0EA5E9', '#0C4A6E', '#FDE68A'], 'leaf', ['wave', 'blue'], true),
  p('metal-home-decor', 'Coffee & Sun Metal', 'A slow morning, framed. On brushed aluminium, the detail holds a sharp, modern edge.', ['#92400E', '#451A03', '#FEF3C7'], 'leaf', ['cozy', 'brown'], true),
  p('metal-home-decor', 'Marble Vein Metal', 'Luxury in a single swirl. On brushed aluminium, the color deepens into a rich, reflective finish.', ['#94A3B8', '#475569', '#F8FAFC'], 'leaf', ['luxury', 'stone'], true),
  p('metal-home-decor', 'Citrus Pop Metal', 'A bright kitchen accent. On brushed aluminium, the scene gains a sleek, contemporary polish.', ['#F97316', '#7C2D12', '#FEF3C7'], 'burst', ['kitchen', 'orange'], true),
  p('metal-home-decor', 'Mountain Range Metal', 'A minimalist horizon line. On brushed aluminium, the highlights take on a bright, almost luminous quality.', ['#475569', '#1E293B', '#FDE68A'], 'chevron', ['landscape', 'mono'], true),
  p('metal-home-decor', 'Golden Hour Metal', 'The last light, the best light. On brushed aluminium, the whole piece reads sharper, more vivid, more alive.', ['#F59E0B', '#B45309', '#FECDD3'], 'burst', ['sky', 'warm'], true),
  p('metal-marvel-dc', 'Web Slinger Metal', 'The hero in the half-light. On brushed aluminium, the colors gain a vivid, reflective intensity that paper can\'t match.', ['#DC2626', '#7F1D1D', '#1E3A8A'], 'burst', ['hero', 'red'], true),
  p('metal-marvel-dc', 'Thunder God Metal', 'A hammer raised to the storm. On brushed aluminium, the contrast sharpens into something almost electric.', ['#3B82F6', '#1E3A8A', '#FDE68A'], 'burst', ['hero', 'thunder'], true),
  p('metal-marvel-dc', 'Iron Resolve Metal', 'A suit built for sacrifice. On brushed aluminium, the tones take on a cool, metallic sheen.', ['#EA580C', '#7C2D12', '#FCD34D'], 'shield', ['hero', 'gold'], true),
  p('metal-marvel-dc', 'Night Knight Metal', 'The dark defender rises. On brushed aluminium, every highlight gets a crisp, high-contrast edge.', ['#1E293B', '#0F172A', '#FBBF24'], 'shield', ['hero', 'dark'], true),
  p('metal-marvel-dc', 'Shield Throw Metal', 'The spin that won the war. On brushed aluminium, the palette turns bold and gallery-bright.', ['#1D4ED8', '#1E3A8A', '#DC2626'], 'shield', ['hero', 'shield'], true),
  p('metal-marvel-dc', 'Green Rage Metal', 'A smash heard round the world. On brushed aluminium, the detail holds a sharp, modern edge.', ['#16A34A', '#14532D', '#FDE68A'], 'burst', ['hero', 'green'], true),
  p('metal-marvel-dc', 'Speed Force Metal', 'The lightning in his veins. On brushed aluminium, the color deepens into a rich, reflective finish.', ['#F59E0B', '#92400E', '#1E3A8A'], 'burst', ['hero', 'speed'], true),
  p('metal-marvel-dc', 'Cape in Wind Metal', 'The man who chose hope. On brushed aluminium, the scene gains a sleek, contemporary polish.', ['#1D4ED8', '#1E3A8A', '#FDE68A'], 'burst', ['hero', 'hope'], true),
  p('metal-marvel-dc', 'Lasso of Truth Metal', 'The warrior princess. On brushed aluminium, the highlights take on a bright, almost luminous quality.', ['#A855F7', '#581C87', '#FBCFE8'], 'burst', ['hero', 'purple'], true),
  p('metal-marvel-dc', 'Trident Rise Metal', 'The king of the seas. On brushed aluminium, the whole piece reads sharper, more vivid, more alive.', ['#0EA5E9', '#0C4A6E', '#FDE68A'], 'shield', ['hero', 'sea'], true),
  p('metal-marvel-dc', 'Claws Out Metal', 'The mutant who walks alone. On brushed aluminium, the colors gain a vivid, reflective intensity that paper can\'t match.', ['#FDE047', '#A16207', '#1E293B'], 'burst', ['hero', 'yellow'], true),
  p('metal-marvel-dc', 'Cosmic Surf Metal', 'Riding the edge of space. On brushed aluminium, the contrast sharpens into something almost electric.', ['#6366F1', '#312E81', '#FDE68A'], 'burst', ['hero', 'cosmic'], true),
  p('metal-marvel-dc', 'Bat Signal Metal', 'A call answered in the dark. On brushed aluminium, the tones take on a cool, metallic sheen.', ['#1E1B4B', '#0F172A', '#FBBF24'], 'shield', ['hero', 'night'], true),
  p('metal-marvel-dc', 'Thunder Strike Metal', 'A storm named after a god. On brushed aluminium, every highlight gets a crisp, high-contrast edge.', ['#3B82F6', '#1E3A8A', '#FCD34D'], 'burst', ['hero', 'storm'], true),
  p('metal-marvel-dc', 'The Assemble Metal', 'Six heroes, one frame. On brushed aluminium, the palette turns bold and gallery-bright.', ['#DC2626', '#1D4ED8', '#FDE68A'], 'shield', ['team', 'epic'], true),
];

// Permanent product IDs. The original 18 metal products keep their existing
// IDs from the original photo checklist (p106-p123). The remaining 87
// products introduced in the metal-only catalog use new IDs p159-p245.
// IDs are keyed by category + product name so array reordering cannot
// silently change the Supabase photo filenames.
const stableMetalIds: Record<string, string> = {
  "metal-anime::Crimson Dawn Metal": "p106",
  "metal-anime::Ocean of Stars Metal": "p107",
  "metal-anime::Thunder Step Metal": "p108",
  "metal-anime::Fox Spirit Metal": "p109",
  "metal-anime::Blade of Dawn Metal": "p110",
  "metal-anime::Silent Sakura Metal": "p159",
  "metal-anime::Iron Resolve Metal": "p160",
  "metal-anime::Moonlit Vow Metal": "p161",
  "metal-anime::Ember Eyes Metal": "p162",
  "metal-anime::Garden of Echoes Metal": "p163",
  "metal-anime::Steel Heart Metal": "p164",
  "metal-anime::Phantom Drift Metal": "p165",
  "metal-anime::Crimson Lotus Metal": "p166",
  "metal-anime::Skybound Metal": "p167",
  "metal-anime::Last Stand Metal": "p168",
  "metal-movies::Neon Boulevard Metal": "p111",
  "metal-movies::Desert Mirage Metal": "p112",
  "metal-movies::Starfall Metal": "p113",
  "metal-movies::Concrete Jungle Metal": "p114",
  "metal-movies::Crimson Dynasty Metal": "p115",
  "metal-movies::Midnight Express Metal": "p169",
  "metal-movies::Golden Hour Heist Metal": "p170",
  "metal-movies::Frozen Outpost Metal": "p171",
  "metal-movies::The Quiet Lake Metal": "p172",
  "metal-movies::Velvet Heist Metal": "p173",
  "metal-movies::Wasteland Riders Metal": "p174",
  "metal-movies::The Last Letter Metal": "p175",
  "metal-movies::Deep Blue Metal": "p176",
  "metal-movies::Paper Moon Metal": "p177",
  "metal-movies::Empire of Sand Metal": "p178",
  "metal-custom::Your Photo, Metal": "p116",
  "metal-custom::Your Logo, Metal": "p117",
  "metal-custom::Your Art, Metal": "p118",
  "metal-custom::Pet Portrait (Metal)": "p179",
  "metal-custom::Family Frame (Metal)": "p180",
  "metal-custom::Wedding Vow (Metal)": "p181",
  "metal-custom::City Skyline (Metal)": "p182",
  "metal-custom::Kids' Doodle (Metal)": "p183",
  "metal-custom::Quote Wall (Metal)": "p184",
  "metal-custom::Map of Memory (Metal)": "p185",
  "metal-custom::Logo Plate (Metal)": "p186",
  "metal-custom::Song Lyric (Metal)": "p187",
  "metal-custom::Anniversary Date (Metal)": "p188",
  "metal-custom::Recipe Plate (Metal)": "p189",
  "metal-custom::Constellation Map (Metal)": "p190",
  "metal-garage::Midnight Muscle Metal": "p119",
  "metal-garage::Neon Drift Metal": "p120",
  "metal-garage::Hypercar Dawn Metal": "p121",
  "metal-garage::Circuit Breaker Metal": "p122",
  "metal-garage::Speed Demon Metal": "p123",
  "metal-garage::Desert Rally Metal": "p191",
  "metal-garage::Garage Days Metal": "p192",
  "metal-garage::Lowrider Sunset Metal": "p193",
  "metal-garage::Electric Silence Metal": "p194",
  "metal-garage::Classic Coupe Metal": "p195",
  "metal-garage::Pit Stop Metal": "p196",
  "metal-garage::Road Trip Metal": "p197",
  "metal-garage::Street Racer Metal": "p198",
  "metal-garage::Convertible Coast Metal": "p199",
  "metal-garage::Truck Legend Metal": "p200",
  "metal-sports::The Bicycle Kick Metal": "p201",
  "metal-sports::Last Second Shot Metal": "p202",
  "metal-sports::The Cover Drive Metal": "p203",
  "metal-sports::Knockout Punch Metal": "p204",
  "metal-sports::The Long Drive Metal": "p205",
  "metal-sports::Sprint Finish Metal": "p206",
  "metal-sports::The Slam Dunk Metal": "p207",
  "metal-sports::Goalkeeper's Dive Metal": "p208",
  "metal-sports::The Serve Metal": "p209",
  "metal-sports::Corner Flag Metal": "p210",
  "metal-sports::The Knockout Combo Metal": "p211",
  "metal-sports::Wicket Celebration Metal": "p212",
  "metal-sports::The Header Metal": "p213",
  "metal-sports::Final Lap Metal": "p214",
  "metal-sports::The Free Kick Metal": "p215",
  "metal-home-decor::Monstera Morning Metal": "p216",
  "metal-home-decor::Desert Lines Metal": "p217",
  "metal-home-decor::Ocean Calm Metal": "p218",
  "metal-home-decor::Terrazzo Dream Metal": "p219",
  "metal-home-decor::Line Face Metal": "p220",
  "metal-home-decor::Sunset Arch Metal": "p221",
  "metal-home-decor::Bloom No. 7 Metal": "p222",
  "metal-home-decor::Mist over Pines Metal": "p223",
  "metal-home-decor::Brass Geometry Metal": "p224",
  "metal-home-decor::Wave Study Metal": "p225",
  "metal-home-decor::Coffee & Sun Metal": "p226",
  "metal-home-decor::Marble Vein Metal": "p227",
  "metal-home-decor::Citrus Pop Metal": "p228",
  "metal-home-decor::Mountain Range Metal": "p229",
  "metal-home-decor::Golden Hour Metal": "p230",
  "metal-marvel-dc::Web Slinger Metal": "p231",
  "metal-marvel-dc::Thunder God Metal": "p232",
  "metal-marvel-dc::Iron Resolve Metal": "p233",
  "metal-marvel-dc::Night Knight Metal": "p234",
  "metal-marvel-dc::Shield Throw Metal": "p235",
  "metal-marvel-dc::Green Rage Metal": "p236",
  "metal-marvel-dc::Speed Force Metal": "p237",
  "metal-marvel-dc::Cape in Wind Metal": "p238",
  "metal-marvel-dc::Lasso of Truth Metal": "p239",
  "metal-marvel-dc::Trident Rise Metal": "p240",
  "metal-marvel-dc::Claws Out Metal": "p241",
  "metal-marvel-dc::Cosmic Surf Metal": "p242",
  "metal-marvel-dc::Bat Signal Metal": "p243",
  "metal-marvel-dc::Thunder Strike Metal": "p244",
  "metal-marvel-dc::The Assemble Metal": "p245"
};

export const products: Product[] = rawProducts.map((rp, i) => {
  const key = `${rp.category}::${rp.name}`;
  const id = stableMetalIds[key];
  if (!id) throw new Error(`Missing permanent product ID for ${key}`);
  return {
    ...rp,
    id,
    photos: [id, `${id}-2`, `${id}-3`, `${id}-4`],
    sizeChartImage: '/size-charts/metal.png',
    featured: featuredProductIds.includes(id),
  };
});

// ============================================================
//  HELPERS
// ============================================================

export function productsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug && p.inStock);
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function productIndex(product: Product): number {
  return productsByCategory(product.category).findIndex((p) => p.id === product.id) + 1;
}

export type VariantType = 'metal';

export function availableVariants(product: Product): VariantType[] {
  return product.variants.metal ? ['metal'] : [];
}

export function productCode(product: Product, variant: VariantType, sizeId: string): string {
  return `${product.id.toUpperCase()}-${sizeId.toUpperCase()}-M`;
}

export function priceFor(product: Product, variant: VariantType, sizeId: string): number {
  const size = product.variants.metal?.sizes.find((s) => s.id === sizeId);
  return size?.price ?? 0;
}

export function startingPrice(product: Product): number {
  return product.variants.metal?.sizes.length
    ? Math.min(...product.variants.metal.sizes.map((s) => s.price))
    : 0;
}

export function getFeaturedProducts(): Product[] {
  const named = featuredProductIds
    .map((id) => products.find((p) => p.id === id && p.inStock))
    .filter((p): p is Product => Boolean(p))
    .slice(0, featuredCount);

  if (named.length >= featuredCount) return named;

  const usedIds = new Set(named.map((p) => p.id));
  const fillers = products.filter((p) => p.inStock && !usedIds.has(p.id));
  return [...named, ...fillers.slice(0, featuredCount - named.length)];
}
