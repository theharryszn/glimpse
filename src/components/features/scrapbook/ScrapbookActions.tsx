import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  Archive,
  ArrowCounterClockwise,
  DotsThreeVertical,
  Trash,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";

interface ScrapbookActionsProps {
  archived?: boolean;
  onArchive: () => void | Promise<void>;
  onRestore?: () => void | Promise<void>;
  onDelete: () => void | Promise<void>;
  disabled?: boolean;
}

type MenuPlacement = "above" | "below";

function getVerticalBoundary(element: HTMLElement) {
  let ancestor = element.parentElement;

  while (ancestor) {
    const styles = window.getComputedStyle(ancestor);
    if (/(auto|scroll|hidden|clip)/.test(`${styles.overflow} ${styles.overflowY}`)) {
      return ancestor.getBoundingClientRect();
    }
    ancestor = ancestor.parentElement;
  }

  return { top: 0, bottom: window.innerHeight };
}

export function ScrapbookActions({
  archived = false,
  onArchive,
  onRestore,
  onDelete,
  disabled = false,
}: ScrapbookActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [placement, setPlacement] = useState<MenuPlacement>("below");
  const menuId = useId();
  const deleteTitleId = useId();
  const deleteDescriptionId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setIsConfirmingDelete(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const frame = requestAnimationFrame(() => {
      const selector = isConfirmingDelete
        ? "[data-confirm-delete]"
        : "[role='menuitem']";
      menuRef.current?.querySelector<HTMLButtonElement>(selector)?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [isConfirmingDelete, isOpen]);

  useLayoutEffect(() => {
    if (!isOpen) return;

    const updatePlacement = () => {
      const root = rootRef.current;
      const menu = menuRef.current;
      if (!root || !menu) return;

      const rootBounds = root.getBoundingClientRect();
      const menuBounds = menu.getBoundingClientRect();
      const boundary = getVerticalBoundary(root);
      const roomAbove = rootBounds.top - boundary.top;
      const roomBelow = boundary.bottom - rootBounds.bottom;
      const nextPlacement =
        roomBelow < menuBounds.height + 8 && roomAbove > roomBelow
          ? "above"
          : "below";
      setPlacement(nextPlacement);
    };

    updatePlacement();
    window.addEventListener("resize", updatePlacement);
    window.addEventListener("scroll", updatePlacement, true);
    return () => {
      window.removeEventListener("resize", updatePlacement);
      window.removeEventListener("scroll", updatePlacement, true);
    };
  }, [isConfirmingDelete, isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
    setIsConfirmingDelete(false);
  };

  const runAction = (action: () => void | Promise<void>) => {
    closeMenu();
    void action();
  };

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;

    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLButtonElement>("[role='menuitem']") ?? [],
    );
    if (items.length === 0) return;

    event.preventDefault();
    const currentIndex = items.indexOf(document.activeElement as HTMLButtonElement);
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? items.length - 1
          : event.key === "ArrowDown"
            ? (currentIndex + 1) % items.length
            : (currentIndex - 1 + items.length) % items.length;
    items[nextIndex]?.focus();
  };

  return (
    <div ref={rootRef} className="relative">
      <Button
        ref={triggerRef}
        variant="icon"
        className="pointer-events-none size-8 translate-x-1 rounded-full p-0 opacity-0 !border-transparent !bg-transparent !text-ink-muted transition-[color,opacity,transform] duration-150 hover:!bg-transparent hover:!text-ink focus-visible:ring-offset-surface group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-x-0 group-focus-within:opacity-100 motion-reduce:transition-none [@media(pointer:coarse)]:pointer-events-auto [@media(pointer:coarse)]:size-10 [@media(pointer:coarse)]:translate-x-0 [@media(pointer:coarse)]:opacity-100"
        onClick={() => {
          setIsConfirmingDelete(false);
          setIsOpen((current) => !current);
        }}
        disabled={disabled}
        aria-label="More conversation actions"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
      >
        <DotsThreeVertical
          className="shrink-0"
          size={18}
          weight="bold"
          aria-hidden
        />
      </Button>

      {isOpen ? (
        <div
          ref={menuRef}
          id={menuId}
          role={isConfirmingDelete ? "dialog" : "menu"}
          aria-labelledby={isConfirmingDelete ? deleteTitleId : undefined}
          aria-describedby={
            isConfirmingDelete ? deleteDescriptionId : undefined
          }
          onKeyDown={isConfirmingDelete ? undefined : handleMenuKeyDown}
          className={`absolute right-0 z-30 w-40 overflow-y-auto overscroll-contain rounded-[var(--radius-lg)] border border-hairline bg-[var(--surface-overlay)] p-1 [box-shadow:var(--shadow-popover)] backdrop-blur-md ${
            placement === "above" ? "bottom-[calc(100%+6px)]" : "top-[calc(100%+6px)]"
          }`}
        >
          {isConfirmingDelete ? (
            <div className="p-2">
              <strong
                id={deleteTitleId}
                className="block text-xs font-medium text-ink"
              >
                Delete this conversation?
              </strong>
              <p
                id={deleteDescriptionId}
                className="mb-3 mt-1 text-[11px] leading-4 text-ink-muted"
              >
                This removes it from this device and can’t be undone.
              </p>
              <div className="flex items-center justify-end gap-1.5">
                <button
                  type="button"
                  className="h-8 cursor-pointer rounded-[var(--radius-sm)] border-0 bg-transparent px-2.5 text-xs font-medium text-ink-muted transition-colors duration-150 hover:bg-surface-hover hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none"
                  onClick={() => setIsConfirmingDelete(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  data-confirm-delete
                  className="h-8 cursor-pointer rounded-[var(--radius-sm)] border-0 bg-red-500/15 px-2.5 text-xs font-medium text-red-300 transition-colors duration-150 hover:bg-red-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 motion-reduce:transition-none"
                  onClick={() => runAction(onDelete)}
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <>
              {archived ? (
                onRestore ? (
                  <button
                    type="button"
                    role="menuitem"
                    className="flex h-8 w-full cursor-pointer items-center gap-2 rounded-[var(--radius-sm)] border-0 bg-transparent px-2 text-left text-xs text-ink transition-colors duration-150 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none"
                    onClick={() => runAction(onRestore)}
                  >
                    <ArrowCounterClockwise
                      className="shrink-0"
                      size={14}
                      aria-hidden
                    />
                    Restore
                  </button>
                ) : null
              ) : (
                <button
                  type="button"
                  role="menuitem"
                  className="flex h-8 w-full cursor-pointer items-center gap-2 rounded-[var(--radius-sm)] border-0 bg-transparent px-2 text-left text-xs text-ink transition-colors duration-150 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none"
                  onClick={() => runAction(onArchive)}
                >
                  <Archive className="shrink-0" size={14} aria-hidden />
                  Archive
                </button>
              )}
              <button
                type="button"
                role="menuitem"
                className="flex h-8 w-full cursor-pointer items-center gap-2 rounded-[var(--radius-sm)] border-0 bg-transparent px-2 text-left text-xs text-red-400 transition-colors duration-150 hover:bg-red-500/10 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 motion-reduce:transition-none"
                onClick={() => setIsConfirmingDelete(true)}
              >
                <Trash className="shrink-0" size={14} aria-hidden />
                Delete
              </button>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
