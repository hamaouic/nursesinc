/**
 * Nurses Inc. — Diabetes Reference Registry
 * Last reviewed Aug 2026.
 *
 * Audience: LPNs / RNs / partner physicians.
 * Includes:
 *  - BG interpretation bands (fasting / random / A1C) used by the live BG calculator.
 *  - Insulin pharmacology — onset, peak, duration, role.
 *  - Hypo / hyper clinical cues & escalation paths.
 *  - Sick-day rules, ketone monitoring, foot care, and scope-of-practice notes.
 *
 * Reference ranges are typical adult / non-pregnant values. Paediatric
 * targets and pregnancy targets are intentionally excluded — those depend
 * on the prescriber's order and Diabetes Canada / ISPAD 2024 guidance.
 */

export type DiabetesTopicId =
  | 'overview'
  | 'insulins'
  | 'oral-agents'
  | 'monitoring'
  | 'hypo-hyper'
  | 'sick-days'
  | 'foot-care'
  | 'scope';

export type DiabetesTopic = {
  id: DiabetesTopicId;
  title: string;
  summary: string;
  bullets: string[];
};

export const diabetesTopics: DiabetesTopic[] = [
  {
    id: 'overview',
    title: 'What is Diabetes',
    summary:
      'A chronic condition of disordered glucose regulation. Three big buckets a nurse meets on the floor.',
    bullets: [
      'Type 1 — autoimmune destruction of β-cells. Absolute insulin deficiency. Almost always insulin-dependent.',
      'Type 2 — insulin resistance plus relative deficiency. Often starts with lifestyle + oral agents; many patients eventually need insulin.',
      'Gestational diabetes — first recognised in pregnancy; resolves postpartum in most but raises lifetime T2 risk.',
      'Other — pancreatitis, steroid-induced, MODY, post-transplant.',
    ],
  },
  {
    id: 'insulins',
    title: 'Insulins on the Market',
    summary:
      'Four functional buckets — bolus (rapid), prandial (short), basal (intermediate / long), and premixed. Always confirm the brand name against the MAR before administration.',
    bullets: [
      'Rapid-acting (NovoRapid®, Humalog®, Apidra®, Fiasp®) — give with the first bite of the meal. Covers the post-meal spike.',
      'Short-acting (Humulin® R, Novolin® ge Toronto) — regular insulin. Given 30 min before a meal. Used IVs in DKA / HHS protocols.',
      'Intermediate (Humulin® N, Novolin® ge NPH) — cloudy suspension. Basal coverage; usually BID. Roll gently to resuspend.',
      'Long-acting (Lantus®, Basaglar®, Levemir®, Tresiba®, Toujeo®) — peakless basal. Once daily (or BID for Levemir). Never mix in same syringe with another insulin.',
      'Premixed (NovoMix® 30, Humalog® Mix 25/50, Humulin® 30/70) — fixed ratio of basal + bolus. Convenient but inflexible — patient must eat on schedule.',
    ],
  },
  {
    id: 'oral-agents',
    title: 'Common Non-Insulin Agents',
    summary:
      'A quick mental map of the typical Type 2 toolbox. The MAR will say exactly which one.',
    bullets: [
      'Metformin — first-line. Decreases hepatic glucose output. Hold for IV contrast and if eGFR < 30.',
      'Sulfonylureas (gliclizide, glyburide) — stimulate β-cell insulin release. Risk of hypoglycaemia. Avoid in elderly.',
      'DPP-4 inhibitors (sitagliptin, linagliptin) — modest A1C effect, weight-neutral, low hypo risk.',
      'SGLT2 inhibitors (canagliflozin, dapagliflozin, empagliflozin) — renal glucose excretion. Risk of euglycemic DKA and GU infections.',
      'GLP-1 RAs (semaglutide, liraglutide, dulaglutide) — injectable incretins. Weight loss + A1C drop. Hold for pancreatitis history.',
    ],
  },
  {
    id: 'monitoring',
    title: 'Blood Glucose Monitoring',
    summary:
      'Glucose checks, ketones, A1C, and continuous glucose monitors (CGM). Know what each number tells you.',
    bullets: [
      'Capillary BG — point-in-time. Use the meter that matches the strip lot. Document with the meter serial if required.',
      'CGM (Dexcom G6/G7, FreeStyle Libre 2/3) — interstitial glucose, lags BG by 5–15 min during rapid change. Trend arrows drive insulin-dosing decisions per protocol.',
      'A1C — three-month average of BG. Order Q3 months for most, Q6 months if stable. Target usually ≤ 7 % for most adults.',
      'Ketones — check any BG > 14 mmol/L, any illness with vomiting, or any T1 patient not feeling right. β-hydroxybutyrate preferred over urine strips.',
      'Time-in-range (TIR) — new gold standard for CGM patients. Goal: ≥ 70 % of readings between 4 and 10 mmol/L.',
    ],
  },
  {
    id: 'hypo-hyper',
    title: 'Hypo & Hyper Patterns',
    summary:
      'What to spot, what to do, and when to escalate. Hypoglycaemia kills faster than hyperglycaemia.',
    bullets: [
      'Hypo (BG < 4 mmol/L) — rule of 15: 15 g fast carbs, wait 15 min, recheck. Repeat if still low. If unconscious, glucagon IM / SC or D50W IV per protocol.',
      'Severe hypo (< 2.8 mmol/L) — call rapid response, do not delay treatment. Always investigate cause (missed meal, dose error, exercise, sulphonylurea stacking).',
      'Hyper (BG > 14 mmol/L) — check ketones first. If positive → DKA / HHS pathway (call physician, fluids per order, insulin infusion). If negative → correction-dose insulin per sliding scale.',
      'Nocturnal hypo — classic in NPH peaks and after evening exercise. Sniff for sweating, nightmares; consider bedtime snack adjustment.',
      'Trending down fast on CGM (> 2 mmol/L in 20 min) — give preventive carbs. Do not wait for the low.',
    ],
  },
  {
    id: 'sick-days',
    title: 'Sick-Day Rules',
    summary:
      'Illness almost always raises BG. Stress hormones (cortisol, adrenaline) drive glucose up even if the patient is not eating.',
    bullets: [
      'Never stop basal insulin in Type 1 — DKA risk. Basal dose may even rise by 10–20 % under physician order.',
      'Check BG every 2–4 h. Check ketones every 4 h if BG > 14 or vomiting.',
      'Sick-day fluids: 250 mL sugar-free fluid per hour; plus sugary fluids if BG < 14 to keep calories in.',
      'Hold metformin if dehydrated, septic, or receiving IV contrast. SGLT2 inhibitors also paused during acute illness (DKA risk).',
      'When to escalate: any ketones > 1.5 mmol/L, persistent vomiting > 4 h, Kussmaul respirations, altered mental status.',
    ],
  },
  {
    id: 'foot-care',
    title: 'Foot Care & Skin',
    summary:
      'The reason most diabetics land in the ER for foot wounds, not glucose readings. Inspect every shift.',
    bullets: [
      'Inspect both feet every shift: between toes, plantar surface, heels. Use a penlight in dim rooms.',
      'Neuropathy = loss of protective sensation. 10 g monofilament test is the screening standard; document pass / fail per foot.',
      'Off-load any open wound immediately. No barefoot ambulation. No heating pads.',
      'Skin: keep clean and dry. Moisturise (not between toes). Fungal infections need prompt treatment.',
      'Patient education: do not cut own nails, do not soak feet, do not ignore a "small" cut.',
    ],
  },
  {
    id: 'scope',
    title: 'Scope of Practice',
    summary:
      'What nurses can and cannot do in diabetes care at Nurses Inc.',
    bullets: [
      'You can: check BG, administer insulin and oral agents per MAR, teach glucometer use, recognise and treat hypo per protocol, document.',
      'You cannot: independently adjust insulin doses, change oral agents, or start new glucose-lowering therapy. Escalate to physician / NP.',
      'PHIPAA alignment: BG values, insulin dosing, and CGM downloads are personal health information — minimum necessary disclosure only.',
      'Always escalate: any BG < 2.8 or > 25 mmol/L, ketones > 1.5 mmol/L, symptomatic hypo or hyper, new foot wound, signs of DKA / HHS.',
    ],
  },
];

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Insulin registry — pharmacology table the nurse can search and filter     */
/* ──────────────────────────────────────────────────────────────────────────── */

export type InsulinCategory =
  | 'rapid'
  | 'short'
  | 'intermediate'
  | 'long'
  | 'premix'
  | 'basal-analog';

export type InsulinEntry = {
  /** Slug used in URLs / keys. */
  id: string;
  /** Brand or generic name. */
  brand: string;
  /** Generic name. */
  generic: string;
  category: InsulinCategory;
  /** Time to onset of action after SC injection (minutes). */
  onsetMin: number;
  /** Time to peak action (hours). */
  peakHr: number | null;
  /** Total duration of action (hours). */
  durationHr: number;
  /** Whether it can be mixed with other insulins in the same syringe. */
  mixable: boolean;
  /** Whether it can be given IV. */
  ivSafe: boolean;
  /** Typical clinical role. */
  role: string;
  /** Patient-teaching pearls. */
  pearls: string[];
};

export const insulins: InsulinEntry[] = [
  {
    id: 'novorapid',
    brand: 'NovoRapid®',
    generic: 'insulin aspart',
    category: 'rapid',
    onsetMin: 10,
    peakHr: 1,
    durationHr: 3,
    mixable: false,
    ivSafe: false,
    role: 'Bolus coverage at meals. Standard prandial insulin for most patients on MDI.',
    pearls: [
      'Give within 5 min of the first bite of food.',
      'Store opened cartridge at room temperature; discard after 28 days.',
    ],
  },
  {
    id: 'humalog',
    brand: 'Humalog®',
    generic: 'insulin lispro',
    category: 'rapid',
    onsetMin: 15,
    peakHr: 1,
    durationHr: 3,
    mixable: false,
    ivSafe: false,
    role: 'Bolus coverage at meals. Equivalent profile to NovoRapid; patient may switch brands only on physician order.',
    pearls: [
      'Bioequivalent to aspart when dosed properly — never assume doses are interchangeable without an order.',
    ],
  },
  {
    id: 'apidra',
    brand: 'Apidra®',
    generic: 'insulin glulisine',
    category: 'rapid',
    onsetMin: 10,
    peakHr: 1,
    durationHr: 4,
    mixable: false,
    ivSafe: false,
    role: 'Bolus coverage. Sometimes chosen when patient has local reactions to aspart / lispro.',
    pearls: [
      'Compatible with insulin pumps.',
    ],
  },
  {
    id: 'fiasp',
    brand: 'Fiasp®',
    generic: 'insulin aspart (with niacinamide)',
    category: 'rapid',
    onsetMin: 4,
    peakHr: 1,
    durationHr: 3,
    mixable: false,
    ivSafe: false,
    role: 'Faster-onset aspart. Useful for post-prandial dosing or for very picky eaters.',
    pearls: [
      'Do not use in pregnancy unless explicitly ordered.',
    ],
  },
  {
    id: 'humulin-r',
    brand: 'Humulin® R',
    generic: 'regular insulin',
    category: 'short',
    onsetMin: 30,
    peakHr: 2,
    durationHr: 6,
    mixable: true,
    ivSafe: true,
    role: 'Prandial coverage with a longer lead-in than rapid analogs. Also the IV insulin of choice for DKA / HHS.',
    pearls: [
      'Give 30 min before eating — missing the timing crashes the post-meal curve.',
      'Clear solution — safe to give IV in critical care settings.',
    ],
  },
  {
    id: 'novolin-toronto',
    brand: 'Novolin® ge Toronto',
    generic: 'regular insulin',
    category: 'short',
    onsetMin: 30,
    peakHr: 2,
    durationHr: 6,
    mixable: true,
    ivSafe: true,
    role: 'Prandial + IV use. Generic / lower-cost option; same molecule as Humulin R.',
    pearls: [
      'The default "regular insulin" on most hospital MARs.',
    ],
  },
  {
    id: 'humulin-n',
    brand: 'Humulin® N',
    generic: 'NPH insulin',
    category: 'intermediate',
    onsetMin: 90,
    peakHr: 6,
    durationHr: 18,
    mixable: true,
    ivSafe: false,
    role: 'Basal coverage. Cloudy suspension; usually BID. Cheap and predictable for many patients.',
    pearls: [
      'Roll gently (do not shake) to resuspend before drawing up.',
      'Peaks mid-day — schedule snack to avoid hypo around the peak.',
    ],
  },
  {
    id: 'novolin-nph',
    brand: 'Novolin® ge NPH',
    generic: 'NPH insulin',
    category: 'intermediate',
    onsetMin: 90,
    peakHr: 6,
    durationHr: 18,
    mixable: true,
    ivSafe: false,
    role: 'Basal coverage. Generic alternative to Humulin N.',
    pearls: [
      'Same molecule as Humulin N — different brand, same precautions.',
    ],
  },
  {
    id: 'lantus',
    brand: 'Lantus®',
    generic: 'insulin glargine (U-100)',
    category: 'long',
    onsetMin: 90,
    peakHr: null,
    durationHr: 24,
    mixable: false,
    ivSafe: false,
    role: 'Peakless basal, once daily. The most-prescribed basal in Canada.',
    pearls: [
      'Never mix with another insulin in the same syringe.',
      'Consistent bedtime dosing helps reduce nocturnal hypo.',
    ],
  },
  {
    id: 'basaglar',
    brand: 'Basaglar®',
    generic: 'insulin glargine (biosimilar)',
    category: 'long',
    onsetMin: 90,
    peakHr: null,
    durationHr: 24,
    mixable: false,
    ivSafe: false,
    role: 'Biosimilar to Lantus. Lower-cost option; same dosing rules.',
    pearls: [
      'Same molecule as Lantus — usually interchangeable on prescriber order.',
    ],
  },
  {
    id: 'levemir',
    brand: 'Levemir®',
    generic: 'insulin detemir',
    category: 'long',
    onsetMin: 90,
    peakHr: null,
    durationHr: 18,
    mixable: false,
    ivSafe: false,
    role: 'Peakless basal. Some patients split into BID for better coverage.',
    pearls: [
      'If BG drifts up before the next dose, the physician may split to BID.',
    ],
  },
  {
    id: 'tresiba',
    brand: 'Tresiba®',
    generic: 'insulin degludec',
    category: 'long',
    onsetMin: 60,
    peakHr: null,
    durationHr: 42,
    mixable: false,
    ivSafe: false,
    role: 'Ultra-long basal. Tolerant of dose-timing variations — useful for shift workers or patients with erratic schedules.',
    pearls: [
      'Up to 8 hours of dose-timing flexibility per the manufacturer.',
    ],
  },
  {
    id: 'toujeo',
    brand: 'Toujeo®',
    generic: 'insulin glargine (U-300)',
    category: 'long',
    onsetMin: 360,
    peakHr: null,
    durationHr: 36,
    mixable: false,
    ivSafe: false,
    role: 'Concentrated Lantus (U-300). Used in patients needing large basal doses in a single injection.',
    pearls: [
      'Same molecule as Lantus but concentrated 3× — never substitute U-100 for U-300 without an order.',
    ],
  },
  {
    id: 'novomix-30',
    brand: 'NovoMix® 30',
    generic: 'biphasic insulin aspart',
    category: 'premix',
    onsetMin: 10,
    peakHr: 4,
    durationHr: 24,
    mixable: false,
    ivSafe: false,
    role: '30 % rapid aspart + 70 % intermediate. BID with meals. Convenient for patients with predictable routines.',
    pearls: [
      'Patient MUST eat on schedule — sliding the meal crashes into a hypo.',
    ],
  },
  {
    id: 'humalog-mix25',
    brand: 'Humalog® Mix 25',
    generic: 'biphasic insulin lispro',
    category: 'premix',
    onsetMin: 15,
    peakHr: 3,
    durationHr: 22,
    mixable: false,
    ivSafe: false,
    role: '25 % lispro + 75 % intermediate. BID dosing.',
    pearls: [
      'Not the same as Humalog alone — never substitute without an order.',
    ],
  },
  {
    id: 'humalog-mix50',
    brand: 'Humalog® Mix 50',
    generic: 'biphasic insulin lispro',
    category: 'premix',
    onsetMin: 15,
    peakHr: 2,
    durationHr: 16,
    mixable: false,
    ivSafe: false,
    role: '50 % lispro + 50 % intermediate. Used when post-prandial control is the dominant problem.',
    pearls: [
      'BID. Patient must eat at each dose.',
    ],
  },
  {
    id: 'humulin-30-70',
    brand: 'Humulin® 30/70',
    generic: 'biphasic regular + NPH',
    category: 'premix',
    onsetMin: 30,
    peakHr: 4,
    durationHr: 24,
    mixable: false,
    ivSafe: false,
    role: '30 % regular + 70 % NPH. Low-cost BID option.',
    pearls: [
      'Roll to resuspend. Always shake test gently before drawing.',
    ],
  },
];

export const insulinCategoryLabels: Record<InsulinCategory, string> = {
  rapid: 'Rapid-acting',
  short: 'Short-acting',
  intermediate: 'Intermediate',
  long: 'Long-acting',
  'basal-analog': 'Basal analog',
  premix: 'Premixed',
};

export const insulinCategoryTones: Record<InsulinCategory, string> = {
  rapid: 'bg-blush-100 text-blush-500 ring-blush-200',
  short: 'bg-blush-50 text-blush-500 ring-blush-100',
  intermediate: 'bg-cream-100 text-ink-700 ring-cream-200',
  long: 'bg-mint-100 text-mint-500 ring-mint-200',
  'basal-analog': 'bg-mint-100 text-mint-500 ring-mint-200',
  premix: 'bg-purple-100 text-purple-700 ring-purple-200',
};

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Blood-glucose calculator                                                   */
/*  All values are mmol/L — Canada / international standard.                  */
/* ──────────────────────────────────────────────────────────────────────────── */

export type BgContext = 'fasting' | 'random' | 'before-meal' | 'bedtime';
export type BgBand = 'severe-low' | 'low' | 'in-range' | 'high' | 'severe-high';

export type BgRangeRow = {
  context: BgContext;
  label: string;
  severeLow: number;
  low: number;
  high: number;
  severeHigh: number;
};

export const bgRanges: BgRangeRow[] = [
  {
    context: 'fasting',
    label: 'Fasting (no food ≥ 8 h)',
    severeLow: 2.8,
    low: 4.0,
    high: 7.0,
    severeHigh: 13.9,
  },
  {
    context: 'before-meal',
    label: 'Pre-meal (AC)',
    severeLow: 2.8,
    low: 4.0,
    high: 7.0,
    severeHigh: 13.9,
  },
  {
    context: 'random',
    label: 'Random / post-prandial (2 h PC)',
    severeLow: 2.8,
    low: 4.0,
    high: 10.0,
    severeHigh: 14.0,
  },
  {
    context: 'bedtime',
    label: 'Bedtime',
    severeLow: 2.8,
    low: 5.0,
    high: 10.0,
    severeHigh: 14.0,
  },
];

export type BgInterpretation = {
  band: BgBand;
  label: string;
  tone: string;
  guidance: string;
  escalate: string;
};

export function interpretBg(mmolL: number, context: BgContext): BgInterpretation {
  const row = bgRanges.find((r) => r.context === context)!;
  if (mmolL < row.severeLow) {
    return {
      band: 'severe-low',
      label: 'Severe hypoglycaemia',
      tone: 'bg-rose-100 text-rose-700 ring-rose-300',
      guidance: 'Treat immediately. Conscious → 15 g fast carbs + recheck in 15 min. Unconscious → glucagon IM / SC or D50W IV per protocol.',
      escalate: 'Call rapid response if BG < 2.8 mmol/L, loss of consciousness, or seizures.',
    };
  }
  if (mmolL < row.low) {
    return {
      band: 'low',
      label: 'Hypoglycaemia',
      tone: 'bg-amber-100 text-amber-700 ring-amber-300',
      guidance: 'Rule of 15 — 15 g fast carbs, wait 15 min, recheck. Repeat if still low. Investigate cause (missed meal, exercise, dose error).',
      escalate: 'Notify physician if patient cannot tolerate oral carbs or hypo is recurrent.',
    };
  }
  if (mmolL <= row.high) {
    return {
      band: 'in-range',
      label: 'In range',
      tone: 'bg-mint-100 text-mint-700 ring-mint-300',
      guidance: 'Within target. Continue current plan. Reassess on routine schedule.',
      escalate: 'No escalation needed — recheck per protocol.',
    };
  }
  if (mmolL <= row.severeHigh) {
    return {
      band: 'high',
      label: 'Hyperglycaemia',
      tone: 'bg-amber-100 text-amber-700 ring-amber-300',
      guidance: 'Assess hydration, mental status, recent meals. Consider correction-dose insulin per sliding-scale order.',
      escalate: 'Notify physician if persistent > 14 mmol/L, symptomatic, or ketones positive.',
    };
  }
  return {
    band: 'severe-high',
    label: 'Severe hyperglycaemia',
    tone: 'bg-rose-100 text-rose-700 ring-rose-300',
    guidance: 'Risk of DKA / HHS. Check ketones immediately. Initiate fluid + insulin per protocol.',
    escalate: 'Call physician NOW. Patient needs urgent review — do not delay.',
  };
}

/**
 * Compact tone set used for the BG input chip and trend row.
 * Tailwind utility classes only — keep them string-literal so the JIT picks
 * them up. If you add a new band, add the tone here too.
 */
export const bgBandTones: Record<BgBand, string> = {
  'severe-low': 'bg-blush-200 text-blush-500 ring-blush-300',
  low: 'bg-blush-100 text-blush-500 ring-blush-200',
  'in-range': 'bg-mint-100 text-mint-500 ring-mint-200',
  high: 'bg-blush-50 text-blush-500 ring-blush-100',
  'severe-high': 'bg-blush-200 text-blush-500 ring-blush-300',
};