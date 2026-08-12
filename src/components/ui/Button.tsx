import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/utils/classnames";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "icon"
  | "iconGhost";
export type ButtonSize = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-ink text-surface hover:opacity-90 focus-visible:ring-accent",
  secondary:
    "border-transparent bg-surface-raised text-ink hover:bg-surface-hover focus-visible:ring-hairline",
  ghost:
    "border-transparent bg-transparent text-ink-muted hover:bg-surface-raised hover:text-ink focus-visible:ring-hairline",
  danger:
    "border-transparent bg-[#ea4335]/10 text-[#ffb4ad] hover:bg-[#ea4335]/16 focus-visible:ring-[#ea4335]",
  icon:
    "shrink-0 border-transparent bg-surface-raised text-ink-muted hover:bg-surface-hover hover:text-ink focus-visible:ring-accent",
  iconGhost:
    "shrink-0 border-transparent bg-transparent text-ink-muted hover:text-ink focus-visible:ring-hairline",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 py-0 text-xs",
  md: "h-9 px-3.5 py-0 text-[13px]",
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
          "inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-full border font-medium tracking-[0.01em] transition-[background-color,border-color,color,opacity,transform] duration-150 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface motion-reduce:transform-none motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-45 disabled:active:translate-y-0",
          variants[variant],
          variant === "icon" || variant === "iconGhost"
            ? size === "sm"
              ? "size-8"
              : "size-9"
            : sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);
