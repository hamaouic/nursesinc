import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  BookMarked,
  ArrowRight,
  Sparkles,
  FileText,
  Wrench,
  BookOpen,
} from 'lucide-react';
import FormsCanvas from '@/components/FormsCanvas';
import GlossaryList from '@/components/GlossaryList';
import { cn } from '@/lib/utils';

type View = 'forms' | 'tools' | 'definitions';

const views: { id: View; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'forms', label: 'Printable Forms', icon: FileText },
  { id: 'tools', label: 'Interactive Tools', icon: Wrench },
  { id: 'definitions', label: 'Definitions', icon: BookOpen },
];

export default function ClinicalFormsToggle() {
  const [view, setView] = useState<View>('forms');

  return (
    <div>
      {/* Segmented toggle — Tools / Forms */}
      <div className="mb-6 flex items-center justify-center">
        <div
          role="tablist"
          aria-label="Toggle between printable forms, interactive tools, and definitions"
          className="inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/70 p-1 shadow-soft backdrop-blur"
        >
          {views.map((v) => {
            const isActive = view === v.id;
            const Icon = v.icon;
            return (
              <button
                key={v.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setView(v.id)}
                className={cn(
                  'relative inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors',
                  isActive
                    ? 'text-white'
                    : 'text-ink-500 hover:text-ink-700',
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="clinical-toggle-pill"
                    className="absolute inset-0 rounded-full bg-ink-700 shadow-soft"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative inline-flex items-center gap-1.5">
                  <Icon
                    className={cn(
                      'h-3.5 w-3.5',
                      isActive ? 'text-white' : 'text-ink-300',
                    )}
                    aria-hidden="true"
                  />
                  <span>{v.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Toggled content */}
      <AnimatePresence mode="wait">
        {view === 'forms' && (
          <motion.div
            key="forms"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <FormsCanvas category="clinical" searchPlaceholder="Search 7 clinical printable forms by keyword or condition…" />
          </motion.div>
        )}

        {view === 'tools' && (
          <motion.div
            key="tools"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              className="overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-blush-100 via-white to-mint-100 p-6 shadow-glow backdrop-blur md:p-8"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  to="/forms/reconciliation"
                  className="group flex items-start gap-4 rounded-2xl border border-white/60 bg-white/80 p-5 shadow-soft transition hover:-translate-y-0.5"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-mint-200 text-ink-700 shadow-soft">
                    <Stethoscope className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm font-semibold text-ink-700">
                        Reconciliation Worksheet
                      </span>
                      <span className="rounded-full bg-mint-200 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-ink-700">
                        Live
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed text-ink-400">
                      Part A audit + Part B SBAR escalation with JSON summary.
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 text-ink-300 transition-transform group-hover:translate-x-1 group-hover:text-ink-700" />
                </Link>

                <Link
                  to="/forms/clinical-tools"
                  className="group flex items-start gap-4 rounded-2xl border border-white/60 bg-white/80 p-5 shadow-soft transition hover:-translate-y-0.5"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blush-200 text-ink-700 shadow-soft">
                    <BookMarked className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm font-semibold text-ink-700">
                        Geriatric Reference Matrix
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-blush-200 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-ink-700">
                        <Sparkles className="h-2.5 w-2.5" />
                        New
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed text-ink-400">
                      Searchable medication + behavioural cheat-sheet for home
                      visits — with caregiver-interview prompts.
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 text-ink-300 transition-transform group-hover:translate-x-1 group-hover:text-ink-700" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}

        {view === 'definitions' && (
          <motion.div
            key="definitions"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <GlossaryList />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
