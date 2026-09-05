import { Link } from 'react-router-dom';
import { type Category } from '@/config';
import { productsByCategory } from '@/products';
import { isCategoryAvailable } from '@/availability';
import Artwork from './Artwork';
import { ArrowUpRight } from 'lucide-react';

export default function CategoryCard({ category, large = false }: { category: Category; large?: boolean }) {
  const sample = productsByCategory(category.slug).slice(0, 3);
  const available = isCategoryAvailable(category.slug);
  const count = productsByCategory(category.slug).length;

  return (
    <Link
      to={`/category/${category.slug}`}
      className={`group relative block overflow-hidden rounded-sm border border-ink-100/10 bg-workshop-800 transition-all duration-300 ${available ? 'hover:border-brass-500/40' : ''} ${large ? 'aspect-[16/10] md:aspect-[16/9]' : 'aspect-[4/5]'}`}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-90 transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `linear-gradient(135deg, ${category.gradient[0]}, ${category.gradient[1]})` }}
      />
      {/* Sample art peeking */}
      <div className={`absolute bottom-0 right-0 flex items-end justify-end gap-1 overflow-hidden p-3 opacity-40 ${large ? 'h-3/4 w-3/5' : 'h-1/2 w-1/2'}`}>
        {sample.map((p) => (
          <div key={p.id} className="h-full flex-1 overflow-hidden rounded-sm">
            <Artwork palette={p.palette} motif={p.motif} seed={p.id} className="h-full w-full" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Gray overlay when unavailable */}
      {!available && (
        <div className="absolute inset-0 z-10 bg-ink-900/50" />
      )}

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between p-6">
        <div className="flex items-start justify-between">
          <span className={`rounded-sm px-2 py-1 font-mono text-[10px] uppercase tracking-widest backdrop-blur ${available ? 'bg-black/50 text-white' : 'bg-ink-900/80 text-ink-300'}`}>
            {available ? `${count} prints` : 'Not Available'}
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition-all duration-300 group-hover:bg-brass-500 group-hover:text-workshop-900">
            <ArrowUpRight size={18} />
          </span>
        </div>
        <div>
          <p className="eyebrow mb-1">{category.tagline}</p>
          <h3 className={`font-display leading-[0.95] text-white ${large ? 'text-5xl md:text-7xl' : 'text-3xl'}`}>{category.name}</h3>
          {large && <p className="mt-3 max-w-md text-sm text-white/80">{category.description}</p>}
        </div>
      </div>
    </Link>
  );
}
