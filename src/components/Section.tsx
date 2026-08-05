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
        'relative mx-auto w-full max-w-6xl px-6 py-20 sm:py-28',
        className,
      )}
    >
      {(eyebrow || title || description) && (
        <header
          className={cn(
            'mb-10 flex max-w-3xl flex-col gap-3',
            align === 'center' && 'mx-auto items-center text-center',
          )}
        >
          {(eyebrow || eyebrowAction) && (
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              {eyebrow && (
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/60 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-ink-400 shadow-soft backdrop-blur">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blush-300" />
                  {eyebrow}
                </span>
              )}
              {eyebrowAction}
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