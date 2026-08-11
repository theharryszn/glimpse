import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/utils/classnames";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md";
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ size = "md", className, type = "button", ...props }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-grid shrink-0 cursor-pointer place-items-center rounded-full border border-hairline bg-transparent p-0 text-ink-muted transition-colors duration-150 hover:border-accent hover:bg-surface-raised hover:text-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-45",
          size === "sm" ? "h-7 w-7" : "h-8 w-8",
          className,
        )}
        {...props}
      />
    );
  },
);
