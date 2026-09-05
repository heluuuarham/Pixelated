import { Link, useParams } from 'react-router-dom';
import { formatCategories } from '@/config';
import { ArrowLeft, Bell } from 'lucide-react';
import { useState } from 'react';

export default function ComingSoon() {
  const { slug } = useParams<{ slug: string }>();
  const fmt = formatCategories.find((f) => f.slug === slug);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const name = fmt?.name ?? 'This Format';

  return (
    <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <div className="mb-8 grid h-20 w-20 place-items-center rounded-full border border-ink-100/15 bg-workshop-800">
        <Bell size={32} className="text-brass-500" />
      </div>
      <p className="eyebrow">Coming Soon</p>
      <h1 className="mt-3 font-display text-5xl text-ink-50 md:text-6xl">{name}</h1>
      <p className="mt-4 max-w-md leading-relaxed text-ink-300">
        We're working hard to bring you {name.toLowerCase()}. Be the first to know when it launches — drop your email below and we'll notify you.
      </p>

      {submitted ? (
        <div className="mt-8 rounded-sm border border-brass-500/30 bg-brass-500/10 px-6 py-4">
          <p className="font-mono text-sm text-brass-400">Thanks! We'll let you know when {name} launches.</p>
        </div>
      ) : (
        <form
          onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSubmitted(true); }}
          className="mt-8 flex w-full max-w-sm gap-2"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 rounded-sm border border-ink-100/15 bg-workshop-800 px-4 py-3 text-sm text-ink-50 placeholder-ink-400 focus:border-brass-500 focus:outline-none"
          />
          <button type="submit" className="btn-brass whitespace-nowrap">
            Notify Me
          </button>
        </form>
      )}

      <Link to="/" className="mt-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-400 hover:text-brass-400 transition-colors">
        <ArrowLeft size={14} /> Back to Home
      </Link>
    </div>
  );
}
