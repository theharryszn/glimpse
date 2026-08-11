import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/utils/classnames";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-accent text-ink hover:bg-accent-strong hover:text-white focus-visible:ring-accent",
  secondary:
    "border-accent bg-transparent text-accent-strong hover:border-accent-strong hover:bg-accent-soft focus-visible:ring-accent",
  ghost:
    "border-transparent bg-transparent text-ink-muted hover:bg-surface-raised hover:text-ink focus-visible:ring-hairline",
  danger:
    "border-transparent bg-transparent text-[#b3261e] hover:bg-[#b3261e]/10 focus-visible:ring-[#b3261e]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-7 px-2.5 py-1 text-[11px]",
  md: "min-h-8 px-3.5 py-1.5 text-xs",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", size = "md", className, type = "button", ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-[var(--radius-md)] border font-medium tracking-[0.01em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);
