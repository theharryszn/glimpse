import { useState } from "react";
import {
  ArrowRight,
  Sparkle,
  X,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { Surface } from "@/components/ui/Surface";
import { TextField } from "@/components/ui/TextField";
import { Toggle } from "@/components/ui/Toggle";

export function ButtonStory() {
  return (
    <div className="design-lab-primitive-row">
      <Button>Ask follow-up</Button>
      <Button variant="secondary">Explain further</Button>
      <Button variant="ghost">Dismiss</Button>
      <Button variant="danger">Delete</Button>
      <Button disabled>Unavailable</Button>
      <Button variant="icon" aria-label="Generate">
        <Sparkle size={16} aria-hidden />
      </Button>
      <Button variant="icon" aria-label="Continue">
        <ArrowRight size={16} aria-hidden />
      </Button>
      <Button variant="icon" aria-label="Close" size="sm">
        <X size={14} aria-hidden />
      </Button>
    </div>
  );
}

export function ToggleStory() {
  const [enabled, setEnabled] = useState(true);
  return (
    <div className="design-lab-primitive-row">
      <label className="design-lab-labeled-control">
        <span>Glimpse enabled</span>
        <Toggle
          checked={enabled}
          onCheckedChange={setEnabled}
          label="Toggle Glimpse"
        />
      </label>
      <label className="design-lab-labeled-control">
        <span>Disabled</span>
        <Toggle
          checked={false}
          onCheckedChange={() => undefined}
          label="Unavailable toggle"
          disabled
        />
      </label>
    </div>
  );
}

export function StatusStory() {
  return (
    <div className="design-lab-primitive-row">
      <Badge>Local</Badge>
      <Badge tone="accent">Beta</Badge>
      <Badge tone="success">Ready</Badge>
      <Badge tone="warning">Preparing</Badge>
      <Badge tone="error">Unavailable</Badge>
      <StatusIndicator label="Idle" />
      <StatusIndicator label="Active" tone="success" />
      <StatusIndicator label="Preparing" tone="warning" />
      <StatusIndicator label="Unavailable" tone="error" />
    </div>
  );
}

export function FoundationsStory() {
  return (
    <div className="grid min-h-[340px] grid-cols-1 gap-3 p-10 md:grid-cols-3">
      <Surface className="p-4">Flat surface</Surface>
      <Surface elevation="raised" className="p-4">Raised surface</Surface>
      <Surface elevation="overlay" className="p-4">Overlay surface</Surface>
      <div className="flex flex-col justify-center gap-2 md:col-span-3">
        <TextField aria-label="Prompt" placeholder="Ask a follow-up..." />
        <TextField
          aria-label="Disabled prompt"
          value="Streaming response"
          disabled
          readOnly
        />
      </div>
    </div>
  );
}
