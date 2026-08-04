import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Brain,
  Heart,
  ShieldPlus,
  Download,
  FileText,
  Eye,
} from 'lucide-react';
import { knowledgePaths, type KnowledgePath } from '@/nurses-inc-config';
import {
  generateOnePagerPdf,
  previewOnePagerPdf,
} from '@/lib/onepager-pdf';
import { cn } from '@/lib/utils';
import MouseCard from './MouseCard';
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

export default function KnowledgeExplorer() {
  const [active, setActive] = useState<KnowledgePath['id']>('dementia');
  const [preview, setPreview] = useState<DocumentPreview | null>(null);
  const current = knowledgePaths.find((p) => p.id === active)!;

  // Revoke preview blob URL on unmount or path change
  useEffect(() => {
    return () => {
      if (preview?.url) URL.revokeObjectURL(preview.url);
    };
  }, [preview]);

  const startPreview = async (id: KnowledgePath['id']) => {
    setPreview({
      title: knowledgePaths.find((p) => p.id === id)!.label,
      meta: 'One-Pager · Knowledge Pathway · Read-only preview',
      url: null,
      loading: true,
    });
    try {
      // Run preview generation off the synchronous render path
      await new Promise((r) => setTimeout(r, 30));
      const url = previewOnePagerPdf(id);
      setPreview({
        title: knowledgePaths.find((p) => p.id === id)!.label,
        meta: 'One-Pager · Knowledge Pathway · Read-only preview',
        url,
        loading: false,
        onDownload: () => generateOnePagerPdf(id),
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Could not open preview.';
      setPreview({
        title: knowledgePaths.find((p) => p.id === id)!.label,
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

  return (
    <div>
      {/* Path switcher */}
      <div
        role="tablist"
        aria-label="Knowledge pathway"
        className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-3"
      >
        {knowledgePaths.map((p) => {
          const Icon = pathIcons[p.id];
          const isActive = active === p.id;
          return (
            <button
              key={p.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(p.id)}
              className={cn(
                'group relative overflow-hidden rounded-3xl border p-5 text-left transition-all duration-500',
                isActive
                  ? 'border-white bg-white/80 shadow-glow'
                  : 'border-white/60 bg-white/40 shadow-soft hover:bg-white/70',
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
              <span
                className={cn(
                  'grid h-10 w-10 place-items-center rounded-2xl shadow-soft transition-colors',
                  isActive
                    ? 'bg-ink-500 text-white'
                    : 'bg-white text-ink-500',
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div className="mt-3 font-display text-lg font-semibold text-ink-700">
                {p.label}
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-ink-300">
                {p.short}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active path panel — morph transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
          transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
          className={cn(
            'mt-10 overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-br p-8 shadow-soft backdrop-blur md:p-12',
            pathGradients[current.theme],
          )}
        >
          <div className="mb-8 flex flex-col gap-4">
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-ink-700 sm:text-3xl">
                {current.label}
              </h3>
              <p className="mt-2 max-w-3xl text-base text-ink-400">
                {current.description}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => startPreview(current.id)}
                aria-label={`View ${current.label} one-pager PDF`}
                className="group inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-medium text-ink-500 shadow-soft transition-colors hover:bg-white/80"
              >
                <Eye className="h-4 w-4" />
                <span>View</span>
              </button>
              <button
                type="button"
                onClick={() => generateOnePagerPdf(current.id)}
                aria-label={`Download ${current.label} one-pager PDF`}
                className="group inline-flex items-center gap-2 rounded-full bg-ink-500 px-5 py-2.5 text-sm font-medium text-white shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
              >
                <FileText className="h-4 w-4" />
                <span>One-Pager PDF</span>
                <Download className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {current.facts.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.08,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
              >
                <MouseCard
                  intensity={4}
                  className="h-full rounded-2xl border border-white/60 bg-white/70 p-5 shadow-soft backdrop-blur"
                >
                  <div className="text-[11px] font-medium uppercase tracking-widest text-ink-300">
                    Insight {String(i + 1).padStart(2, '0')}
                  </div>
                  <h4 className="font-display mt-2 text-lg font-semibold leading-snug text-ink-700">
                    {f.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink-400">
                    {f.body}
                  </p>
                </MouseCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
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