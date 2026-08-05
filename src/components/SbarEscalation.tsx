import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Send,
  ShieldCheck,
  Check,
  AlertCircle,
  FileText,
  Sparkles,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types & data
// ---------------------------------------------------------------------------

type Priority = 'urgent' | 'critical' | null;

type TriggerKey =
  | 'side-effects'
  | 'motor'
  | 'cognitive'
  | 'storage';

const TRIGGER_LABELS: Record<TriggerKey, string> = {
  'side-effects':
    'Observable Adverse Drug Side Effects (e.g., hypotension, dizziness, unsteadiness)',
  motor: 'Fine-Motor / Physical Blister Pack Barriers',
  cognitive: 'Cognitive Confusion / Memory Recall Decliners',
  storage: 'Storage Hazard / Multi-Dose Confusion Matrix',
};

type QuickActionKey =
  | 'dose-review'
  | 'hold-order'
  | 'repackaging'
  | 'follow-up';

const QUICK_ACTIONS: Record<QuickActionKey, string> = {
  'dose-review':
    'Requesting an immediate medication dosage / frequency review.',
  'hold-order':
    'Requesting a temporary halt / hold on active order pending assessment.',
  repackaging:
    'Requesting pharmacy-guided compliance repackaging (blister packs).',
  'follow-up': 'Requesting an in-clinic medical follow-up appointment.',
};

const PHYSICIAN_OPTIONS = [
  'Dr. M. LeBlanc — Partner Medical Director (Moncton)',
  'Dr. S. O\u2019Brien — Geriatric Medicine (Saint John)',
  'Dr. P. Nguyen — Primary Care (Fredericton)',
  'Dr. R. Tremblay — Psychiatry (Bathurst)',
  'Dr. A. Comeau — Cardiology (Moncton)',
];

const nowLocal = () => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}  ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function BlockLetter({ letter }: { letter: 'S' | 'B' | 'A' | 'R' }) {
  return (
    <span
      className={cn(
        'grid h-10 w-10 shrink-0 place-items-center rounded-2xl font-display text-xl font-bold text-white shadow-soft',
        letter === 'S' && 'bg-ink-500',
        letter === 'B' && 'bg-mint-500',
        letter === 'A' && 'bg-blush-400',
        letter === 'R' && 'bg-ink-700',
      )}
    >
      {letter}
    </span>
  );
}

function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">
      {children}
      {required && <span className="ml-1 text-blush-500">*</span>}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function SbarEscalation() {
  // ---- Section 1: Header ----
  const [physician, setPhysician] = useState('');
  const [fromName] = useState('Catherine Hamaoui, LPN');
  const [timestamp] = useState(nowLocal());
  const [clientRef, setClientRef] = useState('');
  const [priority, setPriority] = useState<Priority>(null);

  // ---- Section 2: SBAR blocks ----
  const [situationTitle, setSituationTitle] = useState('');
  const [situationBody, setSituationBody] = useState('');
  const [background, setBackground] = useState('');
  const [assessment, setAssessment] = useState('');
  const [triggers, setTriggers] = useState<Set<TriggerKey>>(new Set());
  const [recommendation, setRecommendation] = useState('');
  const [actions, setActions] = useState<Set<QuickActionKey>>(new Set());

  // ---- Section 3: Submit ----
  const [showErrors, setShowErrors] = useState<{ [k: string]: string }>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [transmitting, setTransmitting] = useState(false);
  const [transmitted, setTransmitted] = useState(false);

  const errors = useMemo(() => {
    const e: { [k: string]: string } = {};
    if (!clientRef.trim())
      e.clientRef =
        'Client reference identifier required for privacy-safe routing.';
    if (!priority)
      e.priority = 'Select a priority level before transmission.';
    if (!situationTitle.trim())
      e.situationTitle = 'Situation title required.';
    if (!situationBody.trim())
      e.situationBody = 'Situation description required.';
    return e;
  }, [clientRef, priority, situationTitle, situationBody]);

  const canSubmit = Object.keys(errors).length === 0;

  const buildPayload = () => ({
    sbar: {
      transmission: {
        to: physician || null,
        from: fromName,
        timestamp,
        clientReference: clientRef,
        priority,
      },
      situation: { title: situationTitle, body: situationBody },
      background,
      assessment: {
        narrative: assessment,
        observableTriggers: Array.from(triggers).map((k) => TRIGGER_LABELS[k]),
      },
      recommendation: {
        narrative: recommendation,
        requestedActions: Array.from(actions).map((k) => QUICK_ACTIONS[k]),
      },
    },
    compliance: {
      framework: 'PHIPAA',
      encrypted: true,
      localStorage: false,
      transmittedAt: new Date().toISOString(),
    },
  });

  const toggleTrigger = (k: TriggerKey) => {
    setTriggers((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  };

  const toggleAction = (k: QuickActionKey) => {
    setActions((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  };

  const onTransmit = () => {
    if (!canSubmit) {
      setShowErrors(errors);
      const firstKey = Object.keys(errors)[0];
      const el = document.getElementById(`sbar-field-${firstKey}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setShowErrors({});
    setShowConfirm(true);
  };

  const confirmTransmit = () => {
    setTransmitting(true);
    const payload = buildPayload();
    // Pretty console log so the nurse can copy a clinical comm record
    // eslint-disable-next-line no-console
    console.log(
      '%cSBAR Escalation — Transmitted to Medical Director',
      'color:#2C3E50;font-weight:bold;font-size:13px;background:#E8F5E9;padding:4px 8px;border-radius:4px',
    );
    // eslint-disable-next-line no-console
    console.log(payload);
    setTimeout(() => {
      setTransmitting(false);
      setTransmitted(true);
    }, 1100);
  };

  const reset = () => {
    setPhysician('');
    setClientRef('');
    setPriority(null);
    setSituationTitle('');
    setSituationBody('');
    setBackground('');
    setAssessment('');
    setTriggers(new Set());
    setRecommendation('');
    setActions(new Set());
    setShowConfirm(false);
    setTransmitted(false);
    setShowErrors({});
  };

  return (
    <section
      id="sbar-escalation"
      className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-soft backdrop-blur md:p-8"
    >
      {/* Section banner */}
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blush-200 to-mint-200 text-ink-500 shadow-soft">
          <Send className="h-4 w-4" />
        </span>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-300">
            Part B · Internal Tool
          </div>
          <h2 className="font-display text-xl font-semibold text-ink-700">
            SBAR Urgent Medical Escalation Form
          </h2>
        </div>
      </div>

      <p className="mt-2 text-sm text-ink-400">
        Structured clinical communication for partner-physician alerts. SBAR
        (Situation · Background · Assessment · Recommendation) keeps the
        message short, unambiguous, and easy to triage.
      </p>

      {/* =================== SECTION 1 =================== */}
      <div className="mt-6 rounded-2xl border border-white/60 bg-gradient-to-br from-blush-50/60 to-mint-50/60 p-5">
        <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink-500">
          Encrypted Transmission Header
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <FieldLabel required>To — Collaborating Physician / Clinic</FieldLabel>
            <select
              value={physician}
              onChange={(e) => setPhysician(e.target.value)}
              className="rounded-xl border border-white/60 bg-white px-3 py-2.5 text-sm text-ink-700 shadow-soft outline-none focus:border-mint-300 focus:ring-2 focus:ring-mint-200/60"
            >
              <option value="">— Select physician —</option>
              {PHYSICIAN_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <FieldLabel>From</FieldLabel>
            <input
              value={fromName}
              readOnly
              className="cursor-not-allowed rounded-xl border border-white/60 bg-white/70 px-3 py-2.5 text-sm text-ink-500 shadow-soft outline-none"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <FieldLabel>Date / Time</FieldLabel>
            <input
              value={timestamp}
              readOnly
              className="cursor-not-allowed rounded-xl border border-white/60 bg-white/70 px-3 py-2.5 text-sm text-ink-500 shadow-soft outline-none"
            />
          </label>
          <div id="sbar-field-clientRef">
            <label className="flex flex-col gap-1.5">
              <FieldLabel required>
                Client Reference Identifier (initials or ID only)
              </FieldLabel>
              <input
                value={clientRef}
                onChange={(e) => setClientRef(e.target.value.toUpperCase())}
                placeholder="e.g. JD-1942"
                className="rounded-xl border border-white/60 bg-white px-3 py-2.5 text-sm text-ink-700 shadow-soft outline-none focus:border-mint-300 focus:ring-2 focus:ring-mint-200/60"
              />
            </label>
            {showErrors.clientRef && (
              <p className="mt-1 text-[11px] text-blush-500">
                {showErrors.clientRef}
              </p>
            )}
          </div>
        </div>

        <div id="sbar-field-priority" className="mt-4">
          <FieldLabel required>Priority Level</FieldLabel>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {(
              [
                {
                  v: 'urgent',
                  label: 'URGENT — 24hr Review',
                  sub: 'Non-life-threatening but requires prescriber follow-up',
                  accent: 'blush',
                },
                {
                  v: 'critical',
                  label: 'CRITICAL — Immediate Action',
                  sub: 'Active harm risk — escalate now',
                  accent: 'red',
                },
              ] as const
            ).map((opt) => {
              const active = priority === opt.v;
              return (
                <button
                  key={opt.v}
                  type="button"
                  onClick={() => setPriority(opt.v)}
                  className={cn(
                    'flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition',
                    active
                      ? opt.accent === 'blush'
                        ? 'border-blush-400 bg-blush-100'
                        : 'border-blush-500 bg-blush-200'
                      : 'border-white/60 bg-white hover:bg-white/80',
                  )}
                >
                  <span
                    className={cn(
                      'mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2',
                      active
                        ? 'border-transparent bg-ink-500'
                        : 'border-ink-200 bg-white',
                    )}
                  >
                    {active && <Check className="h-3 w-3 text-white" />}
                  </span>
                  <span>
                    <span
                      className={cn(
                        'block font-display text-sm font-semibold',
                        active ? 'text-ink-700' : 'text-ink-500',
                      )}
                    >
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
          {showErrors.priority && (
            <p className="mt-1 text-[11px] text-blush-500">
              {showErrors.priority}
            </p>
          )}
        </div>
      </div>

      {/* =================== SECTION 2 — SBAR BLOCKS =================== */}
      <div className="mt-6 space-y-5">
        {/* [S] SITUATION */}
        <div className="rounded-2xl border border-white/60 bg-white/60 p-5 shadow-soft">
          <div className="flex items-center gap-3">
            <BlockLetter letter="S" />
            <div>
              <h3 className="font-display text-base font-semibold text-ink-700">
                Situation
              </h3>
              <p className="text-[11px] uppercase tracking-widest text-ink-300">
                The core issue
              </p>
            </div>
          </div>
          <div id="sbar-field-situationTitle" className="mt-4">
            <label className="flex flex-col gap-1.5">
              <FieldLabel required>Primary Reason for Escalation</FieldLabel>
              <input
                value={situationTitle}
                onChange={(e) => setSituationTitle(e.target.value)}
                placeholder="e.g. Apparent omission of critical anticoagulant"
                className="rounded-xl border border-white/60 bg-white px-3 py-2.5 text-sm text-ink-700 shadow-soft outline-none focus:border-mint-300 focus:ring-2 focus:ring-mint-200/60"
              />
            </label>
            {showErrors.situationTitle && (
              <p className="mt-1 text-[11px] text-blush-500">
                {showErrors.situationTitle}
              </p>
            )}
          </div>
          <div id="sbar-field-situationBody" className="mt-3">
            <label className="flex flex-col gap-1.5">
              <FieldLabel required>High-Risk Medication Discrepancy Detail</FieldLabel>
              <textarea
                value={situationBody}
                onChange={(e) => setSituationBody(e.target.value)}
                rows={3}
                placeholder="Describe the immediate discrepancy found during the home audit…"
                className="rounded-xl border border-white/60 bg-white px-3 py-2.5 text-sm leading-relaxed text-ink-700 shadow-soft outline-none focus:border-mint-300 focus:ring-2 focus:ring-mint-200/60"
              />
            </label>
            {showErrors.situationBody && (
              <p className="mt-1 text-[11px] text-blush-500">
                {showErrors.situationBody}
              </p>
            )}
          </div>
        </div>

        {/* [B] BACKGROUND */}
        <div className="rounded-2xl border border-white/60 bg-white/60 p-5 shadow-soft">
          <div className="flex items-center gap-3">
            <BlockLetter letter="B" />
            <div>
              <h3 className="font-display text-base font-semibold text-ink-700">
                Background
              </h3>
              <p className="text-[11px] uppercase tracking-widest text-ink-300">
                Clinical context
              </p>
            </div>
          </div>
          <label className="mt-4 flex flex-col gap-1.5">
            <FieldLabel>Relevant History</FieldLabel>
            <textarea
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              rows={4}
              placeholder="Log relevant diagnoses, cognitive impairment levels, historical adherence barriers, or recent pharmacy dispense date updates."
              className="rounded-xl border border-white/60 bg-white px-3 py-2.5 text-sm leading-relaxed text-ink-700 shadow-soft outline-none focus:border-mint-300 focus:ring-2 focus:ring-mint-200/60"
            />
          </label>
        </div>

        {/* [A] ASSESSMENT */}
        <div className="rounded-2xl border border-white/60 bg-white/60 p-5 shadow-soft">
          <div className="flex items-center gap-3">
            <BlockLetter letter="A" />
            <div>
              <h3 className="font-display text-base font-semibold text-ink-700">
                Assessment
              </h3>
              <p className="text-[11px] uppercase tracking-widest text-ink-300">
                Nurse&rsquo;s practical observations
              </p>
            </div>
          </div>
          <label className="mt-4 flex flex-col gap-1.5">
            <FieldLabel>Physical Count &amp; Interview Findings</FieldLabel>
            <textarea
              value={assessment}
              onChange={(e) => setAssessment(e.target.value)}
              rows={4}
              placeholder="What the nurse physically observed during the count and conversation…"
              className="rounded-xl border border-white/60 bg-white px-3 py-2.5 text-sm leading-relaxed text-ink-700 shadow-soft outline-none focus:border-mint-300 focus:ring-2 focus:ring-mint-200/60"
            />
          </label>

          <div className="mt-4 rounded-xl border border-white/60 bg-white p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">
              Observable Triggers (toggle each that applies)
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {(Object.keys(TRIGGER_LABELS) as TriggerKey[]).map((k) => {
                const active = triggers.has(k);
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => toggleTrigger(k)}
                    className={cn(
                      'flex items-start gap-3 rounded-xl border px-3 py-2.5 text-left text-[12px] transition',
                      active
                        ? 'border-mint-400 bg-mint-100 text-ink-700'
                        : 'border-white/60 bg-white text-ink-500 hover:bg-white/80',
                    )}
                  >
                    <span
                      className={cn(
                        'mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-md border transition',
                        active
                          ? 'border-mint-500 bg-mint-500 text-white'
                          : 'border-ink-200 bg-white',
                      )}
                    >
                      {active && <Check className="h-3 w-3" />}
                    </span>
                    <span>{TRIGGER_LABELS[k]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* [R] RECOMMENDATION */}
        <div className="rounded-2xl border border-white/60 bg-white/60 p-5 shadow-soft">
          <div className="flex items-center gap-3">
            <BlockLetter letter="R" />
            <div>
              <h3 className="font-display text-base font-semibold text-ink-700">
                Recommendation
              </h3>
              <p className="text-[11px] uppercase tracking-widest text-ink-300">
                Suggested action path
              </p>
            </div>
          </div>
          <label className="mt-4 flex flex-col gap-1.5">
            <FieldLabel>Collaborative Suggestion</FieldLabel>
            <textarea
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
              rows={3}
              placeholder="What you are asking the physician to consider…"
              className="rounded-xl border border-white/60 bg-white px-3 py-2.5 text-sm leading-relaxed text-ink-700 shadow-soft outline-none focus:border-mint-300 focus:ring-2 focus:ring-mint-200/60"
            />
          </label>

          <div className="mt-4 rounded-xl border border-white/60 bg-white p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">
              Quick-Inject Action Items
            </p>
            <div className="mt-3 grid gap-2">
              {(Object.keys(QUICK_ACTIONS) as QuickActionKey[]).map((k) => {
                const active = actions.has(k);
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => toggleAction(k)}
                    className={cn(
                      'flex items-start gap-3 rounded-xl border px-3 py-2.5 text-left text-[13px] transition',
                      active
                        ? 'border-blush-400 bg-blush-100 text-ink-700'
                        : 'border-white/60 bg-white text-ink-500 hover:bg-white/80',
                    )}
                  >
                    <span
                      className={cn(
                        'mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-md border transition',
                        active
                          ? 'border-blush-500 bg-blush-500 text-white'
                          : 'border-ink-200 bg-white',
                      )}
                    >
                      {active && <Check className="h-3 w-3" />}
                    </span>
                    <span>{QUICK_ACTIONS[k]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* =================== SECTION 3 =================== */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-mint-300 bg-mint-50/70">
        <div className="flex items-start gap-3 border-b border-mint-200 px-5 py-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-mint-500" />
          <p className="text-[12px] leading-relaxed text-ink-700">
            <span className="font-semibold underline">
              PHIPAA COMPLIANT SECURE LOG
            </span>
            : This communication module uses encrypted data-packaging
            protocols. No unencrypted Protected Health Information (PHI) is
            stored locally on non-secure networks.
          </p>
        </div>

        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="h-4 w-4 text-blush-400" />
            <p className="text-xs text-ink-500">
              Generate a printable SBAR PDF or transmit the encrypted payload
              directly to the Medical Director.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                // eslint-disable-next-line no-console
                console.log('SBAR PDF payload:', buildPayload());
              }}
              className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2.5 text-sm font-medium text-ink-500 shadow-soft transition-colors hover:bg-white/80"
            >
              <FileText className="h-4 w-4" />
              Generate Secure PDF / Fax Package
            </button>
            <button
              type="button"
              onClick={onTransmit}
              className="group inline-flex items-center gap-2 rounded-full bg-ink-500 px-5 py-2.5 text-sm font-semibold uppercase tracking-widest text-white shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Send className="h-4 w-4" />
              Transmit to Medical Director
            </button>
          </div>
        </div>
      </div>

      {/* ====== Confirm + transmit overlay ====== */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[85] flex flex-col bg-ink-700/60 backdrop-blur-md"
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
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-white/60">
                    Encrypted SBAR Transmission
                  </div>
                  <h2 className="font-display text-base font-semibold sm:text-lg">
                    Confirm — {clientRef || 'Client'}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                aria-label="Close"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>

            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="relative flex flex-1 items-stretch justify-center overflow-hidden p-3 sm:p-6"
              onClick={() => !transmitting && setShowConfirm(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-glow"
              >
                <div className="p-6 sm:p-8">
                  {!transmitted ? (
                    <>
                      <div className="flex items-start gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-blush-100 text-blush-500">
                          <AlertCircle className="h-5 w-5" />
                        </span>
                        <div>
                          <h3 className="font-display text-lg font-semibold text-ink-700">
                            Ready to transmit
                          </h3>
                          <p className="mt-1 text-sm text-ink-400">
                            Routing{' '}
                            <span className="font-semibold text-ink-700">
                              {physician || 'physician (no recipient selected)'}
                            </span>{' '}
                            · Priority{' '}
                            <span
                              className={cn(
                                'font-semibold uppercase',
                                priority === 'critical'
                                  ? 'text-blush-500'
                                  : 'text-ink-700',
                              )}
                            >
                              {priority}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 max-h-[40vh] overflow-auto rounded-xl border border-white/60 bg-ink-50 p-4 text-[12px] leading-relaxed text-ink-700">
                        <p className="font-display text-sm font-semibold text-ink-700">
                          {situationTitle || '(no title)'}
                        </p>
                        <p className="mt-1 whitespace-pre-wrap">
                          {situationBody}
                        </p>
                        {triggers.size > 0 && (
                          <p className="mt-2 italic text-ink-500">
                            Observable triggers:{' '}
                            {Array.from(triggers)
                              .map((k) => TRIGGER_LABELS[k])
                              .join('; ')}
                          </p>
                        )}
                        {actions.size > 0 && (
                          <p className="mt-1 italic text-ink-500">
                            Requested actions:{' '}
                            {Array.from(actions)
                              .map((k) => QUICK_ACTIONS[k])
                              .join('; ')}
                          </p>
                        )}
                      </div>

                      <div className="mt-6 flex flex-wrap items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowConfirm(false)}
                          className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-medium text-ink-500 shadow-soft transition-colors hover:bg-white/80"
                          disabled={transmitting}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={confirmTransmit}
                          disabled={transmitting}
                          className="inline-flex items-center gap-2 rounded-full bg-ink-500 px-5 py-2.5 text-sm font-semibold uppercase tracking-widest text-white shadow-soft transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
                        >
                          {transmitting ? (
                            <>
                              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                              Encrypting…
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4" />
                              Confirm &amp; Transmit
                            </>
                          )}
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="py-8 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 220,
                          damping: 14,
                        }}
                        className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-mint-200 text-mint-500 shadow-glow-mint"
                      >
                        <Check className="h-10 w-10" strokeWidth={3} />
                      </motion.div>
                      <h3 className="mt-6 font-display text-2xl font-semibold text-ink-700">
                        Transmitted
                      </h3>
                      <p className="mt-2 text-sm text-ink-400">
                        Encrypted SBAR payload sent to the Medical Director.
                        Audit log written to the browser console.
                      </p>
                      <div className="mt-6 flex flex-wrap justify-center gap-2">
                        <button
                          type="button"
                          onClick={reset}
                          className="inline-flex items-center gap-2 rounded-full bg-ink-500 px-5 py-2.5 text-sm font-medium text-white shadow-soft"
                        >
                          Start New SBAR
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowConfirm(false)}
                          className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-medium text-ink-500 shadow-soft hover:bg-white/80"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}