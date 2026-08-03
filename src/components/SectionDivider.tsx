import { motion } from 'framer-motion';

/**
 * Soft morphing divider that visually separates major sections.
 * Uses two drifting blobs (pink + mint) — pure CSS keyframes for performance.
 */
export default function SectionDivider({
  variant = 'pink',
}: {
  variant?: 'pink' | 'mint' | 'cream';
}) {
  const colors = {
    pink: ['bg-blush-200', 'bg-mint-200'],
    mint: ['bg-mint-200', 'bg-blush-200'],
    cream: ['bg-cream-200', 'bg-blush-100'],
  } as const;

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8 }}
      className="relative my-8 h-32 w-full overflow-hidden"
    >
      <span
        className={`blob absolute -left-12 top-1/2 h-40 w-40 -translate-y-1/2 animate-blob rounded-[42%_58%_70%_30%/45%_45%_55%_55%] ${colors[variant][0]}`}
      />
      <span
        className={`blob absolute -right-12 top-1/2 h-44 w-44 -translate-y-1/2 animate-blob rounded-[60%_40%_30%_70%/60%_30%_70%_40%] ${colors[variant][1]}`}
        style={{ animationDelay: '3s' }}
      />
    </motion.div>
  );
}