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
          title={<>Find printable tools on the Caregiver Forms page.</>}
          description=""
        >
          <p className="mx-auto max-w-2xl text-center text-sm text-ink-400">
            Medication Audit Forms, the De-escalation Playbook, and the Family
            Care Conference Kit now live alongside the printable clinical
            forms on the{' '}
            <a
              href="/forms"
              className="font-semibold text-ink-700 underline underline-offset-4 hover:text-blush-500"
            >
              Caregiver Forms
            </a>{' '}
            page, under <strong>Printable Forms</strong>.
          </p>
        </Section>
      </div>
    </>
  );
}