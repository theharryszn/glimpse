import { Moon, Sun } from "@phosphor-icons/react";

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
          <span className="rounded bg-accent-soft px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.5px] text-accent-strong">
            Beta
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-hairline bg-surface text-ink-muted transition-all duration-200 ease-in-out"
          >
            {theme === "dark" ? (
              <Moon size={14} weight="regular" aria-hidden />
            ) : (
              <Sun size={14} weight="regular" aria-hidden />
            )}
          </button>
          <button
            onClick={onToggleEnabled}
            aria-label={enabled ? "Disable Glimpse" : "Enable Glimpse"}
            aria-pressed={enabled}
            className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-xl border-0 p-0 transition-colors duration-200 ${
              enabled ? "bg-[#34A853]" : "bg-ink-muted"
            }`}
          >
            <span
              className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-[left] duration-200 ${
                enabled ? "left-[23px]" : "left-[3px]"
              }`}
            />
          </button>
        </div>
      </div>

      <p className="mb-0 mt-2 text-xs leading-[1.4] text-ink-muted">
        Privacy-first, local-AI learning companion.
      </p>
    </header>
  );
}
