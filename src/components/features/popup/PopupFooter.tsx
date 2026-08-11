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
          <button
            onClick={onOpenDesignLab}
            className="cursor-pointer rounded border-0 bg-accent-soft px-1.5 py-[3px] text-[10px] font-semibold text-accent-strong"
          >
            Design Lab
          </button>
        )}
        <button
          onClick={onOpenSetupGuide}
          className="cursor-pointer rounded border-0 bg-transparent px-1 py-0.5 text-[11px] font-medium text-accent-strong hover:bg-accent-soft"
        >
          Setup Guide
        </button>
      </div>
    </footer>
  );
}
