import { ArrowBendDownRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";

interface FollowUpSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export function FollowUpSuggestions({
  suggestions,
  onSelect,
}: FollowUpSuggestionsProps) {
  return (
    <div>
      <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.06em] text-ink-muted">
        Follow-ups
      </span>
      <div className="flex flex-col gap-1.5">
        {suggestions.map((suggestion) => (
          <Button
            key={suggestion}
            variant="ghost"
            size="sm"
            className="h-auto min-w-0 justify-start !whitespace-normal !rounded-[var(--radius-md)] !border-transparent !bg-surface-raised px-2.5 py-2 text-left normal-case text-pretty hover:!bg-surface-hover [overflow-wrap:anywhere]"
            onClick={() => onSelect(suggestion)}
          >
            <ArrowBendDownRight size={13} aria-hidden />
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
}
