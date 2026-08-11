import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { cn } from "@/shared/utils/classnames";

interface DraggableSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  anchor: { x: number; y: number } | null;
  isVisible: boolean;
}

export function DraggableSurface({
  anchor,
  isVisible,
  className,
  children,
  ...props
}: DraggableSurfaceProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ left: number; top: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{
    x: number;
    y: number;
    startLeft: number;
    startTop: number;
  } | null>(null);

  useLayoutEffect(() => {
    if (isVisible && anchor && surfaceRef.current && !coords) {
      const { width } = surfaceRef.current.getBoundingClientRect();
      setCoords({
        left: Math.max(10, anchor.x - width / 2),
        top: anchor.y + 10,
      });
    } else if (!isVisible) {
      setCoords(null);
    }
  }, [anchor, coords, isVisible]);

  useLayoutEffect(() => {
    if (!surfaceRef.current || !anchor) return;
    const current = coords ?? { left: anchor.x, top: anchor.y };
    surfaceRef.current.style.setProperty("--drag-left", `${current.left}px`);
    surfaceRef.current.style.setProperty("--drag-top", `${current.top}px`);
  }, [anchor, coords]);

  useEffect(() => {
    if (!isDragging) return;

    const move = (event: MouseEvent) => {
      if (!dragStartRef.current) return;
      setCoords({
        left: dragStartRef.current.startLeft + event.pageX - dragStartRef.current.x,
        top: dragStartRef.current.startTop + event.pageY - dragStartRef.current.y,
      });
    };
    const end = () => {
      setIsDragging(false);
      dragStartRef.current = null;
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", end);
    };
  }, [isDragging]);

  const start = (event: ReactMouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (!target.closest("[data-drag-handle]") || !coords) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: event.pageX,
      y: event.pageY,
      startLeft: coords.left,
      startTop: coords.top,
    };
    event.stopPropagation();
  };

  if (!isVisible || !anchor) return null;

  return (
    <div
      ref={surfaceRef}
      onMouseDown={start}
      data-dragging={isDragging || undefined}
      className={cn(
        "pointer-events-auto absolute left-[var(--drag-left)] top-[var(--drag-top)]",
        coords ? "opacity-100" : "opacity-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
