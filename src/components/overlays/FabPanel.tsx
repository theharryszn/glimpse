import React from "react";
import { ScrapbookList } from "../features/scrapbook/ScrapbookList";
import { AiChat } from "../features/ai-chat/AiChat";
import { BloomContext } from "../../shared/types/messaging";
import type { UserScrapbook } from "../../shared/types/models";
import { NotePencil, X } from "@phosphor-icons/react";
import { Button } from "../ui/Button";
import { KeyboardShortcut } from "../ui/KeyboardShortcut";

interface SimulationOptions {
  scrapbookItems: UserScrapbook[];
  onDelete: (id: number) => void;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
  chatStoragePrefix?: string;
}

interface Props {
  isOpen: boolean;
  bloomContext: BloomContext | null;
  onCloseChat: () => void;
  onClosePanel?: () => void;
  simulation?: SimulationOptions;
}

function getConversationStorageKey(context: BloomContext | null) {
  const identity = `${context?.term ?? "new"}:${context?.timestamp ?? 0}`;
  let hash = 2166136261;
  for (let index = 0; index < identity.length; index += 1) {
    hash ^= identity.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `glimpse_chat_${(hash >>> 0).toString(36)}`;
}

export const FabPanel: React.FC<Props> = ({
  isOpen,
  bloomContext,
  onCloseChat,
  onClosePanel,
  simulation,
}) => {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = React.useRef<HTMLElement | null>(null);
  const [isManualChatOpen, setIsManualChatOpen] = React.useState(false);
  const [internalContext, setInternalContext] =
    React.useState<BloomContext | null>(null);

  // Auto-open chat if context is provided
  React.useEffect(() => {
    if (bloomContext) {
      setIsManualChatOpen(false);
      setInternalContext(null);
    }
  }, [bloomContext]);

  React.useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const frame = window.requestAnimationFrame(() =>
      panelRef.current?.focus({ preventScroll: true }),
    );
    return () => {
      window.cancelAnimationFrame(frame);
      previouslyFocusedRef.current?.focus?.();
      previouslyFocusedRef.current = null;
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen || !onClosePanel) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClosePanel();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen, onClosePanel]);

  if (!isOpen) return null;

  const activeContext = bloomContext || internalContext;
  const showChat = activeContext !== null || isManualChatOpen;

  const handleCloseChat = () => {
    if (bloomContext) {
      onCloseChat();
    }
    setInternalContext(null);
    setIsManualChatOpen(false);
  };

  return (
    <div
      ref={panelRef}
      role="region"
      aria-label="Glimpse scrapbook"
      tabIndex={-1}
      className="fab-panel pointer-events-auto fixed bottom-[max(24px,env(safe-area-inset-bottom))] right-[max(24px,env(safe-area-inset-right))] z-[2147483646] flex h-[600px] max-h-[calc(100vh-96px)] w-[min(400px,calc(100vw-48px))] flex-col overflow-hidden rounded-[calc(var(--radius-lg)+2px)] border border-hairline bg-[var(--surface-overlay)] font-[var(--font-sans)] outline-none [box-shadow:var(--shadow-popover)] backdrop-blur-md focus-visible:ring-2 focus-visible:ring-accent"
    >
      {showChat ? (
        <div className="flex flex-1 flex-col overflow-hidden">
          <AiChat
            key={`${activeContext?.term ?? "new"}:${activeContext?.timestamp ?? 0}`}
            initialContext={activeContext || undefined}
            onClose={handleCloseChat}
            persistenceStorage={simulation ? "local" : "extension"}
            persistenceStorageKey={simulation
              ? `${simulation.chatStoragePrefix || "glimpse-design-lab-chat"}:${activeContext?.term || "new"}`
              : getConversationStorageKey(activeContext)}
          />
        </div>
      ) : (
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex items-center justify-between border-b border-hairline p-4">
            <div>
              <h2 className="m-0 text-base font-semibold text-ink">
                Glimpse Scrapbook
              </h2>
              <p className="text-caption mb-0 mt-1 text-ink-muted">
                Your local research companion.
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="iconGhost"
                onClick={() => setIsManualChatOpen(true)}
                title="New chat"
                aria-label="New chat"
              >
                <NotePencil size={16} weight="regular" aria-hidden />
              </Button>
              {onClosePanel ? (
                <Button
                  variant="iconGhost"
                  onClick={onClosePanel}
                  title="Close scrapbook"
                  aria-label="Close scrapbook"
                >
                  <X size={16} aria-hidden />
                </Button>
              ) : null}
            </div>
          </header>
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <ScrapbookList
              resultsRegionLabel="Scrapbook panel results"
              onOpenChat={(context) => setInternalContext(context)}
              simulatedItems={simulation?.scrapbookItems}
              onSimulatedDelete={simulation?.onDelete}
              onSimulatedArchive={simulation?.onArchive}
              onSimulatedRestore={simulation?.onRestore}
            />
          </div>
          <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-hairline px-4 py-2.5">
            <span className="text-[11px] text-ink-muted">
              Stored on this device
            </span>
            <KeyboardShortcut
              keys={["Alt / Option", "Shift", "G"]}
              label="Alt or Option plus Shift plus G closes the scrapbook"
            />
          </footer>
        </div>
      )}
    </div>
  );
};
