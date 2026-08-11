import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  Calendar,
  X,
  Loader2,
  Sparkles,
  ShieldCheck,
  Lock,
  ArrowRight,
  Receipt,
} from 'lucide-react';
import {
  bookingStore,
  formatCAD,
  computeTotals,
  sendStage1Emails,
  type RequestedService,
  type BookingRequest,
  type PatientClassification,
} from '@/booking-store';
import { cn } from '@/lib/utils';

type Props = {
  services: RequestedService[];
  eyebrow?: string;
};

/**
 * Multi-select booking panel.
 * - Renders the Selected services ribbon under the cart
 * - Sticky glassmorphic subtotal bar floats in when ≥ 1 service selected
 * - "Request Care Booking" opens the intake modal → mock Stage 1 emails
 */
export default function BookingPanel({ services, eyebrow = 'Booking' }: Props) {
  const state = useSyncExternalStore(
    (l) => bookingStore.subscribe(l),
    () => bookingStore.state,
    () => bookingStore.state,
  );

  const selected = state.selected;
  const selectedIds = useMemo(() => new Set(selected.map((s) => s.id)), [selected]);
  const totals = useMemo(() => computeTotals(selected), [selected]);

  // ------------ intake modal state ------------
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    classification: 'family' as PatientClassification,
    message: '',
    date: defaultDateString(),
    time: '10:00',
  });
  const [submitting, setSubmitting] = useState(false);
  const [ack, setAck] = useState<{ id: string; to: string } | null>(null);

  useEffect(() => {
    if (!state.modalOpen) {
      // reset state when modal closes
      setAck(null);
      setSubmitting(false);
    }
  }, [state.modalOpen]);

  const toggle = (svc: RequestedService) => bookingStore.toggle(svc);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selected.length === 0) return;
    setSubmitting(true);
    const requestedDate = new Date(`${form.date}T${form.time || '10:00'}:00`).toISOString();
    const req: BookingRequest = bookingStore.submit({
      client: {
        name: form.name.trim() || 'Anonymous Client',
        email: form.email.trim() || 'pending@no-email.local',
        phone: form.phone.trim() || '—',
        classification: form.classification,
        message: form.message.trim(),
      },
      services: selected,
      requestedDate,
    });
    sendStage1Emails(req);
    // Simulate roundtrip
    setTimeout(() => {
      setAck({ id: req.id, to: req.client.email });
      setSubmitting(false);
      bookingStore.clear();
    }, 450);
  };

  return (
    <section
      id="booking-canvas"
      className="relative mx-auto mt-12 w-full max-w-6xl px-6"
      aria-label="Multi-select service booking panel"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-6 shadow-soft backdrop-blur sm:p-8">
        {/* drifting brand blobs */}
        <span
          aria-hidden
          className="pointer-events-none absolute -left-16 -top-16 h-44 w-44 rounded-full bg-blush-200 opacity-60 blur-3xl"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-mint-200 opacity-60 blur-3xl"
        />

        <div className="relative">
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center gap-2 self-start rounded-full border border-white/60 bg-white/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-ink-400">
              <Sparkles className="h-3 w-3 text-blush-400" />
              {eyebrow}
            </span>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-700 sm:text-3xl">
              Build your care package.{' '}
              <span className="text-ink-400">Select what fits, one tap at a time.</span>
            </h2>
            <p className="max-w-2xl text-sm text-ink-500">
              Tap any service to add it to your booking. Toggle again to remove. Your selections
              live in a single intake form &mdash; no payment is collected online.
            </p>
          </div>

          {/* Multi-select chips */}
          <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc) => {
              const isOn = selectedIds.has(svc.id);
              const ringColor =
                svc.accent === 'blush'
                  ? 'ring-blush-300 border-blush-300 bg-blush-50/70'
                  : 'ring-mint-300 border-mint-300 bg-mint-50/70';
              return (
                <li key={svc.id}>
                  <button
                    type="button"
                    onClick={() => toggle(svc)}
                    aria-pressed={isOn}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-2xl border bg-white/80 p-3 text-left shadow-soft backdrop-blur transition-all',
                      'hover:-translate-y-0.5 hover:bg-white',
                      isOn
                        ? ringColor
                        : 'border-white/70 hover:border-white',
                    )}
                  >
                    <span
                      className={cn(
                        'grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors',
                        isOn
                          ? svc.accent === 'blush'
                            ? 'bg-blush-200 text-blush-500'
                            : 'bg-mint-200 text-mint-600'
                          : 'bg-ink-50 text-ink-500',
                      )}
                    >
                      {isOn ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Receipt className="h-4 w-4 opacity-70" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-semibold text-ink-700">
                        {svc.title}
                      </span>
                      <span className="block text-[11px] text-ink-400">
                        {svc.rate} {svc.unit.replace(/^[/ ]+/, '').trim()}
                      </span>
                    </span>
                    {isOn && (
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest',
                          svc.accent === 'blush'
                            ? 'bg-blush-200 text-blush-500'
                            : 'bg-mint-200 text-mint-600',
                        )}
                      >
                        Added
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Inline selected cart — replaces both the empty-state row and
              the previous fixed-bottom glass bar. Renders only when items
              are selected; collapses gracefully on empty. */}
          <AnimatePresence initial={false}>
            {selected.length > 0 ? (
              <motion.div
                key="inline-cart"
                initial={{ y: 16, opacity: 0, height: 0 }}
                animate={{ y: 0, opacity: 1, height: 'auto' }}
                exit={{ y: 16, opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                className="mt-6 overflow-hidden"
              >
                <div className="overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-white/90 via-blush-50/40 to-mint-50/40 p-5 shadow-soft backdrop-blur">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-ink-300">
                        Selected services
                      </p>
                      <p className="mt-0.5 text-[11px] text-ink-400">
                        {selected.length} service{selected.length === 1 ? '' : 's'} ·
                        {' '}review and confirm below.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => bookingStore.clear()}
                      className="rounded-full border border-ink-200 bg-white/70 px-3 py-1.5 text-[11px] font-semibold text-ink-500 transition hover:bg-white"
                    >
                      Clear all
                    </button>
                  </div>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {selected.map((s) => (
                      <li
                        key={s.id}
                        className={cn(
                          'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-semibold',
                          s.accent === 'blush'
                            ? 'border-blush-200 bg-blush-100 text-blush-500'
                            : 'border-mint-200 bg-mint-100 text-mint-600',
                        )}
                      >
                        <Check className="h-3 w-3" />
                        <span>{s.title}</span>
                        <span className="text-ink-300">·</span>
                        <span className="font-normal opacity-80">{s.rate}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-col items-stretch gap-3 border-t border-ink-100/60 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-ink-300">
                        Subtotal
                      </span>
                      <span className="font-display text-2xl font-semibold text-ink-700">
                        {formatCAD(totals.subtotal)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => bookingStore.openModal()}
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-ink-700"
                    >
                      Request Care Booking
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6 border-t border-ink-100/60 pt-4"
              >
                <p className="text-xs text-ink-400">
                  No services selected yet — tap any card above to add it.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Intake modal */}
      <AnimatePresence>
        {state.modalOpen && (
          <motion.div
            key="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex justify-center overflow-y-auto bg-ink-700/30 p-3 pt-16 backdrop-blur sm:items-start sm:pt-24 sm:p-6"
            onClick={() => bookingStore.closeModal()}
          >
            <motion.form
              key="modal-panel"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSubmit}
              className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/70 bg-white/95 shadow-glow"
              aria-label="Client intake form"
            >
              <div className="flex items-center justify-between gap-2 border-b border-ink-100/60 bg-gradient-to-r from-blush-100/60 via-white to-mint-100/60 px-6 py-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-blush-400">
                    Step 2 · Intake
                  </p>
                  <h3 className="font-display text-lg font-semibold text-ink-700">
                    Tell us how to reach you
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => bookingStore.closeModal()}
                  className="grid h-8 w-8 place-items-center rounded-full text-ink-400 transition hover:bg-ink-100 hover:text-ink-700"
                  aria-label="Close intake form"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[calc(100vh-14rem)] space-y-4 overflow-y-auto px-6 py-5 text-slate-dark text-ink-700">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="Full name"
                    required
                    value={form.name}
                    onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                    autoComplete="name"
                  />
                  <Field
                    label="Email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                    autoComplete="email"
                  />
                  <Field
                    label="Phone"
                    type="tel"
                    value={form.phone}
                    onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                    autoComplete="tel"
                  />
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-widest text-ink-400">
                      Patient classification
                    </label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {(['family', 'facility'] as const).map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() =>
                            setForm((f) => ({ ...f, classification: opt }))
                          }
                          aria-pressed={form.classification === opt}
                          className={cn(
                            'rounded-2xl border px-3 py-2 text-sm font-semibold transition',
                            form.classification === opt
                              ? opt === 'family'
                                ? 'border-blush-300 bg-blush-100 text-blush-500'
                                : 'border-mint-300 bg-mint-100 text-mint-600'
                              : 'border-white/70 bg-white/70 text-ink-400 hover:text-ink-700',
                          )}
                        >
                          {opt === 'family' ? 'Family Care' : 'Facility Care'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/70 bg-white/70 p-3">
                  <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-ink-400">
                    <Calendar className="h-3 w-3" />
                    Select your requested date &amp; time
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <input
                      type="date"
                      value={form.date}
                      min={todayISO()}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, date: e.target.value }))
                      }
                      required
                      aria-label="Requested date"
                      className="w-full rounded-xl border border-ink-100 bg-white px-3 py-2 text-sm text-ink-700 focus:border-ink-300 focus:outline-none focus:ring-2 focus:ring-ink-200"
                    />
                    <input
                      type="time"
                      value={form.time}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, time: e.target.value }))
                      }
                      required
                      aria-label="Requested time"
                      className="w-full rounded-xl border border-ink-100 bg-white px-3 py-2 text-sm text-ink-700 focus:border-ink-300 focus:outline-none focus:ring-2 focus:ring-ink-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-widest text-ink-400">
                    Anything we should know?
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    placeholder="Briefly describe the situation, immediate concerns, or context."
                    className="mt-2 w-full rounded-2xl border border-ink-100 bg-white px-3 py-2 text-sm text-ink-700 focus:border-ink-300 focus:outline-none focus:ring-2 focus:ring-ink-200"
                  />
                </div>

                {/* Review summary */}
                <div className="rounded-2xl border border-white/70 bg-mint-100/60 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-mint-600">
                    You will request
                  </p>
                  <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[12.5px] text-ink-700">
                    {selected.map((s) => (
                      <li key={s.id}>
                        <strong className="text-ink-700">{s.title}</strong>{' '}
                        <span className="text-ink-500">— {s.rate}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-[11px] text-ink-500">
                    Estimated subtotal: {formatCAD(totals.subtotal)} (NB HST 15% applied on invoice).
                  </p>
                </div>

                {ack ? (
                  <div className="rounded-2xl border border-mint-300 bg-mint-50 p-4 text-sm text-ink-700">
                    <p className="flex items-center gap-2 font-semibold text-mint-700">
                      <ShieldCheck className="h-4 w-4" />
                      Request received
                    </p>
                    <p className="mt-1 text-ink-700">
                      Reference <strong>{ack.id}</strong>. Two automated emails were sent
                      through the mock engine:
                    </p>
                    <ul className="mt-2 space-y-1.5 pl-0 text-[12.5px] text-ink-600">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-500" />
                        <span>
                          <strong>Nurse:</strong> internal summary email with your intake details
                          and a deep-link to manage this request.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-mint-500" />
                        <span>
                          <strong>You:</strong> acknowledgement to <strong>{ack.to}</strong>{' '}
                          confirming receipt and stating no payment is required online.
                        </span>
                      </li>
                    </ul>
                    <div className="mt-3 rounded-xl border border-mint-200 bg-white/70 px-3 py-2 text-[11px] text-ink-500">
                      Real production: both emails route through SendGrid from{' '}
                      <code className="rounded bg-white px-1 py-0.5">admin@shiftlock.ca</code>.
                    </div>
                    <button
                      type="button"
                      onClick={() => bookingStore.closeModal()}
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink-500 px-4 py-2 text-sm font-semibold text-white"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/70 bg-blush-50/70 p-3 text-[12px] text-ink-600">
                    <p className="font-semibold uppercase tracking-widest text-blush-500">
                      What happens after you submit
                    </p>
                    <ol className="mt-1 list-decimal space-y-0.5 pl-4">
                      <li>Automated summary email is sent to our nurse for review.</li>
                      <li>
                        Automated acknowledgement email is sent to{' '}
                        <strong>{form.email || 'your inbox'}</strong> with your reference
                        number.
                      </li>
                      <li>
                        We review availability and reply with a formal invoice within 24
                        hours, Mon–Fri.
                      </li>
                    </ol>
                  </div>
                )}
                {!ack && (
                <div className="flex items-center justify-between gap-3">
                    <p className="flex items-center gap-2 text-[11px] text-ink-400">
                      <Lock className="h-3 w-3" />
                      PHIPAA-aligned intake. No payment collected online.
                    </p>
                    <button
                      type="submit"
                      disabled={submitting || selected.length === 0}
                      className="inline-flex items-center gap-2 rounded-full bg-ink-500 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-ink-700 disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          Submit Request
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                )}
                </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-widest text-ink-400">
        {label}
      </span>
      <input
        type={type}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-2xl border border-ink-100 bg-white px-3 py-2 text-sm text-ink-700 focus:border-ink-300 focus:outline-none focus:ring-2 focus:ring-ink-200"
      />
    </label>
  );
}

function todayISO(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function defaultDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}
