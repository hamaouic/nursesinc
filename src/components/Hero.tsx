import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, HeartPulse } from 'lucide-react';
import { brand } from '@/nurses-inc-config';

/**
 * Hero with three interactive morphing shapes that react to the cursor.
 * Inspired by Three.js / Spline / Threlte interaction feel, but pure SVG+CSS
 * for max performance and zero external assets.
 */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [10, -10]), {
    stiffness: 80,
    damping: 14,
  });
  const ry = useSpring(useTransform(mx, [-1, 1], [-10, 10]), {
    stiffness: 80,
    damping: 14,
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mx.set(x);
      my.set(y);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  return (
    <section
      ref={containerRef}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 sm:pt-32"
    >
      {/* Background mesh */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-mesh-pink"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[60%] bg-gradient-to-b from-white/40 to-transparent"
      />

      {/* Floating interactive shapes */}
      <motion.div
        aria-hidden
        style={{ rotateX: rx, rotateY: ry }}
        className="pointer-events-none absolute left-[6%] top-[18%] hidden md:block"
      >
        <MorphShape
          className="h-40 w-40 text-blush-200"
          path="M44.7,-58.4C56.5,-49.6,63.1,-33.6,66.7,-17.5C70.3,-1.5,70.9,14.6,64.2,28.6C57.5,42.6,43.5,54.5,27.7,60.5C11.9,66.5,-5.7,66.6,-22.5,60.4C-39.3,54.1,-55.2,41.6,-63.4,25.1C-71.6,8.6,-72,-11.9,-64.2,-27.1C-56.4,-42.3,-40.4,-52.3,-24.3,-60.1C-8.3,-67.9,7.7,-73.5,22.4,-69.6C37.1,-65.6,32.9,-60.9,44.7,-58.4Z"
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ rotateX: useTransform(rx, (v) => -v * 0.7), rotateY: useTransform(ry, (v) => -v * 0.7) }}
        className="pointer-events-none absolute right-[5%] top-[28%] hidden md:block"
      >
        <MorphShape
          className="h-52 w-52 text-mint-200"
          path="M40.8,-55.6C53.7,-46.9,65.5,-36.1,69.7,-22.7C73.9,-9.4,70.5,6.5,63.6,20.2C56.7,33.9,46.3,45.4,33.3,53.2C20.3,61.1,4.7,65.3,-10.7,64.3C-26,63.3,-41.2,57.2,-50.6,46.2C-60.1,35.2,-63.7,19.4,-64.8,3.7C-65.9,-12,-64.5,-27.6,-56.4,-37.5C-48.3,-47.4,-33.5,-51.7,-19.6,-58.6C-5.7,-65.6,7.3,-75.2,21.4,-73.6C35.5,-72,50.7,-69.2,40.8,-55.6Z"
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ rotateX: useTransform(rx, (v) => v * 0.4), rotateY: useTransform(ry, (v) => v * 0.4) }}
        className="pointer-events-none absolute bottom-[8%] left-[12%] hidden md:block"
      >
        <MorphShape
          className="h-32 w-32 text-blush-100"
          path="M37.6,-49.5C49.3,-41.3,59.7,-31.4,64.3,-19.2C68.9,-7,67.7,7.4,62.3,20C56.9,32.6,47.2,43.4,35.2,49.5C23.2,55.5,8.9,56.8,-4.7,62.7C-18.4,68.5,-36.8,80.1,-49.5,74.4C-62.3,68.6,-69.5,45.5,-71.4,24.6C-73.3,3.7,-69.9,-15.1,-60.6,-28.4C-51.4,-41.7,-36.4,-49.4,-22.5,-55.8C-8.7,-62.2,4,-67.3,16.6,-66.4C29.3,-65.4,26,-57.7,37.6,-49.5Z"
        />
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-3 py-1.5 text-xs font-medium text-ink-500 shadow-soft backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-blush-400" />
            Independent collaborative nursing practice · New Brunswick
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.05 }}
            className="font-display mt-6 text-balance text-5xl font-semibold leading-[1.02] tracking-tight text-ink-700 sm:text-6xl lg:text-7xl"
          >
            Expert Nursing Care,{' '}
            <span className="shimmer-text">Rooted in Heart & Mind</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-400"
          >
            Aging well. Dementia. Late-life mental health. Spiritual care.
            We deliver physician-backed, fully-regulated nursing care that
            feels less like a clinic and more like a trusted friend who
            happens to know the system inside-out.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink-500 px-6 py-3.5 text-sm font-medium text-white shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="relative z-10">Book a free Discovery Call</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute inset-0 -z-0 bg-gradient-to-r from-blush-300 to-mint-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white/60 px-6 py-3.5 text-sm font-medium text-ink-500 shadow-soft backdrop-blur transition-colors hover:bg-white"
            >
              See services & pricing
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-10 grid max-w-lg grid-cols-3 gap-6 text-sm"
          >
            {[
              { v: '10+', l: 'Years bedside' },
              { v: 'PHIPAA', l: 'Aligned & audited' },
              { v: '24h', l: 'Reply guarantee' },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl font-semibold text-ink-700">
                  {s.v}
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-ink-300">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Decorative glass card with stats */}
        <div className="relative lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="glass relative overflow-hidden rounded-[2rem] p-8 shadow-glow">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blush-200 opacity-60 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-mint-200 opacity-60 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/80 text-ink-500 shadow-soft">
                    <HeartPulse className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-ink-300">
                      {brand.location}
                    </div>
                    <div className="font-display text-lg font-semibold text-ink-700">
                      Now accepting families
                    </div>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 text-sm">
                  {[
                    'Family-first, non-pharmacological care',
                    'Physician-anchored under NB LPN Act',
                    'Telehealth & in-person across NB',
                    'Care-home contract audits available',
                  ].map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2 text-ink-500"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blush-300" />
                      {line}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between rounded-2xl bg-white/60 px-4 py-3 text-xs text-ink-400">
                  <span>Avg. response within</span>
                  <span className="font-display text-base font-semibold text-ink-700">
                    24 hours
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MorphShape({
  path,
  className,
}: {
  path: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="-100 -100 200 200"
      className={`animate-blob drop-shadow-[0_20px_30px_rgba(44,62,80,0.12)] transition-transform duration-700 ease-out hover:scale-105 ${className}`}
      aria-hidden
    >
      <path fill="currentColor" d={path} />
    </svg>
  );
}