import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Building2,
  Stethoscope,
  Clock,
  MapPin,
  Phone,
  Mail,
  Shield,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import Section from '@/components/Section';
import SectionDivider from '@/components/SectionDivider';
import { cn } from '@/lib/utils';

const facts = [
  { title: 'Founded', value: '2024', sub: 'by Catherine Hamaoui, LPN' },
  { title: 'Operating model', value: 'Independent', sub: 'collaborative practice' },
  { title: 'Physician oversight', value: 'On-call', sub: '24 / 7 via SBAR line' },
  { title: 'Service area', value: 'New Brunswick', sub: 'Greater Moncton + 50 km' },
];

const pillars = [
  {
    title: 'Collaborative practice',
    description: 'Catherine (LPN) carries the visits and the day-to-day plan. A collaborating physician reviews every chart weekly and is on-call for escalation. This is the model New Brunswick\uff07s regulatory bodies expect and that families deserve.',
    icon: Stethoscope,
    color: 'bg-blush-100 text-blush-500 ring-blush-200',
  },
  {
    title: 'PHIPAA-aligned operations',
    description: 'Every chart, message, and portal request runs through PHIPAA-compliant infrastructure. Family portals are permissioned. We never text identifiable health information. The privacy badge on every page is not decorative.',
    icon: Shield,
    color: 'bg-mint-100 text-mint-500 ring-mint-200',
  },
  {
    title: 'Small by design',
    description: 'A roster of ~30 active clients. Two staff. One physician partner. The clinic is small on purpose so the care stays personal — the alternative is a roster that grows until the nurse knows her clients by chart, not by name.',
    icon: Users,
    color: 'bg-cream-200 text-ink-500 ring-cream-200',
  },
];

const hours = [
  { day: 'Monday \u2013 Friday', hours: '8:00 am \u2013 6:00 pm AT' },
  { day: 'Saturday', hours: '9:00 am \u2013 1:00 pm AT' },
  { day: 'Sunday', hours: 'Closed (on-call line active)' },
  { day: 'Holidays', hours: 'Closed (on-call physician available)' },
];

export default function Clinic() {
  return (
    <>
      <section className="relative overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-24 top-8 h-80 w-80 rounded-full bg-mint-200 opacity-50 blur-3xl"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-24 top-32 h-72 w-72 rounded-full bg-cream-200 opacity-60 blur-3xl"
        />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-8 pt-32 sm:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-ink-400 shadow-soft backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint-300" />
              About the clinic
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-ink-700 sm:text-5xl md:text-6xl">
              Independent.{' '}
              <span className="text-ink-400">Collaborative. Small on purpose.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-400">
              Nurses Inc. is an independent collaborative nursing practice in New
              Brunswick. Two people, one physician partner, one mission: dignified
              care for older adults and the families who love them.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="pink" />

      <Section
        eyebrow="The practice at a glance"
        title={<>Quick facts</>}
        description="Snapshot of how the clinic is structured. Detailed information below in the pillars section."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.05 }}
              className="rounded-2xl border border-white/70 bg-white/85 p-5 shadow-soft backdrop-blur"
            >
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-300">
                {f.title}
              </div>
              <div className="mt-2 font-display text-2xl font-semibold text-ink-700">
                {f.value}
              </div>
              <div className="mt-1 text-[11px] text-ink-400">{f.sub}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      <SectionDivider variant="cream" />

      <Section
        eyebrow="How the clinic works"
        title={
          <>
            Three pillars that shape every visit —{' '}
            <span className="text-ink-400">and every decision.</span>
          </>
        }
        description="What you can expect from Nurses Inc. — the structure, the standards, and the reasoning behind how we operate."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.05 }}
              className="group overflow-hidden rounded-3xl border border-white/60 bg-white/85 p-6 shadow-soft backdrop-blur transition hover:-translate-y-0.5"
            >
              <span
                className={cn(
                  'grid h-12 w-12 place-items-center rounded-2xl ring-1 ring-inset',
                  p.color,
                )}
              >
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink-700">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-400">
                {p.description}
              </p>
            </motion.article>
          ))}
        </div>
      </Section>

      <SectionDivider variant="mint" />

      <Section
        eyebrow="Visit, call, or write"
        title={
          <>
            Hours and contact —{' '}
            <span className="text-ink-400">all the ways to reach us.</span>
          </>
        }
        description="The clinic is intentionally small. We do not have a walk-in front desk — visits are by appointment in the home or by phone / video. Use the channels below to reach us."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            className="rounded-3xl border border-white/60 bg-white/85 p-6 shadow-soft backdrop-blur"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-ink-50 text-ink-500">
                <Clock className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg font-semibold text-ink-700">
                Hours of operation
              </h3>
            </div>
            <ul className="mt-4 divide-y divide-ink-100/60">
              {hours.map((h) => (
                <li key={h.day} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="text-ink-500">{h.day}</span>
                  <span className="font-mono text-[12px] text-ink-700">
                    {h.hours}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[11px] text-ink-400">
              All times Atlantic (AT). On-call physician available 24/7 for
              active clients via the SBAR escalation line.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1], delay: 0.05 }}
            className="rounded-3xl border border-white/60 bg-white/85 p-6 shadow-soft backdrop-blur"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-ink-50 text-ink-500">
                <Building2 className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg font-semibold text-ink-700">
                Contact information
              </h3>
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" />
                <div>
                  <div className="font-semibold text-ink-700">613.315.5040</div>
                  <div className="text-[11px] text-ink-400">
                    Main line — calls returned within 4 business hours
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" />
                <div>
                  <div className="font-semibold text-ink-700">
                    cathamaoui@hotmail.com
                  </div>
                  <div className="text-[11px] text-ink-400">
                    Non-urgent clinical and admin requests
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" />
                <div>
                  <div className="font-semibold text-ink-700">
                    Greater Moncton, NB
                  </div>
                  <div className="text-[11px] text-ink-400">
                    Visits in the home — no walk-in front desk
                  </div>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </Section>

      <Section
        eyebrow="What we never do"
        title={
          <>
            The line we hold —{' '}
            <span className="text-ink-400">because someone has to.</span>
          </>
        }
        description="Practices of integrity are written down. Here is what Nurses Inc. does not do, regardless of who is asking."
        align="center"
      >
        <div className="mx-auto grid max-w-3xl gap-3 text-left sm:grid-cols-2">
          {[
            'Text or email identifiable health information.',
            'Take a new client we cannot serve properly.',
            'Skip the physician review on a care plan.',
            'Use family emergencies as a sales opportunity.',
            'Charge for services that are already covered by MSI (New Brunswick’s publicly funded Medicare plan).',
            'Share client information with third parties without consent.',
          ].map((line, i) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.04 }}
              className="flex items-start gap-2.5 rounded-2xl border border-white/70 bg-white/85 p-3.5 shadow-soft backdrop-blur"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-mint-500" />
              <span className="text-sm text-ink-700">{line}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Visit us"
        title={
          <>
            Start with a discovery call —{' '}
            <span className="text-ink-400">no sales pitch.</span>
          </>
        }
        description="A 30-minute conversation to understand your situation and whether Nurses Inc. is the right fit. We say no when it isn't."
        align="center"
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-ink-500 px-6 py-3 text-sm font-medium text-white shadow-soft transition hover:-translate-y-0.5"
          >
            <Sparkles className="h-4 w-4" />
            <span>Book a Discovery Call</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-6 py-3 text-sm font-medium text-ink-500 shadow-soft transition hover:-translate-y-0.5"
          >
            See services
          </Link>
        </div>
      </Section>
    </>
  );
}