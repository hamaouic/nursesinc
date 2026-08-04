import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Stethoscope, ArrowRight, Sparkles } from 'lucide-react';
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
        {/* Premium interactive dashboard CTA — sits above the printable grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-8 overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-blush-100 via-white to-mint-100 p-6 shadow-glow backdrop-blur md:p-8"
        >
          <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-ink-500 text-white shadow-soft">
                <Stethoscope className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-mint-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-ink-700">
                    <Sparkles className="h-3 w-3" />
                    Internal Tool
                  </span>
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink-700 md:text-2xl">
                  Medication Reconciliation Worksheet
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-400">
                  A premium in-browser dashboard for our nurses. Live
                  reconciliation matrix, barrier rating cards, geriatric
                  psychotropic focus, and digital sign-off — with a clean JSON
                  summary at the end.
                </p>
              </div>
            </div>
            <Link
              to="/forms/reconciliation"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-ink-500 px-5 py-3 text-sm font-semibold text-white shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
            >
              Open Dashboard
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        <MedFormsBoard />
      </Section>
    </>
  );
}