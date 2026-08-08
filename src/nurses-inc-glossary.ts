/**
 * Nurses Inc. — Patient-friendly glossary of clinical terms.
 *
 * Used by the "Definitions" toggle in the Clinical Forms & Tools
 * section on /forms. Audience: families and caregivers reading the
 * printable forms, not clinicians. Each entry has a clinical term
 * in parentheses for cross-reference.
 *
 * `formId` lets the definition link back to the relevant printable
 * form so readers can jump straight to the worksheet.
 */

export type GlossaryEntry = {
  id: string;
  term: string;
  clinicalTerm?: string;
  definition: string;
  /** Optional link to the printable form that uses this term. */
  formId?:
    | 'beers'
    | 'stopp-start'
    | 'polypharmacy'
    | 'symptom-cause'
    | 'deprescribing-algorithms'
    | 'deprescribing-conversation'
    | 'empower-brochures'
    | 'adherence-safety'
    | 'inventory'
    | 'fridge-list';
  /** Optional category for visual grouping. */
  category: 'clinical' | 'nursing' | 'regulatory' | 'workflow';
};

export const glossary: GlossaryEntry[] = [
  // Clinical: medication-safety terms
  {
    id: 'beers',
    term: 'Beers Criteria',
    clinicalTerm: 'AGS Beers Criteria® 2023',
    definition:
      'A list of medications that are often unsafe for adults 65 and older. Nurses Inc. uses this list during every home medication review to spot drugs that may cause falls, confusion, or other problems.',
    formId: 'beers',
    category: 'clinical',
  },
  {
    id: 'stopp-start',
    term: 'STOPP / START',
    clinicalTerm: 'STOPP/START Version 3 (2023)',
    definition:
      'A two-part prescribing check. STOPP lists medications that should usually be stopped in older adults. START lists medications that should usually be started because they are often missing. Used together to clean up a medication list.',
    formId: 'stopp-start',
    category: 'clinical',
  },
  {
    id: 'polypharmacy',
    term: 'Polypharmacy',
    clinicalTerm: 'Polypharmacy',
    definition:
      'Taking five or more medications at the same time. Common in older adults with multiple chronic conditions. The more medications, the higher the risk of side effects, interactions, and confusion.',
    formId: 'polypharmacy',
    category: 'clinical',
  },
  {
    id: 'acb-score',
    term: 'ACB Score',
    clinicalTerm: 'Anticholinergic Cognitive Burden Scale',
    definition:
      'A score that adds up the "anticholinergic load" of all medications a person takes. Higher scores mean more memory and concentration problems. A score of 3 or more is a red flag for delirium and falls.',
    formId: 'polypharmacy',
    category: 'clinical',
  },
  {
    id: 'triple-whammy',
    term: 'Triple Whammy',
    clinicalTerm: 'ACE-I / ARB + Diuretic + NSAID',
    definition:
      'A dangerous three-drug combination that can cause sudden kidney injury. The drugs are: an ACE inhibitor or ARB (blood pressure), a diuretic (water pill), and an NSAID (ibuprofen, naproxen). Avoid this combination.',
    formId: 'polypharmacy',
    category: 'clinical',
  },
  {
    id: 'deprescribing',
    term: 'Deprescribing',
    clinicalTerm: 'Deprescribing',
    definition:
      'The careful process of reducing or stopping a medication when the harms start to outweigh the benefits. Done step by step, with monitoring, in partnership with the prescriber.',
    formId: 'deprescribing-algorithms',
    category: 'clinical',
  },
  {
    id: 'empower',
    term: 'EMPOWER',
    clinicalTerm: 'EMPOWER Brochure Series',
    definition:
      'A series of patient-friendly handouts that help older adults have informed conversations with their prescriber about reducing risky medications. Used during deprescribing conversations.',
    formId: 'empower-brochures',
    category: 'clinical',
  },
  {
    id: 'sbar',
    term: 'SBAR',
    clinicalTerm: 'Situation · Background · Assessment · Recommendation',
    definition:
      'A four-step communication format used to hand off clinical information clearly. Used by nurses when escalating a concern to a physician or prescriber.',
    category: 'workflow',
  },
  {
    id: 'adherence',
    term: 'Medication Adherence',
    clinicalTerm: 'Adherence',
    definition:
      'How closely a person follows the medication schedule their prescriber set. Poor adherence is one of the leading causes of preventable hospital readmissions. The Adherence & Safety Audit helps spot reasons for missed doses.',
    formId: 'adherence-safety',
    category: 'nursing',
  },
  {
    id: 'side-effect',
    term: 'Side Effect',
    clinicalTerm: 'Adverse Drug Reaction (ADR)',
    definition:
      'An unwanted or unexpected effect from a medication. Common in older adults include dizziness, falls, confusion, constipation, and low blood pressure. The Side-Effect Tracker helps report these to the prescriber.',
    category: 'clinical',
  },
  // Nursing-specific terms (the user's focus)
  {
    id: 'lpn',
    term: 'LPN',
    clinicalTerm: 'Licensed Practical Nurse',
    definition:
      'A licensed nurse who provides direct bedside care under the direction of an RN, physician, or pharmacist. Nurses Inc. is led by an LPN. In New Brunswick, LPNs are licensed by ANBLPN.',
    category: 'nursing',
  },
  {
    id: 'rn',
    term: 'RN',
    clinicalTerm: 'Registered Nurse',
    definition:
      'A registered nurse with a broader scope of practice than an LPN. Nurses Inc. coordinates RNs and other specialists when care needs exceed the LPN scope.',
    category: 'nursing',
  },
  {
    id: 'vital-signs',
    term: 'Vital Signs',
    clinicalTerm: 'T · P · R · BP · SpO₂ · Pain',
    definition:
      'The core measurements a nurse takes at every visit: Temperature, Pulse (heart rate), Respiration (breathing rate), Blood Pressure, Oxygen saturation, and Pain score. Trended over time, vitals are the earliest signal that something is changing.',
    category: 'nursing',
  },
  {
    id: 'adls',
    term: 'ADLs',
    clinicalTerm: 'Activities of Daily Living',
    definition:
      'The basic self-care tasks: bathing, dressing, toileting, transferring, continence, and feeding. A decline in ADLs is the most common reason a senior first needs in-home support.',
    category: 'nursing',
  },
  {
    id: 'iadls',
    term: 'IADLs',
    clinicalTerm: 'Instrumental Activities of Daily Living',
    definition:
      'The more complex daily tasks: cooking, housework, shopping, managing money, taking medications, using the phone, and transportation. IADLs deteriorate before ADLs and are an early warning sign.',
    category: 'nursing',
  },
  {
    id: 'prn',
    term: 'PRN',
    clinicalTerm: 'Pro Re Nata (as needed)',
    definition:
      'A medication taken only when needed, not on a fixed schedule. Common examples: pain relief, nausea, sleep, anxiety. Always check the PRN interval — how many hours between doses.',
    category: 'nursing',
  },
  {
    id: 'medication-routes',
    term: 'PO · SL · SC · IM · IV · PR · GTT',
    clinicalTerm: 'Routes of administration',
    definition:
      'How a medication enters the body. PO = by mouth. SL = under the tongue. SC = subcutaneous (under the skin). IM = intramuscular. IV = into a vein. PR = rectal. GTT = drops (eye, ear, or nose). Nurses Inc. flags every route on the Medication Inventory.',
    formId: 'inventory',
    category: 'nursing',
  },
  {
    id: 'medication-schedule',
    term: 'AC · PC · BID · TID · QID · HS',
    clinicalTerm: 'Medication timing abbreviations',
    definition:
      'How often a medication is taken. AC = before meals. PC = after meals. BID = twice a day. TID = three times a day. QID = four times a day. HS = at bedtime. Nurses Inc. teaches these to every family so they can read the label with confidence.',
    category: 'nursing',
  },
  {
    id: 'fall-risk',
    term: 'Fall Risk Assessment',
    clinicalTerm: 'Morse Fall Scale / TUG / Berg Balance',
    definition:
      'A short set of checks that estimates how likely a person is to fall. Includes history of falls, gait, balance, and medications that cause dizziness. A score above the threshold triggers a home-safety review.',
    category: 'nursing',
  },
  {
    id: 'delirium-vs-dementia',
    term: 'Delirium vs. Dementia',
    clinicalTerm: 'Acute Confusional State vs. Chronic Cognitive Decline',
    definition:
      'Delirium is a sudden, hours-to-days change in alertness and attention — usually a medical emergency. Dementia is a slow, months-to-years decline. New confusion in an older adult is delirium until proven otherwise.',
    category: 'nursing',
  },
  {
    id: 'pressure-injury',
    term: 'Pressure Injury',
    clinicalTerm: 'Decubitus Ulcer / Bed Sore',
    definition:
      'Skin and tissue damage from staying in one position too long. Common over the tailbone, heels, and hips. Nurses assess risk with the Braden Scale and reposition at-risk patients every 2 hours.',
    category: 'nursing',
  },
  {
    id: 'cognitive-screen',
    term: 'Cognitive Screening',
    clinicalTerm: 'Mini-Cog · MoCA · MMSE',
    definition:
      'Short bedside tests used to spot memory and thinking problems. Mini-Cog is a 3-minute clock-drawing test. MoCA and MMSE are longer (10–15 minutes). Nurses Inc. uses these during baseline home visits.',
    category: 'nursing',
  },
  {
    id: 'nka',
    term: 'NKA / NKDA',
    clinicalTerm: 'No Known Allergies / No Known Drug Allergies',
    definition:
      'A standing note on the medication list meaning the patient has no known allergies — or "NKDA" if no drug allergies specifically. Always confirmed at every visit because new allergies can appear at any age.',
    formId: 'fridge-list',
    category: 'nursing',
  },
  {
    id: 'sbar',
    term: 'SBAR',
    clinicalTerm: 'Situation · Background · Assessment · Recommendation',
    definition:
      'A four-step communication format used to hand off clinical information clearly. Used by nurses when escalating a concern to a physician or prescriber.',
    category: 'nursing',
  },
  // Regulatory terms
  {
    id: 'phipea',
    term: 'PHIPAA',
    clinicalTerm: 'New Brunswick Personal Health Information Privacy and Access Act',
    definition:
      'New Brunswick\u2019s health-privacy law. Nurses Inc. follows PHIPAA to keep every patient\u2019s personal health information private, secure, and only shared with explicit consent.',
    category: 'regulatory',
  },
  {
    id: 'anblpn',
    term: 'ANBLPN',
    clinicalTerm: 'Association of New Brunswick Licensed Practical Nurses',
    definition:
      'The professional college that licenses and governs Licensed Practical Nurses in New Brunswick. Nurses Inc. operates under ANBLPN Collaborative Practice Regulations.',
    category: 'regulatory',
  },
  {
    id: 'collaborative-practice',
    term: 'Collaborative Practice',
    clinicalTerm: 'Collaborative Practice',
    definition:
      'A regulated model where an LPN works in partnership with a physician, RN, or pharmacist to deliver care. Nurses Inc. follows this model for every clinical decision.',
    category: 'regulatory',
  },
  // Workflow terms
  {
    id: 'reconciliation',
    term: 'Medication Reconciliation',
    clinicalTerm: 'Med Reconciliation',
    definition:
      'A formal process of comparing the medications a person is actually taking against the medications prescribed, to catch duplications, gaps, and errors. The Reconciliation Worksheet is the Nurses Inc. tool for this.',
    category: 'nursing',
  },
  {
    id: 'home-medication-review',
    term: 'Home Medication Review',
    clinicalTerm: 'HMR',
    definition:
      'A visit in the patient\u2019s home where a nurse opens every bottle, checks every label, and reviews the full medication list with the patient and family. The result is a written, fridge-ready inventory.',
    category: 'workflow',
  },
];

export const glossaryCategories: {
  id: GlossaryEntry['category'];
  label: string;
}[] = [
  { id: 'nursing', label: 'Nursing terms' },
  { id: 'clinical', label: 'Clinical terms' },
  { id: 'regulatory', label: 'Regulatory & privacy' },
  { id: 'workflow', label: 'Workflow & visits' },
];
