import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Stethoscope, BookMarked, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const TOOLS = [
  {
    id: 'reconciliation',
    label: 'Reconciliation Worksheet',
    sub: 'Part A audit + Part B SBAR escalation',
    Icon: Stethoscope,
    to: '/forms/reconciliation',
    accent: 'mint',
    tag: 'Live',
  },
  {
    id: 'clinical-matrix',
    label: 'Clinical Reference Matrix',
    sub: 'Bedside geriatric quick-reference by topic',
    Icon: BookMarked,
    to: '/forms/clinical-tools',
    accent: 'blush',
    tag: 'New',
  },
];

export default function ToolsDashboard({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="space-y-6">
      {/* Tools nav strip */}
      <motion.nav
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        aria-label="Internal tools"
        className="grid gap-3 sm:grid-cols-2"
      >
        {TOOLS.map((tool) => {
          const active = location.pathname === tool.to;
          const accentRing =
            tool.accent === 'mint'
              ? 'border-mint-400 bg-mint-100'
              : 'border-blush-400 bg-blush-100';
          return (
            <Link
              key={tool.id}
              to={tool.to}
              className={cn(
                'group flex items-center gap-4 rounded-2xl border-2 p-4 transition',
                active
                  ? accentRing
                  : 'border-white/60 bg-white/70 hover:bg-white',
              )}
            >
              <span
                className={cn(
                  'grid h-12 w-12 shrink-0 place-items-center rounded-2xl shadow-soft',
                  tool.accent === 'mint' ? 'bg-mint-200' : 'bg-blush-200',
                  'text-ink-700',
                )}
              >
                <tool.Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm font-semibold text-ink-700">
                    {tool.label}
                  </span>
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest',
                      tool.tag === 'New'
                        ? 'bg-blush-200 text-ink-700'
                        : 'bg-mint-200 text-ink-700',
                    )}
                  >
                    {tool.tag === 'New' ? (
                      <Sparkles className="h-3 w-3" />
                    ) : null}
                    {tool.tag}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-[11px] text-ink-400">
                  {tool.sub}
                </p>
              </div>
              <ArrowRight
                className={cn(
                  'h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1',
                  active ? 'text-ink-700' : 'text-ink-300',
                )}
              />
            </Link>
          );
        })}
      </motion.nav>

      {children}
    </div>
  );
}