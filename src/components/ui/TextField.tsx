import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/shared/utils/classnames";

export const TextField = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function TextField({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-9 w-full rounded-[var(--radius-md)] border border-hairline bg-surface px-3 py-0 text-sm text-ink outline-none placeholder:text-ink-muted/70 focus:border-accent focus:ring-2 focus:ring-accent-soft disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});
