/**
 * Nurses Inc. — Fillable form schemas (first-pass: Pain Score + Glasgow)
 *
 * Each schema is a typed list of fields. The FillableFormModal component
 * iterates this schema to render the HTML form, and downloads with the
 * captured values passed into the PDF generator.
 *
 * Coordinates are in PDF points (1pt = 1/72 inch). Layout page is 612pt wide
 * × 792pt tall (US Letter at 0.5" margins). The same renderer that draws the
 * blank PDF (src/lib/med-form-pdf.ts) is extended to accept a values map and
 * either:
 *   - draw the value as text on top of the underline (Print / Save-as-flat-PDF)
 *   - draw it as an AcroForm field (Save-as-editable-PDF)
 */

export type FillableFieldKind =
  | 'text'
  | 'textarea'
  | 'number'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'checkbox'
  | 'select';

export type FillableField = {
  /** Stable id — used as the React state key and the AcroForm field name. */
  id: string;
  /** Label shown in the live HTML form. */
  label: string;
  kind: FillableFieldKind;
  /** Hint text shown in the input. */
  placeholder?: string;
  /** Options for select fields. */
  options?: string[];
  /** True if the user must fill it. */
  required?: boolean;
  /** Help text shown below the input. */
  hint?: string;
};

export type FillableSection = {
  /** Optional section heading. */
  heading?: string;
  /** Optional intro paragraph shown above the fields. */
  intro?: string;
  fields: FillableField[];
};

export type FillableFormSchema = {
  formId: 'pain-score' | 'glasgow-coma-scale';
  title: string;
  shortTitle: string;
  /** Display name of the form (for the modal header). */
  displayName: string;
  /** Audience tag line shown at the top of the modal. */
  audience: string;
  /** Intro paragraph shown above the first section. */
  intro: string;
  /** Sections in render order. */
  sections: FillableSection[];
};

export const fillableForms: Record<
  FillableFormSchema['formId'],
  FillableFormSchema
> = {
  'pain-score': {
    formId: 'pain-score',
    title: 'Pain Score Assessment',
    shortTitle: 'Numeric + FACES® scales',
    displayName: 'Pain Score Assessment',
    audience: 'Assessment · Nurses',
    intro:
      'Two validated 0–10 pain scales. NRS for self-reporting adults; Wong-Baker FACES® for non-verbal or paediatric patients. Pain is whatever the patient says it is.',
    sections: [
      {
        heading: '1. Patient & Pain Context',
        fields: [
          { id: 'patient_name', label: 'Patient name', kind: 'text', placeholder: 'Last, First', required: true },
          { id: 'date', label: 'Date of assessment', kind: 'date' },
          { id: 'time', label: 'Time of assessment', kind: 'time' },
          {
            id: 'location',
            label: 'Location of pain (mark all that apply)',
            kind: 'text',
            placeholder: 'e.g. lower back, L flank',
          },
          {
            id: 'onset',
            label: 'Onset (sudden / gradual)',
            kind: 'select',
            options: ['—', 'Sudden', 'Gradual', 'Insidious', 'Unknown'],
          },
          { id: 'aggravating', label: 'Aggravating factors', kind: 'text' },
          { id: 'relieving', label: 'Relieving factors', kind: 'text' },
        ],
      },
      {
        heading: 'Quality of Pain',
        intro: 'Tick all that apply.',
        fields: [
          {
            id: 'quality_sharp',
            label: 'Sharp',
            kind: 'checkbox',
          },
          { id: 'quality_dull', label: 'Dull', kind: 'checkbox' },
          { id: 'quality_burning', label: 'Burning', kind: 'checkbox' },
          { id: 'quality_aching', label: 'Aching', kind: 'checkbox' },
          { id: 'quality_throbbing', label: 'Throbbing', kind: 'checkbox' },
          { id: 'quality_stabbing', label: 'Stabbing', kind: 'checkbox' },
          { id: 'quality_cramping', label: 'Cramping', kind: 'checkbox' },
          { id: 'quality_tingling', label: 'Tingling', kind: 'checkbox' },
        ],
      },
      {
        heading: '2. Numeric Rating Scale (NRS) — Adults',
        intro:
          '0 = no pain · 1–3 mild · 4–6 moderate · 7–10 severe. Reassess after every intervention.',
        fields: [
          {
            id: 'nrs_score',
            label: "Patient's NRS score (0–10)",
            kind: 'number',
            placeholder: '0–10',
            hint: 'In all forms: enter a single number 0–10.',
          },
        ],
      },
      {
        heading: '3. Wong-Baker FACES® — Non-verbal / Paediatric',
        intro:
          'Point to the face that best matches how the patient is feeling.',
        fields: [
          {
            id: 'faces_score',
            label: "Patient's FACES® score",
            kind: 'number',
            placeholder: '0, 2, 4, 6, 8, or 10',
            hint: 'Only the 6 values on the FACES scale are valid.',
          },
        ],
      },
      {
        heading: '4. Reassessments',
        intro:
          'Fill in one row per reassessment. NRS = 0–10. FACES = 0/2/4/6/8/10. Initial each row.',
        fields: [
          // 4 reassessment rows × 7 columns
          ...(['one', 'two', 'three', 'four'] as const).flatMap((row) => [
            {
              id: `r_${row}_date`,
              label: `Reassessment ${row} — date`,
              kind: 'date' as const,
            },
            {
              id: `r_${row}_time`,
              label: `Reassessment ${row} — time`,
              kind: 'time' as const,
            },
            {
              id: `r_${row}_nrs`,
              label: `Reassessment ${row} — NRS`,
              kind: 'number' as const,
              placeholder: '0–10',
            },
            {
              id: `r_${row}_faces`,
              label: `Reassessment ${row} — FACES`,
              kind: 'number' as const,
              placeholder: '0/2/4/6/8/10',
            },
            {
              id: `r_${row}_intervention`,
              label: `Reassessment ${row} — intervention given`,
              kind: 'text' as const,
            },
            {
              id: `r_${row}_response`,
              label: `Reassessment ${row} — response`,
              kind: 'text' as const,
            },
            {
              id: `r_${row}_sig`,
              label: `Reassessment ${row} — nurse initials`,
              kind: 'text' as const,
              placeholder: 'XX',
            },
          ]),
        ],
      },
      {
        heading: 'Sign-off',
        fields: [
          {
            id: 'nurse_sig',
            label: 'Nurse signature & designation',
            kind: 'text',
            placeholder: 'e.g. R. Lee, RN',
          },
          { id: 'sig_date', label: 'Date', kind: 'date' },
        ],
      },
    ],
  },

  'glasgow-coma-scale': {
    formId: 'glasgow-coma-scale',
    title: 'Glasgow Coma Scale (GCS)',
    shortTitle: 'Eye + Verbal + Motor · /15',
    displayName: 'Glasgow Coma Scale',
    audience: 'Assessment · Nurses',
    intro:
      'Quick bedside assessment of consciousness level. Total = Eye (E) + Verbal (V) + Motor (M). Maximum 15. Reassess hourly for any patient with GCS < 13. A drop of 2 or more points is a medical emergency — call rapid response.',
    sections: [
      {
        heading: 'Component Scores',
        intro:
          'Tick the score that best matches the patient for each component.',
        fields: [
          // Eye — rows 4–1
          {
            id: 'eye_score',
            label: 'Eye opening score (1–4)',
            kind: 'select',
            options: ['—', '4 — Spontaneous', '3 — To speech', '2 — To pain', '1 — None'],
            required: true,
          },
          {
            id: 'verbal_score',
            label: 'Verbal response score (1–5)',
            kind: 'select',
            options: [
              '—',
              '5 — Oriented',
              '4 — Confused',
              '3 — Inappropriate',
              '2 — Incomprehensible',
              '1 — None',
            ],
            required: true,
          },
          {
            id: 'motor_score',
            label: 'Motor response score (1–6)',
            kind: 'select',
            options: [
              '—',
              '6 — Obeys commands',
              '5 — Localises pain',
              '4 — Withdraws from pain',
              '3 — Abnormal flexion',
              '2 — Abnormal extension',
              '1 — None',
            ],
            required: true,
          },
          {
            id: 'total_score',
            label: 'GCS total (E + V + M)',
            kind: 'number',
            placeholder: '3–15',
            required: true,
          },
        ],
      },
      {
        heading: 'Severity Band (read off your score)',
        fields: [
          {
            id: 'severity_band',
            label: 'Severity band',
            kind: 'select',
            options: [
              '—',
              '13–15 — Mild brain injury',
              '9–12 — Moderate brain injury',
              '3–8 — Severe brain injury',
            ],
          },
        ],
      },
      {
        heading: 'Pupillary Response (assess with every GCS)',
        fields: [
          {
            id: 'pupil_r_size',
            label: 'Right pupil size (mm)',
            kind: 'number',
            placeholder: '1–8',
          },
          {
            id: 'pupil_r_reaction',
            label: 'Right pupil reaction',
            kind: 'select',
            options: ['—', 'Brisk', 'Sluggish', 'Fixed', 'Not assessed'],
          },
          {
            id: 'pupil_l_size',
            label: 'Left pupil size (mm)',
            kind: 'number',
            placeholder: '1–8',
          },
          {
            id: 'pupil_l_reaction',
            label: 'Left pupil reaction',
            kind: 'select',
            options: ['—', 'Brisk', 'Sluggish', 'Fixed', 'Not assessed'],
          },
        ],
      },
      {
        heading: 'GCS Trend — last 6 readings',
        intro:
          'Fill in one row per reassessment. Initial each row.',
        fields: [
          ...(['one', 'two', 'three', 'four', 'five', 'six'] as const).flatMap(
            (row) => [
              {
                id: `t_${row}_date`,
                label: `Reading ${row} — date`,
                kind: 'date' as const,
              },
              {
                id: `t_${row}_time`,
                label: `Reading ${row} — time`,
                kind: 'time' as const,
              },
              {
                id: `t_${row}_e`,
                label: `Reading ${row} — E`,
                kind: 'number' as const,
                placeholder: '1–4',
              },
              {
                id: `t_${row}_v`,
                label: `Reading ${row} — V`,
                kind: 'number' as const,
                placeholder: '1–5',
              },
              {
                id: `t_${row}_m`,
                label: `Reading ${row} — M`,
                kind: 'number' as const,
                placeholder: '1–6',
              },
              {
                id: `t_${row}_total`,
                label: `Reading ${row} — total`,
                kind: 'number' as const,
                placeholder: '3–15',
              },
              {
                id: `t_${row}_notes`,
                label: `Reading ${row} — notes / intervention`,
                kind: 'text' as const,
              },
              {
                id: `t_${row}_nurse`,
                label: `Reading ${row} — nurse initials`,
                kind: 'text' as const,
                placeholder: 'XX',
              },
            ],
          ),
        ],
      },
      {
        heading: 'Sign-off',
        fields: [
          {
            id: 'nurse_sig',
            label: 'Nurse signature & designation',
            kind: 'text',
            placeholder: 'e.g. R. Lee, RN',
          },
          { id: 'sig_date', label: 'Date / time of assessment', kind: 'datetime-local' as FillableFieldKind },
        ],
      },
    ],
  },
};

/**
 * Type-safe values map. Every entry is `string | boolean | undefined` so
 * a single bag carries text, numbers, dates, and checkboxes.
 */
export type FillableFormValues = Record<string, string | boolean | undefined>;

/** Build a fresh empty values object from a schema. */
export function emptyValuesFor(formId: FillableFormSchema['formId']): FillableFormValues {
  const schema = fillableForms[formId];
  const values: FillableFormValues = {};
  for (const section of schema.sections) {
    for (const field of section.fields) {
      values[field.id] = field.kind === 'checkbox' ? false : '';
    }
  }
  return values;
}