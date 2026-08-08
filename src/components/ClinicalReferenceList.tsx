import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  ChevronDown,
  Pill,
  AlertTriangle,
  Activity,
  Heart,
  FlaskConical,
  Shield,
  Stethoscope,
  Syringe,
  Wrench,
  Eye,
  Sparkles,
  Microscope,
  Beaker,
} from 'lucide-react';
import {
  clinicalReference,
  clinicalReferenceGroups,
  type ClinicalRefEntry,
} from '@/nurses-inc-clinical-reference';
import { drugClasses, type DrugClassEntry } from '@/nurses-inc-drug-classes';
import { woundStages, woundMeds, type WoundColor } from '@/nurses-inc-wound-care';
import { labReference, labSystems, type LabEntry } from '@/nurses-inc-labs';
import { cn } from '@/lib/utils';

type ClinicianTab = 'drugs' | 'wound-care' | 'labs';

const groupIcons: Record<ClinicalRefEntry['group'], React.FC<{ className?: string }>> = {
  std: Heart,
  respiratory: Activity,
  general: Stethoscope,
  vaccine: Syringe,
};

const drugClassColorClasses: Record<DrugClassEntry['color'], string> = {
  red: 'bg-red-100 text-red-700 ring-red-200',
  orange: 'bg-orange-100 text-orange-700 ring-orange-300',
  amber: 'bg-amber-100 text-amber-700 ring-amber-200',
  yellow: 'bg-yellow-100 text-yellow-700 ring-yellow-200',
  lime: 'bg-lime-100 text-lime-700 ring-lime-200',
  green: 'bg-green-100 text-green-700 ring-green-200',
  teal: 'bg-teal-100 text-teal-700 ring-teal-200',
  cyan: 'bg-cyan-100 text-cyan-700 ring-cyan-200',
  sky: 'bg-sky-100 text-sky-700 ring-sky-200',
  blue: 'bg-blue-100 text-blue-700 ring-blue-200',
  indigo: 'bg-indigo-100 text-indigo-700 ring-indigo-200',
  purple: 'bg-purple-100 text-purple-700 ring-purple-200',
  fuchsia: 'bg-fuchsia-100 text-fuchsia-700 ring-fuchsia-200',
  pink: 'bg-pink-100 text-pink-700 ring-pink-200',
  rose: 'bg-rose-100 text-rose-700 ring-rose-200',
  slate: 'bg-slate-200 text-slate-700 ring-slate-300',
};

const woundColorClasses: Record<WoundColor, string> = {
  red: 'bg-red-100 text-red-700 ring-red-200',
  yellow: 'bg-amber-100 text-amber-700 ring-amber-200',
  black: 'bg-slate-700 text-slate-100 ring-slate-500',
  rose: 'bg-rose-100 text-rose-700 ring-rose-200',
  amber: 'bg-amber-100 text-amber-800 ring-amber-300',
  orange: 'bg-orange-100 text-orange-700 ring-orange-300',
  crimson: 'bg-red-200 text-red-900 ring-red-400',
  purple: 'bg-purple-100 text-purple-700 ring-purple-300',
  slate: 'bg-slate-200 text-slate-700 ring-slate-300',
};

const labSystemIcons: Record<LabEntry['system'], React.FC<{ className?: string }>> = {
  hematology: Beaker,
  coagulation: Activity,
  metabolic: FlaskConical,
  renal: Activity,
  hepatic: Shield,
  lipid: Heart,
  thyroid: Microscope,
  glucose: FlaskConical,
  iron: Beaker,
  inflammation: Activity,
  cardiac: Heart,
  vitamins: Beaker,
  electrolytes: FlaskConical,
  urine: Beaker,
  microbiology: Microscope,
  serology: Shield,
  toxicology: AlertTriangle,
};

export default function ClinicalReferenceList() {
  const [tab, setTab] = useState<ClinicianTab>('drugs');
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState<'all' | ClinicalRefEntry['group']>('all');
  const [labSystem, setLabSystem] = useState<'all' | LabEntry['system']>('all');
  const [expandedDrug, setExpandedDrug] = useState<string | null>(null);
  const [expandedLab, setExpandedLab] = useState<string | null>(null);

  const filteredDrugs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return clinicalReference.filter((entry) => {
      if (group !== 'all' && entry.group !== group) return false;
      if (!q) return true;
      const hay = [
        entry.title,
        entry.indication,
        entry.drugClass,
        entry.firstLine,
        entry.alternatives ?? '',
        entry.mechanism,
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [group, query]);

  const filteredLabs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return labReference.filter((entry) => {
      if (labSystem !== 'all' && entry.system !== labSystem) return false;
      if (!q) return true;
      const hay = [
        entry.acronym,
        entry.fullName,
        entry.description,
        entry.purpose,
        entry.indications.join(' '),
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [labSystem, query]);

  return (
    <div>
      {/* Sub-tabs: Drug Cards / Wound Care / Labs */}
      <div className="mb-4 flex justify-center">
        <div
          role="tablist"
          aria-label="Clinician reference sub-sections"
          className="inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/70 p-1 shadow-soft backdrop-blur"
        >
          {[
            { id: 'drugs' as const, label: 'Drug Cards', icon: Pill },
            { id: 'wound-care' as const, label: 'Wound Care', icon: Wrench },
            { id: 'labs' as const, label: 'Labs', icon: FlaskConical },
          ].map((t) => {
            const isActive = tab === t.id;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setTab(t.id);
                  setQuery('');
                }}
                className={cn(
                  'relative inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors',
                  isActive ? 'text-white' : 'text-ink-500 hover:text-ink-700',
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="clinician-sub-pill"
                    className="absolute inset-0 rounded-full bg-ink-700 shadow-soft"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative inline-flex items-center gap-1.5">
                  <Icon
                    className={cn(
                      'h-3.5 w-3.5',
                      isActive ? 'text-white' : 'text-ink-300',
                    )}
                    aria-hidden="true"
                  />
                  <span>{t.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {tab === 'drugs' && (
          <motion.div
            key="drugs"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <DrugCardsView
              query={query}
              setQuery={setQuery}
              group={group}
              setGroup={setGroup}
              filtered={filteredDrugs}
              expanded={expandedDrug}
              setExpanded={setExpandedDrug}
            />
          </motion.div>
        )}
        {tab === 'wound-care' && (
          <motion.div
            key="wound-care"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <WoundCareView />
          </motion.div>
        )}
        {tab === 'labs' && (
          <motion.div
            key="labs"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <LabsView
              query={query}
              setQuery={setQuery}
              labSystem={labSystem}
              setLabSystem={setLabSystem}
              filtered={filteredLabs}
              expanded={expandedLab}
              setExpanded={setExpandedLab}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// =============================================================================
// Drug cards
// =============================================================================
function DrugCardsView({
  query,
  setQuery,
  group,
  setGroup,
  filtered,
  expanded,
  setExpanded,
}: {
  query: string;
  setQuery: (v: string) => void;
  group: 'all' | ClinicalRefEntry['group'];
  setGroup: (g: 'all' | ClinicalRefEntry['group']) => void;
  filtered: ClinicalRefEntry[];
  expanded: string | null;
  setExpanded: (id: string | null) => void;
}) {
  const [showClassChart, setShowClassChart] = useState(true);
  const [expandedClass, setExpandedClass] = useState<string | null>(null);
  const [classQuery, setClassQuery] = useState('');

  const filteredClasses = useMemo(() => {
    const q = classQuery.trim().toLowerCase();
    if (!q) return drugClasses;
    return drugClasses.filter((c) => {
      const hay = [c.name, c.mechanism, c.examples.join(' '), c.uses.join(' ')]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [classQuery]);

  return (
    <div>
      {/* Drug classification chart */}
      <div className="mb-4 overflow-hidden rounded-3xl border border-white/70 bg-white/85 shadow-soft backdrop-blur">
        <button
          type="button"
          onClick={() => setShowClassChart((v) => !v)}
          aria-expanded={showClassChart}
          aria-controls="drug-class-chart"
          className="flex w-full items-center gap-3 px-4 py-3 text-left"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink-50 text-ink-500">
            <Sparkles className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-base font-semibold text-ink-700">
              <Pill className="mr-1 inline h-4 w-4" />
              Drug classification chart
            </h3>
            <p className="text-[11px] text-ink-500">
              Class name, what it does, prototypical agents, what it treats — and the
              one classic "watch out for" each class carries. {drugClasses.length} classes.
            </p>
          </div>
          <ChevronDown
            className={cn(
              'h-4 w-4 shrink-0 text-ink-300 transition-transform duration-300',
              showClassChart && 'rotate-180 text-ink-700',
            )}
            aria-hidden="true"
          />
        </button>

        <AnimatePresence initial={false}>
          {showClassChart && (
            <motion.div
              id="drug-class-chart"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-ink-100/60 px-4 py-3">
                {/* Search inside chart */}
                <div className="mb-3 flex items-center gap-2 rounded-2xl border border-white/70 bg-white/80 px-3 py-2 shadow-soft backdrop-blur transition focus-within:border-ink-300 focus-within:shadow-[0_0_0_4px_rgba(44,62,80,0.15)]">
                  <Search className="h-3.5 w-3.5 shrink-0 text-ink-300" aria-hidden="true" />
                  <input
                    type="search"
                    value={classQuery}
                    onChange={(e) => setClassQuery(e.target.value)}
                    placeholder="Filter classes — e.g. NSAID, antacid, heparin…"
                    aria-label="Search drug classes"
                    className="w-full bg-transparent text-xs text-ink-700 placeholder:text-ink-300 focus:outline-none"
                  />
                  {classQuery && (
                    <button
                      type="button"
                      onClick={() => setClassQuery('')}
                      aria-label="Clear class search"
                      className="grid h-5 w-5 place-items-center rounded-full text-ink-300 transition hover:bg-ink-100 hover:text-ink-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>

                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredClasses.map((cls) => (
                    <DrugClassChip
                      key={cls.id}
                      entry={cls}
                      isOpen={expandedClass === cls.id}
                      onToggle={() =>
                        setExpandedClass(expandedClass === cls.id ? null : cls.id)
                      }
                    />
                  ))}
                </div>
                {filteredClasses.length === 0 && (
                  <p className="rounded-2xl bg-ink-50 px-3 py-2 text-center text-[11px] text-ink-400">
                    No matching classes. Try a different keyword.
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search + filter */}
      <div className="mb-4 flex flex-col gap-3">
        <div className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white/80 px-4 py-2.5 shadow-soft backdrop-blur transition focus-within:border-ink-300 focus-within:shadow-[0_0_0_4px_rgba(44,62,80,0.15)]">
          <Search className="h-4 w-4 shrink-0 text-ink-300" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search indications, drugs, regimens…"
            aria-label="Search clinical reference"
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

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-ink-300">
            <Stethoscope className="mr-1 inline h-3 w-3" />
            Clinician reference · {filtered.length} of {clinicalReference.length} entries
          </span>
          <span className="h-px flex-1 bg-ink-100" />
          <button
            onClick={() => setGroup('all')}
            aria-pressed={group === 'all'}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold transition-all',
              group === 'all'
                ? 'border-ink-700 bg-ink-700 text-white shadow-soft'
                : 'border-white/70 bg-white/70 text-ink-500 hover:border-ink-200',
            )}
          >
            All
          </button>
          {clinicalReferenceGroups.map((g) => {
            const isActive = group === g.id;
            const Icon = groupIcons[g.id];
            return (
              <button
                key={g.id}
                onClick={() => setGroup(g.id)}
                aria-pressed={isActive}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold transition-all',
                  isActive
                    ? 'border-ink-700 bg-ink-700 text-white shadow-soft'
                    : 'border-white/70 bg-white/70 text-ink-500 hover:border-ink-200',
                )}
              >
                <Icon className="h-3 w-3" />
                {g.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Drug cards */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-white/60 bg-white/60 p-8 text-center shadow-soft">
          <p className="font-display text-base text-ink-700">No matches.</p>
          <p className="mt-1 text-xs text-ink-400">Try a different keyword or group.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((entry) => (
            <DrugCard
              key={entry.id}
              entry={entry}
              isOpen={expanded === entry.id}
              onToggle={() => setExpanded(expanded === entry.id ? null : entry.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DrugCard({
  entry,
  isOpen,
  onToggle,
}: {
  entry: ClinicalRefEntry;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = groupIcons[entry.group];
  return (
    <article
      className={cn(
        'group overflow-hidden rounded-2xl border border-white/70 bg-white/85 shadow-soft backdrop-blur transition-all',
        isOpen && 'ring-2 ring-ink-700/30',
      )}
    >
      {/* Header — always visible */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
        aria-expanded={isOpen}
        aria-controls={`drug-${entry.id}`}
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink-50 text-ink-500">
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-ink-300">
              {entry.drugClass}
            </span>
            <span className="rounded-full bg-ink-100 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-ink-500">
              {entry.group}
            </span>
          </div>
          <h4 className="font-display text-base font-semibold leading-tight text-ink-700">
            {entry.title}
          </h4>
          <p className="text-[11px] text-ink-500">{entry.indication}</p>
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-ink-300 transition-transform duration-300',
            isOpen && 'rotate-180 text-ink-700',
          )}
          aria-hidden="true"
        />
      </button>

      {/* Expanded body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`drug-${entry.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-ink-100/60 px-4 py-3 text-[12px] leading-relaxed text-ink-500">
              <div className="grid gap-1 text-[11px] md:grid-cols-2">
                <div className="md:col-span-2">
                  <FieldLabel icon={<FlaskConical className="h-3 w-3" />}>
                    Mechanism
                  </FieldLabel>
                  <p>{entry.mechanism}</p>
                </div>
                <FieldLabel icon={<Pill className="h-3 w-3" />}>First-line</FieldLabel>
                <FieldLabel icon={<Sparkles className="h-3 w-3" />}>Duration</FieldLabel>
                <p className="font-mono text-[11px] text-ink-700">{entry.firstLine}</p>
                <p>{entry.duration ?? 'See first-line'}</p>
                {entry.alternatives && (
                  <>
                    <FieldLabel icon={<Pill className="h-3 w-3" />}>Alternatives</FieldLabel>
                    <div />
                    <p className="font-mono text-[11px] text-ink-700 md:col-span-2">
                      {entry.alternatives}
                    </p>
                  </>
                )}
                <FieldLabel icon={<AlertTriangle className="h-3 w-3" />}>
                  What to look out for (ADRs)
                </FieldLabel>
                <div />
                <ul className="md:col-span-2 list-inside list-disc space-y-0.5">
                  {entry.adrs.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
                <FieldLabel icon={<AlertTriangle className="h-3 w-3" />}>
                  Drug interactions
                </FieldLabel>
                <div />
                <ul className="md:col-span-2 list-inside list-disc space-y-0.5">
                  {entry.interactions.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
                {entry.doseAdjust && (
                  <>
                    <FieldLabel icon={<Activity className="h-3 w-3" />}>
                      Renal / hepatic adjustment
                    </FieldLabel>
                    <div />
                    <p className="md:col-span-2">{entry.doseAdjust}</p>
                  </>
                )}
                {entry.pregnancy && (
                  <>
                    <FieldLabel icon={<Sparkles className="h-3 w-3" />}>
                      Pregnancy / lactation
                    </FieldLabel>
                    <div />
                    <p className="md:col-span-2">{entry.pregnancy}</p>
                  </>
                )}
                <FieldLabel icon={<Eye className="h-3 w-3" />}>Monitoring</FieldLabel>
                <div />
                <ul className="md:col-span-2 list-inside list-disc space-y-0.5">
                  {entry.monitoring.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
                {entry.escalation && (
                  <div className="md:col-span-2 mt-2 rounded-2xl border border-blush-200/60 bg-blush-50 px-3 py-2">
                    <FieldLabel icon={<Shield className="h-3 w-3" />}>
                      Escalation
                    </FieldLabel>
                    <p className="text-[11px] text-ink-700">{entry.escalation}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

function FieldLabel({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="mt-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-ink-300">
      {icon}
      {children}
    </div>
  );
}

// =============================================================================
// Drug class chart chip
// =============================================================================
function DrugClassChip({
  entry,
  isOpen,
  onToggle,
}: {
  entry: DrugClassEntry;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <article
      className={cn(
        'overflow-hidden rounded-2xl border border-white/70 bg-white/85 shadow-soft backdrop-blur transition-all',
        isOpen && 'ring-2 ring-ink-700/30',
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-2 px-3 py-2.5 text-left"
      >
        <span
          className={cn(
            'grid h-7 w-7 shrink-0 place-items-center rounded-lg ring-1 ring-inset',
            drugClassColorClasses[entry.color],
          )}
        >
          <Pill className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0 flex-1">
          <h4 className="font-display text-[13px] font-semibold leading-tight text-ink-700">
            {entry.name}
          </h4>
          <p className="line-clamp-2 text-[10px] leading-snug text-ink-500">
            {entry.mechanism}
          </p>
        </div>
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 shrink-0 text-ink-300 transition-transform duration-300',
            isOpen && 'rotate-180 text-ink-700',
          )}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-ink-100/60 px-3 pb-3 pt-2 text-[11px] leading-relaxed text-ink-500">
              <FieldLabel>What it does</FieldLabel>
              <p>{entry.mechanism}</p>
              <FieldLabel>Common agents</FieldLabel>
              <p className="font-mono text-[10px] text-ink-700">
                {entry.examples.join(' · ')}
              </p>
              <FieldLabel>Used for</FieldLabel>
              <ul className="list-inside list-disc space-y-0.5">
                {entry.uses.map((u, i) => (
                  <li key={i}>{u}</li>
                ))}
              </ul>
              <div className="mt-2 rounded-2xl border border-amber-200/60 bg-amber-50 px-2.5 py-1.5">
                <FieldLabel icon={<AlertTriangle className="h-3 w-3" />}>
                  Watch out for
                </FieldLabel>
                <p className="text-[10.5px] text-ink-700">{entry.watchOut}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

// =============================================================================
// Wound care quick reference
// =============================================================================
function WoundCareView() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div>
      <div className="mb-4 rounded-3xl border border-white/70 bg-white/85 p-4 shadow-soft backdrop-blur">
        <h3 className="font-display text-base font-semibold text-ink-700">
          <Wrench className="mr-1 inline h-4 w-4" />
          Wound care quick reference
        </h3>
        <p className="mt-1 text-[12px] text-ink-500">
          Color-coded staging (red / yellow / black) plus the NPIAP pressure
          injury stages I–IV. Tap any card to expand the dressing plan, watch
          points, and escalation criteria.
        </p>
      </div>

      {/* Stages */}
      <h4 className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-ink-500">
        <span className="h-1.5 w-1.5 rounded-full bg-ink-500" />
        Wound classification & dressing plan
      </h4>
      <div className="mb-6 space-y-3">
        {woundStages.map((stage) => (
          <article
            key={stage.id}
            className={cn(
              'overflow-hidden rounded-2xl border border-white/70 bg-white/85 shadow-soft backdrop-blur transition-all',
              expanded === stage.id && 'ring-2 ring-ink-700/30',
            )}
          >
            <button
              type="button"
              onClick={() =>
                setExpanded(expanded === stage.id ? null : stage.id)
              }
              className="flex w-full items-center gap-3 px-4 py-3 text-left"
              aria-expanded={expanded === stage.id}
            >
              <span
                className={cn(
                  'grid h-9 w-9 shrink-0 place-items-center rounded-xl ring-1 ring-inset',
                  woundColorClasses[stage.color],
                )}
              >
                <Wrench className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <h4 className="font-display text-base font-semibold leading-tight text-ink-700">
                  {stage.name}
                </h4>
                <p className="text-[11px] text-ink-500">{stage.description}</p>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 shrink-0 text-ink-300 transition-transform duration-300',
                  expanded === stage.id && 'rotate-180 text-ink-700',
                )}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence initial={false}>
              {expanded === stage.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-ink-100/60 px-4 py-3 text-[12px] leading-relaxed text-ink-500">
                    <FieldLabel>Appearance</FieldLabel>
                    <p>{stage.appearance}</p>
                    <FieldLabel>Cleanser</FieldLabel>
                    <p>{stage.cleanser}</p>
                    <FieldLabel>Primary dressing</FieldLabel>
                    <p>{stage.primaryDressing}</p>
                    {stage.secondaryDressing && (
                      <>
                        <FieldLabel>Secondary dressing</FieldLabel>
                        <p>{stage.secondaryDressing}</p>
                      </>
                    )}
                    <FieldLabel>Wear time</FieldLabel>
                    <p>{stage.wearTime}</p>
                    <FieldLabel icon={<AlertTriangle className="h-3 w-3" />}>
                      What to look out for
                    </FieldLabel>
                    <ul className="list-inside list-disc space-y-0.5">
                      {stage.adrs.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                    <div className="mt-2 rounded-2xl border border-blush-200/60 bg-blush-50 px-3 py-2">
                      <FieldLabel icon={<Shield className="h-3 w-3" />}>
                        Escalation
                      </FieldLabel>
                      <p className="text-[11px] text-ink-700">{stage.escalation}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        ))}
      </div>

      {/* Medications */}
      <h4 className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-ink-500">
        <span className="h-1.5 w-1.5 rounded-full bg-ink-500" />
        Medications & supplies
      </h4>
      <div className="space-y-3">
        {woundMeds.map((med) => (
          <article
            key={med.id}
            className={cn(
              'overflow-hidden rounded-2xl border border-white/70 bg-white/85 shadow-soft backdrop-blur transition-all',
              expanded === med.id && 'ring-2 ring-ink-700/30',
            )}
          >
            <button
              type="button"
              onClick={() =>
                setExpanded(expanded === med.id ? null : med.id)
              }
              className="flex w-full items-center gap-3 px-4 py-3 text-left"
              aria-expanded={expanded === med.id}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink-50 text-ink-500">
                <Pill className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-ink-300">
                  {med.type}
                </span>
                <h4 className="font-display text-base font-semibold leading-tight text-ink-700">
                  {med.name}
                </h4>
                <p className="text-[11px] text-ink-500">{med.description}</p>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 shrink-0 text-ink-300 transition-transform duration-300',
                  expanded === med.id && 'rotate-180 text-ink-700',
                )}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence initial={false}>
              {expanded === med.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-ink-100/60 px-4 py-3 text-[12px] leading-relaxed text-ink-500">
                    <FieldLabel>When to use</FieldLabel>
                    <p>{med.whenToUse}</p>
                    <FieldLabel icon={<AlertTriangle className="h-3 w-3" />}>
                      What to look out for (ADRs)
                    </FieldLabel>
                    <ul className="list-inside list-disc space-y-0.5">
                      {med.adrs.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                    {med.notes && (
                      <>
                        <FieldLabel>Notes</FieldLabel>
                        <p>{med.notes}</p>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// Labs quick reference
// =============================================================================
function LabsView({
  query,
  setQuery,
  labSystem,
  setLabSystem,
  filtered,
  expanded,
  setExpanded,
}: {
  query: string;
  setQuery: (v: string) => void;
  labSystem: 'all' | LabEntry['system'];
  setLabSystem: (s: 'all' | LabEntry['system']) => void;
  filtered: LabEntry[];
  expanded: string | null;
  setExpanded: (id: string | null) => void;
}) {
  return (
    <div>
      <div className="mb-4 rounded-3xl border border-white/70 bg-white/85 p-4 shadow-soft backdrop-blur">
        <h3 className="font-display text-base font-semibold text-ink-700">
          <FlaskConical className="mr-1 inline h-4 w-4" />
          Labs quick reference
        </h3>
        <p className="mt-1 text-[12px] text-ink-500">
          Adult reference ranges. Always compare with your lab's specific range.
          Tap any card to expand the indications, full range, and what high/low
          means clinically.
        </p>
      </div>

      {/* Search */}
      <div className="mb-3 flex items-center gap-2 rounded-2xl border border-white/70 bg-white/80 px-4 py-2.5 shadow-soft backdrop-blur transition focus-within:border-ink-300 focus-within:shadow-[0_0_0_4px_rgba(44,62,80,0.15)]">
        <Search className="h-4 w-4 shrink-0 text-ink-300" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by acronym, full name, or test purpose…"
          aria-label="Search labs"
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
          <Microscope className="mr-1 inline h-3 w-3" />
          {filtered.length} of {labReference.length} tests
        </span>
        <span className="h-px flex-1 bg-ink-100" />
        <button
          onClick={() => setLabSystem('all')}
          aria-pressed={labSystem === 'all'}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold transition-all',
            labSystem === 'all'
              ? 'border-ink-700 bg-ink-700 text-white shadow-soft'
              : 'border-white/70 bg-white/70 text-ink-500 hover:border-ink-200',
          )}
        >
          All
        </button>
        {labSystems.map((s) => {
          const isActive = labSystem === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setLabSystem(s.id)}
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

      {/* Lab cards */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-white/60 bg-white/60 p-8 text-center shadow-soft">
          <p className="font-display text-base text-ink-700">No matches.</p>
          <p className="mt-1 text-xs text-ink-400">
            Try a different keyword or body system.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((entry) => (
            <LabCard
              key={entry.id}
              entry={entry}
              isOpen={expanded === entry.id}
              onToggle={() => setExpanded(expanded === entry.id ? null : entry.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function LabCard({
  entry,
  isOpen,
  onToggle,
}: {
  entry: LabEntry;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = labSystemIcons[entry.system] ?? FlaskConical;
  return (
    <article
      className={cn(
        'group overflow-hidden rounded-2xl border border-white/70 bg-white/85 shadow-soft backdrop-blur transition-all',
        isOpen && 'ring-2 ring-ink-700/30',
      )}
    >
      {/* Header */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
        aria-expanded={isOpen}
        aria-controls={`lab-${entry.id}`}
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink-50 text-ink-500">
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-ink-700 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white">
              {entry.acronym}
            </span>
            <span className="rounded-full bg-ink-100 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-ink-500">
              {entry.system}
            </span>
          </div>
          <h4 className="font-display text-base font-semibold leading-tight text-ink-700">
            {entry.fullName}
          </h4>
          <p className="text-[11px] text-ink-500">{entry.description}</p>
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-ink-300 transition-transform duration-300',
            isOpen && 'rotate-180 text-ink-700',
          )}
          aria-hidden="true"
        />
      </button>

      {/* Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`lab-${entry.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-ink-100/60 px-4 py-3 text-[12px] leading-relaxed text-ink-500">
              <FieldLabel icon={<Sparkles className="h-3 w-3" />}>Purpose</FieldLabel>
              <p>{entry.purpose}</p>

              <FieldLabel icon={<Stethoscope className="h-3 w-3" />}>
                When to order
              </FieldLabel>
              <ul className="list-inside list-disc space-y-0.5">
                {entry.indications.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>

              <FieldLabel icon={<FlaskConical className="h-3 w-3" />}>
                Reference range
              </FieldLabel>
              <p className="font-mono text-[11px] text-ink-700">{entry.range}</p>

              <div className="mt-3 grid gap-2 md:grid-cols-2">
                <div className="rounded-2xl border border-blush-200/60 bg-blush-50 px-3 py-2">
                  <FieldLabel icon={<ChevronDown className="h-3 w-3" />}>
                    LOW
                  </FieldLabel>
                  <p className="text-[11px] text-ink-700">{entry.low}</p>
                </div>
                <div className="rounded-2xl border border-mint-200/60 bg-mint-50 px-3 py-2">
                  <FieldLabel icon={<ChevronDown className="h-3 w-3 rotate-180" />}>
                    HIGH
                  </FieldLabel>
                  <p className="text-[11px] text-ink-700">{entry.high}</p>
                </div>
              </div>

              {entry.notes && (
                <div className="mt-2 rounded-2xl border border-ink-100/60 bg-ink-50 px-3 py-2">
                  <FieldLabel icon={<Eye className="h-3 w-3" />}>Notes</FieldLabel>
                  <p className="text-[11px] text-ink-700">{entry.notes}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
