import { ChatCircle, Trash } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";

interface ScrapbookActionsProps {
  onAskFollowUp: () => void;
  onDelete: () => void;
  deleteDisabled?: boolean;
}

export function ScrapbookActions({
  onAskFollowUp,
  onDelete,
  deleteDisabled = false,
}: ScrapbookActionsProps) {
  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="sm" onClick={onAskFollowUp}>
        <ChatCircle size={14} aria-hidden />
        Ask follow-up
      </Button>
      <Button
        variant="danger"
        size="sm"
        onClick={onDelete}
        disabled={deleteDisabled}
        aria-label="Delete scrapbook entry"
      >
        <Trash size={14} aria-hidden />
        Delete
      </Button>
    </div>
  );
}
