import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/nurses-inc-config';
import { cn } from '@/lib/utils';
import MouseCard from './MouseCard';

const teaserIds = [
  'discovery-call',
  'virtual-behavioral-mapping',
  'responsive-behavior-mapping',
  'cognitive-safety-audits',
];

export default function ServicesTeaser() {
  const teaser = [...services.b2c, ...services.b2b]
    .filter((s) => teaserIds.includes(s.id))
    .slice(0, 4);

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {teaser.map((s, i) => {
        const Icon =
          (Icons as unknown as Record<string, React.FC<{ className?: string }>>)[
            s.icon
          ] ?? Icons.Heart;
        return (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.6,
              delay: i * 0.08,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            <Link
              to="/services"
              className="block focus:outline-none"
              aria-label={`Learn more about ${s.title}`}
            >
              <MouseCard
                intensity={5}
                className={cn(
                  'h-full rounded-3xl border border-white/60 p-6 shadow-soft backdrop-blur transition-shadow',
                  s.accent === 'blush'
                    ? 'bg-gradient-to-br from-blush-100 to-white'
                    : 'bg-gradient-to-br from-mint-100 to-white',
                )}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={cn(
                      'grid h-12 w-12 place-items-center rounded-2xl shadow-soft',
                      s.accent === 'blush'
                        ? 'bg-white text-blush-400'
                        : 'bg-white text-mint-500',
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-ink-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <h3 className="font-display mt-5 text-lg font-semibold leading-tight text-ink-700">
                  {s.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-ink-400">
                  {s.description}
                </p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-display text-2xl font-semibold text-ink-700">
                    {s.rate}
                  </span>
                  <span className="text-xs text-ink-300">{s.unit}</span>
                </div>
              </MouseCard>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}