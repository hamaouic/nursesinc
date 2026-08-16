import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Search,
  X,
  ChevronDown,
  Droplet,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  Activity,
  Syringe,
  Stethoscope,
  Pill,
  Eye,
  Hand,
  AlertOctagon,
  Info,
} from 'lucide-react';
import {
  diabetesTopics,
  insulins,
  insulinCategoryLabels,
  insulinCategoryTones,
  bgRanges,
  interpretBg,
  type BgContext,
  type DiabetesTopic,
  type InsulinCategory,
  type InsulinEntry,
} from '@/nurses-inc-diabetes';
import { cn } from '@/lib/utils';

/**
 * Diabetes reference + live BG calculator.
 *  - Knowledge sections: what nurses must know (overview, oral agents,
 *    monitoring, hypo/hyper, sick-days, foot care, scope).
 *  - Insulin registry: 17 brands filtered by functional bucket.
 *  - Live BG calculator: pick a context (fasting, pre-meal, random, bedtime),
 *    enter a BG in mmol/L, get the band + action.
 */
export default function DiabetesList() {
  const [query, setQuery] = useState('');
  const [activeTopic, setActiveTopic] = useState<DiabetesTopic['id']>('overview');
  const [insulinFilter, setInsulinFilter] = useState<'all' | InsulinCategory>(
    'all',
  );

  const topic = diabetesTopics.find((t) => t.id === activeTopic)!;

  const filteredInsulins = useMemo(() => {
    const q = query.trim().toLowerCase();
    return insulins.filter((i) => {
      if (insulinFilter !== 'all' && i.category !== insulinFilter) return false;
      if (!q) return true;
      const hay = [i.brand, i.generic, i.role, ...i.pearls]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, insulinFilter]);

  return (
    <div>
      {/* Hero header */}
      <div className="mb-6 text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-ink-400 shadow-soft backdrop-blur">
          <Droplet className="h-3 w-3 text-blush-400" />
          Diabetes Reference
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink-700 sm:text-3xl">
          Glucose, insulin, and{' '}
          <span className="text-ink-400">what to do next.</span>
        </h2>
        <p className="mx-auto mt-1 max-w-2xl text-sm text-ink-500">
          Tap a topic below, browse the insulin registry, or punch a BG value
          into the calculator — it tells you the band and the next action.
        </p>
      </div>

      {/* Topic chips */}
      <div className="mb-4 flex flex-wrap gap-2">
        {diabetesTopics.map((t) => {
          const isActive = activeTopic === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTopic(t.id)}
              aria-pressed={isActive}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all',
                isActive
                  ? 'border-ink-700 bg-ink-700 text-white shadow-soft'
                  : 'border-white/70 bg-white/70 text-ink-500 hover:border-ink-200',
              )}
            >
              {t.title}
            </button>
          );
        })}
      </div>

      {/* Active topic card */}
      <AnimatePresence mode="wait">
        <motion.article
          key={topic.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mb-6 rounded-3xl border border-white/70 bg-white/85 p-5 shadow-soft backdrop-blur"
        >
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mint-100 text-ink-700 ring-1 ring-mint-200">
              <TopicIcon id={topic.id} />
            </span>
            <div className="flex-1">
              <h3 className="font-display text-lg font-semibold text-ink-700">
                {topic.title}
              </h3>
              <p className="mt-1 text-[13px] text-ink-500">{topic.summary}</p>
              <ul className="mt-3 space-y-1.5">
                {topic.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[12.5px] leading-relaxed text-ink-500"
                  >
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-mint-400" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.article>
      </AnimatePresence>

      {/* BG Calculator */}
      <BloodGlucoseCalculator />

      {/* Insulin registry */}
      <section className="mt-8">
        <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-ink-700">
              <Syringe className="h-5 w-5 text-blush-400" />
              Insulins on the Market
            </h3>
            <p className="mt-1 text-xs text-ink-400">
              17 brands across 5 functional buckets. Always verify against the
              MAR before administration.
            </p>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white/80 px-4 py-2 shadow-soft backdrop-blur transition focus-within:border-ink-300 focus-within:shadow-[0_0_0_4px_rgba(44,62,80,0.15)]">
            <Search className="h-4 w-4 shrink-0 text-ink-300" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search insulin brand, role…"
              aria-label="Search insulins"
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
        </header>

        {/* Category chips */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-ink-300">
            <Sparkles className="mr-1 inline h-3 w-3" />
            {filteredInsulins.length} of {insulins.length}
          </span>
          <span className="h-px flex-1 bg-ink-100" />
          <button
            onClick={() => setInsulinFilter('all')}
            aria-pressed={insulinFilter === 'all'}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold transition-all',
              insulinFilter === 'all'
                ? 'border-ink-700 bg-ink-700 text-white shadow-soft'
                : 'border-white/70 bg-white/70 text-ink-500 hover:border-ink-200',
            )}
          >
            All
          </button>
          {(Object.keys(insulinCategoryLabels) as InsulinCategory[]).map((c) => {
            const isActive = insulinFilter === c;
            return (
              <button
                key={c}
                onClick={() => setInsulinFilter(c)}
                aria-pressed={isActive}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold transition-all',
                  isActive
                    ? 'border-ink-700 bg-ink-700 text-white shadow-soft'
                    : 'border-white/70 bg-white/70 text-ink-500 hover:border-ink-200',
                )}
              >
                {insulinCategoryLabels[c]}
              </button>
            );
          })}
        </div>

        {/* Insulin grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {filteredInsulins.map((i) => (
            <InsulinCard key={i.id} entry={i} />
          ))}
        </div>

        {filteredInsulins.length === 0 && (
          <div className="rounded-3xl border border-white/60 bg-white/60 p-8 text-center shadow-soft">
            <p className="font-display text-base text-ink-700">No matches.</p>
            <p className="mt-1 text-xs text-ink-400">
              Try a different keyword or category.
            </p>
          </div>
        )}
      </section>

      <p className="mt-8 text-center text-[11px] italic text-ink-400">
        Reference ranges and insulin pharmacology last reviewed Aug 2026. Not a
        substitute for the prescriber's order. Always escalate per protocol.
      </p>
    </div>
  );
}

function TopicIcon({ id }: { id: DiabetesTopic['id'] }) {
  const iconClass = 'h-4 w-4';
  switch (id) {
    case 'overview':
      return <Info className={iconClass} />;
    case 'insulins':
      return <Syringe className={iconClass} />;
    case 'oral-agents':
      return <Pill className={iconClass} />;
    case 'monitoring':
      return <Activity className={iconClass} />;
    case 'hypo-hyper':
      return <AlertOctagon className={iconClass} />;
    case 'sick-days':
      return <ShieldCheck className={iconClass} />;
    case 'foot-care':
      return <Hand className={iconClass} />;
    case 'scope':
      return <Stethoscope className={iconClass} />;
    default:
      return <Info className={iconClass} />;
  }
}

function InsulinCard({ entry }: { entry: InsulinEntry }) {
  const [open, setOpen] = useState(false);
  return (
    <article
      className={cn(
        'overflow-hidden rounded-2xl border border-white/70 bg-white/85 shadow-soft backdrop-blur transition-all',
        open && 'ring-2 ring-ink-700/30 md:col-span-2 lg:col-span-3',
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
      >
        <span
          className={cn(
            'grid h-11 w-11 shrink-0 place-items-center rounded-xl ring-1 ring-inset',
            'bg-blush-50 text-ink-700 ring-blush-200',
          )}
        >
          <Syringe className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-[15px] font-semibold text-ink-700">
              {entry.brand}
            </span>
            <span
              className={cn(
                'rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest ring-1',
                insulinCategoryTones[entry.category],
              )}
            >
              {insulinCategoryLabels[entry.category]}
            </span>
            {entry.ivSafe && (
              <span className="rounded-full bg-mint-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-mint-700 ring-1 ring-mint-200">
                IV-safe
              </span>
            )}
          </div>
          <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-ink-400">
            {entry.generic}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[10px] font-semibold text-ink-500">
            <span className="rounded-full bg-ink-50 px-2 py-0.5 ring-1 ring-ink-100">
              Onset {entry.onsetMin} min
            </span>
            <span className="rounded-full bg-ink-50 px-2 py-0.5 ring-1 ring-ink-100">
              Peak {entry.peakHr ? `${entry.peakHr} h` : 'none'}
            </span>
            <span className="rounded-full bg-ink-50 px-2 py-0.5 ring-1 ring-ink-100">
              Duration {entry.durationHr} h
            </span>
          </div>
          {!open && (
            <p className="mt-1.5 line-clamp-2 text-[11.5px] text-ink-500">
              {entry.role}
            </p>
          )}
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-ink-300 transition-transform duration-300',
            open && 'rotate-180 text-ink-700',
          )}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-2 border-t border-ink-100/60 px-4 py-3 text-[12px] leading-relaxed text-ink-500">
              <p>
                <span className="font-semibold text-ink-700">Role: </span>
                {entry.role}
              </p>
              <div className="flex flex-wrap gap-3 text-[10px]">
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 ring-1',
                    entry.mixable
                      ? 'bg-mint-50 text-mint-700 ring-mint-200'
                      : 'bg-rose-50 text-rose-700 ring-rose-200',
                  )}
                >
                  {entry.mixable ? 'Mixable' : 'Do NOT mix'}
                </span>
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 ring-1',
                    entry.ivSafe
                      ? 'bg-mint-50 text-mint-700 ring-mint-200'
                      : 'bg-ink-50 text-ink-500 ring-ink-100',
                  )}
                >
                  {entry.ivSafe ? 'IV-safe' : 'SC only'}
                </span>
              </div>
              <div className="mt-2 rounded-2xl bg-cream-100/60 p-3 ring-1 ring-cream-200">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-ink-500">
                  Patient-teaching pearls
                </p>
                <ul className="space-y-1">
                  {entry.pearls.map((p, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[11.5px] text-ink-500"
                    >
                      <span className="mt-1 inline-block h-1 w-1 shrink-0 rounded-full bg-blush-400" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

/**
 * Live BG calculator.
 * Default = "before-meal" with an empty input. Type a number, see the band.
 */
function BloodGlucoseCalculator() {
  const [context, setContext] = useState<BgContext>('before-meal');
  const [raw, setRaw] = useState('');

  const mmol = parseBg(raw);

  const result = mmol === null ? null : interpretBg(mmol, context);
  const currentRow = bgRanges.find((r) => r.context === context)!;

  return (
    <section className="overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-blush-50/70 via-white to-mint-50/70 shadow-soft backdrop-blur">
      <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
        {/* Left: input */}
        <div className="border-b border-white/60 p-5 md:border-b-0 md:border-r">
          <header className="mb-3 flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/80 text-ink-700 ring-1 ring-blush-200">
              <Droplet className="h-4 w-4 text-blush-400" />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold text-ink-700">
                BG Calculator
              </h3>
              <p className="text-[11px] text-ink-400">
                Type a blood glucose in mmol/L.
              </p>
            </div>
          </header>

          <div className="mb-3">
            <label
              htmlFor="bg-context"
              className="text-[10px] font-bold uppercase tracking-widest text-ink-400"
            >
              Context
            </label>
            <select
              id="bg-context"
              value={context}
              onChange={(e) => setContext(e.target.value as BgContext)}
              className="mt-1 block w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-ink-700 shadow-soft focus:border-ink-300 focus:outline-none focus:ring-2 focus:ring-mint-200"
            >
              {bgRanges.map((r) => (
                <option key={r.context} value={r.context}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label
              htmlFor="bg-value"
              className="text-[10px] font-bold uppercase tracking-widest text-ink-400"
            >
              BG value (mmol/L)
            </label>
            <div className="relative mt-1">
              <input
                id="bg-value"
                type="number"
                inputMode="decimal"
                step="0.1"
                min="0"
                max="40"
                value={raw}
                onChange={(e) => setRaw(e.target.value)}
                placeholder="e.g. 6.5"
                className="block w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 pr-16 text-2xl font-display font-semibold tracking-tight text-ink-700 shadow-soft focus:border-ink-300 focus:outline-none focus:ring-2 focus:ring-mint-200"
              />
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[11px] font-semibold text-ink-400">
                mmol/L
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[10px] text-ink-400">
              <span>Range for {currentRow.label.split(' (')[0]}:</span>
              <span className="font-mono">
                {currentRow.low} – {currentRow.high} mmol/L
              </span>
            </div>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { v: '3.5', tone: 'rose' },
              { v: '5.5', tone: 'mint' },
              { v: '8.0', tone: 'amber' },
              { v: '12.0', tone: 'amber' },
              { v: '17.0', tone: 'rose' },
            ].map((p) => (
              <button
                key={p.v}
                type="button"
                onClick={() => setRaw(p.v)}
                className={cn(
                  'rounded-full border border-white/70 px-3 py-1 text-[11px] font-semibold shadow-soft transition hover:border-ink-200',
                  p.tone === 'mint' && 'bg-mint-50 text-mint-700',
                  p.tone === 'amber' && 'bg-amber-50 text-amber-700',
                  p.tone === 'rose' && 'bg-rose-50 text-rose-700',
                )}
              >
                {p.v}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setRaw('')}
              className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-[11px] font-semibold text-ink-500 shadow-soft transition hover:border-ink-200"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Right: result */}
        <div className="p-5">
          <ResultPanel mmol={mmol} result={result} />
        </div>
      </div>
    </section>
  );
}

function parseBg(raw: string): number | null {
  if (!raw) return null;
  const v = Number(raw);
  if (Number.isNaN(v)) return null;
  return v;
}

function ResultPanel({
  mmol,
  result,
}: {
  mmol: number | null;
  result: ReturnType<typeof interpretBg> | null;
}) {
  if (mmol === null || !result) {
    return (
      <div className="grid h-full place-items-center rounded-2xl border border-dashed border-white/70 bg-white/60 p-6 text-center">
        <div>
          <Eye className="mx-auto h-6 w-6 text-ink-300" />
          <p className="mt-2 font-display text-base text-ink-500">
            Awaiting a value
          </p>
          <p className="mt-1 text-[11.5px] text-ink-400">
            Type a BG above to see the band and the next action.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      key={result.band + mmol}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-3"
    >
      <div
        className={cn(
          'inline-flex items-baseline gap-2 rounded-full px-4 py-1.5 ring-1',
          result.tone,
        )}
      >
        <span className="font-display text-2xl font-semibold tracking-tight">
          {mmol}
          <span className="text-[12px] font-medium opacity-70"> mmol/L</span>
        </span>
        <span className="text-[11px] font-bold uppercase tracking-widest">
          {result.label}
        </span>
      </div>

      <div className="rounded-2xl bg-white/70 p-3 ring-1 ring-white/70">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-ink-500">
          What to do
        </p>
        <p className="text-[13px] leading-relaxed text-ink-700">
          {result.guidance}
        </p>
      </div>

      <div className="rounded-2xl bg-amber-50/70 p-3 ring-1 ring-amber-200">
        <p className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-amber-700">
          <AlertTriangle className="h-3 w-3" />
          Escalate
        </p>
        <p className="text-[12.5px] leading-relaxed text-amber-700">
          {result.escalate}
        </p>
      </div>
    </motion.div>
  );
}