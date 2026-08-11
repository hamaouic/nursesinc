import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Loader2 } from 'lucide-react';
import Section from '@/components/Section';
import HighAlertTriggers from '@/components/HighAlertTriggers';
import ToolSwitcher from '@/components/ToolSwitcher';

// Heavy bundles — split out so the page shell renders instantly while
// the worksheet and SBAR escalation tools load in parallel.
const ReconciliationDashboard = lazy(() => import('@/components/ReconciliationDashboard'));
const SbarEscalation = lazy(() => import('@/components/SbarEscalation'));

function PanelFallback({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-3xl border border-white/60 bg-white/60 p-12 text-sm text-ink-400 shadow-soft">
      <Loader2 className="h-4 w-4 animate-spin" />
      {label}
    </div>
  );
}

export default function Reconciliation() {
  return (
    <>
      <div className="pt-28" />
      <Section
        eyebrow="Internal Tools"
        eyebrowAction={<ToolSwitcher />}
        title={
          <>
            Medication Reconciliation{' '}
            <span className="text-ink-400">Worksheet.</span>
          </>
        }
      >
        <div className="mt-6">
          <HighAlertTriggers />
        </div>

        <div className="mt-10">
          <Suspense fallback={<PanelFallback label="Loading worksheet…" />}>
            <ReconciliationDashboard />
          </Suspense>
        </div>

        {/* Divider — visual handoff between Part A and Part B */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 flex items-center gap-4"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-300">
            Part B
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-white/60 via-ink-100 to-white/60" />
          <ChevronRight className="h-4 w-4 text-ink-300" />
          <span className="h-px flex-1 bg-gradient-to-r from-white/60 via-ink-100 to-white/60" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-300">
            When escalation is required
          </span>
        </motion.div>

        <div className="mt-6">
          <Suspense fallback={<PanelFallback label="Loading SBAR escalation…" />}>
            <SbarEscalation />
          </Suspense>
        </div>
      </Section>
    </>
  );
}