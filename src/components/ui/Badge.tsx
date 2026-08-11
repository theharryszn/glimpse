import type { HTMLAttributes } from "react";
import { cn } from "@/shared/utils/classnames";

type BadgeTone = "neutral" | "accent" | "success" | "warning" | "error";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const tones: Record<BadgeTone, string> = {
  neutral: "bg-surface-raised text-ink-muted",
  accent: "bg-accent-soft text-accent-strong",
  success: "bg-[#34A853]/12 text-[#237a3b] dark:text-[#7bd890]",
  warning: "bg-[#FBBC04]/15 text-[#8a6500] dark:text-[#ffd866]",
  error: "bg-[#EA4335]/12 text-[#b3261e] dark:text-[#ff8a80]",
};

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.04em]",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
