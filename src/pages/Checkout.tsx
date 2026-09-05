import { useState, useMemo, type FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { formatPrice, site, cities, getDeliveryFee, paymentConfig } from '@/config';
import { supabase } from '@/lib/supabase';
import { ChevronRight, Check, AlertCircle, Truck, Wallet, Banknote, QrCode, ArrowRight } from 'lucide-react';

type PaymentMethod = 'cod' | 'advance';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  terms?: string;
}

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', address: '', city: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const hasFreeShipping = subtotal >= site.freeShippingThreshold;

  const deliveryFee = useMemo(() => {
    if (hasFreeShipping) return 0;
    if (!form.city) return 0;
    return getDeliveryFee(form.city);
  }, [form.city, hasFreeShipping]);

  const total = subtotal + deliveryFee;

  if (items.length === 0 && !submitted) return <Navigate to="/cart" replace />;

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Enter a valid email address';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    else if (!/^(\+?92|0)?3\d{9}$/.test(form.phone.replace(/[\s-]/g, ''))) e.phone = 'Enter a valid Pakistani mobile (e.g. 03XXXXXXXXX)';
    if (!form.address.trim()) e.address = 'Address is required';
    if (!form.city) e.city = 'Select your city';
    if (!agreedToTerms) e.terms = 'You must agree to the Terms & Conditions to place your order';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setSubmitting(true);

    const orderItems = items.map((it) => ({
      title: it.title,
      code: it.code,
      variant: it.variant,
      sizeId: it.sizeId,
      borderColorId: it.borderColorId ?? null,
      qty: it.qty,
      unitPrice: it.unitPrice,
      lineTotal: it.unitPrice * it.qty,
    }));

    const orderRecord = {
      customer_name: form.name,
      customer_email: form.email.trim(),
      customer_phone: form.phone,
      customer_address: form.address,
      customer_city: form.city,
      payment_method: paymentMethod,
      items: orderItems,
      subtotal,
      delivery_fee: deliveryFee,
      total,
    };

    try {
      const { data: orderNumber, error: rpcError } = await supabase.rpc('generate_order_number');
      if (rpcError || !orderNumber) throw new Error('Could not generate order number');

      const { error } = await supabase.from('orders').insert({ ...orderRecord, order_number: orderNumber });
      if (error) throw error;

      // Send notification email via edge function
      try {
        const { error: fnError } = await supabase.functions.invoke('send-order-email', {
          body: { ...orderRecord, orderNumber, notifyEmail: paymentConfig.orderEmail },
        });
        if (fnError) console.error('send-order-email returned error:', fnError.message);
      } catch (err) {
        console.error('Failed to call send-order-email:', err);
      }

      setSubmitted(true);
      setOrderNumber(orderNumber);
      clear();
    } catch {
      setSubmitError('Could not place your order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="shell py-20">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-teal-500/15">
            <Check size={36} className="text-teal-500" />
          </div>
          <h1 className="font-display text-4xl text-ink-50">Thanks for your order!</h1>
          {orderNumber && (
            <p className="mt-3 inline-flex items-center gap-2 rounded-sm border border-ink-100/15 bg-workshop-800 px-4 py-2 font-mono text-sm font-bold text-brass-400">{orderNumber}</p>
          )}
          <p className="mt-4 leading-relaxed text-ink-300 sm:mt-3">We've received your order and will contact you shortly to confirm the details.</p>
          <Link to="/categories" className="mt-8 inline-flex btn-brass sm:mt-6">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="shell py-12 sm:py-10">
      <nav className="mb-8 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-400 sm:mb-6">
        <Link to="/" className="hover:text-brass-400">Home</Link>
        <ChevronRight size={12} />
        <Link to="/cart" className="hover:text-brass-400">Cart</Link>
        <ChevronRight size={12} />
        <span className="text-ink-100">Checkout</span>
      </nav>

      <h1 className="mb-10 font-display text-5xl text-ink-50 md:text-6xl sm:mb-8">Checkout</h1>

      {/* Payment method toggle */}
      <div className="mb-10 sm:mb-8">
        <p className="label">Payment Method</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setPaymentMethod('cod')}
            className={`flex items-center gap-3 rounded-sm border p-4 transition-all ${paymentMethod === 'cod' ? 'border-brass-500 bg-brass-500/10' : 'border-ink-100/15 hover:border-ink-100/30'}`}
          >
            <div className={`grid h-10 w-10 place-items-center rounded-sm ${paymentMethod === 'cod' ? 'bg-brass-500 text-workshop-900' : 'bg-workshop-700 text-ink-300'}`}>
              <Banknote size={20} />
            </div>
            <div className="text-left">
              <p className={`font-display text-base ${paymentMethod === 'cod' ? 'text-brass-400' : 'text-ink-100'}`}>Cash on Delivery</p>
              <p className="text-[11px] text-ink-400">Pay when your order arrives</p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('advance')}
            className={`flex items-center gap-3 rounded-sm border p-4 transition-all ${paymentMethod === 'advance' ? 'border-brass-500 bg-brass-500/10' : 'border-ink-100/15 hover:border-ink-100/30'}`}
          >
            <div className={`grid h-10 w-10 place-items-center rounded-sm ${paymentMethod === 'advance' ? 'bg-brass-500 text-workshop-900' : 'bg-workshop-700 text-ink-300'}`}>
              <Wallet size={20} />
            </div>
            <div className="text-left">
              <p className={`font-display text-base ${paymentMethod === 'advance' ? 'text-brass-400' : 'text-ink-100'}`}>Advance Payment</p>
              <p className="text-[11px] text-ink-400">Pay now via Raast / JazzCash</p>
            </div>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-3 sm:gap-8">
        {/* Form fields */}
        <div className="space-y-6 lg:col-span-2 sm:space-y-5">
          <div className="rounded-sm border border-ink-100/10 bg-workshop-800 p-6">
            <h2 className="mb-6 font-display text-2xl text-ink-50 sm:mb-5">Delivery Details</h2>
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
              <div>
                <label className="label">Full Name</label>
                <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                {errors.name && <p className="mt-1 flex items-center gap-1 text-[11px] text-stamp-500"><AlertCircle size={11} /> {errors.name}</p>}
              </div>
              <div>
                <label className="label">Email</label>
                <input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
                {errors.email && <p className="mt-1 flex items-center gap-1 text-[11px] text-stamp-500"><AlertCircle size={11} /> {errors.email}</p>}
              </div>
              <div>
                <label className="label">Phone</label>
                <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="03XXXXXXXXX" />
                {errors.phone && <p className="mt-1 flex items-center gap-1 text-[11px] text-stamp-500"><AlertCircle size={11} /> {errors.phone}</p>}
              </div>
              <div>
                <label className="label">City</label>
                <select className="input" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>
                  <option value="">Select city</option>
                  {cities.map((c) => <option key={c} value={c}>{c} — {formatPrice(getDeliveryFee(c))}</option>)}
                </select>
                {errors.city && <p className="mt-1 flex items-center gap-1 text-[11px] text-stamp-500"><AlertCircle size={11} /> {errors.city}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="label">Full Address</label>
                <textarea className="input min-h-[80px]" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="House #, street, area, landmark…" />
                {errors.address && <p className="mt-1 flex items-center gap-1 text-[11px] text-stamp-500"><AlertCircle size={11} /> {errors.address}</p>}
              </div>
            </div>
          </div>

          {/* Advance payment panel */}
          {paymentMethod === 'advance' && (
            <div className="rounded-sm border border-brass-500/30 bg-brass-500/5 p-6">
              <div className="flex items-center gap-2">
                <QrCode size={20} className="text-brass-400" />
                <h2 className="font-display text-2xl text-ink-50">Payment Details</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-300 sm:mt-2">
                Please pay <span className="font-bold text-brass-400">{formatPrice(total)}</span> to the account below, then click Proceed to complete your order.
              </p>
              <div className="mt-6 flex flex-col gap-5 sm:mt-5 sm:flex-row">
                <div className="shrink-0">
                  <div className="grid h-44 w-44 place-items-center overflow-hidden rounded-sm border border-ink-100/15 bg-white">
                    <img
                      src={paymentConfig.raast.qrImage}
                      alt="Raast QR code"
                      className="h-40 w-40 object-contain"
                      onError={(e) => {
                        const t = e.target as HTMLImageElement;
                        t.style.display = 'none';
                        t.parentElement!.innerHTML = '<div class="flex h-40 w-40 items-center justify-center text-center text-xs text-gray-500">Add QR image to:<br>public/payment/raast-qr.png</div>';
                      }}
                    />
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="label">Account Name</p>
                    <p className="font-mono text-sm font-bold text-ink-50">{paymentConfig.raast.accountName}</p>
                  </div>
                  <div>
                    <p className="label">Account Number</p>
                    <p className="font-mono text-sm font-bold text-ink-50">{paymentConfig.raast.accountNumber}</p>
                  </div>
                  <div>
                    <p className="label">Payment Method</p>
                    <p className="font-mono text-sm font-bold text-ink-50">{paymentConfig.raast.methodLabel}</p>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-[11px] leading-relaxed text-ink-400 sm:mt-4">
                After payment, click Proceed below. We'll verify your payment manually and confirm your order.
              </p>
            </div>
          )}
        </div>

        {/* Summary */}
        <div>
          <div className="sticky top-24 rounded-sm border border-ink-100/10 bg-workshop-800 p-6">
            <h2 className="font-display text-2xl text-ink-50">Your Order</h2>
            <div className="mt-4 max-h-64 space-y-3 overflow-y-auto">
              {items.map((it, i) => (
                <div key={i} className="flex justify-between gap-2 text-sm">
                  <div className="flex-1">
                    <p className="text-ink-100">{it.title}</p>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">{it.code} · ×{it.qty}</p>
                  </div>
                  <span className="font-mono text-ink-100">{formatPrice(it.unitPrice * it.qty)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 border-t border-ink-100/10 pt-4 text-sm">
              <div className="flex justify-between text-ink-300"><span>Subtotal</span><span className="font-mono">{formatPrice(subtotal)}</span></div>
              <div className="flex items-center justify-between text-ink-300">
                <span className="flex items-center gap-1.5"><Truck size={13} /> Delivery</span>
                <span className="font-mono">
                  {hasFreeShipping ? 'FREE' : form.city ? (deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)) : 'Select city'}
                </span>
              </div>
              {!hasFreeShipping && form.city && deliveryFee > 0 && (
                <p className="text-[11px] text-ink-400">Add {formatPrice(site.freeShippingThreshold - subtotal)} more for free shipping</p>
              )}
              {hasFreeShipping && (
                <p className="text-[11px] text-teal-500">Free shipping unlocked!</p>
              )}
              <div className="flex justify-between border-t border-ink-100/10 pt-2">
                <span className="font-display text-xl text-ink-50">Total</span>
                <span className="font-display text-xl text-brass-400">{formatPrice(total)}</span>
              </div>
            </div>

            {submitError && (
              <p className="mt-3 flex items-center gap-1.5 text-[11px] text-stamp-500"><AlertCircle size={12} /> {submitError}</p>
            )}

            <div className="mt-5 sm:mt-4">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-brass-500"
                />
                <span className="text-xs leading-relaxed text-ink-300">
                  I agree to the{' '}
                  <Link to="/terms" target="_blank" className="font-medium text-brass-400 underline hover:text-brass-300">Terms &amp; Conditions</Link>
                  {' '}and confirm that the information provided is accurate.
                </span>
              </label>
              {errors.terms && <p className="mt-1.5 flex items-center gap-1 text-[11px] text-stamp-500"><AlertCircle size={11} /> {errors.terms}</p>}
            </div>

            <button type="submit" disabled={submitting} className="mt-6 w-full btn-primary justify-center text-sm sm:mt-5">
              {submitting ? 'Placing Order…' : (
                <>
                  {paymentMethod === 'cod' ? 'Place Order' : 'Proceed'} <ArrowRight size={16} />
                </>
              )}
            </button>
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-wider text-ink-400 sm:mt-3">
              {paymentMethod === 'cod' ? 'Pay when you receive your order' : 'Trust-based · manually reconciled'}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
