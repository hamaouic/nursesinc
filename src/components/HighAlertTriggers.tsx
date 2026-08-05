import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertOctagon, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const TRIGGERS = [
  'Acute Delirium vs. Gradual Dementia — sudden onset = delirium.',
  'Sudden Urinary Retention — new inability to void, painful bladder.',
  'Uncontrolled Orthostatic Drops — syncope, near-syncope on standing.',
  'Anticoagulant + Head Strike — same-day CT regardless of symptoms.',
  'Severe Hypoglycemia — sweating + confusion + aggression = BG check first.',
  'Stroke FAST (Face · Arms · Speech · Time) — any positive sign = 911.',
  'Active Suicidal Ideation — even passive statements require same-day MD.',
  'Acute Psychosis with Risk of Harm — to self, others, or property.',
];

export default function HighAlertTriggers() {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-3xl border border-blush-300 bg-blush-50/70 shadow-soft backdrop-blur"
    >
      {/* Header — clickable to toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="high-alert-triggers-list"
        className={cn(
          'flex w-full items-center gap-3 p-6 text-left transition-colors md:p-7',
          'hover:bg-blush-50/40',
        )}
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-blush-400 text-white shadow-soft">
          <AlertOctagon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blush-500">
            High-Alert · Immediate Intervention Triggers
          </div>
          <h2 className="font-display text-xl font-semibold text-ink-700">
            When to escalate within the hour
          </h2>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {!open && (
            <span className="rounded-full bg-blush-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-ink-700">
              {TRIGGERS.length} triggers
            </span>
          )}
          <span
            className={cn(
              'grid h-9 w-9 place-items-center rounded-full border border-blush-300 bg-white text-blush-500 shadow-soft transition-transform duration-300',
              open && 'rotate-180',
            )}
          >
            <ChevronDown className="h-4 w-4" />
          </span>
        </div>
      </button>

      {/* Collapsible body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="high-alert-triggers-list"
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <ul className="grid gap-2 px-6 pb-6 sm:grid-cols-2 md:px-7 md:pb-7">
              {TRIGGERS.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2 rounded-xl border border-blush-200 bg-white/70 p-3 text-[12px] leading-relaxed text-ink-700"
                >
                  <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-blush-500" />
                  {line}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}