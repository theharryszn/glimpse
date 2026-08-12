import { ArrowBendDownRight } from "@phosphor-icons/react";
import { useId } from "react";
import { Button } from "@/components/ui/Button";

interface FollowUpSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export function FollowUpSuggestions({
  suggestions,
  onSelect,
}: FollowUpSuggestionsProps) {
  const labelId = useId();
  const availableSuggestions = Array.from(
    new Set(suggestions.map((suggestion) => suggestion.trim()).filter(Boolean)),
  );

  if (availableSuggestions.length === 0) return null;

  return (
    <section className="min-w-0" aria-labelledby={labelId}>
      <p
        id={labelId}
        className="mb-1.5 mt-0 text-[11px] font-medium leading-4 text-ink-muted"
      >
        Suggested follow-ups
      </p>
      <ul className="m-0 flex list-none flex-col gap-1 p-0">
        {availableSuggestions.map((suggestion) => (
          <li key={suggestion} className="min-w-0">
            <Button
              variant="ghost"
              size="sm"
              className="group h-auto w-full min-w-0 justify-start !whitespace-normal !rounded-[var(--radius-md)] !border-transparent !bg-transparent !px-2.5 !py-2 text-left text-xs font-normal normal-case leading-[1.5] text-ink-muted hover:!bg-surface-hover hover:!text-ink focus-visible:ring-offset-surface"
              onClick={() => onSelect(suggestion)}
              aria-label={`Ask follow-up: ${suggestion}`}
            >
              <ArrowBendDownRight
                size={13}
                className="mt-0.5 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
                aria-hidden
              />
              <span className="min-w-0 flex-1 text-pretty [overflow-wrap:anywhere]">
                {suggestion}
              </span>
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}
