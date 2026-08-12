import { FabPanel } from "@/components/overlays/FabPanel";
import type { UserScrapbook } from "@/shared/types/models";
import { initialScrapbookItems } from "../shared/fixtures";
import { useStoredState } from "../shared/useStoredState";

export function FabPanelStory() {
  const [open, setOpen] = useStoredState(
    "glimpse-design-lab-fab-panel-open",
    true,
  );
  const [items, setItems] = useStoredState<UserScrapbook[]>(
    "glimpse-design-lab-fab-panel-items",
    initialScrapbookItems,
  );

  return (
    <div className="design-lab-fab-panel-frame">
      <div className="design-lab-frame-toolbar">
        <span>Scrapbook and live chat panel</span>
        <button onClick={() => setOpen(!open)}>
          {open ? "Hide panel" : "Show panel"}
        </button>
      </div>
      <FabPanel
        isOpen={open}
        bloomContext={null}
        onCloseChat={() => undefined}
        onClosePanel={() => setOpen(false)}
        simulation={{
          scrapbookItems: items,
          onDelete: (id) =>
            setItems((current) => current.filter((item) => item.id !== id)),
          onArchive: (id) =>
            setItems((current) =>
              current.map((item) =>
                item.id === id ? { ...item, archivedAt: Date.now() } : item,
              ),
            ),
          onRestore: (id) =>
            setItems((current) =>
              current.map((item) =>
                item.id === id ? { ...item, archivedAt: undefined } : item,
              ),
            ),
          chatStoragePrefix: "glimpse-design-lab-panel-live-chat",
        }}
      />
    </div>
  );
}
