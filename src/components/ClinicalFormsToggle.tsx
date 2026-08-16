import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FileText,
  Heart,
  Pill,
  FlaskConical,
  Layers,
  Stethoscope,
  Activity,
  Droplets,
} from 'lucide-react';
import FormsCanvas from '@/components/FormsCanvas';
import ClinicalReferenceList from '@/components/ClinicalReferenceList';
import OrgansList from '@/components/OrgansList';
import VitalsList from '@/components/VitalsList';
import DiabetesList from '@/components/DiabetesList';
import ResourceTiles from '@/components/ResourceTiles';
import { cn } from '@/lib/utils';

type View =
  | 'forms'
  | 'drug-cards'
  | 'common-illness'
  | 'wound-care'
  | 'labs'
  | 'vitals'
  | 'diabetes'
  | 'organs';

const views: { id: View; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'forms', label: 'Printable Forms', icon: FileText },
  { id: 'drug-cards', label: 'Drug Cards', icon: Pill },
  { id: 'common-illness', label: 'Common Illness', icon: Stethoscope },
  { id: 'wound-care', label: 'Wound Care', icon: Layers },
  { id: 'labs', label: 'Labs', icon: FlaskConical },
  { id: 'vitals', label: 'Vitals', icon: Activity },
  { id: 'diabetes', label: 'Diabetes', icon: Droplets },
  { id: 'organs', label: 'Organs', icon: Heart },
];

export default function ClinicalFormsToggle() {
  const [view, setView] = useState<View>('forms');

  return (
    <div>
      {/* Segmented toggle — one row of large pills */}
      <div className="mb-6 flex items-center justify-center">
        <div
          role="tablist"
          aria-label="Toggle between printable forms, interactive tools, drug cards, wound care, labs, and organs"
          className="inline-flex max-w-full flex-wrap items-center gap-1 rounded-full border border-white/70 bg-white/70 p-1 shadow-soft backdrop-blur"
        >
          {views.map((v) => {
            const isActive = view === v.id;
            const Icon = v.icon;
            return (
              <button
                key={v.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setView(v.id)}
                className={cn(
                  'relative inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors',
                  isActive
                    ? 'text-white'
                    : 'text-ink-500 hover:text-ink-700',
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="clinical-toggle-pill"
                    className="absolute inset-0 rounded-full bg-ink-700 shadow-soft"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative inline-flex items-center gap-1.5">
                  <Icon
                    className={cn(
                      'h-3.5 w-3.5',
                      isActive ? 'text-white' : 'text-ink-300',
                    )}
                    aria-hidden="true"
                  />
                  <span>{v.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Toggled content */}
      <AnimatePresence mode="wait">
        {view === 'forms' && (
          <motion.div
            key="forms"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <FormsCanvas category="clinical" searchPlaceholder="Search 18 printable forms by name or keyword…" />
            <ResourceTiles />
          </motion.div>
        )}

        {view === 'drug-cards' && (
          <motion.div
            key="drug-cards"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <ClinicalReferenceList initialTab="drugs" mode="drugs" />
          </motion.div>
        )}

        {view === 'common-illness' && (
          <motion.div
            key="common-illness"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <ClinicalReferenceList initialTab="drugs" mode="illnesses" />
          </motion.div>
        )}

        {view === 'wound-care' && (
          <motion.div
            key="wound-care"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <ClinicalReferenceList initialTab="wound-care" />
          </motion.div>
        )}

        {view === 'labs' && (
          <motion.div
            key="labs"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <ClinicalReferenceList initialTab="labs" />
          </motion.div>
        )}

        {view === 'vitals' && (
          <motion.div
            key="vitals"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <VitalsList />
          </motion.div>
        )}

        {view === 'diabetes' && (
          <motion.div
            key="diabetes"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <DiabetesList />
          </motion.div>
        )}

        {view === 'organs' && (
          <motion.div
            key="organs"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <OrgansList />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
