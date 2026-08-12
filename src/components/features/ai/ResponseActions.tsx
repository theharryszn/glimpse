import {
  ArrowsOutSimple,
  ChatCircleDots,
  X,
} from "@phosphor-icons/react";
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
  if (!onExplainFurther && !onAskFollowUp && !onDismiss) return null;

  const actionClassName =
    "!h-8 !rounded-[var(--radius-md)] !border-transparent !bg-transparent !px-2 text-[11px] text-ink-muted hover:!bg-surface-hover hover:!text-ink focus-visible:ring-offset-surface";

  return (
    <div
      className="flex min-w-0 flex-wrap items-center gap-0.5"
      role="group"
      aria-label="Response actions"
    >
      {onExplainFurther && (
        <Button
          variant="ghost"
          size="sm"
          className={actionClassName}
          onClick={onExplainFurther}
        >
          <ArrowsOutSimple size={13} className="shrink-0" aria-hidden />
          Explain further
        </Button>
      )}
      {onAskFollowUp && (
        <Button
          variant="ghost"
          size="sm"
          className={actionClassName}
          onClick={onAskFollowUp}
        >
          <ChatCircleDots size={13} className="shrink-0" aria-hidden />
          Ask follow-up
        </Button>
      )}
      {onDismiss && (
        <Button
          variant="ghost"
          size="sm"
          className={actionClassName}
          onClick={onDismiss}
        >
          <X size={13} className="shrink-0" aria-hidden />
          Close
        </Button>
      )}
    </div>
  );
}
