import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Heart, Building2, Sparkles } from 'lucide-react';
import { services, type Service } from '@/nurses-inc-config';
import { cn } from '@/lib/utils';
import MouseCard from './MouseCard';

type Tab = 'b2c' | 'b2b';

const tabs: { id: Tab; label: string; sub: string; Icon: React.FC<{ className?: string }>; accent: 'blush' | 'mint' }[] = [
  { id: 'b2c', label: 'For Families', sub: 'Direct-to-consumer care', Icon: Heart, accent: 'blush' },
  { id: 'b2b', label: 'For Care Homes', sub: 'B2B facility contracts', Icon: Building2, accent: 'mint' },
];

export default function ServicesBoard() {
  const [active, setActive] = useState<Tab>('b2c');

  return (
    <div>
      {/* Tab switcher */}
      <div
        role="tablist"
        aria-label="Service category"
        className="relative mx-auto flex max-w-xl rounded-full border border-white/60 bg-white/60 p-1.5 shadow-soft backdrop-blur"
      >
        {tabs.map((t) => {
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(t.id)}
              className={cn(
                'relative z-10 flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition-colors duration-300',
                isActive ? 'text-ink-700' : 'text-ink-400 hover:text-ink-700',
              )}
            >
              <t.Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{t.label}</span>
              <span className="sm:hidden">{t.label.split(' ')[1]}</span>
              {isActive && (
                <motion.span
                  layoutId="tab-pill"
                  className={cn(
                    'absolute inset-0 -z-10 rounded-full shadow-soft',
                    t.accent === 'blush' ? 'bg-blush-100' : 'bg-mint-100',
                  )}
                  transition={{ type: 'spring', stiffness: 280, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <p className="mx-auto mt-4 max-w-xl text-center text-sm text-ink-400">
        {tabs.find((t) => t.id === active)?.sub}
      </p>

      {/* Animated panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-10"
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services[active].map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* NB context note */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto mt-14 flex max-w-3xl items-start gap-3 rounded-2xl border border-white/60 bg-white/60 p-5 text-sm text-ink-400 shadow-soft backdrop-blur"
      >
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-blush-400" />
        <p>
          All rates are calibrated for New Brunswick independent practice
          overhead — including insurance, physician oversight, and PHIPAA-compliant
          records. Travel beyond the Greater Moncton area may incur a modest
          trip fee, agreed in advance.
        </p>
      </motion.div>
    </div>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon =
    (Icons as unknown as Record<string, React.FC<{ className?: string }>>)[
      service.icon
    ] ?? Icons.Heart;

  const accentBg =
    service.accent === 'blush'
      ? 'bg-gradient-to-br from-blush-100 to-blush-50'
      : 'bg-gradient-to-br from-mint-100 to-mint-50';
  const accentText =
    service.accent === 'blush' ? 'text-blush-400' : 'text-mint-500';
  const accentIconBg =
    service.accent === 'blush' ? 'bg-white' : 'bg-white';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className="flip-card h-[360px]"
      tabIndex={0}
      role="group"
      aria-label={service.title}
    >
      <div className="flip-card-inner h-full">
        {/* FRONT */}
        <div
          className={cn(
            'flip-card-face flex flex-col gap-4 border border-white/60 p-6 shadow-soft backdrop-blur',
            accentBg,
          )}
        >
          <MouseCard
            intensity={4}
            highlight={false}
            className="flex h-full flex-col gap-4 rounded-[inherit]"
          >
            <div className="flex items-start justify-between">
              <span
                className={cn(
                  'grid h-12 w-12 place-items-center rounded-2xl shadow-soft',
                  accentIconBg,
                  accentText,
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-ink-300">
                {service.id.split('-')[0]}
              </span>
            </div>

            <div>
              <h3 className="font-display text-lg font-semibold leading-snug text-ink-700">
                {service.title}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-widest text-ink-300">
                Hover or tap to learn more
              </p>
            </div>

            <div className="mt-auto flex items-baseline gap-1.5 rounded-2xl bg-white/70 px-4 py-3">
              <span className="font-display text-3xl font-semibold tracking-tight text-ink-700">
                {service.rate}
              </span>
              <span className="text-xs font-medium text-ink-400">
                {service.unit}
              </span>
            </div>
          </MouseCard>
        </div>

        {/* BACK */}
        <div
          className={cn(
            'flip-card-face flex flex-col gap-3 overflow-y-auto border border-white/60 p-6 shadow-glow backdrop-blur',
            service.process
              ? 'bg-white'
              : service.accent === 'blush'
                ? 'bg-ink-500'
                : 'bg-ink-700',
          )}
        >
          {service.process ? (
            <>
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-blush-100 text-blush-500">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-ink-300">
                  {service.id.split('-')[0]}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold leading-snug text-ink-700">
                {service.title}
              </h3>
              <p className="text-xs leading-relaxed text-ink-400">
                {service.description}
              </p>

              <div className="mt-2 space-y-2.5">
                {service.process.map((p, idx) => (
                  <div key={p.step} className="flex items-start gap-2.5">
                    <span className="flex shrink-0 items-center gap-1">
                      <span
                        className={cn(
                          'grid h-6 w-6 shrink-0 place-items-center rounded-full font-display text-xs font-semibold text-white shadow-soft',
                          service.accent === 'blush'
                            ? 'bg-blush-400'
                            : 'bg-mint-400',
                        )}
                      >
                        {p.step}
                      </span>
                      {idx < (service.process?.length ?? 0) - 1 && (
                        <span className="block h-0.5 w-3 bg-ink-100" />
                      )}
                    </span>
                    <div className="flex-1">
                      <p className="font-display text-sm font-semibold leading-tight text-ink-700">
                        {p.title}
                      </p>
                      <ul className="mt-0.5 space-y-0.5">
                        {p.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-1.5 text-[11px] leading-tight text-ink-400"
                          >
                            <span
                              className={cn(
                                'mt-1 inline-block h-1 w-1 shrink-0 rounded-full',
                                service.accent === 'blush'
                                  ? 'bg-blush-400'
                                  : 'bg-mint-400',
                              )}
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex items-baseline gap-1.5 rounded-xl bg-blush-50 px-3 py-2 text-ink-700">
                <span className="font-display text-xl font-semibold">
                  {service.rate}
                </span>
                <span className="text-[10px] text-ink-400">{service.unit}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-white/60">
                  {service.id.split('-')[0]}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold leading-snug text-white">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/80">
                {service.description}
              </p>
              <div className="mt-auto flex items-baseline gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-white">
                <span className="font-display text-xl font-semibold">
                  {service.rate}
                </span>
                <span className="text-[10px] text-white/70">{service.unit}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}