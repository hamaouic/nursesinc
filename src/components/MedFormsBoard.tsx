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
import {
  medFormList,
  medForms,
  type MedFormId,
} from '@/med-form-forms';
import { downloadMedForm, previewMedForm } from '@/lib/med-form-pdf';
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
  id: MedFormId;
  url: string | null;
  loading: boolean;
  error: string | null;
};

export default function MedFormsBoard() {
  const [preview, setPreview] = useState<PreviewState | null>(null);

  // ESC closes the preview
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

  // Cleanup
  useEffect(() => {
    return () => {
      if (preview?.url) URL.revokeObjectURL(preview.url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startPreview = async (id: MedFormId) => {
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

  const closePreview = () => {
    if (preview?.url) URL.revokeObjectURL(preview.url);
    setPreview(null);
  };

  return (
    <>
      {/* 10 form cards in a 3-column responsive grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {medFormList.map((f, i) => {
          const Icon =
            (Icons as unknown as Record<string, React.FC<{ className?: string }>>)[
              f.icon
            ] ?? Pill;
          const a = accentStyles[f.accent];
          return (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.4,
                delay: i * 0.04,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-4 shadow-soft backdrop-blur"
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    'grid h-9 w-9 shrink-0 place-items-center rounded-lg shadow-soft',
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
                  </div>
                  <div className="font-display text-sm font-semibold leading-tight text-ink-700">
                    {f.title}
                  </div>
                  <div className="mt-0.5 truncate text-[9px] uppercase tracking-widest text-ink-300">
                    {f.audience}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => startPreview(f.id)}
                  aria-label={`View ${f.title}`}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-ink-200 bg-white px-3 py-1.5 text-[11px] font-medium text-ink-500 shadow-soft transition-colors hover:bg-white/80"
                >
                  <Eye className="h-3 w-3" />
                  View
                </button>
                <button
                  type="button"
                  onClick={() => downloadMedForm(f.id)}
                  aria-label={`Download ${f.title}`}
                  className={cn(
                    'inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest transition-transform hover:-translate-y-0.5',
                    a.chip,
                  )}
                >
                  <Download className="h-3 w-3" />
                  Download
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Preview modal */}
      <AnimatePresence>
        {preview && (
          <FormPreviewModal preview={preview} onClose={closePreview} />
        )}
      </AnimatePresence>
    </>
  );
}

function FormPreviewModal({
  preview,
  onClose,
}: {
  preview: PreviewState;
  onClose: () => void;
}) {
  const meta = medForms[preview.id];

  return (
    <motion.div
      key="form-preview-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[70] flex flex-col bg-ink-700/60 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-preview-title"
    >
      {/* Top bar */}
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
              Form {meta.number} of 10 · {meta.audience} · Read-only preview
            </div>
            <h2
              id="form-preview-title"
              className="truncate font-display text-base font-semibold sm:text-lg"
            >
              {meta.title}
            </h2>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => downloadMedForm(preview.id)}
            className="hidden items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20 sm:inline-flex"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
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
                Building the form in your browser — no server required.
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
              <button
                type="button"
                onClick={() => downloadMedForm(preview.id)}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-ink-500 px-4 py-2 text-sm font-medium text-white shadow-soft"
              >
                <Download className="h-4 w-4" />
                Download instead
              </button>
            </div>
          )}

          {!preview.loading && !preview.error && preview.url && (
            <iframe
              key={preview.url}
              src={preview.url}
              title={`${meta.title} preview`}
              className="h-[80vh] w-full border-0 bg-white"
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}