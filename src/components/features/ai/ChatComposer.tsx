import type { FormEvent } from "react";
import { ArrowUp } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";

interface ChatComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
}

export function ChatComposer({
  value,
  onChange,
  onSubmit,
  disabled = false,
  autoFocus = false,
  placeholder = "Ask a follow-up...",
}: ChatComposerProps) {
  const hasValue = value.trim().length > 0;
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!disabled && value.trim()) onSubmit();
  };

  return (
    <form
      className="absolute bottom-4 left-4 right-4 z-10"
      onSubmit={handleSubmit}
    >
      <div className="flex items-end gap-2 rounded-[var(--radius-lg)] border border-hairline bg-surface py-1.5 pl-3 pr-1.5 [box-shadow:var(--shadow-popover)] transition-[border-color,box-shadow] duration-150 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent-soft">
        <TextField
          className="h-8 min-h-8 flex-1 !border-0 !bg-transparent px-0 py-0 !shadow-none !outline-none focus:!border-transparent focus:!outline-none focus:!ring-0 focus-visible:!outline-none focus-visible:!ring-0"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          autoFocus={autoFocus}
        />
        <div className="shrink-0">
          <Button
            type="submit"
            variant="icon"
            className={`size-8 rounded-full p-0 active:scale-[0.92] motion-reduce:transform-none ${
              hasValue
                ? "!bg-ink !text-surface"
                : "!bg-surface-raised !text-ink-muted"
            }`}
            disabled={disabled || !hasValue}
            aria-label="Send message"
          >
            <span className="grid size-4 place-items-center" aria-hidden>
              <ArrowUp
                size={15}
                weight="bold"
                className={`transition-transform duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none ${
                  hasValue
                    ? "rotate-[360deg] scale-100"
                    : "rotate-0 scale-90"
                }`}
              />
            </span>
          </Button>
        </div>
      </div>
    </form>
  );
}
