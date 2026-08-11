import { FollowUpSuggestions } from "@/components/features/ai/FollowUpSuggestions";
import { ResponseActions } from "@/components/features/ai/ResponseActions";

export function ChatActionsStory() {
  return (
    <div className="flex min-h-[340px] flex-col items-center justify-center gap-8 p-10">
      <ResponseActions />
      <div className="w-full max-w-md border-t border-hairline pt-6">
        <FollowUpSuggestions
          suggestions={[
            "How does this differ from summarization?",
            "Give me an example from this passage",
          ]}
          onSelect={() => undefined}
        />
      </div>
    </div>
  );
}
