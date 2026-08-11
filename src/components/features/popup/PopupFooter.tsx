import { Button } from "@/components/ui/Button";

interface PopupFooterProps {
  showDesignLab?: boolean;
  onOpenDesignLab?: () => void;
  onOpenSetupGuide: () => void;
}

export function PopupFooter({
  showDesignLab = false,
  onOpenDesignLab,
  onOpenSetupGuide,
}: PopupFooterProps) {
  return (
    <footer className="flex items-center justify-between border-t border-hairline px-5 py-3">
      <span className="text-[11px] text-ink-muted">
        All data stays on your device.
      </span>
      <div className="flex items-center gap-1.5">
        {showDesignLab && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenDesignLab}
            className="min-h-0 px-1.5 py-[3px] text-[10px]"
          >
            Design Lab
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onOpenSetupGuide}
          className="min-h-0 px-1 py-0.5 text-[11px] text-accent-strong"
        >
          Setup Guide
        </Button>
      </div>
    </footer>
  );
}
