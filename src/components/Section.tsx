import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  align?: 'left' | 'center';
  eyebrowAction?: ReactNode;
};

export default function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  align = 'left',
  eyebrowAction,
}: Props) {
  return (
    <section
      id={id}
      className={cn(
        'relative mx-auto w-full max-w-6xl px-6 pt-2 pb-6 sm:pt-3 sm:pb-10',
        className,
      )}
    >
      {(eyebrow || title || description) && (
        <header
          className={cn(
            'mb-6 flex max-w-3xl flex-col gap-2.5',
            align === 'center' && 'mx-auto items-center text-center',
          )}
        >
          {(eyebrow || eyebrowAction) && (
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              {eyebrow && (
                <span className="inline-flex shrink-0 items-center gap-2 self-stretch rounded-full border border-white/60 bg-white/60 px-4 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-ink-400 shadow-soft backdrop-blur">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blush-300" />
                  {eyebrow}
                </span>
              )}
              <div className="flex-1">{eyebrowAction}</div>
            </div>
          )}
          {title && (
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink-700 sm:text-4xl md:text-5xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-base leading-relaxed text-ink-400 sm:text-lg">
              {description}
            </p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}