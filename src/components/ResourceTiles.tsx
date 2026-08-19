import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Download, Eye, Loader2, Printer, X } from 'lucide-react';
import { resourceList, resources, type ResourceId } from '@/resources-config';
import {
  downloadResource,
  previewPdf,
  previewDocxHtml,
  printPdf,
  printDocx,
} from '@/lib/generators';
import { cn } from '@/lib/utils';

const accentStyles = {
  blush: {
    glow: 'hover:shadow-blush-200/40',
    ring: 'hover:ring-blush-200/60',
    icon: 'bg-blush-100 text-blush-500',
    chip: 'bg-blush-100 text-blush-500',
    eyebrow: 'text-blush-400',
  },
  mint: {
    glow: 'hover:shadow-mint-200/40',
    ring: 'hover:ring-mint-200/60',
    icon: 'bg-mint-100 text-mint-600',
    chip: 'bg-mint-100 text-mint-600',
    eyebrow: 'text-mint-600',
  },
  cream: {
    glow: 'hover:shadow-cream-200/40',
    ring: 'hover:ring-cream-200/60',
    icon: 'bg-cream-100 text-ink-700',
    chip: 'bg-cream-100 text-ink-500',
    eyebrow: 'text-ink-400',
  },
} as const;

type InlineState = {
  url: string | null;
  html: string | null;
  loading: boolean;
  error: string | null;
};

export default function ResourceTiles() {
  const [open, setOpen] = useState<ResourceId | null>(null);
  const [inline, setInline] = useState<InlineState>({
    url: null,
    html: null,
    loading: false,
    error: null,
  });

  const closeAll = () => {
    if (inline.url) URL.revokeObjectURL(inline.url);
    setInline({ url: null, html: null, loading: false, error: null });
    setOpen(null);
  };

  const openResource = async (id: ResourceId) => {
    if (open === id) {
      closeAll();
      return;
    }
    if (inline.url) URL.revokeObjectURL(inline.url);
    const meta = resources[id];
    setOpen(id);
    setInline({ url: null, html: null, loading: true, error: null });
    try {
      if (meta.kind === 'pdf') {
        const url = await previewPdf(id);
        setInline({ url, html: null, loading: false, error: null });
      } else {
        const html = await previewDocxHtml(id);
        setInline({ url: null, html, loading: false, error: null });
      }
    } catch (err) {
      setInline({
        url: null,
        html: null,
        loading: false,
        error: err instanceof Error ? err.message : 'Could not generate preview.',
      });
    }
  };

  return (
    <div className="mt-10">
      {/* Header — matches FormsCanvas eyebrow style */}
      <div className="mb-4 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-blush-400">
          Knowledge Hub · Resources
        </p>
        <h3 className="mt-1 font-display text-base font-semibold text-ink-700">
          Free downloads — tap to preview, print, or download.
        </h3>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {resourceList.map((r, i) => {
          const Icon =
            (Icons as unknown as Record<
              string,
              React.FC<{ className?: string }>
            >)[r.icon] ?? Icons.BookOpen;
          const a = accentStyles[r.accent];
          const isActive = open === r.id;
          return (
            <motion.button
              key={r.id}
              type="button"
              onClick={() => openResource(r.id)}
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
              aria-label={`Open preview of ${r.title}`}
              aria-expanded={isActive}
              className={cn(
                'group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-white/70 bg-white/70 p-4 text-left shadow-soft backdrop-blur transition-all duration-300',
                'hover:border-white/90 hover:bg-white/85',
                a.glow,
                a.ring,
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-500',
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
                    <span
                      className={cn(
                        'text-[10px] font-bold uppercase tracking-widest',
                        a.eyebrow,
                      )}
                    >
                      {r.id === 'medication-audit-checklist'
                        ? 'Bundle'
                        : r.kind.toUpperCase()}
                    </span>
                    <span
                      className={cn(
                        'rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest',
                        a.chip,
                      )}
                    >
                      {r.id === 'medication-audit-checklist'
                        ? 'Clinical'
                        : r.audience.split(' · ')[0] === 'Template'
                          ? 'Family'
                          : 'Clinical'}
                    </span>
                  </div>
                  <div className="mt-0.5 font-display text-sm font-semibold leading-tight text-ink-700">
                    {r.title}
                  </div>
                  <div className="mt-0.5 truncate text-[9px] uppercase tracking-widest text-ink-300">
                    {r.id === 'medication-audit-checklist'
                      ? 'Bundle · Nurses'
                      : r.audience.replace(/^PDF · |^Template · /, '')}
                  </div>
                </div>
              </div>

              <p className="line-clamp-2 text-[11px] leading-relaxed text-ink-400">
                {r.summary.join(' · ')}
              </p>

              <div className="mt-auto flex items-center justify-between pt-1 text-[10px] font-semibold uppercase tracking-widest">
                <span className="text-ink-300 transition-colors group-hover:text-ink-500">
                  {r.filename.replace(/^Nurses-Inc-/, '').replace(/\.(pdf|zip|docx)$/, '')}
                </span>
                <span className="inline-flex items-center gap-1 text-blush-400 transition-colors group-hover:text-blush-500">
                  {isActive ? 'Close' : 'Preview'}
                  <Icons.FileText className="h-3 w-3" />
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Inline preview panel — mirrors the FormsCanvas "slide-out drawer" feel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key={open}
            initial={{ opacity: 0, y: 12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-5 overflow-hidden rounded-3xl border border-white/70 bg-white/85 shadow-soft backdrop-blur"
          >
            <div className="flex items-center justify-between gap-3 border-b border-ink-100/60 px-5 py-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-blush-400">
                  {resources[open].kind === 'pdf' ? 'PDF preview' : 'DOCX preview'}
                </p>
                <h4 className="font-display text-base font-semibold text-ink-700">
                  {resources[open].title}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    resources[open].kind === 'pdf'
                      ? printPdf(open)
                      : printDocx(open)
                  }
                  className="inline-flex items-center gap-1.5 rounded-full border border-mint-200 bg-mint-50 px-3 py-1.5 text-[11px] font-semibold text-mint-700 transition-all hover:bg-mint-100"
                  aria-label={`Print ${resources[open].title}`}
                >
                  <Printer className="h-3 w-3" />
                  Print
                </button>
                <button
                  type="button"
                  onClick={() => downloadResource(open)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-blush-200 bg-blush-50 px-3 py-1.5 text-[11px] font-semibold text-blush-500 transition-all hover:bg-blush-100"
                  aria-label={`Download ${resources[open].title}`}
                >
                  <Download className="h-3 w-3" />
                  Download
                </button>
                <button
                  type="button"
                  onClick={closeAll}
                  aria-label="Close preview"
                  title="Close preview"
                  className="grid h-8 w-8 place-items-center rounded-full border border-ink-200/70 bg-white text-ink-700 shadow-soft transition hover:-translate-y-0.5 hover:border-ink-300 hover:bg-ink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-500 focus-visible:ring-offset-2"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="h-[60vh] min-h-[420px]">
              {inline.loading && (
                <div className="flex h-full items-center justify-center gap-2 text-sm text-ink-400">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating preview…
                </div>
              )}
              {inline.error && (
                <div className="p-6 text-sm text-red-500">{inline.error}</div>
              )}
              {inline.url && (
                <iframe
                  title={resources[open].title}
                  src={inline.url}
                  className="h-full w-full"
                />
              )}
              {inline.html && (
                <iframe
                  title={resources[open].title}
                  srcDoc={inline.html}
                  className="h-full w-full bg-white"
                />
              )}
              {!inline.loading && !inline.error && !inline.url && !inline.html && (
                <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center text-sm text-ink-400">
                  <Eye className="h-5 w-5" />
                  Click Print or Download above to save a copy.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
