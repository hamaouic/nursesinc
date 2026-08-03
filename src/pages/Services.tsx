import Section from '@/components/Section';
import ServicesBoard from '@/components/ServicesBoard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Services() {
  return (
    <>
      <div className="pt-28" />
      <Section
        eyebrow="Services & Pricing"
        title={
          <>
            Twelve ways we can help —{' '}
            <span className="text-ink-400">clearly priced, no surprises.</span>
          </>
        }
        description="Independent New Brunswick rates built for families and care facilities. Switch between Family Care and Facility Contracting below."
      >
        <ServicesBoard />
      </Section>

      <Section
        eyebrow="Ready when you are"
        title={
          <>
            Not sure which service fits?{' '}
            <span className="text-ink-400">Start with a free Discovery Call.</span>
          </>
        }
        description="Fifteen minutes, no obligation. We'll listen, answer questions, and recommend a path forward."
      >
        <div className="flex justify-center">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-ink-500 px-6 py-3 text-sm font-medium text-white shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
          >
            Book a Discovery Call
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </Section>
    </>
  );
}