import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type RefObject,
} from "react";
import {
  isPdfDocument,
  getNativePdfSelection,
} from "../shared/utils/pdf-utils";

export function useMagicHold(
  enabled = true,
  boundaryRef?: RefObject<HTMLElement | null>,
) {
  const [isHolding, setIsHolding] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null,
  );
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeHoldCleanupRef = useRef<(() => void) | null>(null);

  const dismiss = useCallback(() => {
    activeHoldCleanupRef.current?.();
    activeHoldCleanupRef.current = null;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsHolding(false);
    setIsTriggered(false);
    setPosition(null);
  }, []);

  useEffect(() => {
    if (!enabled) {
      dismiss();
      return;
    }

    const handleMouseDown = (e: MouseEvent) => {
      if (
        boundaryRef?.current &&
        !boundaryRef.current.contains(e.target as Node)
      ) {
        return;
      }

      const path = e.composedPath() as HTMLElement[];
      const isInsidePopover = path.some(
        (el) =>
          el.classList?.contains("tactical-popover") ||
          el.tagName?.toLowerCase() === "glimpse-overlays",
      );
      if (isInsidePopover) {
        return;
      }

      // Finding 3: Reset triggered state on any new outside click
      dismiss();

      // Finding 7: Check for modifier keys
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey)
        return;

      const isPDF = isPdfDocument();
      let lastPointer = {
        clientX: e.clientX,
        clientY: e.clientY,
        pageX: e.pageX,
        pageY: e.pageY,
      };
      let hasStartedHolding = false;

      const getSelectionRect = () => {
        if (isPDF) return null;

        const selection = window.getSelection();
        if (!selection?.toString().trim() || !selection.rangeCount) return null;
        return selection.getRangeAt(0).getBoundingClientRect();
      };

      const pointerIsInside = (rect: DOMRect) => {
        const tolerance = 8;
        return (
          lastPointer.clientX >= rect.left - tolerance &&
          lastPointer.clientX <= rect.right + tolerance &&
          lastPointer.clientY >= rect.top - tolerance &&
          lastPointer.clientY <= rect.bottom + tolerance
        );
      };

      const stopTimer = () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        hasStartedHolding = false;
        setIsHolding(false);
      };

      const cleanup = () => {
        stopTimer();
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener(
          "selectionchange",
          handleActiveSelectionChange,
        );
        if (activeHoldCleanupRef.current === cleanup) {
          activeHoldCleanupRef.current = null;
        }
      };

      const handleMouseUp = () => {
        cleanup();
      };

      const checkAndTrigger = async () => {
        const currentTimerId = timerRef.current;
        let hasSelection = false;

        if (isPDF) {
          const pdfText = await getNativePdfSelection();
          hasSelection = pdfText.length > 0;
        } else {
          const finalRect = getSelectionRect();
          hasSelection = Boolean(finalRect && pointerIsInside(finalRect));
        }

        // Guard: Ensure user is still holding and hasn't cancelled during the await
        if (timerRef.current !== currentTimerId) {
          return;
        }

        if (hasSelection) {
          setIsTriggered(true);
        }

        cleanup();
      };

      const startTimer = () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(checkAndTrigger, 1500);
      };

      const beginHolding = () => {
        hasStartedHolding = true;
        setIsHolding(true);
        setPosition({ x: lastPointer.pageX, y: lastPointer.pageY });
        startTimer();
      };

      const syncSelection = () => {
        if (isPDF) {
          beginHolding();
          return;
        }

        const selectionRect = getSelectionRect();
        if (!selectionRect) {
          if (hasStartedHolding) stopTimer();
          return;
        }

        if (!pointerIsInside(selectionRect)) {
          if (hasStartedHolding) stopTimer();
          return;
        }

        beginHolding();
      };

      const handleMouseMove = (moveEvent: MouseEvent) => {
        lastPointer = {
          clientX: moveEvent.clientX,
          clientY: moveEvent.clientY,
          pageX: moveEvent.pageX,
          pageY: moveEvent.pageY,
        };
        syncSelection();
      };

      const handleActiveSelectionChange = () => syncSelection();

      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mouseup", handleMouseUp, { once: true });
      if (!isPDF) {
        document.addEventListener(
          "selectionchange",
          handleActiveSelectionChange,
        );
      }
      activeHoldCleanupRef.current = cleanup;

      syncSelection();
    };

    const handleSelectionChange = () => {
      if (isPdfDocument()) {
        return;
      }

      if (activeHoldCleanupRef.current) {
        return;
      }

      const selectedText = window.getSelection()?.toString().trim() ?? "";
      if (!selectedText) {
        dismiss();
      }
    };

    window.addEventListener("mousedown", handleMouseDown, { capture: true });
    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown, {
        capture: true,
      });
      document.removeEventListener("selectionchange", handleSelectionChange);
      activeHoldCleanupRef.current?.();
      activeHoldCleanupRef.current = null;
    };
  }, [boundaryRef, dismiss, enabled]);

  return { isHolding, isTriggered, position, dismiss };
}
