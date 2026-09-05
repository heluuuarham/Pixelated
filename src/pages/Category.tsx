import { useParams, Link, Navigate } from 'react-router-dom';
import { getCategory } from '@/config';
import { productsByCategory, startingPrice } from '@/products';
import { isCategoryAvailable } from '@/availability';
import ProductCard from '@/components/ProductCard';
import { ChevronRight, SlidersHorizontal, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategory(slug) : undefined;
  const [sort, setSort] = useState<'featured' | 'low' | 'high'>('featured');

  if (!category) return <Navigate to="/categories" replace />;

  const categoryAvailable = isCategoryAvailable(category.slug);
  let list = productsByCategory(category.slug);
  if (sort === 'low') list = [...list].sort((a, b) => startingPrice(a) - startingPrice(b));
  if (sort === 'high') list = [...list].sort((a, b) => startingPrice(b) - startingPrice(a));

  return (
    <div>
      {/* Category hero */}
      <div className="relative overflow-hidden border-b border-ink-100/10">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${category.gradient[0]}, ${category.gradient[1]})` }} />
        <div className="absolute inset-0 bg-black/40" />
        <div className="shell relative py-14 md:py-20">
          <nav className="mb-8 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-white/70 sm:mb-6">
            <Link to="/" className="hover:text-brass-400">Home</Link>
            <ChevronRight size={12} />
            <Link to="/categories" className="hover:text-brass-400">Categories</Link>
            <ChevronRight size={12} />
            <span className="text-white">{category.name}</span>
          </nav>
          <p className="eyebrow text-white/80">{category.tagline}</p>
          <h1 className="mt-2 font-display text-6xl text-white md:text-7xl">{category.name}</h1>
          <p className="mt-4 max-w-xl leading-relaxed text-white/80 sm:mt-3">{category.description}</p>
          <p className="mt-5 font-mono text-xs uppercase tracking-widest text-white/60 sm:mt-4">{categoryAvailable ? `${list.length} prints available` : 'Not Available'}</p>
        </div>
      </div>

      {/* Not Available banner */}
      {!categoryAvailable && (
        <div className="shell py-8">
          <div className="flex items-center gap-3 rounded-sm border border-ink-100/15 bg-ink-900/30 px-5 py-4">
            <AlertCircle size={20} className="text-ink-300" />
            <div>
              <p className="font-display text-lg text-ink-50">This collection is currently not available</p>
              <p className="mt-0.5 text-sm text-ink-400">We're temporarily unable to fulfill orders for {category.name}. Please check back soon.</p>
            </div>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="shell flex items-center justify-between py-8 sm:py-6">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink-400">
          <SlidersHorizontal size={14} />
          <span>Sort</span>
        </div>
        <div className="flex gap-1 rounded-sm border border-ink-100/10 p-0.5">
          {([['featured', 'Featured'], ['low', 'Price ↑'], ['high', 'Price ↓']] as const).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setSort(k)}
              className={`rounded-sm px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors sm:px-3 sm:py-1.5 ${sort === k ? 'bg-brass-500 text-workshop-900' : 'text-ink-400 hover:text-ink-100'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid — always shown, unavailable products get gray overlay */}
      <div className="shell pb-16">
        <div className="grid grid-cols-2 gap-5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
