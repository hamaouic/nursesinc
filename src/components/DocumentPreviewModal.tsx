import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  X,
  FileText,
  Loader2,
  AlertTriangle,
} from 'lucide-react';

export type DocumentPreview = {
  /** Display title in the modal header */
  title: string;
  /** Optional breadcrumb / meta line above the title */
  meta?: string;
  /** Object URL of the PDF blob (mutually exclusive with html) */
  url?: string | null;
  /** Inline HTML for non-PDF documents (DOCX previews, etc.) */
  html?: string | null;
  /** True while the blob is being built */
  loading?: boolean;
  /** Error message */
  error?: string | null;
  /** Called when user clicks Download (if provided) */
  onDownload?: () => void;
};

type Props = {
  preview: DocumentPreview;
  onClose: () => void;
};

/**
 * Shared read-only preview modal used across the entire site for
 * any downloadable document (PDFs, DOCX). Handles:
 *  - ESC key to close
 *  - Backdrop click to close
 *  - Built-in Download button (when onDownload is provided)
 *  - Loading + error states
 */
export default function DocumentPreviewModal({ preview, onClose }: Props) {
  // ESC closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[70] flex flex-col bg-ink-700/60 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="doc-preview-title"
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
              {preview.meta ?? 'Read-only preview'}
            </div>
            <h2
              id="doc-preview-title"
              className="truncate font-display text-base font-semibold sm:text-lg"
            >
              {preview.title}
            </h2>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {preview.onDownload && (
            <button
              type="button"
              onClick={preview.onDownload}
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

      {/* Body */}
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
              {preview.onDownload && (
                <button
                  type="button"
                  onClick={preview.onDownload}
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
            <div
              className="max-h-[78vh] overflow-auto bg-white p-6 text-ink-700"
              dangerouslySetInnerHTML={{ __html: preview.html }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}