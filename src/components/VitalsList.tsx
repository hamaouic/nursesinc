import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Search,
  X,
  ChevronDown,
  Activity,
  HeartPulse,
  Baby,
  User,
  Thermometer,
  Droplet,
  Weight,
  Brain,
  Stethoscope,
  AlertTriangle,
  Ruler,
  Calculator,
} from 'lucide-react';
import {
  vitals,
  vitalAgeBands,
  bandTones,
  getRangeForAge,
  type VitalEntry,
  type VitalsAgeGroup,
  type PediatricRanges,
} from '@/nurses-inc-vitals';
import { cn } from '@/lib/utils';

/* ──────────────────────────────────────────────────────────────────────────── */
/*  BMI calculator — adult (WHO/CDC) + pediatric (CDC/WHO percentile)          */
/* ──────────────────────────────────────────────────────────────────────────── */

type BmiClass = {
  label: string;
  tone: string;
  short: string;
  escalate: string;
};

const ADULT_BMI_BANDS: Array<{ upTo: number; cls: BmiClass }> = [
  {
    upTo: 16.5,
    cls: {
      label: 'Severely underweight',
      tone: 'bg-blush-200 text-blush-500 ring-blush-300',
      short: 'Severe malnutrition risk',
      escalate:
        'Notify physician and dietitian. Screen for eating disorder, malabsorption, malignancy.',
    },
  },
  {
    upTo: 18.5,
    cls: {
      label: 'Underweight',
      tone: 'bg-blush-100 text-blush-500 ring-blush-200',
      short: 'Below healthy range',
      escalate:
        'Consider nutrition consult. Recheck weight trajectory over 2–4 weeks.',
    },
  },
  {
    upTo: 25,
    cls: {
      label: 'Normal weight',
      tone: 'bg-mint-100 text-mint-500 ring-mint-200',
      short: 'Healthy range',
      escalate: 'Continue current plan. Routine reassessment.',
    },
  },
  {
    upTo: 30,
    cls: {
      label: 'Overweight',
      tone: 'bg-cream-200 text-ink-700 ring-cream-100',
      short: 'Above healthy range',
      escalate:
        'Discuss lifestyle factors. Screen for HTN, dyslipidemia, prediabetes.',
    },
  },
  {
    upTo: 35,
    cls: {
      label: 'Obesity — Class I',
      tone: 'bg-blush-50 text-blush-500 ring-blush-100',
      short: 'BMI 30 – 34.9',
      escalate:
        'Screen for metabolic syndrome. Discuss weight-management per protocol.',
    },
  },
  {
    upTo: 40,
    cls: {
      label: 'Obesity — Class II',
      tone: 'bg-blush-100 text-blush-500 ring-blush-200',
      short: 'BMI 35 – 39.9',
      escalate:
        'Higher cardiovascular risk. Refer to physician for management plan.',
    },
  },
  {
    upTo: Infinity,
    cls: {
      label: 'Obesity — Class III',
      tone: 'bg-blush-200 text-blush-500 ring-blush-300',
      short: 'BMI ≥ 40',
      escalate:
        'Severe obesity. Multi-disciplinary approach. Equipment / mobility risk for staff.',
    },
  },
];

function classifyAdultBmi(bmi: number): BmiClass {
  for (const row of ADULT_BMI_BANDS) {
    if (bmi < row.upTo) return row.cls;
  }
  return ADULT_BMI_BANDS[ADULT_BMI_BANDS.length - 1].cls;
}

const PEDIATRIC_PERCENTILE_BANDS = [
  {
    label: 'Underweight',
    short: '< 5th percentile',
    tone: 'bg-blush-100 text-blush-500 ring-blush-200',
    detail:
      'Growth-faltering concern. Check height velocity, dietary intake, and chronic disease screen.',
  },
  {
    label: 'Healthy weight',
    short: '5th – < 85th percentile',
    tone: 'bg-mint-100 text-mint-500 ring-mint-200',
    detail: 'Within normal range. Continue routine growth monitoring at well-child visits.',
  },
  {
    label: 'Overweight',
    short: '85th – < 95th percentile',
    tone: 'bg-cream-200 text-ink-700 ring-cream-100',
    detail:
      'Above healthy weight. Lifestyle counselling. Recheck at 2–3 month intervals.',
  },
  {
    label: 'Obese',
    short: '≥ 95th percentile',
    tone: 'bg-blush-100 text-blush-500 ring-blush-200',
    detail:
      'Higher long-term risk for HTN, dyslipidemia, T2DM, NAFLD. Refer per facility protocol.',
  },
  {
    label: 'Severely obese',
    short: '≥ 99th percentile',
    tone: 'bg-blush-200 text-blush-500 ring-blush-300',
    detail:
      'Multi-disciplinary management. Order lipid panel, A1C, ALT, BP screening if not already done.',
  },
];

type BmiUnit = 'metric' | 'imperial';

function BmiCalculator() {
  const [unit, setUnit] = useState<BmiUnit>('metric');
  const [weight, setWeight] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');

  const bmi = useMemo(() => {
    const w = parseFloat(weight);
    if (!w) return null;

    if (unit === 'metric') {
      const cm = parseFloat(heightCm);
      if (!cm) return null;
      const m = cm / 100;
      if (m <= 0) return null;
      return w / (m * m);
    }

    const ft = parseFloat(heightFt) || 0;
    const inch = parseFloat(heightIn) || 0;
    const totalInches = ft * 12 + inch;
    if (totalInches <= 0) return null;
    // BMI (imperial) = 703 × lbs / in²
    return (703 * w) / (totalInches * totalInches);
  }, [unit, weight, heightCm, heightFt, heightIn]);

  const result = bmi !== null ? classifyAdultBmi(bmi) : null;

  const reset = () => {
    setWeight('');
    setHeightCm('');
    setHeightFt('');
    setHeightIn('');
  };

  return (
    <div className="space-y-3 rounded-2xl border border-white/70 bg-white/70 p-3">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-ink-500">
          <Calculator className="h-3 w-3" />
          Adult BMI Calculator
        </p>
        <div className="inline-flex rounded-full border border-white/70 bg-white/70 p-0.5 shadow-soft">
          {(['metric', 'imperial'] as BmiUnit[]).map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => setUnit(u)}
              aria-pressed={unit === u}
              className={cn(
                'rounded-full px-2.5 py-1 text-[10px] font-semibold transition',
                unit === u
                  ? 'bg-ink-700 text-white'
                  : 'text-ink-500 hover:text-ink-700',
              )}
            >
              {u === 'metric' ? 'Metric' : 'Imperial'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Field
          label={unit === 'metric' ? 'Weight (kg)' : 'Weight (lb)'}
          value={weight}
          onChange={setWeight}
          placeholder={unit === 'metric' ? '70' : '154'}
          step="0.1"
        />
        {unit === 'metric' ? (
          <Field
            label="Height (cm)"
            value={heightCm}
            onChange={setHeightCm}
            placeholder="170"
            step="0.1"
            icon={<Ruler className="h-3 w-3" />}
          />
        ) : (
          <div className="grid grid-cols-2 gap-1.5">
            <Field
              label="ft"
              value={heightFt}
              onChange={setHeightFt}
              placeholder="5"
              step="1"
            />
            <Field
              label="in"
              value={heightIn}
              onChange={setHeightIn}
              placeholder="7"
              step="0.1"
            />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={reset}
        className="text-[10px] font-semibold uppercase tracking-widest text-ink-400 underline-offset-2 hover:text-ink-700 hover:underline"
      >
        Clear
      </button>

      <ResultBox bmi={bmi} result={result} />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  step = '1',
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  step?: string;
  icon?: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-ink-400">
        {icon}
        {label}
      </span>
      <input
        type="number"
        inputMode="decimal"
        step={step}
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full rounded-xl border border-white/70 bg-white/80 px-3 py-2 text-[13px] font-display font-semibold text-ink-700 shadow-soft focus:border-ink-300 focus:outline-none focus:ring-2 focus:ring-mint-200"
      />
    </label>
  );
}

function ResultBox({
  bmi,
  result,
}: {
  bmi: number | null;
  result: BmiClass | null;
}) {
  if (bmi === null || !result) {
    return (
      <div className="grid place-items-center rounded-xl border border-dashed border-white/70 bg-white/60 py-4 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-400">
          Enter weight + height to calculate
        </p>
      </div>
    );
  }
  const rounded = Math.round(bmi * 10) / 10;
  return (
    <motion.div
      key={result.label + rounded}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-2"
    >
      <div
        className={cn(
          'flex items-baseline gap-2 rounded-xl px-3 py-2 ring-1',
          result.tone,
        )}
      >
        <span className="font-display text-2xl font-semibold tracking-tight">
          {rounded}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
          kg/m²
        </span>
        <span className="ml-auto text-[10px] font-bold uppercase tracking-widest">
          {result.label}
        </span>
      </div>
      <p className="text-[11.5px] text-ink-500">{result.short}</p>
      <p className="flex items-start gap-2 rounded-xl bg-amber-50/70 px-3 py-2 text-[11px] text-amber-700 ring-1 ring-amber-200">
        <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-amber-500" />
        <span>{result.escalate}</span>
      </p>
    </motion.div>
  );
}

function PediatricBmiCard() {
  return (
    <div className="space-y-2 rounded-2xl border border-white/70 bg-white/70 p-3">
      <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-ink-500">
        <Baby className="h-3 w-3" />
        Paediatric BMI (CDC / WHO Percentiles)
      </p>
      <p className="text-[11.5px] text-ink-500">
        Paediatric BMI is interpreted by plotting BMI against age- and sex-specific
        growth curves. Calculate BMI above, then read off the percentile at
        <a
          href="https://www.cdc.gov/bmi/child-teen-calculator.html"
          target="_blank"
          rel="noreferrer noopener"
          className="ml-1 font-semibold text-ink-700 underline underline-offset-2 hover:text-blush-500"
        >
          CDC BMI Percentile Calculator →
        </a>
      </p>

      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {PEDIATRIC_PERCENTILE_BANDS.map((b) => (
          <div
            key={b.label}
            className={cn(
              'rounded-xl px-3 py-2 ring-1',
              b.tone,
            )}
          >
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-[11px] font-bold uppercase tracking-widest">
                {b.label}
              </p>
              <p className="text-[10px] font-semibold opacity-80">{b.short}</p>
            </div>
            <p className="mt-1 text-[10.5px] leading-snug text-ink-700">
              {b.detail}
            </p>
          </div>
        ))}
      </div>

      <p className="rounded-xl bg-cream-100/60 px-3 py-2 text-[10.5px] italic text-ink-500 ring-1 ring-cream-200">
        Age 2 – 20 uses CDC 2000 growth charts. Children under 2 use WHO weight-for-length,
        not BMI. Always confirm growth-curve interpretation with the prescriber.
      </p>
    </div>
  );
}

const systemIcons: Record<VitalEntry['system'], React.FC<{ className?: string }>> = {
  cardiovascular: HeartPulse,
  respiratory: Activity,
  thermoregulation: Thermometer,
  metabolic: Droplet,
  neurological: Brain,
  anthropometric: Weight,
};

const systemLabels: Record<VitalEntry['system'], string> = {
  cardiovascular: 'Heart & Blood Vessels',
  respiratory: 'Lungs & Breathing',
  thermoregulation: 'Temperature',
  metabolic: 'Metabolic',
  neurological: 'Neurological',
  anthropometric: 'Anthropometric',
};

/**
 * Vital signs reference card grid.
 * Top: Adult / Pediatric toggle. When Pediatric is on, age-band pills appear.
 * Each card shows the in-range band and quick cues for what LOW / HIGH mean.
 */
export default function VitalsList() {
  const [query, setQuery] = useState('');
  const [ageGroup, setAgeGroup] = useState<VitalsAgeGroup>('adult');
  const [band, setBand] = useState<keyof PediatricRanges>('school');
  const [system, setSystem] = useState<'all' | VitalEntry['system']>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return vitals.filter((v) => {
      if (system !== 'all' && v.system !== system) return false;
      if (!q) return true;
      const hay = [
        v.name,
        v.acronym ?? '',
        v.summary,
        v.system,
        ...(v.id ? [v.id] : []),
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, system]);

  const systemsInUse = Array.from(new Set(filtered.map((v) => v.system)));

  return (
    <div>
      {/* Header */}
      <div className="mb-6 text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-ink-400 shadow-soft backdrop-blur">
          <Stethoscope className="h-3 w-3 text-blush-400" />
          Vitals Reference
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink-700 sm:text-3xl">
          Know the number.{' '}
          <span className="text-ink-400">Know what it means.</span>
        </h2>
        <p className="mx-auto mt-1 max-w-2xl text-sm text-ink-500">
          Tap any vital to read the in-range band and what low / high readings
          typically mean. Toggle adult vs. pediatric on the right.
        </p>
      </div>

      {/* Adult / Pediatric toggle */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-full border border-white/70 bg-white/70 p-1 shadow-soft backdrop-blur">
          <button
            type="button"
            onClick={() => setAgeGroup('adult')}
            aria-pressed={ageGroup === 'adult'}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition',
              ageGroup === 'adult'
                ? 'bg-ink-700 text-white shadow-soft'
                : 'text-ink-500 hover:text-ink-700',
            )}
          >
            <User className="h-3.5 w-3.5" />
            Adult
          </button>
          <button
            type="button"
            onClick={() => setAgeGroup('pediatric')}
            aria-pressed={ageGroup === 'pediatric'}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition',
              ageGroup === 'pediatric'
                ? 'bg-ink-700 text-white shadow-soft'
                : 'text-ink-500 hover:text-ink-700',
            )}
          >
            <Baby className="h-3.5 w-3.5" />
            Pediatric
          </button>
        </div>
        <p className="text-[11px] text-ink-400">
          {ageGroup === 'adult'
            ? 'Adult reference ranges shown.'
            : 'Showing pediatric ranges. Pick an age band below.'}
        </p>
      </div>

      {/* Pediatric age-band picker — only when Pediatric is active */}
      <AnimatePresence initial={false}>
        {ageGroup === 'pediatric' && (
          <motion.div
            key="ped-bands"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="mb-4 overflow-hidden"
          >
            <div className="flex flex-wrap gap-2">
              {vitalAgeBands.map((b) => {
                const isActive = band === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBand(b.id)}
                    aria-pressed={isActive}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all',
                      isActive
                        ? 'border-ink-700 bg-ink-700 text-white shadow-soft'
                        : 'border-white/70 bg-white/70 text-ink-500 hover:border-ink-200',
                    )}
                  >
                    <span className="font-semibold">{b.label}</span>
                    <span className={cn('text-[10px]', isActive ? 'text-white/80' : 'text-ink-300')}>
                      {b.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search */}
      <div className="mb-3 flex items-center gap-2 rounded-2xl border border-white/70 bg-white/80 px-4 py-2.5 shadow-soft backdrop-blur transition focus-within:border-ink-300 focus-within:shadow-[0_0_0_4px_rgba(44,62,80,0.15)]">
        <Search className="h-4 w-4 shrink-0 text-ink-300" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a vital — e.g. BP, oxygen, glucose…"
          aria-label="Search vitals"
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
          {filtered.length} of {vitals.length} vitals
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
        {Object.entries(systemLabels).map(([id, label]) => {
          const isActive = system === id;
          return (
            <button
              key={id}
              onClick={() => setSystem(id as VitalEntry['system'])}
              aria-pressed={isActive}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold transition-all',
                isActive
                  ? 'border-ink-700 bg-ink-700 text-white shadow-soft'
                  : 'border-white/70 bg-white/70 text-ink-500 hover:border-ink-200',
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-white/60 bg-white/60 p-8 text-center shadow-soft">
          <p className="font-display text-base text-ink-700">No matches.</p>
          <p className="mt-1 text-xs text-ink-400">
            Try a different keyword or system.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {systemsInUse.map((s) => {
            const systemEntries = filtered.filter((v) => v.system === s);
            return (
              <section key={s}>
                <h4 className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-ink-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-ink-500" />
                  {systemLabels[s]}
                </h4>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {systemEntries.map((v) => (
                    <VitalCard
                      key={v.id}
                      entry={v}
                      range={getRangeForAge(v, ageGroup, band)}
                      ageGroup={ageGroup}
                      pediatricBand={band}
                      isOpen={expanded === v.id}
                      onToggle={() =>
                        setExpanded(expanded === v.id ? null : v.id)
                      }
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

function VitalCard({
  entry,
  range,
  ageGroup,
  pediatricBand,
  isOpen,
  onToggle,
}: {
  entry: VitalEntry;
  range: ReturnType<typeof getRangeForAge>;
  ageGroup: VitalsAgeGroup;
  pediatricBand: keyof PediatricRanges;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = systemIcons[entry.system];
  // If a pediatric vital has no range for the chosen band, surface the note.
  const bandLabel =
    ageGroup === 'pediatric'
      ? vitalAgeBands.find((b) => b.id === pediatricBand)?.label ?? ''
      : '';

  const rangeUnit = range?.unit ?? '';
  const lower = range?.low;
  const upper = range?.high;

  const hasRange =
    !!range && (lower !== undefined || upper !== undefined) && !(lower === 0 && upper === 0);

  return (
    <article
      className={cn(
        'overflow-hidden rounded-2xl border border-white/70 bg-white/85 shadow-soft backdrop-blur transition-all',
        isOpen && 'ring-2 ring-ink-700/30 md:col-span-2 lg:col-span-3',
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
        aria-expanded={isOpen}
        aria-controls={`vital-${entry.id}`}
      >
        <span
          className={cn(
            'grid h-12 w-12 shrink-0 place-items-center rounded-xl ring-1 ring-inset',
            'bg-mint-100 text-ink-700 ring-mint-200',
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {entry.acronym && (
              <span className="rounded-full bg-ink-700 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white">
                {entry.acronym}
              </span>
            )}
            <span className="text-[14px] font-semibold text-ink-700">
              {entry.name}
            </span>
          </div>
          {/* Range pill — the most important single line */}
          {hasRange && range && (
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  'inline-flex items-baseline gap-1 rounded-full px-3 py-1 text-[11px] font-semibold ring-1',
                  bandTones.inRange,
                )}
              >
                <span className="text-[10px] uppercase tracking-widest opacity-70">In range</span>
                <span className="font-display text-[13px] tracking-tight">
                  {lower}
                  {' – '}
                  {upper}
                </span>
                <span className="text-[10px] opacity-70">{rangeUnit}</span>
              </span>
              {ageGroup === 'pediatric' && bandLabel && (
                <span className="text-[10px] uppercase tracking-widest text-ink-400">
                  · {bandLabel}
                </span>
              )}
            </div>
          )}
          {!hasRange && (
            <p className="mt-1.5 text-[11px] text-ink-400">
              {ageGroup === 'pediatric'
                ? 'Interpret via age- and sex-specific percentile curves (CDC / WHO).'
                : 'No numeric range available.'}
            </p>
          )}
          {!isOpen && (
            <p className="mt-1 line-clamp-2 text-[11px] text-ink-500">
              {entry.summary}
            </p>
          )}
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
            id={`vital-${entry.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-3 border-t border-ink-100/60 px-4 py-3 text-[12.5px] leading-relaxed text-ink-500">
              {/* Adult vs pediatric quick comparison */}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <RangeStat label="Adult" range={entry.adult} active={ageGroup === 'adult'} />
                {ageGroup === 'pediatric' &&
                  Object.entries(entry.pediatric).map(([k, r]) => {
                    if (!r) return null;
                    const bandMeta = vitalAgeBands.find((b) => b.id === k);
                    return (
                      <RangeStat
                        key={k}
                        label={bandMeta?.label ?? k}
                        range={r}
                        sub={bandMeta?.sub}
                        active={k === pediatricBand}
                      />
                    );
                  })}
              </div>

              {/* BMI calculator + pediatric card — only when this is the BMI entry */}
              {entry.id === 'bmi' && (
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <BmiCalculator />
                  <PediatricBmiCard />
                </div>
              )}

              {/* LOW band */}
              <div
                className={cn(
                  'rounded-2xl border border-white/70 bg-white/70 p-3',
                )}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ring-1',
                      entry.low.tone,
                    )}
                  >
                    Low
                  </span>
                  {hasRange && range && (
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-400">
                      &lt; {range.low}
                      {rangeUnit && (
                        <span className="opacity-60"> {rangeUnit}</span>
                      )}
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-ink-700">{entry.low.explanation}</p>
                <p className="mt-2 flex items-start gap-2 rounded-xl bg-amber-50/70 px-3 py-2 text-[11.5px] text-amber-700 ring-1 ring-amber-200">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                  <span>{entry.low.escalate}</span>
                </p>
              </div>

              {/* HIGH band */}
              <div className="rounded-2xl border border-white/70 bg-white/70 p-3">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ring-1',
                      entry.high.tone,
                    )}
                  >
                    High
                  </span>
                  {hasRange && range && (
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-400">
                      &gt; {range.high}
                      {rangeUnit && (
                        <span className="opacity-60"> {rangeUnit}</span>
                      )}
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-ink-700">{entry.high.explanation}</p>
                <p className="mt-2 flex items-start gap-2 rounded-xl bg-amber-50/70 px-3 py-2 text-[11.5px] text-amber-700 ring-1 ring-amber-200">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                  <span>{entry.high.escalate}</span>
                </p>
              </div>

              {entry.notes && (
                <p className="rounded-2xl bg-cream-100/60 px-3 py-2 text-[11.5px] italic text-ink-500 ring-1 ring-cream-200">
                  {entry.notes}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

function RangeStat({
  label,
  range,
  sub,
  active,
}: {
  label: string;
  range: { low: number; high: number; unit: string };
  sub?: string;
  active?: boolean;
}) {
  const isPercentile = range.unit.toLowerCase().includes('percentile');
  return (
    <div
      className={cn(
        'rounded-2xl border px-3 py-2 text-[12px]',
        active
          ? 'border-ink-700 bg-ink-50/70'
          : 'border-white/70 bg-white/70',
      )}
    >
      <p className="flex items-baseline gap-2 text-[10px] font-bold uppercase tracking-widest text-ink-400">
        <span>{label}</span>
        {sub && <span className="text-[9px] font-normal normal-case opacity-70">{sub}</span>}
      </p>
      <p className="mt-1 font-display text-base text-ink-700">
        {isPercentile ? (
          <span className="text-[12px] text-ink-500">Use percentile curve</span>
        ) : (
          <>
            {range.low} – {range.high}
            <span className="ml-1 text-[10px] font-normal text-ink-400">
              {range.unit}
            </span>
          </>
        )}
      </p>
    </div>
  );
}
