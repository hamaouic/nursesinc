import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import Section from '@/components/Section';
import HighAlertTriggers from '@/components/HighAlertTriggers';
import ToolSwitcher from '@/components/ToolSwitcher';

const ClinicalReferenceMatrix = lazy(
  () => import('@/components/ClinicalReferenceMatrix'),
);

function PanelFallback() {
  return (
    <div className="flex items-center justify-center gap-2 rounded-3xl border border-white/60 bg-white/60 p-12 text-sm text-ink-400 shadow-soft">
      <Loader2 className="h-4 w-4 animate-spin" />
      Loading clinical matrix…
    </div>
  );
}

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
        <Suspense fallback={<PanelFallback />}>
          <ClinicalReferenceMatrix />
        </Suspense>
      </Section>
    </>
  );
}