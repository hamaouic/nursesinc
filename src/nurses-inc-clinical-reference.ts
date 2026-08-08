/**
 * Nurses Inc. — Clinical Reference (clinician-grade).
 *
 * Used by the "Definitions" toggle in the Clinical Forms & Tools
 * section on /forms, in the "For Nurses & Physicians" view.
 *
 * AUDIENCE: LPNs, RNs, partner physicians, pharmacists. This is
 * clinical reference content, NOT patient education. The patient-
 * facing glossary (nurses-inc-glossary.ts) is what families see.
 *
 * Each entry includes:
 *  - clinical context (when to suspect, when to escalate)
 *  - first-line + alternative regimens
 *  - adult dosing
 *  - key adverse drug reactions ("what to look out for")
 *  - major drug interactions
 *  - renal / hepatic dose adjustments where relevant
 *  - pregnancy / lactation considerations where relevant
 *
 * ⚠️ Always cross-check with current product monographs, local
 * antimicrobial stewardship guidance, and the Public Health Agency
 * of Canada (PHAC) / Association of Medical Microbiology and
 * Infectious Disease (AMMI) Canada resources. Treatment guidelines
 * change — last reviewed Aug 2026.
 */

export type ClinicalRefEntry = {
  id: string;
  /** Headline — the antibiotic or drug regimen. */
  title: string;
  /** Disease / syndrome treated. */
  indication: string;
  /** Drug class. */
  drugClass: string;
  /** Mechanism of action (brief). */
  mechanism: string;
  /** Adult dosing — first-line regimen. */
  firstLine: string;
  /** Adult dosing — alternatives (allergy, contraindication, etc.). */
  alternatives?: string;
  /** Typical treatment duration. */
  duration?: string;
  /** Key adverse drug reactions — "what to look out for". */
  adrs: string[];
  /** Major drug interactions. */
  interactions: string[];
  /** Renal / hepatic adjustments. */
  doseAdjust?: string;
  /** Pregnancy / lactation considerations. */
  pregnancy?: string;
  /** Nursing monitoring pearls. */
  monitoring: string[];
  /** Quick escalation / safety note. */
  escalation?: string;
  /** Group tag for filtering. */
  group: 'std' | 'respiratory' | 'vaccine' | 'general';
};

export const clinicalReference: ClinicalRefEntry[] = [
  // --------- STIs / STDs ---------
  {
    id: 'sti-chlamydia',
    title: 'Chlamydia trachomatis',
    indication: 'Uncomplicated urogenital chlamydia (adolescent / adult)',
    drugClass: 'Tetracycline antibiotic',
    mechanism:
      'Inhibits bacterial protein synthesis by binding the 30S ribosomal subunit; bacteriostatic.',
    firstLine:
      'Doxycycline 100 mg PO BID × 7 days (preferred over azithromycin per current CDC/AMMI guidance).',
    alternatives:
      'Azithromycin 1 g PO × 1 single dose (preferred in pregnancy); Levofloxacin 500 mg PO daily × 7 days.',
    duration: '7 days',
    adrs: [
      'Doxycycline: photosensitivity (strict sun avoidance), pill oesophagitis (take with full glass of water, remain upright), mild GI upset.',
      'Azithromycin: GI upset, QT prolongation (lower than macrolides like erythromycin).',
      'Doxycycline contraindicated in pregnancy and children < 8 years (tooth discoloration, bone growth).',
    ],
    interactions: [
      'Doxycycline: chelates with Ca²⁺/Mg²⁺/Fe²⁺/Al³⁺ antacids — separate by 2–4 h.',
      'Doxycycline: potentiates warfarin (monitor INR).',
      'Azithromycin: QT prolongation risk with anti-arrhythmics, antipsychotics, fluoroquinolones.',
    ],
    doseAdjust:
      'No renal adjustment required. Use with caution in hepatic impairment.',
    pregnancy:
      'Doxycycline is CONTRAINDICATED in pregnancy and breastfeeding (use azithromycin 1 g PO × 1).',
    monitoring: [
      'Test of cure not routinely required for uncomplicated urogenital infection treated with doxycycline (was recommended with azithromycin).',
      'Re-screen at 3 months for re-infection (common in younger patients).',
      'Partner notification and treatment essential.',
    ],
    escalation:
      'If PID suspected (pelvic pain, fever, cervical motion tenderness) → urgent GYN referral + in-patient IV therapy may be required.',
    group: 'std',
  },
  {
    id: 'sti-gonorrhea',
    title: 'Neisseria gonorrhoeae',
    indication: 'Uncomplicated urogenital, rectal, or pharyngeal gonorrhea',
    drugClass: 'Third-generation cephalosporin',
    mechanism:
      'Ceftriaxone inhibits bacterial cell-wall synthesis by binding penicillin-binding proteins; bactericidal.',
    firstLine:
      'Ceftriaxone 500 mg IM × 1 single dose (1 g if ≥ 150 kg). PLUS empirical treatment for chlamydia: Doxycycline 100 mg PO BID × 7 days (if chlamydia not yet excluded).',
    alternatives:
      'Cefixime 800 mg PO × 1 (only if ceftriaxone unavailable — NOT for pharyngeal disease). Spectinomycin 2 g IM × 1 if severe β-lactam allergy (limited availability).',
    duration: 'Single dose (+ 7-day chlamydia coverage)',
    adrs: [
      'Ceftriaxone: pain at IM injection site, hypersensitivity reactions (10% cross-reactivity with severe penicillin allergy).',
      'Trends: rising ceftriaxone MICs globally — single-dose monotherapy remains first-line but dose escalation is monitored.',
      'Co-administration with lidocaine (for IM) — caution with cardiac conduction disorders.',
    ],
    interactions: [
      'Ceftriaxone: do NOT co-administer with IV calcium-containing solutions in neonates (lethal precipitation).',
      'Probenecid increases ceftriaxone levels (not usually needed).',
      'Caution with concurrent anticoagulants (cephalosporins may prolong PT).',
    ],
    doseAdjust:
      'Reduce dose / frequency in severe renal impairment (CrCl < 10 mL/min) AND concurrent hepatic dysfunction. Not typically relevant for single-dose therapy.',
    pregnancy:
      'Ceftriaxone is SAFE in pregnancy. Azithromycin 1 g PO × 1 may be added if chlamydia not excluded (azithromycin is also safe in pregnancy).',
    monitoring: [
      'Test of cure recommended at 7–14 days for pharyngeal infection (higher treatment-failure rate).',
      'Re-screen at 3 months for re-infection.',
      'Report all confirmed cases to local public health.',
      'Partner notification and treatment in the last 60 days.',
    ],
    escalation:
      'Disseminated gonococcal infection (tenosynovitis, dermatitis, polyarthralgia) → hospital admission + IV ceftriaxone 1 g daily.',
    group: 'std',
  },
  {
    id: 'sti-syphilis',
    title: 'Treponema pallidum (syphilis)',
    indication: 'Primary, secondary, early latent, late latent, and tertiary syphilis',
    drugClass: 'Long-acting intramuscular penicillin',
    mechanism:
      'Benzathine penicillin G is a depot IM formulation that slowly releases penicillin; bactericidal via inhibition of cell-wall synthesis.',
    firstLine:
      'Primary / secondary / early latent (< 1 year): Benzathine penicillin G 2.4 million units IM × 1 single dose. Late latent / unknown duration / tertiary (excluding neurosyphilis): 2.4 million units IM weekly × 3 doses.',
    alternatives:
      'Doxycycline 100 mg PO BID × 14 days (early) or × 28 days (late) — only if true penicillin allergy. NEVER in pregnancy.',
    duration: '1 day (early) or 3 weeks (late)',
    adrs: [
      'Jarisch-Herxheimer reaction: acute fever, chills, myalgia, headache within 24 h of first dose — especially in early syphilis. Reassure + acetaminophen; NOT an allergy.',
      'True penicillin allergy (anaphylaxis): use doxycycline.',
      'Injection-site pain (deep IM gluteal).',
    ],
    interactions: [
      'Methotrexate, probenecid: decrease penicillin clearance.',
      'Oral contraceptives: antibiotics historically warned but evidence weak — no longer a standard interaction warning.',
      'Live vaccines: theoretical ↓ response — separate by 2 weeks if possible.',
    ],
    doseAdjust:
      'No adjustment required for benzathine penicillin G (IM only — not renally cleared).',
    pregnancy:
      'Benzathine penicillin G is the ONLY recommended treatment in pregnancy. Penicillin-allergic pregnant patients must be DESENSITIZED, not switched to doxycycline.',
    monitoring: [
      'RPR / VDRL titre at 3, 6, 12, 24 months — expect 4-fold drop over 6–12 months.',
      'Risk of neurological, ocular, or otic syphilis — refer if any symptoms develop.',
      'HIV testing recommended (co-infection common).',
    ],
    escalation:
      'Suspected neurosyphilis, ocular syphilis, or otic syphilis → IV crystalline penicillin G 3–4 million units q4h × 10–14 days. NEVER treat with benzathine alone.',
    group: 'std',
  },
  {
    id: 'sti-hiv',
    title: 'HIV (initial antiretroviral therapy)',
    indication: 'Newly diagnosed HIV-1, antiretroviral-naive adult',
    drugClass: 'Integrase strand-transfer inhibitor (INSTI) + 2 NRTIs',
    mechanism:
      'INSTIs block integration of viral DNA into host genome; NRTIs are nucleoside reverse-transcriptase inhibitors that terminate viral DNA chain elongation.',
    firstLine:
      'Bictegravir / emtricitabine / tenofovir alafenamide (Biktarvy) 50/200/25 mg PO once daily. Alternatives: dolutegravir + (emtricitabine or lamivudine) + tenofovir (DTG+XTC+TAF/TDF).',
    alternatives:
      'Dolutegravir / lamivudine (Dovato) 50/300 mg PO daily — only if HIV RNA < 500,000 copies/mL and hepatitis B negative.',
    duration: 'Indefinite',
    adrs: [
      'Bictegravir / dolutegravir: mild GI upset, headache, rare weight gain. DTG historically associated with neural-tube defects when used at conception (now largely refuted at standard doses).',
      'Tenofovir alafenamide (TAF): minimal renal / bone toxicity (vs older TDF).',
      'Watch for immune reconstitution inflammatory syndrome (IRIS) in first months.',
    ],
    interactions: [
      'INSTIs (BIC, DTG): chelation with Ca²⁺/Mg²⁺/Fe²⁺ antacids — separate by 2 h (or 6 h if taken with food).',
      'Dolutegravir: increased levels with cobicistat, efavirenz, rifampin (needs dose doubling with rifampin).',
      'Tenofovir: do NOT combine with nephrotoxic agents (NSAIDs, aminoglycosides) without monitoring.',
      'Many ART regimens interact with statins, DOACs, hormonal contraceptives — review each case.',
    ],
    doseAdjust:
      'DTG and BIC require dose adjustment in renal impairment when combined with TDF (CrCl < 30 mL/min) — switch to TAF or alternative.',
    pregnancy:
      'BIC + DTG are generally considered safe in pregnancy after the first trimester. Dolutegravir-based regimens are first-line for pregnant patients in Canadian guidance.',
    monitoring: [
      'HIV RNA viral load at 4–8 weeks, then 3–6 monthly.',
      'CD4 count at baseline and every 6–12 months.',
      'Renal (creatinine, eGFR) and liver function at 1 month, then 3–6 monthly.',
      'STI screen at baseline and annually (gonorrhea, chlamydia, syphilis, hepatitis B/C).',
      'Adherence support — viral suppression (undetectable) prevents sexual transmission (U=U).',
    ],
    escalation:
      'New persistent fever, neurologic symptoms, or opportunistic infection → urgent HIV specialist consult and assessment for IRIS or treatment failure.',
    group: 'std',
  },
  {
    id: 'sti-hpv',
    title: 'HPV (Human Papillomavirus)',
    indication: 'HPV-related anogenital warts, dysplasia, and prevention',
    drugClass: 'Vaccine (9-valent) / topical immune modulators / procedural',
    mechanism:
      'Vaccine: recombinant L1 capsid proteins induce neutralizing antibodies against HPV types 6, 11, 16, 18, 31, 33, 45, 52, 58. Topical agents (imiquimod) stimulate local innate immunity.',
    firstLine:
      'Vaccination: Gardasil-9 IM × 3 doses (0, 2, 6 months) for ages 9–45 with no prior series. Routine in school-based programs in Canada.',
    alternatives:
      'Visible warts: cryotherapy (liquid nitrogen) every 1–2 weeks; imiquimod 5% cream 3× weekly × 16 weeks; podophyllotoxin 0.5% (self-applied).',
    duration: 'Vaccine: 6-month series. Topical: weeks to months.',
    adrs: [
      'Vaccine: injection-site pain, mild fever, syncope (observe 15 min after).',
      'Imiquimod: local skin irritation, erythema, erosions.',
      'Podophyllotoxin: severe local irritation, avoid in pregnancy.',
    ],
    interactions: [
      'Vaccine: no significant drug interactions; can be co-administered with other vaccines.',
      'Imiquimod: theoretical ↓ effect of immunosuppressive drugs.',
    ],
    doseAdjust: 'No renal / hepatic adjustment for vaccine or topical therapy.',
    pregnancy:
      'HPV vaccine is NOT recommended in pregnancy (defer until postpartum). Podophyllotoxin and imiquimod contraindicated in pregnancy.',
    monitoring: [
      'Cervical screening (Pap test) every 3 years for ages 25–69 (Canadian guideline).',
      'Patients with high-grade dysplasia (CIN 2/3) require colposcopic follow-up.',
      'Anal Pap testing recommended for high-risk groups (HIV+, MSM).',
    ],
    escalation:
      'New suspicious lesion, bleeding, or persistent pain → biopsy to rule out invasive carcinoma.',
    group: 'std',
  },
  {
    id: 'sti-hepb',
    title: 'Hepatitis B (chronic)',
    indication: 'Chronic hepatitis B virus (HBV) infection with active replication',
    drugClass: 'Nucleos(t)ide analogues',
    mechanism:
      'Tenofovir and entecavir inhibit HBV reverse transcriptase, suppressing viral replication; not curative but reduce progression to cirrhosis and hepatocellular carcinoma.',
    firstLine:
      'Tenofovir alafenamide (Vemlidy) 25 mg PO daily. Entecavir 0.5 mg PO daily (in nucleoside-naive patients).',
    alternatives:
      'Tenofovir disoproxil fumarate (TDF) 300 mg PO daily (older, more renal / bone toxicity). Pegylated interferon-α × 48 weeks (immunomodulator alternative — multiple side effects).',
    duration: 'Indefinite (long-term, often lifelong)',
    adrs: [
      'Tenofovir: minimal toxicity with TAF; older TDF: nephrotoxicity, bone density loss.',
      'Entecavir: lactic acidosis / severe hepatomegaly with steatosis (rare).',
      'Interferon: flu-like syndrome, depression, cytopenias.',
    ],
    interactions: [
      'TDF: avoid combining with nephrotoxic drugs (NSAIDs, aminoglycosides).',
      'TDF: levels increased by ledipasvir / sofosbuvir (HepC co-infection).',
      'Entecavir: avoid with ganciclovir or ribavirin (compete for tubular secretion).',
    ],
    doseAdjust:
      'TDF: reduce dose in CrCl < 50 mL/min. TAF: reduce dose in CrCl < 15 mL/min. Entecavir: reduce dose in CrCl < 50 mL/min.',
    pregnancy:
      'TDF is SAFE in pregnancy (category B). Consider switching to TAF if breastfeeding (data limited). Breastfeeding is generally NOT recommended if HBV DNA is high — neonate receives HBIG + vaccine at birth.',
    monitoring: [
      'HBV DNA every 3–6 months.',
      'ALT, AST, bilirubin, albumin, INR every 3–6 months.',
      'HBeAg / anti-HBe every 6–12 months (if HBeAg+).',
      'Hepatocellular carcinoma screening (ultrasound ± AFP) every 6 months for cirrhotic patients and high-risk non-cirrhotics.',
    ],
    escalation:
      'Acute liver failure (rising INR, encephalopathy) → urgent transplant hepatology consult.',
    group: 'std',
  },
  // --------- Common illnesses ---------
  {
    id: 'covid-treatment',
    title: 'COVID-19 (mild–moderate, outpatient)',
    indication: 'Mild-to-moderate COVID-19 in high-risk adults (age 65+, comorbidities, immunocompromised)',
    drugClass: 'Antiviral (protease inhibitor combination)',
    mechanism:
      'Nirmatrelvir inhibits the SARS-CoV-2 main protease (Mpro / 3CLpro), preventing polyprotein cleavage. Ritonavir is a CYP3A4 inhibitor that boosts nirmatrelvir levels.',
    firstLine:
      'Nirmatrelvir / ritonavir (Paxlovid) 300/100 mg PO BID × 5 days (reduce to 150/100 mg if eGFR 30–60 mL/min). Start within 5 days of symptom onset.',
    alternatives:
      'Remdesivir IV 200 mg loading, then 100 mg daily × 2 days (in-patient or infusion centre). If neither available: supportive care alone.',
    duration: '5 days (Paxlovid)',
    adrs: [
      'Dysgeusia (bad taste), diarrhea, headache, myalgia.',
      'Paxlovid rebound: mild return of symptoms or positive test after course completion — usually self-limited.',
      'Ritonavir hepatotoxicity rare.',
    ],
    interactions: [
      'Ritonavir is a POTENT CYP3A4 inhibitor — extensive drug–drug interactions.',
      '⚠️ CONTRAINDICATED with: amiodarone, carbamazepine, ergot alkaloids, lovastatin, simvastatin, rifampin, sildenafil for pulmonary HTN, St John\u2019s wort, triazolam.',
      'Reduce doses of: apixaban, rivaroxaban, tacrolimus, cyclosporine, colchicine, methadone, many statins (use only pravastatin or rosuvastatin at low dose).',
      'Hold certain DOACs; consult pharmacist for any concomitant medication.',
    ],
    doseAdjust:
      'Reduce nirmatrelvir to 150 mg / ritonavir 100 mg BID if eGFR 30–60 mL/min. NOT recommended if eGFR < 30 mL/min or severe hepatic impairment.',
    pregnancy:
      'Limited data; ritonavir boosting is generally continued. Shared decision-making with obstetrician / maternal-fetal medicine.',
    monitoring: [
      'Symptom monitoring, ambulatory SpO₂ if available (≥ 92% target).',
      'Drug interaction check before every prescription.',
      'Counsel on completing the full 5-day course even if feeling better.',
    ],
    escalation:
      'SpO₂ < 92%, rapid symptom progression, severe cough, confusion, or chest pain → urgent in-person assessment and consider Remdesivir / hospital admission.',
    group: 'respiratory',
  },
  {
    id: 'flu-treatment',
    title: 'Influenza A & B',
    indication: 'Confirmed or suspected influenza in high-risk adults (age 65+, chronic disease, immunocompromised, pregnant, severe symptoms)',
    drugClass: 'Neuraminidase inhibitor',
    mechanism:
      'Oseltamivir and zanamivir inhibit the viral neuraminidase, preventing release of new virions from infected cells. Most effective when started within 48 hours of symptom onset.',
    firstLine:
      'Oseltamivir (Tamiflu) 75 mg PO BID × 5 days. Begin within 48 hours of symptom onset for maximum benefit.',
    alternatives:
      'Zanamivir (Relenza) 10 mg inhaled BID × 5 days (avoid in airway disease, e.g. COPD, asthma). Oseltamivir is preferred in pregnancy. Baloxavir marboxil (Xofluza) 40–80 mg PO × 1 single dose (alternative, single dose).',
    duration: '5 days',
    adrs: [
      'Oseltamivir: nausea, vomiting (improved with food), headache. Rare neuropsychiatric effects (especially in adolescents).',
      'Zanamivir: bronchospasm — AVOID in COPD, asthma, or any reactive airway disease.',
      'Baloxavir: generally well-tolerated; few drug interactions.',
    ],
    interactions: [
      'Oseltamivir: few clinically significant interactions. Probenecid may increase levels.',
      'Zanamivir: no significant interactions.',
      'Baloxavir: avoid with polyvalent cation–containing products (Ca²⁺, Mg²⁺, Fe²⁺, Zn²⁺).',
    ],
    doseAdjust:
      'Oseltamivir: reduce to 30 mg BID if CrCl 10–30 mL/min. Zanamivir: no adjustment. Baloxavir: no adjustment.',
    pregnancy:
      'Oseltamivir is SAFE and recommended in pregnancy — the harms of influenza outweigh the small theoretical risk.',
    monitoring: [
      'Symptom monitoring and fever curve.',
      'Hydration status — older adults are at high risk of dehydration.',
      'Watch for secondary bacterial pneumonia (worsening fever, productive cough, dyspnea).',
      'Annual influenza vaccination is the BEST prevention.',
    ],
    escalation:
      'Suspected bacterial superinfection (pneumonia): new fever spike after initial improvement, dyspnea, focal chest findings → chest x-ray, consider antibiotics (amoxicillin or doxycycline for outpatient CAP).',
    group: 'respiratory',
  },
  {
    id: 'enteric-treatment',
    title: 'Gastroenteritis (viral and bacterial)',
    indication: 'Acute infectious diarrhea / vomiting in adults',
    drugClass: 'Supportive (rehydration) + targeted antibiotics for specific pathogens',
    mechanism:
      'Most viral gastroenteritis (norovirus, rotavirus) is self-limited — supportive care only. Bacterial causes (Salmonella, Campylobacter, Shigella, E. coli) usually resolve without antibiotics; specific pathogens or severe cases warrant targeted therapy.',
    firstLine:
      'Viral (norovirus, rotavirus): oral rehydration solution (ORS) ± loperamide 4 mg initial, then 2 mg after each loose stool (max 16 mg/day) IF no fever / no blood in stool.',
    alternatives:
      'Salmonella (non-typhoidal, mild): no antibiotics (may prolong shedding). Invasive/severe: ceftriaxone 1–2 g IV daily × 7 days. Campylobacter: azithromycin 500 mg PO daily × 3 days. Shigella: azithromycin 500 mg PO daily × 3 days (or ciprofloxacin 500 mg BID × 3 days in adults).',
    duration: '3–7 days depending on pathogen',
    adrs: [
      'Loperamide: constipation, abdominal cramping. AVOID in febrile or bloody diarrhea (risk of toxic megacolon).',
      'Antibiotic-associated diarrhea / C. difficile risk with broad-spectrum antibiotics.',
      'Fluoroquinolones: tendon rupture, QT prolongation, aortopathy.',
    ],
    interactions: [
      'Loperamide: P-gp inhibition risk — avoid with strong CYP3A4 inhibitors (e.g., ritonavir, ketoconazole).',
      'Ciprofloxacin: chelation with Ca²⁺/Mg²⁺/Fe²⁺ antacids — separate by 2 h. Avoid with tizanidine.',
      'QT-prolonging drugs: macrolides + many other agents — review.',
    ],
    doseAdjust:
      'Fluoroquinolones: reduce dose in CrCl < 30 mL/min. Azithromycin: no adjustment.',
    pregnancy:
      'Loperamide: generally avoided in 1st trimester (limited data). ORS is safe. Fluoroquinolones AVOIDED in pregnancy; azithromycin preferred.',
    monitoring: [
      'Hydration status — urine output, orthostatic vitals, skin turgor, mental status.',
      'Stool culture if symptoms > 3 days, fever, blood, recent antibiotic use, immunocompromised.',
      'Electrolytes (Na⁺, K⁺) if prolonged vomiting / diarrhea.',
      'Return precautions: bloody stool, severe abdominal pain, fever > 38.5 °C, signs of dehydration.',
    ],
    escalation:
      'Bloody stool, severe abdominal pain, fever > 38.5 °C, or signs of dehydration → urgent assessment; inpatient if hemodynamically unstable.',
    group: 'general',
  },
  {
    id: 'cap-outpatient',
    title: 'Community-Acquired Pneumonia (outpatient, mild)',
    indication: 'Outpatient adult with CAP (no comorbidities, low severity)',
    drugClass: 'Beta-lactam / macrolide / tetracycline',
    mechanism:
      'Amoxicillin: β-lactam that inhibits cell-wall synthesis (bactericidal). Doxycycline: inhibits 30S ribosomal subunit (bacteriostatic).',
    firstLine:
      'Amoxicillin 1 g PO TID × 5 days. If atypical organisms suspected (mycoplasma, chlamydia, legionella): add doxycycline 100 mg PO BID × 5 days OR replace with monotherapy doxycycline 100 mg PO BID × 5 days.',
    alternatives:
      'Macrolide (azithromycin 500 mg day 1, then 250 mg daily × 4 days) — only if local pneumococcal resistance < 25%. Levofloxacin 750 mg PO daily × 5 days (fluoroquinolone).',
    duration: '5 days (or longer if clinical response is delayed)',
    adrs: [
      'Amoxicillin: rash, diarrhea, C. difficile risk. Severe allergic reactions (anaphylaxis).',
      'Doxycycline: pill oesophagitis (take with water, upright), photosensitivity.',
      'Levofloxacin: QT prolongation, tendon rupture, aortopathy, CNS effects, dysglycemia.',
    ],
    interactions: [
      'Amoxicillin: may ↑ INR with warfarin (monitor).',
      'Doxycycline: chelates with cations (Ca²⁺/Mg²⁺/Fe²⁺) — separate by 2–4 h.',
      'Fluoroquinolones: chelation, QT risk, avoid with tizanidine.',
    ],
    doseAdjust:
      'Amoxicillin: reduce frequency in CrCl < 30 mL/min. Levofloxacin: reduce dose in CrCl < 30 mL/min.',
    pregnancy:
      'Amoxicillin SAFE in pregnancy. Doxycycline CONTRAINDICATED. Levofloxacin AVOIDED. Azithromycin safe.',
    monitoring: [
      'Symptom response (fever, cough, dyspnea) at 48–72 h.',
      'Repeat chest x-ray at 6–8 weeks for older adults or smokers (rule out underlying malignancy).',
      'Pulse oximetry — admit if SpO₂ < 92% on room air.',
    ],
    escalation:
      'Worsening dyspnea, confusion, sepsis criteria, or inability to maintain oral intake → hospital admission + IV antibiotics.',
    group: 'respiratory',
  },
  // ============================================================
  // HERPES VIRUS FAMILY
  // ============================================================
  {
    id: 'hsv1-orolabial',
    title: 'HSV-1 (Orolabial Herpes / "Cold Sores")',
    indication: 'Primary and recurrent herpes labialis ("cold sores" / "fever blisters")',
    drugClass: 'Antiviral (nucleoside analogue)',
    mechanism:
      'Acyclovir / valacyclovir / famciclovir are phosphorylated by viral thymidine kinase to inhibit viral DNA polymerase; terminate viral DNA chain elongation. HSV-1 is usually acquired in childhood or young adulthood and remains latent in the trigeminal ganglion for life.',
    firstLine:
      'Recurrent cold sores: Valacyclovir 2 g PO BID × 1 day (single-day high-dose) started at first prodrome (tingling / burning). Episodic standard dose: Acyclovir 400 mg PO 5× daily × 5 days. Severe / immunocompromised: Acyclovir 5 mg/kg IV q8h.',
    alternatives:
      'Famciclovir 1.5 g PO × 1 single dose. Penciclovir 1% cream (Denavir) — apply q2h while awake × 4 days. Docosanol 10% cream (Abreva) — OTC, apply 5× daily until healed.',
    duration: '1–5 days depending on regimen',
    adrs: [
      'Acyclovir / valacyclovir: headache, nausea. Rare nephrotoxicity with IV acyclovir (crystal nephropathy — keep hydrated).',
      'Topical penciclovir / docosanol: local skin irritation.',
      'Famciclovir: headache, nausea.',
    ],
    interactions: [
      'Acyclovir: probenecid ↓ renal clearance.',
      'Caution with other nephrotoxic drugs (NSAIDs, aminoglycosides) — especially with IV therapy.',
    ],
    doseAdjust:
      'Valacyclovir: reduce dose in CrCl < 50 mL/min. Acyclovir: reduce dose / frequency in CrCl < 25 mL/min.',
    pregnancy:
      'Acyclovir and valacyclovir are SAFE in pregnancy (category B). Severe or disseminated HSV-1 in pregnancy (especially near delivery) requires IV therapy and likely C-section to avoid neonatal transmission.',
    monitoring: [
      'Frequency of recurrences — > 6 episodes/year consider daily suppressive therapy (Valacyclovir 500 mg PO daily).',
      'Trigger identification (sun exposure, stress, illness, dental work, lip trauma).',
      'SPF lip balm prevents UV-triggered outbreaks.',
      'Avoid spreading: washing hands after touching lesions; avoid sharing utensils, lip balm, razors.',
    ],
    escalation:
      'Eczema herpeticum (widespread HSV-1 in patients with eczema/atopic dermatitis) → urgent ED + IV acyclovir. Keratitis (eye involvement) → urgent ophthalmology + topical antivirals.',
    group: 'std',
  },
  {
    id: 'hsv2-genital',
    title: 'HSV-2 (Genital Herpes)',
    indication: 'Primary episode, episodic recurrences, and suppressive therapy for genital herpes',
    drugClass: 'Antiviral (nucleoside analogue)',
    mechanism:
      'Same as HSV-1. HSV-2 is the primary cause of recurrent genital herpes, though HSV-1 now accounts for ~50% of new genital infections. Latency in sacral ganglia.',
    firstLine:
      'Primary episode: Valacyclovir 1 g PO BID × 7–10 days (started within 72 h of symptom onset). Recurrent episode: Valacyclovir 500 mg PO BID × 3 days. Suppressive therapy (≥ 6 episodes/year): Valacyclovir 500 mg PO daily (or 1 g daily if very frequent).',
    alternatives:
      'Acyclovir 400 mg PO TID × 7–10 days (primary) or × 5 days (recurrence). Famciclovir 250 mg PO TID × 7–10 days (primary) or 1 g PO BID × 1 day (recurrence).',
    duration: 'Primary: 7–10 days. Recurrence: 1–3 days. Suppressive: daily, indefinite.',
    adrs: [
      'Same as HSV-1: headache, nausea, rare nephrotoxicity with IV therapy.',
      'Recurrences decrease in frequency and severity over time (often with suppressive therapy).',
    ],
    interactions: [
      'Acyclovir: probenecid ↓ renal clearance.',
      'Caution with other nephrotoxic drugs (NSAIDs, aminoglycosides).',
    ],
    doseAdjust:
      'Valacyclovir: reduce dose in CrCl < 50 mL/min. Acyclovir: reduce in CrCl < 25 mL/min.',
    pregnancy:
      'ACOG / SOGC: Suppressive therapy (Valacyclovir 500 mg PO BID) from 36 weeks gestation until delivery reduces outbreak risk and need for cesarean. Avoid primary infection in 3rd trimester if possible — discuss with obstetrician.',
    monitoring: [
      'Type-specific HSV serology (HSV-1 / HSV-2 IgG) for partners of newly diagnosed patients.',
      'Viral shedding can occur even when asymptomatic — daily suppressive therapy reduces transmission by ~50%.',
      'Counsel on disclosure to partners and condom use.',
      'Penetrative oral sex can transmit HSV-1 to genitals (and vice versa).',
    ],
    escalation:
      'Severe primary infection with urinary retention, meningismus, or systemic symptoms → hospital admission + IV acyclovir. Aseptic meningitis (HSV-2 Mollaret syndrome) → urgent neurology.',
    group: 'std',
  },
  {
    id: 'vzv-chickenpox',
    title: 'Varicella (Chickenpox) — primary VZV',
    indication: 'Acute varicella infection in non-immune children or adults (adults have higher complication risk)',
    drugClass: 'Antiviral (nucleoside analogue)',
    mechanism:
      'Varicella-zoster virus (VZV) is the same virus that causes shingles (reactivation). Primary infection is chickenpox. Highly contagious via respiratory droplets and direct contact with lesions.',
    firstLine:
      'Acyclovir 800 mg PO 5× daily × 7 days OR Valacyclovir 1 g PO TID × 7 days. Start within 24 hours of rash onset for maximum efficacy. All adolescents and adults should receive antiviral therapy (higher risk of complications).',
    alternatives:
      'Famciclovir 500 mg PO TID × 7 days (less pediatric data).',
    duration: '7 days',
    adrs: [
      'Acyclovir / valacyclovir: headache, nausea, possible nephrotoxicity at high doses.',
      'Topical care: calamine lotion, oatmeal baths, antihistamines for itching.',
      'Avoid aspirin in children < 18 (Reye syndrome risk). Use acetaminophen for fever.',
    ],
    interactions: [
      'Acyclovir: probenecid ↓ renal clearance.',
      'Caution with nephrotoxic drugs (NSAIDs, aminoglycosides).',
    ],
    doseAdjust:
      'Acyclovir: reduce dose / frequency in CrCl < 25 mL/min.',
    pregnancy:
      'Varicella in pregnancy: risk of congenital varicella (1st / 2nd trimester) and severe neonatal varicella (perinatal). VZIG (varicella-zoster immune globulin) for exposed non-immune pregnant patients. If active varicella in pregnancy: oral acyclovir; if severe: IV acyclovir.',
    monitoring: [
      'All lesion stages present simultaneously (macules → papules → vesicles → crusts) is characteristic.',
      'Look for secondary bacterial infection of lesions (Group A Streptococcus, Staph).',
      'Watch for pneumonia (cough, dyspnea, hypoxia) — more common in adults and immunocompromised.',
      'Watch for encephalitis / cerebellar ataxia (rare but serious).',
    ],
    escalation:
      'Dyspnea, hypoxia, severe headache, altered mental status, or immunocompromised patient with varicella → hospital admission + IV acyclovir.',
    group: 'general',
  },
  {
    id: 'vzv-shingles',
    title: 'Herpes Zoster (Shingles) — reactivated VZV',
    indication: 'Acute herpes zoster infection in adults (see also Wound Care Section for lesion management)',
    drugClass: 'Antiviral (nucleoside analogue)',
    mechanism:
      'Reactivation of latent varicella-zoster virus in dorsal root or cranial nerve ganglia. Risk increases with age (> 50) and immunocompromise. Vaccination (Shingrix) prevents reactivation.',
    firstLine:
      'Valacyclovir 1 g PO TID × 7 days. Start within 72 hours of rash onset for maximum efficacy. Continue beyond 72 h if new lesions still forming.',
    alternatives:
      'Famciclovir 500 mg PO TID × 7 days. Acyclovir 800 mg PO 5× daily × 7 days (less convenient).',
    duration: '7 days',
    adrs: [
      'Acyclovir / valacyclovir: headache, nausea. Rare nephrotoxicity with IV acyclovir.',
      'Famciclovir: headache, nausea.',
      'Generally well-tolerated in immunocompetent adults.',
    ],
    interactions: [
      'Acyclovir: probenecid ↓ renal clearance.',
      'Caution with other nephrotoxic drugs (NSAIDs, aminoglycosides) — especially with IV therapy.',
    ],
    doseAdjust:
      'Valacyclovir: reduce dose in CrCl < 50 mL/min. Acyclovir: reduce dose / frequency in CrCl < 25 mL/min.',
    pregnancy:
      'Acyclovir and valacyclovir are SAFE in pregnancy (category B). Treat aggressively if lesions are disseminated or patient immunocompromised.',
    monitoring: [
      'Pain control — acetaminophen, gabapentin, or short-course opioids for severe neuralgia. Tricyclic antidepressants (amitriptyline, nortriptyline) for post-herpetic neuralgia.',
      '⚠️ Ophthalmic zoster (V1 distribution: forehead, tip of nose — Hutchinson sign) → urgent ophthalmology consult.',
      '⚠️ Ramsay Hunt syndrome (ear / facial nerve involvement with facial weakness, hearing loss, vertigo) → urgent ENT + IV acyclovir.',
      '⚠️ Disseminated zoster (widespread cutaneous / visceral involvement) in immunocompromised → IV acyclovir + admission.',
      'Continue antiviral in immunocompromised patients regardless of presentation timing.',
      'Post-herpetic neuralgia (PHN): persistent pain > 90 days after rash heals. Treat with gabapentin, pregabalin, or tricyclic antidepressants.',
    ],
    escalation:
      'Ophthalmic involvement, Ramsay Hunt syndrome, dissemination, or immunocompromised host → IV acyclovir + specialist consult.',
    group: 'general',
  },
  // ============================================================
  // VIRAL & TICK-BORNE DISEASES — quick reference
  // (disease description, classic symptoms, usual prescribing)
  // ============================================================
  {
    id: 'disease-lyme',
    title: 'Lyme Disease',
    indication:
      'Tick-borne infection by Borrelia burgdorferi (Ixodes scapularis / pacificus). Endemic in NB, ON, QC, BC, NS, MB. Early localized: erythema migrans (target / bull\u2019s-eye rash ≥ 5 cm, expanding), flu-like illness (fatigue, fever, chills, myalgia, arthralgia, headache, lymphadenopathy). Early disseminated: multiple EM lesions, neurologic (Bell\u2019s palsy, radiculopathy, meningitis), cardiac (AV block, myocarditis). Late: Lyme arthritis (large-joint, especially knee).',
    drugClass: 'Tetracycline / β-lactam',
    mechanism:
      'Doxycycline inhibits 30S ribosomal subunit (bacteriostatic). Amoxicillin inhibits cell-wall synthesis (bactericidal). Ceftriaxone for severe neurologic / cardiac disease.',
    firstLine:
      'Adults (non-pregnant): Doxycycline 100 mg PO BID × 10–21 days (early localized: 10 days; disseminated / neurologic: 14–21 days).',
    alternatives:
      'Pregnancy / children < 8 years: Amoxicillin 500 mg PO TID × 14–21 days. Severe neurologic (meningitis, radiculopathy) or cardiac (high-grade AV block): Ceftriaxone 2 g IV daily × 14–28 days.',
    duration: '10–28 days depending on stage',
    adrs: [
      'Doxycycline: photosensitivity (strict sun avoidance), pill oesophagitis (take with water, upright).',
      'Amoxicillin: GI upset, rash, possible C. difficile.',
      'Ceftriaxone: biliary sludging, rare anaphylaxis.',
      'Jarisch-Herxheimer reaction (fever, chills, myalgia within 24 h of first dose) — common, self-limited, supportive care.',
    ],
    interactions: [
      'Doxycycline: chelates with Ca²⁺/Mg²⁺/Fe²⁺/Al³⁺ antacids — separate by 2–4 h.',
      'Ceftriaxone: avoid with calcium-containing IV fluids (precipitates) in neonates.',
    ],
    doseAdjust:
      'No renal adjustment for doxycycline or amoxicillin. Ceftriaxone: reduce dose in combined hepatic / renal failure.',
    pregnancy:
      'Doxycycline CONTRAINDICATED in pregnancy and children < 8 years (tooth discoloration, bone growth). Use amoxicillin; ceftriaxone for severe disease.',
    monitoring: [
      'Reassess at 48–72 h — most patients improve within days.',
      'Persistent or worsening symptoms: reconsider diagnosis (co-infections like Babesia, Anaplasma), referral to infectious disease.',
      'Serology NOT routinely required for typical EM rash in endemic areas — clinical diagnosis.',
      'Tick-bite prevention: DEET 20–30%, permethrin-treated clothing, daily tick checks, remove attached ticks within 24 h with fine-tipped tweezers.',
    ],
    escalation:
      'High-grade AV block, meningitis, persistent arthritis, or pregnancy with suspected disseminated disease → hospital admission + IV ceftriaxone + ID consult.',
    group: 'general',
  },
  {
    id: 'disease-measles',
    title: 'Measles (Rubeola)',
    indication:
      'Highly contagious paramyxovirus (Morbillivirus). Transmission airborne / droplets. Prodrome (2–4 days): high fever, cough, coryza, conjunctivitis (the 3 C\u2019s), Koplik spots (tiny white lesions on buccal mucosa — pathognomonic). Exanthem: maculopapular rash starting at hairline, spreading cephalocaudally to trunk and extremities, often confluent. Complications: otitis media (10%), pneumonia (5%), diarrhea (8%), acute encephalitis (0.1%), subacute sclerosing panencephalitis (SSPE) years later (rare, fatal).',
    drugClass: 'Supportive + Vitamin A',
    mechanism:
      'No effective antiviral. Vitamin A reduces morbidity and mortality in children, especially with vitamin A deficiency. WHO recommends Vitamin A for all children with acute measles.',
    firstLine:
      'Vitamin A 200,000 IU PO once daily × 2 days (children ≥ 12 months). Repeat a 3rd dose 2–4 weeks later if signs of vitamin A deficiency. Supportive care: antipyretics, hydration, oxygen as needed.',
    alternatives:
      'Antibiotics only for secondary bacterial infection (otitis media, pneumonia). Post-exposure prophylaxis for susceptible contacts: MMR vaccine within 72 h of exposure OR immune globulin within 6 days.',
    duration: 'Acute illness 7–10 days. Vitamin A: 2 days (3rd dose if deficient).',
    adrs: [
      'Vitamin A: rarely acute toxicity at recommended doses; high doses can cause transient bulging fontanelle in infants, hepatotoxicity.',
      'Antipyretics: avoid aspirin in children < 18 (Reye syndrome).',
    ],
    interactions: [
      'Vitamin A: avoid concurrent retinoid drugs (isotretinoin, acitretin) — additive toxicity.',
    ],
    doseAdjust:
      'No renal adjustment for vitamin A.',
    pregnancy:
      'Vitamin A: limit doses to < 10,000 IU/day in pregnancy (teratogenic). Measles in pregnancy → risk of preterm labor, low birth weight, maternal pneumonia. IG can be considered for susceptible exposed pregnant patients.',
    monitoring: [
      'Airborne isolation (negative-pressure room) for 4 days after rash onset (or duration of illness if immunocompromised).',
      'Vitamin A dose adjustment by age: infants 6–11 mo: 100,000 IU; < 6 mo: 50,000 IU.',
      'Report to public health immediately — measles is a notifiable disease.',
      'MMR vaccine prevents measles — 2-dose series ≥ 95% effective.',
    ],
    escalation:
      'Pneumonia, encephalitis (confusion, seizures), severe dehydration, or keratitis → hospital admission + IV fluids / antibiotics / supportive care as indicated.',
    group: 'general',
  },
  {
    id: 'disease-mumps',
    title: 'Mumps',
    indication:
      'Contagious paramyxovirus. Transmission respiratory droplets / direct contact. Prodrome (1–2 days): low-grade fever, malaise, myalgia, headache, anorexia. Parotitis: unilateral or bilateral parotid swelling (90%), tender, lasts 3–7 days. Complications: orchitis (post-pubertal males, 20–30%), oophoritis (5% females), aseptic meningitis (1–10%), pancreatitis, sensorineural hearing loss (rare, usually unilateral).',
    drugClass: 'Supportive',
    mechanism:
      'No effective antiviral. Self-limited disease. Supportive care with analgesics and hydration.',
    firstLine:
      'Supportive: acetaminophen 500–1000 mg PO q6h PRN (max 4 g/day) or ibuprofen 400 mg PO q6h PRN. Warm or cold compresses to parotid area. Adequate hydration.',
    alternatives:
      'No specific antiviral. Post-exposure prophylaxis: MMR vaccine within 72 h of exposure if not immune.',
    duration: 'Self-limited, parotitis resolves in 3–7 days, full recovery 1–2 weeks',
    adrs: [
      'Acetaminophen: hepatotoxicity at high doses (limit 4 g/day).',
      'Ibuprofen: GI upset, renal effects — caution in CKD, dehydration.',
    ],
    interactions: [
      'Ibuprofen: caution with anticoagulants (warfarin), ACE-I/ARB in dehydration (AKI risk), lithium.',
      'Acetaminophen: warfarin (modest INR increase).',
    ],
    doseAdjust:
      'Acetaminophen / ibuprofen: standard dosing; ibuprofen reduce in CKD.',
    pregnancy:
      'Mumps in pregnancy → increased risk of spontaneous abortion in 1st trimester. No congenital syndrome. Supportive care.',
    monitoring: [
      'Droplet isolation for 5 days after parotitis onset.',
      'Report to public health — notifiable disease.',
      'Watch for orchitis in post-pubertal males (fever, severe testicular pain, swelling) — supportive care, scrotal support, NSAIDs.',
      'MMR vaccine: 2-dose series prevents mumps; outbreaks still occur in highly vaccinated populations (waning immunity in young adults).',
    ],
    escalation:
      'Meningitis, pancreatitis (severe epigastric pain, ↑ lipase), encephalitis, or significant orchitis → hospital admission for supportive care.',
    group: 'general',
  },
  {
    id: 'disease-parvovirus',
    title: 'Parvovirus B19 ("Fifth Disease", Erythema Infectiosum)',
    indication:
      'Common childhood viral exanthem (slapped-cheek appearance). Transmission respiratory droplets / vertical (maternal-fetal). Three-stage rash: 1) "slapped cheek" erythema on face; 2) lacy reticular rash on trunk / extremities; 3) recurrent rash with sun, heat, exercise for weeks. Prodromal symptoms (fever, coryza, headache) occur BEFORE rash — child is no longer contagious once rash appears. Adults: arthralgia / arthritis (symmetric, small joints of hands, wrists, knees — more common in women). Complications: aplastic crisis in patients with hemolytic anemias (sickle cell, hereditary spherocytosis, thalassemia); chronic anemia in immunocompromised; hydrops fetalis in pregnancy (rare, < 10% transmission if maternal infection).',
    drugClass: 'Supportive + IVIG for immunocompromised',
    mechanism:
      'Parvovirus B19 infects erythroid progenitor cells via the P antigen receptor. Causes transient red-cell aplasia. In normal hosts, the brief shutdown of erythropoiesis is clinically silent. In patients with shortened RBC lifespan (hemolytic anemia) → severe anemia (aplastic crisis).',
    firstLine:
      'Healthy children / adults: supportive care only — acetaminophen / ibuprofen for fever and arthralgia. No specific antiviral.',
    alternatives:
      'Immunocompromised with chronic anemia: IVIG 0.4 g/kg IV daily × 5 days (or 1 g/kg × 3 days) suppresses viremia. Aplastic crisis: transfusion + IVIG. Hydrops fetalis: intrauterine transfusion.',
    duration: 'Self-limited; rash may recur for weeks with triggers',
    adrs: [
      'IVIG: headache, aseptic meningitis, fluid overload, anaphylaxis (rare, IgA deficiency), renal dysfunction.',
      'NSAIDs / acetaminophen: standard ADRs.',
    ],
    interactions: [
      'IVIG: live vaccines may be less effective — defer MMR / varicella 3+ months after IVIG.',
      'IgA-deficient patients: risk of anaphylaxis — screen if known.',
    ],
    doseAdjust:
      'IVIG: reduce infusion rate in renal dysfunction; sucrose-containing IVIG products risk osmotic nephropathy.',
    pregnancy:
      'Maternal parvovirus B19: < 10% transmission to fetus. If fetal hydrops develops: intrauterine transfusion can be lifesaving. Pregnant exposed / symptomatic patients should have serial ultrasounds (q 1–2 weeks × 8–12 weeks post-exposure).',
    monitoring: [
      'Children are NOT contagious once the rash appears — can attend school.',
      'Pregnant healthcare workers / teachers: routine work restrictions not needed with standard hygiene.',
      'Sickle cell patients with fever and Hb drop: suspect aplastic crisis — CBC + retic count + parvovirus serology.',
      'Hand hygiene prevents transmission.',
    ],
    escalation:
      'Aplastic crisis (severe anemia, retic < 1%), hydrops fetalis, or chronic anemia in immunocompromised → transfusion / IVIG / specialist consult.',
    group: 'general',
  },
  {
    id: 'disease-rubella',
    title: 'Rubella ("German Measles", 3-Day Measles)',
    indication:
      'Mild viral exanthem caused by Togavirus (Rubivirus). Transmission respiratory droplets. Prodrome (1–5 days): low-grade fever, malaise, lymphadenopathy (posterior auricular, suboccipital — classic), mild coryza. Rash: pink maculopapular, starts on face → spreads cephalocaudally, fades in 3 days ("3-day measles"). Forchheimer spots (petechiae on soft palate — non-specific). Complications: arthritis / arthralgia (up to 70% adult women), thrombocytopenia, encephalitis (rare). CRITICAL: Congenital rubella syndrome (CRS) — first-trimester infection causes cataracts, sensorineural deafness, PDA, microcephaly, "blueberry muffin" rash.',
    drugClass: 'Supportive',
    mechanism:
      'No specific antiviral. Self-limited disease. Prevention via MMR vaccine.',
    firstLine:
      'Supportive: acetaminophen 500–1000 mg PO q6h PRN for fever and arthralgia. Adequate hydration.',
    alternatives:
      'Post-exposure prophylaxis: MMR vaccine within 72 h of exposure (does not prevent disease if already infected, but may prevent if given early).',
    duration: 'Self-limited; rash 3 days, full recovery 5–10 days',
    adrs: [
      'Acetaminophen: hepatotoxicity at high doses (limit 4 g/day).',
      'MMR vaccine: rare transient arthralgia / arthritis (especially adult women), thrombocytopenia.',
    ],
    interactions: [
      'Acetaminophen: warfarin (modest INR increase).',
    ],
    doseAdjust:
      'No renal adjustment.',
    pregnancy:
      'Rubella in pregnancy (especially 1st trimester) → up to 85% fetal infection rate, with severe CRS consequences. Termination may be discussed. Pregnant exposed patients: serology (IgM / IgG) + serial ultrasounds. Immunoglobulin does NOT prevent fetal infection reliably.',
    monitoring: [
      'Droplet isolation for 7 days after rash onset.',
      'Report to public health — notifiable disease; CRS is also notifiable.',
      'Verify MMR vaccination in all pregnant patients (rubella immunity status is part of routine prenatal panel).',
      'MMR vaccine is a LIVE attenuated vaccine — CONTRAINDICATED in pregnancy. Avoid pregnancy for ≥ 4 weeks after MMR.',
    ],
    escalation:
      'Thrombocytopenia with bleeding, encephalitis (confusion, seizures), or suspected congenital rubella syndrome in neonate → specialist referral.',
    group: 'general',
  },
  {
    id: 'disease-sars',
    title: 'SARS (Severe Acute Respiratory Syndrome)',
    indication:
      'Severe viral pneumonia caused by SARS-associated coronavirus (SARS-CoV-1, 2002–2004 outbreak; now historical). Transmission respiratory droplets / close contact. Prodrome (2–7 days): high fever, chills, myalgia, headache, malaise, dry cough. Days 3–7: lower respiratory phase — non-productive cough, dyspnea, hypoxemia. Chest x-ray: bilateral interstitial infiltrates / ground-glass opacities. Risk factors for severe disease: age > 60, comorbidities (DM, cardiovascular, immunosuppression).',
    drugClass: 'Antiviral (ribavirin historically) + corticosteroids',
    mechanism:
      'No proven specific antiviral. Historical regimens used ribavirin (guanosine analogue — inhibits viral RNA synthesis) + systemic corticosteroids for immunomodulation. Most current SARS-CoV-2 antivirals (Paxlovid, remdesivir) target SARS-CoV-2, not SARS-CoV-1.',
    firstLine:
      'Historical: Ribavirin 8 mg/kg IV q8h × 14 days + methylprednisolone 1–2 mg/kg/day × 5–7 days (then taper). Modern supportive care: oxygen, lung-protective ventilation if needed, fluid management.',
    alternatives:
      'No established alternatives for SARS-CoV-1 specifically. Modern care is largely supportive (oxygen, ventilation, ECMO in severe cases). Interferon-α historically tried.',
    duration: 'Historical 14 days',
    adrs: [
      'Ribavirin: hemolytic anemia (dose-related, common), teratogenicity (CATEGORY X — both partners must use contraception during and for 6 months after), cough, rash.',
      'Corticosteroids: hyperglycemia, hypertension, mood changes, infection risk, adrenal suppression with prolonged use.',
    ],
    interactions: [
      'Ribavirin: CONTRAINDICATED with didanosine (additive mitochondrial toxicity).',
      'Ribavirin: teratogenic — strict contraception.',
      'Methylprednisolone: numerous drug interactions (CYP3A4 metabolism — adjust cyclosporine, tacrolimus).',
    ],
    doseAdjust:
      'Ribavirin: reduce dose in CrCl < 50 mL/min (hemolytic anemia worsened).',
    pregnancy:
      'Ribavirin is CATEGORY X — absolutely contraindicated. Corticosteroids may be used in severe maternal disease.',
    monitoring: [
      'Strict airborne + contact isolation (negative-pressure room, N95 respirator).',
      'Report to public health immediately.',
      'Serial chest imaging, oxygen saturation, CBC (hemolytic anemia risk with ribavirin).',
      'Contact tracing essential — high transmission in healthcare settings.',
    ],
    escalation:
      'Progressive hypoxemia, ARDS, multiorgan failure → ICU + lung-protective ventilation + consider ECMO.',
    group: 'general',
  },
  {
    id: 'disease-west-nile',
    title: 'West Nile Virus',
    indication:
      'Mosquito-borne flavivirus (Culex species). Most infections asymptomatic (~80%). West Nile fever (~20%): abrupt fever, headache, myalgia, fatigue, anorexia, lymphadenopathy, occasionally maculopapular rash. Neurologic disease (< 1%): meningitis (headache, photophobia, meningismus), encephalitis (altered mental status, seizures, focal deficits), acute flaccid paralysis (poliomyelitis-like, asymmetric limb weakness). Risk factors for severe disease: age > 60, immunocompromised, diabetes, hypertension, CKD.',
    drugClass: 'Supportive',
    mechanism:
      'No specific antiviral. Treatment is supportive care.',
    firstLine:
      'Supportive: acetaminophen for fever and headache. Adequate hydration. NO aspirin / NSAIDs in suspected neurologic disease (bleeding risk if thrombocytopenia develops). For severe neurologic disease: ICU-level supportive care.',
    alternatives:
      'No specific alternatives. Interferon and IVIG have been tried without strong evidence.',
    duration: 'West Nile fever: 3–10 days. Neurologic disease: weeks to months of recovery; some residual deficits.',
    adrs: [
      'Acetaminophen: hepatotoxicity at high doses (limit 4 g/day).',
      'NSAIDs / aspirin: avoid in suspected neurologic involvement.',
    ],
    interactions: [
      'Acetaminophen: warfarin (modest INR increase).',
    ],
    doseAdjust:
      'No renal adjustment.',
    pregnancy:
      'Limited data — no specific congenital syndrome documented. Supportive care.',
    monitoring: [
      'Mosquito-bite prevention (DEET, long sleeves, eliminate standing water) is the primary prevention.',
      'Report to public health — notifiable disease.',
      'Neurologic disease: serial exams, MRI brain + spine, lumbar puncture (CSF pleocytosis, elevated protein).',
      'Plasma / CSF WNV IgM is diagnostic; IgG confirms past infection.',
      'No vaccine available.',
    ],
    escalation:
      'Encephalitis (confusion, seizures), acute flaccid paralysis, or progressive neurologic decline → ICU admission + supportive care + ID / neurology consult.',
    group: 'general',
  },
];

export const clinicalReferenceGroups: { id: ClinicalRefEntry['group']; label: string }[] = [
  { id: 'std', label: 'STIs' },
  { id: 'respiratory', label: 'Respiratory' },
  { id: 'general', label: 'General' },
  { id: 'vaccine', label: 'Vaccines' },
];
