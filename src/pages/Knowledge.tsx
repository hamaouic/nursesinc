import Section from '@/components/Section';
import SectionDivider from '@/components/SectionDivider';
import KnowledgeExplorer from '@/components/KnowledgeExplorer';

export default function Knowledge() {
  return (
    <>
      <div className="pt-2" />

      <div className="relative overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-blush-200 opacity-50 blur-3xl"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-32 top-44 h-80 w-80 rounded-full bg-mint-200 opacity-50 blur-3xl"
        />
        <Section
          eyebrow="Knowledge Hub"
          title={
            <>
              Pick a path —{' '}
              <span className="text-ink-400">
                Grounded in Canadian best-practice guidelines.
              </span>
            </>
          }
          description=""
        >
          <KnowledgeExplorer />
        </Section>
      </div>

      <SectionDivider variant="mint" />

      <div className="relative overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-mint-200 opacity-50 blur-3xl"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-32 top-32 h-80 w-80 rounded-full bg-cream-200 opacity-60 blur-3xl"
        />
        <Section
          eyebrow="Free downloads"
          title={
            <>
              Meet-up tools —{' '}
              <span className="text-ink-400">
                Find Medication Audit, De-escalation Playbook, and the Family
                Care Conference Kit under <strong>Printable Forms</strong> on
                the <a href="/forms" className="underline underline-offset-4">Caregiver Forms</a> page.
              </span>
            </>
          }
          description=""
        >
          <p className="mx-auto max-w-2xl text-center text-sm text-ink-400">
            The three printable resource bundles previously shown here now live
            alongside the printable clinical forms, so every tool you need is
            in one place. They remain free to preview, print, and download.
          </p>
        </Section>
      </div>
    </>
  );
}