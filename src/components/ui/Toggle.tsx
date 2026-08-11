import { cn } from "@/shared/utils/classnames";

interface ToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  className?: string;
}

export function Toggle({
  checked,
  onCheckedChange,
  label,
  disabled = false,
  className,
}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 cursor-pointer rounded-full border-0 p-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-45",
        checked ? "bg-[#34A853]" : "bg-ink-muted/35",
        className,
      )}
    >
      <span
        className={cn(
          "absolute left-[3px] top-[3px] size-[18px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-transform duration-150 motion-reduce:transition-none",
          checked ? "translate-x-5" : "translate-x-0",
        )}
        aria-hidden
      />
    </button>
  );
}
