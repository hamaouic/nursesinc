import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Stethoscope,
  BookMarked,
  ArrowRight,
  Sparkles,
  Wrench,
} from 'lucide-react';
import Section from '@/components/Section';
import MedFormsBoard from '@/components/MedFormsBoard';

export default function Forms() {
  return (
    <>
      <div className="pt-28" />
      <Section
        eyebrow="Free Downloads"
        title={
          <>
            Printable{' '}
            <span className="text-ink-400">Forms.</span>
          </>
        }
        description="Single-page PDFs you can print, fill out, and keep on the fridge. Each form is grounded in the same framework we use in independent practice — designed for families, caregivers, and care-home staff who need to spot problems before they become crises."
      >
        {/* Internal Tools showcase — sits above the printable grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-8 overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-blush-100 via-white to-mint-100 p-6 shadow-glow backdrop-blur md:p-8"
        >
          <div className="mb-5 flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-ink-500 text-white">
              <Wrench className="h-3.5 w-3.5" />
            </span>
            <h3 className="font-display text-lg font-semibold text-ink-700">
              Internal Tools
            </h3>
            <span className="rounded-full bg-mint-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-ink-700">
              Nurses Only
            </span>
          </div>

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
                    Clinical Reference Matrix
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-blush-200 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-ink-700">
                    <Sparkles className="h-2.5 w-2.5" />
                    New
                  </span>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-ink-400">
                  Bedside geriatric reference by topic — symptoms, screens,
                  red flags, interventions, NB resources.
                </p>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 text-ink-300 transition-transform group-hover:translate-x-1 group-hover:text-ink-700" />
            </Link>
          </div>
        </motion.div>

        <MedFormsBoard />
      </Section>
    </>
  );
}