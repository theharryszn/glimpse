import type { HTMLAttributes } from "react";
import { cn } from "@/shared/utils/classnames";

type BadgeTone = "neutral" | "accent" | "success" | "warning" | "error";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const tones: Record<BadgeTone, string> = {
  neutral: "bg-surface-hover text-ink-muted",
  accent: "bg-accent-soft text-accent-strong",
  success: "bg-[#34A853]/12 text-[#17652f] dark:text-[#b7f0c5]",
  warning: "bg-[#FBBC04]/15 text-[#6f5100] dark:text-[#ffe89a]",
  error: "bg-[#EA4335]/12 text-[#941e18] dark:text-[#ffb4ad]",
};

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.04em]",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
