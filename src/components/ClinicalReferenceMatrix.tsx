import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Activity,
  Pill,
  HeartPulse,
  Moon,
  Search,
  Copy,
  Check,
  Bookmark,
  AlertTriangle,
  ShieldPlus,
  Sparkles,
  Info,
  Phone,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Reference data
// ---------------------------------------------------------------------------

type TopicKey =
  | 'dementia'
  | 'delirium'
  | 'falls'
  | 'polypharmacy'
  | 'depression'
  | 'sleep';

type CategoryKey =
  | 'symptoms'
  | 'screening'
  | 'redFlags'
  | 'interventions'
  | 'nbResources';

type Block = {
  icon: React.FC<{ className?: string }>;
  label: string;
  content: string[];
  accent: 'mint' | 'blush' | 'cream' | 'ink';
};

const TOPICS: Record<
  TopicKey,
  { label: string; sub: string; Icon: React.FC<{ className?: string }>; accent: 'mint' | 'blush' | 'cream' }
> = {
  dementia: {
    label: 'Dementia',
    sub: 'Behaviour · Communication · Caregiver load',
    Icon: Brain,
    accent: 'blush',
  },
  delirium: {
    label: 'Delirium',
    sub: 'Acute change in mental status',
    Icon: AlertTriangle,
    accent: 'blush',
  },
  falls: {
    label: 'Falls Prevention',
    sub: 'Home audit · Mobility · Footwear',
    Icon: ShieldPlus,
    accent: 'mint',
  },
  polypharmacy: {
    label: 'Polypharmacy',
    sub: 'Beers · STOPP/START · Deprescribing',
    Icon: Pill,
    accent: 'cream',
  },
  depression: {
    label: 'Late-Life Depression',
    sub: 'Mood · Anhedonia · Suicide risk',
    Icon: HeartPulse,
    accent: 'mint',
  },
  sleep: {
    label: 'Sleep & Sundowning',
    sub: 'Sleep hygiene · Environmental cues',
    Icon: Moon,
    accent: 'cream',
  },
};

const CATEGORIES: Record<CategoryKey, { label: string; sub: string }> = {
  symptoms: { label: 'Symptoms', sub: 'What you may observe' },
  screening: { label: 'Screening Tools', sub: 'Validated bedside instruments' },
  redFlags: { label: 'Red Flags', sub: 'When to escalate immediately' },
  interventions: { label: 'Interventions', sub: 'Non-pharm first-line actions' },
  nbResources: { label: 'NB Resources', sub: 'Local referrals & supports' },
};

const MATRIX: Record<TopicKey, Record<CategoryKey, Block>> = {
  dementia: {
    symptoms: {
      icon: Info,
      label: 'Common presentations',
      accent: 'blush',
      content: [
        'Memory loss that disrupts daily life — especially recent events.',
        'Difficulty with planning, problem-solving, or sequencing tasks.',
        'Confusion with time or place; getting lost in familiar routes.',
        'Withdrawal from hobbies, work, or social engagement.',
        'Mood and personality changes — apathy, suspicion, or agitation.',
      ],
    },
    screening: {
      icon: Search,
      label: 'Validated tools',
      accent: 'mint',
      content: [
        'Mini-Cog® — 3-minute recall + clock draw; sensitivity ~76%.',
        'MoCA 7.1 — full cognitive screen; 10-minute bedside version.',
        'AD8 (Dementia Screening Interview) — informant-based, 8 items.',
        'FAST staging — functional milestones for disease progression.',
      ],
    },
    redFlags: {
      icon: AlertTriangle,
      label: 'Escalate today',
      accent: 'ink',
      content: [
        'Sudden change in cognition or behaviour (rule out delirium).',
        'New hallucinations with paranoia — consider Lewy body dementia.',
        'Driving safety concern — document and notify physician.',
        'Wandering outside the home — risk of harm.',
      ],
    },
    interventions: {
      icon: Sparkles,
      label: 'Non-pharm first-line',
      accent: 'mint',
      content: [
        'Maintain consistent daily routine; same wake-time, same meal seats.',
        'Use simple one-step verbal cues; avoid open-ended questions.',
        'Engage in music, reminiscence, and pet therapy before considering PRN meds.',
        'Caregiver burnout screening every visit — recommend respite early.',
      ],
    },
    nbResources: {
      icon: Phone,
      label: 'NB-specific supports',
      accent: 'cream',
      content: [
        'Alzheimer Society of New Brunswick — 1-800-593-1666.',
        'Extra-Mural Program — referral for in-home nursing support.',
        'NB Health Links — 811 for non-urgent health advice 24/7.',
      ],
    },
  },

  delirium: {
    symptoms: {
      icon: Info,
      label: 'Acute changes to look for',
      accent: 'blush',
      content: [
        'Sudden onset (hours to days) — flag inattention first.',
        'Disorganised thinking or altered level of consciousness.',
        'Fluctuating course — lucid in morning, confused at night.',
        'Emotional lability — fear, irritability, apathy.',
      ],
    },
    screening: {
      icon: Search,
      label: 'Bedside tools',
      accent: 'mint',
      content: [
        '4AT (Alertness · AMT4 · Attention · Acute change) — under 2 minutes.',
        'CAM (Confusion Assessment Method) — 4-feature algorithm.',
        'Nu-DESC — for nursing surveillance on medical floors.',
      ],
    },
    redFlags: {
      icon: AlertTriangle,
      label: 'Same-day escalation',
      accent: 'ink',
      content: [
        'Any new delirium — often the first sign of infection, MI, or stroke.',
        'Inability to maintain hydration or oral intake.',
        'Active harm to self or others.',
        'Withdrawal from chronic medications (alcohol, benzos).',
      ],
    },
    interventions: {
      icon: Sparkles,
      label: 'Non-pharm first-line',
      accent: 'mint',
      content: [
        'Reorient frequently — clock, calendar, family photos in view.',
        'Correct vision and hearing aids before medicating.',
        'Maintain sleep-wake cycle — daytime light, avoid overnight vitals.',
        'Treat the underlying cause — urinary retention, pain, infection.',
      ],
    },
    nbResources: {
      icon: Phone,
      label: 'NB-specific supports',
      accent: 'cream',
      content: [
        'Send to nearest ER for workup if cause is unclear.',
        'Geriatric Medicine consult via Dr. O\u2019Brien (Saint John).',
        'Family caregiver debrief — delirium is traumatic for families too.',
      ],
    },
  },

  falls: {
    symptoms: {
      icon: Info,
      label: 'Risk factors',
      accent: 'blush',
      content: [
        'History of falls in past 12 months (strongest single predictor).',
        'Gait or balance impairment — observe sit-to-stand, tandem walk.',
        'Orthostatic hypotension — check lying & standing BP.',
        'Polypharmacy — sedatives, antihypertensives, hypoglycemics.',
        'Foot problems or inappropriate footwear.',
      ],
    },
    screening: {
      icon: Search,
      label: 'Validated tools',
      accent: 'mint',
      content: [
        'TUG (Timed Up & Go) — >12 seconds indicates elevated risk.',
        '30-Second Chair Stand — age-normed below 8 reps is concerning.',
        'Hendrich II Fall Risk Model — for inpatient / facility settings.',
      ],
    },
    redFlags: {
      icon: AlertTriangle,
      label: 'Same-day escalation',
      accent: 'ink',
      content: [
        'Any unwitnessed fall — assume injury, not just frailty.',
        'Head strike on anticoagulant — same-day CT.',
        'New inability to bear weight after fall.',
        'Suspected hip fracture — no internal rotation test in the home.',
      ],
    },
    interventions: {
      icon: Sparkles,
      label: 'Home-audit priorities',
      accent: 'mint',
      content: [
        'Remove loose rugs; add grab bars in bathroom; clear cords.',
        'Improve lighting — bedside lamp, motion sensors for night bathroom trips.',
        'Install raised toilet seat & shower chair if needed.',
        'Appropriate footwear — closed heel, non-slip sole.',
        'Tai-chi or chair-exercise program — proven 30% reduction in falls.',
      ],
    },
    nbResources: {
      icon: Phone,
      label: 'NB-specific supports',
      accent: 'cream',
      content: [
        'Find a Falls Prevention class via Public Health NB.',
        'Referral to Extra-Mural Program for in-home PT/OT.',
        'NB Pharmacist medication review — covered by Medicare.',
      ],
    },
  },

  polypharmacy: {
    symptoms: {
      icon: Info,
      label: 'Red flags in the count',
      accent: 'blush',
      content: [
        '≥10 medications (CIHI polypharmacy threshold).',
        'Multiple prescribers writing for the same patient.',
        'Pills past expiry — especially PRNs & eye drops.',
        'Duplicate drug classes (e.g. two PPIs).',
      ],
    },
    screening: {
      icon: Search,
      label: 'Bedside references',
      accent: 'mint',
      content: [
        'AGS Beers Criteria® 2023 — 25 PIM categories for adults 65+.',
        'STOPP/START Version 3 — European evidence-based screens.',
        'Bruyère deprescribing.org algorithms — by drug class.',
      ],
    },
    redFlags: {
      icon: AlertTriangle,
      label: 'Escalate to MD',
      accent: 'ink',
      content: [
        'Anticholinergic burden score ≥3 — falls + cognitive risk.',
        'Triple-whammy — ACEi + diuretic + NSAID = AKI risk.',
        'Warfarin + NSAID without PPI cover.',
        'Long-acting benzos still on the active list.',
      ],
    },
    interventions: {
      icon: Sparkles,
      label: 'Deprescribing steps',
      accent: 'mint',
      content: [
        'Identify the indication & target symptom for each med.',
        'Assess current benefit vs. harm with patient / SDM.',
        'Prioritise one med at a time — taper slowest first.',
        'Document the trial and review at 2–4 weeks.',
      ],
    },
    nbResources: {
      icon: Phone,
      label: 'NB-specific supports',
      accent: 'cream',
      content: [
        'NB Pharmacy Association — MedsReview for covered residents.',
        'Choosing Wisely Canada geriatric list — for shared decision-making.',
        'Forward referrals to partner MD (Dr. LeBlanc, Moncton).',
      ],
    },
  },

  depression: {
    symptoms: {
      icon: Info,
      label: 'SIGECAPS mnemonic',
      accent: 'blush',
      content: [
        'S — Sleep disruption (insomnia or hypersomnia).',
        'I — Interest loss (anhedonia in hobbies or family).',
        'G — Guilt or worthlessness.',
        'E — Energy loss.',
        'C — Concentration difficulty.',
        'A — Appetite change (up or down, often with weight).',
        'P — Psychomotor agitation or retardation.',
        'S — Suicidal ideation — always ask directly.',
      ],
    },
    screening: {
      icon: Search,
      label: 'Validated tools',
      accent: 'mint',
      content: [
        'PHQ-2 — first 2 questions; if positive, complete PHQ-9.',
        'PHQ-9 — score ≥10 = moderate depression; ≥20 = severe.',
        'Geriatric Depression Scale (GDS-15) — for frail seniors.',
        'Cornell Scale for Depression in Dementia — informant + patient.',
      ],
    },
    redFlags: {
      icon: AlertTriangle,
      label: 'Same-day escalation',
      accent: 'ink',
      content: [
        'Any expressed suicidal ideation — even passive ("I just want to sleep forever").',
        'Means access — firearms, large medication supplies, plan.',
        'Recent loss of spouse with acute functional decline.',
        'Psychotic features — hallucinations, paranoid delusions.',
      ],
    },
    interventions: {
      icon: Sparkles,
      label: 'Non-pharm first-line',
      accent: 'mint',
      content: [
        'Behavioural activation — small, scheduled pleasant activities.',
        'Caregiver psychoeducation — depression is illness, not laziness.',
        'Sleep hygiene & morning light exposure.',
        'Social engagement — day programs, church groups, telephone visits.',
      ],
    },
    nbResources: {
      icon: Phone,
      label: 'NB-specific supports',
      accent: 'cream',
      content: [
        'CHIMO Helpline — 1-800-667-5005 (24/7 crisis line).',
        'Geriatric Psychiatry — Dr. Tremblay (Bathurst).',
        'Primary care referral — first-line SSRI if pharmacotherapy chosen.',
      ],
    },
  },

  sleep: {
    symptoms: {
      icon: Info,
      label: 'Common presentations',
      accent: 'blush',
      content: [
        'Sleep-onset insomnia — often anxiety or stimulant timing.',
        'Frequent night awakening — pain, nocturia, sleep apnea.',
        'Early-morning awakening — classic depression marker.',
        'Sundowning — late-day confusion in dementia patients.',
      ],
    },
    screening: {
      icon: Search,
      label: 'Bedside tools',
      accent: 'mint',
      content: [
        'Epworth Sleepiness Scale — daytime sleepiness.',
        'STOP-BANG — screen for obstructive sleep apnea.',
        'Sleep diary — 7-day pattern from bed partner or caregiver.',
      ],
    },
    redFlags: {
      icon: AlertTriangle,
      label: 'Escalate today',
      accent: 'ink',
      content: [
        'Witnessed apneas with witnessed daytime sleepiness — sleep study.',
        'Falls during night bathroom trips — environmental urgency.',
        'Sedative-hypnotic dependence with rebound insomnia.',
      ],
    },
    interventions: {
      icon: Sparkles,
      label: 'Sleep-hygiene fundamentals',
      accent: 'mint',
      content: [
        'Fixed wake time, even on weekends — anchor the circadian rhythm.',
        'No screens 60 min before bed; morning sunlight within 30 min of waking.',
        'Caffeine cutoff 2 pm; alcohol disrupts REM even when sedating.',
        'Bed = sleep only — no reading, TV, or worry in bed.',
      ],
    },
    nbResources: {
      icon: Phone,
      label: 'NB-specific supports',
      accent: 'cream',
      content: [
        'CBT-I referral — first-line, drug-free insomnia treatment.',
        'Respiratory consult for suspected sleep apnea (Dr. Comeau, Moncton).',
        'Pharmacist review — flag all PRN sleep aids.',
      ],
    },
  },
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function TopicCard({
  topic,
  active,
  onClick,
}: {
  topic: TopicKey;
  active: boolean;
  onClick: () => void;
}) {
  const t = TOPICS[topic];
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-start gap-3 rounded-2xl border-2 p-4 text-left transition',
        active
          ? t.accent === 'mint'
            ? 'border-mint-400 bg-mint-100'
            : t.accent === 'blush'
              ? 'border-blush-400 bg-blush-100'
              : 'border-cream-200 bg-cream-100'
          : 'border-white/60 bg-white hover:bg-white/80',
      )}
    >
      <span
        className={cn(
          'grid h-10 w-10 shrink-0 place-items-center rounded-2xl text-ink-700 shadow-soft',
          t.accent === 'mint'
            ? 'bg-mint-200'
            : t.accent === 'blush'
              ? 'bg-blush-200'
              : 'bg-cream-200',
        )}
      >
        <t.Icon className="h-4 w-4" />
      </span>
      <div className="flex-1">
        <span className="block font-display text-sm font-semibold text-ink-700">
          {t.label}
        </span>
        <span className="block text-[11px] text-ink-400">{t.sub}</span>
      </div>
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

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function ClinicalReferenceMatrix() {
  const [topic, setTopic] = useState<TopicKey>('dementia');
  const [category, setCategory] = useState<CategoryKey>('symptoms');
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const block = MATRIX[topic][category];

  const filteredContent = useMemo(() => {
    if (!search.trim()) return block.content;
    const q = search.toLowerCase();
    return block.content.filter((line) => line.toLowerCase().includes(q));
  }, [block, search]);

  const copyAll = async () => {
    try {
      const text = `${TOPICS[topic].label} · ${CATEGORIES[category].label}\n\n${filteredContent.join('\n')}`;
      await navigator.clipboard.writeText(text);
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
      {/* Search bar */}
      <div className="rounded-3xl border border-white/60 bg-white/70 p-4 shadow-soft backdrop-blur md:p-5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter current category — try 'sleep', 'PPI', 'sundowning'…"
            className="w-full rounded-full border border-white/60 bg-white py-3 pl-11 pr-4 text-sm text-ink-700 shadow-soft outline-none transition focus:border-mint-300 focus:ring-2 focus:ring-mint-200/60"
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Topic sidebar */}
        <aside className="rounded-3xl border border-white/60 bg-white/70 p-4 shadow-soft backdrop-blur">
          <div className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">
            Topics
          </div>
          <div className="space-y-2">
            {(Object.keys(TOPICS) as TopicKey[]).map((k) => (
              <TopicCard
                key={k}
                topic={k}
                active={topic === k}
                onClick={() => setTopic(k)}
              />
            ))}
          </div>
        </aside>

        {/* Main panel */}
        <div className="space-y-4">
          {/* Category chips */}
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

          {/* Dynamic reference block */}
          <AnimatePresence mode="wait">
            <motion.section
              key={`${topic}-${category}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              className={cn(
                'rounded-3xl border p-6 shadow-soft backdrop-blur md:p-8',
                block.accent === 'mint' && 'border-mint-300 bg-mint-50/70',
                block.accent === 'blush' && 'border-blush-300 bg-blush-50/70',
                block.accent === 'cream' && 'border-cream-200 bg-cream-100/70',
                block.accent === 'ink' && 'border-ink-200 bg-ink-50/40',
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      'grid h-10 w-10 shrink-0 place-items-center rounded-2xl shadow-soft',
                      block.accent === 'mint' && 'bg-mint-200 text-ink-700',
                      block.accent === 'blush' && 'bg-blush-200 text-ink-700',
                      block.accent === 'cream' && 'bg-cream-200 text-ink-700',
                      block.accent === 'ink' && 'bg-ink-500 text-white',
                    )}
                  >
                    <block.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">
                      {TOPICS[topic].label} · {CATEGORIES[category].label}
                    </div>
                    <h2 className="mt-1 font-display text-2xl font-semibold text-ink-700">
                      {block.label}
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

              {filteredContent.length === 0 ? (
                <p className="mt-6 text-sm italic text-ink-400">
                  No matches in this category. Try a different search term or
                  switch categories.
                </p>
              ) : (
                <ul className="mt-6 space-y-2.5">
                  {filteredContent.map((line, i) => (
                    <motion.li
                      key={`${topic}-${category}-${i}`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="flex items-start gap-3 text-sm leading-relaxed text-ink-700"
                    >
                      <span
                        className={cn(
                          'mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full',
                          block.accent === 'mint' && 'bg-mint-500',
                          block.accent === 'blush' && 'bg-blush-500',
                          block.accent === 'cream' && 'bg-ink-500',
                          block.accent === 'ink' && 'bg-ink-500',
                        )}
                      />
                      <span>{line}</span>
                    </motion.li>
                  ))}
                </ul>
              )}

              {/* Footer note */}
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
        </div>
      </div>
    </div>
  );
}