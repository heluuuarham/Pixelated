import { useState, useRef, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  getProduct, productIndex, productCode,
  priceFor, products, availableVariants, type Product, type VariantType,
} from '@/products';
import { getCategory, formatPrice, standardBorderColors } from '@/config';
import { isProductAvailable, isCategoryAvailable, isVariantAvailable, purchasableVariants } from '@/availability';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import Artwork from '@/components/Artwork';
import ProductCard from '@/components/ProductCard';
import { ChevronRight, Check, Minus, Plus, Truck, Shield, RotateCcw, Frame, Image, Layers, AlertCircle } from 'lucide-react';

function recommend(current: Product, all: Product[], limit = 4): Product[] {
  const scored = all
    .filter((p) => p.id !== current.id && p.inStock)
    .map((p) => {
      let score = 0;
      const shared = p.tags.filter((t) => current.tags.includes(t)).length;
      score += shared * 3;
      if (p.category === current.category) score += 2;
      const dist = colorDist(p.palette, current.palette);
      score += Math.max(0, 3 - dist);
      if (p.motif === current.motif) score += 1;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.p);
}

function colorDist(a: string[], b: string[]): number {
  const da = a.map(hexToRgb);
  const db = b.map(hexToRgb);
  let min = Infinity;
  for (const x of da) for (const y of db) {
    const d = Math.sqrt((x[0]-y[0])**2 + (x[1]-y[1])**2 + (x[2]-y[2])**2) / 441;
    if (d < min) min = d;
  }
  return min;
}
function hexToRgb(h: string): [number, number, number] {
  const v = h.replace('#', '');
  return [parseInt(v.slice(0,2),16), parseInt(v.slice(2,4),16), parseInt(v.slice(4,6),16)];
}

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProduct(id) : undefined;
  const { add } = useCart();
  const { push } = useToast();
  const flyRef = useRef<HTMLDivElement>(null);

  const variants = product ? availableVariants(product) : [];
  const purchasable = product ? purchasableVariants(product) : [];
  const [variantType, setVariantType] = useState<VariantType>('framed');
  const [sizeId, setSizeId] = useState('');
  const [borderColorId, setBorderColorId] = useState('');
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [adding, setAdding] = useState(false);

  const related = useMemo(() => {
    if (!product) return [];
    return recommend(product, products);
  }, [product]);

  if (!product) return <Navigate to="/categories" replace />;

  const productAvailable = isProductAvailable(product);
  const categoryAvailable = isCategoryAvailable(product.category);

  // Resolve effective variant — must be purchasable, fall back to first purchasable
  const effectiveVariant: VariantType = purchasable.includes(variantType) ? variantType : (purchasable[0] ?? variants[0] ?? 'framed');
  const variantInfo = product.variants[effectiveVariant];
  const sizes = variantInfo?.sizes ?? [];
  const effectiveSizeId = sizeId && sizes.find((s) => s.id === sizeId) ? sizeId : (sizes[0]?.id ?? '');
  const borderColors = effectiveVariant === 'framed' ? (variantInfo?.borderColors ?? standardBorderColors) : [];
  const effectiveBorderColorId = effectiveVariant === 'framed'
    ? (borderColorId && borderColors.find((b) => b.id === borderColorId) ? borderColorId : (borderColors[0]?.id ?? ''))
    : undefined;

  const category = getCategory(product.category)!;
  const idx = productIndex(product);
  const code = productCode(category.code, idx, effectiveSizeId, effectiveVariant, effectiveBorderColorId);
  const unitPrice = priceFor(product, effectiveVariant, effectiveSizeId, effectiveBorderColorId);
  const total = unitPrice * qty;

  const handleVariantChange = (v: VariantType) => {
    setVariantType(v);
    setSizeId('');
    setBorderColorId('');
  };

  const handleAdd = () => {
    setAdding(true);
    if (flyRef.current) {
      const fly = flyRef.current;
      const cart = document.querySelector('[data-cart-target]') as HTMLElement | null;
      if (cart) {
        const fr = fly.getBoundingClientRect();
        const cr = cart.getBoundingClientRect();
        fly.style.setProperty('--fly-x', `${cr.left - fr.left}px`);
        fly.style.setProperty('--fly-y', `${cr.top - fr.top}px`);
        fly.classList.add('animate-flyToCart');
      }
    }
    setTimeout(() => {
      add(product.id, effectiveVariant, effectiveSizeId, effectiveBorderColorId, qty);
      push(product.name, `${code} · ${qty} × ${formatPrice(unitPrice)}`);
      setAdding(false);
      setQty(1);
      if (flyRef.current) flyRef.current.classList.remove('animate-flyToCart');
    }, 700);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="shell pt-8 sm:pt-6">
        <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-400">
          <Link to="/" className="hover:text-brass-400">Home</Link>
          <ChevronRight size={12} />
          <Link to={`/category/${category.slug}`} className="hover:text-brass-400">{category.name}</Link>
          <ChevronRight size={12} />
          <span className="text-ink-100">{product.name}</span>
        </nav>
      </div>

      {/* Main */}
      <div className="shell grid gap-12 py-10 sm:gap-10 sm:py-8 lg:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <div>
          <div className="relative overflow-hidden rounded-sm border border-ink-100/10 bg-workshop-800">
            <div className="aspect-[4/5]">
              <Artwork palette={product.palette} motif={product.motif} seed={product.photos[activeImg]} className="h-full w-full" />
            </div>
            <div className="absolute left-3 top-3 rounded-sm bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-brass-400 backdrop-blur">
              {effectiveVariant === 'framed' ? 'Framed' : effectiveVariant === 'canvas' ? 'Canvas' : 'Metal'}
            </div>
            <div className="absolute right-3 top-3 rounded-sm bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white/80 backdrop-blur">
              {activeImg + 1} / {product.photos.length}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3 sm:mt-3">
            {product.photos.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`overflow-hidden rounded-sm border-2 transition-colors ${activeImg === i ? 'border-brass-500' : 'border-ink-100/10 hover:border-ink-100/30'}`}
              >
                <div className="aspect-[4/5]">
                  <Artwork palette={product.palette} motif={product.motif} seed={img} className="h-full w-full" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="eyebrow">{category.name}</p>
          <h1 className="mt-2 font-display text-5xl leading-[0.95] text-ink-50 md:text-6xl">{product.name}</h1>


          {/* Price */}
          <div className="mt-8 flex items-baseline gap-3 sm:mt-6">
            <span className="font-display text-4xl text-brass-400">{formatPrice(unitPrice)}</span>
            <span className="font-mono text-xs uppercase tracking-wider text-ink-400">per print</span>
          </div>

          {/* Product code */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-sm border border-ink-100/15 bg-workshop-800 px-3 py-1.5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-400">Product Code</span>
            <span className="font-mono text-xs font-bold text-brass-400">{code}</span>
          </div>

          {/* Description */}
          <p className="mt-6 text-sm leading-relaxed text-ink-300 sm:mt-5">{product.description}</p>

          {/* Variant selector */}
          {variants.length > 1 && (
            <div className="mt-6">
              <p className="label">Choose Your Style</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {variants.map((v) => {
                  const info = product.variants[v]!;
                  const minPrice = Math.min(...info.sizes.map((s) => s.price));
                  const isSelected = effectiveVariant === v;
                  const vAvailable = isVariantAvailable(product.category, v);
                  const icon = v === 'framed' ? <Frame size={18} className={isSelected ? 'text-brass-400' : 'text-ink-300'} /> : v === 'canvas' ? <Image size={18} className={isSelected ? 'text-brass-400' : 'text-ink-300'} /> : <Layers size={18} className={isSelected ? 'text-brass-400' : 'text-ink-300'} />;
                  const label = v === 'framed' ? 'Framed (Glass + Wooden Frame)' : v === 'canvas' ? 'Canvas (Wooden Frame)' : 'Metal (Brushed Aluminium)';
                  const desc = v === 'framed' ? 'Glass-front frame with selectable border color. Premium gallery finish.' : v === 'canvas' ? 'Gallery-wrapped canvas on a wooden frame. No border color option.' : 'High-contrast print on brushed aluminium. Deep blacks, bright highlights.';
                  return (
                    <button
                      key={v}
                      onClick={() => vAvailable && handleVariantChange(v)}
                      disabled={!vAvailable}
                      className={`relative flex flex-col items-start gap-2 rounded-sm border p-4 text-left transition-all ${
                        !vAvailable
                          ? 'border-ink-100/10 bg-ink-900/20 cursor-not-allowed'
                          : isSelected
                            ? 'border-brass-500 bg-brass-500/10'
                            : 'border-ink-100/15 hover:border-ink-100/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {icon}
                        <span className={`font-display text-base ${!vAvailable ? 'text-ink-400' : isSelected ? 'text-brass-400' : 'text-ink-100'}`}>{label}</span>
                      </div>
                      <p className={`text-[11px] ${!vAvailable ? 'text-ink-500' : 'text-ink-400'}`}>{vAvailable ? desc : 'Currently unavailable for this collection.'}</p>
                      {vAvailable ? (
                        <span className="font-mono text-[10px] text-ink-300">From {formatPrice(minPrice)}</span>
                      ) : (
                        <span className="font-mono text-[10px] uppercase tracking-wider text-ink-400">Not Available</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {variants.length === 1 && (
            <div className="mt-6">
              <p className="label">Variant</p>
              <div className={`rounded-sm border px-4 py-3 ${productAvailable ? 'border-ink-100/15 bg-workshop-800' : 'border-ink-100/10 bg-ink-900/20'}`}>
                <span className={`font-display text-lg ${productAvailable ? 'text-ink-50' : 'text-ink-400'}`}>
                  {effectiveVariant === 'framed' ? 'Framed (Glass + Wooden Frame)' : effectiveVariant === 'canvas' ? 'Canvas (Wooden Frame)' : 'Metal (Brushed Aluminium)'}
                </span>
                <p className="mt-0.5 text-[11px] text-ink-400">
                  {productAvailable
                    ? (effectiveVariant === 'framed'
                      ? 'Glass-front frame with selectable border color.'
                      : effectiveVariant === 'canvas'
                        ? 'Gallery-wrapped canvas on a wooden frame. No border color option.'
                        : 'High-contrast print on brushed aluminium. Deep blacks, bright highlights.')
                    : 'Currently unavailable for this collection.'}
                </p>
              </div>
            </div>
          )}

          {/* Border color selector (framed only) */}
          {effectiveVariant === 'framed' && borderColors.length > 0 && (
            <div className="mt-6">
              <p className="label">Frame Border Color</p>
              <div className="flex flex-wrap gap-2">
                {borderColors.map((bc) => (
                  <button
                    key={bc.id}
                    onClick={() => setBorderColorId(bc.id)}
                    className={`flex items-center gap-2 rounded-sm border px-3 py-2.5 transition-all ${effectiveBorderColorId === bc.id ? 'border-brass-500 bg-brass-500/10' : 'border-ink-100/15 hover:border-ink-100/30'}`}
                  >
                    <span className="h-5 w-5 rounded-full border border-ink-100/20" style={{ background: bc.hex }} />
                    <span className={`text-xs font-mono ${effectiveBorderColorId === bc.id ? 'text-brass-400' : 'text-ink-200'}`}>{bc.name}</span>
                    {bc.priceModifier ? <span className="text-[10px] text-ink-400">+{formatPrice(bc.priceModifier)}</span> : null}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          {sizes.length > 0 && (
            <div className="mt-6">
              <p className="label">Size</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {sizes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSizeId(s.id)}
                    className={`rounded-sm border py-2.5 text-center transition-all ${effectiveSizeId === s.id ? 'border-brass-500 bg-brass-500/10' : 'border-ink-100/15 hover:border-ink-100/30'}`}
                  >
                    <span className={`block font-mono text-xs font-bold ${effectiveSizeId === s.id ? 'text-brass-400' : 'text-ink-100'}`}>{s.label.split('·')[0].trim()}</span>
                    <span className="mt-0.5 block text-[9px] text-ink-400">{s.label.split('·')[1]?.trim() ?? ''}</span>
                    <span className="mt-0.5 block font-mono text-[10px] text-ink-300">{formatPrice(s.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size chart image */}
          {product.sizeChartImage && (
            <div className="mt-6">
              <p className="label">Size Chart</p>
              <div className="overflow-hidden rounded-sm border border-ink-100/10 bg-workshop-800">
                <img src={product.sizeChartImage} alt={`${product.name} size chart`} className="h-auto w-full" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
              <p className="mt-2 font-mono text-[10px] text-ink-400">Add your size chart image to: public/size-charts/</p>
            </div>
          )}

          {/* Qty + Add */}
          {productAvailable ? (
          <div className="mt-10 flex items-center gap-3 sm:mt-8">
            <div className="flex items-center rounded-sm border border-ink-100/15">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-14 w-14 place-items-center text-ink-300 hover:text-brass-400 sm:h-12 sm:w-12"><Minus size={16} /></button>
              <span className="w-10 text-center font-mono text-lg font-bold text-ink-50">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="grid h-14 w-14 place-items-center text-ink-300 hover:text-brass-400 sm:h-12 sm:w-12"><Plus size={16} /></button>
            </div>
            <button onClick={handleAdd} disabled={adding} className="relative flex-1">
              <span className="btn-primary w-full justify-center text-sm">
                {adding ? 'Adding…' : `Add to Cart · ${formatPrice(total)}`}
              </span>
              <div ref={flyRef} className="pointer-events-none absolute left-0 top-0 h-16 w-16 opacity-0">
                <Artwork palette={product.palette} motif={product.motif} seed={product.id} className="h-full w-full rounded-sm" />
              </div>
            </button>
          </div>
          ) : (
          <div className="mt-10 sm:mt-8">
            <div className="flex items-center gap-3 rounded-sm border border-ink-100/15 bg-ink-900/30 px-5 py-4">
              <AlertCircle size={20} className="text-ink-300" />
              <div>
                <p className="font-display text-lg text-ink-50">Not Available</p>
                <p className="mt-0.5 text-sm text-ink-400">This product is currently out of stock or its collection is unavailable. Please check back soon.</p>
              </div>
            </div>
          </div>
          )}

          {/* Trust badges */}
          <div className="mt-10 grid grid-cols-3 gap-3 border-t border-ink-100/10 pt-8 sm:mt-8 sm:pt-6">
            {[
              { icon: Truck, label: 'Free over Rs.5000' },
              { icon: Shield, label: 'Quality guaranteed' },
              { icon: RotateCcw, label: '7-day returns' },
            ].map((b, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 text-center">
                <b.icon size={18} className="text-brass-500" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-400">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <section className="shell py-12 sm:py-16">
        <div className="mb-10 flex items-end justify-between sm:mb-8">
          <div>
            <p className="eyebrow flex items-center gap-2"><Check size={12} /> AI-curated for you</p>
            <h2 className="mt-2 font-display text-3xl text-ink-50 md:text-4xl">You May Also Like</h2>
            <p className="mt-1 text-sm text-ink-400">Recommended based on style, palette and theme similarity.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:gap-4 md:grid-cols-4">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
