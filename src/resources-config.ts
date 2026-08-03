/**
 * Nurses Inc. — Downloadable resource content
 *
 * Single source of truth for the three Knowledge Hub resource cards.
 * All content is grounded in best-practice guidelines (see APA references at
 * the bottom of each resource generator). Edit copy / sections / sources HERE.
 */

export type ResourceId =
  | 'medication-audit-checklist'
  | 'de-escalation-playbook'
  | 'family-care-conference-kit';

export type ResourceKind = 'pdf' | 'docx';

export type ResourceMeta = {
  id: ResourceId;
  title: string;
  subtitle: string;
  audience: string;
  kind: ResourceKind;
  filename: string;
  /** Short bullet summary for the card */
  summary: string[];
  /** Icon name from lucide-react */
  icon: string;
  accent: 'blush' | 'mint' | 'cream';
};

export const resources: Record<ResourceId, ResourceMeta> = {
  'medication-audit-checklist': {
    id: 'medication-audit-checklist',
    title: 'Medication Audit Forms (Bundle of 10)',
    subtitle: 'An evidence-aligned set of 10 standalone printable forms, shaped by real New Brunswick caregiving experience.',
    audience: 'Bundle · 10 PDFs',
    kind: 'pdf',
    filename: 'Nurses-Inc-Medication-Audit-Forms.zip',
    summary: [
      '10 individual single-page forms (not one combined PDF)',
      'Inventory, Beers, STOPP/START, polypharmacy, symptom form',
      'Deprescribing algorithms, conversation scheduler, EMPOWER, adherence, fridge list',
    ],
    icon: 'Pill',
    accent: 'blush',
  },
  'de-escalation-playbook': {
    id: 'de-escalation-playbook',
    title: 'De-escalation Playbook',
    subtitle: 'An evidence-aligned, non-pharmacological first-line response — shaped by real New Brunswick caregiving experience.',
    audience: 'PDF · Facilities',
    kind: 'pdf',
    filename: 'Nurses-Inc-De-escalation-Playbook.pdf',
    summary: [
      'P.I.E.C.E.S. & U-First!® aligned framework',
      'ABC charting template & trigger mapping',
      'Pharmacological last-resort decision tree',
    ],
    icon: 'ShieldCheck',
    accent: 'mint',
  },
  'family-care-conference-kit': {
    id: 'family-care-conference-kit',
    title: 'Family Care Conference Kit',
    subtitle: 'An evidence-aligned, facilitator-ready template for holistic care-planning meetings — shaped by real New Brunswick caregiving experience.',
    audience: 'Template · Anyone',
    kind: 'docx',
    filename: 'Nurses-Inc-Family-Care-Conference-Kit.docx',
    summary: [
      'Editable agenda, roles & minutes template',
      'ACP / SDM prompts for New Brunswick',
      'Goals-of-care & conflict-resolution scripts',
    ],
    icon: 'BookOpen',
    accent: 'cream',
  },
};

export const resourceList: ResourceMeta[] = [
  resources['medication-audit-checklist'],
  resources['de-escalation-playbook'],
  resources['family-care-conference-kit'],
];

// ---------------------------------------------------------------------------
// Content blocks (string arrays) — referenced by the PDF/DOCX generators.
// Each block keeps medical content reusable, but the APA references at the
// bottom of every artifact are the canonical source list.
// ---------------------------------------------------------------------------

export const deEscalationContent = {
  intro: [
    'Nurses Inc. — De-escalation Playbook',
    'A non-pharmacological first-line response to responsive behaviours in dementia and geriatric mental-health crises.',
    'This playbook is built on the P.I.E.C.E.S.™, U-First!®, and Gentle Persuasive Approaches (GPA) frameworks used across Canadian long-term care. Pharmacological management is a last resort, not a first response.',
  ],
  sections: [
    {
      heading: '1 · Pause & Orient Yourself',
      items: [
        'Lower your voice. Slow your breathing. Your nervous system is contagious.',
        'Stand at or below the person\u2019s eye level; give at least an arm\u2019s length of space.',
        'Remove environmental triggers you can control (noise, glare, clutter, crowding).',
        'Place one hand visible and open — avoid crossed arms, pointing, or sudden movements.',
      ],
    },
    {
      heading: '2 · P.I.E.C.E.S.™ Quick Scan',
      items: [
        'P — Physical: pain, infection, dehydration, constipation, hunger, medication side effect?',
        'I — Intellectual: dementia stage, delirium, depression, language barrier?',
        'E — Emotional: fear, grief, boredom, loneliness, loss of role?',
        'C — Capabilities: vision, hearing, mobility, communication aids available?',
        'E — Environment: lighting, noise, room temperature, recent change in routine?',
        'S — Social: who is nearby, recent visitor, change in caregivers, day vs. evening?',
      ],
    },
    {
      heading: '3 · U-First!® Response',
      items: [
        'U — Understand the behaviour as a response to an unmet need, not a "problem."',
        'F — Flag the behaviour to the team; document in the ABC chart within the shift.',
        'I — Investigate the P.I.E.C.E.S.™ dimensions above before any intervention.',
        'R — Refer to the physician or NP if a physical cause is suspected.',
        'S — Support the person and the team with a person-centred plan.',
      ],
    },
    {
      heading: '4 · Verbal De-escalation Scripts',
      items: [
        '"You seem upset. I want to help. Can you tell me what\u2019s bothering you?"',
        '"I hear you. Let\u2019s sit together for a moment."',
        '"I\u2019m sorry that happened. That would upset me too."',
        'Validate emotion → offer one simple choice → redirect to a familiar activity.',
        'Avoid: arguing, reasoning with delusions, restraining, or saying "calm down."',
      ],
    },
    {
      heading: '5 · ABC Charting Template',
      items: [
        'Antecedent: what happened immediately before (time, place, people, environment)?',
        'Behaviour: what did the person do, exactly? Duration? Intensity (1–10)?',
        'Consequence: what did we do? What calmed them? What did not?',
        'Pattern review at the team huddle every shift for the first 72 hours.',
      ],
    },
    {
      heading: '6 · Pharmacological Last-Resort Decision Tree',
      items: [
        'Document at least two non-pharmacological attempts and their outcomes.',
        'Confirm a physician or NP has ruled out pain, infection, delirium, and metabolic causes.',
        'Use the lowest effective dose of an antipsychotic only when there is imminent risk of harm to self or others.',
        'Set a deprescribing review date at the time of prescription (target ≤3 months).',
        'Obtain informed consent from the substitute decision-maker per NB law.',
      ],
    },
    {
      heading: '7 · After the Episode',
      items: [
        'Debrief with the team within 24 hours — what worked, what didn\u2019t, what we\u2019ll try next.',
        'Update the person\u2019s care plan with the new trigger and successful strategies.',
        'Check in with the resident / patient and the family — not just the chart.',
        'Document the debrief and forward to the Medical Director\u2019s collaborative review.',
      ],
    },
  ],
  references: [
    'Registered Nurses\u2019 Association of Ontario. (2016, supplement 2020). Delirium, dementia, and depression in older adults: Assessment and care (2nd ed.). RNAO Best Practice Guidelines Program. https://rnao.ca/bpg/guidelines/delirium-dementia-and-depression-older-adults-assessment-and-care',
    'Behavioural Supports Ontario / brainXchange. (n.d.). PIECES™ approach to complex continuing care. North Bay Regional Health Centre. https://brainxchange.ca/Public/Topics-A-to-Z/PIECES-Approach',
    'U-First!® Program. (n.d.). U-First!® framework for understanding & responding to behaviour changes. Alzheimer Society of Ontario. https://u-first.ca/',
    'Choosing Wisely Canada & Canadian Geriatrics Society. (2024). Treating disruptive behaviour in people with dementia [Patient pamphlet]. Choosing Wisely Canada. https://choosingwiselycanada.org/pamphlet/treating-disruptive-behaviour-in-people-with-dementia/',
    'Ontario Health (Quality Standards). (2016, reaffirmed). Behavioural symptoms of dementia: Care for patients in hospitals and long-term care homes. https://www.hqontario.ca/Evidence-to-Improve-Care/Quality-Standards/Behavioural-Symptoms-of-Dementia',
    'Antipsychotic Use Coalition. (2024). Setting a national target for appropriate antipsychotic use in Canadian long-term care homes. https://ltcmeds.ca/targets/',
    'Alzheimer\u2019s Disease International. (2024). World Alzheimer Report 2024: Mapping disease-modifying clinical trials for Alzheimer\u2019s disease and other dementias. https://www.alzint.org/what-we-do/research/world-alzheimer-report/',
  ],
};

export const familyKitContent = {
  intro: [
    'Nurses Inc. — Family Care Conference Kit',
    'A facilitator-ready template for holistic, person-centred care-planning meetings.',
    'Use this kit before, during, and after any family care conference — for a new diagnosis, a transition to long-term care, a goals-of-care conversation, or an annual review.',
  ],
  sections: [
    {
      heading: '1 · Pre-Conference Checklist (1–2 weeks before)',
      items: [
        'Confirm who is the legally recognized Substitute Decision-Maker (SDM) in New Brunswick (hierarchy or appointed Power of Attorney for Personal Care).',
        'Invite the SDM first, then the broader care network named by the person.',
        'Send the agenda and the "All About Me" booklet to attendees at least 7 days in advance.',
        'Confirm accessibility needs (hearing, language, transportation, child care, virtual attendance).',
        'Reserve a private, quiet room; plan for 60–90 minutes with no interruptions.',
      ],
    },
    {
      heading: '2 · Agenda Template',
      items: [
        'Welcome, introductions, and ground rules (10 min).',
        'What matters most to the person — read from the "All About Me" booklet (10 min).',
        'Current medical, functional, and social update from the nurse / physician (15 min).',
        'Goals-of-care conversation using the Serious Illness Conversation framework (15 min).',
        'Open discussion, questions, and concerns (20 min).',
        'Action items, decisions, and next steps (10 min).',
        'Close with appreciation and a follow-up plan (5 min).',
      ],
    },
    {
      heading: '3 · Roles in the Room',
      items: [
        'Facilitator: keeps time, holds the agenda, ensures every voice is heard.',
        'Nurse: presents the clinical picture, advocates for the person\u2019s preferences.',
        'Physician / NP: clarifies medical options and prognosis.',
        'SDM: speaks for the person if the person cannot.',
        'Note-taker: captures decisions verbatim and circulates the minutes within 48 hours.',
        'Cultural / language support: engaged proactively, not reactively.',
      ],
    },
    {
      heading: '4 · Goals-of-Care & ACP Prompts',
      items: [
        '"What does a good day look like for you / for the person we love?"',
        '"What are you willing to trade off for more time? And what are you NOT willing to trade off?"',
        '"Are there treatments that would feel worse than the disease itself?"',
        '"Who should make decisions if you / your loved one cannot speak?"',
        '"How do spiritual, cultural, or faith traditions shape the care we should provide?"',
        'Document the resulting wishes in the Advance Care Plan and share with the circle of care.',
      ],
    },
    {
      heading: '5 · Conflict Resolution in the Room',
      items: [
        'Name the tension out loud, gently: "It sounds like we disagree about [X]. That\u2019s okay."',
        'Refocus on the person\u2019s known values, not on the family\u2019s fear.',
        'Use the "best friend test": what would the person tell their best friend if they could?',
        'Offer a pause or a follow-up sub-meeting if emotions run high.',
        'Escalate to the Medical Director or an ethics consult if the disagreement is unresolvable.',
      ],
    },
    {
      heading: '6 · Minutes & Follow-Up',
      items: [
        'Decisions made (with the rationale).',
        'Action items, owner, and due date.',
        'Open questions for the next meeting.',
        'Date, time, and location of the next conference.',
        'Distribute within 48 hours; file in the chart under "Care Conferences."',
      ],
    },
  ],
  references: [
    'Canadian Hospice Palliative Care Association / Advance Care Planning Canada. (n.d.). Advance care planning in Canada: A national framework. https://www.advancecareplanning.ca/acp-basics/',
    'Speak Up / ACP Canada. (n.d.). ACP & the law: Substitute decision-makers across Canada. https://www.advancecareplanning.ca/acp-basics/acp-and-the-law/',
    'Alzheimer Society of Canada. (n.d.). Communicating with people living with dementia / All about me booklet. https://alzheimer.ca/en/help-information/i-have-friend-or-family-member-who-lives-dementia/communicating-people-living',
    'Healthcare Excellence Canada. (2024). Long-term care: Quality and safety resources. https://www.healthcareexcellence.ca/our-programs/long-term-care/',
    'Alzheimer Society of Canada. (2019, updated 2024). Canadian Charter of Rights for People with Dementia. https://alzheimer.ca/en/get-involved/change-minds/canadian-charter-rights-people-dementia',
    'Choosing Wisely Canada. (2024). Serious illness conversations / Time to talk. https://choosingwiselycanada.org/serious-illness-conversations/',
  ],
};