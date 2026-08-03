import { useRef, useState, type ReactNode, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  className?: string;
  /** Max pixel rotation on hover (default 6) */
  intensity?: number;
  /** Show subtle highlight that follows cursor */
  highlight?: boolean;
};

/**
 * 3D-tilt + cursor-follow highlight wrapper.
 * Inspired by Anime.js / Threlte / Forge micro-interactions.
 * Uses CSS variables for max performance, no per-frame React re-renders.
 */
export default function MouseCard({
  children,
  className,
  intensity = 6,
  highlight = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
    const rotY = (px - 0.5) * intensity * 2;
    const rotX = -(py - 0.5) * intensity * 2;
    setStyle({
      transform: `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(0)`,
      '--mx': `${x}px`,
      '--my': `${y}px`,
    } as CSSProperties);
  };

  const onLeave = () => setStyle({});

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={style}
      className={cn(
        'card-track relative transition-transform duration-300 ease-out',
        highlight && 'group',
        className,
      )}
    >
      {highlight && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(220px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.55), transparent 60%)',
          }}
        />
      )}
      {children}
    </div>
  );
}