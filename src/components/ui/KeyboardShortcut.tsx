import { cn } from "@/shared/utils/classnames";

interface KeyboardShortcutProps {
  keys: string[];
  label?: string;
  className?: string;
}

export function KeyboardShortcut({
  keys,
  label = keys.join(" plus "),
  className,
}: KeyboardShortcutProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-1", className)}
    >
      <span className="sr-only">{label}</span>
      {keys.map((key) => (
        <kbd
          key={key}
          className="inline-grid min-w-6 place-items-center rounded-[5px] border border-hairline bg-surface-inset px-1.5 py-1 font-mono text-[10px] font-medium leading-none text-ink-muted shadow-[0_1px_0_rgba(255,255,255,0.04)]"
          aria-hidden
        >
          {key}
        </kbd>
      ))}
    </span>
  );
}
