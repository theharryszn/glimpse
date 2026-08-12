import { ScrapbookRow } from "@/components/features/scrapbook/ScrapbookRow";
import { initialScrapbookItems } from "../shared/fixtures";
import { useStoredState } from "../shared/useStoredState";

export function ScrapbookRowStory() {
  const [item, setItem] = useStoredState<(typeof initialScrapbookItems)[number] | null>(
    "glimpse-design-lab-scrapbook-row-state",
    initialScrapbookItems[0],
  );

  return (
    <div className="design-lab-row-frame">
      <div className="design-lab-frame-toolbar">
        <span>
          {item
            ? item.archivedAt
              ? "Archived conversation"
              : "Active conversation"
            : "Conversation deleted"}
        </span>
        <button onClick={() => setItem(initialScrapbookItems[0])}>
          Reset row
        </button>
      </div>
      {item ? (
        <ScrapbookRow
          item={item}
          onDelete={() => setItem(null)}
          onArchive={() => setItem({ ...item, archivedAt: Date.now() })}
          onRestore={() => setItem({ ...item, archivedAt: undefined })}
          onOpen={() => undefined}
        />
      ) : (
        <div className="design-lab-empty-state">Entry deleted.</div>
      )}
    </div>
  );
}
