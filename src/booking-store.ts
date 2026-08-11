/**
 * Nurses Inc. — Booking & notification store
 *
 * Module-level singleton state used by:
 *   - BookingPanel (multi-select cart, intake modal, date picker)
 *   - AdminDashboard (gated by ?admin=true on /services)
 *   - mockEmailEngine (routes "emails" to in-memory mailbox + console)
 *
 * NOTE: This is the MOCK engine — no backend. In production, swap each
 * `mockEmailEngine.*` call for a SendGrid/Resend HTTP request.
 */

export type RequestedService = {
  id: string;
  title: string;
  rate: string;            // e.g. "$65.00" or "FREE"
  unit: string;            // e.g. "/ hour"
  accent: 'blush' | 'mint';
};

export type PatientClassification = 'family' | 'facility';

export type BookingRequest = {
  id: string;
  createdAt: string;                                 // ISO
  status: 'pending' | 'confirmed' | 'declined';
  client: {
    name: string;
    email: string;
    phone: string;
    classification: PatientClassification;
    message: string;
  };
  services: RequestedService[];
  requestedDate: string;                              // ISO date-time
};

export type EmailMessage = {
  id: string;
  to: string;
  from: string;
  subject: string;
  body: string;
  sentAt: string;
  kind: 'request-received-nurse' | 'request-ack-client' | 'invoice-client' | 'decline-client';
};

export type BookingState = {
  selected: RequestedService[];
  modalOpen: boolean;
  lastSubmittedId: string | null;
};

type Listener = () => void;

class BookingStore {
  private listeners = new Set<Listener>();
  private inboxListeners = new Set<Listener>();

  // We expose a fresh STATE SNAPSHOT every change so React's
  // useSyncExternalStore identity check picks it up.
  private snapshot: BookingState = {
    selected: [],
    modalOpen: false,
    lastSubmittedId: null,
  };

  requests: BookingRequest[] = [];
  emails: EmailMessage[] = [];

  get state(): BookingState {
    return this.snapshot;
  }

  // ---- core listeners ----
  subscribe(l: Listener) {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  }
  subscribeInbox(l: Listener) {
    this.inboxListeners.add(l);
    return () => this.inboxListeners.delete(l);
  }

  private setState(patch: Partial<BookingState>) {
    this.snapshot = { ...this.snapshot, ...patch };
    this.listeners.forEach((l) => l());
  }
  private notifyInbox() {
    this.inboxListeners.forEach((l) => l());
  }

  // ---- selection API ----
  toggle(svc: RequestedService) {
    const exists = this.snapshot.selected.find((s) => s.id === svc.id);
    const selected = exists
      ? this.snapshot.selected.filter((s) => s.id !== svc.id)
      : [...this.snapshot.selected, svc];
    this.setState({ selected });
  }

  isSelected(id: string) {
    return Boolean(this.snapshot.selected.find((s) => s.id === id));
  }

  clear() {
    this.setState({ selected: [] });
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  // ---- request API ----
  submit(req: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>): BookingRequest {
    const full: BookingRequest = {
      ...req,
      id: `BR-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    this.requests = [full, ...this.requests];
    this.setState({ lastSubmittedId: full.id });
    return full;
  }

  setStatus(id: string, status: 'confirmed' | 'declined') {
    this.requests = this.requests.map((r) =>
      r.id === id ? { ...r, status } : r,
    );
    this.notifyInbox();
  }

  // ---- email API ----
  recordEmail(msg: Omit<EmailMessage, 'id' | 'sentAt'>) {
    const full: EmailMessage = {
      ...msg,
      id: `EM-${Date.now().toString(36).toUpperCase()}-${Math.random()
        .toString(36)
        .slice(2, 6)}`,
      sentAt: new Date().toISOString(),
    };
    this.emails = [full, ...this.emails];
    this.notifyInbox();
    // eslint-disable-next-line no-console
    console.info(
      `[mockEmailEngine] → ${msg.to}\n  subject: ${msg.subject}\n  ${msg.body.slice(0, 220).replace(/\n/g, ' ')}…`,
    );
    return full;
  }
}

export const bookingStore = new BookingStore();

// ----------------------------------------------------------------------------
// Price helpers
// ----------------------------------------------------------------------------

export function parseRate(rate: string): number {
  if (!rate) return 0;
  if (/free/i.test(rate)) return 0;
  const match = rate.replace(/,/g, '').match(/-?[\d.]+/);
  return match ? Number(match[0]) : 0;
}

export function formatCAD(n: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
  }).format(n);
}

const HST_RATE = 0.15;

export type InvoiceTotals = {
  subtotal: number;
  hst: number;
  total: number;
};

export function computeTotals(services: RequestedService[]): InvoiceTotals {
  const subtotal = services.reduce((sum, s) => sum + parseRate(s.rate), 0);
  const hst = subtotal * HST_RATE;
  return { subtotal, hst, total: subtotal + hst };
}

// ----------------------------------------------------------------------------
// Email template builders
// ----------------------------------------------------------------------------

export const NURSE_NOTIFY_EMAIL = 'cathamaoui@hotmail.com';
export const BILLING_EMAIL = 'payments@nursesinc.ca';
export const FROM_ADDRESS = 'admin@shiftlock.ca';

function fmtDateTime(iso: string): string {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat('en-CA', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(d);
  } catch {
    return iso;
  }
}

function servicesList(services: RequestedService[]): string {
  return services
    .map((s) => `• ${s.title} — ${s.rate} ${s.unit.replace(/^\//, '/').trim()}`)
    .join('\n');
}

export type NurseNotifyArgs = {
  request: BookingRequest;
};
export function buildNurseNotifyEmail({ request }: NurseNotifyArgs): Omit<
  EmailMessage,
  'id' | 'sentAt'
> {
  const c = request.client;
  const manageLink = `${typeof window !== 'undefined' ? window.location.origin : 'https://nursesinc.pages.dev'}/services?admin=true&request=${request.id}`;
  const subject = `[Nurses Inc. Booking Request] - New Consultation from ${c.name || 'Client'}`;
  const body = `New booking received.

--- REQUEST ---
ID: ${request.id}
Received: ${fmtDateTime(request.createdAt)}
Requested date: ${fmtDateTime(request.requestedDate)}

--- CLIENT ---
Name: ${c.name}
Email: ${c.email}
Phone: ${c.phone}
Classification: ${c.classification === 'family' ? 'Family Care (B2C)' : 'Facility Care (B2B)'}

--- SERVICES ---
${servicesList(request.services)}

--- MESSAGE ---
${c.message || '(no message)'}

[Click to Review & Manage Request]
${manageLink}
`;
  return {
    to: NURSE_NOTIFY_EMAIL,
    from: FROM_ADDRESS,
    subject,
    body,
    kind: 'request-received-nurse',
  };
}

export function buildClientAckEmail(request: BookingRequest): Omit<
  EmailMessage,
  'id' | 'sentAt'
> {
  const c = request.client;
  const subject = `Your Care Request with Nurses Inc. has been received!`;
  const body = `Hi ${c.name.split(' ')[0] || 'there'},

Thank you for choosing Nurses Inc. Your care request has been received and is now in front of our nursing lead and medical director for review.

REQUEST SUMMARY
Reference: ${request.id}
Requested date: ${fmtDateTime(request.requestedDate)}
Services:
${servicesList(request.services)}

WHAT HAPPENS NEXT
No payment is required online. We will review availability and confirm your booking via a formal email invoice shortly.

If anything urgent comes up before then, you can reach us at ${NURSE_NOTIFY_EMAIL} or call the number listed on our Contact page.

With care,
Catherine Hamaoui, LPN
Nurses Inc. — ${billTagline()}
`;
  return {
    to: c.email,
    from: FROM_ADDRESS,
    subject,
    body,
    kind: 'request-ack-client',
  };
}

export function buildInvoiceEmail(request: BookingRequest): Omit<
  EmailMessage,
  'id' | 'sentAt'
> {
  const c = request.client;
  const totals = computeTotals(request.services);
  const html = `
<div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #2C3E50;">
  <div style="background: linear-gradient(135deg, #FFD1DC 0%, #E8F5E9 100%); padding: 32px 24px; border-radius: 18px 18px 0 0;">
    <p style="margin:0; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #2C3E50;">Nurses Inc.</p>
    <h1 style="margin: 8px 0 0; font-size: 26px; font-weight: 600;">Booking Confirmed — Invoice</h1>
    <p style="margin: 4px 0 0; font-size: 13px; color: #2C3E50;">Reference ${request.id} · ${fmtDateTime(request.createdAt)}</p>
  </div>

  <div style="background: #FFFEF C; padding: 24px; border: 1px solid #EEE; border-top: none;">
    <p style="margin: 0 0 16px; font-size: 14px;">Hi ${c.name.split(' ')[0] || 'there'},</p>
    <p style="margin: 0 0 16px; font-size: 14px;">Your booking with Nurses Inc. has been confirmed by our nursing lead. Below is the official invoice for the agreed services.</p>

    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
      <thead>
        <tr style="text-align: left; color: #6B7C8C; font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em;">
          <th style="padding: 8px 0; border-bottom: 1px solid #EEE;">Service</th>
          <th style="padding: 8px 0; border-bottom: 1px solid #EEE; text-align: right;">Rate</th>
          <th style="padding: 8px 0; border-bottom: 1px solid #EEE; text-align: right;">Unit</th>
        </tr>
      </thead>
      <tbody>
        ${request.services
          .map(
            (s) => `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #F4F4F4;">${s.title}</td>
          <td style="padding: 10px 0; text-align: right; border-bottom: 1px solid #F4F4F4;">${s.rate}</td>
          <td style="padding: 10px 0; text-align: right; border-bottom: 1px solid #F4F4F4;">${s.unit}</td>
        </tr>`,
          )
          .join('')}
      </tbody>
    </table>

    <table style="width: 100%; margin-top: 12px; font-size: 13px; color: #2C3E50;">
      <tr><td style="padding: 4px 0;">Subtotal</td><td style="padding: 4px 0; text-align: right;">${formatCAD(totals.subtotal)}</td></tr>
      <tr><td style="padding: 4px 0;">HST (15%)</td><td style="padding: 4px 0; text-align: right;">${formatCAD(totals.hst)}</td></tr>
      <tr style="font-weight: 600; font-size: 16px; border-top: 1px solid #EEE;">
        <td style="padding: 12px 0 4px;">Total Owed (CAD)</td>
        <td style="padding: 12px 0 4px; text-align: right;">${formatCAD(totals.total)}</td>
      </tr>
    </table>

    <p style="margin: 24px 0 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: #6B7C8C;">Booking details</p>
    <p style="margin: 0; font-size: 13px; line-height: 1.6;">Requested date: <strong>${fmtDateTime(request.requestedDate)}</strong><br/>Classification: <strong>${c.classification === 'family' ? 'Family Care (B2C)' : 'Facility Care (B2B)'}</strong><br/>Phone: ${c.phone}<br/>Email: ${c.email}</p>

    <div style="margin-top: 24px; padding: 16px; background: #F6FBF6; border-left: 3px solid #76D5C4; border-radius: 8px;">
      <p style="margin:0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: #2C3E50;">Payment terms</p>
      <p style="margin: 8px 0 0; font-size: 12.5px; line-height: 1.6; color: #2C3E50;">Thank you for trusting Nurses Inc. To keep your processing fees low, we do not collect credit cards online. Payment is collected securely on-site at the time of your appointment via E-Transfer to <strong>${BILLING_EMAIL}</strong> or via our portable Square chip machine.</p>
    </div>

    <p style="margin: 24px 0 4px; font-size: 13px;">With care,</p>
    <p style="margin: 0; font-size: 13px; font-weight: 600;">Catherine Hamaoui, LPN</p>
    <p style="margin: 2px 0 0; font-size: 12px; color: #6B7C8C;">Nurses Inc. — ${billTagline()}</p>
  </div>

  <div style="padding: 16px 24px; background: #2C3E50; color: #E8F5E9; font-size: 11px; border-radius: 0 0 18px 18px;">
    <p style="margin:0;">PHIPAA-aligned. New Brunswick Personal Health Information Privacy and Access Act. Independent Nursing services delivered in adherence to ANBLPN Collaborative Practice Regulations.</p>
  </div>
</div>`.trim();
  return {
    to: c.email,
    from: FROM_ADDRESS,
    subject: `Nurses Inc. — Booking Confirmed & Invoice (${request.id})`,
    body: html,
    kind: 'invoice-client',
  };
}

export function buildDeclineEmail(request: BookingRequest, reason: string): Omit<
  EmailMessage,
  'id' | 'sentAt'
> {
  const c = request.client;
  return {
    to: c.email,
    from: FROM_ADDRESS,
    subject: `Nurses Inc. — Unable to Confirm Booking (${request.id})`,
    body: `Hi ${c.name.split(' ')[0] || 'there'},

Thank you for reaching out to Nurses Inc. After reviewing your request (${request.id}) for ${fmtDateTime(request.requestedDate)}, we are unable to confirm this booking at the requested time.

${reason ? `Reason: ${reason}\n\n` : ''}We would be glad to recommend an alternative time or service. You can reply to this email or call us — we will work with you to find a path forward.

With care,
Catherine Hamaoui, LPN
Nurses Inc.
`,
    kind: 'decline-client',
  };
}

function billTagline() {
  return 'Independent collaborative nursing practice in New Brunswick, Canada.';
}

// ----------------------------------------------------------------------------
// Mode flag
// Set VITE_BOOKING_MODE=live in your env to enable real SendGrid delivery.
// Default 'mock' keeps everything in-memory + the admin inbox tab.
// ----------------------------------------------------------------------------

export const BOOKING_MODE: 'mock' | 'live' =
  (import.meta.env.VITE_BOOKING_MODE as 'mock' | 'live') || 'mock';

const NOTIFY_ENDPOINT = '/api/booking/notify';

async function dispatchToEndpoint(payload: {
  kind: 'request' | 'confirm';
  request: BookingRequest;
}): Promise<{ ok: boolean; status: number; body?: string }> {
  try {
    const res = await fetch(NOTIFY_ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ kind: payload.kind, request: payload.request }),
    });
    return { ok: res.ok, status: res.status, body: await res.text() };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      body: err instanceof Error ? err.message : String(err),
    };
  }
}

// ----------------------------------------------------------------------------
// Convenience: send the full Stage 1 pair of emails for a new request.
// ----------------------------------------------------------------------------

export async function sendStage1Emails(request: BookingRequest) {
  // Always record to the in-memory inbox so admins can audit.
  bookingStore.recordEmail(buildNurseNotifyEmail({ request }));
  bookingStore.recordEmail(buildClientAckEmail(request));

  if (BOOKING_MODE === 'live') {
    const r = await dispatchToEndpoint({ kind: 'request', request });
    // eslint-disable-next-line no-console
    console.info('[booking] live dispatch', r);
  }
}

export async function sendStage3Confirmation(request: BookingRequest) {
  bookingStore.recordEmail(buildInvoiceEmail(request));
  bookingStore.setStatus(request.id, 'confirmed');

  if (BOOKING_MODE === 'live') {
    const r = await dispatchToEndpoint({ kind: 'confirm', request });
    // eslint-disable-next-line no-console
    console.info('[booking] live confirm', r);
  }
}
