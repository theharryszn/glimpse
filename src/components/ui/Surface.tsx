import type { HTMLAttributes } from "react";
import { cn } from "@/shared/utils/classnames";

interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: "flat" | "raised" | "overlay";
}

const elevations = {
  flat: "bg-surface",
  raised: "bg-surface-raised",
  overlay: "bg-[var(--surface-overlay)] shadow-[var(--shadow-popover)] backdrop-blur-sm",
};

export function Surface({
  elevation = "flat",
  className,
  ...props
}: SurfaceProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-hairline text-ink",
        elevations[elevation],
        className,
      )}
      {...props}
    />
  );
}
