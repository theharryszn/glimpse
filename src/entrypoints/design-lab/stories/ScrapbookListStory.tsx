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
        <span>
          {items.filter((item) => !item.archivedAt).length} active ·{" "}
          {items.filter((item) => item.archivedAt).length} archived
        </span>
        <button onClick={() => setItems(initialScrapbookItems)}>
          Reset data
        </button>
      </div>
      <ScrapbookList
        simulatedItems={items}
        onSimulatedDelete={(id) =>
          setItems((current) => current.filter((item) => item.id !== id))
        }
        onSimulatedArchive={(id) =>
          setItems((current) =>
            current.map((item) =>
              item.id === id ? { ...item, archivedAt: Date.now() } : item,
            ),
          )
        }
        onSimulatedRestore={(id) =>
          setItems((current) =>
            current.map((item) =>
              item.id === id ? { ...item, archivedAt: undefined } : item,
            ),
          )
        }
        onOpenChat={() => undefined}
      />
    </div>
  );
}
