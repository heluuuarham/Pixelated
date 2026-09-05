import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { site } from '@/config';

export default function Terms() {
  return (
    <div className="shell py-12 sm:py-10">
      <nav className="mb-8 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-400 sm:mb-6">
        <Link to="/" className="hover:text-brass-400">Home</Link>
        <ChevronRight size={12} />
        <span className="text-ink-100">Terms &amp; Conditions</span>
      </nav>

      <h1 className="mb-3 font-display text-5xl text-ink-50 md:text-6xl sm:mb-2">Terms &amp; Conditions</h1>
      <p className="mb-10 font-mono text-[11px] uppercase tracking-wider text-ink-400 sm:mb-8">
        Last updated: {new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <div className="mx-auto max-w-3xl space-y-10 text-ink-200 sm:space-y-8">
        <section>
          <h2 className="mb-3 font-display text-2xl text-ink-50 sm:mb-2">1. Introduction</h2>
          <p className="leading-relaxed">
            Welcome to {site.name}. By placing an order on our website, you agree to these Terms &amp; Conditions.
            Please read them carefully before making a purchase. If you do not agree with any part of these terms,
            please do not use our website or place an order.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-ink-50 sm:mb-2">2. Products &amp; Orders</h2>
          <p className="leading-relaxed">
            All products are made to order. We strive to display product colours and sizes as accurately as possible,
            but slight variations may occur due to screen settings and the printing process. We reserve the right to
            refuse or cancel any order at our discretion. If we cancel an order after payment, a full refund will be issued.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-ink-50 sm:mb-2">3. Pricing &amp; Payment</h2>
          <p className="leading-relaxed">
            All prices are listed in {site.currency} and include applicable taxes. We offer two payment methods:
          </p>
          <ul className="mt-3 space-y-2 pl-1">
            <li className="flex gap-2"><span className="text-brass-500">•</span><span><strong className="text-ink-100">Cash on Delivery (COD):</strong> Pay in cash when your order is delivered to your door.</span></li>
            <li className="flex gap-2"><span className="text-brass-500">•</span><span><strong className="text-ink-100">Advance Payment:</strong> Pay via Raast or JazzCash before dispatch. Your order is shipped after payment is verified.</span></li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-ink-50 sm:mb-2">4. Shipping &amp; Delivery</h2>
          <p className="leading-relaxed">
            We ship nationwide across Pakistan. Delivery fees vary by city and are calculated at checkout.
            Orders over {site.currency}{site.freeShippingThreshold.toLocaleString()} qualify for free shipping.
            Typical delivery time is 5–7 business days. We are not liable for delays caused by courier services.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-ink-50 sm:mb-2">5. Returns &amp; Refunds</h2>
          <p className="leading-relaxed">
            We offer a 7-day return policy. If your product arrives damaged or defective, contact us within 7 days
            of delivery with a photo of the item, and we will arrange a replacement or refund. Because our products
            are made to order, we cannot accept returns for change of mind. Custom prints (your uploaded photos or
            artwork) are non-refundable unless defective.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-ink-50 sm:mb-2">6. Custom Prints</h2>
          <p className="leading-relaxed">
            When you upload a photo or artwork for custom printing, you confirm that you own the rights to the image
            or have permission to use it. {site.name} is not responsible for copyright infringement in user-uploaded
            content. We reserve the right to refuse to print any image that we believe infringes on third-party rights
            or contains offensive material.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-ink-50 sm:mb-2">7. Privacy</h2>
          <p className="leading-relaxed">
            Your personal information (name, email, phone, address) is used solely for order processing and delivery.
            We do not share your data with third parties except as required for shipping and payment verification.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-ink-50 sm:mb-2">8. Contact</h2>
          <p className="leading-relaxed">
            If you have any questions about these Terms &amp; Conditions, please contact us:
          </p>
          <ul className="mt-3 space-y-1.5 pl-1">
            <li className="flex gap-2"><span className="text-brass-500">•</span><span>Email: <a href={`mailto:${site.email}`} className="text-brass-400 hover:underline">{site.email}</a></span></li>
            <li className="flex gap-2"><span className="text-brass-500">•</span><span>Phone/WhatsApp: {site.whatsapp}</span></li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-display text-2xl text-ink-50 sm:mb-2">9. Changes to These Terms</h2>
          <p className="leading-relaxed">
            We may update these Terms &amp; Conditions from time to time. Any changes will be posted on this page
            with an updated revision date. Continued use of the website after changes constitutes acceptance of
            the revised terms.
          </p>
        </section>
      </div>

      <div className="mx-auto mt-12 max-w-3xl border-t border-ink-100/10 pt-6 sm:mt-10">
        <Link to="/categories" className="inline-flex btn-brass">Continue Shopping</Link>
      </div>
    </div>
  );
}
