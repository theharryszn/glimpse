import { useCallback } from 'react';
import { UserScrapbook } from '../shared/types/models';
import {
  nextScrapbookId,
  readScrapbookItems,
  writeScrapbookItems,
} from '../shared/utils/scrapbook-storage';

export type DbResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

export function useScrapbook() {
  const saveInteraction = useCallback(async (
    interaction: Omit<UserScrapbook, 'id' | 'learnedAt'>
  ): Promise<DbResult<UserScrapbook>> => {
    try {
      const items = await readScrapbookItems();
      const existing = items.find(
        (item) => item.term.localeCompare(interaction.term, undefined, { sensitivity: 'accent' }) === 0,
      );
      
      if (existing && existing.id !== undefined) {
        const updated = {
          ...existing,
          ...interaction,
          title: interaction.title || existing.title,
          archivedAt: undefined,
          learnedAt: Date.now(),
        };
        await writeScrapbookItems(
          items.map((item) => item.id === existing.id ? updated : item),
        );
        return { success: true, data: updated };
      }

      const entry = {
        ...interaction,
        learnedAt: Date.now()
      };
      
      const id = nextScrapbookId(items);
      await writeScrapbookItems([...items, { ...entry, id }]);
      
      return {
        success: true,
        data: {
          ...entry,
          id
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown database error'
      };
    }
  }, []);

  const deleteInteraction = useCallback(async (id: number): Promise<DbResult<void>> => {
    try {
      const items = await readScrapbookItems();
      await writeScrapbookItems(items.filter((item) => item.id !== id));
      return { success: true, data: undefined };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown database error'
      };
    }
  }, []);

  const archiveInteraction = useCallback(async (id: number): Promise<DbResult<void>> => {
    try {
      const items = await readScrapbookItems();
      await writeScrapbookItems(
        items.map((item) =>
          item.id === id ? { ...item, archivedAt: Date.now() } : item,
        ),
      );
      return { success: true, data: undefined };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown database error'
      };
    }
  }, []);

  const getInteractionByTerm = useCallback(async (term: string): Promise<DbResult<UserScrapbook | undefined>> => {
    try {
      const items = await readScrapbookItems();
      const entry = items.find(
        (item) => item.term.localeCompare(term, undefined, { sensitivity: 'accent' }) === 0,
      );
      return { success: true, data: entry };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown database error'
      };
    }
  }, []);

  const updateInteractionTitle = useCallback(async (
    term: string,
    title: string,
  ): Promise<DbResult<void>> => {
    try {
      const items = await readScrapbookItems();
      await writeScrapbookItems(
        items.map((item) =>
          item.term.localeCompare(term, undefined, { sensitivity: 'accent' }) === 0
            ? { ...item, title }
            : item,
        ),
      );
      return { success: true, data: undefined };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown database error',
      };
    }
  }, []);

  return {
    saveInteraction,
    deleteInteraction,
    archiveInteraction,
    getInteractionByTerm,
    updateInteractionTitle,
  };
}
