import { NavLink, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X, HeartPulse } from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/knowledge', label: 'Knowledge Hub' },
  { to: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'translate-y-2' : 'translate-y-0',
      )}
    >
      <div
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/60 px-4 py-2 transition-all duration-500 sm:px-6',
          scrolled
            ? 'glass shadow-soft max-w-5xl'
            : 'bg-white/30 backdrop-blur-sm shadow-none',
        )}
      >
        <Link
          to="/"
          className="group flex items-center gap-2 rounded-full px-2 py-1"
          aria-label="Nurses Inc. home"
        >
          <span className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-blush-200 to-mint-200 shadow-glow">
            <HeartPulse className="h-5 w-5 text-ink-500 transition-transform duration-500 group-hover:scale-110" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Nurses Inc.
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                cn(
                  'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-ink-700'
                    : 'text-ink-400 hover:text-ink-700',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative z-10">{l.label}</span>
                  {isActive && (
                    <span className="absolute inset-0 -z-0 rounded-full bg-blush-100" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink-500 px-5 py-2.5 text-sm font-medium text-white shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span className="relative z-10">Book a Discovery Call</span>
            <span className="absolute inset-0 -z-0 bg-gradient-to-r from-blush-300 to-mint-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          className="grid h-10 w-10 place-items-center rounded-full bg-white/60 text-ink-500 shadow-soft md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          'mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-white/60 transition-all duration-500 md:hidden',
          open
            ? 'max-h-96 opacity-100 glass shadow-soft'
            : 'pointer-events-none max-h-0 opacity-0',
        )}
      >
        <nav className="flex flex-col gap-1 p-3" aria-label="Mobile">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'rounded-2xl px-4 py-3 text-base font-medium transition-colors',
                  isActive
                    ? 'bg-blush-100 text-ink-700'
                    : 'text-ink-400 hover:bg-mint-100/60 hover:text-ink-700',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-1 inline-flex items-center justify-center rounded-2xl bg-ink-500 px-4 py-3 text-base font-medium text-white shadow-soft"
          >
            Book a Discovery Call
          </Link>
        </nav>
      </div>
    </header>
  );
}