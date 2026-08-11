import { ScrapbookRow } from "@/components/features/scrapbook/ScrapbookRow";
import { initialScrapbookItems } from "../shared/fixtures";
import { useStoredState } from "../shared/useStoredState";

export function ScrapbookRowStory() {
  const [visible, setVisible] = useStoredState(
    "glimpse-design-lab-scrapbook-row-visible",
    true,
  );
  const item = initialScrapbookItems[0];

  return (
    <div className="design-lab-row-frame">
      <div className="design-lab-frame-toolbar">
        <span>Conversation metadata and actions</span>
        <button onClick={() => setVisible(!visible)}>
          {visible ? "Delete" : "Restore"}
        </button>
      </div>
      {visible ? (
        <ScrapbookRow
          item={item}
          onDelete={() => setVisible(false)}
          onArchive={() => setVisible(false)}
          onOpen={() => undefined}
        />
      ) : (
        <div className="design-lab-empty-state">Entry deleted.</div>
      )}
    </div>
  );
}
