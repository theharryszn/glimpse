import { cn } from "@/shared/utils/classnames";

export type StatusTone = "idle" | "success" | "warning" | "error";

interface StatusIndicatorProps {
  label: string;
  tone?: StatusTone;
  className?: string;
}

const dots: Record<StatusTone, string> = {
  idle: "bg-[#9AA0A6] shadow-[0_0_6px_rgba(154,160,166,0.25)]",
  success: "bg-[#34A853] shadow-[0_0_6px_rgba(52,168,83,0.25)]",
  warning: "bg-[#FBBC04] shadow-[0_0_6px_rgba(251,188,4,0.25)]",
  error: "bg-[#EA4335] shadow-[0_0_6px_rgba(234,67,53,0.25)]",
};

export function StatusIndicator({
  label,
  tone = "idle",
  className,
}: StatusIndicatorProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className={cn("h-2 w-2 shrink-0 rounded-full", dots[tone])} />
      <span className="text-[13px] font-medium">{label}</span>
    </span>
  );
}
