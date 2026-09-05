import { Link } from 'react-router-dom';
import { type FormatCategory } from '@/config';
import { products } from '@/products';
import { isFormatAvailable } from '@/availability';
import Artwork from './Artwork';
import { ArrowUpRight } from 'lucide-react';

export default function FormatCard({ format }: { format: FormatCategory }) {
  const sample = products.filter((p) => p.inStock).slice(0, 3);
  const link = format.link ?? `/categories/${format.slug}`;
  const available = isFormatAvailable(format.slug);

  return (
    <Link to={link} className="group block">
      <div
        className={`group relative block overflow-hidden rounded-sm border border-ink-100/10 bg-workshop-800 transition-all duration-300 ${available ? 'hover:border-brass-500/40' : ''} aspect-[4/5]`}
      >
        {/* Background gradient */}
        <div
          className="absolute inset-0 opacity-90 transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `linear-gradient(135deg, ${format.gradient[0]}, ${format.gradient[1]})` }}
        />
        {/* Sample art peeking */}
        <div className="absolute bottom-0 right-0 flex items-end justify-end gap-1 overflow-hidden p-3 opacity-40 h-1/2 w-1/2">
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
              {available ? 'Shop Now' : 'Not Available'}
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition-all duration-300 group-hover:bg-brass-500 group-hover:text-workshop-900">
              <ArrowUpRight size={18} />
            </span>
          </div>
          <div>
            <p className="eyebrow mb-1">{format.tagline}</p>
            <h3 className="font-display leading-[0.95] text-white text-3xl">{format.name}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
}
