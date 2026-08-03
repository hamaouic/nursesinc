/**
 * Nurses Inc. — Knowledge Hub one-pagers
 *
 * Three short PDF one-pagers (Dementia Insights, Late-Life Mental Health,
 * Geriatric Wellness). Each is grounded in Canadian best-practice guidelines
 * with APA-formatted references on the back page.
 */

export type OnePagerId = 'dementia' | 'mental-health' | 'geriatric';

export type OnePagerMeta = {
  id: OnePagerId;
  title: string;
  shortTitle: string;
  audience: string;
  filename: string;
  icon: string;
  accent: 'blush' | 'mint' | 'cream';
};

export const onePagers: Record<OnePagerId, OnePagerMeta> = {
  dementia: {
    id: 'dementia',
    title: 'Dementia Insights',
    shortTitle: 'Understanding the Journey',
    audience: 'One-Pager · Families',
    filename: 'Nurses-Inc-OnePager-Dementia-Insights.pdf',
    icon: 'Brain',
    accent: 'blush',
  },
  'mental-health': {
    id: 'mental-health',
    title: 'Late-Life Mental Health',
    shortTitle: 'Mood, Anxiety, Grief',
    audience: 'One-Pager · Families',
    filename: 'Nurses-Inc-OnePager-Late-Life-Mental-Health.pdf',
    icon: 'Heart',
    accent: 'mint',
  },
  geriatric: {
    id: 'geriatric',
    title: 'Geriatric Wellness',
    shortTitle: 'Aging Well at Home',
    audience: 'One-Pager · Families',
    filename: 'Nurses-Inc-OnePager-Geriatric-Wellness.pdf',
    icon: 'ShieldPlus',
    accent: 'cream',
  },
};

export type OnePagerBlock = {
  heading: string;
  body: string;
};

export type OnePagerPayload = {
  intro: string[];
  nbContext: string[];
  blocks: OnePagerBlock[];
  checklist: string[];
  references: string[];
};

export const onePagerContent: Record<OnePagerId, OnePagerPayload> = {
  dementia: {
    intro: [
      'Nurses Inc. — Dementia Insights (One-Pager)',
      'A print-ready summary for families and caregivers in New Brunswick. Read it once, keep it on the fridge, share it with anyone who spends time with the person you love.',
    ],
    nbContext: [
      'New Brunswick context:',
      'In NB, dementia prevalence rises sharply after age 75 and many families first encounter the system through their primary care provider or the Alzheimer Society of New Brunswick (1-800-593-1666). Early connection to the Extra-Mural Program and a documented Goals of Care conversation can prevent two of the most common crises we see in our independent practice: avoidable ER visits after sundowning, and family conflict about driving safety.',
    ],
    blocks: [
      {
        heading: 'What dementia is — and what it is not',
        body: 'Dementia is an umbrella term for progressive changes in memory, language, judgement, and behaviour caused by conditions such as Alzheimer\u2019s disease, vascular dementia, Lewy body dementia, and frontotemporal dementia. It is not normal aging, it is not contagious, and it is not a single experience. Two people with the same diagnosis can have entirely different days.',
      },
      {
        heading: 'Behaviour is communication',
        body: 'When words fail, behaviour speaks. Up to 60% of responsive behaviours are triggered by environmental factors (lighting, noise, routine), physical factors (pain, constipation, dehydration, infection), or emotional factors (fear, boredom, grief) — not by the disease itself. Looking for the cause is kinder and more effective than correcting the behaviour.',
      },
      {
        heading: 'Redirection, not correction',
        body: 'Asking a person to "remember" rarely helps and often increases distress. Matching their reality (validation), offering a gentle redirect to a familiar activity, and slowing your own pace are evidence-based first responses used across Canadian long-term care (RNAO Best Practice Guideline, 2016).',
      },
      {
        heading: 'Sleep is medicine',
        body: 'A consistent sundown routine — dim lights, warm drink, familiar music, predictable cues — reduces evening agitation more reliably than most medications. Talk to your nurse before reaching for a sedative; benzodiazepines and antipsychotics carry serious risks for older adults with dementia (Beers Criteria, 2023).',
      },
    ],
    checklist: [
      '☐ Bring a complete medication list (including OTC, herbal, and "as needed") to the next clinic visit.',
      '☐ Book an annual medication review using the Beers Criteria® and STOPP/START screens.',
      '☐ Write down the person\u2019s daily routine — what works, what doesn\u2019t.',
      '☐ Identify one safe, predictable "anchor activity" for difficult moments.',
      '☐ Connect with the Alzheimer Society of New Brunswick for peer support and education.',
      '☐ Schedule a Goals of Care conversation with the physician before the next crisis.',
    ],
    references: [
      'Registered Nurses\u2019 Association of Ontario. (2016, supplement 2020). Delirium, dementia, and depression in older adults: Assessment and care (2nd ed.). RNAO Best Practice Guidelines Program. https://rnao.ca/bpg/guidelines/delirium-dementia-and-depression-older-adults-assessment-and-care',
      'American Geriatrics Society Beers Criteria® Update Expert Panel. (2023). American Geriatrics Society 2023 updated AGS Beers Criteria® for potentially inappropriate medication use in older adults. Journal of the American Geriatrics Society, 71(7), 2052–2081. https://doi.org/10.1111/jgs.18372',
      'Behavioural Supports Ontario / brainXchange. (n.d.). PIECES™ approach to complex continuing care. https://brainxchange.ca/Public/Topics-A-to-Z/PIECES-Approach',
      'U-First!® Program. (n.d.). U-First!® framework for understanding & responding to behaviour changes. Alzheimer Society of Ontario. https://u-first.ca/',
      'Alzheimer\u2019s Disease International. (2024). World Alzheimer Report 2024: Mapping disease-modifying clinical trials for Alzheimer\u2019s disease and other dementias. https://www.alzint.org/what-we-do/research/world-alzheimer-report/',
      'Alzheimer Society of Canada. (n.d.). What is dementia? https://alzheimer.ca/en/about-dementia/what-dementia',
    ],
  },

  'mental-health': {
    intro: [
      'Nurses Inc. — Late-Life Mental Health (One-Pager)',
      'A print-ready summary for families and caregivers in New Brunswick. Depression, anxiety, and grief are not a normal part of aging — and they are highly treatable.',
    ],
    nbContext: [
      'New Brunswick context:',
      'NB has one of the oldest populations in Canada and a rural geography that complicates access to mental-health specialists. Telehealth and the provincial Extra-Mural Program can fill many gaps, but the highest-yield intervention is almost always a brief, scheduled conversation with a trusted clinician — ideally the family physician or a registered nurse who knows the person\u2019s story. We use the Serious Illness Conversation framework as a starting point for goals-of-care and mood discussions.',
    ],
    blocks: [
      {
        heading: 'It looks different in older adults',
        body: 'Late-life depression often shows up as withdrawal from hobbies, loss of appetite, vague aches, sleep disruption, or a flat affect — not as overt sadness. Anxiety can masquerade as "checking the locks" or refusing to be alone. Grief after a spouse, a friend, or a role (retirement, driving) is a real medical event that deserves explicit attention.',
      },
      {
        heading: 'Medication is one tool — not the only one',
        body: 'Talk therapy (CBT and IPT adapted for older adults), behavioural activation (scheduled pleasant activities), gentle movement, and sleep hygiene are equally evidence-based for late-life mood. In NB we lean on primary care, the Canadian Mental Health Association — NB Division, and the Chimo Helpline (1-800-667-5005) as first-line supports.',
      },
      {
        heading: 'Watch for warning signs',
        body: 'Persistent sad mood or emptiness lasting more than two weeks; loss of interest in previously enjoyed activities; significant weight or appetite change; sleep disturbance; fatigue; feelings of worthlessness or excessive guilt; difficulty concentrating; recurrent thoughts of death or suicide. Any mention of suicide warrants an immediate call to the Chimo Helpline or 911.',
      },
      {
        heading: 'Caregivers need a seat at the table',
        body: 'Caregiver burnout is a clinical issue, not a personal failure. Family caregivers in NB have access to respite through the Extra-Mural Program and the Department of Social Development\u2019s Long-Term Care program. Ask us — we help families navigate the paperwork so you can focus on the relationship.',
      },
    ],
    checklist: [
      '☐ Screen for depression at every annual wellness visit (PHQ-9 is short and reliable).',
      '☐ Ask directly about suicidal thoughts — asking does not plant the idea.',
      '☐ Schedule one pleasant activity per day, even on hard days.',
      '☐ Review medications with the prescriber — many common drugs can worsen mood.',
      '☐ Build a 24-hour support plan: Chimo Helpline 1-800-667-5005, family physician, EMS 911.',
      '☐ Explore caregiver respite through the NB Extra-Mural Program.',
    ],
    references: [
      'Public Health Agency of Canada. (n.d.). Seniors and mental health. Government of Canada. https://www.canada.ca/en/public-health/services/chronic-diseases/mental-health-conditions/seniors-mental-health.html',
      'Registered Nurses\u2019 Association of Ontario. (2016, supplement 2020). Delirium, dementia, and depression in older adults: Assessment and care (2nd ed.). RNAO Best Practice Guidelines Program. https://rnao.ca/bpg/guidelines/delirium-dementia-and-depression-older-adults-assessment-and-care',
      'Canadian Mental Health Association — New Brunswick. (n.d.). Programs and services. https://cmhanb.ca/',
      'Choosing Wisely Canada. (2024). Serious illness conversations / Time to talk. https://choosingwiselycanada.org/serious-illness-conversations/',
      'O\u2019Mahony, D., Cherubini, A., Guiteras, A. R., Denkinger, M., Beuscart, J.-B., Onder, G., Gudmundsson, A., Cruz-Jentoft, A. J., Knol, W., Bahat, G., van der Velde, N., Petrovic, M., & Curtin, D. (2023). STOPP/START criteria for potentially inappropriate prescribing in older people: Version 3. European Geriatric Medicine, 14(4), 1–18. https://doi.org/10.1007/s41999-023-00777-y',
    ],
  },

  geriatric: {
    intro: [
      'Nurses Inc. — Geriatric Wellness (One-Pager)',
      'A print-ready summary for older adults, families, and caregivers in New Brunswick. Small, sustainable changes keep people safe, mobile, and connected at home for longer.',
    ],
    nbContext: [
      'New Brunswick context:',
      'NB winters (ice, snow, long dark evenings) materially affect falls risk, vitamin D status, mood, and social isolation. Our independent practice uses the RNAO Falls Prevention BPG, the Extra-Mural Program for in-home rehabilitation, and the Age-Friendly NB framework to keep seniors at home safely. The single highest-yield annual visit for any older adult in NB is a comprehensive medication review with their primary care provider or pharmacist.',
    ],
    blocks: [
      {
        heading: 'Falls are predictable — and preventable',
        body: 'Most falls have two or more contributing factors: medication side effects, footwear, lighting, clutter, vision or hearing change, balance impairment, or rushed routine. A 30-minute home safety walkthrough with a nurse identifies 80% of these factors. Ask us about the Cognitive & Environmental Safety Audit — it is a flat-rate service and pays for itself in avoided ER visits.',
      },
      {
        heading: 'Polypharmacy is a diagnosis',
        body: 'Taking 10 or more distinct drug classes is the Canadian Institute for Health Information threshold for polypharmacy. Each new symptom in an older adult should first trigger the question "could a medication be the cause?" before adding another. Bring every bottle to every visit — the brown-bag review is still the gold standard.',
      },
      {
        heading: 'Social connection is clinical',
        body: 'Loneliness carries the same mortality risk as smoking 15 cigarettes a day. NB has active 50+ clubs, municipal seniors\u2019 advisory committees, church and community groups, and the federal New Horizons for Seniors Program. Connection is not a luxury; it is medicine.',
      },
      {
        heading: 'Move a little, every day',
        body: 'Twenty minutes of weight-bearing activity (walking, standing from a chair, light resistance) three times a week reduces falls risk by 30% and improves mood. The NB Active Aging Society and many local recreation centres offer free or low-cost senior programming.',
      },
    ],
    checklist: [
      '☐ Remove one tripping hazard this week (rug, cord, clutter).',
      '☐ Install or check a nightlight in every hallway and bathroom.',
      '☐ Schedule an annual medication review — bring everything in one bag.',
      '☐ Walk, garden, or do chair exercises 3x this week.',
      '☐ Reach out to one person today — a call, a card, a porch visit.',
      '☐ Ask the clinic for a vitamin D level check at the next blood work.',
    ],
    references: [
      'Registered Nurses\u2019 Association of Ontario. (2017, supplement 2022). Preventing falls and reducing injury from falls (4th ed.). RNAO Best Practice Guidelines Program. https://rnao.ca/bpg/guidelines/prevention-falls-and-fall-injuries',
      'Canadian Institute for Health Information. (2022). Drug use among seniors in Canada, 2021. https://www.cihi.ca/en/drug-use-among-seniors-in-canada',
      'Public Health Agency of Canada. (n.d.). Aging and chronic diseases: Healthy aging in Canada. https://www.canada.ca/en/public-health/services/chronic-diseases/aging-and-chronic-diseases.html',
      'World Health Organization. (2020). Decade of healthy ageing 2021–2030. https://www.who.int/initiatives/decade-of-healthy-ageing',
      'Choosing Wisely Canada & Canadian Geriatrics Society. (2025). Geriatrics: Twelve tests and treatments to question. https://choosingwiselycanada.org/recommendation/geriatrics/',
    ],
  },
};