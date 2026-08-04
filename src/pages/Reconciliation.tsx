import Section from '@/components/Section';
import ReconciliationDashboard from '@/components/ReconciliationDashboard';

export default function Reconciliation() {
  return (
    <>
      <div className="pt-28" />
      <Section
        eyebrow="Internal Tool"
        title={
          <>
            Medication Reconciliation{' '}
            <span className="text-ink-400">Worksheet.</span>
          </>
        }
        description="An in-browser clinical dashboard for our nurses. Fill in each section during the home visit — counts, barriers, and escalations update live. Lock the audit to generate a clean JSON summary you can paste into the secure client record."
      >
        <ReconciliationDashboard />
      </Section>
    </>
  );
}