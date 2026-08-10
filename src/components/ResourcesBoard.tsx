import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import {
  Download,
  X,
  BookOpen,
  Sparkles,
  Quote,
  FileText,
  Eye,
  ChevronDown,
  Pill,
  Package,
} from 'lucide-react';
import { resourceList, resources, type ResourceId } from '@/resources-config';
import {
  downloadResource,
  previewPdf,
  previewDocxHtml,
} from '@/lib/generators';
import { cn } from '@/lib/utils';

const accentStyles = {
  blush: {
    chip: 'bg-blush-100 text-ink-500',
    icon: 'bg-blush-100 text-blush-400',
    active: 'bg-blush-100 text-blush-500 ring-blush-200',
    panel: 'bg-gradient-to-br from-blush-100 via-white to-mint-50',
  },
  mint: {
    chip: 'bg-mint-100 text-ink-500',
    icon: 'bg-mint-100 text-mint-500',
    active: 'bg-mint-100 text-mint-500 ring-mint-200',
    panel: 'bg-gradient-to-br from-mint-100 via-white to-blush-50',
  },
  cream: {
    chip: 'bg-cream-200 text-ink-500',
    icon: 'bg-blush-50 text-ink-500',
    active: 'bg-cream-100 text-ink-500 ring-cream-200',
    panel: 'bg-gradient-to-br from-cream-100 via-white to-blush-50',
  },
} as const;

type PreviewState = {
  bundle: boolean;
  id?: ResourceId;
  url: string | null;
  html: string | null;
  loading: boolean;
  error: string | null;
  title: string;
};

export default function ResourcesBoard() {
  const [open, setOpen] = useState<ResourceId | null>(null);
  const [preview, setPreview] = useState<PreviewState | null>(null);

  // ESC closes the preview
  useEffect(() => {
    if (!preview) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePreview();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [preview]);

  useEffect(() => {
    return () => {
      if (preview?.url) URL.revokeObjectURL(preview.url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startPreview = async (id: ResourceId) => {
    const meta = resources[id];
    setPreview({
      bundle: false,
      id,
      url: null,
      html: null,
      loading: true,
      error: null,
      title: meta.title,
    });
    try {
      if (meta.kind === 'pdf') {
        const url = await previewPdf(id);
        setPreview({
          bundle: false,
          id,
          url,
          html: null,
          loading: false,
          error: null,
          title: meta.title,
        });
      } else {
        const html = previewDocxHtml(id);
        setPreview({
          bundle: false,
          id,
          url: null,
          html,
          loading: false,
          error: null,
          title: meta.title,
        });
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Could not open preview.';
      setPreview({
        bundle: false,
        id,
        url: null,
        html: null,
        loading: false,
        error: message,
        title: meta.title,
      });
    }
  };

  const closePreview = () => {
    if (preview?.url) URL.revokeObjectURL(preview.url);
    setPreview(null);
  };

  const current = open ? resources[open] : null;
  const toggle = (id: ResourceId) => {
    setOpen((curr) => (curr === id ? null : id));
  };

  return (
    <div>
      {/* Resource cards — click to expand inline */}
      <div className="grid gap-4 sm:grid-cols-3">
        {resourceList.map((r, i) => {
          const Icon =
            (Icons as unknown as Record<string, React.FC<{ className?: string }>>)[
              r.icon
            ] ?? BookOpen;
          const a = accentStyles[r.accent];
          const isActive = open === r.id;
          return (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="h-full"
            >
              <button
                type="button"
                onClick={() => toggle(r.id)}
                aria-expanded={isActive}
                aria-controls={`resource-panel-${r.id}`}
                className={cn(
                  'group relative flex h-full w-full flex-col gap-4 overflow-hidden rounded-3xl border p-6 text-left transition-all duration-500',
                  isActive
                    ? 'border-white bg-white/85 shadow-glow'
                    : 'border-white/60 bg-white/70 shadow-soft hover:-translate-y-0.5 hover:bg-white/85',
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-700',
                    a.panel,
                    isActive && 'opacity-100',
                  )}
                />
                <div className="flex items-start justify-between">
                  <span
                    className={cn(
                      'grid h-12 w-12 place-items-center rounded-2xl ring-1 ring-inset transition-all',
                      isActive ? a.active : 'bg-ink-50 text-ink-500 ring-ink-100',
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest transition-colors',
                      isActive ? 'bg-white/80 text-ink-500' : 'bg-white/60 text-ink-300',
                    )}
                  >
                    {r.id === 'medication-audit-checklist' ? 'Bundle' : r.kind.toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold leading-snug text-ink-700">
                    {r.title}
                  </h3>
                  <p className="mt-1 text-[11px] uppercase tracking-widest text-ink-300">
                    {r.audience}
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-ink-100/60 pt-3">
                  <span className="text-[11px] font-medium text-ink-400">
                    {isActive ? 'Tap to close' : 'Tap to open'}
                  </span>
                  <span
                    className={cn(
                      'grid h-7 w-7 place-items-center rounded-full transition-all',
                      isActive
                        ? 'bg-ink-700 text-white rotate-180'
                        : 'bg-white text-ink-500',
                    )}
                  >
                    {isActive ? (
                      <X className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5" />
                    )}
                  </span>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded info panel — single morph transition */}
      <AnimatePresence mode="wait">
        {current && current.id !== 'medication-audit-checklist' && (
          <motion.div
            key={current.id}
            id={`resource-panel-${current.id}`}
            initial={{ opacity: 0, y: 16, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                'mt-6 overflow-hidden rounded-[2rem] border border-white/60 p-8 shadow-soft backdrop-blur md:p-12',
                accentStyles[current.accent].panel,
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    'grid h-12 w-12 shrink-0 place-items-center rounded-2xl ring-1 ring-inset',
                    accentStyles[current.accent].active,
                  )}
                >
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-widest text-ink-300">
                    {current.audience}
                  </div>
                  <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink-700 sm:text-3xl">
                    {current.title}
                  </h3>
                </div>
              </div>

              <p className="mt-4 max-w-3xl text-base text-ink-500">
                {current.subtitle}.
              </p>

              <div className="mt-6 grid gap-2">
                {current.summary.map((s) => (
                  <div
                    key={s}
                    className="flex items-start gap-2 text-sm text-ink-500"
                  >
                    <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blush-400" />
                    {s}
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-2xl border border-white/60 bg-cream-50 p-4">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-ink-300">
                  <Quote className="h-3 w-3" /> Evidence base
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink-500">
                  Built on Canadian and international best-practice guidelines —
                  including the AGS Beers Criteria®, STOPP/START v3, RNAO Best
                  Practice Guidelines, P.I.E.C.E.S.™, U-First!®, Choosing Wisely
                  Canada, and ACP Canada. Full APA-formatted references appear on
                  the final page of every download.
                </p>
              </div>

              <div className="mt-7 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
                <button
                  type="button"
                  onClick={() => startPreview(current.id)}
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-medium text-ink-500 shadow-soft transition-colors hover:bg-white/80"
                >
                  <Eye className="h-4 w-4" />
                  View on screen
                </button>
                <button
                  type="button"
                  onClick={() => downloadResource(current.id)}
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-ink-500 px-5 py-2.5 text-sm font-medium text-white shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span className="relative z-10 inline-flex items-center gap-2">
                    <Download className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                    Download {current.kind.toUpperCase()}
                  </span>
                  <span className="absolute inset-0 -z-0 bg-gradient-to-r from-blush-300 to-mint-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {current && current.id === 'medication-audit-checklist' && (
          <motion.div
            key="medication-audit"
            id={`resource-panel-${current.id}`}
            initial={{ opacity: 0, y: 16, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                'mt-6 overflow-hidden rounded-[2rem] border border-white/60 p-8 shadow-soft backdrop-blur md:p-12',
                accentStyles[current.accent].panel,
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    'grid h-12 w-12 shrink-0 place-items-center rounded-2xl ring-1 ring-inset',
                    accentStyles[current.accent].active,
                  )}
                >
                  <Package className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-widest text-ink-300">
                    {current.audience}
                  </div>
                  <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink-700 sm:text-3xl">
                    {current.title}
                  </h3>
                </div>
              </div>

              <p className="mt-4 max-w-3xl text-base text-ink-500">
                {current.subtitle}.
              </p>

              <div className="mt-6 grid gap-2">
                {current.summary.map((s) => (
                  <div
                    key={s}
                    className="flex items-start gap-2 text-sm text-ink-500"
                  >
                    <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blush-400" />
                    {s}
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-white/60 bg-cream-50 p-4">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-ink-300">
                  <Quote className="h-3 w-3" /> Evidence base
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink-500">
                  Built on Canadian and international best-practice guidelines —
                  including the AGS Beers Criteria®, STOPP/START v3, RNAO Best
                  Practice Guidelines, P.I.E.C.E.S.™, U-First!®, Choosing Wisely
                  Canada, and ACP Canada. Full APA-formatted references appear on
                  the final page of every form.
                </p>
              </div>

              <div className="mt-7 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
                <button
                  type="button"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-medium text-ink-500 shadow-soft transition-colors hover:bg-white/80"
                >
                  <Pill className="h-4 w-4" />
                  Browse the 10 forms inline
                </button>
                <button
                  type="button"
                  onClick={() => downloadResource(current.id)}
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-ink-500 px-5 py-2.5 text-sm font-medium text-white shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span className="relative z-10 inline-flex items-center gap-2">
                    <Download className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                    Download all 10 forms (ZIP)
                  </span>
                  <span className="absolute inset-0 -z-0 bg-gradient-to-r from-blush-300 to-mint-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legacy Preview modal (still used for view-on-screen) */}
      <AnimatePresence>
        {preview && !preview.bundle && (
          <PreviewModal preview={preview} onClose={closePreview} />
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Standard preview modal (PDF / DOCX render)
// ---------------------------------------------------------------------------
function PreviewModal({
  preview,
  onClose,
}: {
  preview: PreviewState;
  onClose: () => void;
}) {
  const meta = preview.id ? resources[preview.id] : null;
  const a = meta ? accentStyles[meta.accent] : accentStyles.blush;

  return (
    <motion.div
      key="preview-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink-500/40 backdrop-blur-md sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
    >
      <motion.div
        initial={{ y: 24, scale: 0.97, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 16, scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative m-3 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-glow sm:m-6"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blush-200 opacity-70 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-mint-200 opacity-70 blur-3xl" />

        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/70 text-ink-500 shadow-soft transition-colors hover:bg-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative flex items-center gap-3 border-b border-ink-100 px-7 py-5 sm:px-9">
          <span
            className={cn(
              'grid h-10 w-10 place-items-center rounded-xl shadow-soft',
              a.icon,
            )}
          >
            <Eye className="h-4 w-4" />
          </span>
          <div className="flex-1">
            <div className="text-[10px] font-bold uppercase tracking-widest text-ink-300">
              Read-only preview
            </div>
            <h3
              id="preview-modal-title"
              className="font-display text-xl font-semibold leading-tight text-ink-700"
            >
              {preview.title}
            </h3>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden bg-cream-50">
          {preview.loading && (
            <div className="flex h-full min-h-[40vh] items-center justify-center text-sm text-ink-400">
              Generating preview…
            </div>
          )}
          {preview.error && (
            <div className="flex h-full min-h-[40vh] items-center justify-center px-6 text-center text-sm text-ink-500">
              {preview.error}
            </div>
          )}
          {preview.url && (
            <iframe
              title={preview.title}
              src={preview.url}
              className="h-full min-h-[60vh] w-full"
            />
          )}
          {preview.html && (
            <iframe
              title={preview.title}
              srcDoc={preview.html}
              className="h-full min-h-[60vh] w-full bg-white"
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
