import { PopupHeader } from "@/components/features/popup/PopupHeader";
import { useStoredState } from "../shared/useStoredState";

export function PopupHeaderStory() {
  const [enabled, setEnabled] = useStoredState(
    "glimpse-design-lab-popup-enabled",
    true,
  );
  const [theme, setTheme] = useStoredState<"light" | "dark">(
    "glimpse-design-lab-popup-theme",
    "light",
  );

  return (
    <div className={`design-lab-popup-width ${theme === "dark" ? "dark" : ""}`}>
      <PopupHeader
        enabled={enabled}
        theme={theme}
        onToggleEnabled={() => setEnabled(!enabled)}
        onToggleTheme={() => setTheme(theme === "light" ? "dark" : "light")}
      />
    </div>
  );
}
