import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { categories } from '@/config';
import { Lightbulb, ChevronDown, Send, CheckCircle2 } from 'lucide-react';

// Only the base themes (not the metal/square duplicates) — a request is
// about the design idea itself, not which material it'll end up on.
const requestCategories = categories.filter((c) => c.format === 'frames-canvas');

export default function RequestItemBox() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [categorySlug, setCategorySlug] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError('Give it at least a short name so we know what you mean.');
      return;
    }
    setError('');
    setSubmitting(true);
    const { error: insertError } = await supabase.from('item_requests').insert({
      title: title.trim(),
      description: description.trim() || null,
      category_slug: categorySlug || null,
      contact: contact.trim() || null,
    });
    setSubmitting(false);
    if (insertError) {
      setError('Something went wrong sending that — try again in a bit.');
      return;
    }
    setSubmitted(true);
  }

  function resetForNewRequest() {
    setTitle('');
    setCategorySlug('');
    setDescription('');
    setContact('');
    setSubmitted(false);
  }

  return (
    <section className="shell pb-12 sm:pb-16">
      {!open ? (
        // Collapsed: a single quiet line, not a banner competing for attention.
        <button
          onClick={() => setOpen(true)}
          className="mx-auto flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink-400 hover:text-brass-400 transition-colors"
        >
          <Lightbulb size={13} />
          Don't see the design you want? Request one
          <ChevronDown size={13} />
        </button>
      ) : (
        <div className="rounded-sm border border-ink-100/10 bg-workshop-800 p-6 sm:p-8 md:p-10">
          {submitted ? (
            <div className="flex flex-col items-center py-4 text-center">
              <CheckCircle2 size={28} className="text-teal-500" />
              <p className="mt-3 font-display text-2xl text-ink-50">Got it — thanks.</p>
              <p className="mt-1 max-w-sm text-sm text-ink-400">
                We'll take a look. If it's something we can add, it might show up in the catalog soon.
              </p>
              <div className="mt-6 flex gap-3">
                <button onClick={resetForNewRequest} className="btn-ghost">Request another</button>
                <button onClick={() => { setOpen(false); resetForNewRequest(); }} className="btn-ghost">Close</button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">Not in the catalog?</p>
                  <h3 className="mt-2 font-display text-3xl text-ink-50">Request a Design</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-400">
                    Got an idea we don't have yet — a finance-themed poster for an office, a specific quote, anything?
                    Tell us and we'll see if it's something we can add.
                  </p>
                </div>
                <button onClick={() => setOpen(false)} className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-ink-400 hover:text-ink-100">
                  Close
                </button>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2 sm:gap-4">
                <div className="sm:col-span-2">
                  <label className="label">What do you want?</label>
                  <input
                    className="input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. A minimal finance/stocks poster for an office"
                  />
                </div>

                <div>
                  <label className="label">Closest category (optional)</label>
                  <select className="input" value={categorySlug} onChange={(e) => setCategorySlug(e.target.value)}>
                    <option value="">Not sure / doesn't fit anywhere</option>
                    {requestCategories.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Contact (optional)</label>
                  <input
                    className="input"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Email, phone, or WhatsApp"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="label">More detail (optional)</label>
                  <textarea
                    className="input min-h-[80px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Style, colors, mood, size — whatever helps explain it"
                  />
                </div>

                {error && <p className="sm:col-span-2 text-[11px] text-stamp-500">{error}</p>}

                <div className="sm:col-span-2">
                  <button type="submit" disabled={submitting} className="btn-brass disabled:opacity-60">
                    {submitting ? 'Sending…' : 'Send Request'} <Send size={14} />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </section>
  );
}
