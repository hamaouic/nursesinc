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
  Loader2,
  AlertTriangle,
  Pill,
} from 'lucide-react';
import { resourceList, resources, type ResourceId } from '@/resources-config';
import {
  downloadResource,
  previewPdf,
  previewDocxHtml,
} from '@/lib/generators';
import MedFormsBoard from './MedFormsBoard';
import { cn } from '@/lib/utils';

const accentStyles = {
  blush: {
    chip: 'bg-blush-100 text-ink-500',
    icon: 'bg-blush-100 text-blush-400',
  },
  mint: {
    chip: 'bg-mint-100 text-ink-500',
    icon: 'bg-mint-100 text-mint-500',
  },
  cream: {
    chip: 'bg-cream-200 text-ink-500',
    icon: 'bg-blush-50 text-ink-500',
  },
} as const;

type PreviewState = {
  /** If true, the bundle (10-form) preview is active. */
  bundle: boolean;
  /** Resource id for non-bundle previews. */
  id?: ResourceId;
  /** Blob URL for PDF previews. */
  url: string | null;
  /** Inline HTML for DOCX previews (used via iframe srcDoc). */
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

  return (
    <>
      {/* Resource grid */}
      <div className="grid gap-4 sm:grid-cols-3">
        {resourceList.map((r, i) => {
          const Icon =
            (Icons as unknown as Record<string, React.FC<{ className?: string }>>)[
              r.icon
            ] ?? BookOpen;
          const a = accentStyles[r.accent];
          return (
            <motion.button
              key={r.id}
              type="button"
              onClick={() => setOpen(r.id)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`Open ${r.title}`}
              className="group relative flex w-full flex-col gap-3 overflow-hidden rounded-3xl border border-white/60 bg-white/70 px-5 py-4 text-left shadow-soft backdrop-blur transition-shadow hover:shadow-glow"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-blush-300 to-mint-300 transition-transform duration-500 group-hover:scale-x-100"
              />
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    'grid h-10 w-10 shrink-0 place-items-center rounded-xl shadow-soft transition-colors',
                    a.icon,
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-base font-semibold leading-tight text-ink-700">
                    {r.title}
                  </div>
                  <div className="mt-0.5 truncate text-[10px] uppercase tracking-widest text-ink-300">
                    {r.audience}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 self-end rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest transition-colors',
                    a.chip,
                  )}
                >
                  <Eye className="h-3 w-3" />
                  Open
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Info modal for non-bundle resources */}
      <AnimatePresence>
        {current && current.id !== 'medication-audit-checklist' && (
          <InfoModal
            current={current}
            onClose={() => setOpen(null)}
            onView={() => {
              const id = current.id;
              setOpen(null);
              void startPreview(id);
            }}
            onDownload={() => {
              downloadResource(current.id);
              window.setTimeout(() => setOpen(null), 250);
            }}
          />
        )}
      </AnimatePresence>

      {/* Bundle modal for Medication Audit (10 forms) */}
      <AnimatePresence>
        {current && current.id === 'medication-audit-checklist' && (
          <BundleModal current={current} onClose={() => setOpen(null)} />
        )}
      </AnimatePresence>

      {/* Standard preview modal (de-escalation + family kit) */}
      <AnimatePresence>
        {preview && !preview.bundle && (
          <PreviewModal preview={preview} onClose={closePreview} />
        )}
      </AnimatePresence>
    </>
  );
}

// ---------------------------------------------------------------------------
// Info modal — non-bundle resources
// ---------------------------------------------------------------------------
function InfoModal({
  current,
  onClose,
  onView,
  onDownload,
}: {
  current: (typeof resources)[keyof typeof resources];
  onClose: () => void;
  onView: () => void;
  onDownload: () => void;
}) {
  const a = accentStyles[current.accent];

  return (
    <motion.div
      key="info-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink-500/40 backdrop-blur-md sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resource-modal-title"
    >
      <motion.div
        initial={{ y: 24, scale: 0.97, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 16, scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative m-3 w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-glow sm:m-6"
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

        <div className="relative p-7 sm:p-9">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                'grid h-11 w-11 place-items-center rounded-xl shadow-soft',
                a.icon,
              )}
            >
              <FileText className="h-4 w-4" />
            </span>
            <div>
              <div className="text-[11px] font-medium uppercase tracking-widest text-ink-300">
                {current.audience}
              </div>
              <h3
                id="resource-modal-title"
                className="font-display text-2xl font-semibold tracking-tight text-ink-700"
              >
                {current.title}
              </h3>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-ink-500">
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

          <div className="mt-7 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-medium text-ink-500 shadow-soft transition-colors hover:bg-white/80"
            >
              Close
            </button>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={onView}
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-medium text-ink-500 shadow-soft transition-colors hover:bg-white/80"
              >
                <Eye className="h-4 w-4" />
                View on screen
              </button>
              <button
                type="button"
                onClick={onDownload}
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
        </div>
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Bundle modal — Medication Audit (10 forms)
// ---------------------------------------------------------------------------
function BundleModal({
  current,
  onClose,
}: {
  current: (typeof resources)[keyof typeof resources];
  onClose: () => void;
}) {
  return (
    <motion.div
      key="bundle-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink-500/40 backdrop-blur-md sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="bundle-modal-title"
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

        {/* Header — sticky at top */}
        <div className="relative shrink-0 border-b border-white/60 bg-white/80 p-6 backdrop-blur sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-blush-100 text-blush-400 shadow-soft">
              <Pill className="h-4 w-4" />
            </span>
            <div>
              <div className="text-[11px] font-medium uppercase tracking-widest text-ink-300">
                {current.audience}
              </div>
              <h3
                id="bundle-modal-title"
                className="font-display text-2xl font-semibold tracking-tight text-ink-700"
              >
                {current.title}
              </h3>
            </div>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-500">
            {current.subtitle}.
          </p>
          <p className="mt-2 text-xs text-ink-400">
            Each form is a separate, single-page printable PDF. Click{' '}
            <span className="font-semibold text-ink-500">View</span> to read it
            on screen, or <span className="font-semibold text-ink-500">Download</span>{' '}
            to save it.
          </p>
        </div>

        {/* Scrollable form list */}
        <div className="relative flex-1 overflow-y-auto p-6 sm:p-8">
          <MedFormsBoard />
        </div>

        {/* Footer */}
        <div className="relative shrink-0 border-t border-white/60 bg-white/80 p-4 backdrop-blur sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-medium text-ink-500 shadow-soft transition-colors hover:bg-white/80"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Standard preview modal — for non-bundle PDFs / DOCX
// ---------------------------------------------------------------------------
function PreviewModal({
  preview,
  onClose,
}: {
  preview: PreviewState;
  onClose: () => void;
}) {
  return (
    <motion.div
      key="preview-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[70] flex flex-col bg-ink-700/60 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-title"
    >
      <motion.div
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-ink-700/80 px-4 py-3 text-white backdrop-blur sm:px-6"
      >
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-white">
            <FileText className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <div className="truncate text-[11px] uppercase tracking-widest text-white/60">
              Read-only preview
            </div>
            <h2
              id="preview-title"
              className="truncate font-display text-base font-semibold sm:text-lg"
            >
              {preview.title}
            </h2>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {preview.id && (
            <button
              type="button"
              onClick={() => downloadResource(preview.id!)}
              className="hidden items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20 sm:inline-flex"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
          )}
          <button
            type="button"
            aria-label="Close preview"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1], delay: 0.05 }}
        className="relative flex flex-1 items-stretch justify-center overflow-hidden"
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative m-3 w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-glow sm:m-6"
        >
          {preview.loading && (
            <div className="flex h-full min-h-[60vh] flex-col items-center justify-center gap-3 p-12 text-ink-500">
              <Loader2 className="h-8 w-8 animate-spin text-blush-400" />
              <p className="font-display text-base">Preparing preview…</p>
              <p className="text-xs text-ink-300">
                Building the file in your browser — no server required.
              </p>
            </div>
          )}

          {preview.error && (
            <div className="flex h-full min-h-[60vh] flex-col items-center justify-center gap-3 p-12 text-center text-ink-500">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-blush-100 text-blush-400">
                <AlertTriangle className="h-5 w-5" />
              </span>
              <p className="font-display text-base">Preview unavailable</p>
              <p className="max-w-md text-xs text-ink-400">{preview.error}</p>
              {preview.id && (
                <button
                  type="button"
                  onClick={() => downloadResource(preview.id!)}
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-ink-500 px-4 py-2 text-sm font-medium text-white shadow-soft"
                >
                  <Download className="h-4 w-4" />
                  Download instead
                </button>
              )}
            </div>
          )}

          {!preview.loading && !preview.error && preview.url && (
            <iframe
              key={preview.url}
              src={preview.url}
              title={`${preview.title} preview`}
              className="h-[78vh] w-full border-0 bg-white"
            />
          )}

          {!preview.loading && !preview.error && preview.html && (
            <iframe
              key={`${preview.id}-html`}
              srcDoc={preview.html}
              title={`${preview.title} preview`}
              className="h-[78vh] w-full border-0 bg-white"
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}