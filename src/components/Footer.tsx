import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, HeartPulse } from 'lucide-react';
import { brand, legal } from '@/nurses-inc-config';

export default function Footer() {
  return (
    <footer className="relative z-10 mt-24 overflow-hidden border-t border-white/60 bg-gradient-to-br from-blush-100/70 via-white to-mint-100/70">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-blush-200 opacity-50 blur-3xl" />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-blush-200 to-mint-200 shadow-glow">
              <HeartPulse className="h-5 w-5 text-ink-500" />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">
              {brand.name}
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-400">
            An independent collaborative nursing practice in {brand.location} —
            specializing in geriatrics, dementia, and late-life mental health.
            {legal.regulatoryBadge}.
          </p>
          <div className="mt-6 flex flex-col gap-2 text-sm text-ink-500">
            <a
              href={`mailto:${brand.email}`}
              className="inline-flex items-center gap-2 hover:text-ink-700"
            >
              <Mail className="h-4 w-4" /> {brand.email}
            </a>
            <a
              href={`tel:${brand.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 hover:text-ink-700"
            >
              <Phone className="h-4 w-4" /> {brand.phone}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {brand.location}
            </span>
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-ink-300">
            Explore
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { to: '/', label: 'Home' },
              { to: '/services', label: 'Services & Pricing' },
              { to: '/knowledge', label: 'Knowledge Hub' },
              { to: '/forms', label: 'Caregiver Forms' },
              { to: '/contact', label: 'Contact & Booking' },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-ink-400 transition-colors hover:text-ink-700"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-ink-300">
            Compliance
          </h4>
          <p className="mt-4 text-xs leading-relaxed text-ink-400">
            {legal.phipea}
          </p>
        </div>
      </div>
      <div className="border-t border-white/60 bg-white/30">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-6 py-5 text-xs text-ink-400 sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {brand.name}. Crafted with care in{' '}
            {brand.location}.
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint-400" />
            Accepting new clients
          </span>
        </div>
      </div>
    </footer>
  );
}