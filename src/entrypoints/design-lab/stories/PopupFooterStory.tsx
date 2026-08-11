import { PopupFooter } from "@/components/features/popup/PopupFooter";

export function PopupFooterStory() {
  return (
    <div className="design-lab-small-component-frame">
      <div className="design-lab-popup-width">
        <PopupFooter
          showDesignLab
          onOpenDesignLab={() => undefined}
          onOpenSetupGuide={() => undefined}
        />
      </div>
    </div>
  );
}
