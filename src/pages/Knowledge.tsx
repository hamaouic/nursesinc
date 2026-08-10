import Section from '@/components/Section';
import KnowledgeExplorer from '@/components/KnowledgeExplorer';
import ResourcesBoard from '@/components/ResourcesBoard';

export default function Knowledge() {
  return (
    <>
      <div className="pt-2" />
      <Section
        eyebrow="Knowledge Hub"
        title={
          <>
            Pick a path —{' '}
            <span className="text-ink-400">Grounded in Canadian best-practice guidelines.</span>
          </>
        }
        description=""
      >
        <KnowledgeExplorer />
      </Section>

      <Section
        eyebrow="Free Downloads"
        title={
          <>
            Meet Up Tools —{' '}
            <span className="text-ink-400">Tap any card to preview, print or download.</span>
          </>
        }
        description=""
      >
        <ResourcesBoard />
      </Section>
    </>
  );
}