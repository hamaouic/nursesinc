import { useEffect, useRef, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { legal } from '@/nurses-inc-config';

/**
 * Persistent, understated legal badge.
 *
 * Visibility rules (intentionally quiet):
 *  - Shown by default at the bottom of the page on desktop.
 *  - Hides while the user is scrolling (any scroll, any direction).
 *  - Hides when ANY interactive surface is open: accordion card,
 *    popover/drawer, modal, or fullscreen menu (any element with
 *    [data-phipea-hide], or body.has-drawer-open).
 *  - Returns ~600 ms after the user stops scrolling AND no overlay
 *    is open. Re-appears on mousemove near the bottom of the viewport
 *    for instant access.
 *
 * Required by spec on every page.
 */
export default function PhipeaBadge() {
  const [hidden, setHidden] = useState(false);
  const [nearBottom, setNearBottom] = useState(false);
  const hideTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    let scrollEndTimer: number | null = null;

    const onScroll = () => {
      // Any scroll hides the badge immediately.
      setHidden(true);
      if (scrollEndTimer !== null) window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(() => {
        if (!document.body.classList.contains('has-drawer-open') &&
            !document.querySelector('[data-phipea-hide="true"]')) {
          setHidden(false);
        }
      }, 600);
    };

    const onMouseMove = (e: MouseEvent) => {
      // Reveal when the cursor is in the bottom 80 px of the viewport.
      const threshold = window.innerHeight - 80;
      setNearBottom(e.clientY > threshold);
    };

    const onOverlayChange = () => {
      const drawerOpen = document.body.classList.contains('has-drawer-open');
      const anyOverlay = document.querySelector('[data-phipea-hide="true"]');
      if (drawerOpen || anyOverlay) {
        setHidden(true);
      }
    };

    const observer = new MutationObserver(onOverlayChange);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      if (scrollEndTimer !== null) window.clearTimeout(scrollEndTimer);
      observer.disconnect();
    };
  }, []);

  // Custom event: any component can dispatch 'phipea:hide' / 'phipea:show'
  // when an accordion or popover opens / closes. We wire both buttons and
  // modal/drawer toggles to dispatch this on toggle.
  useEffect(() => {
    const onHide = () => {
      setHidden(true);
      if (hideTimeoutRef.current !== null) window.clearTimeout(hideTimeoutRef.current);
    };
    const onShow = () => {
      if (!document.body.classList.contains('has-drawer-open') &&
          !document.querySelector('[data-phipea-hide="true"]')) {
        setHidden(false);
      }
    };
    window.addEventListener('phipea:hide', onHide);
    window.addEventListener('phipea:show', onShow);
    return () => {
      window.removeEventListener('phipea:hide', onHide);
      window.removeEventListener('phipea:show', onShow);
    };
  }, []);

  const shouldShow = !hidden || nearBottom;

  return (
    <div
      className={
        'phipea-badge pointer-events-none fixed inset-x-0 bottom-3 z-40 flex justify-center px-3 transition-opacity duration-200 ' +
        (shouldShow ? 'opacity-100' : 'pointer-events-none opacity-0')
      }
      aria-hidden={!shouldShow}
    >
      <div className="pointer-events-auto flex max-w-3xl items-start gap-3 rounded-2xl border border-white/60 bg-white/70 px-4 py-2 text-[11px] leading-relaxed text-ink-400 shadow-soft backdrop-blur-md sm:text-xs">
        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mint-100">
          <ShieldCheck className="h-3.5 w-3.5 text-ink-500" />
        </span>
        <p className="text-balance">
          <span className="font-semibold text-ink-500">PHIPAA-aligned.</span>{' '}
          {legal.phipea}
        </p>
      </div>
    </div>
  );
}
