import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Section from '@/components/Section';
import ReconciliationDashboard from '@/components/ReconciliationDashboard';
import SbarEscalation from '@/components/SbarEscalation';
import HighAlertTriggers from '@/components/HighAlertTriggers';
import ToolSwitcher from '@/components/ToolSwitcher';

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
        description="An in-browser clinical dashboard for our nurses. Fill in each section during the home visit — counts, barriers, and escalations update live. Lock the audit to generate a clean JSON summary you can paste into the secure client record."
      >
        <div className="mt-6">
          <HighAlertTriggers />
        </div>

        <ReconciliationDashboard />

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
          <SbarEscalation />
        </div>
      </Section>
    </>
  );
}