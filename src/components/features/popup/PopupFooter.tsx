import { Button } from "@/components/ui/Button";

interface PopupFooterProps {
  showDesignLab?: boolean;
  setupNeeded?: boolean;
  onOpenDesignLab?: () => void;
  onOpenSetupGuide: () => void;
}

export function PopupFooter({
  showDesignLab = false,
  setupNeeded = false,
  onOpenDesignLab,
  onOpenSetupGuide,
}: PopupFooterProps) {
  return (
    <footer className="flex items-center justify-between gap-3 border-t border-hairline px-5 py-3.5">
      <span className="max-w-28 text-[10px] leading-[1.45] text-ink-muted">
        Reading data stays on this device.
      </span>
      <div className="flex shrink-0 items-center gap-1.5">
        {showDesignLab && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenDesignLab}
            className="!h-8 px-2.5 text-[10px]"
          >
            Design Lab
          </Button>
        )}
        <Button
          variant={setupNeeded ? "primary" : "secondary"}
          size="sm"
          onClick={onOpenSetupGuide}
          className="!h-8 px-3 text-[11px]"
        >
          {setupNeeded ? "Open setup" : "Setup & tutorial"}
        </Button>
      </div>
    </footer>
  );
}
