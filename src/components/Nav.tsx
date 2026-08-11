import { NavLink, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, HeartPulse, Users, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type NavEntry =
  | { kind: 'link'; to: string; label: string }
  | { kind: 'section'; label: string; icon: React.FC<{ className?: string }>; items: { to: string; label: string }[] };

const navEntries: NavEntry[] = [
  { kind: 'link', to: '/', label: 'Home' },
  { kind: 'link', to: '/services', label: 'Services' },
  {
    kind: 'section',
    label: 'Clients',
    icon: Users,
    items: [
      { to: '/clients', label: 'Overview' },
      { to: '/services', label: 'Services' },
      { to: '/knowledge', label: 'The Hub' },
    ],
  },
  {
    kind: 'section',
    label: 'Clinic',
    icon: Building2,
    items: [
      { to: '/clinic', label: 'About the clinic' },
      { to: '/forms', label: 'Admin' },
      { to: '/contact', label: 'Contact' },
    ],
  },
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
          {navEntries.map((entry) => {
            if (entry.kind === 'link') {
              return (
                <NavLink
                  key={entry.to}
                  to={entry.to}
                  end={entry.to === '/'}
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
                      <span className="relative z-10">{entry.label}</span>
                      {isActive && (
                        <span className="absolute inset-0 -z-0 rounded-full bg-blush-100" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            }
            // Section dropdown
            return <NavSection key={entry.label} entry={entry} />;
          })}
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
            ? 'max-h-[80vh] opacity-100 glass shadow-soft'
            : 'pointer-events-none max-h-0 opacity-0',
        )}
      >
        <nav className="flex flex-col gap-1 overflow-y-auto p-3" aria-label="Mobile">
          {navEntries.map((entry) => {
            if (entry.kind === 'link') {
              return (
                <NavLink
                  key={entry.to}
                  to={entry.to}
                  end={entry.to === '/'}
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
                  {entry.label}
                </NavLink>
              );
            }
            return (
              <div key={entry.label} className="mt-2">
                <div className="flex items-center gap-2 px-4 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-300">
                  <entry.icon className="h-3.5 w-3.5" />
                  {entry.label}
                </div>
                <div className="mt-1 flex flex-col gap-1">
                  {entry.items.map((it) => (
                    <NavLink
                      key={it.to}
                      to={it.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'rounded-2xl px-4 py-2.5 text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-blush-100 text-ink-700'
                            : 'text-ink-400 hover:bg-mint-100/60 hover:text-ink-700',
                        )
                      }
                    >
                      {it.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            );
          })}
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

// ============================================================
// Desktop section dropdown
// ============================================================
function NavSection({ entry }: { entry: Extract<NavEntry, { kind: 'section' }> }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = entry.icon;
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={cn(
          'relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors',
          'text-ink-400 hover:text-ink-700',
        )}
      >
        <Icon className="h-3.5 w-3.5" />
        <span>{entry.label}</span>
        <svg
          className={cn(
            'h-3 w-3 transition-transform',
            isOpen && 'rotate-180',
          )}
          viewBox="0 0 12 12"
          aria-hidden="true"
        >
          <path d="M3 4.5 L 6 8 L 9 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute right-0 top-full z-50 mt-2 min-w-[14rem] overflow-hidden rounded-2xl border border-white/70 bg-white/95 p-2 shadow-soft backdrop-blur"
          >
            {entry.items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                end={it.to === '/'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blush-100 text-ink-700'
                      : 'text-ink-500 hover:bg-mint-100/60 hover:text-ink-700',
                  )
                }
              >
                <span>{it.label}</span>
                <svg className="h-3 w-3 opacity-50" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M4 3 L 8 6 L 4 9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}