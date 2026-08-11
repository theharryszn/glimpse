import { ScrapbookActions } from "@/components/features/scrapbook/ScrapbookActions";
import { ScrapbookEmptyState } from "@/components/features/scrapbook/ScrapbookEmptyState";
import { ScrapbookHeader } from "@/components/features/scrapbook/ScrapbookHeader";
import { ScrapbookMetadata } from "@/components/features/scrapbook/ScrapbookMetadata";
import { SourceLink } from "@/components/features/scrapbook/SourceLink";
import { initialScrapbookItems } from "../shared/fixtures";

const item = initialScrapbookItems[0];

export function ScrapbookMetadataStory() {
  return <ScrapbookMetadata learnedAt={item.learnedAt} />;
}

export function ScrapbookHeaderStory() {
  return (
    <div className="w-full max-w-xl">
      <ScrapbookHeader term={item.term} learnedAt={item.learnedAt} />
    </div>
  );
}

export function SourceLinkStory() {
  return <SourceLink url={item.domainUrl} />;
}

export function ScrapbookActionsStory() {
  return (
    <ScrapbookActions
      onAskFollowUp={() => undefined}
      onDelete={() => undefined}
    />
  );
}

export function ScrapbookEmptyStateStory() {
  return (
    <div className="w-full max-w-md rounded-[var(--radius-lg)] border border-hairline bg-surface-raised">
      <ScrapbookEmptyState />
    </div>
  );
}
