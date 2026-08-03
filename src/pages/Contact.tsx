import Section from '@/components/Section';
import ContactForm from '@/components/ContactForm';
import { brand, legal } from '@/nurses-inc-config';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

export default function Contact() {
  return (
    <>
      <div className="pt-28" />
      <Section
        eyebrow="Contact & Booking"
        title={
          <>
            Let's talk —{' '}
            <span className="text-ink-400">no pressure, no scripts.</span>
          </>
        }
        description="Tell us a little about your situation. We read every message ourselves and reply within 24 hours, Monday–Friday."
      >
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          <aside className="space-y-5 lg:col-span-2">
            <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-br from-blush-100 to-white p-7 shadow-soft">
              <h3 className="font-display text-lg font-semibold text-ink-700">
                Reach us directly
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href={`mailto:${brand.email}`}
                    className="group flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 transition-colors hover:bg-white"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-ink-500 shadow-soft">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-[11px] uppercase tracking-widest text-ink-300">
                        Email
                      </span>
                      <span className="font-medium text-ink-700 group-hover:text-ink-500">
                        {brand.email}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${brand.phone.replace(/\s/g, '')}`}
                    className="group flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 transition-colors hover:bg-white"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-ink-500 shadow-soft">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-[11px] uppercase tracking-widest text-ink-300">
                        Phone
                      </span>
                      <span className="font-medium text-ink-700 group-hover:text-ink-500">
                        {brand.phone}
                      </span>
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-ink-500 shadow-soft">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[11px] uppercase tracking-widest text-ink-300">
                      Region
                    </span>
                    <span className="font-medium text-ink-700">
                      {brand.location}
                    </span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-br from-mint-100 to-white p-7 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-ink-500 shadow-soft">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <h3 className="font-display text-lg font-semibold text-ink-700">
                  Your privacy matters
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">
                {legal.phipea}
              </p>
              <p className="mt-3 text-xs uppercase tracking-widest text-ink-300">
                {legal.regulatoryBadge}
              </p>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 p-7 shadow-soft">
              <h3 className="font-display text-lg font-semibold text-ink-700">
                What happens next?
              </h3>
              <ol className="mt-4 space-y-3 text-sm">
                {[
                  'We read your message personally.',
                  'You receive a friendly reply within 24 hours.',
                  'If it fits, we send a Discovery Call invite — 15 minutes, free.',
                  'Together we choose the right next step.',
                ].map((s, i) => (
                  <li key={s} className="flex items-start gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink-500 text-[11px] font-semibold text-white">
                      {i + 1}
                    </span>
                    <span className="text-ink-500">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}