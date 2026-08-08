import type { OrganEntry } from '@/nurses-inc-organs';

/**
 * Nurses Inc. — Organ illustrations.
 *
 * Each illustration is a hand-built SVG component rendered inline.
 * Style: clean line art on a soft tinted backdrop, brand pastels,
 * 96x96 viewBox. Designed to read at 56x56 in the card header.
 *
 * Falls back to a generic organ glyph for entries that don't have
 * a dedicated illustration yet — easy to extend by adding a new
 * branch to the OrganIllustration switch.
 */

type IllustrationProps = {
  className?: string;
  /** Optional brand-tone override. Defaults to currentColor. */
  tint?: string;
};

// Reusable shell: 96×96 viewBox, soft tinted disc, icon inside.
function IllustrationShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="bg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.04" />
        </radialGradient>
      </defs>
      <circle cx="48" cy="48" r="42" fill="url(#bg)" />
      {children}
    </svg>
  );
}

// ============================================================
// CARDIOVASCULAR
// ============================================================
function HeartIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <path
        d="M48 76 C 28 60, 18 50, 18 38 C 18 28, 26 22, 34 22 C 40 22, 46 26, 48 32 C 50 26, 56 22, 62 22 C 70 22, 78 28, 78 38 C 78 50, 68 60, 48 76 Z"
        fill="currentColor"
        fillOpacity="0.85"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Pulse line */}
      <path
        d="M30 50 L 38 50 L 42 42 L 46 58 L 50 46 L 54 54 L 58 50 L 66 50"
        fill="none"
        stroke="white"
        strokeOpacity="0.9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IllustrationShell>
  );
}

function ArteryIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <path
        d="M14 50 C 30 36, 50 64, 66 50 C 74 44, 80 46, 84 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M14 50 C 30 36, 50 64, 66 50 C 74 44, 80 46, 84 50"
        fill="none"
        stroke="white"
        strokeOpacity="0.7"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Branches */}
      <path d="M30 44 L 26 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 56 L 46 64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M70 46 L 76 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </IllustrationShell>
  );
}

function VeinIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <path
        d="M14 50 C 30 64, 50 36, 66 50 C 74 56, 80 54, 84 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M14 50 C 30 64, 50 36, 66 50 C 74 56, 80 54, 84 50"
        fill="none"
        stroke="white"
        strokeOpacity="0.7"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Valves (tiny chevrons) */}
      <path d="M32 52 L 36 56 L 32 60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M52 44 L 56 40 L 52 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M72 52 L 76 56 L 72 60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </IllustrationShell>
  );
}

function CapillaryIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      {/* Larger vessel tapering to capillaries */}
      <path
        d="M14 50 L 36 50"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M36 50 L 60 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M60 50 L 64 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M60 50 L 64 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M60 50 L 64 62" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M64 38 L 84 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M64 50 L 84 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M64 62 L 84 70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* RBC dots */}
      <circle cx="22" cy="50" r="2.5" fill="currentColor" />
      <circle cx="32" cy="50" r="2.2" fill="currentColor" />
      <circle cx="48" cy="50" r="2" fill="currentColor" />
      <circle cx="74" cy="40" r="2" fill="currentColor" />
      <circle cx="74" cy="50" r="2" fill="currentColor" />
      <circle cx="74" cy="60" r="2" fill="currentColor" />
    </IllustrationShell>
  );
}

// ============================================================
// RESPIRATORY
// ============================================================
function LungsIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      {/* Trachea */}
      <path d="M44 14 L 44 30 L 52 30 L 52 14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      {/* Bronchi */}
      <path d="M44 30 L 30 36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M52 30 L 66 36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Lung lobes */}
      <path
        d="M28 36 C 18 38, 14 56, 20 70 C 24 78, 32 78, 36 70 C 38 64, 38 50, 36 40 C 34 36, 32 36, 28 36 Z"
        fill="currentColor"
        fillOpacity="0.55"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M68 36 C 78 38, 82 56, 76 70 C 72 78, 64 78, 60 70 C 58 64, 58 50, 60 40 C 62 36, 64 36, 68 36 Z"
        fill="currentColor"
        fillOpacity="0.55"
        stroke="currentColor"
        strokeWidth="2"
      />
    </IllustrationShell>
  );
}

function BronchiIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <path d="M48 12 L 48 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M48 30 L 28 44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M48 30 L 68 44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M28 44 L 18 64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M28 44 L 32 64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M68 44 L 78 64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M68 44 L 64 64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 64 L 14 78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 64 L 22 78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M78 64 L 82 78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M78 64 L 74 78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </IllustrationShell>
  );
}

function TracheaIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <path d="M42 12 L 42 84" stroke="currentColor" strokeWidth="2.5" />
      <path d="M54 12 L 54 84" stroke="currentColor" strokeWidth="2.5" />
      {/* Cartilage rings */}
      {[18, 28, 38, 48, 58, 68, 78].map((y) => (
        <path
          key={y}
          d={`M40 ${y} Q 48 ${y + 4} 56 ${y}`}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.7"
          strokeWidth="1.5"
        />
      ))}
    </IllustrationShell>
  );
}

function DiaphragmIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <path
        d="M14 38 Q 48 24, 82 38"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M14 38 Q 48 24, 82 38"
        fill="currentColor"
        fillOpacity="0.25"
      />
      <path
        d="M14 56 Q 48 70, 82 56"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      <circle cx="48" cy="40" r="2" fill="currentColor" />
    </IllustrationShell>
  );
}

function AlveoliIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      {/* Cluster of alveoli (grape-like) */}
      {[
        [30, 50], [44, 38], [58, 50], [38, 60], [54, 64], [50, 50],
        [26, 38], [66, 38], [70, 56], [28, 64], [62, 60],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="8"
          fill="currentColor"
          fillOpacity="0.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      ))}
      {/* Capillaries */}
      <path d="M14 50 Q 30 50, 48 50 T 82 50" fill="none" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.5" />
    </IllustrationShell>
  );
}

function LarynxIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <path d="M30 30 Q 48 22, 66 30 L 60 44 L 36 44 Z" fill="currentColor" fillOpacity="0.55" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M48 26 L 48 44" stroke="white" strokeOpacity="0.85" strokeWidth="1.5" />
      <path d="M36 50 L 36 84 M60 50 L 60 84" stroke="currentColor" strokeWidth="2.5" />
      <path d="M36 60 L 60 60 M36 70 L 60 70 M36 80 L 60 80" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
    </IllustrationShell>
  );
}

function PharynxIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <path d="M48 12 L 48 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 32 L 66 32 L 60 44 L 36 44 Z" fill="currentColor" fillOpacity="0.55" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M36 50 L 36 84 M60 50 L 60 84" stroke="currentColor" strokeWidth="2.5" />
    </IllustrationShell>
  );
}

function NoseIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <path d="M30 32 Q 48 14, 66 32 L 64 50 L 56 56 L 48 50 L 40 56 L 32 50 Z" fill="currentColor" fillOpacity="0.55" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M48 50 L 48 70" stroke="currentColor" strokeWidth="2.5" />
      <path d="M36 70 L 60 70 L 56 84 L 40 84 Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </IllustrationShell>
  );
}

// ============================================================
// NERVOUS
// ============================================================
function BrainIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <path
        d="M30 36 C 24 28, 28 18, 38 18 C 42 12, 54 12, 58 18 C 68 18, 72 28, 66 36 C 70 42, 68 52, 60 54 C 56 60, 40 60, 36 54 C 28 52, 26 42, 30 36 Z"
        fill="currentColor"
        fillOpacity="0.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M48 14 L 48 60" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeDasharray="3 2" />
      <path d="M30 32 Q 48 38, 66 32" fill="none" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" />
      <path d="M30 42 Q 48 48, 66 42" fill="none" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" />
      <path d="M48 60 L 48 84" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </IllustrationShell>
  );
}

function SpinalCordIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <rect x="40" y="14" width="16" height="68" rx="4" fill="currentColor" fillOpacity="0.55" stroke="currentColor" strokeWidth="2" />
      {/* Vertebrae */}
      {[20, 32, 44, 56, 68].map((y) => (
        <ellipse key={y} cx="48" cy={y} rx="14" ry="4" fill="none" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.5" />
      ))}
      {/* Spinal nerves */}
      <path d="M40 30 L 24 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M56 42 L 72 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M40 56 L 24 64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </IllustrationShell>
  );
}

function CerebellumIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <ellipse cx="48" cy="48" rx="28" ry="22" fill="currentColor" fillOpacity="0.6" stroke="currentColor" strokeWidth="2" />
      {[
        [36, 40], [44, 38], [52, 38], [60, 40],
        [34, 48], [42, 46], [50, 46], [58, 48], [62, 48],
        [36, 56], [44, 58], [52, 58], [60, 56],
      ].map(([cx, cy], i) => (
        <line key={i} x1={cx} y1={cy - 4} x2={cx} y2={cy + 4} stroke="white" strokeOpacity="0.7" strokeWidth="1.2" />
      ))}
    </IllustrationShell>
  );
}

function BrainstemIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <path d="M28 30 Q 48 22, 68 30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M38 32 L 38 60 Q 48 70, 58 60 L 58 32" fill="currentColor" fillOpacity="0.55" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M44 44 L 52 44 M44 52 L 52 52" stroke="white" strokeOpacity="0.8" strokeWidth="1.5" />
      <path d="M48 62 L 48 84" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </IllustrationShell>
  );
}

function PeripheralNervesIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <rect x="44" y="14" width="8" height="20" rx="2" fill="currentColor" fillOpacity="0.7" />
      <path d="M48 34 L 18 60 L 14 84" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M48 34 L 78 60 L 82 84" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M48 34 L 48 84" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M48 34 L 30 70" fill="none" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.5" />
      <path d="M48 34 L 66 70" fill="none" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.5" />
    </IllustrationShell>
  );
}

// ============================================================
// DIGESTIVE
// ============================================================
function StomachIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <path d="M30 22 L 30 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M30 32 Q 18 44, 26 64 Q 36 80, 56 72 Q 76 60, 70 40 Q 64 30, 54 32 Z" fill="currentColor" fillOpacity="0.6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M70 50 L 86 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </IllustrationShell>
  );
}

function LiverIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <path d="M20 40 Q 24 26, 44 24 Q 64 22, 76 36 Q 80 50, 70 58 Q 50 64, 32 58 Q 18 54, 20 40 Z" fill="currentColor" fillOpacity="0.6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M30 42 L 60 42" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" />
    </IllustrationShell>
  );
}

function SmallIntestineIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <path
        d="M18 22 H 78 V 30 H 18 Z M18 38 H 78 V 46 H 18 Z M18 54 H 78 V 62 H 18 Z M18 70 H 78 V 78 H 18 Z"
        fill="currentColor"
        fillOpacity="0.55"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="86" cy="22" r="4" fill="currentColor" />
    </IllustrationShell>
  );
}

function LargeIntestineIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <path
        d="M48 14 L 48 36 L 30 36 L 30 70 L 60 70 L 60 50 L 78 50 L 78 30 L 60 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IllustrationShell>
  );
}

function EsophagusIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <path d="M44 14 L 44 70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M52 14 L 52 70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {[20, 28, 36, 44, 52, 60, 66].map((y) => (
        <path
          key={y}
          d={`M40 ${y} Q 48 ${y + 4} 56 ${y}`}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.7"
          strokeWidth="1.5"
        />
      ))}
    </IllustrationShell>
  );
}

function PancreasIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <path d="M22 56 Q 28 40, 48 42 Q 70 44, 80 52 Q 78 60, 70 58 Q 50 56, 32 60 Q 22 62, 22 56 Z" fill="currentColor" fillOpacity="0.6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </IllustrationShell>
  );
}

function GallbladderIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <path d="M22 42 Q 26 28, 46 26 Q 64 26, 70 38" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M40 56 Q 38 70, 50 70 Q 58 70, 56 58 Q 54 50, 46 52 Z" fill="currentColor" fillOpacity="0.85" stroke="currentColor" strokeWidth="2" />
    </IllustrationShell>
  );
}

function KidneysIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <path d="M30 30 Q 18 36, 18 56 Q 22 74, 36 76 Q 46 70, 44 56 Q 44 36, 30 30 Z" fill="currentColor" fillOpacity="0.6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M66 30 Q 78 36, 78 56 Q 74 74, 60 76 Q 50 70, 52 56 Q 52 36, 66 30 Z" fill="currentColor" fillOpacity="0.6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="32" cy="54" r="3" fill="white" fillOpacity="0.5" />
      <circle cx="64" cy="54" r="3" fill="white" fillOpacity="0.5" />
    </IllustrationShell>
  );
}

function BladderIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <path d="M22 36 Q 22 28, 36 26 L 60 26 Q 74 28, 74 36 L 74 60 Q 70 80, 48 80 Q 26 80, 22 60 Z" fill="currentColor" fillOpacity="0.55" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="40" cy="48" r="2" fill="currentColor" />
      <circle cx="48" cy="44" r="2" fill="currentColor" />
      <circle cx="56" cy="48" r="2" fill="currentColor" />
    </IllustrationShell>
  );
}

function AppendixIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <path d="M14 30 Q 14 26, 28 26 L 50 26" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M50 26 L 56 24" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M56 24 Q 64 28, 64 36 Q 64 44, 56 46" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </IllustrationShell>
  );
}

function MouthIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <path d="M22 36 Q 48 56, 74 36" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22 36 Q 48 30, 74 36" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {[30, 38, 46, 54, 62].map((x) => (
        <rect key={x} x={x - 2} y="46" width="4" height="6" rx="1" fill="currentColor" />
      ))}
    </IllustrationShell>
  );
}

function SkinIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <path d="M14 28 Q 30 22, 50 28 Q 70 32, 82 28 L 82 84 L 14 84 Z" fill="currentColor" fillOpacity="0.45" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="32" cy="50" r="3" fill="currentColor" fillOpacity="0.7" />
      <circle cx="50" cy="60" r="2.5" fill="currentColor" fillOpacity="0.7" />
      <circle cx="64" cy="48" r="2" fill="currentColor" fillOpacity="0.7" />
      <circle cx="40" cy="70" r="2" fill="currentColor" fillOpacity="0.7" />
    </IllustrationShell>
  );
}

function BonesIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <path d="M20 24 Q 26 12, 34 20 Q 36 26, 32 30 Q 36 50, 30 64 Q 36 74, 30 84 Q 22 84, 22 76 Q 28 66, 24 50 Q 16 36, 20 24 Z" fill="currentColor" fillOpacity="0.6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M76 24 Q 70 12, 62 20 Q 60 26, 64 30 Q 60 50, 66 64 Q 60 74, 66 84 Q 74 84, 74 76 Q 68 66, 72 50 Q 80 36, 76 24 Z" fill="currentColor" fillOpacity="0.6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </IllustrationShell>
  );
}

function EyeIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <ellipse cx="48" cy="48" rx="32" ry="20" fill="currentColor" fillOpacity="0.55" stroke="currentColor" strokeWidth="2" />
      <circle cx="48" cy="48" r="10" fill="white" stroke="currentColor" strokeWidth="2" />
      <circle cx="48" cy="48" r="5" fill="currentColor" />
      <circle cx="50" cy="46" r="1.5" fill="white" />
    </IllustrationShell>
  );
}

function EarIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <path d="M30 28 Q 50 14, 70 32 Q 76 50, 60 60 Q 56 70, 48 70 Q 40 70, 38 60 Q 36 50, 44 50 Q 50 50, 50 42 Q 50 36, 42 36 Q 36 36, 30 28 Z" fill="currentColor" fillOpacity="0.6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </IllustrationShell>
  );
}

function GenericOrganIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationShell className={className}>
      <path
        d="M48 16 Q 24 24, 24 48 Q 24 76, 48 80 Q 72 76, 72 48 Q 72 24, 48 16 Z"
        fill="currentColor"
        fillOpacity="0.55"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M40 44 L 44 50 L 56 38" fill="none" stroke="white" strokeOpacity="0.85" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </IllustrationShell>
  );
}

// ============================================================
// Dispatcher — picks an illustration by organ id.
// ============================================================
export function OrganIllustration({
  id,
  className,
}: {
  id: OrganEntry['id'];
  className?: string;
}) {
  switch (id) {
    case 'heart':
      return <HeartIllustration className={className} />;
    case 'arteries':
      return <ArteryIllustration className={className} />;
    case 'veins':
      return <VeinIllustration className={className} />;
    case 'capillaries':
      return <CapillaryIllustration className={className} />;
    case 'lungs':
      return <LungsIllustration className={className} />;
    case 'bronchi':
      return <BronchiIllustration className={className} />;
    case 'trachea':
      return <TracheaIllustration className={className} />;
    case 'diaphragm':
      return <DiaphragmIllustration className={className} />;
    case 'alveoli':
      return <AlveoliIllustration className={className} />;
    case 'larynx':
      return <LarynxIllustration className={className} />;
    case 'pharynx':
      return <PharynxIllustration className={className} />;
    case 'nose':
      return <NoseIllustration className={className} />;
    case 'brain':
      return <BrainIllustration className={className} />;
    case 'cerebellum':
      return <CerebellumIllustration className={className} />;
    case 'brainstem':
      return <BrainstemIllustration className={className} />;
    case 'spinal-cord':
      return <SpinalCordIllustration className={className} />;
    case 'peripheral-nerves':
      return <PeripheralNervesIllustration className={className} />;
    case 'stomach':
      return <StomachIllustration className={className} />;
    case 'liver':
      return <LiverIllustration className={className} />;
    case 'small-intestine':
      return <SmallIntestineIllustration className={className} />;
    case 'large-intestine':
      return <LargeIntestineIllustration className={className} />;
    case 'esophagus':
      return <EsophagusIllustration className={className} />;
    case 'pancreas':
      return <PancreasIllustration className={className} />;
    case 'gallbladder':
      return <GallbladderIllustration className={className} />;
    case 'appendix':
      return <AppendixIllustration className={className} />;
    case 'mouth':
      return <MouthIllustration className={className} />;
    case 'kidneys':
      return <KidneysIllustration className={className} />;
    case 'bladder':
      return <BladderIllustration className={className} />;
    case 'eyes':
      return <EyeIllustration className={className} />;
    case 'ears':
      return <EarIllustration className={className} />;
    case 'skin':
      return <SkinIllustration className={className} />;
    case 'bones':
      return <BonesIllustration className={className} />;
    default:
      return <GenericOrganIllustration className={className} />;
  }
}
