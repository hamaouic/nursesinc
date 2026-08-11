# Booking live mode — SendGrid

The `/services` booking system has two delivery modes:

## Mode `mock` (default)

- Submitting a booking surfaces a success card inside the modal
- Both Stage-1 emails land in the in-memory inbox visible at
  `https://nursesinc.pages.dev/services?admin=true` (unlock with `NursesInc2026`)
- Nothing is delivered to a real inbox
- Safe for staging, demos, and offline development

## Mode `live`

Set `VITE_BOOKING_MODE=live` to switch on real SendGrid delivery.
Three secrets are required:

| Secret                | Purpose                                                    |
| --------------------- | ---------------------------------------------------------- |
| `SENDGRID_API_KEY`    | Bearer token from SendGrid                                 |
| `SENDGRID_FROM_EMAIL` | Verified sender (must be authenticated in SendGrid)        |
| `SENDGRID_NURSE_EMAIL`| Optional override; defaults to `cathamaoui@hotmail.com`    |

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
