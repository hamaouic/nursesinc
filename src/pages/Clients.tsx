import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  Heart,
  Shield,
  Phone,
  Calendar,
  FileText,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import Section from '@/components/Section';
import { cn } from '@/lib/utils';

const careTypes = [
  {
    title: 'Older adults at home',
    description:
      'Routine wellness visits, medication reviews, chronic disease monitoring, and post-hospital follow-up for seniors living independently or with family.',
    icon: Heart,
    color: 'bg-blush-100 text-blush-500 ring-blush-200',
  },
  {
    title: 'Post-surgical recovery',
    description:
      'Wound care, drain management, mobility support, and SBAR escalation to your physician during the critical 2–6 week post-op window.',
    icon: Shield,
    color: 'bg-mint-100 text-mint-500 ring-mint-200',
  },
  {
    title: 'Caregiver-supported households',
    description:
      'Family caregivers get respite, training, and a clinical partner they can text. We sit with you at the kitchen table and translate the medical jargon.',
    icon: Users,
    color: 'bg-amber-100 text-amber-500 ring-amber-200',
  },
  {
    title: 'Complex medication regimens',
    description:
      'Brown-bag medication reviews, deprescribing conversations, and reconciliation across specialists — built around the MedRec workflow already on this site.',
    icon: FileText,
    color: 'bg-indigo-100 text-indigo-500 ring-indigo-200',
  },
];

const services = [
  {
    title: 'Same-day clinical calls',
    description:
      'Speak with an LPN by phone or video within 4 hours during business days. After-hours: SBAR escalation line reaches the on-call physician.',
    icon: Phone,
  },
  {
    title: 'Quarterly wellness reviews',
    description:
      'In-home check-ins every 90 days that catch subtle changes before they become hospital trips. Includes cognitive screening, gait check, and medication review.',
    icon: Calendar,
  },
  {
    title: 'Family portal access',
    description:
      'Caregivers and adult children get a secure portal to view the visit summary, upcoming appointments, and care plan — with PHIPAA-aligned privacy throughout.',
    icon: Shield,
  },
];

export default function Clients() {
  return (
    <>
      <section className="relative mx-auto w-full max-w-6xl px-6 pb-8 pt-32 sm:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-ink-400 shadow-soft backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blush-300" />
            For clients and families
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-ink-700 sm:text-5xl md:text-6xl">
            Care that shows up.{' '}
            <span className="text-ink-400">Quietly, calmly, on time.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-400">
            Nurses Inc. is a small collaborative practice in New Brunswick. We
            work with a small roster of older adults and their families — never
            more clients than we can care for properly. Every visit is with the
            same nurse, every plan is reviewed by the same physician.
          </p>
        </motion.div>
      </section>

      <Section
        eyebrow="Who we care for"
        title={
          <>
            Built around the people we serve —{' '}
            <span className="text-ink-400">not the other way around.</span>
          </>
        }
        description="Most of our roster is older adults living at home, with a growing number of post-surgical and complex-medication cases. We take a small number of new clients per quarter so quality stays high."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {careTypes.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.05 }}
              className="group overflow-hidden rounded-3xl border border-white/60 bg-white/85 p-6 shadow-soft backdrop-blur transition hover:-translate-y-0.5"
            >
              <span
                className={cn(
                  'grid h-12 w-12 place-items-center rounded-2xl ring-1 ring-inset',
                  c.color,
                )}
              >
                <c.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink-700">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-400">
                {c.description}
              </p>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="What's included"
        title={
          <>
            The day-to-day —{' '}
            <span className="text-ink-400">and the day you didn't expect.</span>
          </>
        }
        description="Every Nurses Inc. client gets the same onboarding and the same baseline services. Care is delivered by LPNs with physician oversight — collaborative by design."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.05 }}
              className="group overflow-hidden rounded-2xl border border-white/70 bg-white/85 p-5 shadow-soft backdrop-blur transition hover:-translate-y-0.5"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink-50 text-ink-500">
                <s.icon className="h-4 w-4" />
              </span>
              <h3 className="mt-3 font-display text-base font-semibold text-ink-700">
                {s.title}
              </h3>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-400">
                {s.description}
              </p>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="A small roster on purpose"
        title={
          <>
            We say no to growth —{' '}
            <span className="text-ink-400">so we can say yes to quality.</span>
          </>
        }
        description="The math is simple: an LPN can carry a small caseload well, or a big one badly. We cap our roster so every visit is unhurried, every follow-up is real, and every family gets a direct number."
        align="center"
        className="text-center"
      >
        <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-3">
          {[
            { value: '~30', label: 'active clients', sub: 'on the roster at a time' },
            { value: '48 h', label: 'response time', sub: 'for routine clinical calls' },
            { value: '92%', label: 'kept at home', sub: 'avoiding ER visits in 2025' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.05 }}
              className="rounded-2xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur"
            >
              <div className="font-display text-4xl font-semibold text-ink-700">
                {s.value}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
                {s.label}
              </div>
              <div className="mt-1 text-[11px] text-ink-400">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Ready to talk?"
        title={
          <>
            We take a few new clients per quarter.{' '}
            <span className="text-ink-400">Let\u2019s start with a discovery call.</span>
          </>
        }
        description="A 30-minute video call with Catherine — no commitment, no sales pitch. We\u2019ll talk about your situation, your goals, and whether our roster has space."
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
