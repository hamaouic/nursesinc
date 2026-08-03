/**
 * Nurses Inc. — Centralized configuration
 *
 * Edit prices, copy, services, and team bios HERE without touching layout.
 * Currency is CAD. Rates are calibrated for NB independent practice overhead.
 */

export const brand = {
  name: 'Nurses Inc.',
  shortName: 'Nurses Inc.',
  tagline: 'Expert Nursing Care, Rooted in Heart & Mind',
  location: 'New Brunswick, Canada',
  email: 'hello@nursesinc.ca',
  phone: '+1 (613) 315-5040',
  founded: 2016,
};

export const legal = {
  phipea:
    'Nurses Inc. operations are completely aligned with the New Brunswick Personal Health Information Privacy and Access Act (PHIPAA). Independent Nursing services are managed in strict adherence to ANBLPN Collaborative Practice Regulations.',
  regulatoryBadge: 'Physician-Backed, Fully Regulated Practice',
};

export type Service = {
  id: string;
  title: string;
  rate: string;
  unit: string;
  description: string;
  bullets?: string[];
  icon: string; // lucide-react icon name
  accent: 'blush' | 'mint';
};

export const services: { b2c: Service[]; b2b: Service[] } = {
  b2c: [
    {
      id: 'discovery-call',
      title: 'Discovery Call',
      rate: 'FREE',
      unit: '15-min video orientation',
      description:
        'A brief, no-pressure video chat to learn about your situation, answer questions, and see if we are a good fit.',
      icon: 'PhoneCall',
      accent: 'mint',
    },
    {
      id: 'virtual-behavioral-mapping',
      title: 'Virtual Behavioral Mapping & Coaching',
      rate: '$65.00',
      unit: '/ hour',
      description:
        'Evaluating dementia triggers and non-pharmacological adjustments remotely, with practical strategies for your home environment.',
      icon: 'Brain',
      accent: 'blush',
    },
    {
      id: 'remote-caregiver-checkins',
      title: 'Remote Caregiver Mental Health Check-ins',
      rate: '$60.00',
      unit: '/ hour',
      description:
        'Compassionate, confidential support for families walking through high-stress caregiving moments.',
      icon: 'HeartHandshake',
      accent: 'mint',
    },
    {
      id: 'medication-compliance',
      title: 'Medication Compliance Audits',
      rate: '$70.00',
      unit: '/ hour',
      description:
        'Hands-on blister pack and counting evaluations, completed under physician oversight for safety and accuracy.',
      icon: 'Pill',
      accent: 'blush',
    },
    {
      id: 'ltc-navigation',
      title: 'Long-Term Care Navigation & Placement Prep',
      rate: '$75.00',
      unit: '/ hour',
      description:
        'Step-by-step guidance and provincial Social Development application organization for families considering LTC placement.',
      icon: 'Compass',
      accent: 'mint',
    },
    {
      id: 'family-care-conferences',
      title: 'In-Person Family Care Conferences',
      rate: '$85.00',
      unit: '/ hour',
      description:
        'Holistic care blueprint meetings with the extended care network, facilitated in person for clarity and alignment.',
      icon: 'Users',
      accent: 'blush',
    },
    {
      id: 'cognitive-safety-audits',
      title: 'Cognitive & Environmental Safety Audits',
      rate: '$90.00',
      unit: '/ flat assessment',
      description:
        'A comprehensive walkthrough of structural and cognitive safety risks, with a written action plan for your home.',
      icon: 'ShieldCheck',
      accent: 'mint',
    },
  ],
  b2b: [
    {
      id: 'responsive-behavior-mapping',
      title: 'Responsive Behavior Care Mapping & Auditing',
      rate: '$85.00',
      unit: '/ hour',
      description:
        'Restructuring custom de-escalation files for high-acuity residents, aligned with current best practices.',
      icon: 'ClipboardList',
      accent: 'mint',
    },
    {
      id: 'admission-screenings',
      title: 'New Admission Mental Health Screenings',
      rate: '$80.00',
      unit: '/ hour',
      description:
        'Managing the heavy documentation lift for facility DOCs, with thorough behavioral and mental-health baselines.',
      icon: 'FileSearch',
      accent: 'blush',
    },
    {
      id: 'phipea-compliance',
      title: 'PHIPAA & Documentation Compliance Audits',
      rate: '$90.00',
      unit: '/ hour',
      description:
        'Risk management file auditing to prevent inspection infractions under the New Brunswick PHIPAA standard.',
      icon: 'Lock',
      accent: 'mint',
    },
    {
      id: 'psychotropic-reviews',
      title: 'Psychotropic Medication Reviews',
      rate: '$85.00',
      unit: '/ hour',
      description:
        'Tracking PRN anti-psychotic use patterns and assembling charts for faster physician review.',
      icon: 'Activity',
      accent: 'blush',
    },
    {
      id: 'staff-mentorship',
      title: 'Frontline Staff Behavior Management Mentorship',
      rate: '$95.00',
      unit: '/ hour',
      description:
        'Direct shift-coaching for PCAs and floor staff on dementia redirection, de-escalation, and trauma-informed care.',
      icon: 'GraduationCap',
      accent: 'mint',
    },
  ],
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  highlights: string[];
  accent: 'blush' | 'mint';
  initials: string;
};

export const team: TeamMember[] = [
  {
    name: 'Catherine Hamaoui',
    role: 'Founding Nurse Practitioner',
    initials: 'CH',
    accent: 'blush',
    bio:
      'A New Brunswick LPN with over 10 years of trusted bedside and community experience specializing in geriatrics, dementia, and late-life mental health. Known for translating complex care plans into calm, family-friendly routines.',
    highlights: [
      '10+ years in geriatric & dementia care',
      'Trained in non-pharmacological redirection',
      'Family-education-first approach',
    ],
  },
  {
    name: 'Medical Director',
    role: 'Partner Physician',
    initials: 'MD',
    accent: 'mint',
    bio:
      'Our collaborating physician anchors the practice under the New Brunswick LPN Act, providing chart review, clinical oversight, and a regulated referral pathway for every service we deliver.',
    highlights: [
      'Formal ANBLPN collaborative agreement',
      'Chart review & clinical oversight',
      'New Brunswick PHIPAA-compliant records',
    ],
  },
];

export type KnowledgePath = {
  id: 'dementia' | 'mental-health' | 'geriatric';
  label: string;
  short: string;
  description: string;
  theme: 'blush' | 'mint' | 'cream';
  facts: { title: string; body: string }[];
};

export const knowledgePaths: KnowledgePath[] = [
  {
    id: 'dementia',
    label: 'Dementia Insights',
    short: 'Understanding the journey',
    description:
      'Honest, practical information for families facing a new dementia diagnosis — from early signs to compassionate redirection.',
    theme: 'blush',
    facts: [
      {
        title: 'It starts with environment',
        body: 'Up to 60% of responsive behaviors are triggered by lighting, noise, or routine — not the disease itself.',
      },
      {
        title: 'Redirection over correction',
        body: 'Asking a loved one to “remember” rarely helps. Matching their reality is kinder and more effective.',
      },
      {
        title: 'Sleep is medicine',
        body: 'A consistent sundown routine reduces evening agitation more reliably than most medications.',
      },
    ],
  },
  {
    id: 'mental-health',
    label: 'Late-Life Mental Health',
    short: 'Mood, anxiety, grief',
    description:
      'Depression and anxiety in older adults are common and treatable — but look different than in younger years.',
    theme: 'mint',
    facts: [
      {
        title: 'Loss of interest is the biggest tell',
        body: 'In seniors, depression often shows up as withdrawal from hobbies rather than overt sadness.',
      },
      {
        title: 'Grief needs a seat at the table',
        body: 'Bereavement, role loss, and chronic illness reshape identity — and they need explicit, ongoing support.',
      },
      {
        title: 'Medication is only one tool',
        body: 'Talk therapy, routine, and gentle exercise are equally evidence-based for late-life mood.',
      },
    ],
  },
  {
    id: 'geriatric',
    label: 'Geriatric Wellness',
    short: 'Aging well at home',
    description:
      'Small, sustainable changes keep older adults safe, mobile, and connected at home for longer.',
    theme: 'cream',
    facts: [
      {
        title: 'Falls are predictable',
        body: 'Most falls have two or more contributing factors — and most are preventable with simple home audits.',
      },
      {
        title: 'Polypharmacy is a diagnosis',
        body: 'Reviewing medications annually with a clinician is the single highest-yield wellness visit for older adults.',
      },
      {
        title: 'Social connection is clinical',
        body: 'Loneliness carries the same mortality risk as smoking 15 cigarettes a day.',
      },
    ],
  },
];