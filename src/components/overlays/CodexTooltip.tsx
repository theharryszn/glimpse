import * as React from "react";
import { CheckCircle, GlobeSimple } from "@phosphor-icons/react";

interface Props {
  term: string;
  learnedAt: number;
  domainUrl: string;
  position: { x: number; y: number } | null;
}

interface TooltipCoords {
  left: number;
  top: number;
  arrowLeft: number;
  side: "top" | "bottom";
}

const EDGE_GAP = 8;
const ANCHOR_GAP = 10;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), Math.max(minimum, maximum));
}

function formatLearnedAt(timestamp: number) {
  const learned = new Date(timestamp);
  const today = new Date();
  const learnedDay = new Date(
    learned.getFullYear(),
    learned.getMonth(),
    learned.getDate(),
  ).getTime();
  const todayDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  ).getTime();
  const dayDifference = Math.round((todayDay - learnedDay) / 86_400_000);

  if (dayDifference === 0) return "today";
  if (dayDifference === 1) return "yesterday";

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: learned.getFullYear() === today.getFullYear() ? undefined : "numeric",
  }).format(learned);
}

function getDomainLabel(domainUrl: string) {
  try {
    const url = new URL(
      domainUrl.startsWith("http") ? domainUrl : `https://${domainUrl}`,
    );
    return url.hostname.replace(/^www\./, "");
  } catch {
    return domainUrl;
  }
}

export const CodexTooltip: React.FC<Props> = ({
  term,
  learnedAt,
  domainUrl,
  position,
}) => {
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const [coords, setCoords] = React.useState<TooltipCoords | null>(null);

  React.useLayoutEffect(() => {
    if (!position || !tooltipRef.current) {
      setCoords(null);
      return;
    }

    const element = tooltipRef.current;

    const placeTooltip = () => {
      const rect = element.getBoundingClientRect();
      const isFixed = window.getComputedStyle(element).position === "fixed";
      const parent = element.offsetParent as HTMLElement | null;
      const parentWidth = parent?.clientWidth ?? window.innerWidth;
      const parentHeight = parent?.clientHeight ?? window.innerHeight;
      const maxWidth = isFixed ? window.innerWidth : parentWidth;
      const maxHeight = isFixed ? window.innerHeight : parentHeight;
      const left = clamp(
        position.x - rect.width / 2,
        EDGE_GAP,
        maxWidth - rect.width - EDGE_GAP,
      );
      const above = position.y - rect.height - ANCHOR_GAP;
      const below = position.y + ANCHOR_GAP;
      const side = above >= EDGE_GAP ? "top" : "bottom";
      const top = clamp(
        side === "top" ? above : below,
        EDGE_GAP,
        maxHeight - rect.height - EDGE_GAP,
      );

      setCoords({
        left,
        top,
        side,
        arrowLeft: clamp(position.x - left, 14, rect.width - 14),
      });
    };

    placeTooltip();
    window.addEventListener("resize", placeTooltip);
    return () => window.removeEventListener("resize", placeTooltip);
  }, [position]);

  React.useLayoutEffect(() => {
    if (!tooltipRef.current || !coords) return;
    tooltipRef.current.style.setProperty("--tooltip-left", `${coords.left}px`);
    tooltipRef.current.style.setProperty("--tooltip-top", `${coords.top}px`);
    tooltipRef.current.style.setProperty(
      "--tooltip-arrow-left",
      `${coords.arrowLeft}px`,
    );
  }, [coords]);

  if (!position) return null;

  const learnedLabel = formatLearnedAt(learnedAt);
  const domainLabel = getDomainLabel(domainUrl);

  return (
    <div
      ref={tooltipRef}
      role="tooltip"
      data-side={coords?.side}
      className={`codex-tooltip pointer-events-none fixed left-[var(--tooltip-left)] top-[var(--tooltip-top)] z-[1000000] w-max min-w-44 max-w-[min(260px,calc(100vw-16px))] rounded-[var(--radius-md)] border border-hairline bg-[var(--surface-overlay)] px-3 py-2.5 font-body text-[11px] leading-[1.4] text-ink-muted shadow-[var(--shadow-popover)] backdrop-blur-md transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none ${coords ? "translate-y-0 scale-100 opacity-100" : "translate-y-1 scale-[0.98] opacity-0"}`}
    >
      <span
        aria-hidden
        className={`absolute left-[var(--tooltip-arrow-left)] size-2 -translate-x-1/2 rotate-45 border-hairline bg-[var(--surface-overlay)] ${coords?.side === "bottom" ? "-top-1 border-l border-t" : "-bottom-1 border-b border-r"}`}
      />
      <div className="mb-2 line-clamp-2 text-pretty text-xs font-semibold leading-[1.4] text-ink [overflow-wrap:anywhere]">
        {term}
      </div>
      <div className="flex min-w-0 items-center gap-1.5">
        <CheckCircle size={13} weight="fill" className="shrink-0 text-accent" aria-hidden />
        <span>Learned {learnedLabel}</span>
      </div>
      <div className="mt-1 flex min-w-0 items-center gap-1.5">
        <GlobeSimple size={13} className="shrink-0" aria-hidden />
        <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[9px]">
          {domainLabel}
        </span>
      </div>
    </div>
  );
};
