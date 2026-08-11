import { Button } from "@/components/ui/Button";

interface ResponseActionsProps {
  onExplainFurther?: () => void;
  onAskFollowUp?: () => void;
  onDismiss?: () => void;
}

export function ResponseActions({
  onExplainFurther,
  onAskFollowUp,
  onDismiss,
}: ResponseActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="secondary" size="sm" onClick={onExplainFurther}>
        Explain further
      </Button>
      <Button size="sm" onClick={onAskFollowUp}>
        Ask follow-up
      </Button>
      <Button variant="ghost" size="sm" onClick={onDismiss}>
        Got it
      </Button>
    </div>
  );
}
