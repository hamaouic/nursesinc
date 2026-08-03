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
  | 'inventory'
  | 'beers'
  | 'stopp-start'
  | 'polypharmacy'
  | 'symptom-cause'
  | 'deprescribing-algorithms'
  | 'deprescribing-conversation'
  | 'empower-brochures'
  | 'adherence-safety'
  | 'fridge-list';

export type MedFormMeta = {
  id: MedFormId;
  number: string; // 1., 2., ...
  title: string;
  shortTitle: string;
  audience: string;
  filename: string;
  icon: string;
  accent: 'blush' | 'mint' | 'cream';
  summary: string[];
};

export const medForms: Record<MedFormId, MedFormMeta> = {
  inventory: {
    id: 'inventory',
    number: '1',
    title: 'Medication Inventory',
    shortTitle: 'List of current medications',
    audience: 'Form · Families',
    filename: 'Nurses-Inc-Form-1-Medication-Inventory.pdf',
    icon: 'Pill',
    accent: 'blush',
    summary: [
      '10-column table: name, route, dose, time, prescriber, expiry',
      '16 blank rows — one medication per row',
    ],
  },
  beers: {
    id: 'beers',
    number: '2',
    title: 'Beers Criteria® 2023 — Quick Reference',
    shortTitle: 'Potentially inappropriate medications for adults 65+',
    audience: 'Reference · Nurses',
    filename: 'Nurses-Inc-Form-2-Beers-Criteria-Reference.pdf',
    icon: 'BookOpen',
    accent: 'mint',
    summary: [
      '12 high-yield Beers flag categories',
      'Designed for use during medication review',
    ],
  },
  'stopp-start': {
    id: 'stopp-start',
    number: '3',
    title: 'STOPP/START Version 3 — Quick Reference',
    shortTitle: 'STOPP / START prescribing screens',
    audience: 'Reference · Nurses',
    filename: 'Nurses-Inc-Form-3-STOPP-START-Reference.pdf',
    icon: 'BookOpen',
    accent: 'mint',
    summary: [
      '8 STOPP criteria + 6 START criteria',
      'European Geriatric Medicine v3 evidence',
    ],
  },
  polypharmacy: {
    id: 'polypharmacy',
    number: '4',
    title: 'Polypharmacy & Deprescribing',
    shortTitle: 'Clinical reference',
    audience: 'Reference · Nurses',
    filename: 'Nurses-Inc-Form-4-Polypharmacy-Deprescribing.pdf',
    icon: 'BookOpen',
    accent: 'cream',
    summary: [
      'CIHI ≥10-class polypharmacy threshold',
      'Bruyère 3-question deprescribing framework',
    ],
  },
  'symptom-cause': {
    id: 'symptom-cause',
    number: '5',
    title: 'New Symptom → Medication Cause?',
    shortTitle: 'Symptom causation form',
    audience: 'Form · Nurses',
    filename: 'Nurses-Inc-Form-5-Symptom-Cause.pdf',
    icon: 'FileText',
    accent: 'blush',
    summary: [
      '4 symptom-entry cards per page',
      'Date, description, suspected med, action, outcome',
    ],
  },
  'deprescribing-algorithms': {
    id: 'deprescribing-algorithms',
    number: '6',
    title: 'Deprescribing Algorithms (Bruyère / Deprescribing.org)',
    shortTitle: '4 drug-class deprescribing steps',
    audience: 'Reference · Nurses',
    filename: 'Nurses-Inc-Form-6-Deprescribing-Algorithms.pdf',
    icon: 'BookOpen',
    accent: 'cream',
    summary: [
      'PPI · Benzodiazepines & Z-drugs',
      'Antipsychotics · Statins',
    ],
  },
  'deprescribing-conversation': {
    id: 'deprescribing-conversation',
    number: '7',
    title: 'Schedule a Deprescribing Conversation',
    shortTitle: 'Conversation scheduler',
    audience: 'Form · Families',
    filename: 'Nurses-Inc-Form-7-Deprescribing-Conversation.pdf',
    icon: 'FileText',
    accent: 'blush',
    summary: [
      'Patient & prescriber details',
      'Top 3 medications + questions + action items',
    ],
  },
  'empower-brochures': {
    id: 'empower-brochures',
    number: '8',
    title: 'EMPOWER Brochure Series',
    shortTitle: 'Patient handouts for safe deprescribing',
    audience: 'Reference · Nurses',
    filename: 'Nurses-Inc-Form-8-EMPOWER-Brochures.pdf',
    icon: 'BookOpen',
    accent: 'cream',
    summary: [
      'PPI · Benzodiazepines · Antipsychotics · Statins',
      'Sulfonylureas · Cholinesterase inhibitors',
    ],
  },
  'adherence-safety': {
    id: 'adherence-safety',
    number: '9',
    title: 'Adherence & Safety Audit',
    shortTitle: 'Chain of administration · Storage · Expiry',
    audience: 'Form · Nurses',
    filename: 'Nurses-Inc-Form-9-Adherence-Safety.pdf',
    icon: 'FileText',
    accent: 'mint',
    summary: [
      'Chain of administration',
      'Storage rules · Expiry audit · Reference lists',
    ],
  },
  'fridge-list': {
    id: 'fridge-list',
    number: '10',
    title: 'Fridge Medication List',
    shortTitle: 'Quick-reference emergency list',
    audience: 'Form · Families',
    filename: 'Nurses-Inc-Form-10-Fridge-List.pdf',
    icon: 'BookOpen',
    accent: 'blush',
    summary: [
      '5-column quick-reference table',
      'Allergies + emergency contact strip',
    ],
  },
};

export const medFormList: MedFormMeta[] = [
  medForms.inventory,
  medForms.beers,
  medForms['stopp-start'],
  medForms.polypharmacy,
  medForms['symptom-cause'],
  medForms['deprescribing-algorithms'],
  medForms['deprescribing-conversation'],
  medForms['empower-brochures'],
  medForms['adherence-safety'],
  medForms['fridge-list'],
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

export const fridgeColumns = [
  'Medication',
  'Strength',
  'How to take it',
  'When to take it',
  'Special notes',
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