import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import {
  Download,
  X,
  FileText,
  Loader2,
  AlertTriangle,
  Pill,
  Search,
  Heart,
  Stethoscope,
  Check,
} from 'lucide-react';
import {
  medFormList,
  medForms,
  type MedFormId,
} from '@/med-form-forms';
import { downloadMedForm, previewMedForm } from '@/lib/med-form-pdf';
import { cn } from '@/lib/utils';

type Filter = 'all' | 'family' | 'clinical';
type PreviewState = {
  id: MedFormId;
  url: string | null;
  loading: boolean;
  error: string | null;
};

const accentStyles = {
  blush: {
    chip: 'bg-blush-200 text-ink-700 hover:bg-blush-300',
    icon: 'bg-blush-100 text-blush-500',
    glow: 'hover:shadow-[0_18px_50px_-12px_rgba(255,209,220,0.65)]',
    ring: 'ring-blush-200/60',
  },
  mint: {
    chip: 'bg-mint-200 text-ink-700 hover:bg-mint-300',
    icon: 'bg-mint-100 text-mint-500',
    glow: 'hover:shadow-[0_18px_50px_-12px_rgba(170,210,190,0.65)]',
    ring: 'ring-mint-200/60',
  },
  cream: {
    chip: 'bg-cream-200 text-ink-700 hover:bg-cream-300',
    icon: 'bg-blush-50 text-ink-500',
    glow: 'hover:shadow-[0_18px_50px_-12px_rgba(255,222,180,0.55)]',
    ring: 'ring-cream-200/60',
  },
} as const;

const filterChips: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'family', label: 'Family Packs' },
  { id: 'clinical', label: 'Clinical Forms' },
];

export default function FormsCanvas() {
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [preview, setPreview] = useState<PreviewState | null>(null);

  // ESC closes the drawer
  useEffect(() => {
    if (!preview) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (preview.url) URL.revokeObjectURL(preview.url);
        setPreview(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [preview]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (preview?.url) URL.revokeObjectURL(preview.url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closePreview = () => {
    if (preview?.url) URL.revokeObjectURL(preview.url);
    setPreview(null);
  };

  const openPreview = async (id: MedFormId) => {
    setPreview({ id, url: null, loading: true, error: null });
    try {
      const url = previewMedForm(id);
      setPreview({ id, url, loading: false, error: null });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Could not open preview.';
      setPreview({ id, url: null, loading: false, error: message });
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return medFormList.filter((f) => {
      const inFilter = filter === 'all' || f.category === filter;
      if (!inFilter) return false;
      if (!q) return true;
      const hay = [
        f.title,
        f.shortTitle,
        f.audience,
        ...f.summary,
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [filter, query]);

  const counts = useMemo(
    () => ({
      all: medFormList.length,
      family: medFormList.filter((f) => f.category === 'family').length,
      clinical: medFormList.filter((f) => f.category === 'clinical').length,
    }),
    [],
  );

  return (
    <div>
      {/* Inline filter header — search + chips */}
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-soft backdrop-blur transition focus-within:border-blush-200 focus-within:shadow-[0_0_0_4px_rgba(255,209,220,0.35)]">
          <Search
            className="h-4 w-4 shrink-0 text-ink-300"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 15 forms by keyword or condition…"
            aria-label="Search forms"
            className="w-full bg-transparent text-sm text-ink-700 placeholder:text-ink-300 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="grid h-6 w-6 place-items-center rounded-full text-ink-300 transition hover:bg-ink-100 hover:text-ink-700"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        <div
          role="tablist"
          aria-label="Filter forms by audience"
          className="flex flex-wrap items-center gap-2"
        >
          {filterChips.map((c) => {
            const isActive = filter === c.id;
            const count = counts[c.id];
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(c.id)}
                className={cn(
                  'group inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all',
                  isActive
                    ? 'border-ink-700 bg-ink-700 text-white shadow-soft'
                    : 'border-white/70 bg-white/70 text-ink-500 hover:border-blush-200 hover:bg-blush-50',
                )}
              >
                {c.id === 'family' && (
                  <Heart
                    className={cn(
                      'h-3 w-3',
                      isActive ? 'text-white' : 'text-blush-400',
                    )}
                    aria-hidden="true"
                  />
                )}
                {c.id === 'clinical' && (
                  <Stethoscope
                    className={cn(
                      'h-3 w-3',
                      isActive ? 'text-white' : 'text-mint-500',
                    )}
                    aria-hidden="true"
                  />
                )}
                {c.id === 'all' && (
                  <Check
                    className={cn(
                      'h-3 w-3',
                      isActive ? 'text-white' : 'text-ink-400',
                    )}
                    aria-hidden="true"
                  />
                )}
                <span>{c.label}</span>
                <span
                  className={cn(
                    'rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-ink-100 text-ink-400',
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic grid */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-white/60 bg-white/60 p-10 text-center shadow-soft">
          <p className="font-display text-base text-ink-700">
            No forms match your search.
          </p>
          <p className="mt-1 text-xs text-ink-400">
            Try a different keyword or switch the audience filter.
          </p>
        </div>
      ) : (
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((f, i) => {
            const Icon =
              (Icons as unknown as Record<
                string,
                React.FC<{ className?: string }>
              >)[f.icon] ?? Pill;
            const a = accentStyles[f.accent];
            return (
              <motion.button
                key={f.id}
                type="button"
                onClick={() => openPreview(f.id)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.03,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.985 }}
                aria-label={`Open preview of ${f.title}`}
                className={cn(
                  'group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-white/70 bg-white/70 p-4 text-left shadow-soft backdrop-blur transition-all duration-300',
                  'hover:border-white/90 hover:bg-white/85',
                  a.glow,
                  a.ring,
                  'hover:ring-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-500',
                )}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      'grid h-10 w-10 shrink-0 place-items-center rounded-xl shadow-soft transition-transform duration-300 group-hover:scale-110',
                      a.icon,
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blush-400">
                        Form {f.number}
                      </span>
                      <span
                        className={cn(
                          'rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest',
                          f.category === 'family'
                            ? 'bg-blush-100 text-blush-500'
                            : 'bg-mint-100 text-mint-600',
                        )}
                      >
                        {f.category === 'family' ? 'Family' : 'Clinical'}
                      </span>
                    </div>
                    <div className="mt-0.5 font-display text-sm font-semibold leading-tight text-ink-700">
                      {f.title}
                    </div>
                    <div className="mt-0.5 truncate text-[9px] uppercase tracking-widest text-ink-300">
                      {f.audience}
                    </div>
                  </div>
                </div>

                <p className="line-clamp-2 text-[11px] leading-relaxed text-ink-400">
                  {f.summary.join(' · ')}
                </p>

                <div className="mt-auto flex items-center justify-between pt-1 text-[10px] font-semibold uppercase tracking-widest">
                  <span className="text-ink-300 transition-colors group-hover:text-ink-500">
                    {f.filename.replace(/^Nurses-Inc-Form-/, '').replace(/\.pdf$/, '')}
                  </span>
                  <span className="inline-flex items-center gap-1 text-blush-400 transition-colors group-hover:text-blush-500">
                    Preview
                    <FileText className="h-3 w-3" />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Right-side slide-out drawer */}
      <AnimatePresence>
        {preview && (
          <FormPreviewDrawer
            preview={preview}
            onClose={closePreview}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function FormPreviewDrawer({
  preview,
  onClose,
}: {
  preview: PreviewState;
  onClose: () => void;
}) {
  const meta = medForms[preview.id];

  return (
    <div className="fixed inset-0 z-[70]">
      {/* Backdrop */}
      <motion.button
        type="button"
        aria-label="Close preview"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 cursor-default bg-ink-700/40 backdrop-blur-sm"
      />

      {/* Drawer */}
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-preview-title"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        className="absolute inset-y-0 right-0 flex w-full max-w-2xl flex-col bg-cream-50 shadow-glow"
      >
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-ink-100/60 bg-white/80 px-5 py-4 backdrop-blur sm:px-7">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-blush-400">
                Form {meta.number} of 15
              </span>
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest',
                  meta.category === 'family'
                    ? 'bg-blush-100 text-blush-500'
                    : 'bg-mint-100 text-mint-600',
                )}
              >
                {meta.category === 'family' ? 'Family' : 'Clinical'}
              </span>
              <span className="rounded-full bg-ink-100 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-ink-400">
                {meta.audience}
              </span>
            </div>
            <h2
              id="form-preview-title"
              className="mt-1 font-display text-xl font-semibold leading-tight text-ink-700 sm:text-2xl"
            >
              {meta.title}
            </h2>
            <p className="mt-1 text-xs text-ink-400">{meta.shortTitle}</p>
          </div>
          <button
            type="button"
            aria-label="Close preview"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink-100 text-ink-500 transition-colors hover:bg-ink-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body — split: summary + preview */}
        <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
          {/* Summary panel */}
          <div className="shrink-0 border-b border-ink-100/60 bg-white/40 p-5 sm:p-6 lg:w-72 lg:border-b-0 lg:border-r">
            <div className="text-[10px] font-bold uppercase tracking-widest text-ink-300">
              What's inside
            </div>
            <ul className="mt-3 space-y-2.5">
              {meta.summary.map((line, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-[12px] leading-relaxed text-ink-500"
                >
                  <span className="mt-1.5 grid h-1.5 w-1.5 shrink-0 place-items-center rounded-full bg-blush-400" />
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-2xl border border-blush-200/60 bg-blush-50 p-3 text-[11px] leading-relaxed text-ink-500">
              <span className="font-semibold text-ink-700">Tip.</span> Print on
              standard letter (8.5×11″) — every form is single-page and fridge-ready.
            </div>
          </div>

          {/* PDF preview */}
          <div className="relative flex-1 overflow-hidden bg-ink-100/40">
            {preview.loading && (
              <div className="flex h-full min-h-[40vh] flex-col items-center justify-center gap-3 p-8 text-ink-500">
                <Loader2 className="h-8 w-8 animate-spin text-blush-400" />
                <p className="font-display text-sm">Preparing preview…</p>
                <p className="text-xs text-ink-300">
                  Building the form in your browser.
                </p>
              </div>
            )}

            {preview.error && (
              <div className="flex h-full min-h-[40vh] flex-col items-center justify-center gap-3 p-8 text-center text-ink-500">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-blush-100 text-blush-400">
                  <AlertTriangle className="h-5 w-5" />
                </span>
                <p className="font-display text-sm">Preview unavailable</p>
                <p className="max-w-xs text-xs text-ink-400">
                  {preview.error}
                </p>
              </div>
            )}

            {!preview.loading && !preview.error && preview.url && (
              <iframe
                key={preview.url}
                src={preview.url}
                title={`${meta.title} preview`}
                className="h-full w-full border-0 bg-white"
              />
            )}
          </div>
        </div>

        {/* Footer — single primary CTA */}
        <div className="shrink-0 border-t border-ink-100/60 bg-white/80 px-5 py-4 backdrop-blur sm:px-7">
          <button
            type="button"
            onClick={() => downloadMedForm(preview.id)}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-blush-300 px-6 py-3 text-sm font-semibold text-ink-700 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-blush-400 hover:text-white hover:shadow-[0_18px_40px_-12px_rgba(255,170,190,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-500 focus-visible:ring-offset-2"
          >
            <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            Download Document
            <span className="ml-1 rounded-full bg-white/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest">
              PDF
            </span>
          </button>
        </div>
      </motion.aside>
    </div>
  );
}
