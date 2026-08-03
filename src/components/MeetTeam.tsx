import { motion } from 'framer-motion';
import { CheckCircle2, Stethoscope, Award } from 'lucide-react';
import { team } from '@/nurses-inc-config';
import { cn } from '@/lib/utils';

export default function MeetTeam() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {team.map((m, i) => (
        <motion.article
          key={m.role}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className={cn(
            'group relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-7 shadow-soft backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-glow',
          )}
        >
          <div
            aria-hidden
            className={cn(
              'absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl transition-opacity duration-700',
              m.accent === 'blush' ? 'bg-blush-200' : 'bg-mint-200',
            )}
          />
          <div className="relative flex items-start gap-5">
            <div
              className={cn(
                'grid h-16 w-16 shrink-0 place-items-center rounded-2xl font-display text-xl font-semibold text-ink-700 shadow-soft',
                m.accent === 'blush'
                  ? 'bg-gradient-to-br from-blush-100 to-blush-200'
                  : 'bg-gradient-to-br from-mint-100 to-mint-200',
              )}
            >
              {m.initials}
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.2em] text-ink-300">
                {m.role}
              </div>
              <h3 className="font-display mt-1 text-2xl font-semibold tracking-tight text-ink-700">
                {m.name}
              </h3>
            </div>
          </div>
          <p className="relative mt-5 text-base leading-relaxed text-ink-500">
            {m.bio}
          </p>
          <ul className="relative mt-5 space-y-2 text-sm">
            {m.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-ink-500">
                <CheckCircle2
                  className={cn(
                    'mt-0.5 h-4 w-4 shrink-0',
                    m.accent === 'blush' ? 'text-blush-400' : 'text-mint-400',
                  )}
                />
                {h}
              </li>
            ))}
          </ul>
          {m.role === 'Partner Physician' && (
            <div className="relative mt-6 inline-flex items-center gap-2 rounded-full border border-white bg-white/80 px-3 py-1.5 text-xs font-medium text-ink-500 shadow-soft">
              <Stethoscope className="h-3.5 w-3.5" />
              Physician-Backed, Fully Regulated Practice
              <Award className="h-3.5 w-3.5 text-blush-400" />
            </div>
          )}
        </motion.article>
      ))}
    </div>
  );
}