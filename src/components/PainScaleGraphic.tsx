import { cn } from '@/lib/utils';

/**
 * NRS + Wong-Baker FACES inline reference graphics.
 *
 * The user can tap a number on the NRS bar or a face on the FACES row to
 * record the score. The selected value is highlighted.
 *
 * FACES rendering note: Wong-Baker FACES® is a registered visual scale
 * (Hockenberry, Wilson, & Barrera, 2011). We render a clearly stylized
 * schematic — not the licensed art — labeled "stylized reference" so the
 * nurse has a visual cue without infringing the trademark.
 */

type NrsBarProps = {
  value: number | string | undefined;
  onChange: (value: number) => void;
};

export function NrsBar({ value, onChange }: NrsBarProps) {
  const selected = typeof value === 'string' ? Number(value) : value;
  return (
    <div className="space-y-2 print:space-y-1">
      {/* Title row */}
      <p className="flex items-baseline justify-between text-[10px] font-bold uppercase tracking-widest text-ink-500">
        <span>Numeric Rating Scale (0–10)</span>
        <span className="text-[9px] font-normal normal-case text-ink-400">
          Tap a number
        </span>
      </p>

      {/* The bar — 11 cells, gradient green → yellow → red */}
      <div className="grid grid-cols-11 overflow-hidden rounded-2xl border border-white/70 shadow-soft print:border-ink-300 print:shadow-none">
        {Array.from({ length: 11 }, (_, n) => {
          const isSelected = selected === n;
          // Two-stop gradient: cool → warm
          const gradient = nrsGradient(n);
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              aria-pressed={isSelected}
              aria-label={`NRS ${n} — ${nrsLabel(n)}`}
              className={cn(
                'flex h-14 flex-col items-center justify-center gap-0.5 border-r border-white/40 text-[13px] font-bold transition last:border-r-0 print:h-12 print:text-[12px]',
                isSelected &&
                  'ring-2 ring-ink-700 ring-inset shadow-[0_0_0_2px_rgba(27,39,51,0.6)]',
              )}
              style={{
                background: gradient,
                color: n >= 7 ? '#fff' : '#1B2733',
              }}
            >
              <span className="font-display text-base leading-none">{n}</span>
              <span className="text-[8px] font-semibold uppercase tracking-widest opacity-80">
                {nrsMicro(n)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Anchor labels under bar */}
      <div className="flex items-baseline justify-between text-[10px] text-ink-400">
        <span>No pain</span>
        <span className="hidden sm:inline">Mild</span>
        <span className="hidden sm:inline">Moderate</span>
        <span>Severe</span>
        <span>Worst possible</span>
      </div>

      {/* Severity legend */}
      <div className="grid grid-cols-2 gap-1.5 text-[10.5px] sm:grid-cols-4">
        <Legend tone="bg-mint-100 text-mint-700 ring-mint-200" label="0" note="No pain" />
        <Legend
          tone="bg-mint-50 text-mint-700 ring-mint-200"
          label="1–3"
          note="Mild · reassess in 1 h"
        />
        <Legend
          tone="bg-cream-100 text-ink-700 ring-cream-200"
          label="4–6"
          note="Moderate · notify MD"
        />
        <Legend
          tone="bg-blush-100 text-blush-500 ring-blush-200"
          label="7–10"
          note="Severe · urgent reassess"
        />
      </div>
    </div>
  );
}

function Legend({
  tone,
  label,
  note,
}: {
  tone: string;
  label: string;
  note: string;
}) {
  return (
    <div className={cn('rounded-lg px-2.5 py-1.5 ring-1', tone)}>
      <span className="font-bold">{label}</span>
      <span className="ml-1.5 opacity-80">{note}</span>
    </div>
  );
}

function nrsGradient(n: number): string {
  // 0 mint → 3 yellow → 7 blush
  if (n <= 1) return 'linear-gradient(180deg,#C8E6C9,#B5DEC0)';
  if (n <= 3) return 'linear-gradient(180deg,#E8F5E9,#D4ECD8)';
  if (n <= 5) return 'linear-gradient(180deg,#FFF8E1,#F2E8B6)';
  if (n <= 7) return 'linear-gradient(180deg,#FFE0B2,#FFCDD2)';
  return 'linear-gradient(180deg,#FFAB91,#FF9FB3)';
}

function nrsMicro(n: number): string {
  if (n === 0) return 'none';
  if (n <= 3) return 'mild';
  if (n <= 6) return 'mod';
  return 'severe';
}

function nrsLabel(n: number): string {
  if (n === 0) return 'no pain';
  if (n <= 3) return 'mild';
  if (n <= 6) return 'moderate';
  return 'severe';
}

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Wong-Baker FACES® — stylized reference (NOT the licensed art)              */
/* ──────────────────────────────────────────────────────────────────────────── */

type FacesProps = {
  value: number | string | undefined;
  onChange: (value: number) => void;
};

const FACES: Array<{
  score: number;
  label: string;
  bg: string;
  mouth: MouthKind;
  eyes: EyeKind;
}> = [
  {
    score: 0,
    label: 'No hurt',
    bg: '#D4ECD8',
    mouth: 'flat',
    eyes: 'open',
  },
  {
    score: 2,
    label: 'Hurts little bit',
    bg: '#E8F5E9',
    mouth: 'slight',
    eyes: 'open',
  },
  {
    score: 4,
    label: 'Hurts little more',
    bg: '#FFF8E1',
    mouth: 'small-frown',
    eyes: 'flat',
  },
  {
    score: 6,
    label: 'Hurts even more',
    bg: '#FFE0B2',
    mouth: 'frown',
    eyes: 'squint',
  },
  {
    score: 8,
    label: 'Hurts whole lot',
    bg: '#FFCDD2',
    mouth: 'open-frown',
    eyes: 'wide',
  },
  {
    score: 10,
    label: 'Hurts worst',
    bg: '#FF9FB3',
    mouth: 'big-frown',
    eyes: 'tears',
  },
];

export function WongBakerFaces({ value, onChange }: FacesProps) {
  const selected = typeof value === 'string' ? Number(value) : value;
  return (
    <div className="space-y-2 print:space-y-1">
      {/* Title row */}
      <p className="flex items-baseline justify-between text-[10px] font-bold uppercase tracking-widest text-ink-500">
        <span>Wong-Baker FACES® (stylized reference)</span>
        <span className="text-[9px] font-normal normal-case text-ink-400">
          Tap a face
        </span>
      </p>

      {/* Faces row */}
      <div className="grid grid-cols-6 gap-1.5">
        {FACES.map((f) => {
          const isSelected = selected === f.score;
          return (
            <button
              key={f.score}
              type="button"
              onClick={() => onChange(f.score)}
              aria-pressed={isSelected}
              aria-label={`FACES score ${f.score} — ${f.label}`}
              className={cn(
                'group flex flex-col items-center gap-1.5 rounded-2xl border p-1.5 transition print:p-1',
                isSelected
                  ? 'border-ink-700 bg-white shadow-[0_0_0_2px_rgba(27,39,51,0.7)]'
                  : 'border-white/70 bg-white/80 shadow-soft hover:border-ink-200 hover:shadow-[0_8px_20px_-8px_rgba(27,39,51,0.25)]',
              )}
            >
              <FaceSvg
                bg={f.bg}
                mouth={f.mouth}
                eyes={f.eyes}
                className="h-12 w-12 sm:h-14 sm:w-14"
              />
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest ring-1',
                  isSelected
                    ? 'bg-ink-700 text-white ring-ink-700'
                    : 'bg-white/70 text-ink-500 ring-white/70',
                )}
              >
                {f.score}
              </span>
              <span className="hidden text-[8px] leading-tight text-ink-500 sm:block">
                {f.label}
              </span>
            </button>
          );
        })}
      </div>

      <p className="text-[10px] italic text-ink-400">
        Reference: Hockenberry, Wilson &amp; Barrera (2011). Stylized render —
        not the licensed Wong-Baker FACES® art. Use the official scale when
        available.
      </p>
    </div>
  );
}

/**
 * Schematic circular face — NOT the licensed Wong-Baker FACES art.
 * Renders a face circle + 2 eyes + a mouth based on the props.
 */
function FaceSvg({
  bg,
  mouth,
  eyes,
  className,
}: {
  bg: string;
  mouth: 'flat' | 'slight' | 'small-frown' | 'frown' | 'open-frown' | 'big-frown';
  eyes: 'open' | 'flat' | 'closed' | 'squint' | 'wide' | 'tears';
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-hidden="true"
    >
      {/* Face circle */}
      <circle cx="50" cy="50" r="46" fill={bg} stroke="#1B2733" strokeWidth="2" />
      {/* Eyes */}
      <Eyes kind={eyes} />
      {/* Mouth */}
      <Mouth kind={mouth} />
    </svg>
  );
}

type EyeKind = 'open' | 'flat' | 'closed' | 'squint' | 'wide' | 'tears';
type MouthKind = 'flat' | 'slight' | 'small-frown' | 'frown' | 'open-frown' | 'big-frown';

function Eyes({ kind }: { kind: EyeKind }) {
  switch (kind) {
    case 'flat':
      return (
        <g>
          <line x1="32" y1="42" x2="42" y2="42" stroke="#1B2733" strokeWidth="3" strokeLinecap="round" />
          <line x1="58" y1="42" x2="68" y2="42" stroke="#1B2733" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case 'closed':
      return (
        <g fill="none" stroke="#1B2733" strokeWidth="3" strokeLinecap="round">
          <path d="M32 42 Q37 38 42 42" />
          <path d="M58 42 Q63 38 68 42" />
        </g>
      );
    case 'squint':
      return (
        <g fill="none" stroke="#1B2733" strokeWidth="3" strokeLinecap="round">
          <path d="M32 44 Q37 40 42 44" />
          <path d="M58 44 Q63 40 68 44" />
        </g>
      );
    case 'wide':
      return (
        <g fill="#fff" stroke="#1B2733" strokeWidth="2">
          <circle cx="37" cy="44" r="5" />
          <circle cx="63" cy="44" r="5" />
          <circle cx="37" cy="44" r="1.5" fill="#1B2733" />
          <circle cx="63" cy="44" r="1.5" fill="#1B2733" />
        </g>
      );
    case 'tears':
      return (
        <g>
          <g fill="#fff" stroke="#1B2733" strokeWidth="2">
            <ellipse cx="37" cy="44" rx="5" ry="6" />
            <ellipse cx="63" cy="44" rx="5" ry="6" />
          </g>
          <circle cx="37" cy="44" r="2" fill="#1B2733" />
          <circle cx="63" cy="44" r="2" fill="#1B2733" />
          {/* Tear drops */}
          <path
            d="M30 50 Q28 56 30 60 Q32 56 30 50 Z"
            fill="#7FB1FF"
            stroke="#1B2733"
            strokeWidth="0.8"
          />
          <path
            d="M70 50 Q68 56 70 60 Q72 56 70 50 Z"
            fill="#7FB1FF"
            stroke="#1B2733"
            strokeWidth="0.8"
          />
        </g>
      );
    case 'open':
    default:
      return (
        <g fill="#1B2733">
          <circle cx="37" cy="44" r="3" />
          <circle cx="63" cy="44" r="3" />
        </g>
      );
  }
}

function Mouth({ kind }: { kind: MouthKind }) {
  switch (kind) {
    case 'flat':
      return (
        <line
          x1="38"
          y1="65"
          x2="62"
          y2="65"
          stroke="#1B2733"
          strokeWidth="3"
          strokeLinecap="round"
        />
      );
    case 'slight':
      return (
        <path
          d="M40 64 Q50 67 60 64"
          fill="none"
          stroke="#1B2733"
          strokeWidth="3"
          strokeLinecap="round"
        />
      );
    case 'small-frown':
      return (
        <path
          d="M40 65 Q50 60 60 65"
          fill="none"
          stroke="#1B2733"
          strokeWidth="3"
          strokeLinecap="round"
        />
      );
    case 'frown':
      return (
        <path
          d="M38 62 Q50 70 62 62"
          fill="none"
          stroke="#1B2733"
          strokeWidth="3"
          strokeLinecap="round"
        />
      );
    case 'open-frown':
      return (
        <g fill="#1B2733">
          <ellipse cx="50" cy="68" rx="8" ry="6" />
        </g>
      );
    case 'big-frown':
    default:
      return (
        <g fill="#1B2733">
          <path d="M36 60 Q50 80 64 60 Q60 72 50 74 Q40 72 36 60 Z" />
        </g>
      );
  }
}