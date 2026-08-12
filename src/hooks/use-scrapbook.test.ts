/** @vitest-environment jsdom */
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useScrapbook, type DbResult } from './use-scrapbook';
import { UserScrapbook } from '../shared/types/models';
import { SCRAPBOOK_STORAGE_KEY } from '../shared/utils/scrapbook-storage';

describe('useScrapbook', () => {
  let storedItems: UserScrapbook[];

  beforeEach(() => {
    storedItems = [];
    (globalThis as unknown as { browser: typeof browser }).browser = {
      storage: {
        local: {
          get: vi.fn(async () => ({ [SCRAPBOOK_STORAGE_KEY]: storedItems })),
          set: vi.fn(async (values) => {
            storedItems = values[SCRAPBOOK_STORAGE_KEY] as UserScrapbook[];
          }),
        },
      },
    } as unknown as typeof browser;
  });

  it('should save interaction successfully', async () => {
    const { result } = renderHook(() => useScrapbook());
    
    let response: DbResult<UserScrapbook> | undefined;
    await act(async () => {
      response = await result.current.saveInteraction({
        term: 'Test Term',
        explanation: 'Explanation',
        domainUrl: 'example.com',
      });
    });

    expect(response?.success).toBe(true);
    if (response?.success) {
      expect(response.data.id).toBeDefined();
    }

    expect(storedItems).toHaveLength(1);
    expect(storedItems[0].term).toBe('Test Term');
    expect(storedItems[0].learnedAt).toBeDefined();
  });

  it('should return error if save fails', async () => {
    vi.mocked(browser.storage.local.set).mockRejectedValueOnce(
      new Error('Simulated failure'),
    );
    const { result } = renderHook(() => useScrapbook());

    let response: DbResult<UserScrapbook> | undefined;
    await act(async () => {
      response = await result.current.saveInteraction({
        term: 'Test Term',
        explanation: 'Explanation',
        domainUrl: 'example.com',
      });
    });

    expect(response?.success).toBe(false);
    if (response?.success === false) {
      expect(response.error).toBeDefined();
    }
  });

  it('should delete interaction successfully', async () => {
    const id = 1;
    storedItems = [{
      id,
      term: 'Test Term',
      explanation: 'Explanation',
      domainUrl: 'example.com',
      learnedAt: Date.now(),
    }];

    const { result } = renderHook(() => useScrapbook());
    
    let response: DbResult<void> | undefined;
    await act(async () => {
      response = await result.current.deleteInteraction(id);
    });

    expect(response?.success).toBe(true);

    expect(storedItems).toHaveLength(0);
  });

  it('should archive an interaction without deleting it', async () => {
    const id = 1;
    storedItems = [{
      id,
      term: 'Test Term',
      title: 'A generated conversation title',
      explanation: 'Explanation',
      domainUrl: 'example.com',
      learnedAt: Date.now(),
    }];

    const { result } = renderHook(() => useScrapbook());

    let response: DbResult<void> | undefined;
    await act(async () => {
      response = await result.current.archiveInteraction(id);
    });

    expect(response?.success).toBe(true);
    expect(storedItems[0]?.archivedAt).toBeTypeOf('number');
  });

  it('should return error if delete fails', async () => {
    vi.mocked(browser.storage.local.set).mockRejectedValueOnce(
      new Error('Simulated failure'),
    );
    const { result } = renderHook(() => useScrapbook());

    let response: DbResult<void> | undefined;
    await act(async () => {
      response = await result.current.deleteInteraction(1);
    });

    expect(response?.success).toBe(false);
    if (response?.success === false) {
      expect(response.error).toBeDefined();
    }
  });

  it('should get interaction by term successfully', async () => {
    storedItems = [{
      id: 1,
      term: 'Test Term',
      explanation: 'Explanation',
      domainUrl: 'example.com',
      learnedAt: Date.now(),
    }];

    const { result } = renderHook(() => useScrapbook());
    
    let response: DbResult<UserScrapbook | undefined> | undefined;
    await act(async () => {
      response = await result.current.getInteractionByTerm('test term'); // Case insensitive
    });

    expect(response?.success).toBe(true);
    if (response?.success) {
      expect(response.data?.term).toBe('Test Term');
    }
  });
});
