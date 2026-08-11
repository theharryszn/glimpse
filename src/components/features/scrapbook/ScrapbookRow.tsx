import { UserScrapbook } from '../../../shared/types/models';
import { ScrapbookActions } from './ScrapbookActions';
import { ScrapbookHeader } from './ScrapbookHeader';
import { SourceLink } from './SourceLink';
import './ScrapbookRow.css';

interface ScrapbookRowProps {
  item: UserScrapbook;
  onDelete: (id: number) => void;
  onAskFollowUp: (item: UserScrapbook) => void;
}

export function ScrapbookRow({ item, onDelete, onAskFollowUp }: ScrapbookRowProps) {
  return (
    <article className="scrapbook-row">
      <ScrapbookHeader term={item.term} learnedAt={item.learnedAt} />
      <p className="scrapbook-row-explanation">{item.explanation}</p>
      <footer className="scrapbook-row-footer">
        <SourceLink url={item.domainUrl} />
        <ScrapbookActions
          onAskFollowUp={() => onAskFollowUp(item)}
          onDelete={() => item.id !== undefined && onDelete(item.id)}
          deleteDisabled={item.id === undefined}
        />
      </footer>
    </article>
  );
}
