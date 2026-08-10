import Section from '@/components/Section';
import SectionDivider from '@/components/SectionDivider';
import KnowledgeExplorer from '@/components/KnowledgeExplorer';
import ResourcesBoard from '@/components/ResourcesBoard';

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
          eyebrow="Free Downloads"
          title={
            <>
              Meet Up Tools —{' '}
              <span className="text-ink-400">
                Tap any card to preview, print or download.
              </span>
            </>
          }
          description=""
        >
          <ResourcesBoard />
        </Section>
      </div>
    </>
  );
}