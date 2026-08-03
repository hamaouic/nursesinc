import { ShieldCheck } from 'lucide-react';
import { legal } from '@/nurses-inc-config';

/**
 * Persistent, understated legal badge.
 * Sits near the contact form/footer on every page as required by spec.
 */
export default function PhipeaBadge() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3 z-40 flex justify-center px-3">
      <div className="pointer-events-auto flex max-w-3xl items-start gap-3 rounded-2xl border border-white/60 bg-white/70 px-4 py-2 text-[11px] leading-relaxed text-ink-400 shadow-soft backdrop-blur-md sm:text-xs">
        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mint-100">
          <ShieldCheck className="h-3.5 w-3.5 text-ink-500" />
        </span>
        <p className="text-balance">
          <span className="font-semibold text-ink-500">PHIPAA-aligned.</span>{' '}
          {legal.phipea}
        </p>
      </div>
    </div>
  );
}