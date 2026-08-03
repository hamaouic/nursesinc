import Hero from '@/components/Hero';
import Section from '@/components/Section';
import SectionDivider from '@/components/SectionDivider';
import MeetTeam from '@/components/MeetTeam';
import ServicesTeaser from '@/components/ServicesTeaser';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Hero />

      <Section
        id="team"
        eyebrow="Meet the Team"
        title={
          <>
            A small, sharp practice —{' '}
            <span className="text-ink-400">anchored by a physician.</span>
          </>
        }
        description="Two people, one mission: dignified care for older adults and the families who love them. Every chart, plan, and home visit carries our collaborative signature."
      >
        <MeetTeam />
      </Section>

      <SectionDivider variant="mint" />

      <Section
        id="teaser"
        eyebrow="Services & Pricing"
        title={
          <>
            Four of our most-loved{' '}
            <span className="text-ink-400">engagements.</span>
          </>
        }
        description="From a free Discovery Call to in-depth facility audits — every service is delivered under physician oversight and PHIPAA-aligned record keeping."
      >
        <ServicesTeaser />
        <div className="mt-10 flex justify-center">
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 rounded-full bg-ink-500 px-6 py-3 text-sm font-medium text-white shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
          >
            See all services & NB rates
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </Section>

      <SectionDivider variant="cream" />

      <Section
        id="knowledge"
        eyebrow="Knowledge Hub"
        title={
          <>
            Caregiver-grade knowledge,{' '}
            <span className="text-ink-400">without the jargon.</span>
          </>
        }
        description="Browse bite-sized insights on dementia, late-life mental health, and aging well at home — written by a nurse who has sat at your kitchen table."
      >
        <div className="flex justify-center">
          <Link
            to="/knowledge"
            className="group inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white/70 px-6 py-3 text-sm font-medium text-ink-500 shadow-soft backdrop-blur transition-colors hover:bg-white"
          >
            Open the Knowledge Hub
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </Section>
    </>
  );
}