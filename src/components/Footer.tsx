import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone } from 'lucide-react';
import { site, formatCategories } from '@/config';
import { useTheme } from '@/context/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();
  const logoSrc = theme === 'dark' ? '/image-removebg-preview.png' : '/image__1_-removebg-preview.png';

  return (
    <footer className="mt-24 border-t border-ink-100/10 bg-workshop-800">
      <div className="shell py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" aria-label="Pixelated home" className="inline-flex items-center">
              <img src={logoSrc} alt="Pixelated" className="logo-img h-16 w-16 object-contain" />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-ink-400">{site.tagline} Premium wall art prints as glass-front framed prints or gallery-wrapped canvas. Made for your walls, shipped across Pakistan.</p>
            <div className="mt-5 flex gap-3">
              <a href="#" className="grid h-9 w-9 place-items-center rounded-sm border border-ink-100/15 text-ink-300 hover:border-brass-500 hover:text-brass-400 transition-colors"><Instagram size={16} /></a>
              <a href={`mailto:${site.email}`} className="grid h-9 w-9 place-items-center rounded-sm border border-ink-100/15 text-ink-300 hover:border-brass-500 hover:text-brass-400 transition-colors"><Mail size={16} /></a>
              <a href={`tel:${site.whatsapp}`} className="grid h-9 w-9 place-items-center rounded-sm border border-ink-100/15 text-ink-300 hover:border-brass-500 hover:text-brass-400 transition-colors"><Phone size={16} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brass-500">Shop</h4>
            <ul className="mt-4 space-y-2">
              {formatCategories.map((f) => (
                <li key={f.slug}><Link to={f.link ?? `/categories/${f.slug}`} className="text-sm text-ink-300 hover:text-ink-50 transition-colors">{f.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brass-500">Help</h4>
            <ul className="mt-4 space-y-2">
              <li><Link to="/cart" className="text-sm text-ink-300 hover:text-ink-50 transition-colors">Cart</Link></li>
              <li><Link to="/checkout" className="text-sm text-ink-300 hover:text-ink-50 transition-colors">Checkout</Link></li>
              <li><a href={`mailto:${site.email}`} className="text-sm text-ink-300 hover:text-ink-50 transition-colors">Email Us</a></li>
              <li><span className="text-sm text-ink-300">Free shipping over {site.currency}{site.freeShippingThreshold.toLocaleString()}</span></li>
              <li><Link to="/terms" className="text-sm text-ink-300 hover:text-ink-50 transition-colors">Terms &amp; Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-ink-100/10 pt-6 sm:flex-row">
          <p className="font-mono text-[11px] text-ink-400">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="font-mono text-[11px] text-ink-400">Printed in Pakistan · Shipped nationwide</p>
        </div>
      </div>
    </footer>
  );
}
