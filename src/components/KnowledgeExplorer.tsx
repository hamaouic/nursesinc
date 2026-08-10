import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Brain,
  Heart,
  ShieldPlus,
  Download,
  FileText,
  Eye,
  Printer,
  ChevronDown,
  X,
  ListChecks,
  Quote,
} from 'lucide-react';
import { knowledgePaths, type KnowledgePath } from '@/nurses-inc-config';
import { onePagers } from '@/onepagers-config';
import {
  generateOnePagerPdf,
  previewOnePagerPdf,
  printOnePagerPdf,
} from '@/lib/onepager-pdf';
import { cn } from '@/lib/utils';
import DocumentPreviewModal, {
  type DocumentPreview,
} from './DocumentPreviewModal';

const pathIcons = {
  dementia: Brain,
  'mental-health': Heart,
  geriatric: ShieldPlus,
};

const pathGradients: Record<KnowledgePath['theme'], string> = {
  blush: 'from-blush-100 via-white to-mint-50',
  mint: 'from-mint-100 via-white to-blush-50',
  cream: 'from-cream-100 via-white to-blush-50',
};

const pathAccents: Record<KnowledgePath['theme'], string> = {
  blush: 'bg-gradient-to-br from-blush-100 to-blush-50 text-blush-400',
  mint: 'bg-gradient-to-br from-mint-100 to-mint-50 text-mint-500',
  cream: 'bg-gradient-to-br from-cream-100 to-cream-50 text-ink-500',
};

const pathActiveIcon: Record<KnowledgePath['theme'], string> = {
  blush: 'bg-blush-100 text-blush-500 ring-blush-200',
  mint: 'bg-mint-100 text-mint-500 ring-mint-200',
  cream: 'bg-cream-100 text-ink-500 ring-cream-200',
};

export default function KnowledgeExplorer() {
  const [active, setActive] = useState<KnowledgePath['id'] | null>(null);
  const [preview, setPreview] = useState<DocumentPreview | null>(null);
  const current = knowledgePaths.find((p) => p.id === active);

  // Revoke preview blob URL on unmount or path change
  useEffect(() => {
    return () => {
      if (preview?.url) URL.revokeObjectURL(preview.url);
    };
  }, [preview]);

  const startPreview = async (id: KnowledgePath['id']) => {
    const path = knowledgePaths.find((p) => p.id === id)!;
    setPreview({
      title: path.label,
      meta: 'One-Pager · Knowledge Pathway · Read-only preview',
      url: null,
      loading: true,
    });
    try {
      await new Promise((r) => setTimeout(r, 30));
      const url = previewOnePagerPdf(id);
      setPreview({
        title: path.label,
        meta: 'One-Pager · Knowledge Pathway · Read-only preview',
        url,
        loading: false,
        onDownload: () => generateOnePagerPdf(id),
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Could not open preview.';
      setPreview({
        title: path.label,
        url: null,
        loading: false,
        error: message,
        onDownload: () => generateOnePagerPdf(id),
      });
    }
  };

  const closePreview = () => {
    if (preview?.url) URL.revokeObjectURL(preview.url);
    setPreview(null);
  };

  const toggle = (id: KnowledgePath['id']) => {
    setActive((current) => (current === id ? null : id));
  };

  return (
    <div>
      {/* Path cards — click to expand */}
      <div className="grid gap-4 sm:grid-cols-3">
        {knowledgePaths.map((p, i) => {
          const Icon = pathIcons[p.id];
          const isActive = active === p.id;
          return (
            <motion.div
              key={p.id}
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
                role="tab"
                aria-selected={isActive}
                aria-expanded={isActive}
                aria-controls={`path-panel-${p.id}`}
                onClick={() => toggle(p.id)}
                className={cn(
                  'group relative flex w-full flex-col gap-4 overflow-hidden rounded-3xl border p-6 text-left transition-all duration-500',
                  isActive
                    ? 'border-white bg-white/85 shadow-glow'
                    : 'border-white/60 bg-white/70 shadow-soft hover:bg-white/85 hover:-translate-y-0.5',
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-700',
                    pathGradients[p.theme],
                    isActive && 'opacity-100',
                  )}
                />
                <div className="flex items-start justify-between">
                  <span
                    className={cn(
                      'grid h-12 w-12 place-items-center rounded-2xl ring-1 ring-inset transition-all',
                      isActive ? pathActiveIcon[p.theme] : 'bg-ink-50 text-ink-500 ring-ink-100',
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest transition-colors',
                      isActive
                        ? 'bg-white/80 text-ink-500'
                        : 'bg-white/60 text-ink-300',
                    )}
                  >
                    {p.id.split('-')[0]}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold leading-snug text-ink-700">
                    {p.label}
                  </h3>
                  <p className="mt-1 text-[11px] uppercase tracking-widest text-ink-300">
                    {p.short}
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-ink-100/60 pt-3">
                  <span className="text-[11px] font-medium text-ink-400">
                    {isActive ? 'Tap to close' : 'Tap to read'}
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

      {/* Expanded panel — single morph transition */}
      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key={current.id}
            id={`path-panel-${current.id}`}
            initial={{ opacity: 0, y: 16, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                'relative mt-6 overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-br p-8 shadow-soft backdrop-blur md:p-12',
                pathAccents[current.theme],
              )}
            >
              <button
                type="button"
                aria-label="Close article"
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/60 bg-white/80 text-ink-500 shadow-soft backdrop-blur transition-all hover:rotate-90 hover:bg-white sm:right-6 sm:top-6"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mb-6 flex flex-col gap-4 pr-12 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-ink-700 sm:text-3xl">
                    {current.label}
                  </h3>
                  <p className="mt-2 max-w-2xl text-base text-ink-500">
                    {current.description}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <div
                    className="inline-flex items-center justify-center gap-1 rounded-full border border-ink-200 bg-white px-2 py-2 text-sm font-medium text-ink-500 shadow-soft"
                    role="group"
                    aria-label={`View or print ${current.label}`}
                  >
                    <button
                      type="button"
                      onClick={() => startPreview(current.id)}
                      aria-label={`View ${current.label} one-pager PDF`}
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 transition-colors hover:bg-cream-50"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                    <span className="text-ink-300" aria-hidden>
                      /
                    </span>
                    <button
                      type="button"
                      onClick={() => printOnePagerPdf(current.id)}
                      aria-label={`Print ${current.label} one-pager PDF`}
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 transition-colors hover:bg-cream-50"
                    >
                      <Printer className="h-4 w-4" />
                      <span>Print</span>
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => generateOnePagerPdf(current.id)}
                    aria-label={`Download ${current.label} one-pager PDF`}
                    className="group inline-flex items-center gap-2 rounded-full bg-ink-500 px-5 py-2.5 text-sm font-medium text-white shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <Download className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {current.facts.map((f, i) => (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.1 + i * 0.06,
                      ease: [0.2, 0.8, 0.2, 1],
                    }}
                    className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-soft backdrop-blur"
                  >
                    <div className="text-[11px] font-medium uppercase tracking-widest text-ink-300">
                      Insight {String(i + 1).padStart(2, '0')}
                    </div>
                    <h4 className="mt-2 font-display text-lg font-semibold leading-snug text-ink-700">
                      {f.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-ink-400">
                      {f.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview modal */}
      <AnimatePresence>
        {preview && (
          <DocumentPreviewModal preview={preview} onClose={closePreview} />
        )}
      </AnimatePresence>
    </div>
  );
}
