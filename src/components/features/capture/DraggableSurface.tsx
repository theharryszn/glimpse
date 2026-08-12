import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { cn } from "@/shared/utils/classnames";

interface DraggableSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  anchor: { x: number; y: number } | null;
  isVisible: boolean;
}

interface SurfaceBounds {
  minLeft: number;
  maxLeft: number;
  minTop: number;
  maxTop: number;
}

const VIEWPORT_GAP = 10;
const ANCHOR_GAP = 12;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), Math.max(minimum, maximum));
}

function getSurfaceBounds(element: HTMLDivElement): SurfaceBounds {
  const parent = element.offsetParent as HTMLElement | null;

  if (!parent) {
    return {
      minLeft: VIEWPORT_GAP,
      maxLeft: window.innerWidth - element.offsetWidth - VIEWPORT_GAP,
      minTop: VIEWPORT_GAP,
      maxTop: window.innerHeight - element.offsetHeight - VIEWPORT_GAP,
    };
  }

  const parentRect = parent.getBoundingClientRect();
  const visibleLeft = Math.max(0, parentRect.left);
  const visibleRight = Math.min(window.innerWidth, parentRect.right);
  const visibleTop = Math.max(0, parentRect.top);
  const visibleBottom = Math.min(window.innerHeight, parentRect.bottom);

  return {
    minLeft: visibleLeft - parentRect.left + VIEWPORT_GAP,
    maxLeft:
      visibleRight - parentRect.left - element.offsetWidth - VIEWPORT_GAP,
    minTop: visibleTop - parentRect.top + VIEWPORT_GAP,
    maxTop:
      visibleBottom - parentRect.top - element.offsetHeight - VIEWPORT_GAP,
  };
}

function constrain(
  point: { left: number; top: number },
  bounds: SurfaceBounds,
) {
  return {
    left: clamp(point.left, bounds.minLeft, bounds.maxLeft),
    top: clamp(point.top, bounds.minTop, bounds.maxTop),
  };
}

export function DraggableSurface({
  anchor,
  isVisible,
  className,
  children,
  onPointerDown,
  onKeyDown,
  ...props
}: DraggableSurfaceProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ left: number; top: number } | null>(
    null,
  );
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{
    x: number;
    y: number;
    startLeft: number;
    startTop: number;
  } | null>(null);

  useLayoutEffect(() => {
    if (!isVisible) {
      setCoords(null);
      return;
    }

    if (!anchor || !surfaceRef.current) return;

    setCoords((current) => {
      if (current) return current;

      const element = surfaceRef.current;
      if (!element) return null;

      const bounds = getSurfaceBounds(element);
      const left = anchor.x - element.offsetWidth / 2;
      const below = anchor.y + ANCHOR_GAP;
      const above = anchor.y - element.offsetHeight - ANCHOR_GAP;
      const top = below <= bounds.maxTop ? below : above;

      return constrain({ left, top }, bounds);
    });
  }, [anchor, isVisible]);

  useLayoutEffect(() => {
    if (!surfaceRef.current || !anchor) return;
    const current = coords ?? { left: anchor.x, top: anchor.y };
    surfaceRef.current.style.setProperty("--drag-left", `${current.left}px`);
    surfaceRef.current.style.setProperty("--drag-top", `${current.top}px`);
  }, [anchor, coords]);

  useEffect(() => {
    if (!isVisible) return;

    const keepInView = () => {
      const element = surfaceRef.current;
      if (!element) return;
      setCoords((current) =>
        current ? constrain(current, getSurfaceBounds(element)) : current,
      );
    };

    window.addEventListener("resize", keepInView);
    window.addEventListener("scroll", keepInView, true);
    return () => {
      window.removeEventListener("resize", keepInView);
      window.removeEventListener("scroll", keepInView, true);
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || !surfaceRef.current || typeof ResizeObserver === "undefined") {
      return;
    }

    const element = surfaceRef.current;
    const observer = new ResizeObserver(() => {
      setCoords((current) =>
        current ? constrain(current, getSurfaceBounds(element)) : current,
      );
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isDragging) return;

    const move = (event: PointerEvent) => {
      const start = dragStartRef.current;
      const element = surfaceRef.current;
      if (!start || !element) return;

      setCoords(
        constrain(
          {
            left: start.startLeft + event.clientX - start.x,
            top: start.startTop + event.clientY - start.y,
          },
          getSurfaceBounds(element),
        ),
      );
    };

    const end = () => {
      setIsDragging(false);
      dragStartRef.current = null;
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
  }, [isDragging]);

  const start = (event: ReactPointerEvent<HTMLDivElement>) => {
    onPointerDown?.(event);
    if (event.defaultPrevented) return;

    const target = event.target as HTMLElement;
    if (
      !target.closest("[data-drag-handle]") ||
      target.closest("[data-no-drag]") ||
      !coords
    ) {
      return;
    }

    setIsDragging(true);
    dragStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      startLeft: coords.left,
      startTop: coords.top,
    };
    event.preventDefault();
    event.stopPropagation();
  };

  const moveWithKeyboard = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || !coords || !surfaceRef.current) return;

    const target = event.target as HTMLElement;
    if (
      !target.closest("[data-drag-handle]") ||
      target.closest("[data-no-drag]")
    ) {
      return;
    }

    const amount = event.shiftKey ? 10 : 2;
    const deltas: Record<string, { x: number; y: number }> = {
      ArrowLeft: { x: -amount, y: 0 },
      ArrowRight: { x: amount, y: 0 },
      ArrowUp: { x: 0, y: -amount },
      ArrowDown: { x: 0, y: amount },
    };
    const delta = deltas[event.key];
    if (!delta) return;

    setCoords(
      constrain(
        { left: coords.left + delta.x, top: coords.top + delta.y },
        getSurfaceBounds(surfaceRef.current),
      ),
    );
    event.preventDefault();
    event.stopPropagation();
  };

  if (!isVisible || !anchor) return null;

  return (
    <div
      {...props}
      ref={surfaceRef}
      onPointerDown={start}
      onKeyDown={moveWithKeyboard}
      data-dragging={isDragging || undefined}
      className={cn(
        "pointer-events-auto absolute left-[var(--drag-left)] top-[var(--drag-top)]",
        "transition-opacity duration-150 motion-reduce:transition-none",
        coords ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
