import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';

/**
 * Inline CTA that fills the empty grid cell on the last row of the
 * ServicesBoard when the family-care list has an odd number of items.
 *
 * Anchors to the booking-canvas section below so users land on the
 * multi-select cart instead of having to scroll-and-search.
 */
export default function StartBuildingCallout() {
  const handleClick = () => {
    const el = document.getElementById('booking-canvas');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Optional: also pop a focus ring briefly so the eye lands on the cart.
      el.classList.add('ring-4', 'ring-blush-300');
      window.setTimeout(() => {
        el.classList.remove('ring-4', 'ring-blush-300');
      }, 1400);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
      aria-label="Scroll down to build your care package"
      className="group relative flex h-full min-h-[260px] flex-col items-start justify-between gap-5 overflow-hidden rounded-3xl border border-blush-200/70 bg-gradient-to-br from-blush-100 via-white to-mint-50 p-6 text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-blush-300 hover:shadow-[0_24px_60px_-18px_rgba(255,170,190,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-500 focus-visible:ring-offset-2 sm:p-8 sm:col-span-2 lg:col-span-2"
    >
      {/* Floating brand blob */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-mint-200 opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-blush-200 opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
      />

      {/* Eyebrow chip */}
      <span className="relative inline-flex items-center gap-1.5 self-start rounded-full border border-white/70 bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-ink-700 shadow-soft">
        <Sparkles className="h-3 w-3 text-blush-400" />
        Multi-select booking
      </span>

      {/* Headline — matches the "Twelve ways" h2 size */}
      <div className="relative space-y-2">
        <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-ink-700 sm:text-3xl">
          Start building your{' '}
          <span className="text-ink-400">care package now.</span>
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-ink-500">
          Pick the services you want, see the running total, send one intake
          form. No back-and-forth, no surprise invoices.
        </p>
      </div>

      {/* CTA pill */}
      <div className="relative flex items-center gap-3 self-start rounded-full bg-ink-700 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 group-hover:bg-ink-500">
        <span>Build my package</span>
        <motion.span
          aria-hidden
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </div>

      {/* Tiny hint at the bottom — invisible until hover */}
      <p className="relative text-[10px] font-semibold uppercase tracking-widest text-ink-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Scrolls to the booking cart below
      </p>
    </motion.button>
  );
}