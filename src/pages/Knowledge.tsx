import Section from '@/components/Section';
import KnowledgeExplorer from '@/components/KnowledgeExplorer';
import ResourcesBoard from '@/components/ResourcesBoard';

export default function Knowledge() {
  return (
    <>
      <div className="pt-28" />
      <Section
        eyebrow="Knowledge Hub"
        title={
          <>
            Pick a path.{' '}
            <span className="text-ink-400">We'll do the reading for you.</span>
          </>
        }
        description="Choose a topic and the page will quietly shift to match. Every insight is evidence-aligned, shaped by real New Brunswick caregiving experience, and grounded in Canadian best-practice guidelines."
      >
        <KnowledgeExplorer />
      </Section>

      <Section
        eyebrow="Free Downloads"
        title={
          <>
            A growing library of{' '}
            <span className="text-ink-400">caregiver resources.</span>
          </>
        }
        description="Printable medication audit checklists, facility de-escalation playbooks, and family-care conference templates — all built on the same framework we use in practice. Tap any card to preview and download."
      >
        <ResourcesBoard />
      </Section>
    </>
  );
}