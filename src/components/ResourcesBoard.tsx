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
  Printer,
  Loader2,
  AlertTriangle,
  Package,
} from 'lucide-react';
import { resourceList, resources, type ResourceId } from '@/resources-config';
import {
  downloadResource,
  previewPdf,
  previewDocxHtml,
  printPdf,
  printDocx,
} from '@/lib/generators';
import MedFormsBoard from './MedFormsBoard';
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

type InlinePreviewState = {
  url: string | null;
  html: string | null;
  loading: boolean;
  error: string | null;
};

export default function ResourcesBoard() {
  const [open, setOpen] = useState<ResourceId | null>(null);
  const [inline, setInline] = useState<InlinePreviewState>({
    url: null,
    html: null,
    loading: false,
    error: null,
  });

  // Revoke any blob URL on unmount
  useEffect(() => {
    return () => {
      if (inline.url) URL.revokeObjectURL(inline.url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startInline = async (id: ResourceId) => {
    if (inline.url) URL.revokeObjectURL(inline.url);
    const meta = resources[id];
    setInline({
      url: null,
      html: null,
      loading: true,
      error: null,
    });
    try {
      if (meta.kind === 'pdf') {
        const url = await previewPdf(id);
        setInline({ url, html: null, loading: false, error: null });
      } else {
        const html = previewDocxHtml(id);
        setInline({ url: null, html, loading: false, error: null });
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Could not open preview.';
      setInline({ url: null, html: null, loading: false, error: message });
    }
  };

  const closeInline = () => {
    if (inline.url) URL.revokeObjectURL(inline.url);
    setInline({ url: null, html: null, loading: false, error: null });
  };

  const handlePrint = (id: ResourceId) => {
    const meta = resources[id];
    if (meta.kind === 'pdf') printPdf(id);
    else printDocx(id);
  };

  const current = open ? resources[open] : null;
  const toggle = (id: ResourceId) => {
    setOpen((curr) => {
      const next = curr === id ? null : id;
      if (next && next !== 'medication-audit-checklist') {
        // Preload inline preview so the user sees the doc immediately
        startInline(next);
      } else {
        closeInline();
      }
      return next;
    });
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
                'mt-6 overflow-hidden rounded-[2rem] border border-white/60 shadow-soft backdrop-blur',
                accentStyles[current.accent].panel,
              )}
            >
              <div className="p-8 md:p-12">
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

                {/* Inline preview + action buttons */}
                <div className="mt-7">
                  <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-ink-300">
                      <Eye className="h-3 w-3" />
                      {inline.loading
                        ? 'Building preview…'
                        : inline.error
                        ? 'Preview unavailable'
                        : 'Preview'}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <div
                        className="inline-flex items-center justify-center gap-1 rounded-full border border-ink-200 bg-white px-2 py-1.5 text-xs font-medium text-ink-500 shadow-soft"
                        role="group"
                        aria-label={`View or print ${current.title}`}
                      >
                        <button
                          type="button"
                          onClick={() => startInline(current.id)}
                          aria-label={`View ${current.title}`}
                          className="inline-flex items-center gap-1 rounded-full px-2 py-1 transition-colors hover:bg-cream-50"
                        >
                          <Eye className="h-3 w-3" />
                          <span>View</span>
                        </button>
                        <span className="text-ink-300" aria-hidden>
                          /
                        </span>
                        <button
                          type="button"
                          onClick={() => handlePrint(current.id)}
                          aria-label={`Print ${current.title}`}
                          className="inline-flex items-center gap-1 rounded-full px-2 py-1 transition-colors hover:bg-cream-50"
                        >
                          <Printer className="h-3 w-3" />
                          <span>Print</span>
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => downloadResource(current.id)}
                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink-500 px-4 py-2 text-xs font-medium text-white shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
                      >
                        <span className="relative z-10 inline-flex items-center gap-2">
                          <Download className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                          Download {current.kind.toUpperCase()}
                        </span>
                        <span className="absolute inset-0 -z-0 bg-gradient-to-r from-blush-300 to-mint-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 overflow-hidden rounded-2xl border border-white/60 bg-cream-50 shadow-inner">
                    <div className="aspect-[8.5/11] w-full bg-white">
                      {inline.loading && (
                        <div className="flex h-full items-center justify-center gap-2 text-sm text-ink-400">
                          <Loader2 className="h-4 w-4 animate-spin" /> Generating preview…
                        </div>
                      )}
                      {inline.error && (
                        <div className="flex h-full items-center justify-center gap-2 px-6 text-center text-sm text-ink-500">
                          <AlertTriangle className="h-4 w-4 text-blush-400" />
                          {inline.error}
                        </div>
                      )}
                      {inline.url && (
                        <iframe
                          title={`${current.title} preview`}
                          src={inline.url}
                          className="h-full w-full"
                        />
                      )}
                      {inline.html && (
                        <iframe
                          title={`${current.title} preview`}
                          srcDoc={inline.html}
                          className="h-full w-full bg-white"
                        />
                      )}
                    </div>
                  </div>
                </div>
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
                'mt-6 overflow-hidden rounded-[2rem] border border-white/60 shadow-soft backdrop-blur',
                accentStyles[current.accent].panel,
              )}
            >
              <div className="p-8 md:p-12">
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

                <div className="mt-7 rounded-2xl border border-white/60 bg-cream-50 p-4">
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

                {/* 10 forms inline — no extra click required */}
                <div className="mt-7">
                  <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                    <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-300">
                      <FileText className="mr-1 inline h-3 w-3" />
                      All 10 forms · preview, print or download
                    </div>
                    <button
                      type="button"
                      onClick={() => downloadResource(current.id)}
                      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink-500 px-4 py-2 text-xs font-medium text-white shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      <span className="relative z-10 inline-flex items-center gap-2">
                        <Download className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                        Download all 10 forms
                      </span>
                      <span className="absolute inset-0 -z-0 bg-gradient-to-r from-blush-300 to-mint-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </button>
                  </div>

                  <div className="mt-4">
                    <MedFormsBoard />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
