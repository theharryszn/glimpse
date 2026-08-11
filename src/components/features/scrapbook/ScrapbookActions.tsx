import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { Archive, DotsThreeVertical, Trash } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";

interface ScrapbookActionsProps {
  onArchive: () => void;
  onDelete: () => void;
  disabled?: boolean;
}

export function ScrapbookActions({
  onArchive,
  onDelete,
  disabled = false,
}: ScrapbookActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
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
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    menuRef.current?.querySelector<HTMLButtonElement>("[role='menuitem']")?.focus();
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const runAction = (action: () => void) => {
    setIsOpen(false);
    action();
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
        className="pointer-events-none size-8 translate-x-1 rounded-full p-0 opacity-0 !border-transparent !bg-transparent !text-ink-muted transition-[color,opacity,transform] duration-150 hover:!bg-transparent hover:!text-ink focus-visible:ring-offset-surface group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-x-0 group-focus-within:opacity-100 motion-reduce:transition-none [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:translate-x-0 [@media(hover:none)]:opacity-100"
        onClick={() => setIsOpen((current) => !current)}
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
          role="menu"
          onKeyDown={handleMenuKeyDown}
          className="absolute right-0 top-9 z-30 max-h-56 w-36 overflow-y-auto overscroll-contain rounded-[var(--radius-lg)] border border-hairline bg-[var(--surface-overlay)] p-1 [box-shadow:var(--shadow-popover)] backdrop-blur-md"
        >
          <button
            type="button"
            role="menuitem"
            className="flex h-8 w-full cursor-pointer items-center gap-2 rounded-[var(--radius-sm)] border-0 bg-transparent px-2 text-left text-xs text-ink transition-colors duration-150 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none"
            onClick={() => runAction(onArchive)}
          >
            <Archive className="shrink-0" size={14} aria-hidden />
            Archive
          </button>
          <button
            type="button"
            role="menuitem"
            className="flex h-8 w-full cursor-pointer items-center gap-2 rounded-[var(--radius-sm)] border-0 bg-transparent px-2 text-left text-xs text-red-400 transition-colors duration-150 hover:bg-red-500/10 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 motion-reduce:transition-none"
            onClick={() => runAction(onDelete)}
          >
            <Trash className="shrink-0" size={14} aria-hidden />
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
}
