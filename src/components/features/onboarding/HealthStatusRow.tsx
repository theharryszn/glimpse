import {
  CheckCircle,
  CircleNotch,
  WarningCircle,
} from "@phosphor-icons/react";
import { cn } from "@/shared/utils/classnames";

export type HealthStatusTone = "ready" | "preparing" | "unavailable";

interface HealthStatusRowProps {
  label: string;
  detail: string;
  tone: HealthStatusTone;
}

const toneClasses: Record<HealthStatusTone, string> = {
  ready: "text-[#287a43]",
  preparing: "text-accent-strong",
  unavailable: "text-[#b3261e]",
};

export function HealthStatusRow({
  label,
  detail,
  tone,
}: HealthStatusRowProps) {
  const Icon =
    tone === "ready"
      ? CheckCircle
      : tone === "unavailable"
        ? WarningCircle
        : CircleNotch;

  return (
    <div className="flex items-start gap-2.5 py-2">
      <Icon
        size={16}
        weight="fill"
        className={cn("mt-0.5 shrink-0", toneClasses[tone])}
        aria-hidden
      />
      <div className="min-w-0">
        <strong className="block text-xs font-medium text-ink">{label}</strong>
        <span className="mt-0.5 block text-[11px] leading-relaxed text-ink-muted">
          {detail}
        </span>
      </div>
    </div>
  );
}
