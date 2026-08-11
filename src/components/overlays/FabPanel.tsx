import React from "react";
import { ScrapbookList } from "../features/scrapbook/ScrapbookList";
import { AiChat } from "../features/ai-chat/AiChat";
import { BloomContext } from "../../shared/types/messaging";
import type { UserScrapbook } from "../../shared/types/models";
import { NotePencil } from "@phosphor-icons/react";
import { Button } from "../ui/Button";

interface SimulationOptions {
  scrapbookItems: UserScrapbook[];
  onDelete: (id: number) => void;
  chatStoragePrefix?: string;
}

interface Props {
  isOpen: boolean;
  bloomContext: BloomContext | null;
  onCloseChat: () => void;
  simulation?: SimulationOptions;
}

export const FabPanel: React.FC<Props> = ({
  isOpen,
  bloomContext,
  onCloseChat,
  simulation,
}) => {
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
    <div className="fab-panel pointer-events-auto fixed bottom-24 right-6 z-[2147483646] flex h-[600px] max-h-[calc(100vh-120px)] w-[400px] flex-col overflow-hidden rounded-xl border border-hairline bg-surface font-[var(--font-sans)] shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
      {showChat ? (
        <div className="flex flex-1 flex-col overflow-hidden">
          <AiChat
            initialContext={activeContext || undefined}
            onClose={handleCloseChat}
            persistenceStorageKey={
              simulation
                ? `${simulation.chatStoragePrefix || "glimpse-design-lab-chat"}:${activeContext?.term || "new"}`
                : undefined
            }
          />
        </div>
      ) : (
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex items-center justify-between border-b border-hairline p-4">
            <div>
              <h1 className="m-0 text-lg font-semibold text-ink">
                Glimpse Scrapbook
              </h1>
              <p className="text-caption mb-0 mt-1 text-ink-muted">
                Your local research companion.
              </p>
            </div>
            <Button
              variant="icon"
              onClick={() => setIsManualChatOpen(true)}
              title="New Chat"
              aria-label="New Chat"
            >
              <NotePencil size={16} weight="regular" aria-hidden />
            </Button>
          </header>
          <main className="flex-1 overflow-y-auto">
            <ScrapbookList
              onOpenChat={(context) => setInternalContext(context)}
              simulatedItems={simulation?.scrapbookItems}
              onSimulatedDelete={simulation?.onDelete}
            />
          </main>
        </div>
      )}
    </div>
  );
};
