import {
  CheckCircle,
  CircleNotch,
  DownloadSimple,
  WarningCircle,
} from "@phosphor-icons/react";
import { cn } from "@/shared/utils/classnames";

export type HealthStatusTone =
  | "ready"
  | "checking"
  | "action"
  | "unavailable";

interface HealthStatusRowProps {
  label: string;
  detail: string;
  tone: HealthStatusTone;
}

const toneClasses: Record<HealthStatusTone, string> = {
  ready: "text-[#8bd6a2]",
  checking: "text-accent-strong",
  action: "text-accent-strong",
  unavailable: "text-[#ff9a92]",
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
        : tone === "action"
          ? DownloadSimple
          : CircleNotch;

  return (
    <div className="flex items-start gap-2.5 py-2.5">
      <Icon
        size={16}
        weight="fill"
        className={cn(
          "mt-0.5 shrink-0",
          toneClasses[tone],
          tone === "checking" && "animate-spin motion-reduce:animate-none",
        )}
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
