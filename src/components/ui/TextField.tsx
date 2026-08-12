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
        "h-9 w-full rounded-[var(--radius-md)] border border-hairline bg-surface-inset px-3 py-0 text-[13px] text-ink outline-none transition-[border-color,box-shadow,background-color] duration-150 placeholder:text-ink-muted/75 focus:border-accent focus:bg-surface-raised focus:ring-2 focus:ring-accent-soft focus-visible:outline-none motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});
