import { cn } from "@/shared/utils/classnames";

export type StatusTone = "idle" | "success" | "warning" | "error";

interface StatusIndicatorProps {
  label: string;
  tone?: StatusTone;
  className?: string;
}

const dots: Record<StatusTone, string> = {
  idle: "bg-[#9aa0a6]",
  success: "bg-[#6fca8c]",
  warning: "bg-[#f0c85c]",
  error: "bg-[#f07c73]",
};

export function StatusIndicator({
  label,
  tone = "idle",
  className,
}: StatusIndicatorProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn("size-1.5 shrink-0 rounded-full", dots[tone])}
        aria-hidden
      />
      <span className="text-xs font-medium text-ink-muted">{label}</span>
    </span>
  );
}
