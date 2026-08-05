import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Stethoscope,
  BookMarked,
  Search,
  Check,
  ChevronDown,
  Wrench,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Tool = {
  id: string;
  label: string;
  sub: string;
  Icon: React.FC<{ className?: string }>;
  to: string;
  status?: 'Live' | 'New' | 'Beta';
};

const TOOLS: Tool[] = [
  {
    id: 'reconciliation',
    label: 'Reconciliation Worksheet',
    sub: 'Part A audit + Part B SBAR escalation',
    Icon: Stethoscope,
    to: '/forms/reconciliation',
    status: 'Live',
  },
  {
    id: 'clinical-matrix',
    label: 'Geriatric Reference Matrix',
    sub: 'Bedside medication + behavioural cheat-sheet',
    Icon: BookMarked,
    to: '/forms/clinical-tools',
    status: 'New',
  },
];

export default function ToolSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close on outside click
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('mousedown', onDown);
    return () => window.removeEventListener('mousedown', onDown);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const active = TOOLS.find((t) => t.to === location.pathname) ?? TOOLS[0];

  return (
    <div ref={ref} className="relative">
      {/* Wide pill — visually aligned with the eyebrow above */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          'inline-flex w-full max-w-md items-center gap-3 rounded-full border border-white/60 bg-white/60 px-4 py-2 text-left shadow-soft backdrop-blur transition-all duration-300 sm:w-auto',
          'hover:bg-white/80 hover:-translate-y-0.5',
          open && 'bg-white shadow-glow ring-2 ring-blush-200/60',
        )}
      >
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink-500 text-white">
          <Search className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-400">
              Search Tools
            </span>
            {active.status && (
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest',
                  active.status === 'New'
                    ? 'bg-blush-200 text-ink-700'
                    : active.status === 'Beta'
                      ? 'bg-cream-200 text-ink-700'
                      : 'bg-mint-200 text-ink-700',
                )}
              >
                {active.status}
              </span>
            )}
          </div>
          <p className="mt-0.5 flex items-center gap-1.5 truncate text-sm font-semibold text-ink-700">
            <active.Icon className="h-3.5 w-3.5 shrink-0 text-ink-500" />
            <span className="truncate">{active.label}</span>
          </p>
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-ink-400 transition-transform duration-300',
            open && 'rotate-180 text-ink-700',
          )}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={cn(
          'absolute left-0 right-0 z-40 mt-2 origin-top overflow-hidden rounded-2xl border border-white/60 bg-white/95 shadow-glow backdrop-blur transition-all duration-300 sm:right-auto sm:w-[28rem]',
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0',
        )}
        role="listbox"
        aria-label="Internal tools"
      >
          <div className="border-b border-white/60 px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-400">
              <Wrench className="mr-1 inline-block h-3 w-3" />
              Internal Tools — Nurses &amp; Partner Physicians
            </p>
            <p className="mt-1 text-[11px] text-ink-400">
              Switch between clinical tools. New tools will appear here as we
              add them.
            </p>
          </div>

          <ul className="max-h-[60vh] overflow-y-auto p-2">
            {TOOLS.map((tool) => {
              const isActive = tool.to === location.pathname;
              return (
                <li key={tool.id}>
                  <Link
                    to={tool.to}
                    role="option"
                    aria-selected={isActive}
                    className={cn(
                      'group flex w-full items-start gap-3 rounded-xl border-2 px-3 py-3 transition',
                      isActive
                        ? tool.id === 'reconciliation'
                          ? 'border-mint-400 bg-mint-100'
                          : 'border-blush-400 bg-blush-100'
                        : 'border-transparent bg-white hover:bg-white/80',
                    )}
                  >
                    <span
                      className={cn(
                        'grid h-10 w-10 shrink-0 place-items-center rounded-2xl text-ink-700 shadow-soft',
                        tool.id === 'reconciliation'
                          ? 'bg-mint-200'
                          : 'bg-blush-200',
                      )}
                    >
                      <tool.Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-sm font-semibold text-ink-700">
                          {tool.label}
                        </span>
                        {tool.status && (
                          <span
                            className={cn(
                              'rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest',
                              tool.status === 'New'
                                ? 'bg-blush-200 text-ink-700'
                                : tool.status === 'Beta'
                                  ? 'bg-cream-200 text-ink-700'
                                  : 'bg-mint-200 text-ink-700',
                            )}
                          >
                            {tool.status}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 truncate text-[11px] text-ink-400">
                        {tool.sub}
                      </p>
                    </div>
                    {isActive && (
                      <Check className="mt-1 h-4 w-4 shrink-0 text-ink-700" />
                    )}
                  </Link>
                </li>
              );
            })}

            {/* Placeholder for future tools */}
            <li className="mt-2 rounded-xl border border-dashed border-ink-100 bg-white/60 px-3 py-3 text-center">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-300">
                More tools coming soon
              </span>
            </li>
          </ul>
      </div>
    </div>
  );
}