import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../shared/db/dexie-db';
import { useScrapbook } from '../../../hooks/use-scrapbook';
import { ScrapbookRow } from './ScrapbookRow';
import { ScrapbookEmptyState } from './ScrapbookEmptyState';
import { UserScrapbook } from '../../../shared/types/models';
import { BloomContext } from '../../../shared/types/messaging';
import { getScrapbookTitle } from '../../../shared/utils/chat-title-utils';
import './ScrapbookList.css';

interface Props {
  onOpenChat?: (context: BloomContext) => void;
  simulatedItems?: UserScrapbook[];
  onSimulatedDelete?: (id: number) => void;
  onSimulatedArchive?: (id: number) => void;
}

export function ScrapbookList({
  onOpenChat,
  simulatedItems,
  onSimulatedDelete,
  onSimulatedArchive,
}: Props = {}) {
  const { archiveInteraction, deleteInteraction } = useScrapbook();
  
  const storedItems = useLiveQuery(
    () =>
      db.userScrapbook
        .orderBy('learnedAt')
        .reverse()
        .filter((item) => !item.archivedAt)
        .toArray()
  );
  const items = simulatedItems?.filter((item) => !item.archivedAt) ?? storedItems;

  const handleOpen = (item: UserScrapbook) => {
    if (onOpenChat) {
      onOpenChat({
        term: item.term,
        title: getScrapbookTitle(item),
        explanation: item.explanation,
        metadata: { url: item.domainUrl, title: '', h1s: [] },
        timestamp: item.learnedAt
      });
    }
  };

  const handleArchive = async (id: number) => {
    if (simulatedItems) {
      onSimulatedArchive?.(id);
      return;
    }
    const result = await archiveInteraction(id);
    if (!result.success) {
      alert(`Failed to archive: ${result.error}`);
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

  if (items === undefined) {
    return <div className="loading font-body">Loading scrapbook…</div>;
  }

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
            onArchive={handleArchive}
            onOpen={handleOpen}
          />
        ))
      )}
    </div>
  );
}
