/**
 * Nurses Inc. — Medication Audit Form Bundle
 *
 * Each entry is a STANDALONE printable form. The user downloads or views
 * exactly one form per file, each fits on one page so nothing overflows.
 *
 * Form types:
 *   - 'inventory'   → bordered table with N blank rows
 *   - 'reference'   → bulleted reference list
 *   - 'fields'      → labelled underline rules (handwriting form)
 *   - 'algorithm'   → numbered procedural steps
 *   - 'mixed'       → combination of intro + checkboxes + writing lines
 */

export type MedFormId =
  | 'welcome-prep'
  | 'inventory'
  | 'beers'
  | 'stopp-start'
  | 'polypharmacy'
  | 'symptom-cause'
  | 'deprescribing-algorithms'
  | 'deprescribing-conversation'
  | 'empower-brochures'
  | 'adherence-safety'
  | 'anticholinergic-burden'
  | 'fridge-list'
  | 'feedback-survey'
  | 'emergency-card'
  | 'side-effect-tracker'
  | 'doctor-visit-prep'
  // Cognitive & depression screening
  | 'mmse'
  | 'moca'
  | 'mini-cog'
  | 'clock-draw'
  | 'gds-15'
  | 'phq-9'
  | 'csdd'
  | 'cam'
  // Falls risk
  | 'morse-fall-scale'
  | 'tinetti-poma';

export type MedFormMeta = {
  id: MedFormId;
  number: string; // 1., 2., ...
  title: string;
  shortTitle: string;
  audience: string;
  filename: string;
  icon: string;
  accent: 'blush' | 'mint' | 'cream';
  /** Filter group for the Forms Canvas: family-facing or clinical/nurse-facing. */
  category: 'family' | 'clinical';
  summary: string[];
};

export const medForms: Record<MedFormId, MedFormMeta> = {
  'welcome-prep': {
    id: 'welcome-prep',
    number: '1',
    title: 'Welcome to Your Home Medication Compliance Audit',
    shortTitle: 'How to Prepare for Your Nurse\u2019s Visit',
    audience: 'Form · Families',
    filename: 'Nurses-Inc-Form-1-Welcome-Preparation.pdf',
    icon: 'Sparkles',
    accent: 'blush',
    category: 'family',
    summary: [
      '4-step pre-visit checklist',
      'What to gather · What we\u2019ll do together',
    ],
  },
  inventory: {
    id: 'inventory',
    number: '2',
    title: 'Medication Inventory',
    shortTitle: 'List of current medications',
    audience: 'Form · Families',
    filename: 'Nurses-Inc-Form-2-Medication-Inventory.pdf',
    icon: 'Pill',
    accent: 'blush',
    category: 'family',
    summary: [
      '10-column table: name, route, dose, time, prescriber, expiry',
      '16 blank rows — one medication per row',
    ],
  },
  beers: {
    id: 'beers',
    number: '1',
    title: 'Beers Criteria® 2023 — Quick Reference',
    shortTitle: 'Potentially inappropriate medications for adults 65+',
    audience: 'Reference · Nurses',
    filename: 'Nurses-Inc-Form-3-Beers-Criteria-Reference.pdf',
    icon: 'BookOpen',
    accent: 'mint',
    category: 'clinical',
    summary: [
      '12 high-yield Beers flag categories',
      'Designed for use during medication review',
    ],
  },
  'stopp-start': {
    id: 'stopp-start',
    number: '2',
    title: 'STOPP/START Version 3 — Quick Reference',
    shortTitle: 'STOPP / START prescribing screens',
    audience: 'Reference · Nurses',
    filename: 'Nurses-Inc-Form-4-STOPP-START-Reference.pdf',
    icon: 'BookOpen',
    accent: 'mint',
    category: 'clinical',
    summary: [
      '8 STOPP criteria + 6 START criteria',
      'European Geriatric Medicine v3 evidence',
    ],
  },
  polypharmacy: {
    id: 'polypharmacy',
    number: '3',
    title: 'Polypharmacy & Deprescribing',
    shortTitle: 'Clinical reference',
    audience: 'Reference · Nurses',
    filename: 'Nurses-Inc-Form-5-Polypharmacy-Deprescribing.pdf',
    icon: 'BookOpen',
    accent: 'cream',
    category: 'clinical',
    summary: [
      'CIHI ≥10-class polypharmacy threshold',
      'Bruyère 3-question deprescribing framework',
    ],
  },
  'symptom-cause': {
    id: 'symptom-cause',
    number: '4',
    title: 'New Symptom → Medication Cause?',
    shortTitle: 'Symptom causation form',
    audience: 'Form · Nurses',
    filename: 'Nurses-Inc-Form-6-Symptom-Cause.pdf',
    icon: 'FileText',
    accent: 'blush',
    category: 'clinical',
    summary: [
      '4 symptom-entry cards per page',
      'Date, description, suspected med, action, outcome',
    ],
  },
  'deprescribing-algorithms': {
    id: 'deprescribing-algorithms',
    number: '5',
    title: 'Deprescribing Algorithms (Bruyère / Deprescribing.org)',
    shortTitle: '4 drug-class deprescribing steps',
    audience: 'Reference · Nurses',
    filename: 'Nurses-Inc-Form-7-Deprescribing-Algorithms.pdf',
    icon: 'BookOpen',
    accent: 'cream',
    category: 'clinical',
    summary: [
      'PPI · Benzodiazepines & Z-drugs',
      'Antipsychotics · Statins',
    ],
  },
  'deprescribing-conversation': {
    id: 'deprescribing-conversation',
    number: '3',
    title: 'Schedule a Deprescribing Conversation',
    shortTitle: 'Conversation scheduler',
    audience: 'Form · Families',
    filename: 'Nurses-Inc-Form-8-Deprescribing-Conversation.pdf',
    icon: 'FileText',
    accent: 'blush',
    category: 'family',
    summary: [
      'Patient & prescriber details',
      'Top 3 medications + questions + action items',
    ],
  },
  'empower-brochures': {
    id: 'empower-brochures',
    number: '6',
    title: 'EMPOWER Brochure Series',
    shortTitle: 'Patient handouts for safe deprescribing',
    audience: 'Reference · Nurses',
    filename: 'Nurses-Inc-Form-9-EMPOWER-Brochures.pdf',
    icon: 'BookOpen',
    accent: 'cream',
    category: 'clinical',
    summary: [
      'PPI · Benzodiazepines · Antipsychotics · Statins',
      'Sulfonylureas · Cholinesterase inhibitors',
    ],
  },
  'adherence-safety': {
    id: 'adherence-safety',
    number: '7',
    title: 'Adherence & Safety Audit',
    shortTitle: 'Chain of administration · Storage · Expiry',
    audience: 'Form · Nurses',
    filename: 'Nurses-Inc-Form-10-Adherence-Safety.pdf',
    icon: 'FileText',
    accent: 'mint',
    category: 'clinical',
    summary: [
      'Chain of administration',
      'Storage rules · Expiry audit · Reference lists',
    ],
  },
  'anticholinergic-burden': {
    id: 'anticholinergic-burden',
    number: '8',
    title: 'Anticholinergic Cognitive Burden (ACB) Scale',
    shortTitle: 'Score anticholinergic load in older adults',
    audience: 'Reference · Nurses',
    filename: 'Nurses-Inc-Form-13-Anticholinergic-Burden.pdf',
    icon: 'BookOpen',
    accent: 'cream',
    category: 'clinical',
    summary: [
      '100+ anticholinergic drugs scored 0–3',
      'Pair with Beers Criteria at every med review',
    ],
  },
  'fridge-list': {
    id: 'fridge-list',
    number: '4',
    title: 'Fridge Medication List',
    shortTitle: 'Quick-reference emergency list',
    audience: 'Form · Families',
    filename: 'Nurses-Inc-Form-11-Fridge-List.pdf',
    icon: 'BookOpen',
    accent: 'blush',
    category: 'family',
    summary: [
      '5-column quick-reference table',
      'Allergies + emergency contact strip',
    ],
  },
  'feedback-survey': {
    id: 'feedback-survey',
    number: '5',
    title: 'Client & Family Feedback',
    shortTitle: 'Post-Visit Evaluation',
    audience: 'Form · Families',
    filename: 'Nurses-Inc-Form-12-Client-Family-Feedback.pdf',
    icon: 'Quote',
    accent: 'mint',
    category: 'family',
    summary: [
      'Likert-scale experience ratings',
      'Optional marketing authorization',
    ],
  },
  'emergency-card': {
    id: 'emergency-card',
    number: '6',
    title: 'Caregiver Emergency Contact Card',
    shortTitle: 'Wallet & fridge-ready contact card',
    audience: 'Form · Families',
    filename: 'Nurses-Inc-Form-13-Emergency-Contact-Card.pdf',
    icon: 'Phone',
    accent: 'blush',
    category: 'family',
    summary: [
      'Patient + Substitute Decision Maker details',
      'Pharmacy, doctor, ER & emergency contacts',
    ],
  },
  'side-effect-tracker': {
    id: 'side-effect-tracker',
    number: '7',
    title: 'Medication Side-Effect Tracker',
    shortTitle: 'Daily reaction log',
    audience: 'Form · Families',
    filename: 'Nurses-Inc-Form-14-Side-Effect-Tracker.pdf',
    icon: 'Activity',
    accent: 'mint',
    category: 'family',
    summary: [
      '7-day symptom + medication log',
      'Severity scale 1–5 for caregiver reporting',
    ],
  },
  'doctor-visit-prep': {
    id: 'doctor-visit-prep',
    number: '8',
    title: 'Doctor Visit Preparation Sheet',
    shortTitle: 'Bring this to your next appointment',
    audience: 'Form · Families',
    filename: 'Nurses-Inc-Form-15-Doctor-Visit-Prep.pdf',
    icon: 'Stethoscope',
    accent: 'cream',
    category: 'family',
    summary: [
      'Top 3 concerns + questions',
      'Recent changes, medications, vitals',
    ],
  },

  // ── Cognitive & Depression Screening Forms ───────────────────────
  mmse: {
    id: 'mmse',
    number: '9',
    title: 'Mini-Mental State Examination (MMSE)',
    shortTitle: '30-point cognitive screen',
    audience: 'Assessment · Nurses',
    filename: 'Nurses-Inc-Form-16-MMSE.pdf',
    icon: 'Brain',
    accent: 'mint',
    category: 'clinical',
    summary: [
      '11-question 30-point screen',
      'Orientation · Registration · Attention · Recall · Language · Visuospatial',
    ],
  },
  moca: {
    id: 'moca',
    number: '10',
    title: 'Montreal Cognitive Assessment (MoCA)',
    shortTitle: '30-point cognitive screen (more sensitive than MMSE)',
    audience: 'Assessment · Nurses',
    filename: 'Nurses-Inc-Form-17-MoCA.pdf',
    icon: 'Brain',
    accent: 'mint',
    category: 'clinical',
    summary: [
      '8 domains · 30 points · scores < 26 suggest MCI',
      'Better detection of mild cognitive impairment than MMSE',
    ],
  },
  'mini-cog': {
    id: 'mini-cog',
    number: '11',
    title: 'Mini-Cog® Screening',
    shortTitle: '3-minute cognitive screen',
    audience: 'Assessment · Nurses',
    filename: 'Nurses-Inc-Form-18-Mini-Cog.pdf',
    icon: 'Brain',
    accent: 'mint',
    category: 'clinical',
    summary: [
      '3-word recall + clock draw',
      'Validated for dementia screening in primary care',
    ],
  },
  'clock-draw': {
    id: 'clock-draw',
    number: '12',
    title: 'Clock Drawing Test (Sunderland / CLOX)',
    shortTitle: 'Visuospatial + executive function',
    audience: 'Assessment · Nurses',
    filename: 'Nurses-Inc-Form-19-Clock-Draw.pdf',
    icon: 'Brain',
    accent: 'mint',
    category: 'clinical',
    summary: [
      '10-point scoring · 11 o\'clock task',
      'Stand-alone executive / visuospatial screen',
    ],
  },
  'gds-15': {
    id: 'gds-15',
    number: '13',
    title: 'Geriatric Depression Scale (GDS-15)',
    shortTitle: '15-item depression screen',
    audience: 'Assessment · Nurses',
    filename: 'Nurses-Inc-Form-20-GDS-15.pdf',
    icon: 'Heart',
    accent: 'blush',
    category: 'clinical',
    summary: [
      '15 yes/no items · cut-off ≥ 5 = depression',
      'Validated specifically for older adults',
    ],
  },
  'phq-9': {
    id: 'phq-9',
    number: '14',
    title: 'Patient Health Questionnaire-9 (PHQ-9)',
    shortTitle: '9-item depression + suicidality screen',
    audience: 'Assessment · Nurses',
    filename: 'Nurses-Inc-Form-21-PHQ-9.pdf',
    icon: 'Heart',
    accent: 'blush',
    category: 'clinical',
    summary: [
      '9-item Likert · Item 9 screens for suicidality',
      'Score ≥ 10 = moderate depression or worse',
    ],
  },
  csdd: {
    id: 'csdd',
    number: '15',
    title: 'Cornell Scale for Depression in Dementia (CSDD)',
    shortTitle: 'Depression screen for patients with dementia',
    audience: 'Assessment · Nurses',
    filename: 'Nurses-Inc-Form-22-CSDD.pdf',
    icon: 'Heart',
    accent: 'blush',
    category: 'clinical',
    summary: [
      '19-item clinician-administered · informant + patient interview',
      'Cut-off ≥ 8 = significant depressive symptoms',
    ],
  },
  cam: {
    id: 'cam',
    number: '16',
    title: 'Confusion Assessment Method (CAM)',
    shortTitle: '4-feature delirium screen',
    audience: 'Assessment · Nurses',
    filename: 'Nurses-Inc-Form-23-CAM.pdf',
    icon: 'Activity',
    accent: 'cream',
    category: 'clinical',
    summary: [
      '4 features · 1 + 2 + 3 or 4 = delirium',
      'Gold-standard bedside delirium screen',
    ],
  },

  // ── Falls Risk Forms ──────────────────────────────────────────────
  'morse-fall-scale': {
    id: 'morse-fall-scale',
    number: '17',
    title: 'Morse Fall Scale (MFS)',
    shortTitle: '6-item falls risk assessment',
    audience: 'Assessment · Nurses',
    filename: 'Nurses-Inc-Form-24-Morse-Fall-Scale.pdf',
    icon: 'ShieldAlert',
    accent: 'blush',
    category: 'clinical',
    summary: [
      '6 items · max 125 · ≥ 45 = high risk',
      'Standard falls-risk tool used across Canadian LTC',
    ],
  },
  'tinetti-poma': {
    id: 'tinetti-poma',
    number: '18',
    title: 'Tinetti Assessment Tool (POMA)',
    shortTitle: 'Balance + gait assessment',
    audience: 'Assessment · Nurses',
    filename: 'Nurses-Inc-Form-25-Tinetti-POMA.pdf',
    icon: 'ShieldAlert',
    accent: 'blush',
    category: 'clinical',
    summary: [
      'Balance (16 pts) + Gait (12 pts) · max 28',
      'Score < 19 = high fall risk',
    ],
  },
};

export const medFormList: MedFormMeta[] = [
  // Clinical Forms (18) — used inside the Clinical Forms & Tools section
  // Medication review
  medForms.beers,
  medForms['stopp-start'],
  medForms.polypharmacy,
  medForms['symptom-cause'],
  medForms['deprescribing-algorithms'],
  medForms['empower-brochures'],
  medForms['adherence-safety'],
  medForms['anticholinergic-burden'],
  // Cognitive screening
  medForms.mmse,
  medForms.moca,
  medForms['mini-cog'],
  medForms['clock-draw'],
  // Depression screening
  medForms['gds-15'],
  medForms['phq-9'],
  medForms.csdd,
  medForms.cam,
  // Falls risk
  medForms['morse-fall-scale'],
  medForms['tinetti-poma'],
  // Printable Forms (8) — used in the Printable Forms section
  medForms['welcome-prep'],
  medForms.inventory,
  medForms['deprescribing-conversation'],
  medForms['fridge-list'],
  medForms['feedback-survey'],
  medForms['emergency-card'],
  medForms['side-effect-tracker'],
  medForms['doctor-visit-prep'],
];

// ---------------------------------------------------------------------------
// Per-form content payloads
// ---------------------------------------------------------------------------

export const inventoryColumns = [
  'Medication (generic / brand)',
  'Strength',
  'Route',
  'Dose',
  'Time(s)',
  'Reason for use',
  'Prescriber',
  'Pharmacy',
  'Date started',
  'Expiry / discard',
];

export const beersBullets: string[] = [
  'Anticholinergics (first-generation antihistamines, bladder antispasmodics, GI antispasmodics): cause confusion, dry mouth, urinary retention, falls.',
  'Benzodiazepines and Z-drugs (lorazepam, temazepam, zolpidem): increase falls, fractures, delirium, cognitive impairment. Avoid in older adults.',
  'Sleep aids (doxepin ≥6 mg, trazodone off-label for insomnia): minimal benefit, orthostatic risk.',
  'First-generation antipsychotics (chlorpromazine, haloperidol) for BPSD: increased mortality, stroke, falls.',
  'Chronic NSAIDs (ibuprofen, naproxen, diclofenac): GI bleed, renal injury, hypertension. Avoid long-term use.',
  'Sulfonylureas (glyburide): prolonged hypoglycemia; prefer metformin or other agents.',
  'Digoxin >0.125 mg/day: toxicity risk in renal impairment.',
  'Sliding-scale insulin without basal coverage: hypoglycemia risk.',
  'Tricyclic antidepressants (amitriptyline, nortriptyline): anticholinergic burden, orthostasis, falls.',
  'Trimethoprim-sulfamethoxazole with concurrent ACE inhibitor/ARB: hyperkalemia, AKI.',
  'Warfarin with NSAIDs: GI bleed risk. Consider DOAC alternative where appropriate.',
  'Eszopiclone, zaleplon: similar to Z-drugs — falls, complex sleep behaviours.',
];

export const beersIntro =
  'The American Geriatrics Society Beers Criteria® lists medications considered potentially inappropriate for adults aged 65 and older. Use this reference during every medication audit; confirm any hit with the prescriber before adjusting therapy.';

export const stoppStartBullets: string[] = [
  'STOPP — Any drug prescribed without an evidence-based indication.',
  'STOPP — Duplicate drug class prescriptions (two NSAIDs, two opioids, etc.).',
  'STOPP — Benzodiazepines beyond four weeks for insomnia or anxiety in older adults.',
  'STOPP — Anticholinergic burden exceeding three concurrent agents.',
  'STOPP — Loop diuretic as first-line for hypertension (use a thiazide instead).',
  'STOPP — Long-acting opioids in opioid-naïve patients with chronic non-cancer pain.',
  'STOPP — Aspirin >160 mg/day for secondary prevention.',
  'STOPP — Antipsychotics for behavioural and psychological symptoms of dementia beyond twelve weeks.',
  'START — Vitamin D 800–2000 IU/day in housebound or institutionalized older adults.',
  'START — Fibre supplement for chronic constipation.',
  'START — Annual influenza vaccine and pneumococcal vaccine per PHAC schedule.',
  'START — ACE inhibitor or ARB in systolic heart failure or post-MI.',
  'START — Bisphosphonate and vitamin D / calcium in osteoporosis.',
  'START — Laxative in chronic opioid use.',
];

export const stoppStartIntro =
  'STOPP identifies potentially inappropriate prescriptions to discontinue. START identifies evidence-based medications that should be considered for initiation. Use this list during every annual medication review.';

export const polypharmacyBullets: string[] = [
  'Ten or more distinct drug classes in a senior meets the CIHI polypharmacy threshold.',
  'Approximately one in four Canadian seniors is prescribed 10+ drug classes in a single year.',
  'Each additional medication increases adverse drug event risk exponentially, not linearly.',
  'Apply the prescribing-cascade rule: every new symptom may be a side effect of an existing drug.',
  'For each medication, ask: (a) Is there still an active indication? (b) Is the benefit greater than the harm? (c) Could it be stopped?',
  'Use the Bruyère / Deprescribing.org algorithms (Form 6) as decision aids.',
  'Deprescribing is the planned process of reducing or stopping a medication, with monitoring, in partnership with the prescriber and the patient.',
  'Document every deprescribing decision with the rationale, the goal, and the monitoring plan.',
  'Repeat the brown-bag review every six months, after every hospitalization, and after any new symptom.',
];

export const polypharmacyIntro =
  'Polypharmacy is one of the most common — and modifiable — causes of adverse events in older adults. Use this reference as the clinical reasoning framework for every deprescribing conversation.';

export const symptomCauseLabels: string[] = [
  'Date symptom first noticed',
  'Description of symptom',
  'Suspected medication(s)',
  'Date medication started / dose changed',
  'Action taken',
  'Outcome / prescriber response',
];

export const deprescribingAlgorithms: {
  drugClass: string;
  title: string;
  steps: string[];
}[] = [
  {
    drugClass: 'PPI',
    title: '6.1 · Proton Pump Inhibitors',
    steps: [
      'Is there still an active indication? (PUD, GERD, Barrett\u2019s, NSAID gastroprotection, ICU stress-ulcer prophylaxis).',
      'If yes — confirm lowest effective dose and continued need every 12 months.',
      'If no — taper to half dose for 4 weeks, then alternate-day dosing for 4 weeks, then stop.',
      'Counsel on rebound acid hypersecretion (1–2 weeks of dyspepsia is normal).',
      'Provide the EMPOWER PPI patient brochure (Form 8).',
      'Reassess at 4 and 12 weeks; restart only if symptoms recur and are refractory.',
    ],
  },
  {
    drugClass: 'BZD / Z-drug',
    title: '6.2 · Benzodiazepines & Z-drugs',
    steps: [
      'Confirm the original indication. Most chronic insomnia or anxiety use is no longer evidence-based beyond four weeks.',
      'Discuss fall risk, cognitive impairment, and dependence with the patient and family.',
      'Taper slowly — typically 5–10% of the daily dose every 2–4 weeks.',
      'Switch from a short-acting to a long-acting agent before tapering if the patient is on multiple daily doses.',
      'Offer non-pharmacological sleep support (CBT-I, sleep hygiene, morning light exposure).',
      'Provide the EMPOWER benzodiazepine patient brochure (Form 8).',
      'Monitor for withdrawal: rebound insomnia, anxiety, tremor, seizure (rare, but possible with abrupt stop).',
    ],
  },
  {
    drugClass: 'Antipsychotic',
    title: '6.3 · Antipsychotics in Dementia / BPSD',
    steps: [
      'Document at least two non-pharmacological interventions and their outcomes.',
      'Rule out pain, infection, delirium, constipation, dehydration, and environmental triggers.',
      'If pharmacological treatment is still required, use the lowest effective dose and set a deprescribing review date at the time of prescription (target ≤3 months).',
      'Obtain informed consent from the substitute decision-maker per New Brunswick law.',
      'Document the target symptom, the dose, the monitoring plan, and the discontinuation trigger.',
      'Provide the EMPOWER antipsychotic patient brochure (Form 8).',
      'Repeat review every 4 weeks; consider a quarterly dose-reduction trial if behaviour is stable.',
    ],
  },
  {
    drugClass: 'Statin',
    title: '6.4 · Statins',
    steps: [
      'Confirm continued indication (secondary prevention, primary prevention with ≥10% 10-year CV risk, diabetes >40 with risk factors).',
      'For frail older adults with limited life expectancy, significant adverse effects, or when pill burden outweighs benefit, consider deprescribing.',
      'Engage in shared decision-making with the patient or substitute decision-maker using the Bruyère statin algorithm.',
      'There is no taper required for statins — they can be stopped without withdrawal.',
      'Reassess at 3 and 6 months; restart if a new cardiovascular event occurs.',
      'Provide the EMPOWER statin patient brochure (Form 8).',
    ],
  },
];

export const deprescribingConversationFields: {
  label: string;
  multi?: boolean;
}[] = [
  { label: 'Patient name' },
  { label: 'Date of conversation scheduled' },
  { label: 'Prescriber name' },
  { label: 'Prescriber clinic / contact' },
  { label: 'Method (in-person / phone / video)' },
  { label: 'Family or SDM invited' },
  { label: 'Top 3 medications to review' },
  { label: 'Patient goals & concerns', multi: true },
  { label: 'Questions for the prescriber', multi: true },
  { label: 'Action items from the conversation', multi: true },
  { label: 'Next review date' },
];

export const empowerBullets: string[] = [
  'EMPOWER PPI — Reducing your heartburn medication. Walks patients through a 12-week gradual taper.',
  'EMPOWER Benzodiazepines — Sleeping pills and older adults. Covers fall risk, dependence, and a slow taper schedule.',
  'EMPOWER Antipsychotics — A guide to reducing antipsychotic medications for behavioural symptoms in dementia.',
  'EMPOWER Statins — Lowering your cholesterol without a statin. Compares benefits, harms, and lifestyle alternatives.',
  'EMPOWER Sulfonylureas — When is your diabetes pill doing more harm than good?',
  'EMPOWER Cholinesterase inhibitors — Treating the symptoms of dementia. When is it safe to stop?',
  'All brochures are free at deprescribing.org and printable in English or French.',
  'Use the brochures as a starting point for shared decision-making — not as a substitute for the prescriber conversation.',
];

export const empowerIntro =
  'The EMPOWER brochures are a Canadian-developed, evidence-based set of patient handouts that walk older adults through safe deprescribing of common drug classes. Distribute the relevant brochure at the visit and ask the patient to read it with their family before the next appointment.';

export const adherenceSubsections: { heading: string; items: string[] }[] = [
  {
    heading: '9.1 · Chain of administration',
    items: [
      'Document who fills the blister pack and who actually administers each dose.',
      'If a family member or home-care worker administers, confirm they have a current written schedule and access to a nurse for questions.',
      'If the person self-administers, ask them to demonstrate how they take each medication (teach-back method).',
      'Confirm the person can open the bottle, read the label, and remember the schedule.',
    ],
  },
  {
    heading: '9.2 · Storage',
    items: [
      'Verify storage — locked, away from children and pets, cool and dry, never in the bathroom.',
      'Insulin and most biologics require refrigeration; check the label and the patient\u2019s fridge temperature.',
      'Nitroglycerin tablets lose potency once the bottle is opened; replace every 3–6 months per manufacturer.',
      'Keep medications in their original containers to preserve identity and expiry information.',
    ],
  },
  {
    heading: '9.3 · Expiry',
    items: [
      'Check expiry dates on every item, including eye drops (28-day discard after opening unless the label states otherwise).',
      'Discard any medication that has changed colour, smell, or consistency.',
      'Take expired or unused medications to a pharmacy for safe disposal — never flush or place in household trash.',
    ],
  },
  {
    heading: '9.4 · Reference lists',
    items: [
      'Confirm an up-to-date medication list lives on the fridge (Form 10).',
      'Confirm an up-to-date list also lives in the MyHealthNB account or patient portal.',
      'Confirm a copy travels with the person to every clinic visit, ER visit, and hospital admission.',
    ],
  },
];

// Welcome / Pre-Visit prep form payload
export const welcomePrepIntro =
  'Managing medications can be overwhelming. This specialized nursing audit is designed to bring you peace of mind, simplify your daily routine, and ensure you are taking your medications safely. Please review this checklist before your nurse arrives so we can make the most of our time together.';

export const welcomePrepSections: {
  number: string;
  heading: string;
  intro?: string;
  items: { bold: string; text: string }[];
}[] = [
  {
    number: '1',
    heading: 'Before Your Nurse Arrives',
    intro: 'Pre-Visit Prep',
    items: [
      {
        bold: 'Call Your Pharmacy.',
        text: 'Contact your primary pharmacy and ask them to print a "Master Medication Profile" for you. Please have this paper copy ready on the table for the nurse.',
      },
      {
        bold: 'Sign the Consent Form.',
        text: 'You or your Substitute Decision Maker (SDM) must sign and return the Informed Consent Form using our secure online link before the scheduled home visit.',
      },
    ],
  },
  {
    number: '2',
    heading: 'What We Will Do Together',
    intro: 'In Your Home',
    items: [
      {
        bold: 'The Reconciliation.',
        text: 'Please gather absolutely everything you take and lay it out on the table. This includes all current prescription bottles, blister packs, inhalers, over-the-counter (OTC) vitamins, creams, and herbal supplements.',
      },
      {
        bold: 'The Count.',
        text: 'The nurse will carefully check your remaining pills or blister slots against the dates on your labels. This helps us quietly discover if any doses are accidentally being missed or doubled up.',
      },
      {
        bold: 'Storage & Expiry Check.',
        text: 'We will review where your medications are kept. The nurse will help you flag potential safety issues, such as expired liquids, medications that accidentally missed being refrigerated, or pills that need safer storage.',
      },
    ],
  },
  {
    number: '3',
    heading: 'Talking About Your Routine',
    intro: 'Health Screening',
    items: [
      {
        bold: 'Physical Ease.',
        text: 'We will look at whether you can comfortably read the print on the labels, physically pop the pills out of the plastic slots, or easily open the bottles.',
      },
      {
        bold: 'Your Understanding.',
        text: 'We will gently review your pills to make sure you remember exactly why you are taking each one.',
      },
      {
        bold: 'Side Effects.',
        text: 'We will talk about how you feel after taking your medication. We want to check for annoying side effects like dizziness, nausea, or a very dry mouth that might be causing you to want to skip a dose.',
      },
    ],
  },
  {
    number: '4',
    heading: 'Closing the Loop',
    intro: 'Your Custom Report',
    items: [
      {
        bold: 'The Clinical Review.',
        text: 'After the visit, your nurse will compile all of the pill counts and notes into a private, secure health report.',
      },
      {
        bold: 'Doctor Notification.',
        text: 'If the nurse finds any concerning discrepancies — such as accidentally skipping a vital blood thinner or doubling up on a blood pressure pill — we will encrypt the report and send it directly to your primary doctor or our partner physician for immediate, safe guidance.',
      },
    ],
  },
];

export const welcomePrepScopeNote =
  'A Quick Reminder on Our Scope of Practice: Your independent nurse is an expert evaluator and educator. Nurses do not change your doses or write new prescriptions. Any adjustments or corrections discovered during this audit will be sent directly to your doctor, who holds the final authority over your treatment plan. We look forward to working alongside you to keep your health safe and structured.';

export const fridgeColumns = [
  'Medication',
  'Strength',
  'How to take it',
  'When to take it',
  'Special notes',
];

// Client & Family Feedback form payload (post-visit)
export const feedbackIntro =
  'Thank you for choosing Nurses Inc. to support your family\u2019s care journey. Your feedback helps us maintain the highest quality of nursing care and service in New Brunswick. Please take a few moments to share your experience with us.';

export const feedbackInfoFields = [
  'Client or Family Representative Name',
  'Date of Visit',
  'Name of Visiting Nurse',
];

export type FeedbackQuestion = {
  prompt: string;
  options: string[];
};

export const feedbackQuestions: FeedbackQuestion[] = [
  {
    prompt:
      'The pre-visit preparation instructions were clear, and I knew exactly what to have ready.',
    options: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree'],
  },
  {
    prompt:
      'The nurse was respectful, polite, and made us feel comfortable while sorting through our medications.',
    options: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree'],
  },
  {
    prompt:
      'The nurse explained things in simple, easy-to-understand language without confusing medical jargon.',
    options: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree'],
  },
  {
    prompt:
      'This visit increased our peace of mind regarding managing dementia, behaviors, or mental health routines at home.',
    options: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Not Applicable'],
  },
  {
    prompt:
      'I feel more confident now about our daily medication routine, physical storage, and safety.',
    options: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree'],
  },
];

export const feedbackOpenQuestions = [
  'What was the most helpful part of the nurse\u2019s visit today?',
  'Is there anything we could improve to make this process easier or more comfortable for seniors and caregivers?',
];

export const feedbackRecommendOptions = ['Yes', 'No', 'Undecided'];

export const feedbackMarketingNote =
  'We love sharing success stories to help other families find us. If you are comfortable with us using your positive comments anonymously on our website, please check the box below.';

export const feedbackMarketingConsent =
  'Yes, Nurses Inc. has permission to share my written comments anonymously on their professional website or informational materials.';

export const feedbackClosingNote =
  'Thank you for your valuable feedback. Please return this completed form to your nurse or submit it via your secure online client portal.';

// Emergency Contact Card payload
export const emergencyCardIntro =
  'Print this card and keep one in the wallet, one on the fridge, and one in the medication bag. In an emergency, first responders need to know who to call and what conditions the person has — in seconds, not minutes.';

export const emergencyCardFields: { label: string; placeholder: string }[] = [
  { label: 'Patient Full Name', placeholder: '' },
  { label: 'Date of Birth', placeholder: 'YYYY-MM-DD' },
  { label: 'PHN / Medicare Card Number', placeholder: '' },
  { label: 'Primary Diagnosis / Reason for Care', placeholder: '' },
  { label: 'Allergies (medication + food)', placeholder: '' },
  { label: 'Blood Type', placeholder: '' },
  { label: 'DNR / Goals of Care Designation', placeholder: '' },
];

export const emergencyCardContacts: { label: string; sublabel: string }[] = [
  { label: 'Substitute Decision Maker (Primary)', sublabel: 'Name · Relationship · Phone · Alt. Phone' },
  { label: 'Substitute Decision Maker (Backup)', sublabel: 'Name · Relationship · Phone · Alt. Phone' },
  { label: 'Family Doctor / Primary Care Provider', sublabel: 'Clinic Name · Doctor · Phone · Address' },
  { label: 'Pharmacy', sublabel: 'Name · Phone · Address' },
  { label: 'Specialist(s)', sublabel: 'e.g. Cardiology, Geriatrics, Psychiatry' },
  { label: 'Home-Care Agency / Visiting Nurse', sublabel: 'Agency · Nurse · Phone' },
  { label: 'Nearest Hospital Emergency Department', sublabel: 'Name · Address · Phone' },
  { label: 'Power of Attorney for Care', sublabel: 'Name · Phone' },
];

export const emergencyCardFooter =
  'Carry this card with you at all times. Update it whenever medications, doctors, or emergency contacts change.';

// Side-Effect Tracker payload
export const sideEffectTrackerIntro =
  'Use this log to track how the person you care for feels after taking new medications, after dose changes, or whenever something seems off. Bring the completed log to your next appointment or to your visiting nurse.';

export const sideEffectTrackerHeaders = [
  'Date / Time',
  'Medication + Dose',
  'Symptom or Reaction',
  'Severity (1–5)',
  'Action Taken',
];

export const sideEffectTrackerSeverityLabels = [
  '1 — Mild (noticed, no impact)',
  '2 — Moderate (some discomfort)',
  '3 — Concerning (affects daily life)',
  '4 — Severe (needs prescriber call)',
  '5 — Emergency (call 911 / go to ER)',
];

export const sideEffectTrackerPrompt = 'Common things to watch for:';
export const sideEffectTrackerWatchlist = [
  'Dizziness or unsteadiness on standing',
  'Confusion, fogginess, or memory changes',
  'Nausea, vomiting, or appetite loss',
  'Dry mouth, constipation, or urinary changes',
  'New falls, near-falls, or weakness',
  'Mood changes — sadness, anxiety, agitation',
  'Skin rash, swelling, or breathing changes',
  'Sleep changes — insomnia or excessive drowsiness',
];

// Doctor Visit Preparation Sheet payload
export const doctorVisitPrepIntro =
  'A 10-minute appointment goes a long way when you bring the right information. Fill this out the night before, bring two copies — one for you, one for the doctor.';

export const doctorVisitPrepSections = [
  {
    number: '1',
    heading: 'About This Visit',
    fields: ['Date & time of appointment', 'Doctor / clinic name', 'Reason for this visit'],
  },
  {
    number: '2',
    heading: 'Top 3 Concerns (in your own words)',
    fields: ['1. Most important concern today', '2. Second concern', '3. Third concern'],
  },
  {
    number: '3',
    heading: 'Questions for the Doctor',
    fields: ['1.', '2.', '3.', '4.', '5.'],
  },
  {
    number: '4',
    heading: 'Changes Since Last Visit',
    fields: [
      'New symptoms or behaviours',
      'Recent falls or near-falls',
      'Changes in weight, appetite, or sleep',
      'Hospital / ER visits since last visit',
      'New medications or dose changes',
      'New allergies or side effects',
    ],
  },
  {
    number: '5',
    heading: 'Current Medications',
    fields: ['Attach the Medication Inventory (Form 2) or write changes here'],
  },
  {
    number: '6',
    heading: 'Recent Vitals (if measured at home)',
    fields: ['Blood pressure', 'Heart rate', 'Weight', 'Blood sugar (if applicable)'],
  },
  {
    number: '7',
    heading: 'What I Want From This Visit',
    fields: ['My goal for today is…'],
  },
];

// Common APA references shared by every form (condensed)
export const medFormReferences: string[] = [
  'American Geriatrics Society Beers Criteria® Update Expert Panel. (2023). AGS 2023 updated Beers Criteria® for PIM use in older adults. J Am Geriatr Soc, 71(7), 2052–2081. https://doi.org/10.1111/jgs.18372',
  'O\u2019Mahony, D., et al. (2023). STOPP/START criteria v3. Eur Geriatr Med, 14(4). https://doi.org/10.1007/s41999-023-00777-y',
  'Canadian Institute for Health Information. (2022). Drug use among seniors in Canada, 2021. https://www.cihi.ca/en/drug-use-among-seniors-in-canada',
  'Choosing Wisely Canada & Canadian Geriatrics Society. (2025). Geriatrics: Twelve tests and treatments to question. https://choosingwiselycanada.org/recommendation/geriatrics/',
  'Deprescribing.org. (2024). Deprescribing guidelines and algorithms. Bruyère Research Institute. https://deprescribing.org/resources/deprescribing-guidelines-algorithms/',
  'Registered Nurses\u2019 Association of Ontario. (2023). Transitions in care and services (2nd ed.). https://rnao.ca/bpg/guidelines/care-transitions',
];