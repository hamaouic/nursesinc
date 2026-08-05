import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  HeartPulse,
  Pill,
  ShieldPlus,
  Search,
  Copy,
  Check,
  Bookmark,
  AlertTriangle,
  Sparkles,
  Info,
  Phone,
  ChevronDown,
  Layers,
  AlertOctagon,
  Stethoscope,
  Activity,
  Heart,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CategoryKey =
  | 'medications'
  | 'redFlags'
  | 'symptoms'
  | 'screening'
  | 'interventions'
  | 'nbResources';

type FilterKey = 'all' | 'cardio' | 'neuro' | 'mental' | 'diabetes';

type Medication = {
  name: string;
  examples: string;
  caregiverQuestions: string[];
};

type EntryKey =
  | 'dementia'
  | 'mentalHealth'
  | 'cardiovascular'
  | 'stroke'
  | 'diabetes';

type Entry = {
  key: EntryKey;
  label: string;
  sub: string;
  Icon: React.FC<{ className?: string }>;
  accent: 'mint' | 'blush' | 'cream';
  filter: FilterKey;
  highAlert?: boolean;
  medications: Medication[];
  highAlertFlags: string[];
  symptomsToLookFor: string[];
  screeningTools: string[];
  interventions: string[];
  nbResources: string[];
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const ENTRIES: Entry[] = [
  {
    key: 'dementia',
    label: "Dementia & Alzheimer's",
    sub: 'Cognitive decline · Medication adherence · Caregiver load',
    Icon: Brain,
    accent: 'blush',
    filter: 'neuro',
    medications: [
      {
        name: 'Cholinesterase Inhibitors',
        examples: 'Donepezil (Aricept), Galantamine, Rivastigmine',
        caregiverQuestions: [
          'Has the person refused doses recently, citing nausea or dizziness?',
          'Are there vivid dreams or nightmares that started since beginning the medication?',
          'Is there a Gravol, Benadryl, or sleep-aid in the blister pack we should flag as anticholinergic?',
          'Has the family noticed sudden worsening of confusion after starting an OTC cold or sleep product?',
        ],
      },
      {
        name: 'NMDA Receptor Antagonists',
        examples: 'Memantine (Ebixa, Namenda)',
        caregiverQuestions: [
          'Is the person taking it consistently at the same time each day?',
          'Any new constipation, dizziness on standing, or headaches?',
          'Are doses being doubled accidentally during caregiver shift changes?',
        ],
      },
    ],
    highAlertFlags: [
      'Concurrent OTC anticholinergics — Gravol (dimenhydrinate), Benadryl (diphenhydramine), Tylenol PM, Benylin — completely oppose the action of dementia medications.',
      'High risk of GI bleeding if combined with NSAIDs without gastric protection.',
      'Bradycardia risk when combined with beta-blockers — check resting pulse weekly.',
    ],
    symptomsToLookFor: [
      'Sudden worsening of confusion (rule out delirium, infection, dehydration).',
      'Unsteadiness, near-falls, or actual falls — common after dose initiation.',
      'Nausea, vomiting, or appetite loss — report persistent symptoms to MD.',
      'Vivid or disturbing dreams, especially with cholinesterase inhibitors.',
      'Sudden refusal of medication driven by paranoid delusions.',
    ],
    screeningTools: [
      'Mini-Cog® — 3-minute recall + clock draw.',
      'MoCA 7.1 (full) or MoCA 5-minute (bedside).',
      'AD8 — informant-based dementia screen.',
      'FAST staging — functional milestones.',
    ],
    interventions: [
      'Maintain consistent daily routine — same wake-time, same meal seats.',
      'Use simple one-step verbal cues; avoid open-ended questions.',
      'Engage in music, reminiscence, and pet therapy before considering PRN meds.',
      'Caregiver burnout screening every visit — recommend respite early.',
    ],
    nbResources: [
      'Alzheimer Society of New Brunswick — 1-800-593-1666.',
      'Extra-Mural Program — referral for in-home nursing support.',
      'NB Health Links — 811 for non-urgent health advice 24/7.',
    ],
  },
  {
    key: 'mentalHealth',
    label: 'Late-Life Anxiety, Insomnia & Psychosis',
    sub: 'Mood · Sleep · Antipsychotic stewardship',
    Icon: HeartPulse,
    accent: 'blush',
    filter: 'mental',
    highAlert: true,
    medications: [
      {
        name: 'Atypical Antipsychotics',
        examples: 'Risperidone (Risperdal), Quetiapine (Seroquel), Olanzapine',
        caregiverQuestions: [
          'What time of day is the dose given? Sedation is much stronger at night.',
          'Has there been any new shuffling gait, tremor, or rigidity since starting?',
          'Any new swallowing difficulty or aspiration with liquids?',
          'Has the family noticed increased confusion or a recent fall?',
        ],
      },
      {
        name: 'Benzodiazepines',
        examples: 'Lorazepam (Ativan), Oxazepam (Serax), Temazepam',
        caregiverQuestions: [
          'Is this a nightly or as-needed (PRN) medication — and how often is PRN actually given?',
          'Has there been a morning hangover effect, daytime sleepiness, or near-fall?',
          'Any new memory gaps or paradoxical agitation after a dose?',
          'Is alcohol ever combined with this medication?',
        ],
      },
    ],
    highAlertFlags: [
      '⚠ BOXED WARNING: Antipsychotics carry an increased risk of stroke and mortality in elderly patients with dementia.',
      'Benzodiazepines drastically spike fall risk and hip-fracture incidence — Beers Criteria strongly flags chronic use.',
      'Paradoxical disinhibition with benzodiazepines in older adults — agitation instead of calm.',
      'Anticholinergic burden when combined with OTC sleep aids or antihistamines.',
    ],
    symptomsToLookFor: [
      'Excessive daytime drowsiness ("hangover effect") after morning dose.',
      'Flat affect or emotional blunting.',
      'Shuffling gait, hand tremor, or rigidity — possible Extrapyramidal Symptoms (EPS).',
      'Increased wandering at night or sundowning episodes.',
      'Acute unsteadiness on standing — orthostatic drop risk.',
    ],
    screeningTools: [
      'PHQ-9 — late-life depression screen.',
      'GDS-15 (Geriatric Depression Scale) — for frail seniors.',
      'Beers Criteria® 2023 — quick reference for PIMs.',
      'STOPP/START v3 — antipsychotic and benzo flags.',
    ],
    interventions: [
      'Attempt gradual taper with prescriber — never stop benzos abruptly.',
      'Sleep-hygiene fundamentals before reaching for hypnotics.',
      'Antipsychotic stewardship — lowest effective dose, re-evaluate quarterly.',
      'Non-pharm first: CBT-I, behavioural activation, daytime light exposure.',
    ],
    nbResources: [
      'CHIMO Helpline — 1-800-667-5005 (24/7 crisis).',
      'Geriatric Psychiatry — Dr. Tremblay (Bathurst).',
      'Choosing Wisely Canada geriatric list — for shared decision-making.',
    ],
  },
  {
    key: 'cardiovascular',
    label: 'Hypertension & Cardiovascular',
    sub: 'BP management · Falls · Electrolytes',
    Icon: Heart,
    accent: 'mint',
    filter: 'cardio',
    medications: [
      {
        name: 'Beta-Blockers',
        examples: 'Metoprolol (Lopressor, Toprol), Atenolol, Bisoprolol',
        caregiverQuestions: [
          'Does the person check their pulse at home, and what does it typically run?',
          'Any new fatigue, cold hands/feet, or shortness of breath on exertion?',
          'Are doses being skipped on "feeling good" days?',
        ],
      },
      {
        name: 'ACE Inhibitors',
        examples: 'Ramipril, Lisinopril, Enalapril',
        caregiverQuestions: [
          'Any new dry, persistent cough that started after beginning the medication?',
          'Any lip, tongue, or facial swelling — emergency if sudden.',
          'Is the person also taking an NSAID (ibuprofen, naproxen)? Triple-whammy risk.',
        ],
      },
      {
        name: 'Diuretics',
        examples: 'Furosemide (Lasix), Hydrochlorothiazide, Spironolactone',
        caregiverQuestions: [
          'When in the day is the dose taken? Morning dosing avoids nighttime bathroom falls.',
          'How many bathroom trips per night since starting?',
          'Any new muscle cramps, weakness, or palpitations?',
        ],
      },
    ],
    highAlertFlags: [
      'Severe orthostatic hypotension — dangerous BP drop on standing (≥20 systolic or ≥10 diastolic).',
      'Electrolyte imbalance — hypokalemia, hyponatremia, hypomagnesemia.',
      'Triple-whammy combo: ACEi + diuretic + NSAID = acute kidney injury.',
      'Dehydration risk in hot weather or during illness — hold diuretic if vomiting/diarrhea.',
    ],
    symptomsToLookFor: [
      'Dizziness upon standing — measure lying + standing BP.',
      'Frequent bathroom trips leading to rushing and falls at night.',
      'Dry, persistent cough (ACE inhibitor side effect).',
      'Extreme fatigue, swollen ankles, or shortness of breath.',
      'Confusion driven by dehydration or electrolyte disturbance.',
    ],
    screeningTools: [
      'Lying & Standing BP — orthostatic assessment at every visit.',
      'BMP (basic metabolic panel) — potassium, sodium, creatinine.',
      'Timed Up & Go (TUG) — >12 seconds = elevated fall risk.',
    ],
    interventions: [
      'Time diuretics for morning to reduce nighttime falls.',
      'Install grab bars and bedside commode if nocturia is severe.',
      'Encourage hydration unless fluid-restricted.',
      'Hold diuretic during acute illness with vomiting/diarrhea.',
    ],
    nbResources: [
      'Home BP monitoring program — covered by Medicare.',
      'Pharmacist medication review for cardiovascular polypharmacy.',
      'Extra-Mural Program referral for in-home BP monitoring.',
    ],
  },
  {
    key: 'stroke',
    label: 'Stroke Prevention & Atrial Fibrillation',
    sub: 'Anticoagulation · Bleeding risk · Adherence',
    Icon: ShieldPlus,
    accent: 'mint',
    filter: 'cardio',
    highAlert: true,
    medications: [
      {
        name: 'Direct Oral Anticoagulants (DOACs)',
        examples: 'Apixaban (Eliquis), Rivaroxaban (Xarelto), Dabigatran (Pradaxa)',
        caregiverQuestions: [
          'Is the dose taken twice daily (Apixaban, Dabigatran) or once (Rivaroxaban)?',
          'Any doses missed in the past two weeks? Adherence is critical.',
          'Is there a pill organizer in use, and who fills it?',
          'Any new over-the-counter NSAIDs, aspirin, or supplements added?',
        ],
      },
      {
        name: 'Warfarin',
        examples: 'Coumadin (vitamin K antagonist)',
        caregiverQuestions: [
          'When is INR next checked? Has it been in range?',
          'Has the person had recent dietary changes (leafy greens, alcohol)?',
          'Any new antibiotics prescribed? Many interact with warfarin.',
          'Are bleeding precautions in place — soft toothbrush, electric razor?',
        ],
      },
    ],
    highAlertFlags: [
      'Spontaneous or severe internal bleeding — anticoagulants amplify any bleed.',
      'Duplicate dosing errors can be life-threatening — double-pill risk if pillbox is filled twice.',
      'Adding NSAIDs or aspirin without prescriber guidance — GI bleed risk.',
      'Falls on anticoagulation = automatic same-day CT if head strike.',
    ],
    symptomsToLookFor: [
      'Frequent unexplained bruising, especially on forearms.',
      'Bleeding gums when brushing teeth.',
      'Recurrent or prolonged nosebleeds.',
      'Dark, tarry, or bloody stools (potential GI bleed).',
      'Sudden severe headache — possible intracranial micro-bleed.',
    ],
    screeningTools: [
      'HAS-BLED score — bleeding risk stratification.',
      'CHA₂DS₂-VASc — stroke risk in AF.',
      'INR log review for warfarin patients.',
    ],
    interventions: [
      'Pill organizer with caregiver oversight for adherence.',
      'Bleeding precautions: soft toothbrush, electric razor, fall-proofing.',
      'Avoid IM injections and new NSAIDs without MD clearance.',
      'Educate on when to seek emergency care (head strike, black stool).',
    ],
    nbResources: [
      'Anticoagulation clinic referrals via partner MD.',
      'NB Thrombosis & Hemophilia program — 1-800-561-9977.',
      'Stroke Prevention NB — community education resources.',
    ],
  },
  {
    key: 'diabetes',
    label: 'Type 2 Diabetes',
    sub: 'Hypoglycemia · Insulin stewardship · Foot care',
    Icon: Activity,
    accent: 'mint',
    filter: 'diabetes',
    medications: [
      {
        name: 'Biguanides',
        examples: 'Metformin (Glucophage)',
        caregiverQuestions: [
          'Is the dose taken with meals to reduce GI side effects?',
          'Has kidney function been checked recently? Metformin is held when eGFR is low.',
          'Any new nausea, metallic taste, or appetite loss?',
        ],
      },
      {
        name: 'Sulfonylureas',
        examples: 'Gliclazide, Glyburide (heavily flagged on Beers)',
        caregiverQuestions: [
          'What time of day is the dose taken, and is the largest meal at that time?',
          'Have there been any episodes of shakiness, sweating, or confusion?',
          'Has the family been taught how to use glucagon or glucose gel?',
        ],
      },
      {
        name: 'Long-Acting Insulins',
        examples: 'Insulin Glargine (Lantus), Detemir (Levemir)',
        caregiverQuestions: [
          'Is the same caregiver drawing up the dose — risk of double-dosing?',
          'What time is the insulin given, and is dinner timed accordingly?',
          'Where on the body is it injected, and is rotation tracked?',
          'Is there a sharps disposal container in use?',
        ],
      },
    ],
    highAlertFlags: [
      'Severe hypoglycemia — dangerously low blood sugar can mimic dementia or stroke.',
      'Long-acting sulfonylureas (Glyburide) are heavily flagged on the Beers Criteria due to prolonged hypoglycemia.',
      'Insulin stacking — repeated correction doses without checking BG.',
      'Sick-day rules: hold metformin during dehydration, acute illness, or contrast dye studies.',
    ],
    symptomsToLookFor: [
      'Unexplained sweating, shakiness, or tremor.',
      'Sudden agitation or aggressive behavioural outbursts — often mistaken for dementia progression when it is actually low blood sugar.',
      'Dizziness, pallor, or sudden fatigue before meals.',
      'Frequent urination at night or new incontinence (possible undiagnosed hyperglycemia).',
      'Slow-healing foot wounds or unexplained neuropathy.',
    ],
    screeningTools: [
      'Capillary blood glucose log — fasting and post-prandial.',
      'HbA1c every 3–6 months (target individualized).',
      'Monofilament foot exam annually.',
      'Beers Criteria flag for any sulfonylurea.',
    ],
    interventions: [
      'Always pair sulfonylurea with food — never on an empty stomach.',
      'Keep rapid-acting glucose (juice, glucose tabs) within reach at all times.',
      'Glucagon kit at bedside for any insulin user.',
      'Daily foot inspection — patient or caregiver.',
    ],
    nbResources: [
      'Diabetes Canada — local NB chapter and education programs.',
      'NB Pharmacist — medication review and BG-meter training.',
      'Foot-care nurse referrals for neuropathy monitoring.',
    ],
  },
];

// ---------------------------------------------------------------------------
// Filter chips
// ---------------------------------------------------------------------------

const FILTERS: { key: FilterKey; label: string; Icon: React.FC<{ className?: string }> }[] = [
  { key: 'all', label: 'All', Icon: Layers },
  { key: 'cardio', label: 'Cardiovascular', Icon: Heart },
  { key: 'neuro', label: 'Neurology / Dementia', Icon: Brain },
  { key: 'mental', label: 'Mental Health', Icon: HeartPulse },
  { key: 'diabetes', label: 'Diabetes / Endocrine', Icon: Activity },
];

const CATEGORIES: Record<CategoryKey, { label: string; sub: string }> = {
  medications: { label: 'Medications', sub: 'Common classes & examples' },
  redFlags: { label: 'High-Alert Flags', sub: 'Complications & contraindications' },
  symptoms: { label: 'Symptoms & Behaviours', sub: 'What to look for during the visit' },
  screening: { label: 'Screening Tools', sub: 'Validated bedside instruments' },
  interventions: { label: 'Interventions', sub: 'Non-pharm & first-line actions' },
  nbResources: { label: 'NB Resources', sub: 'Local referrals & supports' },
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function FilterChip({
  filter,
  active,
  onClick,
}: {
  filter: (typeof FILTERS)[number];
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-semibold transition',
        active
          ? 'border-ink-500 bg-ink-500 text-white shadow-soft'
          : 'border-white/60 bg-white/70 text-ink-500 hover:bg-white',
      )}
    >
      <filter.Icon className="h-3.5 w-3.5" />
      {filter.label}
    </button>
  );
}

function CategoryChip({
  cat,
  active,
  onClick,
}: {
  cat: CategoryKey;
  active: boolean;
  onClick: () => void;
}) {
  const c = CATEGORIES[cat];
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex flex-col items-start rounded-full border px-4 py-2 text-left transition',
        active
          ? 'border-ink-500 bg-ink-500 text-white shadow-soft'
          : 'border-white/60 bg-white/70 text-ink-500 hover:bg-white',
      )}
    >
      <span className="font-display text-[11px] font-semibold uppercase tracking-widest">
        {c.label}
      </span>
      <span
        className={cn(
          'text-[10px]',
          active ? 'text-white/70' : 'text-ink-300',
        )}
      >
        {c.sub}
      </span>
    </button>
  );
}

function MedicationAccordion({
  med,
  accent,
}: {
  med: Medication;
  accent: 'mint' | 'blush' | 'cream';
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border',
        accent === 'mint' && 'border-mint-300 bg-white',
        accent === 'blush' && 'border-blush-300 bg-white',
        accent === 'cream' && 'border-cream-200 bg-white',
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-3 px-4 py-3 text-left"
      >
        <span
          className={cn(
            'mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg',
            accent === 'mint' && 'bg-mint-200 text-ink-700',
            accent === 'blush' && 'bg-blush-200 text-ink-700',
            accent === 'cream' && 'bg-cream-200 text-ink-700',
          )}
        >
          <Pill className="h-3.5 w-3.5" />
        </span>
        <div className="flex-1">
          <span className="block font-display text-sm font-semibold text-ink-700">
            {med.name}
          </span>
          <span className="block text-[11px] italic text-ink-400">
            {med.examples}
          </span>
        </div>
        <ChevronDown
          className={cn(
            'mt-1 h-4 w-4 shrink-0 text-ink-300 transition-transform duration-300',
            open && 'rotate-180 text-ink-700',
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                'border-t px-4 py-3',
                accent === 'mint' && 'border-mint-200 bg-mint-50/40',
                accent === 'blush' && 'border-blush-200 bg-blush-50/40',
                accent === 'cream' && 'border-cream-200 bg-cream-100/40',
              )}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">
                What to ask the caregiver
              </p>
              <ul className="mt-2 space-y-1.5">
                {med.caregiverQuestions.map((q, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[12px] leading-relaxed text-ink-700"
                  >
                    <span
                      className={cn(
                        'mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full',
                        accent === 'mint' && 'bg-mint-500',
                        accent === 'blush' && 'bg-blush-500',
                        accent === 'cream' && 'bg-ink-500',
                      )}
                    />
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function ClinicalReferenceMatrix() {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [activeKey, setActiveKey] = useState<EntryKey>('dementia');
  const [category, setCategory] = useState<CategoryKey>('medications');
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const filteredEntries = useMemo(() => {
    if (filter === 'all') return ENTRIES;
    return ENTRIES.filter((e) => e.filter === filter);
  }, [filter]);

  const activeEntry =
    filteredEntries.find((e) => e.key === activeKey) ?? filteredEntries[0];

  const renderBullets = (
    items: string[],
    accent: 'mint' | 'blush' | 'cream',
  ) => (
    <ul className="space-y-2.5">
      {items.map((line, i) => (
        <li
          key={i}
          className="flex items-start gap-3 text-sm leading-relaxed text-ink-700"
        >
          <span
            className={cn(
              'mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full',
              accent === 'mint' && 'bg-mint-500',
              accent === 'blush' && 'bg-blush-500',
              accent === 'cream' && 'bg-ink-500',
            )}
          />
          {line}
        </li>
      ))}
    </ul>
  );

  const renderCategoryContent = (entry: Entry) => {
    switch (category) {
      case 'medications':
        return (
          <div className="space-y-2">
            {entry.medications.map((m) => (
              <MedicationAccordion
                key={m.name}
                med={m}
                accent={entry.accent}
              />
            ))}
          </div>
        );
      case 'redFlags':
        return (
          <ul className="space-y-2.5">
            {entry.highAlertFlags.map((line, i) => {
              const isBoxed = line.startsWith('⚠');
              return (
                <li
                  key={i}
                  className={cn(
                    'flex items-start gap-3 rounded-xl border p-3 text-sm leading-relaxed',
                    isBoxed
                      ? 'border-blush-400 bg-blush-100 text-ink-700'
                      : 'border-blush-200 bg-blush-50/60 text-ink-700',
                  )}
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blush-500 text-white">
                    <AlertOctagon className="h-3 w-3" />
                  </span>
                  <span>{line.replace(/^⚠\s*BOXED WARNING:\s*/, '')}</span>
                </li>
              );
            })}
          </ul>
        );
      case 'symptoms':
        return renderBullets(entry.symptomsToLookFor, entry.accent);
      case 'screening':
        return renderBullets(entry.screeningTools, entry.accent);
      case 'interventions':
        return renderBullets(entry.interventions, entry.accent);
      case 'nbResources':
        return (
          <ul className="space-y-2.5">
            {entry.nbResources.map((line, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm leading-relaxed text-ink-700"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-mint-500" />
                {line}
              </li>
            ))}
          </ul>
        );
    }
  };

  const searchMatches = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return ENTRIES.map((entry) => {
      const allText = [
        entry.label,
        entry.sub,
        ...entry.medications.flatMap((m) => [m.name, m.examples]),
        ...entry.highAlertFlags,
        ...entry.symptomsToLookFor,
        ...entry.screeningTools,
        ...entry.interventions,
        ...entry.nbResources,
      ]
        .join(' ')
        .toLowerCase();
      return { entry, hit: allText.includes(q) };
    }).filter((m) => m.hit);
  }, [search]);

  const copyAll = async () => {
    try {
      const lines = [
        `${activeEntry.label} · ${CATEGORIES[category].label}`,
        '',
        ...(category === 'medications'
          ? activeEntry.medications.flatMap((m) => [
              `• ${m.name} (${m.examples})`,
              ...m.caregiverQuestions.map((q) => `    – ${q}`),
            ])
          : category === 'redFlags'
            ? activeEntry.highAlertFlags
            : category === 'symptoms'
              ? activeEntry.symptomsToLookFor
              : category === 'screening'
                ? activeEntry.screeningTools
                : category === 'interventions'
                  ? activeEntry.interventions
                  : activeEntry.nbResources),
      ];
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  const saveToNote = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div className="space-y-6">
      {/* ====================================================== */}
      {/* SECTION 1: Search & filter header                       */}
      {/* ====================================================== */}
      <div className="rounded-3xl border border-white/60 bg-white/70 p-4 shadow-soft backdrop-blur md:p-5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by diagnosis, medication, or symptom..."
            className="w-full rounded-full border border-white/60 bg-white py-3 pl-11 pr-4 text-sm text-ink-700 shadow-soft outline-none transition focus:border-mint-300 focus:ring-2 focus:ring-mint-200/60"
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <FilterChip
              key={f.key}
              filter={f}
              active={filter === f.key}
              onClick={() => setFilter(f.key)}
            />
          ))}
        </div>

        {searchMatches && (
          <div className="mt-4 rounded-2xl border border-mint-200 bg-mint-50/50 p-3">
            <p className="text-[11px] uppercase tracking-widest text-ink-400">
              {searchMatches.length} match{searchMatches.length === 1 ? '' : 'es'}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {searchMatches.map(({ entry }) => (
                <button
                  key={entry.key}
                  type="button"
                  onClick={() => {
                    setActiveKey(entry.key);
                    setFilter('all');
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white px-3 py-1 text-[11px] font-semibold text-ink-500 shadow-soft hover:bg-white/80"
                >
                  <entry.Icon className="h-3 w-3" />
                  {entry.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ====================================================== */}
      {/* High-alert immediate intervention panel                  */}
      {/* ====================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-3xl border border-blush-300 bg-blush-50/70 p-6 shadow-soft backdrop-blur md:p-7"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-blush-400 text-white shadow-soft">
            <AlertOctagon className="h-5 w-5" />
          </span>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blush-500">
              High-Alert · Immediate Intervention Triggers
            </div>
            <h2 className="font-display text-xl font-semibold text-ink-700">
              When to escalate within the hour
            </h2>
          </div>
        </div>

        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {[
            'Acute Delirium vs. Gradual Dementia — sudden onset = delirium.',
            'Sudden Urinary Retention — new inability to void, painful bladder.',
            'Uncontrolled Orthostatic Drops — syncope, near-syncope on standing.',
            'Anticoagulant + Head Strike — same-day CT regardless of symptoms.',
            'Severe Hypoglycemia — sweating + confusion + aggression = BG check first.',
            'Stroke FAST (Face · Arms · Speech · Time) — any positive sign = 911.',
            'Active Suicidal Ideation — even passive statements require same-day MD.',
            'Acute Psychosis with Risk of Harm — to self, others, or property.',
          ].map((line) => (
            <li
              key={line}
              className="flex items-start gap-2 rounded-xl border border-blush-200 bg-white/70 p-3 text-[12px] leading-relaxed text-ink-700"
            >
              <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-blush-500" />
              {line}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* ====================================================== */}
      {/* SECTION 2: Interactive matrix                            */}
      {/* ====================================================== */}
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="rounded-3xl border border-white/60 bg-white/70 p-4 shadow-soft backdrop-blur">
          <div className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">
            Clinical Entries
          </div>
          <div className="space-y-2">
            {filteredEntries.map((entry) => {
              const active = activeEntry.key === entry.key;
              const accentRing =
                entry.accent === 'mint'
                  ? 'border-mint-400 bg-mint-100'
                  : entry.accent === 'blush'
                    ? 'border-blush-400 bg-blush-100'
                    : 'border-cream-200 bg-cream-100';
              return (
                <button
                  key={entry.key}
                  type="button"
                  onClick={() => setActiveKey(entry.key)}
                  className={cn(
                    'flex w-full items-start gap-3 rounded-2xl border-2 p-3 text-left transition',
                    active ? accentRing : 'border-white/60 bg-white hover:bg-white/80',
                  )}
                >
                  <span
                    className={cn(
                      'grid h-10 w-10 shrink-0 place-items-center rounded-2xl text-ink-700 shadow-soft',
                      entry.accent === 'mint' && 'bg-mint-200',
                      entry.accent === 'blush' && 'bg-blush-200',
                      entry.accent === 'cream' && 'bg-cream-200',
                    )}
                  >
                    <entry.Icon className="h-4 w-4" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="block font-display text-sm font-semibold text-ink-700">
                        {entry.label}
                      </span>
                      {entry.highAlert && (
                        <span
                          title="High-alert entry"
                          className="grid h-4 w-4 place-items-center rounded-full bg-blush-500 text-white"
                        >
                          <AlertTriangle className="h-2.5 w-2.5" />
                        </span>
                      )}
                    </div>
                    <span className="block text-[11px] leading-snug text-ink-400">
                      {entry.sub}
                    </span>
                  </div>
                </button>
              );
            })}

            {filteredEntries.length === 0 && (
              <p className="px-2 text-xs italic text-ink-400">
                No entries in this filter.
              </p>
            )}
          </div>
        </aside>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(CATEGORIES) as CategoryKey[]).map((c) => (
              <CategoryChip
                key={c}
                cat={c}
                active={category === c}
                onClick={() => setCategory(c)}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.section
              key={`${activeEntry.key}-${category}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              className={cn(
                'rounded-3xl border p-6 shadow-soft backdrop-blur md:p-8',
                activeEntry.accent === 'mint' && 'border-mint-300 bg-mint-50/70',
                activeEntry.accent === 'blush' && 'border-blush-300 bg-blush-50/70',
                activeEntry.accent === 'cream' && 'border-cream-200 bg-cream-100/70',
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      'grid h-10 w-10 shrink-0 place-items-center rounded-2xl shadow-soft',
                      activeEntry.accent === 'mint' && 'bg-mint-200 text-ink-700',
                      activeEntry.accent === 'blush' && 'bg-blush-200 text-ink-700',
                      activeEntry.accent === 'cream' && 'bg-cream-200 text-ink-700',
                    )}
                  >
                    <activeEntry.Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">
                        {activeEntry.label} · {CATEGORIES[category].label}
                      </span>
                      {activeEntry.highAlert && (
                        <span className="rounded-full bg-blush-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white">
                          High-Alert
                        </span>
                      )}
                    </div>
                    <h2 className="mt-1 font-display text-2xl font-semibold text-ink-700">
                      {category === 'medications'
                        ? 'Medication Classes & Caregiver Prompts'
                        : category === 'redFlags'
                          ? 'High-Alert Flags & Complications'
                          : category === 'symptoms'
                            ? 'Symptoms & Behaviours to Look For'
                            : category === 'screening'
                              ? 'Validated Screening Tools'
                              : category === 'interventions'
                                ? 'Non-Pharm & First-Line Interventions'
                                : 'NB-Specific Resources'}
                    </h2>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={copyAll}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-ink-500 shadow-soft hover:bg-white/80"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-mint-500" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={saveToNote}
                    className="inline-flex items-center gap-1.5 rounded-full bg-ink-500 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white shadow-soft hover:-translate-y-0.5"
                  >
                    {saved ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Bookmark className="h-3.5 w-3.5" />
                        Save
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {renderCategoryContent(activeEntry)}
              </div>

              <div className="mt-6 flex items-start gap-2 rounded-xl border border-white/60 bg-white/70 p-3 text-[11px] text-ink-400">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>
                  Reference only. All clinical decisions remain with the
                  collaborating physician. Nurses Inc. is an independent
                  collaborative practice in NB — PHIPAA-aligned, under
                  physician oversight.
                </span>
              </div>
            </motion.section>
          </AnimatePresence>

          <p className="text-center text-[10px] uppercase tracking-widest text-ink-300">
            <Stethoscope className="mr-1 inline-block h-3 w-3" />
            Nurses Inc. · Internal Reference ·{' '}
            <Sparkles className="inline-block h-3 w-3 text-blush-400" /> v2
          </p>
        </div>
      </div>
    </div>
  );
}