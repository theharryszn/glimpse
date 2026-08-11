import { ScrapbookList } from "@/components/features/scrapbook/ScrapbookList";
import type { UserScrapbook } from "@/shared/types/models";
import { initialScrapbookItems } from "../shared/fixtures";
import { useStoredState } from "../shared/useStoredState";

export function ScrapbookListStory() {
  const [items, setItems] = useStoredState<UserScrapbook[]>(
    "glimpse-design-lab-scrapbook-items",
    initialScrapbookItems,
  );

  return (
    <div className="design-lab-scrapbook-frame">
      <div className="design-lab-frame-toolbar">
        <span>{items.length} entries</span>
        <button onClick={() => setItems(initialScrapbookItems)}>
          Reset data
        </button>
      </div>
      <ScrapbookList
        simulatedItems={items}
        onSimulatedDelete={(id) =>
          setItems((current) => current.filter((item) => item.id !== id))
        }
        onOpenChat={() => undefined}
      />
    </div>
  );
}
