import React from 'react';

interface Props {
  term: string;
  learnedAt: number;
  domainUrl: string;
  position: { x: number; y: number } | null;
}

export const CodexTooltip: React.FC<Props> = ({ term, learnedAt, domainUrl, position }) => {
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const [coords, setCoords] = React.useState<{ left: number; top: number } | null>(null);

  React.useLayoutEffect(() => {
    if (position && tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      let left = position.x;
      let top = position.y - 12;

      // Horizontal boundary detection
      if (left - rect.width / 2 < 10) {
        left = rect.width / 2 + 10;
      } else if (left + rect.width / 2 > window.innerWidth - 10) {
        left = window.innerWidth - rect.width / 2 - 10;
      }

      // Vertical boundary detection (flip if at top)
      if (top - rect.height < 10) {
        top = position.y + rect.height + 20;
      }

      setCoords({ left, top });
    } else {
      setCoords(null);
    }
  }, [position]);

  React.useLayoutEffect(() => {
    if (!tooltipRef.current || !position) return;
    const current = coords ?? { left: position.x, top: position.y };
    tooltipRef.current.style.setProperty("--tooltip-left", `${current.left}px`);
    tooltipRef.current.style.setProperty("--tooltip-top", `${current.top}px`);
  }, [coords, position]);

  if (!position) return null;

  const date = new Date(learnedAt).toLocaleDateString();
  
  return (
    <div
      ref={tooltipRef}
      className={`codex-tooltip pointer-events-none fixed left-[var(--tooltip-left)] top-[var(--tooltip-top)] z-[1000000] min-w-40 max-w-60 -translate-x-1/2 -translate-y-full rounded-[var(--radius-sm)] border border-hairline border-t-2 border-t-accent bg-[var(--surface-overlay)] px-3 py-2 font-[var(--font-sans)] text-[11px] leading-[1.4] text-ink-muted shadow-[var(--shadow-popover)] backdrop-blur-sm transition-[opacity,transform] duration-200 ease-in-out ${coords ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
    >
      <div className="mb-0.5 text-xs font-semibold text-ink">{term}</div>
      <div>Learned on {date}</div>
      <div className="mt-0.5 overflow-hidden text-ellipsis whitespace-nowrap italic">
        Source: {domainUrl}
      </div>
    </div>
  );
};
