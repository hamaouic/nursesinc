import Section from '@/components/Section';
import ClinicalReferenceMatrix from '@/components/ClinicalReferenceMatrix';
import HighAlertTriggers from '@/components/HighAlertTriggers';
import ToolSwitcher from '@/components/ToolSwitcher';

export default function ClinicalMatrixPage() {
  return (
    <>
      <div className="pt-28" />
      <Section
        eyebrow="Internal Tools · Geriatric Clinical Guide"
        eyebrowAction={<ToolSwitcher />}
        title={
          <>
            Geriatric Medication &amp; Behavioral{' '}
            <span className="text-ink-400">Reference Matrix.</span>
          </>
        }
        description="An instantly searchable bedside cheat-sheet for home visits. Search by diagnosis, medication, or symptom — then drill into Medications, High-Alert Flags, Symptoms & Behaviours, Screening Tools, Interventions, or NB Resources. Each medication expands into caregiver-interview prompts to surface hidden non-compliance."
      >
        <div className="mt-6">
          <HighAlertTriggers />
        </div>
        <ClinicalReferenceMatrix />
      </Section>
    </>
  );
}