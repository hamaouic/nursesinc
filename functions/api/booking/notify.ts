/**
 * Nurses Inc. — Booking notification route
 *
 * POST /api/booking/notify   (Cloudflare Pages Function)
 *
 * Sends two transactional emails via Resend:
 *   1. Internal nurse notification → cathamaoui@hotmail.com
 *   2. Branded client acknowledgement → the address the client submitted
 *
 * Configure as Cloudflare Pages secrets (Settings → Environment variables,
 * mark Encrypt):
 *   RESEND_API_KEY      — API key from https://resend.com/api-keys
 *   RESEND_FROM_EMAIL   — Verified sender (e.g. noreply@nursesinc.com),
 *                          domain must be verified in Resend
 *   RESEND_NURSE_EMAIL  — Optional override; defaults to cathamaoui@hotmail.com
 *
 * Why Resend? SendGrid trial expired 2026-01-19; Resend free tier is 100
 * emails/day, no DNS setup needed for personal-email senders.
 */

interface BookingRequestPayload {
  id: string;
  createdAt: string;
  client: {
    name: string;
    email: string;
    phone: string;
    classification: 'family' | 'facility';
    message: string;
  };
  services: Array<{
    id: string;
    title: string;
    rate: string;
    unit: string;
  }>;
  requestedDate: string;
}

interface ResendEnv {
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  RESEND_NURSE_EMAIL?: string;
}

const corsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'POST, OPTIONS',
  'access-control-allow-headers': 'content-type',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...corsHeaders },
  });
}

function fmtDateTime(iso: string): string {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function escape(s: string) {
  return s.replace(/[<>&]/g, (c) =>
    c === '<' ? '&lt;' : c === '>' ? '&gt;' : '&amp;',
  );
}

function buildNurseEmail(req: BookingRequestPayload) {
  const c = req.client;
  const manageLink = `https://nursesinc.pages.dev/services?admin=true&request=${req.id}`;
  const subject = `[Nurses Inc. Booking Request] - New Consultation from ${c.name || 'Client'}`;
  const services = req.services
    .map((s) => `• ${s.title} — ${s.rate} ${s.unit}`)
    .join('\n');
  const text = [
    'New booking received.',
    '',
    '--- REQUEST ---',
    `ID: ${req.id}`,
    `Received: ${fmtDateTime(req.createdAt)}`,
    `Requested date: ${fmtDateTime(req.requestedDate)}`,
    '',
    '--- CLIENT ---',
    `Name: ${c.name}`,
    `Email: ${c.email}`,
    `Phone: ${c.phone}`,
    `Classification: ${c.classification === 'family' ? 'Family Care (B2C)' : 'Facility Care (B2B)'}`,
    '',
    '--- SERVICES ---',
    services,
    '',
    '--- MESSAGE ---',
    c.message || '(no message)',
    '',
    '[Click to Review & Manage Request]',
    manageLink,
  ].join('\n');
  const html = `<pre style="font-family:-apple-system,Helvetica,Arial,sans-serif;white-space:pre-wrap;line-height:1.55;">${escape(text)}</pre>`;
  return { subject, text, html };
}

function buildClientAckEmail(req: BookingRequestPayload) {
  const c = req.client;
  const subject = 'Your Care Request with Nurses Inc. has been received!';
  const services = req.services
    .map((s) => `• ${s.title} — ${s.rate} ${s.unit}`)
    .join('\n');
  const text = [
    `Hi ${c.name.split(' ')[0] || 'there'},`,
    '',
    'Thank you for choosing Nurses Inc. Your care request has been received and is now in front of our nursing lead and medical director for review.',
    '',
    'REQUEST SUMMARY',
    `Reference: ${req.id}`,
    `Requested date: ${fmtDateTime(req.requestedDate)}`,
    'Services:',
    services,
    '',
    'WHAT HAPPENS NEXT',
    'No payment is required online. We will review availability and confirm your booking via a formal email invoice shortly.',
    '',
    'If anything urgent comes up, reply to this email or call the number listed on our Contact page.',
    '',
    'With care,',
    'Catherine Hamaoui, LPN',
    'Nurses Inc. — Independent collaborative nursing practice in New Brunswick, Canada.',
  ].join('\n');
  const html = `<div style="font-family:-apple-system,Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;color:#2C3E50;">
  <div style="background:linear-gradient(135deg,#FFD1DC 0%,#E8F5E9 100%);padding:24px;border-radius:18px 18px 0 0;">
    <p style="margin:0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#2C3E50;">Nurses Inc.</p>
    <h1 style="margin:8px 0 0;font-size:22px;font-weight:600;">Your care request was received</h1>
  </div>
  <div style="background:#FFFEF C;padding:24px;border:1px solid #EEE;border-top:none;">
    <pre style="font-family:inherit;white-space:pre-wrap;line-height:1.55;margin:0;">${escape(text)}</pre>
  </div>
  <div style="padding:16px 24px;background:#2C3E50;color:#E8F5E9;font-size:11px;border-radius:0 0 18px 18px;">
    <p style="margin:0;">PHIPAA-aligned. New Brunswick Personal Health Information Privacy and Access Act.</p>
  </div>
</div>`;
  return { subject, text, html };
}

async function sendViaResend(
  to: string,
  subject: string,
  text: string,
  html: string,
  env: ResendEnv,
) {
  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) {
    return { ok: false, status: 503, body: 'Resend not configured' };
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: `Nurses Inc. <${env.RESEND_FROM_EMAIL}>`,
      to: [to],
      reply_to: env.RESEND_FROM_EMAIL,
      subject,
      text,
      html,
    }),
  });
  if (!res.ok) {
    return { ok: false, status: res.status, body: await res.text() };
  }
  return { ok: true, status: res.status };
}

export async function onRequestPost(
  { request, env }: { request: Request; env: ResendEnv },
): Promise<Response> {
  let payload: BookingRequestPayload;
  try {
    payload = (await request.json()) as BookingRequestPayload;
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }
  if (!payload?.client?.email || !Array.isArray(payload.services)) {
    return json({ error: 'Missing required fields' }, 400);
  }

  const nurseEmail = env.RESEND_NURSE_EMAIL || 'cathamaoui@hotmail.com';
  const nurse = buildNurseEmail(payload);
  const ack = buildClientAckEmail(payload);

  const [nurseRes, ackRes] = await Promise.all([
    sendViaResend(nurseEmail, nurse.subject, nurse.text, nurse.html, env),
    sendViaResend(payload.client.email, ack.subject, ack.text, ack.html, env),
  ]);

  return json({
    ok: nurseRes.ok && ackRes.ok,
    nurse: nurseRes,
    client: ackRes,
    mode: 'live-resend',
    note: !env.RESEND_FROM_EMAIL
      ? 'RESEND_FROM_EMAIL not configured; Resend will reject until set'
      : undefined,
  });
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, { status: 204, headers: corsHeaders });
}
