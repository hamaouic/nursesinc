# Booking email modes — Web3Forms (default live), Resend (advanced)

The `/services` booking system has three delivery modes:

## Mode `mock` (default)

- Submitting a booking surfaces a success card inside the modal
- Both Stage-1 emails land in the in-memory inbox visible at
  `https://nursesinc.pages.dev/services?admin=true` (unlock with `NursesInc2026`)
- Nothing is delivered to a real inbox
- Safe for staging, demos, and offline development

## Mode `web3forms` (recommended for live without a domain)

Set `VITE_BOOKING_MODE=web3forms` to deliver booking notifications via
the same Web3Forms access key used by the /contact form.

- No DNS work
- Sends to whatever inbox the access key is tied to (typically the one
  you signed up with — for this project, `cathamaoui@hotmail.com`)
- Free tier ~250 emails/month
- From address will be `Nurses Inc. Booking <forms@web3forms.com>` —
  Replies go directly to the client's submitted address (because we
  pass `replyto: client.email`)

### Setup (~2 min)

1. Sign up at <https://web3forms.com/> (free, no credit card).
2. Create an **access key** tied to `cathamaoui@hotmail.com`.
3. Cloudflare Pages → `nursesinc` → **Settings → Environment variables** →
   add (each one marked **Encrypt**):
   - `VITE_WEB3FORMS_KEY` = the access key you just created
   - `VITE_BOOKING_MODE` = `web3forms`
4. **Deployments** → three dots on latest → **Retry deployment**.

### Verify it works

1. Open `/services` and submit a test booking with your own email as
   the client address.
2. Within ~30 s, your `cathamaoui@hotmail.com` inbox should receive:
   - **Nurse summary email** with the requested services, client info,
     and a deep-link to the admin dashboard.
3. The client acknowledgement to the *other* inbox is not separately
   delivered by Web3Forms — only the nurse summary is sent (Web3Forms
   fires one email per submission). The client-facing note is still
   shown inside the modal's success card and the admin inbox tab.

## Mode `live` (advanced — requires a Resend-verified domain)

Same API path but routes through a Cloudflare Pages Function that
calls Resend. Required for full client + nurse acknowledgement emails.

Use this path **only after** you own a domain (e.g. `nursesinc.ca`)
that can be verified in Resend via SPF + DKIM DNS records.

Three secrets required in Cloudflare Pages:

| Secret                | Purpose                                                    |
| --------------------- | ---------------------------------------------------------- |
| `RESEND_API_KEY`      | API key from <https://resend.com/api-keys>                 |
| `RESEND_FROM_EMAIL`   | Verified sender (e.g. `noreply@nursesinc.com`). Domain must be verified in Resend. |
| `RESEND_NURSE_EMAIL`  | Optional override; defaults to `cathamaoui@hotmail.com`   |

## Going back to mock

Set `VITE_BOOKING_MODE=mock` and redeploy. Outbound email stops; the
admin inbox still records everything.

## Security notes

- Never paste the Web3Forms access key (or Resend API key) in chat,
  commit history, or issue trackers.
- `VITE_*` variables are inlined into the public bundle, so anyone
  viewing-source your site could see them. Web3Forms access keys are
  intentionally tied to a single destination address, so disclosure
  cannot be used to send to *other* addresses — still rotate quarterly.
- `functions/api/booking/notify.ts` is the only place Resend secrets
  live (encrypted at rest in Cloudflare).

## Configure Cloudflare Pages

1. Cloudflare dashboard → Workers & Pages → `nursesinc` → **Settings →
   Environment variables**.
2. Add each variable. **Mark each Encrypt** so they don't appear in the
   dashboard for other team members:

   | Variable                | Production                |
   | ----------------------- | ------------------------- |
   | `RESEND_API_KEY`        | *(paste here)*            |
   | `RESEND_FROM_EMAIL`     | `noreply@nursesinc.com`  |
   | `RESEND_NURSE_EMAIL`    | `cathamaoui@hotmail.com` (or omit to default) |
   | `VITE_BOOKING_MODE`     | `live`                    |

3. **Redeploy** — Deployments tab → three dots on latest deploy →
   **Retry deployment**. Cloudflare rebuilds and inlines the new vars.

## How to verify it's live

1. Open `/services` and submit a test request with your own email as the
   client address.
2. Check the inbox of `cathamaoui@hotmail.com` — you should see
   `[Nurses Inc. Booking Request] - New Consultation from …`.
3. Check your (client) inbox — you should see
   `Your Care Request with Nurses Inc. has been received!`.
4. Visit `/services?admin=true` → unlock → **Mock inbox** tab → the
   deliveries also appear there for audit.

## Going back to mock

Set `VITE_BOOKING_MODE=mock` (or remove it) and redeploy. Resend stops
being called; the admin inbox still records everything.

## Security notes

- Never paste the API key in chat, commit history, or issue trackers.
- `functions/api/booking/notify.ts` is the only place that touches the
  key. Rotate immediately if exposed.
- The Cloudflare Pages function does basic payload validation; for
  production PHIPAA traffic, consider adding HMAC signing between client
  and the function.


## One-time SendGrid setup (do NOT share these with the assistant)

1. Sign in to <https://app.sendgrid.com>
2. **Authenticate the sender.** Either:
   - **Domain authentication** (preferred): Settings → Sender Authentication
     → Authenticate Your Domain → `shiftlock.ca`. Cloudflare DNS already
     exposes a CAA record for `pki.goog`, so the SSL certs land fine.
   - **Single Sender Verification** (faster): Settings → Sender
     Authentication → Verify a Single Sender → use `admin@shiftlock.ca`.
3. **Create an API key:** Settings → API Keys → Create API Key → Restricted
   Access with `mail.send` scope only. Copy the value once — it never shows
   again.

## Configure Cloudflare Pages

1. Cloudflare dashboard → Workers & Pages → `nursesinc` → Settings →
   Environment variables
2. Add each variable. **Mark each Encrypt** so they don't appear in the
   dashboard for other team members:

   | Variable                | Production        | Preview         |
   | ----------------------- | ----------------- | --------------- |
   | `SENDGRID_API_KEY`      | `<paste here>`    | (optional)      |
   | `SENDGRID_FROM_EMAIL`   | `admin@shiftlock.ca` | as desired  |
   | `SENDGRID_NURSE_EMAIL`  | `cathamaoui@hotmail.com` (or omit to default) | … |
   | `VITE_BOOKING_MODE`     | `live`            | `mock` (default) |

3. Redeploy — Cloudflare Pages picks up env changes on the next deploy
   trigger. The build step inlines `VITE_BOOKING_MODE` into the bundle.

## How to verify it's live

1. Open `/services` and submit a test request with your own email as the
   client address.
2. Check the inbox of `cathamaoui@hotmail.com` — you should see
   `[Nurses Inc. Booking Request] - New Consultation from …`.
3. Check your (client) inbox — you should see
   `Your Care Request with Nurses Inc. has been received!`.
4. Visit `/services?admin=true` → unlock → **Mock inbox** tab → the
   deliveries also appear there for audit.

## Going back to mock

Set `VITE_BOOKING_MODE=mock` (or remove it) and redeploy. SendGrid stops
being called; the admin inbox still records everything.

## Security notes

- Never paste the API key in chat, commit history, or issue trackers.
- `functions/api/booking/notify.ts` is the only place that touches the
  key. Rotate immediately if exposed.
- The Cloudflare Pages function does basic payload validation; for
  production PHIPAA traffic, consider adding HMAC signing between client
  and the function.
