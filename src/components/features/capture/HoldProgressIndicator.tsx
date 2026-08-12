import { useLayoutEffect, useRef } from "react";

interface HoldProgressIndicatorProps {
  position: { x: number; y: number } | null;
}

export function HoldProgressIndicator({ position }: HoldProgressIndicatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !position) return;
    containerRef.current.style.setProperty("--hold-left", `${position.x}px`);
    containerRef.current.style.setProperty("--hold-top", `${position.y}px`);
  }, [position]);

  if (!position) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute left-[var(--hold-left)] top-[var(--hold-top)] z-[1000000] h-0 w-0 font-body text-ink"
      role="status"
      aria-live="polite"
      aria-label="Keep holding still for 1.5 seconds"
    >
      <div
        className="pulse-ring -ml-5 -mt-5 h-10 w-10 border-accent/70 [animation-duration:1.5s]"
        aria-hidden
      />
      <div
        className="pulse-ring -ml-3 -mt-3 h-6 w-6 border-accent/60 [animation-delay:0.45s] [animation-duration:1.5s]"
        aria-hidden
      />
      <div
        className="absolute -left-2 -top-2 flex size-4 items-center justify-center rounded-full border border-accent/60 bg-[var(--surface-overlay)] shadow-[0_2px_8px_rgba(0,0,0,0.18)]"
        aria-hidden
      >
        <span className="size-1.5 rounded-full bg-accent shadow-[0_0_0_3px_var(--accent-gold-soft)]" />
      </div>
      <div className="absolute left-1/2 top-5 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-md border border-hairline bg-[var(--surface-overlay)] px-2 py-1.5 text-[10px] font-medium leading-none shadow-[var(--shadow-popover)] backdrop-blur-md motion-reduce:transition-none">
        <span>Hold still</span>
        <span className="font-mono text-[9px] text-ink-muted">1.5 sec</span>
      </div>
    </div>
  );
}
