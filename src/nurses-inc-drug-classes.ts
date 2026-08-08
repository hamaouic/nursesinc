/**
 * Nurses Inc. — Drug Classification Reference (clinician-grade).
 *
 * Used by the "Drug classification chart" section inside the Drug Cards
 * sub-tab on /forms. Helps clinicians quickly map a drug class name to
 * its mechanism, prototypical agents, and what it's used for.
 *
 * AUDIENCE: LPNs, RNs, partner physicians, pharmacists.
 *
 * Each entry includes:
 *  - class name (and common abbreviations)
 *  - one-line description / mechanism category
 *  - common generic agents in the class
 *  - what the class is used for
 *  - one classic ADR / safety note
 *
 * ⚠️ Always cross-check with current product monographs and local
 * antimicrobial / formulary guidance. Last reviewed Aug 2026.
 */

export type DrugClassEntry = {
  id: string;
  /** Class name (with common abbreviations). */
  name: string;
  /** Brief description of how the class works. */
  mechanism: string;
  /** Common prototypical / widely-used generic agents. */
  examples: string[];
  /** What the class is used for. */
  uses: string[];
  /** One classic "watch out for" safety note. */
  watchOut: string;
  /** Color tag for the chart chip. */
  color:
    | 'red'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'green'
    | 'teal'
    | 'cyan'
    | 'sky'
    | 'blue'
    | 'indigo'
    | 'purple'
    | 'fuchsia'
    | 'pink'
    | 'rose'
    | 'slate';
};

export const drugClasses: DrugClassEntry[] = [
  // ============================================================
  // ANTIMICROBIALS — Antibacterials
  // ============================================================
  {
    id: 'penicillins',
    name: 'Penicillins (PCN)',
    mechanism:
      'β-lactam — inhibits bacterial cell-wall synthesis by binding penicillin-binding proteins (PBPs); bactericidal.',
    examples: [
      'Penicillin V / G',
      'Amoxicillin',
      'Ampicillin',
      'Cloxacillin',
      'Piperacillin-tazobactam',
    ],
    uses: [
      'Streptococcal infections (pharyngitis, skin)',
      'Otitis media, sinusitis',
      'Pneumococcal pneumonia',
      'Endocarditis (with aminoglycoside)',
      'Syphilis',
      'Meningococcal prophylaxis',
    ],
    watchOut:
      'Anaphylaxis (~1 in 10,000). Always ask about PCN allergy. Severe reactions (anaphylaxis, SJS) are absolute contraindications.',
    color: 'sky',
  },
  {
    id: 'cephalosporins',
    name: 'Cephalosporins (1st–5th gen)',
    mechanism:
      'β-lactam — same mechanism as penicillins; generations differ in gram-negative coverage and β-lactamase stability.',
    examples: [
      'Cephalexin (1st)',
      'Cefuroxime (2nd)',
      'Ceftriaxone (3rd)',
      'Cefepime (4th)',
      'Ceftaroline (5th — MRSA)',
    ],
    uses: [
      'Skin / soft-tissue infections (1st gen)',
      'Community pneumonia, Lyme (2nd)',
      'Gonorrhea, meningitis, pyelonephritis (3rd)',
      'Febrile neutropenia, hospital pneumonia (4th)',
      'MRSA skin / pneumonia (5th)',
    ],
    watchOut:
      'Cross-reactivity with PCN allergy ~1–2% (mostly 1st gen). Caution in severe IgE-mediated PCN allergy — consider cephalosporin with different R1 side chain or alternative class.',
    color: 'cyan',
  },
  {
    id: 'carbapenems',
    name: 'Carbapenems',
    mechanism:
      'Broadest-spectrum β-lactams — resistant to most β-lactamases; inhibit cell-wall synthesis; bactericidal.',
    examples: ['Meropenem', 'Imipenem-cilastatin', 'Ertapenem', 'Doripenem'],
    uses: [
      'Severe hospital-acquired infections',
      'Polymicrobial intra-abdominal infections',
      'Febrile neutropenia',
      'ESBL-producing gram-negative infections',
    ],
    watchOut:
      'Reserve for serious / resistant infections — over-use drives carbapenem-resistant Enterobacterales (CRE). Seizure risk with imipenem at high doses in renal failure.',
    color: 'indigo',
  },
  {
    id: 'aminoglycosides',
    name: 'Aminoglycosides',
    mechanism:
      'Bind 30S ribosomal subunit — cause misreading of mRNA; bactericidal. Concentration-dependent killing.',
    examples: ['Gentamicin', 'Tobramycin', 'Amikacin', 'Streptomycin', 'Plazomicin'],
    uses: [
      'Serious gram-negative infections (often combined with β-lactam)',
      'Endocarditis (synergy)',
      'UTI',
      'Plague, tularemia',
      'Mycobacterial infections (streptomycin, amikacin)',
    ],
    watchOut:
      'Nephrotoxicity and ototoxicity (dose- and duration-dependent). Monitor levels (peak + trough). Avoid in pregnancy. Once-daily dosing reduces toxicity.',
    color: 'rose',
  },
  {
    id: 'macrolides',
    name: 'Macrolides',
    mechanism:
      'Bind 50S ribosomal subunit — inhibit protein synthesis; bacteriostatic (bactericidal at high doses for some organisms).',
    examples: ['Azithromycin', 'Clarithromycin', 'Erythromycin', 'Fidaxomicin'],
    uses: [
      'Atypical pneumonia (Mycoplasma, Chlamydia, Legionella)',
      'Strep pharyngitis (PCN-allergic)',
      'STIs (chlamydia, gonorrhea co-treatment)',
      'H. pylori (clarithromycin)',
      'Pertussis',
      'C. difficile (fidaxomicin)',
    ],
    watchOut:
      'QT prolongation and torsades — caution with other QT-prolonging drugs. Erythromycin is a potent CYP3A4 inhibitor (many interactions). GI upset common.',
    color: 'pink',
  },
  {
    id: 'fluoroquinolones',
    name: 'Fluoroquinolones (FQs)',
    mechanism:
      'Inhibit bacterial DNA gyrase (topoisomerase II) and topoisomerase IV; bactericidal.',
    examples: [
      'Ciprofloxacin',
      'Levofloxacin',
      'Moxifloxacin',
      'Delafloxacin',
      'Norfloxacin',
    ],
    uses: [
      'UTI / pyelonephritis',
      'Gastroenteritis (Campylobacter, Shigella)',
      'Community-acquired pneumonia (levofloxacin, moxifloxacin)',
      'Traveler\u2019s diarrhea',
      'Anthrax',
      'Plague',
    ],
    watchOut:
      'Black-box warnings: tendinopathy / tendon rupture, peripheral neuropathy, CNS effects, aortic dissection. AVOID in pregnancy, children < 18, and as first-line for uncomplicated infections.',
    color: 'amber',
  },
  {
    id: 'tetracyclines',
    name: 'Tetracyclines',
    mechanism:
      'Bind 30S ribosomal subunit — inhibit protein synthesis; bacteriostatic.',
    examples: [
      'Doxycycline',
      'Minocycline',
      'Tetracycline',
      'Tigecycline (glycylcycline)',
    ],
    uses: [
      'Lyme disease',
      'Acne (minocycline, doxycycline)',
      'Atypical pneumonia',
      'STIs (chlamydia)',
      'Malaria prophylaxis (doxycycline)',
      'Rickettsial infections',
      'Anthrax',
      'H. pylori (with other agents)',
    ],
    watchOut:
      'CONTRAINDICATED in pregnancy and children < 8 years (tooth discoloration, bone growth). Photosensitivity. Pill oesophagitis — take with full glass of water, remain upright.',
    color: 'lime',
  },
  {
    id: 'sulfonamides',
    name: 'Sulfonamides / TMP-SMX',
    mechanism:
      'Sulfas inhibit folate synthesis (PABA analogue). Trimethoprim inhibits dihydrofolate reductase. Together: sequential blockade, bactericidal.',
    examples: [
      'Trimethoprim-sulfamethoxazole (TMP-SMX / Septra / Bactrim)',
      'Sulfasalazine',
      'Sulfadiazine',
      'Sulfacetamide',
    ],
    uses: [
      'UTI (uncomplicated)',
      'PCP pneumonia (treatment + prophylaxis)',
      'Toxoplasmosis (with pyrimethamine)',
      'MRSA skin infections',
      'IBD (sulfasalazine)',
      'Burn wound infections (silver sulfadiazine)',
    ],
    watchOut:
      'SJS / TEN — especially in the first 1–2 weeks. Stevens-Johnson syndrome is a medical emergency. Other ADRs: hyperkalemia, hemolytic anemia in G6PD deficiency, crystalluria.',
    color: 'yellow',
  },
  {
    id: 'glycopeptides',
    name: 'Glycopeptides',
    mechanism:
      'Bind D-Ala-D-Ala terminus of cell-wall precursors — inhibit transglycosylation; bactericidal (slow for VRE).',
    examples: ['Vancomycin (IV / PO)', 'Teicoplanin', 'Dalbavancin', 'Telavancin', 'Oritavancin'],
    uses: [
      'MRSA infections',
      'Severe C. difficile (oral vancomycin)',
      'Endocarditis',
      'Skin / soft-tissue infections (dalbavancin — single dose)',
      'Surgical prophylaxis (PCN-allergic)',
    ],
    watchOut:
      'Nephrotoxicity, ototoxicity, "red man syndrome" (histamine release — infuse slowly over ≥ 60 min). TDM (trough levels) recommended for invasive infections.',
    color: 'orange',
  },
  {
    id: 'oxazolidinones',
    name: 'Oxazolidinones',
    mechanism:
      'Bind 50S subunit — inhibit initiation of protein synthesis; bacteriostatic (mostly).',
    examples: ['Linezolid', 'Tedizolid'],
    uses: ['MRSA (skin, pneumonia)', 'VRE', 'Complicated skin infections (tedizolid)'],
    watchOut:
      'Serotonin syndrome risk with SSRIs, MAOIs, TCAs, meperidine, tramadol, mirtazapine. Thrombocytopenia with prolonged use (> 14 d). Lactic acidosis. Peripheral / optic neuropathy with long courses.',
    color: 'red',
  },
  {
    id: 'lincosamides',
    name: 'Lincosamides',
    mechanism:
      'Bind 50S ribosomal subunit — inhibit protein synthesis; bacteriostatic.',
    examples: ['Clindamycin', 'Lincomycin (historical)'],
    uses: [
      'Anaerobic infections above the diaphragm',
      'MRSA skin / soft-tissue',
      'Bacterial vaginosis',
      'Toxoplasmosis (with pyrimethamine)',
    ],
    watchOut:
      'C. difficile risk is HIGHER than with most antibiotics — even short courses can trigger pseudomembranous colitis. Avoid unless clearly indicated.',
    color: 'fuchsia',
  },
  {
    id: 'metronidazole',
    name: 'Nitroimidazoles',
    mechanism:
      'DNA damage after reduction by anaerobic organisms; bactericidal against anaerobes and protozoa.',
    examples: ['Metronidazole', 'Tinidazole', 'Secnidazole'],
    uses: [
      'Anaerobic infections (intra-abdominal, pelvic, C. difficile)',
      'Bacterial vaginosis',
      'Trichomoniasis',
      'Giardia, amebiasis',
      'H. pylori (with other agents)',
    ],
    watchOut:
      'DISULFIRAM-like reaction with alcohol — counsel to avoid alcohol during and for ≥ 72 h after. Peripheral neuropathy with prolonged use. Metallic taste.',
    color: 'purple',
  },
  {
    id: 'nitrofurans',
    name: 'Nitrofurans',
    mechanism:
      'Multiple mechanisms — inhibit bacterial enzymes and damage DNA; bactericidal in urine.',
    examples: ['Nitrofurantoin', 'Furazidine'],
    uses: ['Uncomplicated cystitis', 'UTI prophylaxis (long-term, low-dose)'],
    watchOut:
      'Pulmonary toxicity (chronic interstitial pneumonitis with months-years of use). Contraindicated at term pregnancy (hemolytic anemia in newborn) and in CrCl < 30 mL/L (subtherapeutic).',
    color: 'teal',
  },
  // ============================================================
  // ANTIVIRALS
  // ============================================================
  {
    id: 'nrtis',
    name: 'Antiretrovirals — NRTIs',
    mechanism:
      'Nucleos(t)ide reverse transcriptase inhibitors — chain terminator once incorporated into viral DNA.',
    examples: [
      'Tenofovir',
      'Emtricitabine',
      'Lamivudine',
      'Abacavir',
      'Zidovudine',
    ],
    uses: ['HIV treatment', 'HIV pre-exposure prophylaxis (PrEP)', 'HBV (lamivudine, tenofovir)'],
    watchOut:
      'Tenofovir disoproxil fumarate (TDF): nephrotoxicity and bone loss — switch to TAF in CKD / osteoporosis. Abacavir: HLA-B*5701 testing BEFORE starting (hypersensitivity risk).',
    color: 'blue',
  },
  {
    id: 'nrtis-hcv',
    name: 'Antivirals — HCV DAAs',
    mechanism:
      'Direct-acting antivirals target specific HCV proteins (NS3/4A protease, NS5A, NS5B polymerase).',
    examples: [
      'Sofosbuvir (NS5B)',
      'Ledipasvir (NS5A)',
      'Velpatasvir (NS5A)',
      'Glecaprevir / pibrentasvir (Mavyret)',
      'Sofosbuvir / velpatasvir (Epclusa)',
    ],
    uses: ['Chronic hepatitis C — genotype-specific or pan-genotypic regimens'],
    watchOut:
      'Reactivation of hepatitis B can occur in HBV-coinfected patients — screen all HCV patients for HBsAg / anti-HBc. Drug interactions (especially with statins, antiepileptics, PPIs) are extensive — check before prescribing.',
    color: 'indigo',
  },
  {
    id: 'antivirals-influenza',
    name: 'Antivirals — Influenza',
    mechanism:
      'Neuraminidase inhibitors block release of new virions from infected cells; cap-dependent endonuclease inhibitors block mRNA transcription.',
    examples: [
      'Oseltamivir (Tamiflu)',
      'Zanamivir (Relenza)',
      'Peramivir (Rapivab)',
      'Baloxavir (Xofluza)',
    ],
    uses: [
      'Influenza A / B treatment (high-risk adults, severe disease)',
      'Influenza post-exposure prophylaxis',
    ],
    watchOut:
      'Start within 48 h of symptom onset for max benefit. Oseltamivir: nausea/vomiting (improved with food). Zanamivir: AVOID in COPD / asthma (bronchospasm). Adjust oseltamivir in renal failure.',
    color: 'sky',
  },
  {
    id: 'antivirals-herpes',
    name: 'Antivirals — Herpes family (HSV, VZV, CMV, EBV)',
    mechanism:
      'Nucleoside analogues — phosphorylated by viral kinases to inhibit viral DNA polymerase; terminate viral DNA chain.',
    examples: [
      'Acyclovir',
      'Valacyclovir (prodrug of acyclovir)',
      'Famciclovir / penciclovir',
      'Ganciclovir (CMV)',
      'Valganciclovir (oral prodrug)',
    ],
    uses: [
      'HSV-1, HSV-2',
      'Varicella / zoster',
      'CMV retinitis, colitis (immunocompromised)',
      'EBV (rarely — usually supportive)',
    ],
    watchOut:
      'Acyclovir / valacyclovir: nephrotoxicity at high IV doses — keep hydrated. Adjust dose in renal failure. Ganciclovir / valganciclovir: bone-marrow suppression (neutropenia, thrombocytopenia) — monitor CBC.',
    color: 'purple',
  },
  {
    id: 'antivirals-covid',
    name: 'Antivirals — SARS-CoV-2',
    mechanism:
      'Various: protease inhibitors (nirmatrelvir), polymerase inhibitors (remdesivir, molnupiravir).',
    examples: [
      'Nirmatrelvir / ritonavir (Paxlovid)',
      'Remdesivir (IV)',
      'Molnupiravir',
      'Tixagevimab / cilgavimab (Evusheld — pre-exposure)',
    ],
    uses: [
      'Mild-to-moderate COVID-19 in high-risk patients (within 5 days)',
      'Hospitalized COVID-19 (remdesivir)',
      'Pre-exposure prophylaxis (immunocompromised)',
    ],
    watchOut:
      'Paxlovid: ritonavir is a POTENT CYP3A4 inhibitor — extensive drug-drug interactions (amiodarone, simvastatin, DOACs, tacrolimus, many others). Molnupiravir: avoid in pregnancy (potential mutagenicity).',
    color: 'red',
  },
  // ============================================================
  // ANTIFUNGALS
  // ============================================================
  {
    id: 'azoles',
    name: 'Antifungals — Azoles',
    mechanism:
      'Inhibit ergosterol synthesis (block 14α-demethylase) — disrupt fungal cell membrane; fungistatic.',
    examples: [
      'Fluconazole',
      'Voriconazole',
      'Itraconazole',
      'Posaconazole',
      'Isavuconazole',
      'Ketoconazole (topical only — systemic banned)',
    ],
    uses: [
      'Candidiasis (fluconazole)',
      'Aspergillosis (voriconazole, posaconazole, isavuconazole)',
      'Histoplasmosis, blastomycosis',
      'Onychomycosis (itraconazole, terbinafine)',
    ],
    watchOut:
      'POTENT CYP450 inhibitors — extensive drug interactions (warfarin, statins, QT drugs, calcineurin inhibitors). Voriconazole: visual disturbances, hepatotoxicity, photosensitivity. QT prolongation (esp. fluconazole).',
    color: 'green',
  },
  {
    id: 'echinocandins',
    name: 'Antifungals — Echinocandins',
    mechanism:
      'Inhibit β-(1,3)-D-glucan synthesis — disrupt fungal cell wall; fungicidal against Candida.',
    examples: ['Caspofungin', 'Micafungin', 'Anidulafungin'],
    uses: ['Invasive candidiasis', 'Empirical therapy in febrile neutropenia', 'Aspergillosis (salvage)'],
    watchOut:
      'Generally well-tolerated. Flushing, histamine-like reactions with rapid infusion (caspofungin). Hepatotoxicity rare. No dose adjustment in renal failure (micafungin, anidulafungin).',
    color: 'teal',
  },
  {
    id: 'polyenes',
    name: 'Antifungals — Polyenes',
    mechanism:
      'Bind ergosterol — create pores in fungal cell membrane; fungicidal.',
    examples: ['Amphotericin B (conventional, liposomal)', 'Nystatin (topical)'],
    uses: [
      'Severe systemic fungal infections (liposomal amphotericin B)',
      'Cryptococcal meningitis',
      'Mucormycosis',
      'Oral / vaginal candidiasis (nystatin)',
    ],
    watchOut:
      'Conventional amphotericin B: nephrotoxicity (50%), electrolyte wasting (K⁺, Mg²⁺), fevers, chills. Liposomal formulations dramatically reduce toxicity — preferred when available.',
    color: 'rose',
  },
  // ============================================================
  // ANALGESICS / ANTI-INFLAMMATORY
  // ============================================================
  {
    id: 'nsaids',
    name: 'NSAIDs (Non-Steroidal Anti-Inflammatory Drugs)',
    mechanism:
      'Inhibit cyclooxygenase (COX-1 and/or COX-2) — reduce prostaglandin synthesis; analgesic, anti-inflammatory, antipyretic, antiplatelet.',
    examples: [
      'Ibuprofen',
      'Naproxen',
      'Diclofenac',
      'Celecoxib (COX-2 selective)',
      'Indomethacin',
      'Ketorolac (short-term IV/IM only)',
      'Aspirin (low dose = antiplatelet)',
    ],
    uses: [
      'Pain (mild-moderate)',
      'Fever',
      'Inflammation (arthritis, sprains, dysmenorrhea)',
      'Antiplatelet therapy (low-dose ASA)',
      'Closure of PDA in neonates (indomethacin, ibuprofen)',
    ],
    watchOut:
      'GI bleeding / ulceration, renal impairment (especially with ACE-I/ARB, diuretics — "triple whammy"), hypertension, heart failure exacerbation, platelet dysfunction. AVOID in 3rd trimester of pregnancy (premature ductus closure).',
    color: 'amber',
  },
  {
    id: 'acetaminophen',
    name: 'Acetaminophen (APAP / Paracetamol)',
    mechanism:
      'Central COX inhibition (COX-3, possibly); reduces prostaglandins in CNS — analgesic and antipyretic. Lacks peripheral anti-inflammatory effect.',
    examples: ['Acetaminophen (oral, rectal, IV)'],
    uses: [
      'Pain (mild-moderate)',
      'Fever',
      'First-line analgesic in pregnancy',
      'First-line analgesic in CKD',
    ],
    watchOut:
      'Hepatotoxicity at high doses — max 4 g/day in healthy adults (often 3 g in liver disease, alcohol use, malnutrition). Antidote: N-acetylcysteine (NAC) within 8–10 h of acute overdose.',
    color: 'yellow',
  },
  {
    id: 'opioids',
    name: 'Opioids',
    mechanism:
      'Bind mu (µ), kappa (κ), and delta (δ) opioid receptors in CNS and periphery — modulate pain signaling; CNS and respiratory depression.',
    examples: [
      'Morphine',
      'Hydromorphone',
      'Oxycodone',
      'Fentanyl',
      'Codeine',
      'Tramadol (also serotonergic)',
      'Methadone (also NMDA antagonist)',
      'Buprenorphine (partial agonist)',
    ],
    uses: [
      'Severe acute pain (post-op, fracture, burn)',
      'Cancer pain',
      'Palliative / end-of-life care',
      'Chronic non-cancer pain (controversial — careful patient selection)',
    ],
    watchOut:
      'Respiratory depression, sedation, constipation (prophylactic laxatives!), nausea, dependence / tolerance. Naloxone for overdose. AVOID with alcohol, benzodiazepines, gabapentinoids (combination risk).',
    color: 'rose',
  },
  {
    id: 'gabapentinoids',
    name: 'Gabapentinoids',
    mechanism:
      'Bind α2δ subunit of voltage-gated calcium channels — reduce neurotransmitter release; analgesic, anticonvulsant.',
    examples: ['Gabapentin', 'Pregabalin'],
    uses: [
      'Neuropathic pain (post-herpetic neuralgia, diabetic neuropathy)',
      'Fibromyalgia (pregabalin)',
      'Adjunct for partial seizures',
      'Restless legs syndrome',
    ],
    watchOut:
      'Sedation, dizziness, peripheral edema, weight gain. RENAL dose adjustment (both drugs). Risk of misuse / dependence, especially pregabalin. Withdrawal seizures if abrupt discontinuation.',
    color: 'pink',
  },
  // ============================================================
  // CARDIOVASCULAR
  // ============================================================
  {
    id: 'ace-inhibitors',
    name: 'ACE Inhibitors (ACE-I)',
    mechanism:
      'Block angiotensin-converting enzyme — reduce angiotensin II and aldosterone; vasodilate, reduce preload / afterload, natriuresis.',
    examples: [
      'Ramipril',
      'Lisinopril',
      'Enalapril',
      'Perindopril',
      'Trandolapril',
    ],
    uses: [
      'Hypertension',
      'Heart failure (HFrEF)',
      'Post-MI (cardiac remodeling)',
      'Diabetic nephropathy (albuminuria)',
      'Primary prevention (high CV risk)',
    ],
    watchOut:
      'DRY COUGH (~10–15% — switch to ARB). Angioedema (rare but life-threatening — airway emergency). Hyperkalemia. AVOID in pregnancy (teratogenic).',
    color: 'cyan',
  },
  {
    id: 'arbs',
    name: 'ARBs (Angiotensin II Receptor Blockers)',
    mechanism:
      'Block AT1 receptor — same downstream effects as ACE-I but no effect on bradykinin (less cough).',
    examples: [
      'Losartan',
      'Valsartan',
      'Irbesartan',
      'Candesartan',
      'Telmisartan',
      'Olmesartan',
    ],
    uses: [
      'Hypertension',
      'Heart failure (HFrEF — candesartan, valsartan)',
      'Diabetic nephropathy (losartan, irbesartan)',
      'Post-MI (valsartan)',
    ],
    watchOut:
      'Hyperkalemia, AKI (especially with NSAID, dehydration). NO cough (vs ACE-I), but angioedema still occurs (less common). AVOID in pregnancy.',
    color: 'sky',
  },
  {
    id: 'statins',
    name: 'Statins (HMG-CoA Reductase Inhibitors)',
    mechanism:
      'Inhibit HMG-CoA reductase — block cholesterol synthesis in liver; upregulate LDL receptors; reduce LDL-C.',
    examples: [
      'Atorvastatin',
      'Rosuvastatin',
      'Simvastatin',
      'Pravastatin',
      'Lovastatin',
      'Fluvastatin',
    ],
    uses: [
      'Primary and secondary prevention of ASCVD',
      'Familial hypercholesterolemia',
      'Acute coronary syndrome (high-intensity)',
      'Diabetic patients 40–75 with risk factors',
    ],
    watchOut:
      'Myalgia, myopathy (rare rhabdomyolysis — risk ↑ with fibrates, cyclosporine, clarithromycin). Hepatotoxicity — check baseline ALT. New-onset diabetes risk (small absolute).',
    color: 'lime',
  },
  {
    id: 'beta-blockers',
    name: 'Beta-Blockers',
    mechanism:
      'Block β1 (and sometimes β2) adrenergic receptors — reduce heart rate, contractility, blood pressure.',
    examples: [
      'Metoprolol (β1 selective)',
      'Bisoprolol (β1 selective)',
      'Atenolol (β1 selective)',
      'Propranolol (non-selective)',
      'Carvedilol (α + β)',
      'Labetalol (α + β)',
    ],
    uses: [
      'Hypertension',
      'Heart failure (HFrEF: bisoprolol, carvedilol, metoprolol succinate)',
      'Post-MI',
      'Atrial fibrillation (rate control)',
      'Angina',
      'Migraine prophylaxis (propranolol)',
    ],
    watchOut:
      'Bradycardia, AV block, bronchospasm (non-selective — avoid in asthma). Mask hypoglycemia in diabetics. Withdrawal syndrome (tachycardia, ischemia) — taper over 1–2 weeks.',
    color: 'blue',
  },
  {
    id: 'ccb',
    name: 'Calcium Channel Blockers',
    mechanism:
      'Block L-type calcium channels — vasodilation (dihydropyridines) and / or cardiac depression (non-DHPs).',
    examples: [
      'Amlodipine (DHP)',
      'Nifedipine (DHP)',
      'Felodipine (DHP)',
      'Diltiazem (non-DHP)',
      'Verapamil (non-DHP)',
    ],
    uses: [
      'Hypertension (DHP)',
      'Angina',
      'Atrial fibrillation (rate control — non-DHP)',
      'Supraventricular tachycardia (non-DHP)',
      'Raynaud phenomenon',
    ],
    watchOut:
      'DHPs: peripheral edema, flushing, headache. Non-DHPs: bradycardia, AV block, constipation (verapamil). Avoid non-DHPs with beta-blockers (bradycardia).',
    color: 'teal',
  },
  {
    id: 'diuretics',
    name: 'Diuretics',
    mechanism:
      'Increase renal excretion of sodium and water. Different classes act at different nephron segments.',
    examples: [
      'Furosemide (loop)',
      'Bumetanide (loop)',
      'Hydrochlorothiazide (thiazide)',
      'Chlorthalidone (thiazide-like)',
      'Indapamide (thiazide-like)',
      'Spironolactone (K-sparing)',
      'Eplerenone (K-sparing)',
      'Amiloride, triamterene (K-sparing)',
    ],
    uses: [
      'Heart failure (loop, MRA)',
      'Hypertension (thiazide-like)',
      'Edema (loop)',
      'Primary hyperaldosteronism (spironolactone)',
      'Hypokalemia prevention (K-sparing)',
    ],
    watchOut:
      'Electrolyte wasting (K⁺, Mg²⁺, Na⁺), volume depletion, AKI. Loop diuretics cause ototoxicity at high IV doses. Thiazides: hyperuricemia (gout), hyperglycemia, hypercalcemia. MRAs: hyperkalemia.',
    color: 'sky',
  },
  {
    id: 'anticoagulants-doac',
    name: 'DOACs (Direct Oral Anticoagulants)',
    mechanism:
      'Directly inhibit thrombin (dabigatran) or factor Xa (apixaban, rivaroxaban, edoxaban).',
    examples: [
      'Apixaban (Xa)',
      'Rivaroxaban (Xa)',
      'Edoxaban (Xa)',
      'Dabigatran (IIa)',
    ],
    uses: [
      'Atrial fibrillation (stroke prevention)',
      'VTE treatment and secondary prevention',
      'Post-orthopedic surgery prophylaxis',
    ],
    watchOut:
      'Bleeding — reversal agents: andexanet alfa (Xa inhibitors), idarucizumab (dabigatran). Renal dose adjustment. Avoid in mechanical heart valves (rivaroxaban — RE-ALIGN trial harm).',
    color: 'red',
  },
  {
    id: 'anticoagulants-warfarin',
    name: 'Vitamin K Antagonists (Warfarin)',
    mechanism:
      'Inhibit vitamin K epoxide reductase — reduce synthesis of clotting factors II, VII, IX, X, and proteins C and S.',
    examples: ['Warfarin'],
    uses: [
      'Atrial fibrillation',
      'Mechanical heart valves',
      'VTE',
      'Hypercoagulable states (some)',
    ],
    watchOut:
      'INR monitoring (target 2.0–3.0, 2.5–3.5 for mechanical mitral valve). Numerous drug and food (vitamin K) interactions. Bleeding reversal: vitamin K (slow), 4-factor PCC (fast).',
    color: 'orange',
  },
  {
    id: 'antiplatelets',
    name: 'Antiplatelets',
    mechanism:
      'Various — inhibit platelet aggregation through COX-1 (ASA), P2Y12 receptor (clopidogrel), or GP IIb/IIIa (abciximab).',
    examples: [
      'Aspirin (low dose)',
      'Clopidogrel',
      'Ticagrelor',
      'Prasugrel',
      'Dipyridamole',
    ],
    uses: [
      'Acute coronary syndrome (DAPT: ASA + P2Y12)',
      'Post-PCI (stent)',
      'Stroke prevention (non-cardioembolic)',
      'Peripheral arterial disease',
    ],
    watchOut:
      'Bleeding (especially GI). PPI co-therapy with clopidogrel if high GI bleed risk (avoid omeprazole — CYP2C19 inhibition reduces clopidogrel effect). Ticagrelor: dyspnea, bradycardia.',
    color: 'red',
  },
  // ============================================================
  // CNS / PSYCHIATRIC
  // ============================================================
  {
    id: 'ssris',
    name: 'SSRIs (Selective Serotonin Reuptake Inhibitors)',
    mechanism:
      'Selectively inhibit serotonin reuptake in CNS — increase synaptic serotonin.',
    examples: [
      'Sertraline',
      'Citalopram',
      'Escitalopram',
      'Fluoxetine',
      'Paroxetine',
      'Fluvoxamine',
    ],
    uses: [
      'Major depressive disorder',
      'Anxiety disorders (GAD, panic, social anxiety)',
      'OCD',
      'PTSD',
      'PMDD',
    ],
    watchOut:
      'Serotonin syndrome (with other serotonergic drugs). Hyponatremia (SIADH, especially elderly). QT prolongation (citalopram max 20 mg > 65 y). Bleeding risk ↑ with NSAIDs / warfarin. Discontinuation syndrome — taper slowly.',
    color: 'indigo',
  },
  {
    id: 'snris',
    name: 'SNRIs (Serotonin-Norepinephrine Reuptake Inhibitors)',
    mechanism:
      'Inhibit both serotonin and norepinephrine reuptake.',
    examples: ['Venlafaxine', 'Desvenlafaxine', 'Duloxetine', 'Levomilnacipran'],
    uses: [
      'Major depression',
      'Generalized anxiety disorder',
      'Neuropathic pain (duloxetine)',
      'Fibromyalgia (duloxetine)',
      'Stress urinary incontinence (duloxetine — off-label)',
    ],
    watchOut:
      'Hypertension (venlafaxine — dose-related). Hepatotoxicity (duloxetine — avoid in alcoholism / liver disease). Serotonin syndrome. Discontinuation syndrome.',
    color: 'indigo',
  },
  {
    id: 'benzodiazepines',
    name: 'Benzodiazepines',
    mechanism:
      'Positive allosteric modulators at GABA-A receptor — enhance GABA-mediated chloride influx; anxiolytic, sedative, muscle relaxant, anticonvulsant.',
    examples: [
      'Lorazepam',
      'Diazepam',
      'Alprazolam',
      'Clonazepam',
      'Midazolam',
      'Temazepam',
    ],
    uses: [
      'Status epilepticus (lorazepam, midazolam)',
      'Procedural sedation',
      'Alcohol withdrawal',
      'Anxiety (short-term)',
      'Insomnia (short-term)',
    ],
    watchOut:
      'Tolerance, dependence, withdrawal (seizures). Falls in elderly (BEERS list). Respiratory depression — AVOID with opioids (combination is dangerous). Reversal: flumazenil (rarely used — seizures).',
    color: 'purple',
  },
  {
    id: 'antipsychotics',
    name: 'Antipsychotics',
    mechanism:
      'Block dopamine D2 receptors (typical and atypical). Atypicals also affect 5-HT2A receptors.',
    examples: [
      'Haloperidol (typical, high-potency)',
      'Chlorpromazine (typical, low-potency)',
      'Risperidone',
      'Olanzapine',
      'Quetiapine',
      'Aripiprazole (partial agonist)',
      'Clozapine',
    ],
    uses: [
      'Schizophrenia',
      'Bipolar disorder (mania, maintenance)',
      'Major depression (adjunct)',
      'Delirium (haloperidol)',
      'Tourette syndrome',
      'Agitation (IM olanzapine)',
    ],
    watchOut:
      'Extrapyramidal symptoms (EPS), tardive dyskinesia (irreversible), NMS (life-threatening), metabolic syndrome (weight, glucose, lipids — atypicals), hyperprolactinemia, QT prolongation. Clozapine: agranulocytosis — strict monitoring.',
    color: 'fuchsia',
  },
  {
    id: 'mood-stabilizers',
    name: 'Mood Stabilizers',
    mechanism:
      'Various: lithium alters inositol phosphate signaling; valproate and carbamazepine modulate ion channels / GABA.',
    examples: [
      'Lithium',
      'Valproic acid (divalproex)',
      'Carbamazepine',
      'Lamotrigine',
    ],
    uses: [
      'Bipolar disorder (mania, depression, maintenance)',
      'Epilepsy (lamotrigine, valproate, carbamazepine)',
      'Migraine prophylaxis (valproate)',
    ],
    watchOut:
      'Lithium: narrow therapeutic index — monitor levels, renal function, TSH. Valproate: hepatotoxic, teratogenic (neural tube defects — avoid in pregnancy). Carbamazepine: agranulocytosis, SJS (HLA-B*1502 in Asian patients). Lamotrigine: SJS — slow titration.',
    color: 'sky',
  },
  // ============================================================
  // ENDOCRINE / METABOLIC
  // ============================================================
  {
    id: 'metformin',
    name: 'Biguanides (Metformin)',
    mechanism:
      'Decrease hepatic gluconeogenesis, increase peripheral insulin sensitivity; euglycemic.',
    examples: ['Metformin'],
    uses: ['Type 2 diabetes (first-line)', 'Prediabetes', 'PCOS (off-label)', 'Weight gain from antipsychotics (off-label)'],
    watchOut:
      'GI side effects (diarrhea, nausea) — start low, titrate. Lactic acidosis (rare — contraindicated in eGFR < 30). Hold for contrast studies. Vitamin B12 deficiency with long-term use.',
    color: 'green',
  },
  {
    id: 'glp1',
    name: 'GLP-1 Receptor Agonists',
    mechanism:
      'Mimic glucagon-like peptide-1 — enhance glucose-dependent insulin secretion, suppress glucagon, slow gastric emptying, promote satiety.',
    examples: [
      'Semaglutide (Ozempic, Wegovy)',
      'Liraglutide (Victoza, Saxenda)',
      'Dulaglutide (Trulicity)',
      'Tirzepatide (Mounjaro — also GIP)',
    ],
    uses: [
      'Type 2 diabetes',
      'Obesity (semaglutide, liraglutide, tirzepatide)',
      'Cardiovascular risk reduction (high-risk T2DM)',
    ],
    watchOut:
      'Nausea, vomiting (dose-related — titrate slowly). Gallbladder disease. Pancreatitis (rare). CONTRAINDICATED with personal / family history of medullary thyroid carcinoma or MEN 2. Hold before major surgery / endoscopy (aspiration risk).',
    color: 'lime',
  },
  {
    id: 'insulin',
    name: 'Insulin',
    mechanism:
      'Exogenous insulin — binds insulin receptor, promotes glucose uptake into cells, inhibits hepatic gluconeogenesis.',
    examples: [
      'Rapid: lispro, aspart, glulisine',
      'Short: regular (Humulin R, Novolin R)',
      'Intermediate: NPH',
      'Long: glargine (Lantus, Basaglar), detemir, degludec',
      'Premixed: 70/30, NovoMix 30',
    ],
    uses: ['Type 1 diabetes (mandatory)', 'Type 2 diabetes (when oral agents insufficient)', 'DKA, HHS, acute illness', 'Pregnancy in pre-existing diabetes'],
    watchOut:
      'HYPOGLYCEMIA — most important ADR. Teach patient recognition and treatment (15 g carbs). Lipodystrophy at injection sites — rotate. Weight gain. Always re-check dosing for "u" vs "units".',
    color: 'orange',
  },
  {
    id: 'thyroid',
    name: 'Thyroid Agents',
    mechanism:
      'Levothyroxine replaces T4 (converted to T3 in periphery). Methimazole / PTU block thyroid peroxidase to reduce hormone synthesis.',
    examples: [
      'Levothyroxine (T4)',
      'Liothyronine (T3)',
      'Methimazole',
      'Propylthiouracil (PTU)',
    ],
    uses: ['Hypothyroidism (levothyroxine)', 'Hyperthyroidism — Graves, toxic nodular goiter (methimazole, PTU)'],
    watchOut:
      'Levothyroxine: take on empty stomach, 30–60 min before food / coffee / Ca²⁺/Fe²⁺. Methimazole: agranulocytosis (counsel — fever + sore throat → urgent CBC). PTU: hepatotoxicity — reserve for 1st trimester or methimazole intolerance.',
    color: 'amber',
  },
  {
    id: 'corticosteroids',
    name: 'Corticosteroids (systemic)',
    mechanism:
      'Bind glucocorticoid receptor — broad anti-inflammatory and immunosuppressive effects; reduce cytokine transcription.',
    examples: [
      'Prednisone / prednisolone',
      'Methylprednisolone',
      'Dexamethasone',
      'Hydrocortisone (replacement)',
    ],
    uses: [
      'Asthma / COPD exacerbations',
      'Autoimmune disease (lupus, vasculitis)',
      'IBD',
      'Adrenal insufficiency (replacement)',
      'Croup, anaphylaxis (adjunct)',
      'Chemotherapy-induced nausea (dexa)',
      'Cerebral edema',
      'Severe COVID-19',
    ],
    watchOut:
      'Hyperglycemia, hypertension, osteoporosis, cataracts, adrenal suppression (with > 2–3 weeks of systemic use — taper!), mood changes, infection risk. AVOID abrupt discontinuation after prolonged use.',
    color: 'lime',
  },
  {
    id: 'inhaled-cs',
    name: 'Inhaled Corticosteroids (ICS)',
    mechanism:
      'Topical anti-inflammatory in the airways with minimal systemic absorption.',
    examples: [
      'Budesonide',
      'Fluticasone',
      'Mometasone',
      'Beclomethasone',
      'Ciclesonide',
    ],
    uses: ['Asthma (maintenance)', 'COPD (with frequent exacerbations)', 'Eosinophilic bronchitis'],
    watchOut:
      'Oral thrush, dysphonia — rinse mouth and use spacer. High-dose ICS: systemic effects (adrenal suppression, bone density — small).',
    color: 'green',
  },
  {
    id: 'bronchodilators',
    name: 'Bronchodilators',
    mechanism:
      'β2-agonists relax airway smooth muscle. Anticholinergics block vagal-mediated bronchoconstriction.',
    examples: [
      'Salbutamol (SABA)',
      'Formoterol (LABA)',
      'Salmeterol (LABA)',
      'Tiotropium (LAMA)',
      'Ipratropium (SAMA)',
    ],
    uses: [
      'Asthma (SABA rescue, LABA with ICS)',
      'COPD (LABA, LAMA, combination)',
      'Hyperkalemia (salbutamol)',
    ],
    watchOut:
      'Tremor, tachycardia, hypokalemia (β2). Anticholinergics: dry mouth, urinary retention, glaucoma exacerbation. NEVER use LABA without ICS in asthma (increased mortality).',
    color: 'cyan',
  },
  {
    id: 'ppis',
    name: 'Proton Pump Inhibitors (PPIs)',
    mechanism:
      'Irreversibly inhibit H⁺/K⁺-ATPase in gastric parietal cells — reduce gastric acid secretion.',
    examples: [
      'Omeprazole',
      'Pantoprazole',
      'Lansoprazole',
      'Esomeprazole',
      'Dexlansoprazole',
    ],
    uses: [
      'GERD, erosive esophagitis',
      'Peptic ulcer disease (treatment and prevention)',
      'H. pylori eradication (with antibiotics)',
      'Stress ulcer prophylaxis (ICU)',
      'Zollinger-Ellison syndrome',
    ],
    watchOut:
      'Long-term: C. difficile risk, B12 / magnesium deficiency, bone fractures (hip, wrist). Rebound acid hypersecretion on abrupt discontinuation — taper. Drug interactions (clopidogrel + omeprazole — avoid).',
    color: 'fuchsia',
  },
  {
    id: 'antihistamines',
    name: 'Antihistamines (H1 Blockers)',
    mechanism:
      'Block H1 histamine receptors. 1st generation cross BBB (sedating); 2nd generation do not.',
    examples: [
      'Diphenhydramine (1st gen)',
      'Hydroxyzine (1st gen)',
      'Cetirizine (2nd gen)',
      'Loratadine (2nd gen)',
      'Fexofenadine (2nd gen)',
      'Desloratadine (2nd gen)',
    ],
    uses: [
      'Allergic rhinitis',
      'Urticaria',
      'Atopic dermatitis',
      'Insomnia (1st gen — diphenhydramine)',
      'Anxiety (hydroxyzine)',
      'Motion sickness (1st gen)',
    ],
    watchOut:
      '1st gen: sedation, anticholinergic effects (dry mouth, urinary retention, confusion) — AVOID in elderly (BEERS list). 2nd gen: minimal sedation.',
    color: 'yellow',
  },
  {
    id: 'immunosuppressants',
    name: 'Immunosuppressants (transplant / autoimmune)',
    mechanism:
      'Various — calcineurin inhibitors (cyclosporine, tacrolimus), antiproliferatives (mycophenolate, azathioprine), biologics.',
    examples: [
      'Tacrolimus',
      'Cyclosporine',
      'Mycophenolate mofetil',
      'Azathioprine',
      'Methotrexate (low dose)',
      'Sirolimus / everolimus (mTOR inhibitors)',
    ],
    uses: [
      'Solid-organ transplant rejection prophylaxis',
      'Severe autoimmune disease (SLE, vasculitis, IBD)',
      'Severe psoriasis, RA (methotrexate)',
    ],
    watchOut:
      'Increased infection risk (incl. opportunistic). Nephrotoxicity (calcineurin inhibitors). TDM required (tacrolimus, cyclosporine). Mycophenolate: teratogenic — strict contraception. Azathioprine: TPMT testing recommended.',
    color: 'red',
  },
  {
    id: 'biologics',
    name: 'Biologics / Monoclonal Antibodies',
    mechanism:
      'Targeted — bind specific cytokines, receptors, or cell-surface proteins implicated in disease.',
    examples: [
      'Adalimumab (TNF-α)',
      'Infliximab (TNF-α)',
      'Etanercept (TNF-α)',
      'Rituximab (CD20)',
      'Tocilizumab (IL-6)',
      'Ustekinumab (IL-12/23)',
      'Dupilumab (IL-4/13)',
    ],
    uses: [
      'Rheumatoid arthritis, psoriatic arthritis',
      'IBD (Crohn, UC)',
      'Psoriasis',
      'Severe asthma (dupilumab)',
      'Lymphoma, autoimmune cytopenias (rituximab)',
    ],
    watchOut:
      'Increased infection risk — screen for TB, hepatitis B, HIV before starting. Live vaccines CONTRAINDICATED on biologics. Infusion reactions. Rare demyelinating disease (anti-TNF).',
    color: 'pink',
  },
];
