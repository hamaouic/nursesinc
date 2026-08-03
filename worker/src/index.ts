// =============================================================================
// Nurses Inc. — Auto-Reply Worker
// -----------------------------------------------------------------------------
// Triggered by the contact form after a successful Web3Forms submission.
// Builds a branded thank-you email (blush + mint + ink palette) and sends it
// to the visitor via the Resend API.
//
// Required secrets (set via `wrangler secret put ...`):
//   RESEND_API_KEY        — re_xxx from resend.com/api-keys
//
// Required vars (already in wrangler.toml):
//   SENDER_EMAIL          — must be a verified Resend domain
//   SENDER_REPLY_TO       — where replies should land (cathamaoui@hotmail.com)
//   ALLOWED_ORIGIN        — origin allowed to call this Worker (CORS)
// =============================================================================

interface Env {
  RESEND_API_KEY: string;
  SENDER_EMAIL: string;
  SENDER_REPLY_TO: string;
  ALLOWED_ORIGIN: string;
  NOTIFY_FALLBACK_EMAIL?: string;
}

interface AutoReplyRequest {
  name: string;        // visitor's full name, e.g. "Catherine Hamaoui"
  email: string;       // visitor's email
  category?: string;   // "Family Care" | "Facility Contracting"
  message?: string;    // visitor's note (optional, included if provided)
}

const RESEND_URL = 'https://api.resend.com/emails';

// ---------- Brand colors (mirror src/index.css :root variables) ----------
const COLORS = {
  blush: '#FFD1DC',
  blushLight: '#FFE5EC',
  mint: '#E8F5E9',
  ink: '#2C3E50',
  cream: '#FFFEFC',
  pageBg: '#FFF7FA',
};

const FIRST_NAME_FALLBACK = 'there';

// ---------- Email template ----------
function buildHtml(firstName: string, fullName: string, category: string): string {
  const greetingName = firstName || FIRST_NAME_FALLBACK;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Thank you for reaching out, ${escapeHtml(greetingName)}!</title>
</head>
<body style="margin:0;padding:0;background:${COLORS.pageBg};font-family:Inter,Arial,sans-serif;color:${COLORS.ink};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
             style="max-width:600px;background:#ffffff;border-radius:24px;overflow:hidden;
                    box-shadow:0 8px 32px rgba(44,62,80,0.08);">

        <!-- HEADER: blush gradient -->
        <tr>
          <td style="background:linear-gradient(135deg,${COLORS.blush} 0%,${COLORS.blushLight} 100%);
                     padding:40px 40px 32px 40px;text-align:center;">
            <div style="display:inline-block;background:#ffffff;border-radius:18px;
                        padding:12px 22px;margin-bottom:14px;
                        box-shadow:0 4px 14px rgba(44,62,80,0.08);">
              <span style="font-family:Georgia,serif;font-size:22px;color:${COLORS.ink};font-weight:600;letter-spacing:0.3px;">
                Nurses Inc.
              </span>
            </div>
            <div style="font-family:Georgia,serif;font-size:13px;color:${COLORS.ink};opacity:0.75;
                        letter-spacing:1.6px;text-transform:uppercase;margin-top:2px;">
              Rooted in Heart &amp; Mind
            </div>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="padding:40px;color:${COLORS.ink};font-family:Inter,Arial,sans-serif;font-size:16px;line-height:1.65;">
            <h1 style="font-family:Georgia,serif;font-size:30px;margin:0 0 18px 0;color:${COLORS.ink};font-weight:600;">
              Hi ${escapeHtml(greetingName)} 👋
            </h1>

            <p style="margin:0 0 18px 0;font-size:16.5px;">
              <strong>Thank you so much for visiting Nurses Inc. and reaching out.</strong>
            </p>

            <p style="margin:0 0 18px 0;">
              We are committed to reaching out <strong>within 24 hours, Monday–Friday</strong>.
            </p>

            <p style="margin:0 0 22px 0;">
              Your message is in our hands and we read every ${escapeHtml(category.toLowerCase() || 'inquiry')} personally.
              If it fits, we'll send a friendly Discovery Call invite — 15 minutes, free, no pressure.
            </p>

            <p style="margin:0 0 4px 0;">In the meantime, feel free to reach us directly:</p>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                   style="margin:14px 0 22px 0;background:${COLORS.mint};border-radius:14px;">
              <tr>
                <td style="padding:18px 22px;color:${COLORS.ink};font-size:15px;line-height:1.95;">
                  📞 &nbsp;<a href="tel:+16133155040"
                              style="color:${COLORS.ink};text-decoration:none;font-weight:600;">613.315.5040</a><br/>
                  ✉️ &nbsp;<a href="mailto:cathamaoui@hotmail.com"
                              style="color:${COLORS.ink};text-decoration:none;font-weight:600;">cathamaoui@hotmail.com</a><br/>
                  🌐 &nbsp;<a href="https://nursesinc.pages.dev"
                              style="color:${COLORS.ink};text-decoration:none;font-weight:600;">nursesinc.pages.dev</a>
                </td>
              </tr>
            </table>

            <p style="margin:24px 0 4px 0;">Warmly,</p>
            <p style="margin:0;font-family:Georgia,serif;font-size:19px;color:${COLORS.ink};">
              <strong>Catherine Hamaoui, LPN</strong>
            </p>
            <p style="margin:2px 0 0 0;color:${COLORS.ink};opacity:0.7;font-size:14px;">
              Founder, Nurses Inc.
            </p>
          </td>
        </tr>

        <!-- COMPLIANCE STRIP -->
        <tr>
          <td style="padding:0 40px 28px 40px;">
            <div style="border-top:1px solid rgba(44,62,80,0.08);padding-top:16px;
                        font-size:12px;color:${COLORS.ink};opacity:0.55;text-align:center;
                        letter-spacing:0.6px;">
              PHIPAA-aligned · ANBLPN Collaborative Practice Regulations
            </div>
          </td>
        </tr>

        <!-- FOOTER: mint strip -->
        <tr>
          <td style="background:${COLORS.mint};padding:18px 40px;text-align:center;
                     color:${COLORS.ink};font-size:13px;opacity:0.85;">
            Crafted with care in New Brunswick, Canada · © 2026 Nurses Inc.
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function buildText(firstName: string, category: string): string {
  const greetingName = firstName || FIRST_NAME_FALLBACK;
  return [
    `Hi ${greetingName},`,
    '',
    'Thank you so much for visiting Nurses Inc. and reaching out.',
    '',
    'We are committed to reaching out within 24 hours, Monday–Friday.',
    '',
    `Your message is in our hands and we read every ${(category || 'inquiry').toLowerCase()} personally.`,
    "If it fits, we'll send a friendly Discovery Call invite — 15 minutes, free, no pressure.",
    '',
    'In the meantime, feel free to reach us directly:',
    '  📞  613.315.5040',
    '  ✉️   cathamaoui@hotmail.com',
    '  🌐  nursesinc.pages.dev',
    '',
    'Warmly,',
    'Catherine Hamaoui, LPN',
    'Founder, Nurses Inc.',
    '',
    'PHIPAA-aligned · ANBLPN Collaborative Practice Regulations',
    'Crafted with care in New Brunswick, Canada · © 2026 Nurses Inc.',
  ].join('\n');
}

// ---------- Helpers ----------
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function firstName(fullName: string): string {
  const cleaned = (fullName || '').trim();
  if (!cleaned) return '';
  const first = cleaned.split(/\s+/)[0];
  // Strip honorifics and trailing punctuation.
  return first.replace(/[.,!]+$/, '');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function corsHeaders(origin: string, allowed: string): Record<string, string> {
  const allowOrigin =
    origin === allowed || allowed === '*' ? origin || '*' : allowed;
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function jsonResponse(
  body: unknown,
  status: number,
  extraHeaders: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
  });
}

// ---------- Handler ----------
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin') ?? '';
    const cors = corsHeaders(origin, env.ALLOWED_ORIGIN);

    // CORS preflight.
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== 'POST') {
      return jsonResponse(
        { ok: false, error: 'Method not allowed. Use POST.' },
        405,
        cors,
      );
    }

    // Parse + validate body.
    let body: AutoReplyRequest;
    try {
      body = (await request.json()) as AutoReplyRequest;
    } catch {
      return jsonResponse(
        { ok: false, error: 'Invalid JSON body.' },
        400,
        cors,
      );
    }

    const name = (body.name || '').trim();
    const email = (body.email || '').trim();
    const category = (body.category || 'inquiry').trim();

    if (!name || !email) {
      return jsonResponse(
        { ok: false, error: 'Missing name or email.' },
        400,
        cors,
      );
    }
    if (!isValidEmail(email)) {
      return jsonResponse(
        { ok: false, error: 'Invalid email format.' },
        400,
        cors,
      );
    }

    // Build the email.
    const fn = firstName(name);
    const html = buildHtml(fn, name, category);
    const text = buildText(fn, category);
    const subject = `✨ Thank you for reaching out, ${fn || 'friend'}! — Nurses Inc.`;

    // Send via Resend.
    const emailPayload = {
      from: env.SENDER_EMAIL,
      to: [email],
      reply_to: env.SENDER_REPLY_TO,
      subject,
      html,
      text,
    };

    let resendResponse: Response;
    try {
      resendResponse = await fetch(RESEND_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload),
      });
    } catch (err) {
      return jsonResponse(
        {
          ok: false,
          error: 'Failed to reach email provider.',
          detail: (err as Error).message,
        },
        502,
        cors,
      );
    }

    const resendBody = (await resendResponse.json().catch(() => ({}))) as {
      id?: string;
      message?: string;
    };

    if (!resendResponse.ok) {
      // Don't block the form — log and return a soft failure so the UI still
      // shows the success state for the Web3Forms submission.
      return jsonResponse(
        {
          ok: false,
          error: 'Email provider rejected the request.',
          provider: 'resend',
          status: resendResponse.status,
          detail: resendBody.message ?? resendBody,
        },
        502,
        cors,
      );
    }

    return jsonResponse(
      { ok: true, provider: 'resend', id: resendBody.id },
      200,
      cors,
    );
  },
};
