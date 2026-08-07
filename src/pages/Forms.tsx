import Section from '@/components/Section';
import FormsCanvas from '@/components/FormsCanvas';
import ClinicalFormsToggle from '@/components/ClinicalFormsToggle';
import HighAlertTriggers from '@/components/HighAlertTriggers';

export default function Forms() {
  return (
    <>
      <div className="pt-16" />

      {/* High-Alert Immediate Intervention Triggers — first thing on the page */}
      <div className="mx-auto w-full max-w-6xl px-6 pt-16 sm:pt-20">
        <HighAlertTriggers />
      </div>

      {/* Clinical Forms & Tools — toggle between interactive tools and printable PDFs */}
      <Section
        className="!pt-8"
        eyebrow="Nurse Reference"
        title={
          <>
            Clinical{' '}
            <span className="text-ink-400">Forms &amp; Tools.</span>
          </>
        }
        description="Single-page reference sheets and interactive tools for nursing visits — Beers, STOPP/START, polypharmacy, deprescribing algorithms and more."
      >
        <ClinicalFormsToggle />
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
        <FormsCanvas category="family" />
      </Section>
    </>
  );
}