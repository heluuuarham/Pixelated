// ============================================================
//  PIXELATED — PRODUCT INVENTORY
//  This is the ONLY file you need to edit to manage inventory.
//  No touching component code to add/edit/remove items.
//
//  TO ADD A PRODUCT:
//    1. Pick a category slug from config.ts (anime, movies, sports, etc.)
//    2. Add an entry to the `products` array below using the shape shown
//    3. Set inStock to true to show it, false to hide it (data is kept)
//
//  TO EDIT A PRODUCT:  change its entry in the `products` array
//  TO REMOVE A PRODUCT: set inStock to false (keeps data for later) or delete the entry
// ============================================================

import { sizePresets, standardBorderColors, type BorderColor, type ProductSize } from '@/config';

// ============================================================
//  PRODUCT TYPE — the shape every product entry must match
//
//  Each product offers BOTH variants:
//    - "framed": glass front + wooden frame, customer picks a border color
//    - "canvas": gallery-wrapped canvas on a wooden frame, no border color
//
//  Each variant has its OWN size list and per-size pricing.
//  Don't assume every variant offers every size.
// ============================================================

export interface VariantInfo {
  sizes: ProductSize[];               // per-variant size list with per-size pricing
  borderColors?: BorderColor[];       // ONLY for "framed" — available border colors
                                       //   If omitted, uses standardBorderColors from config.ts
                                       //   Edit the array inline to customise per item
}

export interface Product {
  id: string;                         // unique, e.g. "p001"
  name: string;                       // display name
  category: string;                   // category slug from config.ts
  description: string;                // free text, can be long
  variants: {
    framed?: VariantInfo;             // glass + border variant
    canvas?: VariantInfo;             // wooden frame, no border
    metal?: VariantInfo;              // brushed aluminium, no border
  };
  palette: [string, string, string];  // artwork colours (for generated preview)
  motif: string;                      // artwork motif style
  photos: string[];                   // one or more product photos (seeds for artwork generation)
  sizeChartImage: string;             // size-chart image shown on this item's page
                                       //   Put your image in: public/size-charts/
                                       //   Then reference it as: "/size-charts/your-image.png"
  inStock: boolean;                   // false = hidden from storefront, data kept for later
  tags: string[];                     // used for AI recommendations
}

// ============================================================
//  PRODUCT DATA — edit/add/remove items here
//
//  Helper `p` makes entries compact:
//    p(category, name, description, palette, motif, framedSizes, canvasSizes, tags, inStock?, framedBorderColors?)
//
//  framedSizes / canvasSizes: arrays of size IDs from config.ts (a5, a4, a3, 12x16, 16x20, 18x24)
//  Each variant can list any subset — not every variant offers every size.
//  Pass null for a variant you don't want to offer.
//
//  For the framed variant, framedBorderColors is optional:
//    - Omit it → uses standardBorderColors (3 colours from config.ts)
//    - Pass a custom array → only those colours are offered
// ============================================================

const framesCanvasSlugs = ['anime', 'movies', 'sports', 'home-decor', 'marvel-dc', 'custom-prints', 'garage'];
const squareSlugs = ['sq-anime', 'sq-movies', 'sq-sports', 'sq-home-decor', 'sq-marvel-dc', 'sq-custom-prints', 'sq-garage'];
const metalSlugs = ['metal-anime', 'metal-movies', 'metal-custom', 'metal-garage'];

function p(
  category: string, name: string, description: string,
  palette: [string, string, string], motif: string,
  framedSizes: string[] | null, canvasSizes: string[] | null,
  tags: string[], inStock = true,
  framedBorderColors?: BorderColor[],
): Omit<Product, 'id' | 'photos' | 'sizeChartImage'> {
  const variants: Product['variants'] = {};

  if (framesCanvasSlugs.includes(category)) {
    // Rectangle Frames & Canvas: framed (A4/A3) + canvas (8×12/12×18)
    variants.framed = {
      sizes: [sizePresets.fr_a4, sizePresets.fr_a3],
      borderColors: framedBorderColors ?? standardBorderColors,
    };
    variants.canvas = {
      sizes: [sizePresets.cv_8x12, sizePresets.cv_12x18],
    };
  } else if (squareSlugs.includes(category)) {
    // Square Frames & Canvas: framed (8×8/12×12) + canvas (8×8/12×12)
    variants.framed = {
      sizes: [sizePresets.sqfr_8x8, sizePresets.sqfr_12x12],
      borderColors: framedBorderColors ?? standardBorderColors,
    };
    variants.canvas = {
      sizes: [sizePresets.sqcv_8x8, sizePresets.sqcv_12x12],
    };
  } else if (metalSlugs.includes(category)) {
    // Metal Poster: metal only (12×18)
    variants.metal = { sizes: [sizePresets.mt_12x18] };
  }

  return { category, name, description, variants, palette, motif, inStock, tags };
}

const rawProducts: Omit<Product, 'id' | 'photos' | 'sizeChartImage'>[] = [
  // ---- ANIME ----
  p('anime', 'Crimson Dawn', 'A lone swordsman stands silhouetted against the rising sun, blade drawn and resolve hardened. This piece captures that breathless moment before the battle begins — the calm before the storm. Printed on premium metal with a glass-front frame.', ['#7F1D1D', '#FBBF24', '#1E293B'], 'burst', ['a5', 'a4', 'a3'], ['a4', 'a3', '16x20'], ['action', 'solo', 'sunrise']),
  p('anime', 'Ocean of Stars', 'A girl reaches toward a sky filled with constellations, her hair caught in an impossible wind. The colour palette moves from deep ocean blues to warm starlight yellows. Gallery-wrapped canvas on a wooden frame.', ['#0EA5E9', '#1E3A8A', '#FDE68A'], 'burst', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['sky', 'dream', 'blue']),
  p('anime', 'Thunder Step', 'Speed rendered as a single explosive stride. The yellow and brown palette evokes lightning striking dry earth. Every line in this composition points forward — this is momentum, framed.', ['#F59E0B', '#7C2D12', '#0F172A'], 'chevron', ['a5', 'a4', 'a3', '12x16'], ['a4', 'a3', '16x20'], ['speed', 'yellow']),
  p('anime', 'Silent Sakura', 'Petals drift over a quiet village at dusk. Pink blossoms against warm cream tones create a scene of stillness and memory. A softer piece, best in larger sizes where the detail can breathe.', ['#F472B6', '#831843', '#FEF3C7'], 'leaf', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20', '18x24'], ['calm', 'pink', 'village']),
  p('anime', 'Iron Resolve', 'The mecha that stood last on the battlefield. Steel grey and crimson red, with a glow that suggests the core is still online. A statement piece for any wall that needs weight and presence.', ['#475569', '#0F172A', '#EF4444'], 'shield', ['a4', 'a3', '16x20'], ['a3', '16x20', '18x24'], ['mecha', 'red', 'robot']),
  p('anime', 'Fox Spirit', 'Nine tails fan out at dusk, glowing amber against a darkening sky. The orange and brown palette gives this piece a warm, autumnal energy that shifts as the light in your room changes.', ['#F97316', '#7C2D12', '#1C1917'], 'burst', ['a5', 'a4', 'a3'], ['a4', 'a3', '16x20'], ['spirit', 'orange']),
  p('anime', 'Blade of Dawn', 'The cut that split the sky in two. Crimson red and gold on a near-black background — this is the moment a blade meets its target. Dramatic at any size, devastating in A3.', ['#DC2626', '#FCD34D', '#111827'], 'burst', ['a4', 'a3', '18x24'], ['a3', '16x20', '18x24'], ['sword', 'action']),
  p('anime', 'Moonlit Vow', 'A promise made under a full moon. Indigo blues with a soft lavender glow — this is a quiet, intimate piece that rewards close viewing. The canvas texture adds depth to the night sky.', ['#6366F1', '#1E1B4B', '#E0E7FF'], 'leaf', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['night', 'blue']),
  p('anime', 'Ember Eyes', 'The flame that never dies. Orange and deep red with a charcoal base — the eyes in this piece seem to follow you across the room. A favourite for darker wall spaces.', ['#EA580C', '#7F1D1D', '#0C0A09'], 'burst', ['a5', 'a4', 'a3', '12x16'], ['a4', 'a3', '16x20'], ['fire', 'demon']),
  p('anime', 'Garden of Echoes', 'Memories in full bloom. Green and pink in a composition that feels like a half-remembered dream. Soft, organic, and best in larger formats where the floral detail can spread.', ['#10B981', '#064E3B', '#FCE7F3'], 'leaf', ['a4', 'a3', '16x20'], ['a3', '16x20', '18x24'], ['soft', 'green']),
  p('anime', 'Steel Heart', 'The knight who chose love over duty. Slate grey with a single rose-red accent — a study in restraint. The glass-front frame gives this piece a formal, gallery feel.', ['#94A3B8', '#1E293B', '#F87171'], 'shield', ['a4', 'a3', '12x16'], ['a4', 'a3', '16x20'], ['knight', 'romance']),
  p('anime', 'Phantom Drift', 'A ghost ship sails through clouds rather than water. Cyan and teal with a ghostly white glow. The canvas variant suits this piece — the texture adds to the dreamlike quality.', ['#0891B2', '#0E7490', '#E2E8F0'], 'film', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['sea', 'mystery']),
  p('anime', 'Crimson Lotus', 'The bloom after the battle. Deep red petals on a dark background, with a soft pink highlight. A piece about beauty emerging from violence — quiet, powerful, and unmistakably anime.', ['#BE123C', '#831843', '#FECDD3'], 'leaf', ['a5', 'a4', 'a3'], ['a4', 'a3', '16x20'], ['flower', 'red']),
  p('anime', 'Skybound', 'The boy who chased horizons. Bright blue sky with warm yellow light — a piece about possibility and the open air. Best in larger sizes where the sense of space can expand.', ['#3B82F6', '#1D4ED8', '#FEF9C3'], 'burst', ['a4', 'a3', '16x20'], ['a3', '16x20', '18x24'], ['sky', 'adventure']),
  p('anime', 'Last Stand', 'The final frame of the war. Crimson and gold on a dark base — every figure in this composition is mid-motion. This is the piece you hang at the end of a hallway.', ['#B91C1C', '#450A0A', '#FBBF24'], 'chevron', ['a4', 'a3', '18x24'], ['a3', '16x20', '18x24'], ['war', 'epic']),

  // ---- MOVIES ----
  p('movies', 'Neon Boulevard', 'A rain-soaked night in Los Angeles. Pink neon reflected in puddles, a figure in a long coat walking away. This is noir in its purest visual form — cinematic, moody, unforgettable.', ['#EC4899', '#1E1B4B', '#FDE047'], 'film', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['noir', 'city', 'rain']),
  p('movies', 'Desert Mirage', 'A sci-fi epic across the dunes. Amber and brown with a pale cream sky — the kind of vast, empty landscape that makes you feel small. Canvas texture adds to the organic, sandy feel.', ['#D97706', '#78350F', '#FEF3C7'], 'chevron', ['a3', '16x20', '18x24'], ['a3', '16x20', '18x24'], ['sci-fi', 'desert']),
  p('movies', 'Midnight Express', 'The train that never stops. Deep blue with a cold steel light — a thriller in a single frame. The glass-front framed variant gives this the cold, precise feel it deserves.', ['#1E40AF', '#0C4A6E', '#E0E7FF'], 'film', ['a4', 'a3', '12x16'], ['a4', 'a3', '16x20'], ['thriller', 'train']),
  p('movies', 'Golden Hour Heist', 'The last job at sunset. Amber and dark brown with a black foreground — crime and beauty in the same frame. The canvas variant softens the edges, making the sunset feel painted.', ['#F59E0B', '#7C2D12', '#111827'], 'film', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['crime', 'sunset']),
  p('movies', 'Frozen Outpost', 'Survival at forty below. Ice blue and pale white with a dark, cold centre. This piece makes any room feel cooler — a study in isolation and endurance.', ['#0EA5E9', '#0C4A6E', '#E0F2FE'], 'shield', ['a5', 'a4', 'a3'], ['a4', 'a3', '16x20'], ['survival', 'ice']),
  p('movies', 'Crimson Dynasty', 'An empire of blood and silk. Deep red with gold accents on a near-black base — opulent, dangerous, royal. Best in the largest sizes where the scale matches the ambition.', ['#B91C1C', '#450A0A', '#FCD34D'], 'shield', ['a3', '16x20', '18x24'], ['a3', '16x20', '18x24'], ['epic', 'royal']),
  p('movies', 'Starfall', 'A war among the stars. Indigo and violet with warm yellow starlight — space as a battlefield. The glass-front frame gives this piece a clean, cinematic presentation.', ['#6366F1', '#312E81', '#FDE68A'], 'burst', ['a4', 'a3', '18x24'], ['a3', '16x20', '18x24'], ['space', 'epic']),
  p('movies', 'The Quiet Lake', 'A horror in still water. Teal and dark green with a pale, unsettling glow. The canvas texture makes the water feel real — and the thing beneath it, closer.', ['#0F766E', '#134E4A', '#A7F3D0'], 'film', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['horror', 'lake']),
  p('movies', 'Concrete Jungle', 'The city as a character. Slate grey with amber light — every window a story. This piece rewards close inspection; the detail holds up at any size.', ['#475569', '#1E293B', '#F59E0B'], 'film', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['urban', 'grit']),
  p('movies', 'Velvet Heist', 'A smooth crime in a smooth city. Purple and dark violet with a pink glow — style as substance. The canvas variant gives this a softer, more luxurious feel.', ['#7E22CE', '#3B0764', '#FBCFE8'], 'film', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['style', 'purple']),
  p('movies', 'Wasteland Riders', 'The road warriors return. Burnt orange and dark brown with a yellow sky — post-apocalyptic energy in every line. A statement piece for any wall that needs heat.', ['#B45309', '#451A03', '#FDE68A'], 'chevron', ['a4', 'a3', '18x24'], ['a3', '16x20', '18x24'], ['post-apoc', 'cars']),
  p('movies', 'The Last Letter', 'A romance told in postage. Red and cream with a warm, handwritten feel. A quieter piece — best in smaller sizes where the intimacy reads.', ['#DC2626', '#7F1D1D', '#FEF3C7'], 'leaf', ['a5', 'a4', 'a3'], ['a4', 'a3', '16x20'], ['romance', 'soft']),
  p('movies', 'Deep Blue', 'The abyss looks back. Cyan and deep blue with a pale, cold light. This piece is about depth — literal and metaphorical. The glass-front frame adds to the cold precision.', ['#0EA5E9', '#0C4A6E', '#BAE6FD'], 'film', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['deep-sea', 'thriller']),
  p('movies', 'Paper Moon', 'A black-and-white kind of night. Grey and charcoal with a single white highlight — classic cinema in a single frame. The canvas texture gives this a vintage, film-still quality.', ['#6B7280', '#1F2937', '#F9FAFB'], 'film', ['a4', 'a3', '12x16'], ['a4', 'a3', '16x20'], ['classic', 'mono']),
  p('movies', 'Empire of Sand', 'The kingdom the desert swallowed. Amber and dark brown with a cream sky — scale, history, and the slow erosion of time. Best in the largest sizes.', ['#D97706', '#92400E', '#FEF3C7'], 'shield', ['a3', '16x20', '18x24'], ['a3', '16x20', '18x24'], ['epic', 'desert']),

  // ---- SPORTS ----
  p('sports', 'The Bicycle Kick', 'Defying gravity, defining the game. Amber and brown with a dark sky — the moment a player becomes a legend. The glass-front frame gives this the sports-hall-of-fame treatment.', ['#F59E0B', '#7C2D12', '#0F172A'], 'chevron', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['football', 'iconic']),
  p('sports', 'Last Second Shot', 'The buzzer-beater that echoed. Red and gold on a dark base — the ball is in the air and the clock reads zero. Canvas texture adds to the arena atmosphere.', ['#DC2626', '#7F1D1D', '#FBBF24'], 'burst', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['basketball', 'clutch']),
  p('sports', 'The Cover Drive', 'Elegance in willow and leather. Sky blue and warm yellow — a classic cricket moment rendered with precision. Best in medium sizes where the stance reads clearly.', ['#0EA5E9', '#0C4A6E', '#FDE68A'], 'chevron', ['a5', 'a4', 'a3'], ['a4', 'a3', '16x20'], ['cricket', 'classic']),
  p('sports', 'Knockout Punch', 'The fist that changed history. Deep red and gold on a black background — power compressed into a single frame. Canvas gives this a raw, painted feel.', ['#B91C1C', '#450A0A', '#FCD34D'], 'burst', ['a3', '16x20', '18x24'], ['a3', '16x20', '18x24'], ['boxing', 'power']),
  p('sports', 'The Long Drive', 'Fairway to glory. Green and cream with a warm sky — the moment of contact in perfect stillness. A calmer sports piece, suited to offices and studies.', ['#10B981', '#064E3B', '#FEF3C7'], 'leaf', ['a4', 'a3', '12x16'], ['a4', 'a3', '16x20'], ['golf', 'green']),
  p('sports', 'Sprint Finish', 'The line that decided gold. Amber and dark brown — every muscle at maximum effort. The canvas variant gives the motion a blurred, living quality.', ['#F59E0B', '#92400E', '#0F172A'], 'chevron', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['athletics', 'speed']),
  p('sports', 'The Slam Dunk', 'Above the rim, above the rest. Purple and gold — the colours of greatness. The glass-front frame makes this piece feel like a trophy.', ['#7C3AED', '#4C1D95', '#FDE047'], 'burst', ['a4', 'a3', '18x24'], ['a3', '16x20', '18x24'], ['basketball', 'power']),
  p('sports', 'Goalkeeper\'s Dive', 'The save that stopped time. Blue and gold with a dark background — the moment a goalkeeper becomes a wall. Canvas adds to the dramatic, stretched quality.', ['#0EA5E9', '#0C4A6E', '#FBBF24'], 'shield', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['football', 'defense']),
  p('sports', 'The Serve', 'An ace under the sun. Orange and brown with a cream sky — precision rendered as a single, explosive motion. Best in smaller sizes where the focus tightens.', ['#F97316', '#7C2D12', '#FEF3C7'], 'burst', ['a5', 'a4', 'a3'], ['a4', 'a3', '16x20'], ['tennis', 'precision']),
  p('sports', 'Corner Flag', 'The celebration that shook the stadium. Green and gold — pure joy in a single frame. The canvas variant gives the confetti and crowd a textured, organic feel.', ['#16A34A', '#14532D', '#FBBF24'], 'chevron', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['football', 'joy']),
  p('sports', 'The Knockout Combo', 'Two hits, one ending. Red on black with a gold flash — the combination that ended the fight. Dramatic at any size, devastating in A3.', ['#DC2626', '#7F1D1D', '#0F172A'], 'burst', ['a4', 'a3', '12x16'], ['a4', 'a3', '16x20'], ['boxing', 'combo']),
  p('sports', 'Wicket Celebration', 'The roar after the wicket. Teal and dark green with a warm yellow glow — the moment a bowler becomes a hero. Canvas texture adds to the stadium energy.', ['#0D9488', '#134E4A', '#FDE68A'], 'chevron', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['cricket', 'fire']),
  p('sports', 'The Header', 'Airborne, unstoppable. Blue and gold — the moment a player defies gravity for the ball. The glass-front frame gives this a clean, sports-photography feel.', ['#1D4ED8', '#1E3A8A', '#FDE047'], 'burst', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['football', 'air']),
  p('sports', 'Final Lap', 'The last curve before glory. Orange and dark brown — the final turn, the final push. Canvas gives the speed a blurred, visceral quality.', ['#EA580C', '#7C2D12', '#0F172A'], 'chevron', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['racing', 'final']),
  p('sports', 'The Free Kick', 'Bending it beyond reach. Blue and yellow — the impossible curve rendered as a single, frozen moment. Best in medium sizes where the arc reads clearly.', ['#0EA5E9', '#0C4A6E', '#FDE68A'], 'burst', ['a5', 'a4', 'a3', '12x16'], ['a4', 'a3', '16x20'], ['football', 'curve']),

  // ---- HOME DECOR ----
  p('home-decor', 'Monstera Morning', 'Light through living leaves. Green and cream with a warm golden glow — a botanical study that brings the outside in. The canvas variant gives the leaves a soft, organic texture.', ['#10B981', '#064E3B', '#FEF3C7'], 'leaf', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20', '18x24'], ['botanical', 'green']),
  p('home-decor', 'Desert Lines', 'Minimalist dunes at dusk. Amber and brown with a cream sky — a landscape reduced to its essential lines. The glass-front frame gives this a clean, gallery-wall feel.', ['#D97706', '#92400E', '#FEF3C7'], 'chevron', ['a5', 'a4', 'a3', '12x16'], ['a4', 'a3', '16x20'], ['abstract', 'warm']),
  p('home-decor', 'Ocean Calm', 'A still sea, a still mind. Blue and pale white — meditation rendered as a print. The canvas texture makes the water feel real, almost touchable.', ['#0EA5E9', '#0C4A6E', '#E0F2FE'], 'leaf', ['a3', '16x20', '18x24'], ['a3', '16x20', '18x24'], ['calm', 'blue']),
  p('home-decor', 'Terrazzo Dream', 'A modern speckled composition. Pink and dark red with yellow accents — terrazzo as art. The glass-front frame makes the speckles feel embedded in resin.', ['#EC4899', '#831843', '#FDE68A'], 'burst', ['a4', 'a3', '12x16'], ['a4', 'a3', '16x20'], ['abstract', 'pink']),
  p('home-decor', 'Line Face', 'One-line portrait, endless feeling. Charcoal and black with a single white highlight — the ultimate minimalist statement. Canvas texture adds warmth to the line.', ['#1E293B', '#0F172A', '#F8FAFC'], 'leaf', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['line-art', 'mono']),
  p('home-decor', 'Sunset Arch', 'Architecture in golden hour. Amber and brown with a cream sky — a single arch, a single moment of light. Best in medium sizes where the geometry reads clearly.', ['#F59E0B', '#7C2D12', '#FEF3C7'], 'chevron', ['a5', 'a4', 'a3'], ['a4', 'a3', '16x20'], ['arch', 'warm']),
  p('home-decor', 'Bloom No. 7', 'A single flower, fully seen. Deep pink on a dark background with a soft pink highlight — a study in focus and simplicity. The canvas variant gives the petals a velvety texture.', ['#BE185D', '#831843', '#FCE7F3'], 'leaf', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['floral', 'pink']),
  p('home-decor', 'Mist over Pines', 'A forest waking up. Teal and dark green with a pale, misty glow — the moment before the sun burns through. The glass-front frame gives this a cool, crisp feel.', ['#0D9488', '#134E4A', '#F0FDFA'], 'leaf', ['a4', 'a3', '12x16'], ['a4', 'a3', '16x20'], ['forest', 'teal']),
  p('home-decor', 'Brass Geometry', 'Warm metallic shapes on dark. Gold and dark brown with a deep indigo background — luxury in geometric form. Canvas texture adds depth to the metallic tones.', ['#A07E2F', '#7A5E22', '#1E1B4B'], 'burst', ['a3', '16x20', '18x24'], ['a3', '16x20', '18x24'], ['geometric', 'brass']),
  p('home-decor', 'Wave Study', 'A Hokusai-inspired modern swell. Blue and dark blue with a warm yellow foam — the wave as a study in power and pattern. Best in larger sizes where the curve can expand.', ['#0EA5E9', '#0C4A6E', '#FDE68A'], 'leaf', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['wave', 'blue']),
  p('home-decor', 'Coffee & Sun', 'A slow morning, framed. Brown and dark brown with a cream light — the warmth of a kitchen, the patience of a weekend. Canvas texture makes this feel like a memory.', ['#92400E', '#451A03', '#FEF3C7'], 'leaf', ['a4', 'a3', '12x16'], ['a4', 'a3', '16x20'], ['cozy', 'brown']),
  p('home-decor', 'Marble Vein', 'Luxury in a single swirl. Grey and slate with a white highlight — the kind of piece that makes a bathroom or entryway feel finished. The glass-front frame adds to the polished-stone feel.', ['#94A3B8', '#475569', '#F8FAFC'], 'leaf', ['a5', 'a4', 'a3'], ['a4', 'a3', '16x20'], ['luxury', 'stone']),
  p('home-decor', 'Citrus Pop', 'A bright kitchen accent. Orange and brown with a cream background — the colour of a fruit bowl, the energy of a market. Canvas gives this a warm, hand-painted feel.', ['#F97316', '#7C2D12', '#FEF3C7'], 'burst', ['a5', 'a4', 'a3'], ['a4', 'a3', '16x20'], ['kitchen', 'orange']),
  p('home-decor', 'Mountain Range', 'A minimalist horizon line. Slate and dark blue with a warm yellow sky — the last thing you see before sleep. The glass-front frame gives this a clean, poster-like quality.', ['#475569', '#1E293B', '#FDE68A'], 'chevron', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['landscape', 'mono']),
  p('home-decor', 'Golden Hour', 'The last light, the best light. Amber and burnt orange with a soft pink glow — a piece about endings and warmth. Canvas texture makes the light feel painted on.', ['#F59E0B', '#B45309', '#FECDD3'], 'burst', ['a3', '16x20', '18x24'], ['a3', '16x20', '18x24'], ['sky', 'warm']),

  // ---- MARVEL / DC ----
  p('marvel-dc', 'Web Slinger', 'The hero in the half-light. Red and blue with a dark, urban background — the moment before the swing. The glass-front frame gives this a comic-book-on-the-wall feel.', ['#DC2626', '#7F1D1D', '#1E3A8A'], 'burst', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['hero', 'red']),
  p('marvel-dc', 'Thunder God', 'A hammer raised to the storm. Blue and dark blue with a warm yellow lightning — power drawn from the sky. Canvas texture gives the lightning a raw, crackling quality.', ['#3B82F6', '#1E3A8A', '#FDE68A'], 'burst', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['hero', 'thunder']),
  p('marvel-dc', 'Iron Resolve', 'A suit built for sacrifice. Orange and brown with gold highlights — the moment the faceplate closes. The glass-front frame makes the metallic tones gleam.', ['#EA580C', '#7C2D12', '#FCD34D'], 'shield', ['a4', 'a3', '18x24'], ['a3', '16x20', '18x24'], ['hero', 'gold']),
  p('marvel-dc', 'Night Knight', 'The dark defender rises. Charcoal and black with a single gold signal in the sky — a study in shadow and purpose. Canvas texture adds to the gritty, nocturnal feel.', ['#1E293B', '#0F172A', '#FBBF24'], 'shield', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['hero', 'dark']),
  p('marvel-dc', 'Shield Throw', 'The spin that won the war. Blue and red on a dark background — the shield mid-flight, the battle mid-turn. Best in larger sizes where the motion reads.', ['#1D4ED8', '#1E3A8A', '#DC2626'], 'shield', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['hero', 'shield']),
  p('marvel-dc', 'Green Rage', 'A smash heard round the world. Green and dark green with a warm yellow impact — the moment before the ground breaks. Canvas gives the destruction a raw, textured feel.', ['#16A34A', '#14532D', '#FDE68A'], 'burst', ['a3', '16x20', '18x24'], ['a3', '16x20', '18x24'], ['hero', 'green']),
  p('marvel-dc', 'Speed Force', 'The lightning in his veins. Amber and dark brown with a blue afterimage — speed rendered as a single, frozen frame. The glass-front frame gives the lightning a clean, electric feel.', ['#F59E0B', '#92400E', '#1E3A8A'], 'burst', ['a4', 'a3', '12x16'], ['a4', 'a3', '16x20'], ['hero', 'speed']),
  p('marvel-dc', 'Cape in Wind', 'The man who chose hope. Blue and dark blue with a warm yellow sun behind — the cape, the sky, the choice. Canvas texture gives the cape a flowing, fabric-like quality.', ['#1D4ED8', '#1E3A8A', '#FDE68A'], 'burst', ['a3', '16x20', '18x24'], ['a3', '16x20', '18x24'], ['hero', 'hope']),
  p('marvel-dc', 'Lasso of Truth', 'The warrior princess. Purple and dark violet with a soft pink glow — strength and grace in a single frame. The glass-front frame gives this a formal, heroic presentation.', ['#A855F7', '#581C87', '#FBCFE8'], 'burst', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['hero', 'purple']),
  p('marvel-dc', 'Trident Rise', 'The king of the seas. Blue and dark blue with a warm yellow trident — power drawn from the deep. Canvas texture adds to the underwater, flowing quality.', ['#0EA5E9', '#0C4A6E', '#FDE68A'], 'shield', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['hero', 'sea']),
  p('marvel-dc', 'Claws Out', 'The mutant who walks alone. Yellow and dark brown with a steel-grey background — the moment the claws come out. The glass-front frame gives the metal a sharp, precise feel.', ['#FDE047', '#A16207', '#1E293B'], 'burst', ['a4', 'a3', '12x16'], ['a4', 'a3', '16x20'], ['hero', 'yellow']),
  p('marvel-dc', 'Cosmic Surf', 'Riding the edge of space. Indigo and dark violet with warm yellow stars — the board, the void, the freedom. Canvas texture gives the cosmos a deep, infinite feel.', ['#6366F1', '#312E81', '#FDE68A'], 'burst', ['a3', '16x20', '18x24'], ['a3', '16x20', '18x24'], ['hero', 'cosmic']),
  p('marvel-dc', 'Bat Signal', 'A call answered in the dark. Indigo and black with a single gold light in the sky — the signal, the response, the partnership. Best in larger sizes where the light reads.', ['#1E1B4B', '#0F172A', '#FBBF24'], 'shield', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['hero', 'night']),
  p('marvel-dc', 'Thunder Strike', 'A storm named after a god. Blue and dark blue with a gold lightning core — the moment the hammer meets the storm. Canvas gives the lightning a raw, elemental feel.', ['#3B82F6', '#1E3A8A', '#FCD34D'], 'burst', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['hero', 'storm']),
  p('marvel-dc', 'The Assemble', 'Six heroes, one frame. Red, blue, and gold — the team, the moment, the last stand. This is the centrepiece print. Best in the largest size you can fit.', ['#DC2626', '#1D4ED8', '#FDE68A'], 'shield', ['a3', '16x20', '18x24'], ['a3', '16x20', '18x24'], ['team', 'epic']),

  // ---- CUSTOM PRINTS ----
  p('custom-prints', 'Your Photo, Metal', 'Upload your photo and we print it on brushed aluminium with a glass-front frame. The metal gives photos a sharp, vivid quality with deep blacks and bright highlights. Perfect for high-contrast images and modern interiors.', ['#475569', '#1E293B', '#E2E8F0'], 'spark', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['photo', 'metal']),
  p('custom-prints', 'Your Photo, Wood', 'Upload your photo and we print it on a birch wood panel, gallery-wrapped on a wooden frame. The wood grain shows through lightly, giving your photo a warm, organic quality. Best for landscapes and portraits.', ['#92400E', '#451A03', '#FEF3C7'], 'spark', null, ['a4', 'a3', '16x20'], ['photo', 'wood']),
  p('custom-prints', 'Your Photo, Canvas', 'Upload your photo and we print it on cotton canvas, gallery-wrapped on a wooden frame. The canvas texture gives photos a painted, artistic quality. The classic choice for family portraits and fine art reproductions.', ['#0D9488', '#134E4A', '#F0FDFA'], 'spark', null, ['a4', 'a3', '16x20', '18x24'], ['photo', 'canvas']),
  p('custom-prints', 'Pet Portrait', 'Your companion, immortalised. Send us a photo of your pet and our artist will create a custom portrait, printed on your chosen material and size. The framed variant includes a glass front and your choice of border color.', ['#F472B6', '#831843', '#FEF3C7'], 'leaf', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['pet', 'portrait']),
  p('custom-prints', 'Family Frame', 'Generations on one wall. Send us your family photo and we will print it as a gallery-grade piece. The canvas variant gives family portraits a warm, timeless quality that glass can\'t match.', ['#F59E0B', '#7C2D12', '#FEF3C7'], 'leaf', ['a4', 'a3', '16x20'], ['a3', '16x20', '18x24'], ['family', 'portrait']),
  p('custom-prints', 'Wedding Vow', 'Your words, our typography. Send us your wedding vows, a line from your first dance, or your anniversary date, and we will design a custom typography piece. Printed on your chosen material with a glass-front frame.', ['#BE123C', '#831843', '#FCE7F3'], 'leaf', ['a4', 'a3', '12x16'], ['a4', 'a3', '16x20'], ['wedding', 'text']),
  p('custom-prints', 'City Skyline', 'Your city, our line art. Tell us which city and we will create a minimalist skyline piece in our signature one-line style. The canvas variant gives the line a soft, hand-drawn quality.', ['#1E293B', '#0F172A', '#FBBF24'], 'chevron', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['city', 'line']),
  p('custom-prints', 'Kids\' Doodle', 'Your child\'s art, gallery-grade. Send us a drawing and we will print it as a real piece — same lines, same colours, but on premium material with a glass-front frame. The best gift a grandparent can receive.', ['#EC4899', '#831843', '#FDE68A'], 'burst', ['a5', 'a4', 'a3'], ['a4', 'a3', '16x20'], ['kids', 'fun']),
  p('custom-prints', 'Quote Wall', 'A sentence that stays with you. Send us a quote, a lyric, or a line of poetry and we will design it as a typographic print. The canvas variant gives the text a warm, letterpress quality.', ['#1E1B4B', '#0F172A', '#FDE68A'], 'spark', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['quote', 'text']),
  p('custom-prints', 'Map of Memory', 'A place that means everything. Send us a location — the street you grew up on, the city where you met, the coordinates of your favourite view — and we will create a custom map piece. Glass-front framed.', ['#0EA5E9', '#0C4A6E', '#FEF3C7'], 'leaf', ['a4', 'a3', '12x16'], ['a4', 'a3', '16x20'], ['map', 'place']),
  p('custom-prints', 'Logo Plate', 'Your brand, metal-grade. Send us your logo and we will print it on brushed aluminium with a glass-front frame. The metal gives logos a sharp, premium quality that paper can\'t match. Perfect for offices and storefronts.', ['#A07E2F', '#7A5E22', '#1E1B4B'], 'shield', ['a4', 'a3', '16x20'], null, ['brand', 'logo']),
  p('custom-prints', 'Song Lyric', 'The line you can\'t stop singing. Send us a lyric and we will design it as a typographic print. The canvas variant gives the text a warm, vintage-poster quality.', ['#7E22CE', '#3B0764', '#FBCFE8'], 'spark', null, ['a4', 'a3', '12x16'], ['music', 'text']),
  p('custom-prints', 'Anniversary Date', 'A number that changed everything. Send us your anniversary date and we will design a custom piece around it. Printed on your chosen material with a glass-front frame and your choice of border color.', ['#DC2626', '#7F1D1D', '#FECDD3'], 'spark', ['a5', 'a4', 'a3'], ['a4', 'a3', '16x20'], ['date', 'love']),
  p('custom-prints', 'Recipe Plate', 'Grandma\'s recipe, preserved. Send us a handwritten recipe and we will print it as a piece of art. The canvas variant gives the handwriting a warm, aged quality — like a kitchen heirloom.', ['#16A34A', '#14532D', '#FEF3C7'], 'leaf', ['a4', 'a3', '12x16'], ['a4', 'a3', '16x20'], ['food', 'text']),
  p('custom-prints', 'Constellation Map', 'The sky the night you were born. Tell us your birth date and location and we will create a custom star map. Printed on your chosen material with a glass-front frame. A piece of the sky, yours forever.', ['#1E1B4B', '#0F172A', '#FDE68A'], 'burst', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['stars', 'night']),

  // ---- GARAGE ----
  p('garage', 'Midnight Muscle', 'A V8 under moonlight. Deep red and charcoal with chrome highlights — the classic American muscle car rendered as a study in power and restraint. The glass-front frame gives the chrome a real, reflective edge.', ['#B91C1C', '#450A0A', '#475569'], 'chevron', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['muscle', 'classic', 'night']),
  p('garage', 'Neon Drift', 'A JDM legend slicing through neon-lit rain. Cyan and magenta with a dark urban backdrop — the spirit of Tokyo midnight, frozen in a single frame. Canvas texture adds to the wet-street atmosphere.', ['#0EA5E9', '#6D28D9', '#0F172A'], 'burst', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['jdm', 'neon', 'night']),
  p('garage', 'Desert Rally', 'Dust, gravel, and pure horsepower. Amber and burnt orange against a pale desert sky — the moment a rally car becomes one with the landscape. Best in larger sizes where the dust cloud can breathe.', ['#F59E0B', '#92400E', '#FEF3C7'], 'chevron', ['a3', '16x20', '18x24'], ['a3', '16x20', '18x24'], ['rally', 'desert', 'orange']),
  p('garage', 'Hypercar Dawn', 'The first light on carbon fibre. Blue and silver with a warm golden horizon — a hypercar at dawn, when the world is still quiet and the engine is the only sound. The glass-front frame gives the carbon fibre its precise, technical feel.', ['#1E40AF', '#475569', '#FCD34D'], 'shield', ['a4', 'a3', '16x20'], ['a3', '16x20', '18x24'], ['hypercar', 'blue', 'dawn']),
  p('garage', 'Garage Days', 'A workshop, a wrench, a dream. Warm brown and amber with a soft cream light — the quiet beauty of a car being built by hand. Canvas texture gives this piece a warm, nostalgic quality.', ['#92400E', '#451A03', '#FEF3C7'], 'film', ['a4', 'a3', '12x16'], ['a4', 'a3', '16x20'], ['garage', 'warm', 'classic']),
  p('garage', 'Circuit Breaker', 'The apex, the kerb, the perfect line. Red and white with a dark asphalt base — a track moment rendered as pure geometry and speed. Best in medium sizes where the racing line reads clearly.', ['#DC2626', '#1E293B', '#F8FAFC'], 'chevron', ['a5', 'a4', 'a3'], ['a4', 'a3', '16x20'], ['track', 'red', 'speed']),
  p('garage', 'Lowrider Sunset', 'Chrome and candy paint at golden hour. Purple and gold with a warm amber sky — the low and slow culture, rendered as a portrait of style. Canvas texture gives the paint a deep, liquid quality.', ['#7C3AED', '#4C1D95', '#FBBF24'], 'burst', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['lowrider', 'purple', 'sunset']),
  p('garage', 'Electric Silence', 'The future moves without a sound. Blue and white with a cool silver glow — an EV at speed, where the only evidence of motion is the blur of light. The glass-front frame gives this a clean, futuristic feel.', ['#0EA5E9', '#E0F2FE', '#94A3B8'], 'shield', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['ev', 'blue', 'future']),
  p('garage', 'Classic Coupe', 'Timeless lines, timeless curves. Forest green and cream with a warm brass accent — a vintage coupe rendered as a portrait of elegance. Best in larger sizes where the detailing can shine.', ['#166534', '#14532D', '#FCD34D'], 'film', ['a3', '16x20', '18x24'], ['a3', '16x20', '18x24'], ['classic', 'green', 'vintage']),
  p('garage', 'Speed Demon', 'A top-speed run on the salt flats. White and grey with a blinding blue sky — the moment when the speedometer stops mattering. Canvas texture gives the salt a crystalline, otherworldly quality.', ['#94A3B8', '#1E293B', '#0EA5E9'], 'chevron', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['speed', 'white', 'salt']),
  p('garage', 'Pit Stop', 'Four seconds, four tyres. Amber and black with a bright red accent — the precision of a Formula 1 pit stop, frozen in time. The glass-front frame gives this piece a sharp, documentary feel.', ['#F59E0B', '#0F172A', '#DC2626'], 'burst', ['a4', 'a3', '12x16'], ['a4', 'a3', '16x20'], ['f1', 'amber', 'precision']),
  p('garage', 'Road Trip', 'The highway that goes forever. Blue and warm amber with a soft pink horizon — the feeling of driving toward something, not away from it. Canvas texture gives the sky a painted, dreamlike quality.', ['#1E40AF', '#F59E0B', '#FBCFE8'], 'film', ['a3', '16x20', '18x24'], ['a3', '16x20', '18x24'], ['road', 'blue', 'sunset']),
  p('garage', 'Street Racer', 'Two lanes, one winner. Red and blue with a dark city backdrop — the underground race, the starting line, the held breath. Best in medium sizes where the tension reads.', ['#DC2626', '#1E40AF', '#0F172A'], 'chevron', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['street', 'red', 'night']),
  p('garage', 'Convertible Coast', 'Top down, ocean side. Teal and warm cream with a soft blue sky — the freedom of a coastal drive, the wind as the only soundtrack. Canvas texture gives the ocean a soft, inviting quality.', ['#0D9488', '#134E4A', '#FEF3C7'], 'leaf', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['convertible', 'teal', 'coast']),
  p('garage', 'Truck Legend', 'Built tough, built to last. Brown and dark green with a warm amber accent — the pickup truck as a symbol of work, grit, and the open road. The glass-front frame gives this a sturdy, grounded feel.', ['#92400E', '#166534', '#F59E0B'], 'shield', ['a4', 'a3', '16x20'], ['a4', 'a3', '16x20'], ['truck', 'brown', 'rugged']),

  // ---- METAL POSTER: ANIME ----
  p('metal-anime', 'Crimson Dawn Metal', 'A lone swordsman stands silhouetted against the rising sun, blade drawn. On brushed aluminium, the crimson and gold gain a vivid, reflective intensity that paper can\'t match.', ['#7F1D1D', '#FBBF24', '#1E293B'], 'burst', ['a4', 'a3', '16x20'], null, ['action', 'solo', 'sunrise']),
  p('metal-anime', 'Ocean of Stars Metal', 'A girl reaches toward a sky filled with constellations. On metal, the deep ocean blues and starlight yellows gain a luminous, almost electric quality.', ['#0EA5E9', '#1E3A8A', '#FDE68A'], 'burst', ['a4', 'a3', '16x20'], null, ['sky', 'dream', 'blue']),
  p('metal-anime', 'Thunder Step Metal', 'Speed rendered as a single explosive stride. On brushed aluminium, the yellow and brown palette evokes lightning striking dry earth — vivid, sharp, unstoppable.', ['#F59E0B', '#7C2D12', '#0F172A'], 'chevron', ['a5', 'a4', 'a3'], null, ['speed', 'yellow']),
  p('metal-anime', 'Fox Spirit Metal', 'Nine tails fan out at dusk, glowing amber against a darkening sky. On metal, the orange and brown palette has a warm, fire-like radiance.', ['#F97316', '#7C2D12', '#1C1917'], 'burst', ['a4', 'a3', '16x20'], null, ['spirit', 'orange']),
  p('metal-anime', 'Blade of Dawn Metal', 'The cut that split the sky in two. Crimson red and gold on brushed aluminium — the metal gives the blade a real, cold sheen. Dramatic at any size.', ['#DC2626', '#FCD34D', '#111827'], 'burst', ['a4', 'a3', '16x20'], null, ['sword', 'action']),

  // ---- METAL POSTER: MOVIES ----
  p('metal-movies', 'Neon Boulevard Metal', 'A rain-soaked night in Los Angeles. On brushed aluminium, the pink neon reflections in puddles gain a vivid, electric quality — noir in its purest visual form.', ['#EC4899', '#1E1B4B', '#FDE047'], 'film', ['a4', 'a3', '16x20'], null, ['noir', 'city', 'rain']),
  p('metal-movies', 'Desert Mirage Metal', 'A sci-fi epic across the dunes. On metal, the amber and brown palette gains a harsh, sun-bleached intensity — the vast landscape made visceral.', ['#D97706', '#78350F', '#FEF3C7'], 'chevron', ['a3', '16x20', '18x24'], null, ['sci-fi', 'desert']),
  p('metal-movies', 'Starfall Metal', 'A war among the stars. On brushed aluminium, the indigo and violet with warm yellow starlight gain a deep, luminous contrast — space as a battlefield.', ['#6366F1', '#312E81', '#FDE68A'], 'burst', ['a4', 'a3', '16x20'], null, ['space', 'epic']),
  p('metal-movies', 'Concrete Jungle Metal', 'The city as a character. On metal, the slate grey with amber light gains a sharp, photographic quality — every window a story, every edge precise.', ['#475569', '#1E293B', '#F59E0B'], 'film', ['a4', 'a3', '16x20'], null, ['urban', 'grit']),
  p('metal-movies', 'Crimson Dynasty Metal', 'An empire of blood and silk. On brushed aluminium, the deep red with gold accents on a near-black base becomes opulent, dangerous, royal.', ['#B91C1C', '#450A0A', '#FCD34D'], 'shield', ['a3', '16x20', '18x24'], null, ['epic', 'royal']),

  // ---- METAL POSTER: CUSTOM ----
  p('metal-custom', 'Your Photo, Metal', 'Upload your photo and we print it on brushed aluminium. The metal gives photos a sharp, vivid quality with deep blacks and bright highlights. Perfect for high-contrast images and modern interiors.', ['#475569', '#1E293B', '#E2E8F0'], 'spark', ['a4', 'a3', '16x20'], null, ['photo', 'metal']),
  p('metal-custom', 'Your Logo, Metal', 'Your brand, metal-grade. Send us your logo and we will print it on brushed aluminium. The metal gives logos a sharp, premium quality that paper can\'t match. Perfect for offices and storefronts.', ['#A07E2F', '#7A5E22', '#1E1B4B'], 'shield', ['a4', 'a3', '16x20'], null, ['brand', 'logo']),
  p('metal-custom', 'Your Art, Metal', 'Upload your own artwork or illustration and we print it on brushed aluminium. The metal gives digital art a vivid, gallery-quality finish with deep contrast and bright highlights.', ['#0EA5E9', '#0C4A6E', '#E0F2FE'], 'spark', ['a4', 'a3', '16x20'], null, ['art', 'metal']),

  // ---- METAL POSTER: GARAGE ----
  p('metal-garage', 'Midnight Muscle Metal', 'A V8 under moonlight. On brushed aluminium, the deep red and charcoal with chrome highlights gain a real, reflective edge — the classic American muscle car in vivid metal.', ['#B91C1C', '#450A0A', '#475569'], 'chevron', ['a4', 'a3', '16x20'], null, ['muscle', 'classic', 'night']),
  p('metal-garage', 'Neon Drift Metal', 'A JDM legend slicing through neon-lit rain. On metal, the cyan and magenta with a dark urban backdrop gain an electric, vivid intensity — Tokyo midnight, frozen in aluminium.', ['#0EA5E9', '#6D28D9', '#0F172A'], 'burst', ['a4', 'a3', '16x20'], null, ['jdm', 'neon', 'night']),
  p('metal-garage', 'Hypercar Dawn Metal', 'The first light on carbon fibre. On brushed aluminium, the blue and silver with a warm golden horizon gain a precise, technical brilliance — the hypercar in its element.', ['#1E40AF', '#475569', '#FCD34D'], 'shield', ['a4', 'a3', '16x20'], null, ['hypercar', 'blue', 'dawn']),
  p('metal-garage', 'Circuit Breaker Metal', 'The apex, the kerb, the perfect line. On metal, the red and white with a dark asphalt base gain a sharp, high-contrast intensity — track geometry in vivid aluminium.', ['#DC2626', '#1E293B', '#F8FAFC'], 'chevron', ['a5', 'a4', 'a3'], null, ['track', 'red', 'speed']),
  p('metal-garage', 'Speed Demon Metal', 'A top-speed run on the salt flats. On brushed aluminium, the white and grey with a blinding blue sky gain a stark, crystalline quality — speed rendered in metal.', ['#94A3B8', '#1E293B', '#0EA5E9'], 'chevron', ['a4', 'a3', '16x20'], null, ['speed', 'white', 'salt']),

  // ---- SQUARE FRAMES & CANVAS: ANIME ----
  p('sq-anime', 'Crimson Dawn Square', 'A lone swordsman stands silhouetted against the rising sun, blade drawn. In square format, the composition centers on the figure — intimate, intense, iconic.', ['#7F1D1D', '#FBBF24', '#1E293B'], 'burst', null, null, ['action', 'solo', 'sunrise']),
  p('sq-anime', 'Ocean of Stars Square', 'A girl reaches toward a sky filled with constellations. The square format captures the full arc of her gesture — dream and distance in equal measure.', ['#0EA5E9', '#1E3A8A', '#FDE68A'], 'burst', null, null, ['sky', 'dream', 'blue']),
  p('sq-anime', 'Thunder Step Square', 'Speed rendered as a single explosive stride. The square format tightens the energy — yellow and brown compressed into a perfect frame.', ['#F59E0B', '#7C2D12', '#0F172A'], 'chevron', null, null, ['speed', 'yellow']),
  p('sq-anime', 'Silent Sakura Square', 'Petals drift over a quiet village at dusk. The square format makes the scene feel like a memory — contained, precious, still.', ['#F472B6', '#831843', '#FEF3C7'], 'leaf', null, null, ['calm', 'pink', 'village']),
  p('sq-anime', 'Fox Spirit Square', 'Nine tails fan out at dusk, glowing amber. The square format centers the spirit — warm, autumnal, alive in a compact frame.', ['#F97316', '#7C2D12', '#1C1917'], 'burst', null, null, ['spirit', 'orange']),

  // ---- SQUARE FRAMES & CANVAS: MOVIES ----
  p('sq-movies', 'Neon Boulevard Square', 'A rain-soaked night in Los Angeles. The square format crops the scene to its essence — neon, rain, a figure walking away. Noir in miniature.', ['#EC4899', '#1E1B4B', '#FDE047'], 'film', null, null, ['noir', 'city', 'rain']),
  p('sq-movies', 'Desert Mirage Square', 'A sci-fi epic across the dunes. The square format focuses on the horizon — vast, empty, beautiful. A window to another world.', ['#D97706', '#78350F', '#FEF3C7'], 'chevron', null, null, ['sci-fi', 'desert']),
  p('sq-movies', 'Starfall Square', 'A war among the stars. The square format captures the full spread of the cosmos — indigo, violet, and warm yellow starlight in a perfect frame.', ['#6366F1', '#312E81', '#FDE68A'], 'burst', null, null, ['space', 'epic']),
  p('sq-movies', 'Concrete Jungle Square', 'The city as a character. The square format crops the skyline to its most iconic elements — every window a story, every edge precise.', ['#475569', '#1E293B', '#F59E0B'], 'film', null, null, ['urban', 'grit']),
  p('sq-movies', 'Golden Hour Heist Square', 'The last job at sunset. The square format tightens the tension — amber, brown, and black in a compressed, cinematic frame.', ['#F59E0B', '#7C2D12', '#111827'], 'film', null, null, ['crime', 'sunset']),

  // ---- SQUARE FRAMES & CANVAS: SPORTS ----
  p('sq-sports', 'The Bicycle Kick Square', 'Defying gravity, defining the game. The square format captures the player at the apex — suspended, powerful, iconic.', ['#F59E0B', '#7C2D12', '#0F172A'], 'chevron', null, null, ['football', 'iconic']),
  p('sq-sports', 'Last Second Shot Square', 'The buzzer-beater that echoed. The square format focuses on the ball and the clock — red, gold, and zero on the dial.', ['#DC2626', '#7F1D1D', '#FBBF24'], 'burst', null, null, ['basketball', 'clutch']),
  p('sq-sports', 'Knockout Punch Square', 'The fist that changed history. The square format compresses the power — deep red and gold on a black background, devastating in 12×12.', ['#B91C1C', '#450A0A', '#FCD34D'], 'burst', null, null, ['boxing', 'power']),
  p('sq-sports', 'The Slam Dunk Square', 'Above the rim, above the rest. The square format captures the full extension — purple and gold in a perfect, powerful square.', ['#7C3AED', '#4C1D95', '#FDE047'], 'burst', null, null, ['basketball', 'power']),
  p('sq-sports', 'Corner Flag Square', 'The celebration that shook the stadium. The square format focuses on the joy — green and gold, pure energy in a compact frame.', ['#16A34A', '#14532D', '#FBBF24'], 'chevron', null, null, ['football', 'joy']),

  // ---- SQUARE FRAMES & CANVAS: HOME DECOR ----
  p('sq-home-decor', 'Monstera Morning Square', 'Light through living leaves. The square format is perfect for botanical studies — green and cream in a balanced, calming composition.', ['#10B981', '#064E3B', '#FEF3C7'], 'leaf', null, null, ['botanical', 'green']),
  p('sq-home-decor', 'Ocean Calm Square', 'A still sea, a still mind. The square format enhances the meditation — blue and pale white in a perfectly balanced frame.', ['#0EA5E9', '#0C4A6E', '#E0F2FE'], 'leaf', null, null, ['calm', 'blue']),
  p('sq-home-decor', 'Line Face Square', 'One-line portrait, endless feeling. The square format is ideal for minimalist line art — charcoal and white in a contained, elegant frame.', ['#1E293B', '#0F172A', '#F8FAFC'], 'leaf', null, null, ['line-art', 'mono']),
  p('sq-home-decor', 'Bloom No. 7 Square', 'A single flower, fully seen. The square format centers the bloom — deep pink on dark, a study in focus and simplicity.', ['#BE185D', '#831843', '#FCE7F3'], 'leaf', null, null, ['floral', 'pink']),
  p('sq-home-decor', 'Brass Geometry Square', 'Warm metallic shapes on dark. The square format is ideal for geometric art — gold and indigo in a balanced, luxurious composition.', ['#A07E2F', '#7A5E22', '#1E1B4B'], 'burst', null, null, ['geometric', 'brass']),

  // ---- SQUARE FRAMES & CANVAS: MARVEL / DC ----
  p('sq-marvel-dc', 'Web Slinger Square', 'The hero in the half-light. The square format crops to the iconic pose — red and blue on a dark, urban background.', ['#DC2626', '#7F1D1D', '#1E3A8A'], 'burst', null, null, ['hero', 'red']),
  p('sq-marvel-dc', 'Thunder God Square', 'A hammer raised to the storm. The square format captures the full arc of the lightning — blue and gold in a powerful, contained frame.', ['#3B82F6', '#1E3A8A', '#FDE68A'], 'burst', null, null, ['hero', 'thunder']),
  p('sq-marvel-dc', 'Night Knight Square', 'The dark defender rises. The square format intensifies the shadow — charcoal and black with a single gold signal.', ['#1E293B', '#0F172A', '#FBBF24'], 'shield', null, null, ['hero', 'dark']),
  p('sq-marvel-dc', 'Shield Throw Square', 'The spin that won the war. The square format captures the shield mid-flight — blue and red in a perfectly circular composition.', ['#1D4ED8', '#1E3A8A', '#DC2626'], 'shield', null, null, ['hero', 'shield']),
  p('sq-marvel-dc', 'Green Rage Square', 'A smash heard round the world. The square format compresses the destruction — green and yellow in a powerful, contained frame.', ['#16A34A', '#14532D', '#FDE68A'], 'burst', null, null, ['hero', 'green']),

  // ---- SQUARE FRAMES & CANVAS: CUSTOM PRINTS ----
  p('sq-custom-prints', 'Your Photo, Square Frame', 'Upload your photo and we print it in a square glass-front frame with your choice of border color. Perfect for Instagram-style photos and symmetrical compositions.', ['#475569', '#1E293B', '#E2E8F0'], 'spark', null, null, ['photo', 'square']),
  p('sq-custom-prints', 'Your Photo, Square Canvas', 'Upload your photo and we print it on square gallery-wrapped canvas. The canvas texture gives photos a painted, artistic quality in a balanced format.', ['#92400E', '#451A03', '#FEF3C7'], 'spark', null, null, ['photo', 'canvas']),
  p('sq-custom-prints', 'Pet Portrait Square', 'Your companion, centered. Send us a photo of your pet and our artist will create a custom square portrait. Perfect for a gallery wall arrangement.', ['#F472B6', '#831843', '#FEF3C7'], 'leaf', null, null, ['pet', 'portrait']),
  p('sq-custom-prints', 'Quote Square', 'A sentence that stays with you. Send us a quote or lyric and we will design it as a square typographic print. The format gives text room to breathe.', ['#1E1B4B', '#0F172A', '#FDE68A'], 'spark', null, null, ['quote', 'text']),
  p('sq-custom-prints', 'Kids\' Doodle Square', 'Your child\'s art, gallery-grade. Send us a drawing and we will print it as a square piece — same lines, same colours, on premium material.', ['#EC4899', '#831843', '#FDE68A'], 'burst', null, null, ['kids', 'fun']),

  // ---- SQUARE FRAMES & CANVAS: GARAGE ----
  p('sq-garage', 'Midnight Muscle Square', 'A V8 under moonlight. The square format crops the muscle car to its most iconic elements — deep red and chrome in a powerful, compact frame.', ['#B91C1C', '#450A0A', '#475569'], 'chevron', null, null, ['muscle', 'classic', 'night']),
  p('sq-garage', 'Neon Drift Square', 'A JDM legend slicing through neon-lit rain. The square format captures the car and the neon in a perfectly contained moment of Tokyo midnight.', ['#0EA5E9', '#6D28D9', '#0F172A'], 'burst', null, null, ['jdm', 'neon', 'night']),
  p('sq-garage', 'Hypercar Dawn Square', 'The first light on carbon fibre. The square format focuses on the front end — blue, silver, and gold in a precise, technical composition.', ['#1E40AF', '#475569', '#FCD34D'], 'shield', null, null, ['hypercar', 'blue', 'dawn']),
  p('sq-garage', 'Circuit Breaker Square', 'The apex, the kerb, the perfect line. The square format captures the racing line in its purest form — red and white on dark asphalt.', ['#DC2626', '#1E293B', '#F8FAFC'], 'chevron', null, null, ['track', 'red', 'speed']),
  p('sq-garage', 'Lowrider Sunset Square', 'Chrome and candy paint at golden hour. The square format centers the lowrider — purple and gold in a perfectly balanced, stylish frame.', ['#7C3AED', '#4C1D95', '#FBBF24'], 'burst', null, null, ['lowrider', 'purple', 'sunset']),
];

// ============================================================
//  ASSEMBLED PRODUCTS — IDs assigned automatically
//  Photos: 4 generated angles per product (artwork seeds)
//  sizeChartImage: default ruler graphic; override per item
//  inStock: false items are filtered out of the storefront
//
//  SIZE CHART IMAGES:
//    Put your image files in:  public/size-charts/
//    Then set sizeChartImage to: "/size-charts/your-image.png"
//    The image is shown on each product's page under the size selector.
//    If you don't have one yet, it defaults to "/size-charts/default.png"
//    (create that file or change the path below)
// ============================================================
export const products: Product[] = rawProducts.map((rp, i) => ({
  ...rp,
  id: `p${String(i + 1).padStart(3, '0')}`,
  photos: [0, 1, 2, 3].map((n) => `${i + 1}-${n}`),
  sizeChartImage: '/size-charts/default.png',
}));

// ============================================================
//  HELPER FUNCTIONS — used by components, no need to edit
// ============================================================

// All in-stock products are visible (availability overlay handled by components)
export function productsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug && p.inStock);
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function productIndex(product: Product): number {
  return productsByCategory(product.category).findIndex((p) => p.id === product.id) + 1;
}

// Available variant types for a product
export type VariantType = 'framed' | 'canvas' | 'metal';
export function availableVariants(product: Product): VariantType[] {
  const v: VariantType[] = [];
  if (product.variants.framed) v.push('framed');
  if (product.variants.canvas) v.push('canvas');
  if (product.variants.metal) v.push('metal');
  return v;
}

// Product code format: SIZECODE-CATCODE-NN-V[-BORDER]
export function productCode(categoryCode: string, index: number, sizeId: string, variant: string, borderColorId?: string): string {
  const sizeCode = sizeId.toUpperCase().replace('X', '×').slice(0, 3);
  const n = String(index).padStart(2, '0');
  const v = variant === 'framed' ? 'F' : variant === 'canvas' ? 'C' : 'M';
  const bc = borderColorId ? `-${borderColorId.slice(0, 3).toUpperCase()}` : '';
  return `${sizeCode}-${categoryCode}-${n}-${v}${bc}`;
}

// Pricing: base size price + optional border color modifier
export function priceFor(product: Product, variant: VariantType, sizeId: string, borderColorId?: string): number {
  const v = product.variants[variant];
  if (!v) return 0;
  const size = v.sizes.find((s) => s.id === sizeId);
  if (!size) return 0;
  let price = size.price;
  if (borderColorId && v.borderColors) {
    const bc = v.borderColors.find((b) => b.id === borderColorId);
    if (bc?.priceModifier) price += bc.priceModifier;
  } else if (borderColorId && !v.borderColors) {
    const bc = standardBorderColors.find((b) => b.id === borderColorId);
    if (bc?.priceModifier) price += bc.priceModifier;
  }
  return price;
}

export function startingPrice(product: Product): number {
  const all: number[] = [];
  if (product.variants.framed) all.push(...product.variants.framed.sizes.map((s) => s.price));
  if (product.variants.canvas) all.push(...product.variants.canvas.sizes.map((s) => s.price));
  if (product.variants.metal) all.push(...product.variants.metal.sizes.map((s) => s.price));
  return all.length ? Math.min(...all) : 0;
}
