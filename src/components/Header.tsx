import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { formatCategories } from '@/config';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const { count } = useCart();
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => { setOpen(false); }, [loc.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const logoSrc = theme === 'dark' ? '/image-removebg-preview.png' : '/image__1_-removebg-preview.png';

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-300 ${scrolled ? 'bg-workshop-900/95 backdrop-blur-md border-b border-ink-100/10' : 'bg-transparent'}`}>
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link to="/" aria-label="Pixelated home" className="flex shrink-0 items-center">
          <img src={logoSrc} alt="Pixelated" className="logo-img h-11 w-11 object-contain sm:h-12 sm:w-12" />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          <NavLink to="/" end className="font-mono text-xs uppercase tracking-widest text-ink-300 hover:text-brass-400 transition-colors">Home</NavLink>
          <NavLink to="/categories" className="font-mono text-xs uppercase tracking-widest text-ink-300 hover:text-brass-400 transition-colors">Shop</NavLink>
          {formatCategories.map((f) => (
            <NavLink
              key={f.slug}
              to={f.link ?? `/categories/${f.slug}`}
              className="font-mono text-xs uppercase tracking-widest text-ink-300 hover:text-brass-400 transition-colors"
            >
              {f.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/cart" data-cart-target className="relative grid h-11 w-11 place-items-center rounded-sm border border-ink-100/15 text-ink-100 hover:border-brass-500 hover:text-brass-400 transition-colors sm:h-10 sm:w-10">
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-brass-500 px-1 font-mono text-[10px] font-bold text-workshop-900">{count}</span>
            )}
          </Link>
          <button onClick={() => setOpen((v) => !v)} className="grid h-11 w-11 place-items-center rounded-sm border border-ink-100/15 text-ink-100 lg:hidden sm:h-10 sm:w-10">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-ink-100/10 bg-workshop-800">
          <div className="shell py-5 sm:py-4">
            <Link to="/" className="block py-3 font-mono text-sm uppercase tracking-widest text-ink-100 sm:py-2">Home</Link>
            <Link to="/categories" className="block py-3 font-mono text-sm uppercase tracking-widest text-ink-100 sm:py-2">Shop</Link>
            <div className="my-3 h-px bg-ink-100/10 sm:my-2" />
            {formatCategories.map((f) => (
              <Link key={f.slug} to={f.link ?? `/categories/${f.slug}`} className="block py-3 text-sm text-ink-300 sm:py-2">
                {f.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
