import { Badge } from "@/components/ui/Badge";
import { Toggle } from "@/components/ui/Toggle";

interface PopupHeaderProps {
  enabled: boolean;
  controlsReady?: boolean;
  onToggleEnabled: () => void;
}

export function PopupHeader({
  enabled,
  controlsReady = true,
  onToggleEnabled,
}: PopupHeaderProps) {
  return (
    <header className="border-b border-hairline bg-surface px-5 pb-4 pt-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-xl font-bold tracking-[-0.3px] text-accent-strong">
            Glimpse
          </span>
          <Badge tone="accent">Beta</Badge>
        </div>

        <div className="flex items-center gap-2.5">
          <span
            className="font-mono text-[10px] font-medium uppercase tracking-[0.06em] text-ink-muted"
            aria-hidden
          >
            {enabled ? "On" : "Off"}
          </span>
          <Toggle
            checked={enabled}
            onCheckedChange={onToggleEnabled}
            label={enabled ? "Disable Glimpse" : "Enable Glimpse"}
            disabled={!controlsReady}
          />
        </div>
      </div>

      <p className="mb-0 mt-2 text-xs leading-[1.4] text-ink-muted">
        Private explanations and a scrapbook, powered on this device.
      </p>
    </header>
  );
}
