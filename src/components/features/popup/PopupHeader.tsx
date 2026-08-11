import { Moon, Sun } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/Badge";
import { IconButton } from "@/components/ui/IconButton";
import { Toggle } from "@/components/ui/Toggle";

interface PopupHeaderProps {
  enabled: boolean;
  theme: "light" | "dark";
  onToggleEnabled: () => void;
  onToggleTheme: () => void;
}

export function PopupHeader({
  enabled,
  theme,
  onToggleEnabled,
  onToggleTheme,
}: PopupHeaderProps) {
  return (
    <header
      className={`border-b border-hairline px-5 pb-4 pt-5 ${
        theme === "dark"
          ? "bg-[linear-gradient(135deg,#1C1E22_0%,#15171A_100%)]"
          : "bg-[linear-gradient(135deg,#F8F7F4_0%,#EDECEA_100%)]"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-xl font-bold tracking-[-0.3px] text-accent-strong">
            Glimpse
          </span>
          <Badge tone="accent">Beta</Badge>
        </div>

        <div className="flex items-center gap-3">
          <IconButton
            size="sm"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Moon size={14} weight="regular" aria-hidden />
            ) : (
              <Sun size={14} weight="regular" aria-hidden />
            )}
          </IconButton>
          <Toggle
            checked={enabled}
            onCheckedChange={onToggleEnabled}
            label={enabled ? "Disable Glimpse" : "Enable Glimpse"}
          />
        </div>
      </div>

      <p className="mb-0 mt-2 text-xs leading-[1.4] text-ink-muted">
        Privacy-first, local-AI learning companion.
      </p>
    </header>
  );
}
