/**
 * Nurses Inc. — Drug Names Registry (clinician-grade).
 *
 * Flat registry of ~500+ common generic drug names keyed to their
 * `DrugClassEntry.id`. Lets clinicians search "heparin", "metformin",
 * "lisinopril" etc. directly and be routed back to the correct drug
 * class with its mechanism, examples, uses, and watch-outs.
 *
 * Each entry also carries a `use` line so the search result card has
 * a useful one-liner without needing to expand the full class.
 *
 * AUDIENCE: LPNs, RNs, partner physicians, pharmacists.
 *
 * ⚠️ Always cross-check with current product monographs and local
 * antimicrobial / formulary guidance. Last reviewed Aug 2026.
 */

export type DrugNameEntry = {
  /** Generic (lowercase, no brand) drug name. */
  name: string;
  /** Foreign key to `DrugClassEntry.id`. */
  classId: string;
  /** One-line common clinical use. */
  use: string;
  /** Optional Beers / safety flag for older adults. */
  beers?: boolean;
};

/** Alphabetical helper for the picker. */
export const drugNames: DrugNameEntry[] = [
  // ── Cardiology / Anticoagulants ────────────────────────────────────
  { name: 'apixaban', classId: 'anticoagulants-doac', use: 'Stroke prevention in AF; VTE treatment.', beers: false },
  { name: 'argatroban', classId: 'anticoagulants-heparin', use: 'Heparin-induced thrombocytopenia (HIT).', beers: false },
  { name: 'bivalirudin', classId: 'anticoagulants-heparin', use: 'Anticoagulation during PCI.', beers: false },
  { name: 'dabigatran', classId: 'anticoagulants-doac', use: 'Stroke prevention in AF; VTE prophylaxis.', beers: false },
  { name: 'dalteparin', classId: 'anticoagulants-heparin', use: 'VTE prophylaxis / treatment in medically ill and surgical patients.', beers: false },
  { name: 'danaparoid', classId: 'anticoagulants-heparin', use: 'HIT (off-label).', beers: false },
  { name: 'edoxaban', classId: 'anticoagulants-doac', use: 'VTE treatment; AF stroke prevention.', beers: false },
  { name: 'enoxaparin', classId: 'anticoagulants-heparin', use: 'DVT prophylaxis post-hip/knee surgery; ACS; medically ill.', beers: false },
  { name: 'fondaparinux', classId: 'anticoagulants-heparin', use: 'VTE prophylaxis / treatment; ACS.', beers: false },
  { name: 'heparin', classId: 'anticoagulants-heparin', use: 'DVT/PE treatment; ACS; dialysis; line patency.', beers: false },
  { name: 'nadroparin', classId: 'anticoagulants-heparin', use: 'VTE prophylaxis / treatment.', beers: false },
  { name: 'rivaroxaban', classId: 'anticoagulants-doac', use: 'AF stroke prevention; VTE treatment; CAD/PAD.', beers: false },
  { name: 'tinzaparin', classId: 'anticoagulants-heparin', use: 'VTE treatment in cancer patients.', beers: false },
  { name: 'warfarin', classId: 'anticoagulants-warfarin', use: 'AF, mechanical valves, hypercoagulable states.', beers: true },

  // ── Cardiology / Antiplatelets ─────────────────────────────────────
  { name: 'aspirin', classId: 'antiplatelets', use: 'Secondary prevention of MI/stroke; ACS.', beers: true },
  { name: 'cangrelor', classId: 'antiplatelets', use: 'Peri-PCI antiplatelet.', beers: false },
  { name: 'cilostazol', classId: 'antiplatelets', use: 'Intermittent claudication.', beers: false },
  { name: 'clopidogrel', classId: 'antiplatelets', use: 'Post-ACS / stent; secondary prevention.', beers: false },
  { name: 'dipyridamole', classId: 'antiplatelets', use: 'Stroke prevention (with warfarin).', beers: false },
  { name: 'prasugrel', classId: 'antiplatelets', use: 'ACS / post-PCI.', beers: false },
  { name: 'ticagrelor', classId: 'antiplatelets', use: 'ACS / post-PCI.', beers: false },
  { name: 'tirofiban', classId: 'antiplatelets', use: 'Acute coronary syndrome / PCI.', beers: false },

  // ── Cardiology / ACE inhibitors ────────────────────────────────────
  { name: 'benazepril', classId: 'ace-inhibitors', use: 'Hypertension; heart failure; proteinuric CKD.', beers: false },
  { name: 'captopril', classId: 'ace-inhibitors', use: 'Hypertension; heart failure; hypertensive emergency.', beers: false },
  { name: 'enalapril', classId: 'ace-inhibitors', use: 'Hypertension; HFrEF; asymptomatic LV dysfunction.', beers: false },
  { name: 'fosinopril', classId: 'ace-inhibitors', use: 'Hypertension; heart failure.', beers: false },
  { name: 'lisinopril', classId: 'ace-inhibitors', use: 'Hypertension; HFrEF; post-MI.', beers: false },
  { name: 'moexipril', classId: 'ace-inhibitors', use: 'Hypertension.', beers: false },
  { name: 'perindopril', classId: 'ace-inhibitors', use: 'Hypertension; stable CAD.', beers: false },
  { name: 'quinapril', classId: 'ace-inhibitors', use: 'Hypertension; heart failure.', beers: false },
  { name: 'ramipril', classId: 'ace-inhibitors', use: 'Hypertension; HFrEF; CV risk reduction.', beers: false },
  { name: 'trandolapril', classId: 'ace-inhibitors', use: 'Hypertension; HFrEF post-MI.', beers: false },

  // ── Cardiology / ARBs ─────────────────────────────────────────────
  { name: 'azilsartan', classId: 'arbs', use: 'Hypertension.', beers: false },
  { name: 'candesartan', classId: 'arbs', use: 'Hypertension; HFrEF.', beers: false },
  { name: 'eprosartan', classId: 'arbs', use: 'Hypertension.', beers: false },
  { name: 'irbesartan', classId: 'arbs', use: 'Hypertension; diabetic nephropathy.', beers: false },
  { name: 'losartan', classId: 'arbs', use: 'Hypertension; diabetic nephropathy; stroke prevention (LVH).', beers: false },
  { name: 'olmesartan', classId: 'arbs', use: 'Hypertension.', beers: false },
  { name: 'telmisartan', classId: 'arbs', use: 'Hypertension; CV risk reduction.', beers: false },
  { name: 'valsartan', classId: 'arbs', use: 'Hypertension; HFrEF; post-MI.', beers: false },

  // ── Cardiology / Beta-blockers ─────────────────────────────────────
  { name: 'acebutolol', classId: 'beta-blockers', use: 'Hypertension; arrhythmias.', beers: false },
  { name: 'atenolol', classId: 'beta-blockers', use: 'Hypertension; angina; post-MI.', beers: false },
  { name: 'betaxolol', classId: 'beta-blockers', use: 'Hypertension.', beers: false },
  { name: 'bisoprolol', classId: 'beta-blockers', use: 'Hypertension; HFrEF.', beers: false },
  { name: 'carvedilol', classId: 'beta-blockers', use: 'HFrEF; hypertension; LV dysfunction post-MI.', beers: false },
  { name: 'esmolol', classId: 'beta-blockers', use: 'SVT / hypertensive emergency (IV).', beers: false },
  { name: 'labetalol', classId: 'beta-blockers', use: 'Hypertensive emergency (IV); hypertension (oral).', beers: false },
  { name: 'metoprolol', classId: 'beta-blockers', use: 'Hypertension; HFrEF; post-MI; angina.', beers: false },
  { name: 'nadolol', classId: 'beta-blockers', use: 'Hypertension; angina; migraine prophylaxis.', beers: false },
  { name: 'nebivolol', classId: 'beta-blockers', use: 'Hypertension.', beers: false },
  { name: 'pindolol', classId: 'beta-blockers', use: 'Hypertension.', beers: false },
  { name: 'propranolol', classId: 'beta-blockers', use: 'Hypertension; migraine; portal HTN; tremor; performance anxiety.', beers: false },
  { name: 'sotalol', classId: 'beta-blockers', use: 'Atrial fibrillation / VT.', beers: true },
  { name: 'timolol', classId: 'beta-blockers', use: 'Hypertension; migraine prophylaxis; glaucoma.', beers: false },

  // ── Cardiology / Calcium channel blockers ──────────────────────────
  { name: 'amlodipine', classId: 'ccb-dihydropyridine', use: 'Hypertension; angina.', beers: false },
  { name: 'felodipine', classId: 'ccb-dihydropyridine', use: 'Hypertension.', beers: false },
  { name: 'isradipine', classId: 'ccb-dihydropyridine', use: 'Hypertension.', beers: false },
  { name: 'nicardipine', classId: 'ccb-dihydropyridine', use: 'Hypertension; hypertensive emergency (IV).', beers: false },
  { name: 'nifedipine', classId: 'ccb-dihydropyridine', use: 'Hypertension; angina; Raynaud.', beers: false },
  { name: 'nisoldipine', classId: 'ccb-dihydropyridine', use: 'Hypertension.', beers: false },
  { name: 'diltiazem', classId: 'ccb-non-dihydropyridine', use: 'Angina; rate control in AF; hypertension.', beers: false },
  { name: 'verapamil', classId: 'ccb-non-dihydropyridine', use: 'Angina; rate control in AF; hypertension.', beers: false },

  // ── Cardiology / Diuretics ─────────────────────────────────────────
  { name: 'acetazolamide', classId: 'carbonic-anhydrase-inhibitors', use: 'Glaucoma; altitude sickness; metabolic alkalosis.', beers: true },
  { name: 'amiloride', classId: 'potassium-sparing', use: 'K+ sparing diuresis; Liddle syndrome.', beers: false },
  { name: 'bumetanide', classId: 'loop-diuretics', use: 'Edema in HF, CKD, liver disease.', beers: false },
  { name: 'chlorthalidone', classId: 'thiazides', use: 'Hypertension; edema.', beers: true },
  { name: 'eplerenone', classId: 'mineralocorticoid-antagonists', use: 'HFrEF; resistant hypertension; hyperaldosteronism.', beers: false },
  { name: 'ethacrynic acid', classId: 'loop-diuretics', use: 'Edema when sulfa allergy present.', beers: false },
  { name: 'furosemide', classId: 'loop-diuretics', use: 'HF, CKD, hepatic edema; HTN.', beers: false },
  { name: 'hydrochlorothiazide', classId: 'thiazides', use: 'Hypertension; mild edema.', beers: true },
  { name: 'indapamide', classId: 'thiazides', use: 'Hypertension.', beers: true },
  { name: 'metolazone', classId: 'thiazides', use: 'Refractory edema (sequential nephron blockade).', beers: false },
  { name: 'spironolactone', classId: 'mineralocorticoid-antagonists', use: 'HFrEF; resistant HTN; primary hyperaldosteronism; ascites.', beers: false },
  { name: 'torsemide', classId: 'loop-diuretics', use: 'HF; CKD; hepatic edema.', beers: false },
  { name: 'triamterene', classId: 'potassium-sparing', use: 'K+ sparing diuresis.', beers: true },

  // ── Cardiology / Vasodilators / Nitrates ───────────────────────────
  { name: 'hydralazine', classId: 'direct-vasodilators', use: 'Hypertension (esp. pregnancy); HFrEF with isosorbide.', beers: false },
  { name: 'isosorbide dinitrate', classId: 'nitrates', use: 'Angina prophylaxis; acute HF.', beers: false },
  { name: 'isosorbide mononitrate', classId: 'nitrates', use: 'Angina prophylaxis.', beers: false },
  { name: 'minoxidil', classId: 'direct-vasodilators', use: 'Severe resistant hypertension.', beers: true },
  { name: 'nitroglycerin', classId: 'nitrates', use: 'Acute angina; hypertensive emergency; acute HF.', beers: false },

  // ── Cardiology / Statins / Lipid ───────────────────────────────────
  { name: 'atorvastatin', classId: 'statins', use: 'Hyperlipidemia; ASCVD prevention.', beers: true },
  { name: 'cholestyramine', classId: 'bile-acid-sequestrants', use: 'Hyperlipidemia; pruritus in cholestasis.', beers: false },
  { name: 'colesevelam', classId: 'bile-acid-sequestrants', use: 'Hyperlipidemia; glycemic adjunct in T2DM.', beers: false },
  { name: 'colestipol', classId: 'bile-acid-sequestrants', use: 'Hyperlipidemia.', beers: false },
  { name: 'evolocumab', classId: 'pcsk9-inhibitors', use: 'Familial / refractory hypercholesterolemia.', beers: false },
  { name: 'ezetimibe', classId: 'ezetimibe', use: 'Hyperlipidemia (adjunct to statin).', beers: false },
  { name: 'fenofibrate', classId: 'fibrates', use: 'Severe hypertriglyceridemia.', beers: false },
  { name: 'fluvastatin', classId: 'statins', use: 'Hyperlipidemia.', beers: false },
  { name: 'gemfibrozil', classId: 'fibrates', use: 'Severe hypertriglyceridemia.', beers: false },
  { name: 'lovastatin', classId: 'statins', use: 'Hyperlipidemia.', beers: true },
  { name: 'pravastatin', classId: 'statins', use: 'Hyperlipidemia.', beers: false },
  { name: 'rosuvastatin', classId: 'statins', use: 'Hyperlipidemia; ASCVD prevention.', beers: false },
  { name: 'simvastatin', classId: 'statins', use: 'Hyperlipidemia.', beers: true },

  // ── Endocrinology / Diabetes ───────────────────────────────────────
  { name: 'acarbose', classId: 'alpha-glucosidase-inhibitors', use: 'T2DM (postprandial glucose).', beers: false },
  { name: 'alogliptin', classId: 'dpp4-inhibitors', use: 'T2DM.', beers: false },
  { name: 'canagliflozin', classId: 'sglt2-inhibitors', use: 'T2DM; HF; CKD.', beers: false },
  { name: 'dapagliflozin', classId: 'sglt2-inhibitors', use: 'T2DM; HFrEF; CKD.', beers: false },
  { name: 'empagliflozin', classId: 'sglt2-inhibitors', use: 'T2DM; HFrEF; CV mortality reduction.', beers: false },
  { name: 'ertugliflozin', classId: 'sglt2-inhibitors', use: 'T2DM.', beers: false },
  { name: 'glimepiride', classId: 'sulfonylureas', use: 'T2DM.', beers: true },
  { name: 'glipizide', classId: 'sulfonylureas', use: 'T2DM.', beers: true },
  { name: 'glyburide', classId: 'sulfonylureas', use: 'T2DM.', beers: true },
  { name: 'insulin aspart', classId: 'insulin-rapid', use: 'T1DM / T2DM — rapid-acting.', beers: false },
  { name: 'insulin degludec', classId: 'insulin-long', use: 'T1DM / T2DM — basal.', beers: false },
  { name: 'insulin detemir', classId: 'insulin-long', use: 'T1DM / T2DM — basal.', beers: false },
  { name: 'insulin glargine', classId: 'insulin-long', use: 'T1DM / T2DM — basal.', beers: false },
  { name: 'insulin lispro', classId: 'insulin-rapid', use: 'T1DM / T2DM — rapid.', beers: false },
  { name: 'insulin nph', classId: 'insulin-intermediate', use: 'T1DM / T2DM — basal.', beers: false },
  { name: 'insulin regular', classId: 'insulin-short', use: 'T1DM / T2DM; DKA; hyperkalemia.', beers: false },
  { name: 'linagliptin', classId: 'dpp4-inhibitors', use: 'T2DM (no renal dose change).', beers: false },
  { name: 'liraglutide', classId: 'glp1-agonists', use: 'T2DM; obesity; CV risk reduction.', beers: false },
  { name: 'metformin', classId: 'biguanides', use: 'T2DM first-line; PCOS.', beers: false },
  { name: 'miglitol', classId: 'alpha-glucosidase-inhibitors', use: 'T2DM (postprandial).', beers: false },
  { name: 'pioglitazone', classId: 'thiazolidinediones', use: 'T2DM (esp. NAFLD).', beers: true },
  { name: 'rosiglitazone', classId: 'thiazolidinediones', use: 'T2DM.', beers: true },
  { name: 'saxagliptin', classId: 'dpp4-inhibitors', use: 'T2DM.', beers: false },
  { name: 'semaglutide', classId: 'glp1-agonists', use: 'T2DM; obesity; CV risk reduction.', beers: false },
  { name: 'sitagliptin', classId: 'dpp4-inhibitors', use: 'T2DM.', beers: false },
  { name: 'tolbutamide', classId: 'sulfonylureas', use: 'T2DM.', beers: true },

  // ── Endocrinology / Thyroid ────────────────────────────────────────
  { name: 'levothyroxine', classId: 'thyroid-hormones', use: 'Hypothyroidism; post-thyroidectomy.', beers: false },
  { name: 'liothyronine', classId: 'thyroid-hormones', use: 'Hypothyroidism (rarely).', beers: false },
  { name: 'methimazole', classId: 'antithyroid', use: 'Hyperthyroidism (Graves).', beers: false },
  { name: 'propylthiouracil', classId: 'antithyroid', use: 'Hyperthyroidism; thyroid storm.', beers: false },

  // ── Endocrinology / Bone ───────────────────────────────────────────
  { name: 'alendronate', classId: 'bisphosphonates', use: 'Osteoporosis; Paget disease.', beers: false },
  { name: 'calcitonin', classId: 'calcitonin', use: 'Paget disease; hypercalcemia; osteoporosis (short-term).', beers: false },
  { name: 'denosumab', classId: 'rankl-inhibitor', use: 'Osteoporosis; bone metastases.', beers: false },
  { name: 'ibandronate', classId: 'bisphosphonates', use: 'Postmenopausal osteoporosis.', beers: false },
  { name: 'risedronate', classId: 'bisphosphonates', use: 'Osteoporosis; Paget disease.', beers: false },
  { name: 'teriparatide', classId: 'pth-analog', use: 'Severe osteoporosis; glucocorticoid-induced.', beers: false },
  { name: 'zoledronic acid', classId: 'bisphosphonates', use: 'Osteoporosis; bone metastases; hypercalcemia.', beers: false },

  // ── CNS / Analgesics / Opioids ─────────────────────────────────────
  { name: 'buprenorphine', classId: 'opioids-partial', use: 'Pain; opioid use disorder.', beers: true },
  { name: 'codeine', classId: 'opioids', use: 'Mild-moderate pain; cough.', beers: true },
  { name: 'fentanyl', classId: 'opioids', use: 'Severe pain; anesthesia.', beers: true },
  { name: 'hydrocodone', classId: 'opioids', use: 'Moderate-severe pain.', beers: true },
  { name: 'hydromorphone', classId: 'opioids', use: 'Severe pain.', beers: true },
  { name: 'methadone', classId: 'opioids', use: 'Pain; opioid use disorder.', beers: true },
  { name: 'morphine', classId: 'opioids', use: 'Severe pain; dyspnea in palliative care.', beers: true },
  { name: 'oxycodone', classId: 'opioids', use: 'Moderate-severe pain.', beers: true },
  { name: 'oxymorphone', classId: 'opioids', use: 'Severe pain.', beers: true },
  { name: 'tapentadol', classId: 'opioids', use: 'Moderate-severe pain.', beers: true },
  { name: 'tramadol', classId: 'opioids', use: 'Moderate pain; off-label for OA.', beers: true },

  // ── CNS / NSAIDs ──────────────────────────────────────────────────
  { name: 'celecoxib', classId: 'nsaids-cox2', use: 'OA / RA / acute pain; lower GI risk.', beers: true },
  { name: 'diclofenac', classId: 'nsaids', use: 'OA / RA; topical for actinic keratoses.', beers: true },
  { name: 'etodolac', classId: 'nsaids', use: 'Pain; OA / RA.', beers: true },
  { name: 'ibuprofen', classId: 'nsaids', use: 'Pain; fever; inflammation.', beers: true },
  { name: 'indomethacin', classId: 'nsaids', use: 'Gout; pericarditis; PDA closure.', beers: true },
  { name: 'ketorolac', classId: 'nsaids', use: 'Short-term acute pain (IM / IV / PO).', beers: true },
  { name: 'meloxicam', classId: 'nsaids', use: 'OA / RA.', beers: true },
  { name: 'nabumetone', classId: 'nsaids', use: 'OA / RA.', beers: true },
  { name: 'naproxen', classId: 'nsaids', use: 'Pain; dysmenorrhea; gout.', beers: true },
  { name: 'piroxicam', classId: 'nsaids', use: 'OA / RA.', beers: true },
  { name: 'sulindac', classId: 'nsaids', use: 'OA / RA; gout.', beers: true },

  // ── CNS / Acetaminophen ───────────────────────────────────────────
  { name: 'acetaminophen', classId: 'analgesics-non-opioid', use: 'Pain; fever. First-line in older adults.', beers: false },

  // ── CNS / Migraine ────────────────────────────────────────────────
  { name: 'almotriptan', classId: 'triptans', use: 'Acute migraine.', beers: false },
  { name: 'eletriptan', classId: 'triptans', use: 'Acute migraine.', beers: false },
  { name: 'frovatriptan', classId: 'triptans', use: 'Acute / menstrual migraine.', beers: false },
  { name: 'naratriptan', classId: 'triptans', use: 'Acute / menstrual migraine.', beers: false },
  { name: 'rizatriptan', classId: 'triptans', use: 'Acute migraine.', beers: false },
  { name: 'sumatriptan', classId: 'triptans', use: 'Acute migraine / cluster headache.', beers: false },
  { name: 'zolmitriptan', classId: 'triptans', use: 'Acute migraine.', beers: false },

  // ── CNS / Anticonvulsants ──────────────────────────────────────────
  { name: 'carbamazepine', classId: 'anticonvulsants', use: 'Epilepsy; trigeminal neuralgia; bipolar.', beers: false },
  { name: 'gabapentin', classId: 'anticonvulsants', use: 'Neuropathic pain; PHN; partial seizures.', beers: true },
  { name: 'lamotrigine', classId: 'anticonvulsants', use: 'Epilepsy; bipolar maintenance.', beers: false },
  { name: 'levetiracetam', classId: 'anticonvulsants', use: 'Epilepsy (focal + generalized).', beers: false },
  { name: 'oxcarbazepine', classId: 'anticonvulsants', use: 'Focal seizures.', beers: false },
  { name: 'phenobarbital', classId: 'barbiturates', use: 'Epilepsy; status epilepticus.', beers: true },
  { name: 'phenytoin', classId: 'anticonvulsants', use: 'Focal / generalized seizures; status epilepticus.', beers: false },
  { name: 'pregabalin', classId: 'anticonvulsants', use: 'Neuropathic pain; fibromyalgia; partial seizures.', beers: true },
  { name: 'topiramate', classId: 'anticonvulsants', use: 'Epilepsy; migraine prophylaxis.', beers: true },
  { name: 'valproic acid', classId: 'anticonvulsants', use: 'Epilepsy; bipolar; migraine prophylaxis.', beers: true },
  { name: 'zonisamide', classId: 'anticonvulsants', use: 'Focal seizures.', beers: false },

  // ── CNS / Antidepressants ──────────────────────────────────────────
  { name: 'amitriptyline', classId: 'tcas', use: 'Depression; neuropathic pain; migraine prophylaxis.', beers: true },
  { name: 'bupropion', classId: 'antidepressants', use: 'Depression; smoking cessation.', beers: false },
  { name: 'citalopram', classId: 'ssris', use: 'Depression; anxiety.', beers: false },
  { name: 'clomipramine', classId: 'tcas', use: 'OCD; depression.', beers: true },
  { name: 'desipramine', classId: 'tcas', use: 'Depression; neuropathic pain.', beers: true },
  { name: 'desvenlafaxine', classId: 'snris', use: 'Depression.', beers: false },
  { name: 'doxepin', classId: 'tcas', use: 'Depression; anxiety; insomnia (low-dose).', beers: true },
  { name: 'duloxetine', classId: 'snris', use: 'Depression; GAD; neuropathic pain; fibromyalgia.', beers: false },
  { name: 'escitalopram', classId: 'ssris', use: 'Depression; GAD.', beers: false },
  { name: 'fluoxetine', classId: 'ssris', use: 'Depression; OCD; bulimia; panic.', beers: false },
  { name: 'fluvoxamine', classId: 'ssris', use: 'OCD.', beers: false },
  { name: 'imipramine', classId: 'tcas', use: 'Depression; enuresis.', beers: true },
  { name: 'levomilnacipran', classId: 'snris', use: 'MDD.', beers: false },
  { name: 'mirtazapine', classId: 'antidepressants', use: 'Depression (esp. with insomnia / poor appetite).', beers: false },
  { name: 'nortriptyline', classId: 'tcas', use: 'Depression; neuropathic pain; smoking cessation.', beers: true },
  { name: 'paroxetine', classId: 'ssris', use: 'Depression; anxiety; PTSD; OCD.', beers: false },
  { name: 'sertraline', classId: 'ssris', use: 'Depression; anxiety; OCD; PTSD.', beers: false },
  { name: 'trazodone', classId: 'antidepressants', use: 'Depression; insomnia (off-label, low-dose).', beers: false },
  { name: 'venlafaxine', classId: 'snris', use: 'Depression; GAD; panic; social anxiety.', beers: false },
  { name: 'vilazodone', classId: 'antidepressants', use: 'MDD.', beers: false },
  { name: 'vortioxetine', classId: 'antidepressants', use: 'MDD; cognitive symptoms.', beers: false },

  // ── CNS / Antipsychotics ──────────────────────────────────────────
  { name: 'aripiprazole', classId: 'atypical-antipsychotics', use: 'Schizophrenia; bipolar; depression adjunct.', beers: true },
  { name: 'asenapine', classId: 'atypical-antipsychotics', use: 'Schizophrenia; bipolar.', beers: true },
  { name: 'brexpiprazole', classId: 'atypical-antipsychotics', use: 'Schizophrenia; depression adjunct.', beers: true },
  { name: 'cariprazine', classId: 'atypical-antipsychotics', use: 'Schizophrenia; bipolar.', beers: true },
  { name: 'chlorpromazine', classId: 'typical-antipsychotics', use: 'Schizophrenia; agitation; hiccups.', beers: true },
  { name: 'clozapine', classId: 'atypical-antipsychotics', use: 'Treatment-resistant schizophrenia.', beers: true },
  { name: 'fluphenazine', classId: 'typical-antipsychotics', use: 'Schizophrenia; psychosis.', beers: true },
  { name: 'haloperidol', classId: 'typical-antipsychotics', use: 'Agitation; psychosis; delirium.', beers: true },
  { name: 'lurasidone', classId: 'atypical-antipsychotics', use: 'Schizophrenia; bipolar depression.', beers: true },
  { name: 'loxapine', classId: 'typical-antipsychotics', use: 'Schizophrenia; agitation (inhaled).', beers: true },
  { name: 'olanzapine', classId: 'atypical-antipsychotics', use: 'Schizophrenia; bipolar; chemo nausea.', beers: true },
  { name: 'paliperidone', classId: 'atypical-antipsychotics', use: 'Schizophrenia; schizoaffective.', beers: true },
  { name: 'perphenazine', classId: 'typical-antipsychotics', use: 'Schizophrenia; severe nausea.', beers: true },
  { name: 'pimozide', classId: 'typical-antipsychotics', use: 'Tourette syndrome.', beers: true },
  { name: 'quetiapine', classId: 'atypical-antipsychotics', use: 'Schizophrenia; bipolar; depression adjunct (low-dose).', beers: true },
  { name: 'risperidone', classId: 'atypical-antipsychotics', use: 'Schizophrenia; bipolar; irritability in autism.', beers: true },
  { name: 'thioridazine', classId: 'typical-antipsychotics', use: 'Schizophrenia (2nd line).', beers: true },
  { name: 'thiothixene', classId: 'typical-antipsychotics', use: 'Schizophrenia.', beers: true },
  { name: 'trifluoperazine', classId: 'typical-antipsychotics', use: 'Schizophrenia; severe anxiety.', beers: true },
  { name: 'ziprasidone', classId: 'atypical-antipsychotics', use: 'Schizophrenia; bipolar.', beers: true },

  // ── CNS / Anxiolytics / Sedative-Hypnotics ────────────────────────
  { name: 'alprazolam', classId: 'benzodiazepines', use: 'Panic; GAD.', beers: true },
  { name: 'buspirone', classId: 'anxiolytics-non-bzd', use: 'GAD.', beers: false },
  { name: 'chlordiazepoxide', classId: 'benzodiazepines', use: 'Anxiety; alcohol withdrawal.', beers: true },
  { name: 'clonazepam', classId: 'benzodiazepines', use: 'Panic; seizures.', beers: true },
  { name: 'clorazepate', classId: 'benzodiazepines', use: 'Anxiety; alcohol withdrawal; partial seizures.', beers: true },
  { name: 'diazepam', classId: 'benzodiazepines', use: 'Anxiety; alcohol withdrawal; seizures; spasticity.', beers: true },
  { name: 'eszopiclone', classId: 'non-bzd-hypnotics', use: 'Insomnia.', beers: true },
  { name: 'flurazepam', classId: 'benzodiazepines', use: 'Insomnia.', beers: true },
  { name: 'hydroxyzine', classId: 'anxiolytics-non-bzd', use: 'Anxiety; pruritus; peri-op sedation.', beers: true },
  { name: 'lorazepam', classId: 'benzodiazepines', use: 'Anxiety; status epilepticus; agitation.', beers: true },
  { name: 'midazolam', classId: 'benzodiazepines', use: 'Procedural sedation; status epilepticus.', beers: true },
  { name: 'oxazepam', classId: 'benzodiazepines', use: 'Anxiety; alcohol withdrawal (preferred in liver disease).', beers: true },
  { name: 'quazepam', classId: 'benzodiazepines', use: 'Insomnia.', beers: true },
  { name: 'ramelteon', classId: 'non-bzd-hypnotics', use: 'Insomnia (circadian).', beers: false },
  { name: 'suvorexant', classId: 'non-bzd-hypnotics', use: 'Insomnia.', beers: true },
  { name: 'temazepam', classId: 'benzodiazepines', use: 'Insomnia (short-term).', beers: true },
  { name: 'triazolam', classId: 'benzodiazepines', use: 'Insomnia (short-term).', beers: true },
  { name: 'zaleplon', classId: 'non-bzd-hypnotics', use: 'Insomnia (sleep onset).', beers: true },
  { name: 'zolpidem', classId: 'non-bzd-hypnotics', use: 'Insomnia.', beers: true },

  // ── CNS / Cholinesterase inhibitors (dementia) ────────────────────
  { name: 'donepezil', classId: 'cholinesterase-inhibitors', use: 'Alzheimer dementia; vascular / Lewy body dementia.', beers: false },
  { name: 'galantamine', classId: 'cholinesterase-inhibitors', use: 'Alzheimer dementia.', beers: false },
  { name: 'memantine', classId: 'nmda-antagonists', use: 'Moderate-severe Alzheimer dementia.', beers: false },
  { name: 'rivastigmine', classId: 'cholinesterase-inhibitors', use: 'Alzheimer dementia; Parkinson dementia.', beers: false },

  // ── CNS / Antiparkinson ───────────────────────────────────────────
  { name: 'amantadine', classId: 'antiparkinson', use: 'Parkinson disease; influenza prophylaxis.', beers: false },
  { name: 'benztropine', classId: 'antiparkinson', use: 'Drug-induced extrapyramidal symptoms.', beers: true },
  { name: 'carbidopa-levodopa', classId: 'antiparkinson', use: 'Parkinson disease; restless legs.', beers: false },
  { name: 'entacapone', classId: 'antiparkinson', use: 'Parkinson disease (wearing-off).', beers: false },
  { name: 'pramipexole', classId: 'antiparkinson', use: 'Parkinson disease; RLS.', beers: false },
  { name: 'rasagiline', classId: 'antiparkinson', use: 'Parkinson disease.', beers: false },
  { name: 'ropinirole', classId: 'antiparkinson', use: 'Parkinson disease; RLS.', beers: false },
  { name: 'tolcapone', classId: 'antiparkinson', use: 'Parkinson disease (3rd line).', beers: false },
  { name: 'trihexyphenidyl', classId: 'antiparkinson', use: 'Parkinson disease; dystonia.', beers: true },

  // ── CNS / Muscle relaxants ────────────────────────────────────────
  { name: 'baclofen', classId: 'muscle-relaxants', use: 'Spasticity (spinal cord injury; MS).', beers: false },
  { name: 'carisoprodol', classId: 'muscle-relaxants', use: 'Musculoskeletal pain (short-term).', beers: true },
  { name: 'chlorzoxazone', classId: 'muscle-relaxants', use: 'Musculoskeletal pain (short-term).', beers: true },
  { name: 'cyclobenzaprine', classId: 'muscle-relaxants', use: 'Musculoskeletal pain (short-term).', beers: true },
  { name: 'dantrolene', classId: 'muscle-relaxants', use: 'Malignant hyperthermia; spasticity.', beers: false },
  { name: 'metaxalone', classId: 'muscle-relaxants', use: 'Musculoskeletal pain (short-term).', beers: true },
  { name: 'methocarbamol', classId: 'muscle-relaxants', use: 'Musculoskeletal pain (short-term).', beers: true },
  { name: 'orphenadrine', classId: 'muscle-relaxants', use: 'Musculoskeletal pain (short-term).', beers: true },
  { name: 'tizanidine', classId: 'muscle-relaxants', use: 'Spasticity.', beers: true },

  // ── GI / PPIs & H2 blockers ───────────────────────────────────────
  { name: 'cimetidine', classId: 'h2-blockers', use: 'GERD; PUD.', beers: true },
  { name: 'dexlansoprazole', classId: 'ppis', use: 'GERD; erosive esophagitis.', beers: true },
  { name: 'esomeprazole', classId: 'ppis', use: 'GERD; PUD; H. pylori.', beers: true },
  { name: 'famotidine', classId: 'h2-blockers', use: 'GERD; PUD.', beers: false },
  { name: 'lansoprazole', classId: 'ppis', use: 'GERD; PUD.', beers: true },
  { name: 'nizatidine', classId: 'h2-blockers', use: 'GERD; PUD.', beers: true },
  { name: 'omeprazole', classId: 'ppis', use: 'GERD; PUD; H. pylori; stress ulcer prophylaxis.', beers: true },
  { name: 'pantoprazole', classId: 'ppis', use: 'GERD; erosive esophagitis.', beers: true },
  { name: 'rabeprazole', classId: 'ppis', use: 'GERD; PUD.', beers: true },
  { name: 'ranitidine', classId: 'h2-blockers', use: 'GERD; PUD (mostly withdrawn).', beers: false },

  // ── GI / Antiemetics / Prokinetics ────────────────────────────────
  { name: 'dexamethasone', classId: 'corticosteroids-systemic', use: 'Antiemetic (chemo); croup; cerebral edema.', beers: false },
  { name: 'dimenhydrinate', classId: 'antihistamines-1st-gen', use: 'Motion sickness; vertigo.', beers: false },
  { name: 'domperidone', classId: 'prokinetics', use: 'Gastroparesis; nausea.', beers: false },
  { name: 'dronabinol', classId: 'cannabinoids', use: 'Chemo-induced nausea; appetite.', beers: true },
  { name: 'granisetron', classId: '5ht3-antagonists', use: 'Chemo / post-op nausea.', beers: false },
  { name: 'metoclopramide', classId: 'prokinetics', use: 'Gastroparesis; post-op nausea.', beers: true },
  { name: 'ondansetron', classId: '5ht3-antagonists', use: 'Chemo / post-op nausea; viral gastritis.', beers: false },
  { name: 'prochlorperazine', classId: 'phenothiazines', use: 'Severe nausea / vertigo.', beers: true },
  { name: 'promethazine', classId: 'antihistamines-1st-gen', use: 'Nausea; allergies; motion sickness.', beers: true },

  // ── GI / Laxatives / Antidiarrheals ───────────────────────────────
  { name: 'bisacodyl', classId: 'laxatives-stimulant', use: 'Constipation; bowel prep.', beers: false },
  { name: 'docusate', classId: 'laxatives-stool-softener', use: 'Constipation (esp. opioid-induced).', beers: false },
  { name: 'lactulose', classId: 'laxatives-osmotic', use: 'Constipation; hepatic encephalopathy.', beers: false },
  { name: 'loperamide', classId: 'antidiarrheals', use: 'Acute diarrhea (avoid in dysentery).', beers: false },
  { name: 'methylnaltrexone', classId: 'laxatives-peripheral', use: 'Opioid-induced constipation.', beers: false },
  { name: 'naloxegol', classId: 'laxatives-peripheral', use: 'Opioid-induced constipation.', beers: false },
  { name: 'polyethylene glycol', classId: 'laxatives-osmotic', use: 'Constipation; bowel prep.', beers: false },
  { name: 'psyllium', classId: 'laxatives-bulk', use: 'Constipation; IBS; cholesterol.', beers: false },
  { name: 'senna', classId: 'laxatives-stimulant', use: 'Constipation; bowel prep.', beers: false },

  // ── Respiratory ───────────────────────────────────────────────────
  { name: 'aclidinium', classId: 'lama', use: 'COPD.', beers: false },
  { name: 'albuterol', classId: 'saba', use: 'Asthma / COPD rescue.', beers: false },
  { name: 'arformoterol', classId: 'laba', use: 'COPD maintenance.', beers: false },
  { name: 'beclomethasone', classId: 'ics', use: 'Asthma; allergic rhinitis.', beers: false },
  { name: 'budesonide', classId: 'ics', use: 'Asthma; COPD; allergic rhinitis; Crohn disease.', beers: false },
  { name: 'fluticasone', classId: 'ics', use: 'Asthma; COPD; allergic rhinitis.', beers: false },
  { name: 'formoterol', classId: 'laba', use: 'COPD; asthma (with ICS).', beers: false },
  { name: 'ipratropium', classId: 'sama', use: 'COPD rescue.', beers: false },
  { name: 'levalbuterol', classId: 'saba', use: 'Asthma / COPD rescue.', beers: false },
  { name: 'mometasone', classId: 'ics', use: 'Asthma; allergic rhinitis.', beers: false },
  { name: 'montelukast', classId: 'leukotriene-antagonists', use: 'Asthma; allergic rhinitis.', beers: false },
  { name: 'olodaterol', classId: 'laba', use: 'COPD.', beers: false },
  { name: 'roflumilast', classId: 'pde4-inhibitors', use: 'Severe COPD with chronic bronchitis.', beers: false },
  { name: 'salmeterol', classId: 'laba', use: 'Asthma / COPD maintenance.', beers: false },
  { name: 'theophylline', classId: 'methylxanthines', use: 'Asthma / COPD (3rd line).', beers: false },
  { name: 'tiotropium', classId: 'lama', use: 'COPD maintenance.', beers: false },
  { name: 'umeclidinium', classId: 'lama', use: 'COPD maintenance.', beers: false },
  { name: 'zafirlukast', classId: 'leukotriene-antagonists', use: 'Asthma prophylaxis.', beers: false },

  // ── Antibiotics ───────────────────────────────────────────────────
  { name: 'amoxicillin', classId: 'penicillins', use: 'Otitis media; sinusitis; strep throat; endocarditis prophylaxis.', beers: false },
  { name: 'amoxicillin-clavulanate', classId: 'penicillins', use: 'Sinusitis; otitis; bites; LRTI.', beers: false },
  { name: 'ampicillin', classId: 'penicillins', use: 'Meningitis; endocarditis; UTIs (group B Strep).', beers: false },
  { name: 'nafcillin', classId: 'penicillins', use: 'MSSA bacteremia / endocarditis.', beers: false },
  { name: 'oxacillin', classId: 'penicillins', use: 'MSSA infections.', beers: false },
  { name: 'penicillin g', classId: 'penicillins', use: 'Syphilis; strep infections; neurosyphilis.', beers: false },
  { name: 'penicillin v', classId: 'penicillins', use: 'Strep pharyngitis; rheumatic fever prophylaxis.', beers: false },
  { name: 'piperacillin-tazobactam', classId: 'penicillins', use: 'Nosocomial pneumonia; intra-abdominal; severe sepsis.', beers: false },
  { name: 'azithromycin', classId: 'macrolides', use: 'Atypical pneumonia; STIs; pertussis.', beers: false },
  { name: 'clarithromycin', classId: 'macrolides', use: 'H. pylori; atypical pneumonia; skin.', beers: false },
  { name: 'erythromycin', classId: 'macrolides', use: 'Pertussis; STIs; gastroparesis (off-label).', beers: false },
  { name: 'fidaxomicin', classId: 'macrolides', use: 'C. difficile (recurrent).', beers: false },
  { name: 'cefadroxil', classId: 'cephalosporins-1st', use: 'Skin / soft tissue; strep.', beers: false },
  { name: 'cefazolin', classId: 'cephalosporins-1st', use: 'Surgical prophylaxis; MSSA.', beers: false },
  { name: 'cefalexin', classId: 'cephalosporins-1st', use: 'Skin / soft tissue; UTIs.', beers: false },
  { name: 'cefaclor', classId: 'cephalosporins-2nd', use: 'Otitis; sinusitis; LRTI.', beers: false },
  { name: 'cefotetan', classId: 'cephalosporins-2nd', use: 'Intra-abdominal; gynecologic.', beers: false },
  { name: 'cefoxitin', classId: 'cephalosporins-2nd', use: 'Intra-abdominal; surgical prophylaxis.', beers: false },
  { name: 'cefprozil', classId: 'cephalosporins-2nd', use: 'Otitis; sinusitis; skin.', beers: false },
  { name: 'cefuroxime', classId: 'cephalosporins-2nd', use: 'LRTI; skin.', beers: false },
  { name: 'cefdinir', classId: 'cephalosporins-3rd', use: 'Otitis; sinusitis; LRTI.', beers: false },
  { name: 'cefditoren', classId: 'cephalosporins-3rd', use: 'LRTI; skin.', beers: false },
  { name: 'cefepime', classId: 'cephalosporins-4th', use: 'Febrile neutropenia; nosocomial.', beers: false },
  { name: 'ceftaroline', classId: 'cephalosporins-5th', use: 'MSSA / MRSA skin pneumonia.', beers: false },
  { name: 'ceftazidime', classId: 'cephalosporins-3rd', use: 'Pseudomonal infections.', beers: false },
  { name: 'ceftriaxone', classId: 'cephalosporins-3rd', use: 'Pneumonia; meningitis; gonorrhea.', beers: false },
  { name: 'cefotaxime', classId: 'cephalosporins-3rd', use: 'Pneumonia; meningitis.', beers: false },
  { name: 'ciprofloxacin', classId: 'fluoroquinolones', use: 'UTIs; prostatitis; travelers diarrhea.', beers: true },
  { name: 'delafloxacin', classId: 'fluoroquinolones', use: 'CAP; skin.', beers: true },
  { name: 'gemifloxacin', classId: 'fluoroquinolones', use: 'CAP.', beers: true },
  { name: 'levofloxacin', classId: 'fluoroquinolones', use: 'CAP; UTI; skin.', beers: true },
  { name: 'moxifloxacin', classId: 'fluoroquinolones', use: 'CAP; intra-abdominal; MRSA skin.', beers: true },
  { name: 'doxycycline', classId: 'tetracyclines', use: 'Lyme; chlamydia; acne; MRSA skin.', beers: false },
  { name: 'minocycline', classId: 'tetracyclines', use: 'Acne; MRSA skin.', beers: false },
  { name: 'tetracycline', classId: 'tetracyclines', use: 'H. pylori; acne.', beers: false },
  { name: 'tigecycline', classId: 'tetracyclines', use: 'MRSA; VRE; complicated skin.', beers: false },
  { name: 'aztreonam', classId: 'monobactams', use: 'Gram-negative (incl. Pseudomonas) with penicillin allergy.', beers: false },
  { name: 'ertapenem', classId: 'carbapenems', use: 'Intra-abdominal; UTI; skin.', beers: false },
  { name: 'imipenem-cilastatin', classId: 'carbapenems', use: 'Severe nosocomial infections.', beers: false },
  { name: 'meropenem', classId: 'carbapenems', use: 'Severe nosocomial; meningitis.', beers: false },
  { name: 'amikacin', classId: 'aminoglycosides', use: 'Severe gram-negative infections.', beers: true },
  { name: 'gentamicin', classId: 'aminoglycosides', use: 'Severe gram-negative; endocarditis synergy.', beers: true },
  { name: 'tobramycin', classId: 'aminoglycosides', use: 'CF lung disease; severe gram-negative.', beers: true },
  { name: 'clindamycin', classId: 'lincosamides', use: 'Anaerobes; skin; MRSA; aspiration.', beers: false },
  { name: 'linezolid', classId: 'oxazolidinones', use: 'MRSA; VRE.', beers: false },
  { name: 'tedizolid', classId: 'oxazolidinones', use: 'Skin / soft tissue (MRSA).', beers: false },
  { name: 'vancomycin', classId: 'glycopeptides', use: 'MRSA; C. difficile (oral); serious gram-positive.', beers: false },
  { name: 'dalbavancin', classId: 'glycopeptides', use: 'Skin / soft tissue (single-dose option).', beers: false },
  { name: 'daptomycin', classId: 'cyclic-lipopeptides', use: 'MRSA bacteremia / endocarditis; skin.', beers: false },
  { name: 'metronidazole', classId: 'nitroimidazoles', use: 'Anaerobes; C. difficile; trichomoniasis.', beers: false },
  { name: 'tinidazole', classId: 'nitroimidazoles', use: 'Trichomoniasis; giardia; amebiasis.', beers: false },
  { name: 'nitrofurantoin', classId: 'nitrofurans', use: 'Uncomplicated UTI.', beers: true },
  { name: 'trimethoprim', classId: 'folate-antagonists', use: 'UTIs; PCP prophylaxis.', beers: false },
  { name: 'sulfamethoxazole-trimethoprim', classId: 'folate-antagonists', use: 'UTIs; MRSA skin; PCP; traveler prophylaxis.', beers: true },
  { name: 'fosfomycin', classId: 'fosfomycin', use: 'Uncomplicated UTI (single-dose).', beers: false },

  // ── Antifungals ───────────────────────────────────────────────────
  { name: 'amphotericin b', classId: 'antifungals-polyene', use: 'Severe systemic fungal infections.', beers: false },
  { name: 'caspofungin', classId: 'echinocandins', use: 'Invasive candidiasis; aspergillosis.', beers: false },
  { name: 'fluconazole', classId: 'azoles', use: 'Candida; cryptococcus; tinea.', beers: false },
  { name: 'griseofulvin', classId: 'antifungals-other', use: 'Dermatophyte infections (skin / hair / nails).', beers: false },
  { name: 'isavuconazole', classId: 'azoles', use: 'Invasive aspergillosis / mucormycosis.', beers: false },
  { name: 'itraconazole', classId: 'azoles', use: 'Histoplasmosis; sporotrichosis; onychomycosis.', beers: false },
  { name: 'micafungin', classId: 'echinocandins', use: 'Invasive candidiasis.', beers: false },
  { name: 'nystatin', classId: 'antifungals-polyene', use: 'Oral / GI candidiasis.', beers: false },
  { name: 'posaconazole', classId: 'azoles', use: 'Invasive aspergillosis; prophylaxis.', beers: false },
  { name: 'terbinafine', classId: 'allylamines', use: 'Onychomycosis; tinea.', beers: false },
  { name: 'voriconazole', classId: 'azoles', use: 'Invasive aspergillosis; Scedosporium.', beers: false },

  // ── Antivirals ────────────────────────────────────────────────────
  { name: 'abacavir', classId: 'antiretrovirals', use: 'HIV (combination).', beers: false },
  { name: 'acyclovir', classId: 'antivirals-herpes', use: 'HSV; VZV.', beers: false },
  { name: 'atazanavir', classId: 'antiretrovirals', use: 'HIV.', beers: false },
  { name: 'darunavir', classId: 'antiretrovirals', use: 'HIV.', beers: false },
  { name: 'dolutegravir', classId: 'antiretrovirals', use: 'HIV.', beers: false },
  { name: 'efavirenz', classId: 'antiretrovirals', use: 'HIV.', beers: false },
  { name: 'emtricitabine', classId: 'antiretrovirals', use: 'HIV; PrEP.', beers: false },
  { name: 'entecavir', classId: 'antivirals-hepatitis', use: 'Chronic hepatitis B.', beers: false },
  { name: 'famciclovir', classId: 'antivirals-herpes', use: 'HSV; VZV.', beers: false },
  { name: 'ganciclovir', classId: 'antivirals-cmv', use: 'CMV retinitis / colitis.', beers: false },
  { name: 'lamivudine', classId: 'antiretrovirals', use: 'HIV; hepatitis B.', beers: false },
  { name: 'ledipasvir-sofosbuvir', classId: 'antivirals-hepatitis', use: 'Hepatitis C (genotype 1,4).', beers: false },
  { name: 'lopinavir-ritonavir', classId: 'antiretrovirals', use: 'HIV.', beers: false },
  { name: 'oseltamivir', classId: 'antivirals-influenza', use: 'Influenza A / B.', beers: false },
  { name: 'remdesivir', classId: 'antivirals-covid', use: 'COVID-19 (hospitalized).', beers: false },
  { name: 'ribavirin', classId: 'antivirals-hepatitis', use: 'Hepatitis C (combination); RSV (inhaled).', beers: false },
  { name: 'ritonavir', classId: 'antiretrovirals', use: 'HIV; CYP3A booster.', beers: false },
  { name: 'sofosbuvir', classId: 'antivirals-hepatitis', use: 'Hepatitis C (combination).', beers: false },
  { name: 'tenofovir', classId: 'antiretrovirals', use: 'HIV; hepatitis B; PrEP.', beers: false },
  { name: 'valacyclovir', classId: 'antivirals-herpes', use: 'HSV; VZV (shingles).', beers: false },
  { name: 'valganciclovir', classId: 'antivirals-cmv', use: 'CMV (oral prodrug of ganciclovir).', beers: false },
  { name: 'zanamivir', classId: 'antivirals-influenza', use: 'Influenza A / B (inhaled).', beers: false },

  // ── Urology ───────────────────────────────────────────────────────
  { name: 'alfuzosin', classId: 'alpha-blockers-bph', use: 'BPH symptoms.', beers: true },
  { name: 'doxazosin', classId: 'alpha-blockers-bph', use: 'BPH; hypertension.', beers: true },
  { name: 'dutasteride', classId: '5-alpha-reductase-inhibitors', use: 'BPH; male pattern hair loss.', beers: false },
  { name: 'finasteride', classId: '5-alpha-reductase-inhibitors', use: 'BPH; male pattern hair loss.', beers: false },
  { name: 'mirabegron', classId: 'beta3-agonists', use: 'Overactive bladder.', beers: false },
  { name: 'oxybutynin', classId: 'antimuscarinics', use: 'Overactive bladder.', beers: true },
  { name: 'silodosin', classId: 'alpha-blockers-bph', use: 'BPH symptoms.', beers: true },
  { name: 'solifenacin', classId: 'antimuscarinics', use: 'Overactive bladder.', beers: true },
  { name: 'tadalafil', classId: 'pde5-inhibitors', use: 'ED; BPH; pulmonary HTN.', beers: false },
  { name: 'tamsulosin', classId: 'alpha-blockers-bph', use: 'BPH; ureteral stones.', beers: true },
  { name: 'tolterodine', classId: 'antimuscarinics', use: 'Overactive bladder.', beers: true },
  { name: 'trospium', classId: 'antimuscarinics', use: 'Overactive bladder.', beers: true },

  // ── Dermatology / Allergy ──────────────────────────────────────────
  { name: 'cetirizine', classId: 'antihistamines-2nd-gen', use: 'Allergic rhinitis; urticaria.', beers: false },
  { name: 'cyproheptadine', classId: 'antihistamines-1st-gen', use: 'Allergies; serotonin syndrome.', beers: true },
  { name: 'desloratadine', classId: 'antihistamines-2nd-gen', use: 'Allergic rhinitis; urticaria.', beers: false },
  { name: 'diphenhydramine', classId: 'antihistamines-1st-gen', use: 'Allergies; insomnia; motion sickness.', beers: true },
  { name: 'fexofenadine', classId: 'antihistamines-2nd-gen', use: 'Allergic rhinitis; urticaria.', beers: false },
  { name: 'hydrocortisone', classId: 'corticosteroids-topical', use: 'Topical inflammation / dermatitis.', beers: false },
  { name: 'levocetirizine', classId: 'antihistamines-2nd-gen', use: 'Allergic rhinitis; urticaria.', beers: false },
  { name: 'loratadine', classId: 'antihistamines-2nd-gen', use: 'Allergic rhinitis; urticaria.', beers: false },
  { name: 'triamcinolone', classId: 'corticosteroids-topical', use: 'Topical inflammation.', beers: false },

  // ── Misc / Adrenal / Steroid ──────────────────────────────────────
  { name: 'fludrocortisone', classId: 'mineralocorticoids', use: 'Adrenal insufficiency (mineralocorticoid).', beers: false },
  { name: 'hydrocortisone (systemic)', classId: 'corticosteroids-systemic', use: 'Adrenal insufficiency; inflammation; severe asthma.', beers: false },
  { name: 'methylprednisolone', classId: 'corticosteroids-systemic', use: 'Severe inflammation; MS flare; anaphylaxis adjunct.', beers: false },
  { name: 'prednisone', classId: 'corticosteroids-systemic', use: 'Inflammation; autoimmune; asthma / COPD; chemo adjunct.', beers: true },

  // ── Hematology / Iron ─────────────────────────────────────────────
  { name: 'cyanocobalamin', classId: 'vitamin-b12', use: 'B12 deficiency; pernicious anemia.', beers: false },
  { name: 'ferric carboxymaltose', classId: 'iron-iv', use: 'Iron deficiency anemia (IV).', beers: false },
  { name: 'ferrous fumarate', classId: 'iron-oral', use: 'Iron deficiency anemia.', beers: false },
  { name: 'ferrous gluconate', classId: 'iron-oral', use: 'Iron deficiency anemia.', beers: false },
  { name: 'ferrous sulfate', classId: 'iron-oral', use: 'Iron deficiency anemia.', beers: false },
  { name: 'folic acid', classId: 'folate', use: 'Folate deficiency; pregnancy; methotrexate support.', beers: false },
  { name: 'iron sucrose', classId: 'iron-iv', use: 'Iron deficiency anemia (IV).', beers: false },
  { name: 'polysaccharide-iron complex', classId: 'iron-oral', use: 'Iron deficiency anemia (GI-tolerant).', beers: false },

  // ── EENT ──────────────────────────────────────────────────────────
  { name: 'azelastine', classId: 'antihistamines-2nd-gen', use: 'Allergic rhinitis (nasal).', beers: false },
  { name: 'bimatoprost', classId: 'prostaglandin-analogs', use: 'Open-angle glaucoma; eyelash hypotrichosis.', beers: false },
  { name: 'brimonidine', classId: 'alpha2-agonists-ocular', use: 'Open-angle glaucoma; ocular redness.', beers: false },
  { name: 'dorzolamide', classId: 'carbonic-anhydrase-inhibitors', use: 'Open-angle glaucoma.', beers: false },
  { name: 'latanoprost', classId: 'prostaglandin-analogs', use: 'Open-angle glaucoma.', beers: false },
  { name: 'pilocarpine', classId: 'cholinergic-agonists-ocular', use: 'Open-angle glaucoma; xerostomia.', beers: false },
  { name: 'travoprost', classId: 'prostaglandin-analogs', use: 'Open-angle glaucoma.', beers: false },
  { name: 'timolol (ophthalmic)', classId: 'beta-blockers', use: 'Open-angle glaucoma.', beers: false },

  // ── Herbal / OTC common ───────────────────────────────────────────
  { name: 'glucosamine', classId: 'otc-supplements', use: 'OA symptoms (evidence mixed).', beers: false },
  { name: 'melatonin', classId: 'otc-supplements', use: 'Insomnia; circadian rhythm.', beers: false },
  { name: 'omega-3', classId: 'otc-supplements', use: 'Hypertriglyceridemia; CV risk (adjunct).', beers: false },
  { name: 'senna (herbal)', classId: 'laxatives-stimulant', use: 'Constipation.', beers: false },
  { name: 'vitamin d', classId: 'otc-supplements', use: 'Vitamin D deficiency; osteoporosis support.', beers: false },
];

/** Lookup helper — find a drug name (case-insensitive). */
export function findDrugName(q: string): DrugNameEntry | undefined {
  const needle = q.trim().toLowerCase();
  if (!needle) return undefined;
  return drugNames.find((d) => d.name.toLowerCase() === needle);
}

/** Lookup helper — find all drugs in a given class. */
export function drugsInClass(classId: string): DrugNameEntry[] {
  return drugNames.filter((d) => d.classId === classId);
}
