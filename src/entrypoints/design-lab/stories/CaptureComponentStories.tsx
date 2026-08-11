import { DraggableSurface } from "@/components/features/capture/DraggableSurface";

export function DraggableSurfaceStory() {
  return (
    <div className="relative h-52 w-full overflow-hidden rounded-[var(--radius-lg)] border border-hairline bg-surface">
      <div className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted">
        Drag by the header
      </div>
      <DraggableSurface
        anchor={{ x: 330, y: 70 }}
        isVisible
        className="w-64 rounded-[var(--radius-lg)] border border-hairline bg-surface-raised p-4 shadow-[var(--shadow-overlay)]"
      >
        <header
          data-drag-handle
          className="cursor-grab select-none border-b border-hairline pb-2 text-xs font-semibold text-ink active:cursor-grabbing"
        >
          Movable explanation
        </header>
        <p className="mb-0 mt-3 text-xs leading-relaxed text-ink-muted">
          Positioning and drag behavior are shared with the production popover.
        </p>
      </DraggableSurface>
    </div>
  );
}
