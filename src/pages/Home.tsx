import { Link } from 'react-router-dom';
import { categoriesByFormat, site } from '@/config';
import { getFeaturedProducts } from '@/products';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import RequestItemBox from '@/components/RequestItemBox';
import { ArrowRight, Truck, Shield, Palette, Sparkles } from 'lucide-react';

export default function Home() {
  const featured = getFeaturedProducts();
  const categories = categoriesByFormat('metal-poster');

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/og-preview.jpg"
            className="h-full w-full object-cover"
          >
            <source src="/videos/hero-loop.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="shell relative flex min-h-[88vh] flex-col justify-center pt-40 pb-16 sm:pt-20 sm:pb-20">
          <div className="max-w-2xl">
            <p className="eyebrow animate-fadeUp" style={{ color: '#e8b04b' }}>Premium Metal Wall Art</p>
            <h1 className="mt-4 font-display text-6xl leading-[0.9] text-white sm:text-7xl md:text-8xl">
              Wall Art<br />That Speaks.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/80">
              Anime, movies, sports, home decor, Marvel/DC, custom prints and garage art — all printed on premium brushed aluminium.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 sm:mt-8">
              <Link to="/categories/metal-poster" className="btn-brass">
                Shop Metal Posters <ArrowRight size={16} />
              </Link>
              <Link to="/category/metal-custom" className="btn-ghost !text-white !border-white/40 hover:!bg-white/10">
                Create Custom Print
              </Link>
            </div>
          </div>
        </div>

        <div className="shell relative pb-12 sm:pb-10">
          <div className="grid grid-cols-2 gap-5 border-t border-ink-100/10 pt-8 sm:gap-4 sm:pt-6 md:grid-cols-4">
            {[
              { icon: Palette, label: '105+ Designs', sub: 'Across 7 live collections' },
              { icon: Sparkles, label: 'Metal Only', sub: 'Brushed aluminium finish' },
              { icon: Truck, label: 'Free Shipping', sub: `Over Rs.${site.freeShippingThreshold.toLocaleString()}` },
              { icon: Shield, label: 'Quality Guaranteed', sub: 'Premium print finish' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 py-1">
                <s.icon size={20} className="!text-brass-400" />
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-wider !text-white">{s.label}</p>
                  <p className="text-[11px] !text-white/60">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THEMES */}
      <section className="shell py-12 sm:py-16">
        <div className="mb-8 flex items-end justify-between sm:mb-7">
          <div>
            <p className="eyebrow">One format. Twelve collections.</p>
            <h2 className="mt-2 font-display text-4xl text-ink-50 md:text-5xl">Browse Collections</h2>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {categories.map((c) => <CategoryCard key={c.slug} category={c} />)}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="shell py-12 sm:py-16">
        <div className="mb-8 flex items-end justify-between sm:mb-7">
          <div>
            <p className="eyebrow">Curated this week</p>
            <h2 className="mt-2 font-display text-4xl text-ink-50 md:text-5xl">Featured Prints</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:gap-4 md:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="shell py-12 sm:py-16">
        <div className="relative overflow-hidden rounded-sm border border-ink-100/10 p-8 text-center sm:p-10 md:p-16" style={{ background: 'linear-gradient(135deg, #12233A, #2A3F5E)' }}>
          <h2 className="font-display text-4xl text-white md:text-6xl">Your Wall, Your Story.</h2>
          <p className="mx-auto mt-4 max-w-md text-white/80">Upload your own photo or artwork and we'll print it on premium brushed aluminium.</p>
          <Link to="/category/metal-custom" className="mt-8 inline-flex items-center gap-2 rounded-sm bg-white px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-workshop-900 hover:bg-ink-100 transition-colors sm:mt-6 sm:py-3">
            Start Custom Print <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <RequestItemBox />
    </div>
  );
}
