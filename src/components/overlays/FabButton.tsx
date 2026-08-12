import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';

interface Props {
  isOpen: boolean;
  onClick: () => void;
}

export const FabButton: React.FC<Props> = ({ isOpen, onClick }) => {
  // Default position: bottom right
  const [coords, setCoords] = useState<{ left: number; top: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number, y: number, startLeft: number, startTop: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hasDraggedRef = useRef(false);

  // Initialize position to bottom right once mounted
  useEffect(() => {
    if (!coords && buttonRef.current) {
      const padding = 24;
      setCoords({
        left: window.innerWidth - 100 - padding, // Approx width of pill
        top: window.innerHeight - 44 - padding // Approx height of pill
      });
    }
  }, [coords]);

  useLayoutEffect(() => {
    if (!buttonRef.current || !coords) return;
    buttonRef.current.style.setProperty('--fab-left', `${coords.left}px`);
    buttonRef.current.style.setProperty('--fab-top', `${coords.top}px`);
  }, [coords]);

  useEffect(() => {
    if (!isDragging) return;

    const handleDragMove = (e: MouseEvent) => {
      if (!dragStartRef.current) return;
      hasDraggedRef.current = true;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setCoords({
        left: dragStartRef.current.startLeft + dx,
        top: dragStartRef.current.startTop + dy
      });
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      dragStartRef.current = null;
    };

    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!coords) return;
    setIsDragging(true);
    hasDraggedRef.current = false;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startLeft: coords.left,
      startTop: coords.top
    };
    e.stopPropagation();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasDraggedRef.current) {
      hasDraggedRef.current = false;
      return; // Ignore click if it was a drag
    }
    onClick();
  };

  return (
    <button
      ref={buttonRef}
      className={`fab-button pointer-events-auto fixed z-[2147483647] flex select-none items-center justify-center rounded-3xl border border-[#4a4a4a] bg-[#333333] px-6 py-3 font-[var(--font-sans)] text-sm font-medium text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)] ${coords ? "left-[var(--fab-left)] top-[var(--fab-top)]" : "bottom-6 right-6"} ${isDragging ? "cursor-grabbing transition-none" : "cursor-pointer transition-colors duration-200"}`}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      aria-label={isOpen ? "Close Glimpse Panel" : "Open Glimpse Panel"}
    >
      {isOpen ? 'Close' : 'Glimpse'}
    </button>
  );
};
