import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Stethoscope,
  BookMarked,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import Section from '@/components/Section';
import FormsCanvas from '@/components/FormsCanvas';
import HighAlertTriggers from '@/components/HighAlertTriggers';

export default function Forms() {
  return (
    <>
      <div className="pt-16" />

      {/* High-Alert Immediate Intervention Triggers — first thing on the page */}
      <div className="mx-auto w-full max-w-6xl px-6 pt-16 sm:pt-20">
        <HighAlertTriggers />
      </div>

      {/* Internal Tools section — no header, just the heading + showcase box */}
      <Section className="!pt-8">
        {/* Internal Tools — heading sits above the showcase box */}
        <h3 className="mb-6 font-display text-3xl font-semibold tracking-tight text-ink-700 sm:text-4xl md:text-5xl">
          Internal{' '}
          <span className="text-ink-400">Tools.</span>
        </h3>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-8 overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-blush-100 via-white to-mint-100 p-6 shadow-glow backdrop-blur md:p-8"
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
      </Section>

      {/* Printable Forms section header + body */}
      <Section
        className="!pt-8"
        eyebrow="Free Downloads"
        title={
          <>
            Printable{' '}
            <span className="text-ink-400">Forms.</span>
          </>
        }
        description="Single-page PDFs you can print, fill out, and keep on the fridge."
      >
        <FormsCanvas />
      </Section>
    </>
  );
}