import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Heart,
  Building2,
  Send,
  Check,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Category = 'family' | 'facility';
type Status = 'idle' | 'submitting' | 'success' | 'error';

const categories: { id: Category; label: string; sub: string; Icon: React.FC<{ className?: string }>; accent: 'blush' | 'mint' }[] = [
  { id: 'family', label: 'Family Care', sub: 'Care for a loved one at home', Icon: Heart, accent: 'blush' },
  { id: 'facility', label: 'Facility Contracting', sub: 'Care home or LTC partnership', Icon: Building2, accent: 'mint' },
];

export default function ContactForm() {
  const [category, setCategory] = useState<Category>('family');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('submitting');

    // Web3Forms — free, no backend, just an HTTPS POST.
    // Access key is read from Vite env (VITE_WEB3FORMS_KEY) — set in
    // Cloudflare Pages env vars when deploying.
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

    if (!accessKey) {
      // No key configured yet — keep the form working locally and surface a
      // friendly hint so the deployment isn't blocked on having a key.
      setStatus('error');
      setErrorMessage(
        'Form is not configured yet. Set VITE_WEB3FORMS_KEY in your environment and redeploy. (Your message was NOT sent.)',
      );
      return;
    }

    try {
      const payload = {
        access_key: accessKey,
        subject: `New ${category === 'family' ? 'Family Care' : 'Facility Contracting'} inquiry — Nurses Inc.`,
        from_name: 'Nurses Inc. Website',
        name: form.name,
        email: form.email,
        phone: form.phone || 'Not provided',
        category: category === 'family' ? 'Family Care' : 'Facility Contracting',
        message: form.message,
        // Honeypot field — Web3Forms recommends this for spam protection.
        botcheck: '',
      };

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { success?: boolean; message?: string };

      if (data.success) {
        // Fire-and-forget auto-reply so the visitor gets a branded thank-you
        // email. The Worker URL is set as VITE_AUTO_REPLY_URL in
        // Cloudflare Pages env vars. If unset, we skip silently.
        const autoReplyUrl = import.meta.env.VITE_AUTO_REPLY_URL as
          | string
          | undefined;
        if (autoReplyUrl) {
          try {
            await fetch(autoReplyUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: form.name,
                email: form.email,
                category: category === 'family' ? 'Family Care' : 'Facility Contracting',
              }),
            });
          } catch {
            // Auto-reply is best-effort — never block the success UI on it.
          }
        }

        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(
          data.message ||
            'We could not send your message. Please email us directly at cathamaoui@hotmail.com.',
        );
      }
    } catch {
      setStatus('error');
      setErrorMessage(
        'Network error — please email us directly at cathamaoui@hotmail.com.',
      );
    }
  };

  const reset = () => {
    setStatus('idle');
    setErrorMessage('');
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 p-10 text-center shadow-glow backdrop-blur"
          >
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-mint-200 opacity-60 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-blush-200 opacity-60 blur-3xl" />

            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 14,
                delay: 0.1,
              }}
              className="relative mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-mint-100 to-mint-200 shadow-glow"
            >
              <motion.svg
                viewBox="0 0 52 52"
                className="h-12 w-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.path
                  d="M14 27 L23 36 L40 16"
                  fill="none"
                  stroke="#2C3E50"
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                />
              </motion.svg>
              <motion.span
                aria-hidden
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute inset-0 rounded-full border-2 border-mint-300"
              />
            </motion.div>

            <h3 className="font-display relative mt-6 text-3xl font-semibold tracking-tight text-ink-700">
              Thank you, {form.name.split(' ')[0] || 'friend'}.
            </h3>
            <p className="relative mx-auto mt-3 max-w-md text-base leading-relaxed text-ink-400">
              Your message is in. We read every inquiry personally and will
              reply within 24 hours with next steps — usually a friendly
              Discovery Call invite.
            </p>
            <div className="relative mt-8 flex justify-center gap-3">
              <button
                type="button"
                onClick={reset}
                className="rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-medium text-ink-500 shadow-soft transition-colors hover:bg-white/80"
              >
                Send another message
              </button>
              <a
                href="/services"
                className="rounded-full bg-ink-500 px-5 py-2.5 text-sm font-medium text-white shadow-soft transition-transform hover:-translate-y-0.5"
              >
                Browse services
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-glow backdrop-blur sm:p-10"
          >
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blush-100 opacity-70 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-mint-100 opacity-70 blur-3xl" />

            <div className="relative">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-ink-700">
                Tell us a little about your situation.
              </h3>
              <p className="mt-2 text-sm text-ink-400">
                All fields except phone are required. We respond within 24
                hours, Monday–Friday.
              </p>

              {/* Category selector */}
              <fieldset className="mt-6">
                <legend className="text-[11px] font-medium uppercase tracking-widest text-ink-300">
                  I am reaching out as…
                </legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {categories.map((c) => {
                    const isActive = category === c.id;
                    return (
                      <button
                        type="button"
                        key={c.id}
                        onClick={() => setCategory(c.id)}
                        aria-pressed={isActive}
                        className={cn(
                          'group flex items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-300',
                          isActive
                            ? 'border-white bg-white shadow-soft'
                            : 'border-white/60 bg-white/40 hover:bg-white/70',
                        )}
                      >
                        <span
                          className={cn(
                            'grid h-10 w-10 shrink-0 place-items-center rounded-xl shadow-soft transition-colors',
                            isActive
                              ? c.accent === 'blush'
                                ? 'bg-blush-200 text-ink-700'
                                : 'bg-mint-200 text-ink-700'
                              : 'bg-white text-ink-500',
                          )}
                        >
                          <c.Icon className="h-4 w-4" />
                        </span>
                        <span className="flex-1">
                          <span className="block font-display text-sm font-semibold text-ink-700">
                            {c.label}
                          </span>
                          <span className="block text-xs text-ink-400">
                            {c.sub}
                          </span>
                        </span>
                        <span
                          className={cn(
                            'mt-1 grid h-5 w-5 place-items-center rounded-full border transition-colors',
                            isActive
                              ? 'border-ink-500 bg-ink-500 text-white'
                              : 'border-ink-200 bg-white text-transparent',
                          )}
                        >
                          <Check className="h-3 w-3" />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field
                  label="Your name"
                  Icon={User}
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Jane Doe"
                  required
                  autoComplete="name"
                />
                <Field
                  label="Email"
                  type="email"
                  Icon={Mail}
                  value={form.email}
                  onChange={update('email')}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                />
              </div>

              <div className="mt-4">
                <Field
                  label="Phone (optional)"
                  type="tel"
                  Icon={Phone}
                  value={form.phone}
                  onChange={update('phone')}
                  placeholder="(613) 315-5040"
                  autoComplete="tel"
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="message"
                  className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-ink-300"
                >
                  <MessageSquare className="h-3 w-3" /> How can we help?
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Share a few lines about your situation, timeline, and what you'd like help with."
                  className="mt-2 w-full resize-none rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-base text-ink-700 shadow-soft outline-none transition-all duration-300 placeholder:text-ink-300 focus:border-blush-300 focus:bg-white"
                />
              </div>

              {/* Honeypot — bots fill this, real users never see it. */}
              <input
                type="text"
                name="botcheck"
                value=""
                onChange={() => {
                  /* no-op; presence alone triggers spam filter */
                }}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* Inline error banner */}
              {status === 'error' && errorMessage && (
                <div
                  role="alert"
                  className="mt-4 flex items-start gap-3 rounded-2xl border border-blush-300/60 bg-blush-100/70 px-4 py-3 text-sm text-ink-500"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blush-300 text-white">
                    !
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-ink-700">
                      We could not send your message.
                    </p>
                    <p className="mt-0.5 text-xs">{errorMessage}</p>
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-ink-300">
                  By submitting, you agree to our PHIPAA-aligned privacy
                  practices. We never share your information.
                </p>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-ink-500 px-6 py-3 text-sm font-medium text-white shadow-soft transition-transform duration-300 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
                >
                  <span className="relative z-10 inline-flex items-center gap-2">
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </span>
                  <span className="absolute inset-0 -z-0 bg-gradient-to-r from-blush-300 to-mint-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  Icon,
  value,
  onChange,
  placeholder,
  required,
  type = 'text',
  autoComplete,
}: {
  label: string;
  Icon: React.FC<{ className?: string }>;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={label}
        className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-ink-300"
      >
        <Icon className="h-3 w-3" /> {label}
      </label>
      <input
        id={label}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-base text-ink-700 shadow-soft outline-none transition-all duration-300 placeholder:text-ink-300 focus:border-blush-300 focus:bg-white"
      />
    </div>
  );
}