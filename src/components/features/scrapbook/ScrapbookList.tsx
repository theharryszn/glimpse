import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../shared/db/dexie-db';
import { useScrapbook } from '../../../hooks/use-scrapbook';
import { ScrapbookRow } from './ScrapbookRow';
import { ScrapbookEmptyState } from './ScrapbookEmptyState';
import { UserScrapbook } from '../../../shared/types/models';
import { BloomContext } from '../../../shared/types/messaging';
import './ScrapbookList.css';

interface Props {
  onOpenChat?: (context: BloomContext) => void;
  simulatedItems?: UserScrapbook[];
  onSimulatedDelete?: (id: number) => void;
}

export function ScrapbookList({ onOpenChat, simulatedItems, onSimulatedDelete }: Props = {}) {
  const { deleteInteraction } = useScrapbook();
  
  const storedItems = useLiveQuery(
    () => db.userScrapbook.orderBy('learnedAt').reverse().toArray()
  );
  const items = simulatedItems ?? storedItems;

  const handleAskFollowUp = (item: UserScrapbook) => {
    if (onOpenChat) {
      onOpenChat({
        term: item.term,
        explanation: item.explanation,
        metadata: { url: item.domainUrl, title: '', h1s: [] },
        timestamp: item.learnedAt
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (simulatedItems) {
      onSimulatedDelete?.(id);
      return;
    }
    const result = await deleteInteraction(id);
    if (!result.success) {
      alert(`Failed to delete: ${result.error}`);
    }
  };

  if (items === undefined) return <div className="loading text-serif">Loading Scrapbook...</div>;

  return (
    <div className="scrapbook-list">
      {items.length === 0 ? (
        <ScrapbookEmptyState />
      ) : (
        items.map((item) => (
          <ScrapbookRow 
            key={item.id} 
            item={item} 
            onDelete={handleDelete}
            onAskFollowUp={handleAskFollowUp}
          />
        ))
      )}
    </div>
  );
}
