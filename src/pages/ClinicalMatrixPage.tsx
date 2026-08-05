import Section from '@/components/Section';
import ClinicalReferenceMatrix from '@/components/ClinicalReferenceMatrix';
import ToolsDashboard from './ClinicalTools';

export default function ClinicalMatrixPage() {
  return (
    <>
      <div className="pt-28" />
      <Section
        eyebrow="Internal Tool"
        title={
          <>
            Clinical Reference{' '}
            <span className="text-ink-400">Matrix.</span>
          </>
        }
        description="A bedside quick-reference for our nurses. Pick a geriatric topic, then a category — symptoms, screening, red flags, interventions, or NB-specific resources. Filter with the search bar, copy to clipboard, or save to a client note."
      >
        <ToolsDashboard>
          <ClinicalReferenceMatrix />
        </ToolsDashboard>
      </Section>
    </>
  );
}