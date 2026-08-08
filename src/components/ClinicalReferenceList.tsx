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
  Baby,
  FlaskConical,
  Shield,
  Stethoscope,
  Syringe,
  Wrench,
  Eye,
  Sparkles,
} from 'lucide-react';
import {
  clinicalReference,
  clinicalReferenceGroups,
  type ClinicalRefEntry,
} from '@/nurses-inc-clinical-reference';
import { woundStages, woundMeds, woundMedicationTypes } from '@/nurses-inc-wound-care';
import { cn } from '@/lib/utils';

type AudienceMode = 'patient' | 'clinician';
type ClinicianTab = 'drugs' | 'wound-care';

const groupIcons: Record<ClinicalRefEntry['group'], React.FC<{ className?: string }>> = {
  std: Heart,
  respiratory: Activity,
  general: Stethoscope,
  vaccine: Syringe,
};

export default function ClinicalReferenceList() {
  const [audience, setAudience] = useState<AudienceMode>('patient');
  const [clinicianTab, setClinicianTab] = useState<ClinicianTab>('drugs');
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState<'all' | ClinicalRefEntry['group']>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
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

  return (
    <div>
      {/* Audience toggle — Patient / Clinician */}
      <div className="mb-4 flex items-center justify-center">
        <div
          role="tablist"
          aria-label="Toggle glossary audience"
          className="inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/70 p-1 shadow-soft backdrop-blur"
        >
          {[
            { id: 'patient' as const, label: 'For Families', icon: Heart },
            { id: 'clinician' as const, label: 'For Nurses & Physicians', icon: Stethoscope },
          ].map((a) => {
            const isActive = audience === a.id;
            const Icon = a.icon;
            return (
              <button
                key={a.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setAudience(a.id)}
                className={cn(
                  'relative inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors',
                  isActive ? 'text-white' : 'text-ink-500 hover:text-ink-700',
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="audience-toggle-pill"
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
                  <span>{a.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {audience === 'patient' ? (
          <motion.div
            key="patient"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <PatientView query={query} setQuery={setQuery} />
          </motion.div>
        ) : (
          <motion.div
            key="clinician"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <ClinicianView
              tab={clinicianTab}
              setTab={setClinicianTab}
              query={query}
              setQuery={setQuery}
              group={group}
              setGroup={setGroup}
              filtered={filtered}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// =============================================================================
// Patient-friendly view (hides the clinician-grade content from families)
// =============================================================================
function PatientView({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (v: string) => void;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-soft backdrop-blur transition focus-within:border-mint-200 focus-within:shadow-[0_0_0_4px_rgba(170,210,190,0.35)]">
        <Search className="h-4 w-4 shrink-0 text-ink-300" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the patient dictionary — type a term, acronym, or topic…"
          aria-label="Search patient glossary"
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

      <div className="rounded-3xl border border-white/60 bg-white/70 p-8 text-center shadow-soft">
        <span className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-2xl bg-blush-100 text-blush-500">
          <Heart className="h-5 w-5" />
        </span>
        <h3 className="font-display text-base font-semibold text-ink-700">
          You're viewing the patient dictionary.
        </h3>
        <p className="mt-1 text-sm text-ink-500">
          The patient glossary shows plain-English definitions anyone can read.
          For clinician-grade dosage and treatment information, switch to
          <span className="font-semibold text-ink-700"> For Nurses &amp; Physicians</span>.
        </p>
      </div>
    </div>
  );
}

// =============================================================================
// Clinician view
// =============================================================================
function ClinicianView({
  tab,
  setTab,
  query,
  setQuery,
  group,
  setGroup,
  filtered,
  expanded,
  setExpanded,
}: {
  tab: ClinicianTab;
  setTab: (t: ClinicianTab) => void;
  query: string;
  setQuery: (v: string) => void;
  group: 'all' | ClinicalRefEntry['group'];
  setGroup: (g: 'all' | ClinicalRefEntry['group']) => void;
  filtered: ClinicalRefEntry[];
  expanded: string | null;
  setExpanded: (id: string | null) => void;
}) {
  return (
    <div>
      {/* Sub-tabs: Drug Cards / Wound Care */}
      <div className="mb-4 flex justify-center">
        <div
          role="tablist"
          aria-label="Clinician reference sub-sections"
          className="inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/70 p-1 shadow-soft backdrop-blur"
        >
          {[
            { id: 'drugs' as const, label: 'Drug Cards', icon: Pill },
            { id: 'wound-care' as const, label: 'Wound Care', icon: Wrench },
          ].map((t) => {
            const isActive = tab === t.id;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setTab(t.id)}
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
        {tab === 'drugs' ? (
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
              filtered={filtered}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          </motion.div>
        ) : (
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
  return (
    <div>
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
                    <FieldLabel icon={<Baby className="h-3 w-3" />}>
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
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink-50 text-ink-500">
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
