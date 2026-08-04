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
            10 printable{' '}
            <span className="text-ink-400">medication audit forms.</span>
          </>
        }
        description="Single-page PDFs you can print, fill out, and keep on the fridge. Each form is grounded in the same framework we use in independent practice — designed for families, caregivers, and care-home staff who need to spot problems before they become crises."
      >
        <MedFormsBoard />
      </Section>
    </>
  );
}