import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import Section from '@/components/Section';
import HighAlertTriggers from '@/components/HighAlertTriggers';

const ClinicalFormsToggle = lazy(() => import('@/components/ClinicalFormsToggle'));
const FormsCanvas = lazy(() => import('@/components/FormsCanvas'));

function PanelFallback({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-3xl border border-white/60 bg-white/60 p-12 text-sm text-ink-400 shadow-soft">
      <Loader2 className="h-4 w-4 animate-spin" />
      {label}
    </div>
  );
}

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
        className="!pt-12"
        eyebrow="Nurse Reference"
        title={
          <>
            Clinical{' '}
            <span className="text-ink-400">Forms &amp; Tools.</span>
          </>
        }
        description=""
      >
        <Suspense fallback={<PanelFallback label="Loading clinical reference…" />}>
          <ClinicalFormsToggle />
        </Suspense>
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
        <Suspense fallback={<PanelFallback label="Loading forms…" />}>
          <FormsCanvas category="family" />
        </Suspense>
      </Section>
    </>
  );
}