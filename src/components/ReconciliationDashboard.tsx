import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Plus,
  Trash2,
  Lock,
  FileText,
  Copy,
  Check,
  Pill,
  Eye,
  Brain,
  Hand,
  BookOpen,
  AlertTriangle,
  Send,
  X,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type MedicationRow = {
  id: string;
  name: string;
  directions: string;
  match: 'profile' | 'variance' | null;
  count: 'adherent' | 'short' | 'extra' | null;
  notes: string;
};

type BarrierRating = 'I' | 'A' | 'D' | null;

type Escalation = 'routine' | 'pharmacy' | 'urgent' | null;

type Delivery = 'fax' | 'email';

const todayIso = () => new Date().toISOString().slice(0, 10);

const uid = () => Math.random().toString(36).slice(2, 9);

const emptyRow = (): MedicationRow => ({
  id: uid(),
  name: '',
  directions: '',
  match: null,
  count: null,
  notes: '',
});

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SectionHeader({
  number,
  title,
  Icon,
}: {
  number: string;
  title: string;
  Icon: React.FC<{ className?: string }>;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blush-200 to-mint-200 text-ink-500 shadow-soft">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-300">
          Section {number}
        </div>
        <h2 className="font-display text-xl font-semibold text-ink-700">
          {title}
        </h2>
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">
        {label}
        {required && <span className="ml-1 text-blush-500">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-xl border border-white/60 bg-white/70 px-3 py-2.5 text-sm text-ink-700 shadow-soft outline-none transition focus:border-mint-300 focus:bg-white focus:ring-2 focus:ring-mint-200/60"
      />
    </label>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function ReconciliationDashboard() {
  // ----- Section 1: Metadata -----
  const [clientName, setClientName] = useState('');
  const [dob, setDob] = useState('');
  const [auditDate, setAuditDate] = useState(todayIso());
  const [nurseName, setNurseName] = useState('');
  const [pharmacy, setPharmacy] = useState('');
  const [physician, setPhysician] = useState('');

  // ----- Section 2: Reconciliation matrix -----
  const [rows, setRows] = useState<MedicationRow[]>([emptyRow()]);
  const addRow = () => setRows((r) => [...r, emptyRow()]);
  const removeRow = (id: string) =>
    setRows((r) => (r.length === 1 ? r : r.filter((x) => x.id !== id)));
  const updateRow = (id: string, patch: Partial<MedicationRow>) =>
    setRows((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  // ----- Section 3: Geriatric / Psychotropic -----
  const [hasPrn, setHasPrn] = useState<boolean | null>(null);
  const [prnNotes, setPrnNotes] = useState('');
  const [storageTemp, setStorageTemp] = useState(false);
  const [storageExpired, setStorageExpired] = useState(false);
  const [storageNarcotics, setStorageNarcotics] = useState(false);

  // ----- Section 4: Barriers -----
  const [dexterity, setDexterity] = useState<BarrierRating>(null);
  const [visual, setVisual] = useState<BarrierRating>(null);
  const [cognitive, setCognitive] = useState<BarrierRating>(null);
  const [literacy, setLiteracy] = useState<BarrierRating>(null);

  // ----- Section 5: Summary / Escalation -----
  const [summary, setSummary] = useState('');
  const [escalation, setEscalation] = useState<Escalation>(null);
  const [sentDate, setSentDate] = useState('');
  const [delivery, setDelivery] = useState<Delivery>('fax');
  const [signature, setSignature] = useState('');

  // ----- Submission state -----
  const [showSummary, setShowSummary] = useState(false);
  const [showErrors, setShowErrors] = useState<{ [k: string]: string }>({});
  const [copied, setCopied] = useState(false);

  // ----- Validation -----
  const errors = useMemo(() => {
    const e: { [k: string]: string } = {};
    if (!clientName.trim()) e.clientName = 'Client name is required.';
    if (!nurseName.trim()) e.nurseName = 'Auditing nurse name is required.';
    if (!auditDate) e.auditDate = 'Audit date is required.';
    rows.forEach((r, i) => {
      if (!r.name.trim()) {
        e[`row-${i}-name`] = 'Medication name required.';
      }
    });
    if (hasPrn === true && !prnNotes.trim()) {
      e.prnNotes = 'Log frequency and signs when PRN sedatives are present.';
    }
    if (!summary.trim())
      e.summary = 'Nursing findings summary is required for sign-off.';
    if (!escalation) e.escalation = 'Select an escalation pathway.';
    if (escalation === 'urgent' && !sentDate)
      e.sentDate = 'Urgent escalation requires the sent-to-doctor date.';
    if (escalation === 'urgent' && !signature.trim())
      e.signature = 'Digital signature required for lock & submit.';
    return e;
  }, [clientName, nurseName, auditDate, rows, hasPrn, prnNotes, summary, escalation, sentDate, signature]);

  const canSubmit = Object.keys(errors).length === 0;

  const buildJson = () => ({
    metadata: {
      clientName,
      dob,
      auditDate,
      nurseName,
      pharmacy,
      physician,
    },
    medications: rows.map(({ id, ...rest }) => rest),
    geriatric: {
      hasPrn,
      prnNotes: hasPrn ? prnNotes : null,
      storage: {
        temperatureSafe: storageTemp,
        expiredFlagged: storageExpired,
        narcoticsLocked: storageNarcotics,
      },
    },
    barriers: {
      dexterity,
      visual,
      cognitive,
      literacy,
    },
    summary,
    escalation: {
      pathway: escalation,
      sentToPhysicianDate: sentDate || null,
      deliveryMethod: delivery,
      signature,
    },
    completedAt: new Date().toISOString(),
  });

  const onSubmit = () => {
    if (!canSubmit) {
      setShowErrors(errors);
      // Scroll to first error
      const firstKey = Object.keys(errors)[0];
      const el = document.getElementById(`field-${firstKey}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setShowErrors({});
    setShowSummary(true);
  };

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(buildJson(), null, 2),
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  const ratingOptions: {
    key: BarrierRating;
    label: string;
    accent: 'mint' | 'cream' | 'blush';
    Icon: React.FC<{ className?: string }>;
  }[] = [
    { key: 'I', label: 'Independent', accent: 'mint', Icon: Sparkles },
    { key: 'A', label: 'Assisted', accent: 'cream', Icon: Hand },
    { key: 'D', label: 'Dependent', accent: 'blush', Icon: AlertTriangle },
  ];

  const barrierCategories: {
    key: string;
    label: string;
    sub: string;
    Icon: React.FC<{ className?: string }>;
    value: BarrierRating;
    set: (v: BarrierRating) => void;
  }[] = [
    {
      key: 'dexterity',
      label: 'Fine-Motor / Dexterity',
      sub: 'Popping pills · Opening bottles',
      Icon: Hand,
      value: dexterity,
      set: setDexterity,
    },
    {
      key: 'visual',
      label: 'Visual Acuity',
      sub: 'Reading labels · Identifying pills',
      Icon: Eye,
      value: visual,
      set: setVisual,
    },
    {
      key: 'cognitive',
      label: 'Cognitive Recall',
      sub: 'Remembering why & when',
      Icon: Brain,
      value: cognitive,
      set: setCognitive,
    },
    {
      key: 'literacy',
      label: 'Health Literacy',
      sub: 'Understanding instructions',
      Icon: BookOpen,
      value: literacy,
      set: setLiteracy,
    },
  ];

  return (
    <div className="space-y-6">
      {/* ============================================================ */}
      {/* SECTION 1: Header & Metadata Intake                          */}
      {/* ============================================================ */}
      <section className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-soft backdrop-blur md:p-8">
        <SectionHeader number="01" title="Header & Metadata Intake" Icon={FileText} />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div id="field-clientName">
            <TextField
              label="Client Name"
              value={clientName}
              onChange={setClientName}
              placeholder="Full legal name"
              required
            />
            {showErrors.clientName && (
              <p className="mt-1 text-[11px] text-blush-500">
                {showErrors.clientName}
              </p>
            )}
          </div>
          <TextField
            label="Date of Birth"
            value={dob}
            onChange={setDob}
            type="date"
          />
          <div id="field-auditDate">
            <TextField
              label="Date of Audit"
              value={auditDate}
              onChange={setAuditDate}
              type="date"
              required
            />
            {showErrors.auditDate && (
              <p className="mt-1 text-[11px] text-blush-500">
                {showErrors.auditDate}
              </p>
            )}
          </div>
          <div id="field-nurseName">
            <TextField
              label="Auditing Nurse"
              value={nurseName}
              onChange={setNurseName}
              placeholder="RN / LPN name"
              required
            />
            {showErrors.nurseName && (
              <p className="mt-1 text-[11px] text-blush-500">
                {showErrors.nurseName}
              </p>
            )}
          </div>
          <TextField
            label="Primary Pharmacy"
            value={pharmacy}
            onChange={setPharmacy}
            placeholder="Name · Phone · Location"
          />
          <TextField
            label="Attending Physician"
            value={physician}
            onChange={setPhysician}
            placeholder="Dr. name · Clinic"
          />
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: Dynamic Reconciliation Matrix                     */}
      {/* ============================================================ */}
      <section className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-soft backdrop-blur md:p-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <SectionHeader
            number="02"
            title="Dynamic Reconciliation & Count Matrix"
            Icon={Pill}
          />
          <button
            type="button"
            onClick={addRow}
            className="inline-flex items-center gap-2 rounded-full bg-ink-500 px-4 py-2 text-sm font-medium text-white shadow-soft transition-transform hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" />
            Add Medication Row
          </button>
        </div>

        <div className="mt-6 space-y-3">
          {/* Column header (md+) */}
          <div className="hidden gap-2 px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-300 lg:grid lg:grid-cols-[2.4fr_2fr_1.4fr_1.4fr_2.4fr_36px]">
            <span>Medication · Strength</span>
            <span>Prescribed Directions</span>
            <span>Source of Truth</span>
            <span>Count Status</span>
            <span>Divergence Notes</span>
            <span />
          </div>

          {rows.map((row, i) => (
            <div
              key={row.id}
              className="grid gap-3 rounded-2xl border border-white/60 bg-white/60 p-4 shadow-soft lg:grid-cols-[2.4fr_2fr_1.4fr_1.4fr_2.4fr_36px] lg:items-start lg:gap-2 lg:p-3"
            >
              <div id={`field-row-${i}-name`}>
                <input
                  value={row.name}
                  onChange={(e) =>
                    updateRow(row.id, { name: e.target.value })
                  }
                  placeholder="e.g. Metoprolol 25 mg"
                  className="w-full rounded-lg border border-white/60 bg-white px-3 py-2 text-sm text-ink-700 outline-none focus:border-mint-300 focus:ring-2 focus:ring-mint-200/60"
                />
                {showErrors[`row-${i}-name`] && (
                  <p className="mt-1 text-[10px] text-blush-500">
                    {showErrors[`row-${i}-name`]}
                  </p>
                )}
              </div>
              <input
                value={row.directions}
                onChange={(e) =>
                  updateRow(row.id, { directions: e.target.value })
                }
                placeholder="1 tab AM with food"
                className="w-full rounded-lg border border-white/60 bg-white px-3 py-2 text-sm text-ink-700 outline-none focus:border-mint-300 focus:ring-2 focus:ring-mint-200/60"
              />
              {/* Source of truth pill toggle */}
              <div className="flex gap-1.5">
                {(
                  [
                    { v: 'profile', label: 'Profile Match' },
                    { v: 'variance', label: 'Label Variance' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.v}
                    type="button"
                    onClick={() =>
                      updateRow(row.id, { match: opt.v as 'profile' | 'variance' })
                    }
                    className={cn(
                      'flex-1 rounded-full border px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition',
                      row.match === opt.v
                        ? opt.v === 'profile'
                          ? 'border-mint-400 bg-mint-100 text-ink-700'
                          : 'border-blush-400 bg-blush-100 text-ink-700'
                        : 'border-white/60 bg-white text-ink-400 hover:bg-white/80',
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {/* Count status pill */}
              <select
                value={row.count ?? ''}
                onChange={(e) =>
                  updateRow(row.id, {
                    count:
                      (e.target.value as MedicationRow['count']) || null,
                  })
                }
                className="w-full rounded-lg border border-white/60 bg-white px-2 py-2 text-sm text-ink-700 outline-none focus:border-mint-300 focus:ring-2 focus:ring-mint-200/60"
              >
                <option value="">— Status —</option>
                <option value="adherent">Adherent</option>
                <option value="short">Short Count</option>
                <option value="extra">Extra Pills Over</option>
              </select>
              <textarea
                value={row.notes}
                onChange={(e) =>
                  updateRow(row.id, { notes: e.target.value })
                }
                placeholder="Nurse observations…"
                rows={2}
                className="w-full rounded-lg border border-white/60 bg-white px-3 py-2 text-sm text-ink-700 outline-none focus:border-mint-300 focus:ring-2 focus:ring-mint-200/60"
              />
              <button
                type="button"
                onClick={() => removeRow(row.id)}
                aria-label="Remove row"
                className="grid h-9 w-9 place-self-center place-items-center rounded-full bg-white text-ink-400 shadow-soft transition hover:bg-blush-100 hover:text-blush-500 disabled:cursor-not-allowed disabled:opacity-30"
                disabled={rows.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3: Geriatric & Psychotropic Focus                    */}
      {/* ============================================================ */}
      <section className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-soft backdrop-blur md:p-8">
        <SectionHeader
          number="03"
          title="Geriatric & Psychotropic Focus Matrix"
          Icon={Brain}
        />

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Psychotropic sub-panel */}
          <div className="rounded-2xl border border-white/60 bg-blush-50/50 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-base font-semibold text-ink-700">
                  Active PRN Sedatives / Antipsychotics?
                </h3>
                <p className="mt-1 text-xs text-ink-400">
                  Flag if PRN benzodiazepines, antipsychotics, or sedating
                  antihistamines are present.
                </p>
              </div>
              <div className="flex shrink-0 gap-1.5">
                {[
                  { v: true, label: 'Yes' },
                  { v: false, label: 'No' },
                ].map((opt) => (
                  <button
                    key={String(opt.v)}
                    type="button"
                    onClick={() => setHasPrn(opt.v)}
                    className={cn(
                      'rounded-full border px-3 py-1.5 text-xs font-semibold transition',
                      hasPrn === opt.v
                        ? opt.v
                          ? 'border-blush-400 bg-blush-200 text-ink-700'
                          : 'border-mint-400 bg-mint-200 text-ink-700'
                        : 'border-white/60 bg-white text-ink-400 hover:bg-white/80',
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {hasPrn === true && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div id="field-prnNotes" className="mt-4">
                    <label className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">
                        Frequency &amp; signs of over-sedation or increased
                        confusion
                        <span className="ml-1 text-blush-500">*</span>
                      </span>
                      <textarea
                        value={prnNotes}
                        onChange={(e) => setPrnNotes(e.target.value)}
                        rows={3}
                        placeholder="e.g. Given 0.5 mg lorazepam nightly — mornings groggy, missed breakfast twice this week…"
                        className="rounded-xl border border-white/60 bg-white px-3 py-2.5 text-sm text-ink-700 outline-none focus:border-mint-300 focus:ring-2 focus:ring-mint-200/60"
                      />
                    </label>
                    {showErrors.prnNotes && (
                      <p className="mt-1 text-[11px] text-blush-500">
                        {showErrors.prnNotes}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Storage hazards */}
          <div className="rounded-2xl border border-white/60 bg-mint-50/50 p-5">
            <h3 className="font-display text-base font-semibold text-ink-700">
              Storage Hazards Checklist
            </h3>
            <p className="mt-1 text-xs text-ink-400">
              Tick each item only after physically verifying in the home.
            </p>
            <div className="mt-4 space-y-2.5">
              {[
                {
                  v: storageTemp,
                  set: setStorageTemp,
                  label: 'Temperature-controlled and safe location',
                },
                {
                  v: storageExpired,
                  set: setStorageExpired,
                  label: 'Expired or discontinued pills flagged',
                },
                {
                  v: storageNarcotics,
                  set: setStorageNarcotics,
                  label: 'Narcotics securely managed / locked',
                },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => item.set(!item.v)}
                  className={cn(
                    'flex w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition',
                    item.v
                      ? 'border-mint-400 bg-mint-100 text-ink-700'
                      : 'border-white/60 bg-white text-ink-500 hover:bg-white/80',
                  )}
                >
                  <span
                    className={cn(
                      'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition',
                      item.v
                        ? 'border-mint-500 bg-mint-500 text-white'
                        : 'border-ink-200 bg-white',
                    )}
                  >
                    {item.v && <Check className="h-3 w-3" />}
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4: Barrier Assessment                                */}
      {/* ============================================================ */}
      <section className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-soft backdrop-blur md:p-8">
        <SectionHeader
          number="04"
          title="Barrier Assessment — Physical & Cognitive"
          Icon={Hand}
        />
        <p className="mt-2 text-sm text-ink-400">
          Rate the client&rsquo;s functional ability in each category. Cards
          highlight dynamically when selected.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {barrierCategories.map((cat) => (
            <div
              key={cat.key}
              className="rounded-2xl border border-white/60 bg-white/60 p-5 shadow-soft"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-blush-100 text-blush-500">
                  <cat.Icon className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-ink-700">
                    {cat.label}
                  </h3>
                  <p className="text-[11px] uppercase tracking-widest text-ink-300">
                    {cat.sub}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {ratingOptions.map((opt) => {
                  const active = cat.value === opt.key;
                  const accentMap = {
                    mint: {
                      ring: 'ring-mint-400 border-mint-400 bg-mint-100',
                      text: 'text-ink-700',
                      chip: 'bg-mint-400 text-white',
                    },
                    cream: {
                      ring: 'ring-cream-200 border-cream-200 bg-cream-100',
                      text: 'text-ink-700',
                      chip: 'bg-ink-500 text-white',
                    },
                    blush: {
                      ring: 'ring-blush-400 border-blush-400 bg-blush-100',
                      text: 'text-ink-700',
                      chip: 'bg-blush-400 text-white',
                    },
                  };
                  const a = accentMap[opt.accent];
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => cat.set(opt.key)}
                      className={cn(
                        'flex flex-col items-center gap-1.5 rounded-xl border-2 px-2 py-3 text-center transition',
                        active
                          ? cn(a.ring, 'ring-2 ring-offset-1')
                          : 'border-white/60 bg-white text-ink-400 hover:bg-white/80',
                      )}
                    >
                      <span
                        className={cn(
                          'grid h-8 w-8 place-items-center rounded-full font-display text-base font-bold',
                          active ? a.chip : 'bg-ink-100 text-ink-400',
                        )}
                      >
                        {opt.key}
                      </span>
                      <span
                        className={cn(
                          'text-[10px] font-semibold uppercase tracking-wider',
                          active ? a.text : 'text-ink-300',
                        )}
                      >
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5: Summary & Sign-off                                */}
      {/* ============================================================ */}
      <section className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-soft backdrop-blur md:p-8">
        <SectionHeader
          number="05"
          title="Clinical Summary & Digital Sign-off"
          Icon={Send}
        />

        <div className="mt-6 space-y-6">
          {/* Summary */}
          <div id="field-summary">
            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">
                Nursing Findings Summary
                <span className="ml-1 text-blush-500">*</span>
              </span>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={5}
                placeholder="Synthesis of pill counts, divergence notes, barrier ratings, and recommended physician escalations…"
                className="rounded-xl border border-white/60 bg-white px-3 py-2.5 text-sm leading-relaxed text-ink-700 outline-none focus:border-mint-300 focus:ring-2 focus:ring-mint-200/60"
              />
            </label>
            {showErrors.summary && (
              <p className="mt-1 text-[11px] text-blush-500">
                {showErrors.summary}
              </p>
            )}
          </div>

          {/* Escalation pathway */}
          <div id="field-escalation">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">
              Escalation Pathway
              <span className="ml-1 text-blush-500">*</span>
            </p>
            <div className="mt-2 grid gap-3 sm:grid-cols-3">
              {(
                [
                  {
                    v: 'routine',
                    label: 'Routine File',
                    sub: 'Upload to secure EHR',
                    accent: 'mint',
                  },
                  {
                    v: 'pharmacy',
                    label: 'Pharmacy Consult',
                    sub: 'Required for clarification',
                    accent: 'cream',
                  },
                  {
                    v: 'urgent',
                    label: 'Physician Notification',
                    sub: 'Urgent action required',
                    accent: 'blush',
                  },
                ] as const
              ).map((opt) => {
                const active = escalation === opt.v;
                const accentMap = {
                  mint: {
                    ring: 'border-mint-400 bg-mint-100',
                    dot: 'bg-mint-500',
                  },
                  cream: {
                    ring: 'border-ink-300 bg-cream-100',
                    dot: 'bg-ink-500',
                  },
                  blush: {
                    ring: 'border-blush-400 bg-blush-100',
                    dot: 'bg-blush-500',
                  },
                };
                const a = accentMap[opt.accent];
                return (
                  <button
                    key={opt.v}
                    type="button"
                    onClick={() => setEscalation(opt.v as Escalation)}
                    className={cn(
                      'flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition',
                      active
                        ? cn(a.ring, 'ring-2 ring-offset-1')
                        : 'border-white/60 bg-white hover:bg-white/80',
                    )}
                  >
                    <span
                      className={cn(
                        'mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2',
                        active
                          ? cn('border-transparent', a.dot)
                          : 'border-ink-200 bg-white',
                      )}
                    >
                      {active && <Check className="h-3 w-3 text-white" />}
                    </span>
                    <span>
                      <span className="block font-display text-sm font-semibold text-ink-700">
                        {opt.label}
                      </span>
                      <span className="block text-[11px] text-ink-400">
                        {opt.sub}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            {showErrors.escalation && (
              <p className="mt-2 text-[11px] text-blush-500">
                {showErrors.escalation}
              </p>
            )}
          </div>

          {/* Action tracker — only for pharmacy/urgent */}
          <AnimatePresence>
            {(escalation === 'pharmacy' || escalation === 'urgent') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid gap-4 rounded-2xl border border-white/60 bg-white/60 p-4 sm:grid-cols-2">
                  <div id="field-sentDate">
                    <TextField
                      label="Date sent to doctor / pharmacy"
                      value={sentDate}
                      onChange={setSentDate}
                      type="date"
                      required={escalation === 'urgent'}
                    />
                    {showErrors.sentDate && (
                      <p className="mt-1 text-[11px] text-blush-500">
                        {showErrors.sentDate}
                      </p>
                    )}
                  </div>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">
                      Delivery Method
                    </span>
                    <select
                      value={delivery}
                      onChange={(e) => setDelivery(e.target.value as Delivery)}
                      className="rounded-xl border border-white/60 bg-white px-3 py-2.5 text-sm text-ink-700 outline-none focus:border-mint-300 focus:ring-2 focus:ring-mint-200/60"
                    >
                      <option value="fax">Secure Fax</option>
                      <option value="email">Encrypted Email</option>
                    </select>
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Signature + Lock button */}
          <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <div id="field-signature">
              <label className="flex flex-col gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">
                  Digital Signature (type your full name)
                  {escalation === 'urgent' && (
                    <span className="ml-1 text-blush-500">*</span>
                  )}
                </span>
                <input
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder="e.g. Catherine Hamaoui, LPN"
                  className="rounded-xl border border-white/60 bg-white px-3 py-2.5 text-2xl italic text-ink-700 outline-none focus:border-mint-300 focus:ring-2 focus:ring-mint-200/60"
                  style={{ fontFamily: '"Dancing Script", "Brush Script MT", cursive' }}
                />
              </label>
              {showErrors.signature && (
                <p className="mt-1 text-[11px] text-blush-500">
                  {showErrors.signature}
                </p>
              )}
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={onSubmit}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink-500 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-glow transition-transform hover:-translate-y-0.5 sm:w-auto"
              >
                <Lock className="h-4 w-4" />
                Lock &amp; Complete Audit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* JSON summary modal                                          */}
      {/* ============================================================ */}
      <AnimatePresence>
        {showSummary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] flex flex-col bg-ink-700/60 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-ink-700/80 px-4 py-3 text-white backdrop-blur sm:px-6"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/10">
                  <Check className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-white/60">
                    Audit Locked
                  </div>
                  <h2 className="font-display text-base font-semibold sm:text-lg">
                    Reconciliation Summary — {clientName}
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyJson}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" /> Copy JSON
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowSummary(false)}
                  aria-label="Close"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="relative flex flex-1 items-stretch justify-center overflow-hidden"
              onClick={() => setShowSummary(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="m-3 w-full max-w-5xl overflow-auto rounded-2xl bg-white p-6 text-ink-700 shadow-glow sm:m-6"
              >
                <pre className="overflow-auto rounded-xl bg-ink-50 p-4 font-mono text-xs leading-relaxed">
                  {JSON.stringify(buildJson(), null, 2)}
                </pre>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}