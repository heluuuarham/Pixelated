import { categories, categoriesByFormat, formatCategories } from '@/config';
import { allCategories } from '@/availability';
import CategoryCard from '@/components/CategoryCard';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Categories() {
  const { format } = useParams<{ format?: string }>();
  const fmt = format ? formatCategories.find((f) => f.slug === format) : undefined;
  const list = format ? allCategories(format) : allCategories();
  const title = fmt?.name ?? 'All Collections';
  const subtitle = fmt?.description ?? 'Six collections. 90+ designs. Each print available as a glass-front framed print or gallery-wrapped canvas, in your choice of size.';

  return (
    <div className="shell py-14 sm:py-12">
      <nav className="mb-8 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-400 sm:mb-6">
        <Link to="/" className="hover:text-brass-400">Home</Link>
        <ChevronRight size={12} />
        <span className="text-ink-100">{title}</span>
      </nav>
      <div className="mb-12 sm:mb-10">
        <p className="eyebrow">{fmt ? fmt.tagline : 'All collections'}</p>
        <h1 className="mt-2 font-display text-5xl text-ink-50 md:text-6xl">Shop {title}</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink-300 sm:mt-3">{subtitle}</p>
      </div>
      <div className="grid gap-5 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => <CategoryCard key={c.slug} category={c} />)}
      </div>
    </div>
  );
}
