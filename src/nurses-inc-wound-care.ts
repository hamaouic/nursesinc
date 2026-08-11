/**
 * Nurses Inc. — Wound Care Quick Reference (clinician-grade).
 *
 * Used by the "Definitions" toggle in the Clinical Forms & Tools
 * section on /forms, in the "For Nurses & Physicians" view.
 *
 * AUDIENCE: LPNs, RNs, partner physicians, pharmacists.
 *
 * Covers:
 *  - Wound classification (red/yellow/black, pressure injury stages)
 *  - Cleanser & dressing selection by wound type
 *  - Systemic antibiotics (only when indicated)
 *  - Topical antimicrobials
 *  - Pain control
 *  - When to escalate
 *
 * ⚠️ Always pair with current WOCN / RNAO best-practice guidelines
 * and your local wound-care formulary. Last reviewed Aug 2026.
 */

export type WoundColor =
  | 'red'      // granulating / RYB red
  | 'yellow'   // sloughy / RYB yellow
  | 'black'    // necrotic / RYB black
  | 'rose'     // pressure I (intact, mild)
  | 'amber'    // pressure II (shallow, moderate)
  | 'orange'   // pressure III (deep, severe)
  | 'crimson'  // pressure IV (deepest, critical)
  | 'purple'   // sDTI (deep tissue injury)
  | 'slate';   // unstageable (obscured base)

export type WoundStage = {
  id: string;
  /** Stage name (the user-facing label). */
  name: string;
  /** Color chip for the icon (RYB for wounds, severity ramp for pressure). */
  color: WoundColor;
  /** Clinical description. */
  description: string;
  /** Typical appearance / depth. */
  appearance: string;
  /** Cleanser recommendation. */
  cleanser: string;
  /** Primary dressing choice. */
  primaryDressing: string;
  /** Secondary dressing choice (if applicable). */
  secondaryDressing?: string;
  /** Wear time. */
  wearTime: string;
  /** Key "what to look out for" signs. */
  adrs: string[];
  /** When to escalate. */
  escalation: string;
};

export const woundStages: WoundStage[] = [
  {
    id: 'red',
    name: 'Red Wound (Granulating)',
    color: 'red',
    description:
      'Healthy healing wound. Red, moist, beefy-red granulation tissue. Goal: protect the granulation and support epithelialization.',
    appearance:
      'Beefy red, moist, granular surface. No slough or eschar. Wound is shrinking in size.',
    cleanser:
      'Normal saline (0.9% NaCl) — preferred. Sterile water acceptable if saline unavailable. Avoid cytotoxic cleansers (H₂O₂, povidone-iodine) on healthy granulation tissue.',
    primaryDressing:
      'Hydrocolloid (for shallow, low-exudate wounds) OR foam dressing (for moderate exudate) OR hydrogel (for dry, shallow wounds).',
    secondaryDressing:
      'Foam or transparent film if extra absorption / protection needed.',
    wearTime:
      'Hydrocolloid: 3–5 days. Foam: 3–7 days. Hydrogel: 1–3 days. Change sooner if strike-through or leakage.',
    adrs: [
      'Bleeding on dressing removal: re-evaluate — may be over-granulation ("proud flesh"). Cauterize with silver nitrate if bleeding easily.',
      'No progress in 2 weeks: re-evaluate for infection, offloading, nutrition, vascular supply.',
      'Increased exudate or odor: rule out infection → swab for culture & sensitivity.',
    ],
    escalation:
      'Wound not reducing in size by 30% within 4 weeks → refer to wound-care specialist / enterostomal therapist (ET nurse).',
  },
  {
    id: 'yellow',
    name: 'Yellow Wound (Sloughy)',
    color: 'yellow',
    description:
      'Wound with devitalized tissue (slough). Yellow, soft, stringy, or creamy. Goal: debridement — remove slough to reveal red granulation.',
    appearance:
      'Yellow / cream / tan soft tissue. May be stringy or mucinous. Wound edges may be undermined.',
    cleanser:
      'Normal saline OR surfactant cleanser (e.g., Pluronic-68, Poloxamer 188) to lift slough. Avoid H₂O₂ on deep cavities (gas embolism risk).',
    primaryDressing:
      'Hydrogel + secondary dressing (for autolytic debridement in low-exudate wounds). Hypertonic saline 20% gauze (for moderate exudate). Honey dressing (medical-grade Manuka) for its autolytic + antimicrobial action. Hydrofiber (Aquacel) for heavy exudate.',
    secondaryDressing:
      'Foam or absorbent cover dressing. Secure with tape or wrap.',
    wearTime:
      'Hydrogel: 1–3 days. Hypertonic saline: daily. Honey: 3–5 days. Hydrofiber: up to 7 days if exudate managed.',
    adrs: [
      'Localized infection signs (heat, redness, swelling, increased pain, purulent exudate) → systemic antibiotics may be needed.',
      'Undermining / tunneling: pack lightly with ribbon (hydrofiber or alginate) — never pack tightly (impairs granulation).',
      'Honey dressings: avoid in patients with bee venom allergy.',
    ],
    escalation:
      'Signs of systemic infection (fever, leukocytosis, sepsis) → blood cultures + systemic antibiotics + surgical consult for sharp debridement if extensive slough.',
  },
  {
    id: 'black',
    name: 'Black Wound (Necrotic / Eschar)',
    color: 'black',
    description:
      'Wound covered with thick, leathery, black or brown eschar (full-thickness necrosis). Goal: debridement before healing can begin. Stable dry eschar on a heel is sometimes left intact (acts as natural cover).',
    appearance:
      'Thick, leathery, black / brown / tan eschar. Dry, adherent. Often painless (necrotic tissue is insensate).',
    cleanser:
      'Mechanical / sharp / enzymatic / autolytic debridement precedes any dressing. Never use dry dressings on eschar.',
    primaryDressing:
      'Sharp / surgical debridement (preferred for extensive necrosis) OR enzymatic debridement with collagenase (Santyl) ointment daily. Autolytic debridement with hydrogel + film dressing for slow, conservative debridement.',
    secondaryDressing:
      'Foam or absorbent cover. For stable heel eschar: povidone-iodine paint + dry gauze only.',
    wearTime:
      'Collagenase: daily. Hydrogel: 1–3 days. Heel eschar: change every 1–3 days.',
    adrs: [
      '⚠️ DO NOT debride stable, dry, intact heel eschar — it serves as a natural biological cover. Conservative care only.',
      '⚠️ AVOID debridement of arterial ulcers without first confirming adequate perfusion (ABPI > 0.5, or vascular surgery review).',
      'Wet / boggy eschar = infection → urgent surgical consult.',
      'Crepitus (gas in soft tissue) → necrotizing fasciitis suspected → EMERGENCY surgical debridement.',
    ],
    escalation:
      'Wet eschar, surrounding erythema, fever, crepitus, or foul odor → emergency surgical debridement + IV antibiotics.',
  },
  {
    id: 'pressure-1',
    name: 'Pressure Injury Stage I',
    color: 'rose',
    description:
      'Non-blanchable erythema of intact skin. The earliest visible sign of pressure damage. Common over bony prominences (sacrum, heels, trochanters).',
    appearance:
      'Localized redness that does NOT blanch (turn white) when pressed. Skin intact. May be harder, warmer, cooler, or more painful than surrounding tissue in darker skin tones.',
    cleanser:
      'Gently cleanse with mild soap and water. No aggressive scrubbing.',
    primaryDressing:
      'No dressing required (skin intact). Apply thin protective barrier film (e.g., Cavilon, Sensi-Care) to protect from moisture and friction.',
    secondaryDressing: 'None.',
    wearTime:
      'Re-apply barrier every 3–7 days and after each wash.',
    adrs: [
      'Stage I can progress quickly to Stage II/III within hours if offloading and pressure redistribution are not initiated.',
      'Disproportionate pain compared to appearance is an early warning sign (especially in deeper skin tones).',
    ],
    escalation:
      'No improvement in 24–48 h despite offloading → re-evaluate. Use risk assessment (Braden Scale) regularly.',
  },
  {
    id: 'pressure-2',
    name: 'Pressure Injury Stage II',
    color: 'amber',
    description:
      'Partial-thickness skin loss involving the epidermis and/or dermis. Shallow, pink/red wound bed. No slough or bruising.',
    appearance:
      'Shallow ulcer with a red-pink wound bed. May also appear as an intact or ruptured blister. No exposed fat or deeper tissue.',
    cleanser:
      'Normal saline. Gentle irrigation (4–15 psi pressure syringe).',
    primaryDressing:
      'Hydrocolloid (for shallow, low-exudate) OR foam (for moderate exudate). Film dressing for shallow, minimal-exudate wounds.',
    secondaryDressing: 'Foam if exudate.',
    wearTime: 'Hydrocolloid 3–5 days; foam 3–7 days; film up to 7 days.',
    adrs: [
      'Bruising (dark, purple, maroon) indicates deep tissue injury — reclassify as suspected DTI, not Stage II.',
      'Rapid deterioration → reassess offloading, nutrition, and care plan.',
    ],
    escalation:
      'No healing trend in 2 weeks → consider 2-week "rule of twos" reassessment and ET nurse referral.',
  },
  {
    id: 'pressure-3',
    name: 'Pressure Injury Stage III',
    color: 'orange',
    description:
      'Full-thickness skin loss. Subcutaneous fat may be visible. Slough may be present. No exposed bone, tendon, or muscle.',
    appearance:
      'Deeper crater. Visible subcutaneous fat. Undermining may be present. Wound edges rolled (epibole) signals stalled healing.',
    cleanser:
      'Normal saline. Surfactant cleanser if biofilm suspected. Consider enzymatic debridement if slough present.',
    primaryDressing:
      'Foam (for moderate exudate), hydrofiber (for heavy exudate), alginate (for heavy exudate + hemostasis). Honey or silver dressing if infection risk.',
    secondaryDressing: 'Foam cover; secure with tape or wrap.',
    wearTime: '3–7 days depending on exudate.',
    adrs: [
      'Undermining > 1 cm at any point → pack lightly with ribbon.',
      'Biofilm (shiny, slimy surface that returns after cleaning) → consider antimicrobial dressings.',
      'Tunneling → measure depth and document; pack lightly.',
    ],
    escalation:
      'Exposed deeper structures, expanding area, or signs of systemic infection → surgical consult + wound-care specialist.',
  },
  {
    id: 'pressure-4',
    name: 'Pressure Injury Stage IV',
    color: 'crimson',
    description:
      'Full-thickness skin and tissue loss with exposed bone, tendon, ligament, cartilage, or muscle. Often with undermining and tunneling.',
    appearance:
      'Deep crater. Exposed bone, tendon, or muscle visible or directly palpable. Slough or eschar may be present. Often infected.',
    cleanser:
      'Normal saline. If osteomyelitis suspected → avoid aggressive sharp debridement until orthopedic assessment.',
    primaryDressing:
      'Hydrofiber (Aquacel) or alginate for moderate-heavy exudate. Silver dressing if bioburden high. Wound vac (NPWT) if available and appropriate.',
    secondaryDressing:
      'Foam cover. Wound vac (negative pressure wound therapy) — range -75 to -125 mmHg continuous or intermittent, with foam or gauze interface.',
    wearTime:
      'Hydrofiber 3–7 days; wound vac changed every 2–3 days.',
    adrs: [
      '⚠️ Suspect osteomyelitis if wound probes to bone, foul odor, or persistent non-healing. MRI is the gold standard.',
      'Undermining and tunneling common — always probe the wound and document.',
      'Heavy bioburden always suspected — consider systemic antibiotics only if signs of invasive infection.',
    ],
    escalation:
      'Suspected osteomyelitis, exposed bone with systemic signs, or wound not improving after 4–6 weeks of optimal care → orthopedic + wound-care specialist consult.',
  },
  {
    id: 'dti',
    name: 'Suspected Deep Tissue Injury (sDTI)',
    color: 'purple',
    description:
      'Purple or maroon localized area of discolored intact skin or blood-filled blister. The damage is deeper than visible — the skin is hiding what is happening below.',
    appearance:
      'Purple, maroon, or dark intact skin. May be a blood-filled blister. Often preceded by Stage I that "fades" to purple.',
    cleanser:
      'Gentle soap and water. No scrubbing or debridement.',
    primaryDressing:
      'No debridement. Protect with a transparent film dressing or thin hydrocolloid. Offload pressure.',
    secondaryDressing: 'None.',
    wearTime: 'Leave intact for 3–7 days; re-evaluate.',
    adrs: [
      'sDTI may evolve rapidly to Stage III/IV within 24–72 h despite all interventions.',
      'DO NOT debride intact purple skin — it may be protecting deeper tissue from infection.',
    ],
    escalation:
      'Any progression to open wound OR signs of systemic infection → urgent wound-care + surgical review.',
  },
  {
    id: 'unstageable',
    name: 'Unstageable Pressure Injury',
    color: 'slate',
    description:
      'Full-thickness skin and tissue loss in which the base of the ulcer is covered by slough or eschar. The depth cannot be determined until the devitalized tissue is removed.',
    appearance:
      'Wound bed obscured by yellow slough or brown / black eschar. Cannot see or palpate the base.',
    cleanser:
      'Same as yellow / black wounds. Debridement (sharp preferred) is required to stage the wound.',
    primaryDressing:
      'Enzymatic debridement (collagenase) + secondary cover. Or autolytic debridement with hydrogel + film. Or sharp debridement by qualified clinician.',
    secondaryDressing: 'Foam or cover; secure.',
    wearTime: 'Daily for enzymatic; 1–3 days for hydrogel.',
    adrs: [
      'Stable heel eschar: do NOT debride.',
      'Wet eschar + erythema + foul odor → emergency surgical consult.',
      'Once debrided, re-stage the wound and document.',
    ],
    escalation:
      'Wet eschar, systemic infection signs, or unstageable heel eschar with reperfusion concerns → surgical consult.',
  },
];

// ============================================================
// Topical and systemic wound care medications
// ============================================================
export type WoundMed = {
  id: string;
  name: string;
  /**
   * Category. Top-level buckets rendered on the Wound Care tab:
   *   classification → handled separately by `woundStages`
   *   dressing-class → "Dressings Class" section
   *   cleanser       → "Medications · Cleansers" subsection
   *   topical        → "Medications · Topicals" subsection
   *   systemic       → "Medications · Systemic Medication" subsection
   *   analgesic      → "Medications · Analgesic" subsection
   */
  type:
    | 'classification'
    | 'dressing-class'
    | 'cleanser'
    | 'topical'
    | 'systemic'
    | 'analgesic';
  description: string;
  whenToUse: string;
  adrs: string[];
  notes?: string;
};

export const woundMeds: WoundMed[] = [
  // Cleansers
  {
    id: 'med-saline',
    name: 'Normal Saline (0.9% NaCl)',
    type: 'cleanser',
    description:
      'Isotonic, non-cytotoxic, sterile. Mechanical irrigation at 4–15 psi removes debris and bacteria without damaging granulation tissue.',
    whenToUse:
      'First-line cleanser for ALL wound types. Use at room or body temperature.',
    adrs: [
      'Generally none — minimal risk.',
      'Cold saline may cause patient discomfort — warm to body temperature before use.',
    ],
  },
  {
    id: 'med-surfactant',
    name: 'Surfactant cleansers (Pluronic-68, Poloxamer 188)',
    type: 'cleanser',
    description:
      'Non-cytotoxic surfactants that lift debris, biofilm, and slough from the wound bed. Gentle on granulation tissue.',
    whenToUse:
      'Biofilm or biofilm-suspected wounds. Yellow sloughy wounds. When saline alone is insufficient.',
    adrs: [
      'Some patients report mild stinging.',
      'Most are pH-balanced to wound pH (~7.4).',
    ],
    notes: 'Examples: Shur-Clens, Pluronic-68, Biolex.',
  },
  {
    id: 'med-povidone',
    name: 'Povidone-Iodine (Betadine)',
    type: 'topical',
    description:
      'Iodine-based antimicrobial with broad-spectrum activity. Cytotoxic to granulation tissue at full strength — use with caution.',
    whenToUse:
      'Short-term (≤ 7 days) for infected wounds, fungal infections. Heel eschar paint (1% povidone-iodine + dry gauze). AVOID on healthy granulation.',
    adrs: [
      'Cytotoxic at full strength — impairs granulation.',
      'Iodine allergy: avoid.',
      'Absorbed systemically — avoid in pregnancy, thyroid disease, renal failure.',
    ],
  },
  {
    id: 'med-h2o2',
    name: 'Hydrogen Peroxide (3%)',
    type: 'cleanser',
    description:
      'Cytotoxic at full strength. Mechanical debridement action via effervescence — useful for loosening crusted debris.',
    whenToUse:
      'AVOID on healthy granulation. Short-term use only for loosening crusted blood or to mechanically debride loose debris. NEVER use in deep cavities (gas embolism risk).',
    adrs: [
      'Cytotoxic to fibroblasts and keratinocytes.',
      'Impair healing — use sparing and short-term only.',
    ],
  },
  {
    id: 'med-chlorhex',
    name: 'Chlorhexidine 0.05% aqueous',
    type: 'cleanser',
    description:
      'Broad-spectrum antimicrobial. Aqueous form (no alcohol) is safe for wound use. Some cytotoxicity concerns.',
    whenToUse:
      'Wound surrounding skin (peri-wound). NOT inside wound bed long-term. Avoid on face, ears, and near eyes.',
    adrs: [
      'Ototoxic and ocularly toxic — avoid in ear and eye wounds.',
      'Anaphylaxis is rare but reported.',
    ],
  },
  // Topical antimicrobials
  {
    id: 'med-silver',
    name: 'Silver dressings (Silver sulfadiazine, nanocrystalline silver)',
    type: 'topical',
    description:
      'Broad-spectrum antimicrobial. Releases silver ions that disrupt bacterial cell walls and DNA. Effective against MRSA, VRE, Pseudomonas.',
    whenToUse:
      'Critically colonized or locally infected wounds. Short-term (≤ 14 days) — long-term use causes silver staining and resistance.',
    adrs: [
      'Argyria (blue-grey skin staining) with prolonged use.',
      'USE CAUTION in patients with sulfa allergy (silver sulfadiazine).',
      'Avoid in pregnancy and young children.',
      'Discontinue once bioburden controlled.',
    ],
    notes: 'Forms: SSD cream (Flamazine), Aquacel Ag, Mepilex Ag, Acticoat.',
  },
  {
    id: 'med-honey',
    name: 'Medical-grade honey (Manuka)',
    type: 'topical',
    description:
      'Antibacterial, anti-inflammatory, autolytic debridement. Methylglyoxal (MGO) is the active antimicrobial. Maintains moist wound environment.',
    whenToUse:
      'Yellow sloughy wounds, low-to-moderate exudate wounds. Can be used on Stage II–III with light bioburden.',
    adrs: [
      'Stinging on application (brief, transient).',
      'CONTRAINDICATED in patients with bee venom allergy.',
      'Diabetic wounds: monitor glucose (honey has natural sugars).',
      'Not for use with oxidizing agents (e.g., iodine, hypochlorite) — they deactivate the honey.',
    ],
    notes: 'Examples: Medihoney, Activon.',
  },
  {
    id: 'med-collagenase',
    name: 'Collagenase (Santyl) — enzymatic debriding ointment',
    type: 'topical',
    description:
      'Enzymatic ointment that digests collagen in necrotic tissue. Selective — does NOT damage healthy granulation tissue.',
    whenToUse:
      'Black or yellow wounds with necrotic tissue. Apply daily in a thin layer to the necrotic area only. Avoid contact with healthy skin.',
    adrs: [
      'Local irritation, erythema, pain at application site.',
      'CONTRAINDICATED with silver, iodine, or heavy-metal-containing products (inactivate enzyme).',
      'Avoid using with acid or alkali cleansers (e.g., acetic acid, sodium hypochlorite).',
    ],
    notes: 'Cover with secondary dressing; do NOT let dry out.',
  },
  {
    id: 'med-mupirocin',
    name: 'Mupirocin 2% ointment (Bactroban)',
    type: 'topical',
    description:
      'Topical antibiotic that inhibits bacterial isoleucyl-tRNA synthetase. Effective against MRSA and most Gram-positive organisms.',
    whenToUse:
      'Localized impetigo, MRSA decolonization, minor wound infections with Gram-positive organisms. Limited spectrum — NOT for Gram-negative or fungal.',
    adrs: [
      'Local irritation, contact dermatitis.',
      'Avoid in eyes and on mucous membranes.',
      'Resistance is emerging — limit to short-term use (≤ 10 days).',
    ],
  },
  {
    id: 'med-fusidic',
    name: 'Fusidic acid 2% (Fucidin)',
    type: 'topical',
    description:
      'Topical antibiotic that inhibits bacterial protein synthesis. Effective against Gram-positive organisms including MRSA.',
    whenToUse:
      'Localized staphylococcal / streptococcal skin infections. Good for eczema + impetiginized skin.',
    adrs: [
      'Local irritation.',
      'Resistance possible with prolonged use.',
    ],
  },
  {
    id: 'med-metro',
    name: 'Metronidazole 0.75–1% topical (Metrogel)',
    type: 'topical',
    description:
      'Topical antimicrobial effective against anaerobes. Treats wound odor from anaerobic bacteria (e.g., fungating wounds, pressure injuries with anaerobic infection).',
    whenToUse:
      'Malodorous wounds (anaerobic overgrowth). Not for routine use. Daily application × 2 weeks.',
    adrs: [
      'Local dryness, erythema, stinging.',
      'Avoid near eyes.',
      'Wound odor usually resolves within 1–2 weeks.',
    ],
  },
  // Dressing classes
  {
    id: 'med-hydrocolloid',
    name: 'Hydrocolloid dressings',
    type: 'dressing-class',
    description:
      'Self-adhesive wafer containing gel-forming agents (carboxymethylcellulose, gelatin). Maintains moist environment; autolytic debridement.',
    whenToUse:
      'Stage I–II pressure injuries, shallow red/yellow wounds with low exudate. NOT for infected wounds or heavy exudate.',
    adrs: [
      'Maceration of peri-wound skin if overused on exudate-heavy wounds.',
      'Odor on removal (gel) — reassure patient; not infection.',
    ],
    notes: 'Examples: Duoderm, Tegaderm Hydrocolloid.',
  },
  {
    id: 'med-hydrogel',
    name: 'Hydrogel dressings',
    type: 'dressing-class',
    description:
      'Water-based gel sheets or amorphous gel. Donates moisture to dry wounds; supports autolytic debridement.',
    whenToUse:
      'Dry, shallow wounds. Necrotic eschar (autolytic debridement). Superficial burns. Painful wounds (cooling effect).',
    adrs: [
      'Maceration if overused on exudate wounds.',
      'Bacterial growth if not changed frequently.',
    ],
  },
  {
    id: 'med-foam',
    name: 'Foam dressings',
    type: 'dressing-class',
    description:
      'Polyurethane foam with high absorbency. Maintains moist environment. Cushioning effect.',
    whenToUse:
      'Moderate-to-heavy exudate wounds. Stage II–IV pressure injuries. Venous leg ulcers. Protection over bony prominences.',
    adrs: [
      'Generally well-tolerated.',
      'May require secondary fixation (tape, wrap).',
    ],
    notes: 'Examples: Mepilex, Allevyn, Optifoam.',
  },
  {
    id: 'med-hydrofiber',
    name: 'Hydrofiber dressings (Aquacel)',
    type: 'dressing-class',
    description:
      'Carboxymethylcellulose fiber that gels on contact with exudate. Highly absorbent; supports autolytic debridement. Available with silver (Aquacel Ag).',
    whenToUse:
      'Heavy exudate wounds. Stage III–IV pressure injuries. Cavity wounds (ribbon form). Post-operative wounds.',
    adrs: [
      'Drying out if exudate insufficient — change dressing.',
      'Generally well-tolerated.',
    ],
  },
  {
    id: 'med-alginate',
    name: 'Alginate dressings',
    type: 'dressing-class',
    description:
      'Calcium / sodium alginate fiber derived from seaweed. Highly absorbent; hemostatic (calcium ions activate clotting).',
    whenToUse:
      'Heavy exudate wounds. Bleeding wounds (post-debridement hemostasis). Cavity wounds (ribbon form).',
    adrs: [
      'Drying out if exudate insufficient.',
      'Generally well-tolerated.',
    ],
  },
  {
    id: 'med-collagen',
    name: 'Collagen dressings',
    type: 'dressing-class',
    description:
      'Bovine, porcine, or avian collagen matrix. Supports new tissue growth and provides scaffolding for granulation.',
    whenToUse:
      'Non-healing stalled wounds. Clean granulating wounds. Chronic Stage II–III wounds.',
    adrs: [
      'Avoid in patients with bovine / porcine allergy (read source carefully).',
      'Generally well-tolerated.',
    ],
  },
  {
    id: 'med-npwt',
    name: 'Negative Pressure Wound Therapy (NPWT, wound vac)',
    type: 'dressing-class',
    description:
      'Sealed wound with foam or gauze interface connected to a vacuum pump. Continuous or intermittent negative pressure (-75 to -125 mmHg) removes exudate, reduces edema, promotes granulation.',
    whenToUse:
      'Stage III–IV pressure injuries. Complex wounds. Surgical wounds. Diabetic foot ulcers. NOT for: unexplored fistulas, malignancy in wound, untreated osteomyelitis, exposed vessels/organs.',
    adrs: [
      'Skin maceration at the seal — apply barrier film.',
      'Pain on pressure application — may require lower pressure settings.',
      'Foam fragments retained in wound on removal — re-evaluate at each change.',
      '⚠️ CONTRAINDICATED: unexplored fistula, malignancy, untreated osteomyelitis, exposed vessels or nerves.',
    ],
    notes: 'Examples: V.A.C. (KCI), Renasys (Smith & Nephew), PICO (Smith & Nephew disposable).',
  },
  // Systemic antibiotics (only when indicated)
  {
    id: 'med-amox-clav',
    name: 'Amoxicillin–Clavulanate 875/125 mg PO BID',
    type: 'systemic',
    description:
      'Broad-spectrum penicillin + β-lactamase inhibitor. First-line systemic antibiotic for uncomplicated skin & soft tissue infections (SSTI).',
    whenToUse:
      'Cellulitis, infected wounds with systemic signs. 7–14 days depending on severity.',
    adrs: [
      'GI upset, diarrhea (high C. difficile risk).',
      'Hepatotoxicity (cholestatic pattern) — rare but serious.',
      'Rash — distinguish from true penicillin allergy.',
      'OK in pregnancy.',
    ],
    notes: 'Adjust for CrCl < 30 mL/min (use 500/125 mg BID).',
  },
  {
    id: 'med-cephalexin',
    name: 'Cephalexin 500 mg PO QID',
    type: 'systemic',
    description:
      'First-generation cephalosporin. Effective against Group A Streptococcus and methicillin-sensitive Staphylococcus aureus (MSSA).',
    whenToUse:
      'Uncomplicated SSTI, post-operative wound infection, cellulitis. 7–10 days.',
    adrs: [
      'GI upset.',
      'Caution if severe penicillin allergy (10% cross-reactivity).',
      'C. difficile risk with prolonged use.',
    ],
    notes: 'Adjust for CrCl < 30 mL/min.',
  },
  {
    id: 'med-clinda',
    name: 'Clindamycin 300–450 mg PO QID',
    type: 'systemic',
    description:
      'Lincosamide antibiotic with good Gram-positive and anaerobic coverage. Penetrates bone well.',
    whenToUse:
      'Suspected MRSA SSTI (alternative to TMP-SMX). Anaerobic infections. Dental infections. 7–10 days.',
    adrs: [
      'HIGH C. difficile risk — use caution in older adults and recent antibiotic use.',
      'GI upset, rash.',
      'Not for meningitis (poor CNS penetration).',
    ],
    notes: 'No renal adjustment.',
  },
  {
    id: 'med-tmp-smx',
    name: 'Trimethoprim–Sulfamethoxazole (TMP-SMX) DS 1 tab PO BID',
    type: 'systemic',
    description:
      'Folate antagonist combination. Effective against MRSA, Proteus, E. coli, Klebsiella.',
    whenToUse:
      'Uncomplicated MRSA SSTI (cellulitis, abscess). 7–10 days.',
    adrs: [
      'Photosensitivity, rash, hyperkalemia.',
      'SULFA allergy → contraindicated (Stevens–Johnson syndrome risk).',
      'Renal impairment: avoid or reduce dose (CrCl < 30 mL/min).',
      'Trimethoprim antagonism with folate — supplement in pregnancy.',
      'Caution with warfarin (potentiates INR), ACE-I/ARB (hyperkalemia), methotrexate.',
    ],
    notes: 'Not for use in pregnancy (1st trimester — folate antagonist).',
  },
  {
    id: 'med-doxycycline',
    name: 'Doxycycline 100 mg PO BID',
    type: 'systemic',
    description:
      'Tetracycline antibiotic. Effective against MRSA, atypical organisms. Anti-inflammatory properties.',
    whenToUse:
      'MRSA SSTI, Lyme disease, atypical infections. 7–14 days.',
    adrs: [
      'Photosensitivity — strict sun avoidance.',
      'Pill oesophagitis — take with full glass of water, remain upright.',
      'CONTRAINDICATED in pregnancy and < 8 years.',
      'Chelates with Ca²⁺/Mg²⁺/Fe²⁺ — separate by 2–4 h.',
    ],
  },
  {
    id: 'med-vanco',
    name: 'Vancomycin IV (inpatient)',
    type: 'systemic',
    description:
      'Glycopeptide antibiotic. Reserved for severe MRSA infections or complex SSTI requiring IV therapy.',
    whenToUse:
      'Severe MRSA SSTI, sepsis, suspected osteomyelitis, deep wound infection with systemic signs. Dose by weight, adjusted for renal function.',
    adrs: [
      '⚠️ Nephrotoxicity — monitor creatinine, trough levels.',
      'Ototoxicity (rare, dose-dependent).',
      'Red-man syndrome (rapid infusion → histamine release) — slow infusion to ≥ 60 min.',
      'DRESS syndrome (severe rash) — discontinue if suspected.',
    ],
    notes: 'Atypical infections. INDICATION-ONLY — dosing in hospital protocol.',
  },
  // Analgesics
  {
    id: 'med-acetaminophen',
    name: 'Acetaminophen (Tylenol) 500–1000 mg PO q6h',
    type: 'analgesic',
    description:
      'First-line analgesic for wound-related pain. Mild antipyretic. Mechanism: central COX inhibition.',
    whenToUse:
      'Baseline wound pain. Dressing change discomfort. PRN or scheduled.',
    adrs: [
      'Hepatotoxicity if > 4 g/day or with liver disease.',
      'Generally safe in older adults.',
      'Many OTC / combo products contain acetaminophen — risk of double-dosing.',
    ],
    notes: 'Max 4 g/day in healthy adults; ≤ 3 g/day in older adults / liver disease.',
  },
  {
    id: 'med-gabapentin',
    name: 'Gabapentin 100–300 mg PO TID',
    type: 'analgesic',
    description:
      'α2δ calcium channel ligand. First-line for neuropathic pain, including post-herpetic neuralgia and chronic wound pain.',
    whenToUse:
      'Neuropathic pain, persistent wound pain, post-herpetic neuralgia. Titr ate slowly over 2–4 weeks.',
    adrs: [
      'Drowsiness, dizziness, ataxia (especially in older adults).',
      'Peripheral edema.',
      'Renal dose adjustment required (CrCl < 60 mL/min).',
      'Avoid abrupt discontinuation (seizure risk).',
    ],
  },
  {
    id: 'med-ibuprofen',
    name: 'Ibuprofen 400 mg PO q6h (PRN)',
    type: 'analgesic',
    description:
      'NSAID. Anti-inflammatory and analgesic. Useful for procedure-related wound pain.',
    whenToUse:
      'Acute wound pain, procedure-related inflammation. NOT for chronic wound use in older adults (Beers criteria — GI / renal / bleeding risk).',
    adrs: [
      '⚠️ Beers criteria: avoid chronic NSAID use in adults 65+ (GI bleeding, renal injury, hypertension).',
      'Avoid with anticoagulants (bleeding risk).',
      'Avoid with ACE-I/ARB + diuretic (triple whammy — kidney injury).',
      'Take with food to reduce GI upset.',
    ],
    notes: 'Tylenol or topical lidocaine preferred for older adults.',
  },

  // ── Additional Dressings ─────────────────────────────────────────
  {
    id: 'med-thin-hydrocolloid',
    name: 'Thin Hydrocolloid (e.g. Duoderm Extra Thin, Tegasorb Thin)',
    type: 'dressing-class',
    description:
      'Lower-profile version of standard hydrocolloid. Provides moist healing environment with less bulk — better visibility of the wound and better conformity on joints, heels, and shallow abrasions.',
    whenToUse:
      'Stage I–II pressure injuries, superficial burns, donor sites, post-op incisions, friction blisters. Suitable for ambulatory patients who want discreet coverage.',
    adrs: [
      'Maceration of peri-wound skin if left on too long.',
      'Not for infected wounds or wounds with heavy exudate.',
      'May roll at edges on high-friction sites.',
    ],
    notes: 'Wear time 3–5 days. Change if leakage or odor develops.',
  },
  {
    id: 'med-transparent-film',
    name: 'Transparent Film Dressing (e.g. Tegaderm, Opsite)',
    type: 'dressing-class',
    description:
      'Thin, semi-permeable polyurethane film. Allows oxygen and moisture vapor exchange but blocks water and bacteria. Transparent for wound monitoring without removal.',
    whenToUse:
      'Stage I pressure injuries, superficial abrasions, IV site securement, post-op incisions (closed). Secondary dressing over hydrogel or hydrocolloid. Protection of intact skin at risk.',
    adrs: [
      'Not for infected wounds.',
      'Not for moderate-to-heavy exudate (will macerate).',
      'Skin stripping on removal in fragile elderly skin — use adhesive remover.',
    ],
    notes: 'Wear time up to 7 days. Best for low-exudate, superficial wounds.',
  },
  {
    id: 'med-hypertonic-saline',
    name: 'Hypertonic Saline 20% Gauze (Curasalt, Mesalt)',
    type: 'dressing-class',
    description:
      'Hypertonic saline-impregnated gauze. Osmotic gradient draws exudate, bacteria, and debris out of the wound bed. Useful for infected or heavily contaminated wounds.',
    whenToUse:
      'Infected or critically colonized wounds. Wounds with heavy exudate and slough. Red or yellow wounds that need mechanical + osmotic debridement.',
    adrs: [
      'Stinging on application (patient counseling required).',
      'NOT for dry wounds — will dehydrate granulation tissue.',
      'Short-term use only (≤ 3 days) to avoid over-dehydration.',
    ],
    notes: 'Change every 24–48 h. Discontinue when infection cleared and granulation present.',
  },
  {
    id: 'med-cavilon',
    name: 'Cavilon No-Sting Barrier Film (3M)',
    type: 'topical',
    description:
      'Alcohol-free, cyanoacrylate-based skin barrier. Forms a protective layer over intact or at-risk skin without stinging. Lasts up to 72 hours.',
    whenToUse:
      'Prevention of incontinence-associated dermatitis (IAD) and medical adhesive-related skin injury (MARSI). Peri-wound skin protection under adhesives, ostomies, and drains.',
    adrs: [
      'Allow 30 seconds to dry before applying adhesive dressing.',
      'Do NOT apply to infected or broken skin — barrier will trap bacteria.',
    ],
    notes: 'Reapply every 48–72 h or after each cleaning. Compatible with most adhesives.',
  },
  {
    id: 'med-sensi-care',
    name: 'Sensi-Care Skin Protectant (ConvaTec)',
    type: 'topical',
    description:
      'Dimethicone-based skin protectant cream. Gentle, fragrance-free barrier that helps maintain skin integrity and prevent breakdown.',
    whenToUse:
      'Incontinence care, peri-wound protection, general skin protection in frail elderly. Daily use in at-risk patients.',
    adrs: [
      'Rare sensitivity to dimethicone.',
      'Do not apply to deep wounds — barrier will impair granulation.',
    ],
    notes: 'Apply after each incontinence episode or every 12 h. Compatible with adhesives.',
  },

  // ── Santyl brand note (added to existing collagenase) ────────────
  {
    id: 'med-santyl',
    name: 'Santyl (Collagenase Santyl® Ointment 250 u/g)',
    type: 'topical',
    description:
      'Brand-name enzymatic debriding ointment. Collagenase derived from Clostridium histolyticum. Selectively digests native collagen in necrotic tissue while sparing healthy granulation tissue. Same active as generic collagenase but supplied sterile in single-use tubes.',
    whenToUse:
      'Enzymatic debridement of black eschar (necrotic) and yellow slough in pressure injuries, diabetic foot ulcers, venous ulcers, and burns. Apply once daily, cover with moist gauze.',
    adrs: [
      'Mild transient burning on application (10–15% of patients).',
      'NOT compatible with silver, iodine, or honey dressings — metals inactivate the enzyme.',
      'Avoid acidic or heavy-metal cleansers (H₂O₂, povidone-iodine) — denature collagenase.',
    ],
    notes: 'Same drug class as generic collagenase (med-collagenase). Use saline to cleanse before and after.',
  },

  // ── Povidone-iodine paint (separate from soak) ───────────────────
  {
    id: 'med-povidone-paint',
    name: 'Povidone-Iodine Paint 1% (e.g. Betadine Paint)',
    type: 'topical',
    description:
      'Low-concentration (1%) povidone-iodine paint/solution. Faster-drying than the standard 10% scrub. Used as a peri-wound antiseptic or short-term eschar paint for dry heels.',
    whenToUse:
      'Heel eschar (paint + dry gauze, do not soften). Peri-wound antisepsis before sharp debridement. Short-term (≤ 7 days) for colonized wounds.',
    adrs: [
      'Cytotoxic at full strength — impairs granulation.',
      'Iodine allergy: avoid.',
      'Absorbed systemically — avoid in pregnancy, thyroid disease, renal failure.',
    ],
    notes: 'Different from Betadine scrub (which contains detergent). Paint formulation is non-detergent.',
  },
];

export const woundMedicationTypes: { id: WoundMed['type']; label: string }[] = [
  { id: 'cleanser', label: 'Cleansers' },
  { id: 'topical', label: 'Topicals' },
  { id: 'systemic', label: 'Systemic Medication' },
  { id: 'analgesic', label: 'Analgesic' },
];
