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
      <div className="flex flex-col">
        {suggestions.map((suggestion) => (
          <Button
            key={suggestion}
            variant="ghost"
            size="sm"
            className="justify-start rounded-none border-b border-hairline px-0 text-left normal-case"
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
