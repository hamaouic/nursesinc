# Nurses Inc. — Auto-Reply Worker

Sends a branded thank-you email back to the visitor immediately after they
submit the contact form. Sits behind a Cloudflare Worker and uses
[Resend](https://resend.com) as the email provider (free tier = 100 emails/day).

## Files

- `src/index.ts` — Worker entry point. Receives `{ name, email, category }`,
  builds the branded HTML, sends via Resend.
- `wrangler.toml` — Cloudflare config. Sets the allowed origin and sender
  address (sender MUST be on a verified Resend domain).
- `package.json` — Wrangler CLI and TypeScript types.

## First-time setup

1. **Sign up for Resend** at https://resend.com (use "Log in with GitHub").
2. **Get an API key** at https://resend.com/api-keys — click
   *Create API key*, name it `nursesinc-auto-reply`, copy the `re_xxx` value.
3. **Verify a sender domain** at https://resend.com/domains:
   - **Recommended:** `nursesinc.ca` (or any domain you own) — gives you a
     branded sender like `hello@nursesinc.ca`.
   - **Fastest:** add Resend's free `onresend.com` onboarding domain — gives
     you `onboarding@resend.dev` so you can test in 30 seconds. You can
     swap to a real domain later by editing `SENDER_EMAIL` in
     `wrangler.toml`.
4. **Authenticate Wrangler** with Cloudflare:
   ```powershell
   cd worker
   npx wrangler login
   ```
5. **Set the Resend API key as a secret** (never commit it):
   ```powershell
   npx wrangler secret put RESEND_API_KEY
   # paste your re_xxx key when prompted
   ```
6. **Deploy the Worker**:
   ```powershell
   npx wrangler deploy
   ```
   Wrangler prints the Worker URL — looks like
   `https://nursesinc-auto-reply.<account-subdomain>.workers.dev`.

7. **Wire it into the site**:
   - In Cloudflare Pages → *Settings* → *Environment variables*, add:
     `VITE_AUTO_REPLY_URL` = the Workers URL from step 6.
   - Trigger a rebuild (push an empty commit, or click *Retry deployment*
     on the latest deployment).

## Test it

Once deployed, submit the contact form on https://nursesinc.pages.dev/contact.
The visitor's email inbox will receive a branded thank-you email within a
few seconds.

To smoke-test the Worker directly with curl:

```bash
curl -X POST https://nursesinc-auto-reply.<account>.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"name":"Catherine Hamaoui","email":"you@example.com","category":"Family Care"}'
```

You should get back `{"ok":true,"provider":"resend","id":"..."}` and the
email will arrive in the inbox you specified.

## Verifying the sender domain (DNS)

When you add a real domain in Resend, it gives you a list of DNS records
(TXT for SPF, CNAME for DKIM, sometimes MX). Add those at your registrar
where the domain is hosted. Once all records show "Verified" in the
Resend dashboard, update `SENDER_EMAIL` in `wrangler.toml` and redeploy:

```toml
SENDER_EMAIL = "Nurses Inc. <hello@yourdomain.com>"
```

```powershell
npx wrangler deploy
```
