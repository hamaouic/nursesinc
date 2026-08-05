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
      >
        <div className="mt-6">
          <HighAlertTriggers />
        </div>
        <ClinicalReferenceMatrix />
      </Section>
    </>
  );
}