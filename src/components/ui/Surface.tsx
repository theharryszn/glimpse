import type { HTMLAttributes } from "react";
import { cn } from "@/shared/utils/classnames";

interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: "flat" | "raised" | "overlay";
}

const elevations = {
  flat: "border border-hairline bg-surface",
  raised: "border border-transparent bg-surface-raised",
  overlay:
    "border border-hairline bg-[var(--surface-overlay)] shadow-[var(--shadow-popover)] backdrop-blur-md",
};

export function Surface({
  elevation = "flat",
  className,
  ...props
}: SurfaceProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] text-ink",
        elevations[elevation],
        className,
      )}
      {...props}
    />
  );
}
