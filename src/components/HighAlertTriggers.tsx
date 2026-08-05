import { motion } from 'framer-motion';
import { AlertOctagon } from 'lucide-react';

export default function HighAlertTriggers() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-3xl border border-blush-300 bg-blush-50/70 p-6 shadow-soft backdrop-blur md:p-7"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-blush-400 text-white shadow-soft">
          <AlertOctagon className="h-5 w-5" />
        </span>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blush-500">
            High-Alert · Immediate Intervention Triggers
          </div>
          <h2 className="font-display text-xl font-semibold text-ink-700">
            When to escalate within the hour
          </h2>
        </div>
      </div>

      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {[
          'Acute Delirium vs. Gradual Dementia — sudden onset = delirium.',
          'Sudden Urinary Retention — new inability to void, painful bladder.',
          'Uncontrolled Orthostatic Drops — syncope, near-syncope on standing.',
          'Anticoagulant + Head Strike — same-day CT regardless of symptoms.',
          'Severe Hypoglycemia — sweating + confusion + aggression = BG check first.',
          'Stroke FAST (Face · Arms · Speech · Time) — any positive sign = 911.',
          'Active Suicidal Ideation — even passive statements require same-day MD.',
          'Acute Psychosis with Risk of Harm — to self, others, or property.',
        ].map((line) => (
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
  );
}