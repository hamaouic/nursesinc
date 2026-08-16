/**
 * Nurses Inc. — Vital signs reference (clinician-grade).
 *
 * Used by the "Vitals" tab on /forms.
 *
 * AUDIENCE: LPNs, RNs, partner physicians.
 *
 * Each entry includes:
 *  - vital sign name + acronym
 *  - body system
 *  - normal range (split into adult / pediatric)
 *  - what LOW means (clinical significance + sample action)
 *  - what HIGH means (clinical significance + sample action)
 *  - when to escalate
 *  - brief notes on measurement conditions
 *
 * ⚠️ Reference ranges are intentionally broad and age-grouped. Always
 * compare against the patient's full clinical picture, recent trend,
 * facility protocol, and the ordering physician's standing orders.
 * Last reviewed Aug 2026.
 */

export type VitalsAgeGroup = 'adult' | 'pediatric';

export type VitalsSystem =
  | 'cardiovascular'
  | 'respiratory'
  | 'thermoregulation'
  | 'metabolic'
  | 'neurological'
  | 'anthropometric';

export type VitalRange = {
  /** Lower bound of the in-range interval. Inclusive. */
  low: number;
  /** Upper bound of the in-range interval. Inclusive. */
  high: number;
  /** Unit string (e.g. "mmHg", "°C", "bpm"). */
  unit: string;
};

export type VitalBand = {
  /** Brief label shown on the band chip. */
  label: string;
  /** Tailwind colour classes (background + foreground). */
  tone: string;
  /** Optional caption shown under the number. */
  caption: string;
};

export type VitalEntry = {
  id: string;
  name: string;
  acronym?: string;
  system: VitalsSystem;
  /** Short patient-friendly sentence. */
  summary: string;
  /** Adult normal range. */
  adult: VitalRange;
  /** Pediatric range — keyed by age sub-group (years). */
  pediatric: PediatricRanges;
  /** What LOW means clinically. */
  low: {
    explanation: string;
    /** Soft colour tone for the "low" band. */
    tone: string;
    /** When to escalate (e.g. "Notify physician if SBP < 90"). */
    escalate: string;
  };
  /** What HIGH means clinically. */
  high: {
    explanation: string;
    tone: string;
    escalate: string;
  };
  /** Measurement pitfalls or situational notes. */
  notes?: string;
};

/**
 * Pediatric ranges follow age bands commonly used in clinical practice:
 *   neonate   — birth to 1 month
 *   infant    — 1 month to 1 year
 *   toddler   — 1 to 4 years
 *   preschool — 4 to 6 years
 *   school    — 6 to 12 years
 *   adolescent — 12 to 18 years
 *
 * Not every vital carries a meaningful value for every band; entries
 * without data for a specific age fall back to "consult pediatric
 * reference" — we never want to silently misreport a range.
 */
export type PediatricRanges = {
  neonate?: VitalRange;
  infant?: VitalRange;
  toddler?: VitalRange;
  preschool?: VitalRange;
  school?: VitalRange;
  adolescent?: VitalRange;
};

export const vitalAgeBands: { id: keyof PediatricRanges; label: string; sub: string }[] = [
  { id: 'neonate', label: 'Neonate', sub: '0 – 1 month' },
  { id: 'infant', label: 'Infant', sub: '1 month – 1 yr' },
  { id: 'toddler', label: 'Toddler', sub: '1 – 4 yrs' },
  { id: 'preschool', label: 'Preschool', sub: '4 – 6 yrs' },
  { id: 'school', label: 'School-age', sub: '6 – 12 yrs' },
  { id: 'adolescent', label: 'Adolescent', sub: '12 – 18 yrs' },
];

// ----------------------------------------------------------------------------
// Bands — uniform colour system so the in-card "low / in-range / high"
// pills are consistent across every vital.
// ----------------------------------------------------------------------------

export const bandTones = {
  low: 'bg-blush-100 text-blush-500 ring-blush-200',
  inRange: 'bg-mint-100 text-mint-600 ring-mint-200',
  high: 'bg-purple-100 text-purple-700 ring-purple-200',
  unknown: 'bg-ink-100 text-ink-500 ring-ink-200',
} as const;

// ----------------------------------------------------------------------------
// Reference data
// ----------------------------------------------------------------------------

export const vitals: VitalEntry[] = [
  {
    id: 'bp',
    name: 'Blood Pressure',
    acronym: 'BP',
    system: 'cardiovascular',
    summary:
      'The force of blood against your artery walls, written as systolic over diastolic. A core vital for tracking heart, kidney, and brain health.',
    adult: { low: 90, high: 130, unit: 'mmHg systolic' },
    pediatric: {
      neonate: { low: 60, high: 90, unit: 'mmHg systolic' },
      infant: { low: 70, high: 100, unit: 'mmHg systolic' },
      toddler: { low: 80, high: 110, unit: 'mmHg systolic' },
      preschool: { low: 80, high: 110, unit: 'mmHg systolic' },
      school: { low: 85, high: 115, unit: 'mmHg systolic' },
      adolescent: { low: 90, high: 120, unit: 'mmHg systolic' },
    },
    low: {
      explanation:
        'Low pressure (hypotension) can mean dehydration, sepsis, blood loss, cardiac events, or medication side effects. Patient may feel dizzy, faint, or confused.',
      tone: bandTones.low,
      escalate:
        'Notify physician immediately if SBP < 90 mmHg in an adult, or below the age-appropriate systolic floor, especially with symptoms.',
    },
    high: {
      explanation:
        'High pressure (hypertension) raises risk for stroke, heart attack, kidney damage, and vision loss. Often silent — measured, not felt.',
      tone: bandTones.high,
      escalate:
        'Hypertensive urgency (>180/120 with symptoms) is an emergency. Asymptomatic elevated readings should be reported per facility protocol.',
    },
    notes:
      'Use proper cuff size: bladder should cover ~80% of arm circumference. Wait 5 minutes after activity before measuring.',
  },
  {
    id: 'hr',
    name: 'Heart Rate',
    acronym: 'HR',
    system: 'cardiovascular',
    summary:
      'The number of times your heart beats per minute. Reflects cardiac rhythm and circulating demand.',
    adult: { low: 60, high: 100, unit: 'bpm' },
    pediatric: {
      neonate: { low: 100, high: 160, unit: 'bpm' },
      infant: { low: 90, high: 150, unit: 'bpm' },
      toddler: { low: 80, high: 130, unit: 'bpm' },
      preschool: { low: 70, high: 120, unit: 'bpm' },
      school: { low: 65, high: 110, unit: 'bpm' },
      adolescent: { low: 60, high: 105, unit: 'bpm' },
    },
    low: {
      explanation:
        'Bradycardia (slow rate) may reflect athletic conditioning, vagal response, beta-blocker medications, hypothyroidism, or heart block.',
      tone: bandTones.low,
      escalate:
        'Symptomatic bradycardia (dizziness, syncope, chest pain) needs immediate physician notification regardless of the number.',
    },
    high: {
      explanation:
        'Tachycardia (fast rate) is a non-specific sign — fever, dehydration, anxiety, pain, anemia, hyperthyroidism, arrhythmias, or medications.',
      tone: bandTones.high,
      escalate:
        'Sustained HR > 130 in a resting adult, or well above the age-expected range, warrants assessment and physician notification.',
    },
    notes:
      'Count for 30 seconds and double, or full 60 seconds if rhythm is irregular. Palpate radial or auscultate apex.',
  },
  {
    id: 'rr',
    name: 'Respiratory Rate',
    acronym: 'RR',
    system: 'respiratory',
    summary:
      'Number of breaths per minute. Often the earliest vital sign to change with clinical deterioration.',
    adult: { low: 12, high: 20, unit: 'breaths / min' },
    pediatric: {
      neonate: { low: 30, high: 60, unit: 'breaths / min' },
      infant: { low: 24, high: 50, unit: 'breaths / min' },
      toddler: { low: 22, high: 40, unit: 'breaths / min' },
      preschool: { low: 20, high: 30, unit: 'breaths / min' },
      school: { low: 18, high: 26, unit: 'breaths / min' },
      adolescent: { low: 14, high: 22, unit: 'breaths / min' },
    },
    low: {
      explanation:
        'Bradypnea may reflect opioid or sedative medication effect, neurologic injury, metabolic alkalosis, or severe hypothermia.',
      tone: bandTones.low,
      escalate:
        'RR < 8 in an adult, or sustained low rate with altered LOC, requires immediate escalation and possibly naloxone.',
    },
    high: {
      explanation:
        'Tachypnea is a sensitive sign of respiratory distress, sepsis, metabolic acidosis (Kussmaul respirations), pulmonary embolism, anxiety, or pain.',
      tone: bandTones.high,
      escalate:
        'RR > 24 in an adult, or above the age-expected range, especially with accessory muscle use or SpO2 drop, requires physician notification.',
    },
    notes:
      'Count unobtrusively while appearing to take the pulse. Patients often slow their breathing when aware of being watched.',
  },
  {
    id: 'spo2',
    name: 'Oxygen Saturation',
    acronym: 'SpO₂',
    system: 'respiratory',
    summary:
      'Percent of haemoglobin carrying oxygen, measured by pulse oximeter. Real-time view of oxygenation.',
    adult: { low: 95, high: 100, unit: '%' },
    pediatric: {
      neonate: { low: 90, high: 100, unit: '%' },
      infant: { low: 95, high: 100, unit: '%' },
      toddler: { low: 95, high: 100, unit: '%' },
      preschool: { low: 95, high: 100, unit: '%' },
      school: { low: 95, high: 100, unit: '%' },
      adolescent: { low: 95, high: 100, unit: '%' },
    },
    low: {
      explanation:
        'Hypoxemia may reflect V/Q mismatch, hypoventilation, diffusion impairment, or right-to-left shunt. Look at waveform — poor signal may read low without true hypoxia.',
      tone: bandTones.low,
      escalate:
        'SpO₂ < 90% on room air (or below baseline for known COPD patients) is a clinical emergency. Apply oxygen and notify physician.',
    },
    high: {
      explanation:
        'SpO₂ > 100% is not physiologically meaningful — the sensor cannot distinguish oxygen bound to haemoglobin from free oxygen. Treat as data validation only.',
      tone: bandTones.unknown,
      escalate:
        'High readings rarely need clinical action. Verify waveform and perfusion; check probe placement.',
    },
    notes:
      'Cold extremities, nail polish, low perfusion, and motion artifact all reduce accuracy. Use ear sensor for poor perfusion.',
  },
  {
    id: 'temp',
    name: 'Body Temperature',
    acronym: 'Temp',
    system: 'thermoregulation',
    summary:
      'Core body temperature. The set point that the hypothalamus defends within a tight range.',
    adult: { low: 36.1, high: 37.5, unit: '°C oral' },
    pediatric: {
      neonate: { low: 36.5, high: 37.5, unit: '°C rectal' },
      infant: { low: 36.5, high: 37.7, unit: '°C rectal' },
      toddler: { low: 36.0, high: 37.7, unit: '°C rectal' },
      preschool: { low: 36.0, high: 37.5, unit: '°C oral' },
      school: { low: 36.0, high: 37.5, unit: '°C oral' },
      adolescent: { low: 36.0, high: 37.5, unit: '°C oral' },
    },
    low: {
      explanation:
        'Hypothermia: slow metabolism, confusion, arrhythmias. Severe cases (<32°C) are life-threatening.',
      tone: bandTones.low,
      escalate:
        '<35°C warrants immediate warming measures + physician notification, especially with altered LOC or arrhythmias.',
    },
    high: {
      explanation:
        'Fever / hyperthermia: infection, inflammation, drug reaction, heat stroke, malignancy. In older adults, infection may present without high fever.',
      tone: bandTones.high,
      escalate:
        '>38.5°C in an adult (or any fever in a neonate) warrants physician notification. >41°C is a medical emergency.',
    },
    notes:
      'Method matters: rectal runs ~0.5°C higher than oral; tympanic and temporal roughly match core. Always document route.',
  },
  {
    id: 'glucose',
    name: 'Blood Glucose',
    acronym: 'BG / CBG',
    system: 'metabolic',
    summary:
      'Capillary glucose concentration, point-in-time view of circulating sugar. Critical for diabetes management.',
    adult: { low: 4.0, high: 7.8, unit: 'mmol/L fasting' },
    pediatric: {
      neonate: { low: 3.0, high: 7.0, unit: 'mmol/L' },
      infant: { low: 3.5, high: 8.5, unit: 'mmol/L' },
      toddler: { low: 3.5, high: 8.5, unit: 'mmol/L' },
      preschool: { low: 3.5, high: 9.0, unit: 'mmol/L' },
      school: { low: 3.5, high: 9.0, unit: 'mmol/L' },
      adolescent: { low: 3.9, high: 7.8, unit: 'mmol/L' },
    },
    low: {
      explanation:
        'Hypoglycaemia: sweaty, shaky, confused, irritable, hungry. Below 2.8 mmol/L = severe; below 1.7 mmol/L = coma risk.',
      tone: bandTones.low,
      escalate:
        '<4.0 mmol/L (or symptomatic) = give fast-acting carbs (juice, glucose tabs), recheck in 15 min, notify physician per protocol.',
    },
    high: {
      explanation:
        'Hyperglycaemia: thirst, polyuria, fatigue, blurred vision. Sustained elevation suggests diabetes or DKA/HHS risk.',
      tone: bandTones.high,
      escalate:
        '>13.9 mmol/L fasting, or any reading >22.2 mmol/L, warrants physician notification. Check ketones if diabetic.',
    },
    notes:
      'Wash hands with warm water before fingerstick. Always confirm a critically low reading with a venous sample if possible.',
  },
  {
    id: 'bmi',
    name: 'Body Mass Index',
    acronym: 'BMI',
    system: 'anthropometric',
    summary:
      'Weight in kilograms divided by height in metres squared. A population-level screen for under- or over-weight.',
    adult: { low: 18.5, high: 24.9, unit: 'kg / m²' },
    pediatric: {
      // For pediatrics, BMI is interpreted via percentile — we don't show a fixed range
      toddler: { low: 0, high: 0, unit: 'percentile' },
      preschool: { low: 0, high: 0, unit: 'percentile' },
      school: { low: 0, high: 0, unit: 'percentile' },
      adolescent: { low: 0, high: 0, unit: 'percentile' },
    },
    low: {
      explanation:
        'BMI < 18.5 flags underweight — screen for malnutrition, eating disorders, chronic disease, or malignancy.',
      tone: bandTones.low,
      escalate:
        'Sudden unintentional weight loss or BMI < 17 warrants physician review and nutrition consult.',
    },
    high: {
      explanation:
        'BMI 25 – 29.9 = overweight; 30+ = obese (class I-III). Higher risk for diabetes, hypertension, heart disease, sleep apnea.',
      tone: bandTones.high,
      escalate:
        'Discuss weight-management per facility protocol; standard care, not urgent unless comorbid acute issue.',
    },
    notes:
      'BMI ignores muscle mass, frame size, ethnicity, and age. Paediatric BMI uses CDC/WHO percentiles against age- and sex-specific curves.',
  },
  {
    id: 'pain',
    name: 'Pain Score',
    acronym: 'NRS / FPS',
    system: 'neurological',
    summary:
      "Patient's self-reported pain on a 0–10 scale (NRS) or Faces Pain Scale (FPS for non-verbal). Always subjective.",
    adult: { low: 0, high: 3, unit: '/ 10 (mild)' },
    pediatric: {
      infant: { low: 0, high: 2, unit: 'FPS' },
      toddler: { low: 0, high: 3, unit: 'FPS / NRS' },
      preschool: { low: 0, high: 3, unit: 'FPS / NRS' },
      school: { low: 0, high: 3, unit: '/ 10' },
      adolescent: { low: 0, high: 3, unit: '/ 10' },
    },
    low: {
      explanation:
        'No/light pain. Continue to monitor; address comfort proactively rather than waiting for escalation.',
      tone: bandTones.inRange,
      escalate:
        'No routine escalation needed unless the patient is non-verbal and showing pain behaviours despite the score.',
    },
    high: {
      explanation:
        'Moderate-to-severe pain (4–10). Interferes with sleep, mobility, mood, healing, and family peace.',
      tone: bandTones.high,
      escalate:
        'Pain 7+ or uncontrolled pain at any level: notify physician, consider PRN analgesia per orders, reassess in 30 min.',
    },
    notes:
      'PAINAD or FLACC scales for non-verbal / dementia patients. Always believe the patient — pain is whatever they say it is.',
  },
  {
    id: 'gcs',
    name: 'Glasgow Coma Scale',
    acronym: 'GCS',
    system: 'neurological',
    summary:
      'Eye + Verbal + Motor score. Out of 15. Quick bedside assessment of consciousness level.',
    adult: { low: 15, high: 15, unit: '/ 15' },
    pediatric: {
      // Pediatric GCS uses a slightly modified verbal scale; the numeric sum is the same.
      infant: { low: 15, high: 15, unit: '/ 15' },
      toddler: { low: 15, high: 15, unit: '/ 15' },
      preschool: { low: 15, high: 15, unit: '/ 15' },
      school: { low: 15, high: 15, unit: '/ 15' },
      adolescent: { low: 15, high: 15, unit: '/ 15' },
    },
    low: {
      explanation:
        'GCS 13–14 = mild impairment (confusion, lethargy). GCS 9–12 = moderate. GCS ≤8 = severe; airway protection is priority.',
      tone: bandTones.low,
      escalate:
        'Any drop from baseline, or total ≤ 8, warrants immediate physician notification and likely airway support.',
    },
    high: {
      explanation:
        'GCS 15 = fully alert, oriented, following commands. A regression here is the warning sign.',
      tone: bandTones.inRange,
      escalate:
        'No escalation needed at 15, but document any deviation from the patient\'s normal baseline.',
    },
    notes:
      'Best score = 15; record each component (E4 V5 M6). Stimulus must be appropriate to the patient — voice first, then pain.',
  },
];

/**
 * Returns the in-range band for a given vital and age group.
 * Returns `null` if the age-specific band is missing (e.g. pediatric
 * BMI uses percentiles, not fixed ranges).
 */
export function getRangeForAge(
  entry: VitalEntry,
  ageGroup: VitalsAgeGroup,
  pediatricBand?: keyof PediatricRanges,
): VitalRange | null {
  if (ageGroup === 'adult') return entry.adult;
  if (!pediatricBand) return null;
  return entry.pediatric[pediatricBand] ?? null;
}
