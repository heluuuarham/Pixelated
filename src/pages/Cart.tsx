import { Link } from 'react-router-dom';
import { useCart, getProductForCart } from '@/context/CartContext';
import { formatPrice, site, standardBorderColors } from '@/config';
import Artwork from '@/components/Artwork';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ChevronRight, Truck } from 'lucide-react';

export default function Cart() {
  const { items, remove, setQty, subtotal, remainingForFree } = useCart();

  if (items.length === 0) {
    return (
      <div className="shell py-20">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full border border-ink-100/15">
            <ShoppingBag size={32} className="text-ink-400" />
          </div>
          <h1 className="font-display text-4xl text-ink-50">Your Cart is Empty</h1>
          <p className="mt-3 text-ink-400">Looks like you haven't added any prints yet.</p>
          <Link to="/categories" className="mt-6 inline-flex btn-brass">
            Browse Collections <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="shell py-12 sm:py-10">
      <nav className="mb-8 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-400 sm:mb-6">
        <Link to="/" className="hover:text-brass-400">Home</Link>
        <ChevronRight size={12} />
        <span className="text-ink-100">Cart</span>
      </nav>

      <h1 className="mb-10 font-display text-5xl text-ink-50 md:text-6xl sm:mb-8">Your Cart</h1>

      <div className="grid gap-10 lg:grid-cols-3 sm:gap-8">
        {/* Items */}
        <div className="lg:col-span-2">
          {/* Free shipping progress */}
          {remainingForFree > 0 ? (
            <div className="mb-5 flex items-center gap-3 rounded-sm border border-brass-500/30 bg-brass-500/5 p-4 sm:mb-4 sm:p-3">
              <Truck size={16} className="shrink-0 text-brass-500" />
              <p className="text-sm text-ink-200">Add <span className="font-bold text-brass-400">{formatPrice(remainingForFree)}</span> more for free shipping</p>
            </div>
          ) : (
            <div className="mb-5 flex items-center gap-3 rounded-sm border border-teal-500/30 bg-teal-500/5 p-4 sm:mb-4 sm:p-3">
              <Truck size={16} className="shrink-0 text-teal-500" />
              <p className="text-sm text-teal-500">You've unlocked free shipping!</p>
            </div>
          )}

          <div className="divide-y divide-ink-100/10 rounded-sm border border-ink-100/10">
            {items.map((item, i) => {
              const product = getProductForCart(item.productId);
              const palette = product?.palette ?? ['#475569', '#1E293B', '#E2E8F0'];
              const motif = product?.motif ?? 'burst';
              const variantInfo = product?.variants[item.variant];
              const size = variantInfo?.sizes.find((s) => s.id === item.sizeId);
              const borderColor = item.borderColorId
                ? (variantInfo?.borderColors ?? standardBorderColors).find((b) => b.id === item.borderColorId)
                : undefined;
              return (
                <div key={i} className="flex gap-4 p-5 sm:p-4">
                  <Link to={`/product/${item.productId}`} className="shrink-0">
                    <div className="h-28 w-22 overflow-hidden rounded-sm border border-ink-100/10">
                      <Artwork palette={palette} motif={motif} seed={item.productId} className="h-full w-full" />
                    </div>
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <div>
                        <Link to={`/product/${item.productId}`} className="font-display text-lg text-ink-50 hover:text-brass-400">{item.title}</Link>
                        <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-ink-400">{item.code}</p>
                        <p className="mt-1 text-xs text-ink-300">
                          {item.variant === 'framed' ? 'Framed' : item.variant === 'canvas' ? 'Canvas' : 'Metal'} · {size?.label}
                          {borderColor ? ` · ${borderColor.name}` : ''}
                        </p>
                      </div>
                      <button onClick={() => remove(i)} className="text-ink-400 hover:text-brass-400 transition-colors"><Trash2 size={16} /></button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center rounded-sm border border-ink-100/15">
                        <button onClick={() => setQty(i, item.qty - 1)} className="grid h-10 w-10 place-items-center text-ink-300 hover:text-brass-400 sm:h-8 sm:w-8"><Minus size={14} /></button>
                        <span className="w-10 text-center font-mono text-sm font-bold text-ink-50 sm:w-8">{item.qty}</span>
                        <button onClick={() => setQty(i, item.qty + 1)} className="grid h-10 w-10 place-items-center text-ink-300 hover:text-brass-400 sm:h-8 sm:w-8"><Plus size={14} /></button>
                      </div>
                      <span className="font-mono text-sm font-bold text-brass-400">{formatPrice(item.unitPrice * item.qty)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-sm border border-ink-100/10 bg-workshop-800 p-6">
            <h2 className="font-display text-2xl text-ink-50">Order Summary</h2>
            <div className="mt-6 space-y-3 text-sm sm:mt-5">
              <div className="flex justify-between text-ink-300">
                <span>Subtotal</span>
                <span className="font-mono text-ink-100">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-ink-300">
                <span>Delivery</span>
                <span className="font-mono text-ink-400">
                  {subtotal >= site.freeShippingThreshold ? 'FREE' : 'Calculated at checkout'}
                </span>
              </div>
              {remainingForFree > 0 && (
                <p className="text-[11px] text-ink-400">Add {formatPrice(remainingForFree)} for free shipping</p>
              )}
              <div className="border-t border-ink-100/10 pt-3">
                <div className="flex justify-between">
                  <span className="font-display text-xl text-ink-50">Total</span>
                  <span className="font-display text-xl text-brass-400">{formatPrice(subtotal)}</span>
                </div>
                <p className="mt-1 text-[11px] text-ink-400">
                  {subtotal >= site.freeShippingThreshold ? 'Delivery is FREE' : '+ delivery (based on city)'}
                </p>
              </div>
            </div>
            <Link to="/checkout" className="mt-8 btn-primary w-full justify-center text-sm sm:mt-6">
              Proceed to Checkout <ArrowRight size={16} />
            </Link>
            <Link to="/categories" className="mt-4 btn-ghost w-full justify-center sm:mt-3">Continue Shopping</Link>
            <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-wider text-ink-400 sm:mt-4">{site.currency}{site.freeShippingThreshold}+ ships free</p>
          </div>
        </div>
      </div>
    </div>
  );
}
