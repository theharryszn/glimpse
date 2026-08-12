import { AiChat } from "@/components/features/ai-chat/AiChat";

export function ChatStory() {
  return (
    <div className="design-lab-chat-frame">
      <AiChat
        onClose={() => undefined}
        autoFocus={false}
        persistenceStorageKey="glimpse-design-lab-standalone-live-chat"
      />
    </div>
  );
}
