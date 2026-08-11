import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  Mail,
  Receipt,
  Lock,
  Eye,
  EyeOff,
  ChevronDown,
  AlertTriangle,
  Inbox,
  Sparkles,
} from 'lucide-react';
import {
  bookingStore,
  sendStage3Confirmation,
  buildDeclineEmail,
  formatCAD,
  computeTotals,
  type BookingRequest,
  type EmailMessage,
} from '@/booking-store';
import { cn } from '@/lib/utils';

/**
 * Admin / Nurse Review Dashboard
 * Visibility: ONLY when ?admin=true is in the URL search params.
 *              Password gate (NursesInc2026) inside the panel as a second factor.
 *
 * Lets the nurse:
 *  - See all booking requests (pending / confirmed / declined)
 *  - Click [Confirm Booking] → fires Stage 3 NB invoice email + sets status confirmed
 *  - Click [Decline Request] → fires decline email with optional reason
 *  - View the full mock email inbox
 */
export default function AdminDashboard() {
  const [enabled, setEnabled] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwErr, setPwErr] = useState<string | null>(null);
  const [showPw, setShowPw] = useState(false);

  // Detect ?admin=true (also support legacy ?admin=1)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const p = new URLSearchParams(window.location.search);
    const a = p.get('admin');
    if (a === 'true' || a === '1') setEnabled(true);
  }, []);

  // Subscribe to store
  const requests = useSyncExternalStore(
    (l) => bookingStore.subscribeInbox(l),
    () => bookingStore.requests,
    () => bookingStore.requests,
  );
  const emails = useSyncExternalStore(
    (l) => bookingStore.subscribeInbox(l),
    () => bookingStore.emails,
    () => bookingStore.emails,
  );

  const pending = useMemo(
    () => requests.filter((r) => r.status === 'pending'),
    [requests],
  );
  const decided = useMemo(
    () => requests.filter((r) => r.status !== 'pending'),
    [requests],
  );

  if (!enabled) return null;

  const tryUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === 'NursesInc2026') {
      setAuthed(true);
      setPwErr(null);
    } else {
      setPwErr('That password is incorrect. Try again.');
    }
  };

  return (
    <section
      className="relative mx-auto mt-12 w-full max-w-6xl px-6"
      aria-label="Admin nurse review dashboard"
    >
      <div className="overflow-hidden rounded-3xl border border-ink-700/30 bg-gradient-to-br from-ink-700 via-ink-500 to-ink-700 p-1 shadow-glow">
        <div className="rounded-[22px] bg-ink-700/40 p-6 backdrop-blur sm:p-8">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-mint-300/40 bg-mint-300/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-mint-300">
              <Lock className="h-3 w-3" />
              Admin · Nurse review
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-blush-300/40 bg-blush-300/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-blush-200">
              <AlertTriangle className="h-3 w-3" />
              Internal use only
            </span>
            {authed && (
              <span className="ml-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white">
                <Sparkles className="h-3 w-3 text-mint-300" />
                {requests.length} request{requests.length === 1 ? '' : 's'} on file
              </span>
            )}
          </div>

          {!authed ? (
            <form
              onSubmit={tryUnlock}
              className="mx-auto max-w-md rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur"
            >
              <h2 className="font-display text-xl font-semibold text-white">
                Nurse sign-in
              </h2>
              <p className="mt-1 text-sm text-white/70">
                This dashboard is gated by <code className="rounded bg-white/10 px-1.5 py-0.5 text-[12px]">?admin=true</code>{' '}
                plus a passphrase. Hidden from public visitors.
              </p>
              <label className="mt-5 block">
                <span className="block text-[11px] font-semibold uppercase tracking-widest text-white/60">
                  Passphrase
                </span>
                <div className="relative mt-2">
                  <input
                    type={showPw ? 'text' : 'password'}
                    autoFocus
                    value={pw}
                    onChange={(e) => {
                      setPw(e.target.value);
                      setPwErr(null);
                    }}
                    className="w-full rounded-2xl border border-white/15 bg-white/10 px-3 py-2 pr-10 text-sm text-white placeholder:text-white/40 focus:border-mint-300/60 focus:outline-none focus:ring-2 focus:ring-mint-300/30"
                    placeholder="Enter the nurse passphrase"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 grid h-7 w-7 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                  >
                    {showPw ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </label>
              {pwErr && (
                <p className="mt-2 flex items-center gap-2 text-xs text-blush-300">
                  <AlertTriangle className="h-3 w-3" />
                  {pwErr}
                </p>
              )}
              <button
                type="submit"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-mint-400 px-4 py-2.5 text-sm font-semibold text-ink-700 shadow-soft transition hover:bg-mint-300"
              >
                Unlock dashboard
              </button>
              <p className="mt-3 text-[10px] uppercase tracking-widest text-white/40">
                Demo passphrase · NursesInc2026
              </p>
            </form>
          ) : (
            <AuthorizedDashboard
              pending={pending}
              decided={decided}
              emails={emails}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function AuthorizedDashboard({
  pending,
  decided,
  emails,
}: {
  pending: BookingRequest[];
  decided: BookingRequest[];
  emails: EmailMessage[];
}) {
  const [tab, setTab] = useState<'requests' | 'inbox'>('requests');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [declineFor, setDeclineFor] = useState<BookingRequest | null>(null);
  const [declineReason, setDeclineReason] = useState('');

  const confirm = (req: BookingRequest) => {
    sendStage3Confirmation(req);
  };
  const decline = (req: BookingRequest) => {
    bookingStore.setStatus(req.id, 'declined');
    bookingStore.recordEmail(
      buildDeclineEmail(req, declineReason.trim() || 'Schedule conflict on the requested date.'),
    );
    setDeclineFor(null);
    setDeclineReason('');
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <TabBtn active={tab === 'requests'} onClick={() => setTab('requests')}>
          Requests · {pending.length}
        </TabBtn>
        <TabBtn active={tab === 'inbox'} onClick={() => setTab('inbox')}>
          Mock inbox · {emails.length}
        </TabBtn>
      </div>

      {tab === 'requests' && (
        <div className="space-y-3">
          {pending.length === 0 && decided.length === 0 && (
            <EmptyState
              title="No booking requests yet"
              body="As soon as a client submits from the public Services page, they will land here for your review."
            />
          )}
          {pending.length === 0 && decided.length > 0 && (
            <EmptyState
              title="No pending requests"
              body={`You have ${decided.length} completed decision${decided.length === 1 ? '' : 's'} below.`}
            />
          )}
          {pending.map((r) => (
            <RequestCard
              key={r.id}
              req={r}
              expanded={expanded === r.id}
              onToggle={() => setExpanded(expanded === r.id ? null : r.id)}
              onConfirm={() => confirm(r)}
              onDecline={() => setDeclineFor(r)}
            />
          ))}
          {decided.length > 0 && (
            <div className="pt-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                History
              </p>
              <div className="mt-2 space-y-3">
                {decided.map((r) => (
                  <RequestCard
                    key={r.id}
                    req={r}
                    expanded={expanded === r.id}
                    onToggle={() => setExpanded(expanded === r.id ? null : r.id)}
                    onConfirm={() => confirm(r)}
                    onDecline={() => setDeclineFor(r)}
                    decided
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'inbox' && (
        <div className="space-y-3">
          {emails.length === 0 ? (
            <EmptyState
              title="Inbox is empty"
              body="Booking confirmations and client acknowledgements appear here for transparency."
            />
          ) : (
            emails.map((em) => <InboxRow key={em.id} msg={em} />)
          )}
        </div>
      )}

      {/* Decline modal */}
      <AnimatePresence>
        {declineFor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-700/50 p-3 backdrop-blur"
            onClick={() => setDeclineFor(null)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="w-full max-w-md rounded-3xl border border-white/70 bg-white p-6 shadow-glow"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-lg font-semibold text-ink-700">
                Decline request {declineFor.id}?
              </h3>
              <p className="mt-1 text-sm text-ink-500">
                A short, professional reason will be included in the email to
                {' '}<strong>{declineFor.client.email}</strong>.
              </p>
              <textarea
                rows={3}
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                placeholder="Reason (optional)"
                className="mt-3 w-full rounded-2xl border border-ink-100 bg-white px-3 py-2 text-sm text-ink-700 focus:border-ink-300 focus:outline-none focus:ring-2 focus:ring-ink-200"
              />
              <div className="mt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDeclineFor(null)}
                  className="rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-semibold text-ink-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => decline(declineFor)}
                  className="inline-flex items-center gap-2 rounded-full bg-blush-500 px-4 py-2 text-sm font-semibold text-white"
                >
                  <XCircle className="h-4 w-4" />
                  Send decline
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TabBtn({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-4 py-1.5 text-sm font-semibold transition',
        active
          ? 'border-mint-300 bg-mint-300/15 text-mint-300'
          : 'border-white/15 bg-white/5 text-white/60 hover:text-white',
      )}
    >
      {children}
    </button>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
      <Inbox className="mx-auto h-6 w-6 text-white/40" />
      <p className="mt-2 font-display text-base font-semibold text-white">
        {title}
      </p>
      <p className="mt-1 text-sm text-white/60">{body}</p>
    </div>
  );
}

function RequestCard({
  req,
  expanded,
  onToggle,
  onConfirm,
  onDecline,
  decided,
}: {
  req: BookingRequest;
  expanded: boolean;
  onToggle: () => void;
  onConfirm: () => void;
  onDecline: () => void;
  decided?: boolean;
}) {
  const totals = computeTotals(req.services);
  const isPending = req.status === 'pending';
  const statusColors: Record<typeof req.status, string> = {
    pending: 'border-amber-300/40 bg-amber-300/10 text-amber-200',
    confirmed: 'border-mint-300/40 bg-mint-300/10 text-mint-200',
    declined: 'border-blush-300/40 bg-blush-300/10 text-blush-200',
  };
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
              {req.id}
            </span>
            <span
              className={cn(
                'rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest',
                statusColors[req.status],
              )}
            >
              {req.status}
            </span>
            <span className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/60">
              {req.client.classification === 'family' ? 'Family Care' : 'Facility Care'}
            </span>
          </div>
          <p className="mt-1 truncate text-sm font-semibold text-white">
            {req.client.name} · {req.client.email}
          </p>
          <p className="text-[12px] text-white/60">
            {req.services.length} service{req.services.length === 1 ? '' : 's'}
            {' · '}
            {formatCAD(totals.subtotal)} + HST
          </p>
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-white/60 transition-transform',
            expanded && 'rotate-180',
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 px-4 py-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <KV label="Phone" value={req.client.phone} />
                <KV
                  label="Requested"
                  value={new Date(req.requestedDate).toLocaleString('en-CA', {
                    dateStyle: 'long',
                    timeStyle: 'short',
                  })}
                />
                <KV label="Notes" value={req.client.message || '—'} wide />
              </div>

              <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
                <table className="w-full text-[12px] text-white/80">
                  <thead className="bg-white/5 text-white/50">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold uppercase tracking-widest">Service</th>
                      <th className="px-3 py-2 text-right font-semibold uppercase tracking-widest">Rate</th>
                      <th className="px-3 py-2 text-right font-semibold uppercase tracking-widest">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {req.services.map((s) => (
                      <tr key={s.id} className="border-t border-white/5">
                        <td className="px-3 py-2">{s.title}</td>
                        <td className="px-3 py-2 text-right">{s.rate}</td>
                        <td className="px-3 py-2 text-right">{s.unit}</td>
                      </tr>
                    ))}
                    <tr className="border-t border-white/10 bg-white/5">
                      <td className="px-3 py-2 font-semibold" colSpan={2}>Subtotal</td>
                      <td className="px-3 py-2 text-right font-semibold">{formatCAD(totals.subtotal)}</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold" colSpan={2}>HST (15%)</td>
                      <td className="px-3 py-2 text-right">{formatCAD(totals.hst)}</td>
                    </tr>
                    <tr className="bg-white/10">
                      <td className="px-3 py-2 font-semibold" colSpan={2}>Total (CAD)</td>
                      <td className="px-3 py-2 text-right font-semibold">{formatCAD(totals.total)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {!decided && isPending && (
                <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={onDecline}
                    className="inline-flex items-center gap-2 rounded-full border border-blush-300/40 bg-blush-300/10 px-4 py-2 text-sm font-semibold text-blush-200 transition hover:bg-blush-300/20"
                  >
                    <XCircle className="h-4 w-4" />
                    Decline request
                  </button>
                  <button
                    type="button"
                    onClick={onConfirm}
                    className="inline-flex items-center gap-2 rounded-full bg-mint-400 px-4 py-2 text-sm font-semibold text-ink-700 shadow-soft transition hover:bg-mint-300"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Confirm booking
                  </button>
                </div>
              )}
              {!isPending && (
                <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/60">
                  {req.status === 'confirmed' ? (
                    <>
                      <CheckCircle2 className="h-3 w-3 text-mint-300" />
                      NB invoice email sent
                    </>
                  ) : (
                    <>
                      <XCircle className="h-3 w-3 text-blush-300" />
                      Decline email sent
                    </>
                  )}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

function KV({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={cn('rounded-xl border border-white/10 bg-white/5 p-3', wide && 'sm:col-span-2')}>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
        {label}
      </p>
      <p className="mt-1 text-[13px] text-white">{value}</p>
    </div>
  );
}

function InboxRow({ msg }: { msg: EmailMessage }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/60">
            <span className="inline-flex items-center gap-1 text-mint-300">
              <Mail className="h-3 w-3" />
              {msg.kind.replace(/-/g, ' ')}
            </span>
            <span>to {msg.to}</span>
            <span>· {new Date(msg.sentAt).toLocaleString('en-CA')}</span>
          </div>
          <p className="mt-1 truncate text-sm font-semibold text-white">
            {msg.subject}
          </p>
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-white/60 transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="max-h-[60vh] overflow-auto border-t border-white/10 bg-white/[0.04] p-4 text-[12.5px]">
              <pre className="whitespace-pre-wrap break-words font-sans text-white/85">
                {msg.body}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
