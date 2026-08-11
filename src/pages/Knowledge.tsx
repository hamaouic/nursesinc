import Section from '@/components/Section';
import KnowledgeExplorer from '@/components/KnowledgeExplorer';

export default function Knowledge() {
  return (
    <div className="relative overflow-hidden">
      <div className="pt-2" />

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
  );
}