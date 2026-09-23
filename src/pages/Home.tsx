import { Link } from 'react-router-dom';
import { formatCategories, site } from '@/config';
import { products } from '@/products';
import { allFormatCategories } from '@/availability';
import FormatCard from '@/components/FormatCard';
import ProductCard from '@/components/ProductCard';
import Artwork from '@/components/Artwork';
import { ArrowRight, Truck, Shield, Palette, Sparkles, Frame, Image as ImageIcon } from 'lucide-react';

export default function Home() {
  const featured = products.filter((p) => p.inStock).slice(0, 8);
  const heroArt = products.filter((p) => p.inStock)[0] ?? products[0];

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
            <p className="eyebrow animate-fadeUp" style={{ color: '#e8b04b' }}>Premium Wall Art Prints</p>
            <h1 className="mt-4 font-display text-6xl leading-[0.9] text-white sm:text-7xl md:text-8xl" style={{ animationDelay: '0.1s' }}>
              Wall Art<br />That Speaks.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/80" style={{ animationDelay: '0.2s' }}>
              Anime, movies, sports, home decor, Marvel/DC, custom prints and garage art — on frames, canvas, metal and posters. Built for your walls.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 sm:mt-8" style={{ animationDelay: '0.3s' }}>
              <Link to="/categories/frames-canvas" className="btn-brass">
                Shop All Collections <ArrowRight size={16} />
              </Link>
              <Link to="/category/custom-prints" className="btn-ghost !text-white !border-white/40 hover:!bg-white/10">
                Create Custom Print
              </Link>
            </div>
          </div>
        </div>
               {/* Stats strip */}
        <div className="shell relative pb-12 sm:pb-10">
          <div className="grid grid-cols-2 gap-5 border-t border-ink-100/10 pt-8 sm:gap-4 sm:pt-6 md:grid-cols-4">
            {[
              { icon: Palette, label: '90+ Designs', sub: 'Across 6 collections' },
              { icon: Sparkles, label: 'Framed & Canvas', sub: 'Glass-front or wood frame' },
              { icon: Truck, label: 'Free Shipping', sub: `Over Rs.${site.freeShippingThreshold.toLocaleString()}` },
              { icon: Shield, label: 'Quality Guaranteed', sub: 'Museum-grade print' },
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
       <style>{`
  .aurora-blob {
    position: absolute;
    width: 22vw;
    height: 22vw;
    max-width: 320px;
    max-height: 320px;
    border-radius: 50%;
    filter: blur(110px);
  }
  .aurora-blob-1 {
    top: 5%;
    right: 5%;
    animation: auroraDrift1 24s ease-in-out infinite;
  }
  .aurora-blob-2 {
    bottom: 5%;
    left: 30%;
    animation: auroraDrift2 28s ease-in-out infinite;
  }
  @keyframes auroraDrift1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-6%, 8%) scale(1.15); }
  }
  @keyframes auroraDrift2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(6%, -6%) scale(0.9); }
  }
`}</style>
      </section>

      {/* FORMATS — top-level print format cards */}
      <section className="shell py-12 sm:py-16">
        <div className="mb-10 flex items-end justify-between sm:mb-8">
          <div>
            <p className="eyebrow">Choose your format</p>
            <h2 className="mt-2 font-display text-4xl text-ink-50 md:text-5xl">Print Formats</h2>
          </div>
        </div>
        <div className="grid gap-5 sm:gap-4 md:grid-cols-3">
          {allFormatCategories().map((f) => (
            <FormatCard key={f.slug} format={f} />
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="shell py-12 sm:py-16">
        <div className="mb-10 flex items-end justify-between sm:mb-8">
          <div>
            <p className="eyebrow">Curated this week</p>
            <h2 className="mt-2 font-display text-4xl text-ink-50 md:text-5xl">Featured Prints</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:gap-4 md:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* VARIANTS STRIP */}
      <section className="shell py-12 sm:py-16">
        <div className="rounded-sm border border-ink-100/10 bg-workshop-800 p-6 sm:p-8 md:p-12">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-8">
            <div>
              <p className="eyebrow">Choose your style</p>
              <h2 className="mt-2 font-display text-4xl text-ink-50 md:text-5xl">Framed. Canvas.</h2>
              <p className="mt-4 max-w-md leading-relaxed text-ink-300">Every design is available as a glass-front framed print with your choice of border color, or as a gallery-wrapped canvas on a wooden frame. Premium materials, made to order.</p>
              <Link to="/categories/frames-canvas" className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brass-400 hover:text-brass-500 sm:mt-6">
                Explore Collections <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-3">
              {[
                { name: 'Framed', desc: 'Glass front + border color', icon: Frame },
                { name: 'Canvas', desc: 'Wooden frame, gallery-wrapped', icon: ImageIcon },
              ].map((m) => (
                <div key={m.name} className="rounded-sm border border-ink-100/10 p-4 text-center">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-brass-500/10">
                    <m.icon size={26} className="text-brass-400" />
                  </div>
                  <p className="font-display text-lg text-ink-50">{m.name}</p>
                  <p className="mt-1 text-[11px] text-ink-400">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="shell py-12 sm:py-16">
        <div className="relative overflow-hidden rounded-sm border border-ink-100/10 p-8 text-center sm:p-10 md:p-16" style={{ background: 'linear-gradient(135deg, #12233A, #2A3F5E)' }}>
          <h2 className="font-display text-4xl text-white md:text-6xl">Your Wall, Your Story.</h2>
          <p className="mx-auto mt-4 max-w-md text-white/80">Upload your own photo or artwork and we'll print it on your chosen material and size.</p>
          <Link to="/category/custom-prints" className="mt-8 inline-flex items-center gap-2 rounded-sm bg-white px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-workshop-900 hover:bg-ink-100 transition-colors sm:mt-6 sm:py-3">
            Start Custom Print <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
