import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  ChevronDown,
  Heart,
  Activity,
  Brain,
  Stethoscope,
  Sparkles,
} from 'lucide-react';
import { organs, organSystems, type OrganEntry, type OrganSystem } from '@/nurses-inc-organs';
import { cn } from '@/lib/utils';

const systemIcons: Record<OrganSystem, React.FC<{ className?: string }>> = {
  cardiovascular: Heart,
  respiratory: Activity,
  nervous: Brain,
  digestive: Stethoscope,
  urinary: Activity,
  reproductive: Sparkles,
  endocrine: Stethoscope,
  musculoskeletal: Activity,
  integumentary: Sparkles,
  lymphatic: Activity,
  immune: Stethoscope,
  sensory: Sparkles,
  hematologic: Activity,
};

const systemColors: Record<OrganSystem, string> = {
  cardiovascular: 'bg-rose-100 text-rose-700 ring-rose-200',
  respiratory: 'bg-sky-100 text-sky-700 ring-sky-200',
  nervous: 'bg-purple-100 text-purple-700 ring-purple-200',
  digestive: 'bg-amber-100 text-amber-700 ring-amber-200',
  urinary: 'bg-yellow-100 text-yellow-700 ring-yellow-200',
  reproductive: 'bg-pink-100 text-pink-700 ring-pink-200',
  endocrine: 'bg-indigo-100 text-indigo-700 ring-indigo-200',
  musculoskeletal: 'bg-orange-100 text-orange-700 ring-orange-200',
  integumentary: 'bg-teal-100 text-teal-700 ring-teal-200',
  lymphatic: 'bg-cyan-100 text-cyan-700 ring-cyan-200',
  immune: 'bg-blue-100 text-blue-700 ring-blue-200',
  sensory: 'bg-fuchsia-100 text-fuchsia-700 ring-fuchsia-200',
  hematologic: 'bg-red-100 text-red-700 ring-red-200',
};

export default function OrgansList() {
  const [system, setSystem] = useState<'all' | OrganSystem>('all');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return organs.filter((o) => {
      if (system !== 'all' && o.system !== system) return false;
      if (!q) return true;
      return (
        o.name.toLowerCase().includes(q) ||
        o.explanation.toLowerCase().includes(q)
      );
    });
  }, [system, query]);

  // Group filtered organs by system, preserving the organSystems order so
  // the chart reads top-to-bottom like a textbook.
  const grouped = useMemo(() => {
    const map = new Map<OrganSystem, OrganEntry[]>();
    for (const o of filtered) {
      const list = map.get(o.system) ?? [];
      list.push(o);
      map.set(o.system, list);
    }
    return organSystems
      .filter((s) => map.has(s.id))
      .map((s) => ({
        system: s,
        entries: map.get(s.id) ?? [],
      }));
  }, [filtered]);

  return (
    <div>
      {/* Header */}
      <div className="mb-4 rounded-3xl border border-white/70 bg-white/85 p-4 shadow-soft backdrop-blur">
        <h3 className="font-display text-base font-semibold text-ink-700">
          <Heart className="mr-1 inline h-4 w-4" />
          Organs of the human body
        </h3>
        <p className="mt-1 text-[12px] text-ink-500">
          A plain-English tour of every major organ, sorted by the body system
          it belongs to. Tap any organ to read the full description.
        </p>
      </div>

      {/* Search */}
      <div className="mb-3 flex items-center gap-2 rounded-2xl border border-white/70 bg-white/80 px-4 py-2.5 shadow-soft backdrop-blur transition focus-within:border-ink-300 focus-within:shadow-[0_0_0_4px_rgba(44,62,80,0.15)]">
        <Search className="h-4 w-4 shrink-0 text-ink-300" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search an organ — e.g. liver, kidney, pancreas…"
          aria-label="Search organs"
          className="w-full bg-transparent text-sm text-ink-700 placeholder:text-ink-300 focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="grid h-6 w-6 place-items-center rounded-full text-ink-300 transition hover:bg-ink-100 hover:text-ink-700"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* System chips */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-ink-300">
          <Stethoscope className="mr-1 inline h-3 w-3" />
          {filtered.length} of {organs.length} organs
        </span>
        <span className="h-px flex-1 bg-ink-100" />
        <button
          onClick={() => setSystem('all')}
          aria-pressed={system === 'all'}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold transition-all',
            system === 'all'
              ? 'border-ink-700 bg-ink-700 text-white shadow-soft'
              : 'border-white/70 bg-white/70 text-ink-500 hover:border-ink-200',
          )}
        >
          All
        </button>
        {organSystems.map((s) => {
          const isActive = system === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setSystem(s.id)}
              aria-pressed={isActive}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold transition-all',
                isActive
                  ? 'border-ink-700 bg-ink-700 text-white shadow-soft'
                  : 'border-white/70 bg-white/70 text-ink-500 hover:border-ink-200',
              )}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Organ cards — grouped by system, 3 columns */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-white/60 bg-white/60 p-8 text-center shadow-soft">
          <p className="font-display text-base text-ink-700">No matches.</p>
          <p className="mt-1 text-xs text-ink-400">
            Try a different keyword or body system.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {grouped.map(({ system: s, entries: systemEntries }) => (
            <section key={s.id}>
              {/* Section header — matches the wound classification header */}
              <h4 className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-ink-500">
                <span className="h-1.5 w-1.5 rounded-full bg-ink-500" />
                {s.label}
              </h4>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {systemEntries.map((o) => (
                  <OrganCard
                    key={o.id}
                    entry={o}
                    isOpen={expanded === o.id}
                    onToggle={() =>
                      setExpanded(expanded === o.id ? null : o.id)
                    }
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function OrganCard({
  entry,
  isOpen,
  onToggle,
}: {
  entry: OrganEntry;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = systemIcons[entry.system];
  return (
    <article
      className={cn(
        'group overflow-hidden rounded-2xl border border-white/70 bg-white/85 shadow-soft backdrop-blur transition-all',
        isOpen && 'ring-2 ring-ink-700/30 md:col-span-2 lg:col-span-3',
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
        aria-expanded={isOpen}
        aria-controls={`organ-${entry.id}`}
      >
        <span
          className={cn(
            'grid h-9 w-9 shrink-0 place-items-center rounded-xl ring-1 ring-inset',
            systemColors[entry.system],
          )}
        >
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-ink-700 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white">
              {entry.name}
            </span>
            <span className="rounded-full bg-ink-100 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-ink-500">
              {entry.system}
            </span>
          </div>
          <p className="mt-0.5 line-clamp-2 text-[11px] text-ink-500">
            {entry.explanation}
          </p>
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-ink-300 transition-transform duration-300',
            isOpen && 'rotate-180 text-ink-700',
          )}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`organ-${entry.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-ink-100/60 px-4 py-3 text-[12px] leading-relaxed text-ink-500">
              <p>{entry.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
