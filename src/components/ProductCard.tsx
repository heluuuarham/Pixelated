import { Link } from 'react-router-dom';
import { type Product, startingPrice, availableVariants } from '@/products';
import { formatPrice, getCategory } from '@/config';
import { isProductAvailable } from '@/availability';
import ProductPhoto from './ProductPhoto';

export default function ProductCard({ product }: { product: Product }) {
  const cat = getCategory(product.category);
  const variants = availableVariants(product);
  const available = isProductAvailable(product);
  return (
    <Link
      to={`/product/${product.id}`}
      className="group/card relative block transition-all duration-300 group-hover/list:opacity-50 hover:!opacity-100 hover:!scale-[1.02] hover:z-10"
    >
      {/* Glow */}
      <div className="pointer-events-none absolute -inset-3 rounded-lg bg-blue-900/0 blur-2xl transition-all duration-500 group-hover/card:bg-blue-900/50 dark:bg-brass-500/0 dark:group-hover/card:bg-brass-500/40" />

      <div className={`relative overflow-hidden rounded-sm border border-ink-100/10 bg-workshop-800 transition-all duration-300 ${available ? 'group-hover/card:border-brass-500/40' : ''}`}>
        <div className="aspect-[4/5] overflow-hidden">
          <ProductPhoto product={product} className="h-full w-full transition-transform duration-500 group-hover/card:scale-105" />
        </div>

        {/* Gray overlay when unavailable */}
        {!available && (
          <div className="absolute inset-0 z-10 bg-ink-900/50" />
        )}

        {available ? (
        <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-brass-500 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-workshop-900">View Print</span>
        </div>
        ) : (
        <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-ink-900/80 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-ink-300">Not Available</span>
        </div>
        )}
        <div className="absolute right-2 top-2 z-20 rounded-sm bg-black/60 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-white/80 backdrop-blur">
          {cat?.code}
        </div>
        <div className="absolute left-2 top-2 z-20 flex flex-col gap-1">
          {variants.map((v) => (
            <span key={v} className="rounded-sm bg-black/60 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-white/80 backdrop-blur">
              {v === 'framed' ? 'Framed' : v === 'canvas' ? 'Canvas' : 'Metal'}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-3.5 sm:mt-3">
        <h3 className={`font-display text-base leading-tight transition-colors ${available ? 'text-ink-50 group-hover/card:text-brass-400' : 'text-ink-400'}`}>{product.name}</h3>
        <p className="mt-1 line-clamp-1 text-xs text-ink-400 sm:mt-0.5">{product.description}</p>
        <p className="mt-2 font-mono text-xs text-ink-300 sm:mt-1.5">From <span className={`font-bold ${available ? 'text-ink-50' : 'text-ink-400'}`}>{formatPrice(startingPrice(product))}</span></p>
      </div>
    </Link>
  );
}
