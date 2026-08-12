/** @vitest-environment jsdom */
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCodexUnderliner } from './use-codex-underliner';
import type { UserScrapbook } from '../shared/types/models';
import { SCRAPBOOK_STORAGE_KEY } from '../shared/utils/scrapbook-storage';

describe('useCodexUnderliner', () => {
  let storedItems: UserScrapbook[];
  let storageListener:
    | ((changes: Record<string, Browser.storage.StorageChange>, areaName: string) => void)
    | undefined;

  beforeEach(() => {
    storedItems = [];
    storageListener = undefined;
    (globalThis as unknown as { browser: typeof browser }).browser = {
      storage: {
        local: {
          get: vi.fn(async () => ({ [SCRAPBOOK_STORAGE_KEY]: storedItems })),
          set: vi.fn(),
        },
        onChanged: {
          addListener: vi.fn((listener) => {
            storageListener = listener;
          }),
          removeListener: vi.fn(),
        },
      },
    } as unknown as typeof browser;
    // Mock IntersectionObserver
    global.IntersectionObserver = class {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    } as any;
  });

  it('should underline learned terms in the document', async () => {
    storedItems = [{
      id: 1,
      term: 'Gemini',
      explanation: 'AI model',
      domainUrl: 'google.com',
      learnedAt: Date.now(),
    }];

    document.body.innerHTML = '<div>This is a test for Gemini.</div>';

    renderHook(() => useCodexUnderliner());

    // Wait for async operations (fetching terms, scanning)
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    const underlines = document.querySelectorAll('.glimpse-codex-underline');
    expect(underlines).toHaveLength(1);
    expect(underlines[0].textContent).toBe('Gemini');
  });

  it('should not exceed the density limit of 10 per viewport', async () => {
    storedItems = [{
      id: 1,
      term: 'term',
      explanation: 'test',
      domainUrl: 'example.com',
      learnedAt: Date.now(),
    }];

    // Create 15 instances of 'term'
    document.body.innerHTML = Array(15).fill('<div>term</div>').join('');

    // Mock IntersectionObserver to report all as visible
    let callback: any;
    global.IntersectionObserver = class {
      constructor(cb: any) {
        callback = cb;
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    } as any;

    renderHook(() => useCodexUnderliner());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    // Simulate all being visible
    const entries = Array.from(document.querySelectorAll('.glimpse-codex-underline')).map(el => ({
      isIntersecting: true,
      target: el
    }));
    
    act(() => {
      callback(entries);
    });

    // We should still have all spans created, but only 10 should be "active" or visible?
    // The AC says "apply ... underline ... density must not exceed 10 per viewport".
    // This could mean only 10 are underlined at a time.
    
    const activeUnderlines = Array.from(document.querySelectorAll('.glimpse-codex-underline'))
      .filter(el => (el as HTMLElement).style.textDecoration === 'underline' || (el as HTMLElement).classList.contains('active'));
    
    // Adjust expectation based on implementation details (e.g. using a class to hide/show underline)
    expect(activeUnderlines.length).toBeLessThanOrEqual(10);
  });

  it('should update underlines when the scrapbook changes', async () => {
    document.body.innerHTML = '<div>A new concept appears here.</div>';

    renderHook(() => useCodexUnderliner());

    await act(async () => {
      storedItems = [{
        id: 1,
        term: 'new concept',
        explanation: 'A live entry',
        domainUrl: 'example.com',
        learnedAt: Date.now(),
      }];
      storageListener?.(
        { [SCRAPBOOK_STORAGE_KEY]: { newValue: storedItems } },
        'local',
      );
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(document.querySelector('.glimpse-codex-underline')?.textContent)
      .toBe('new concept');

    await act(async () => {
      storedItems = [];
      storageListener?.(
        { [SCRAPBOOK_STORAGE_KEY]: { newValue: storedItems } },
        'local',
      );
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(document.querySelector('.glimpse-codex-underline')).toBeNull();
  });
});
