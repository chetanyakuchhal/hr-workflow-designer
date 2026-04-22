import { BuilderNodeType } from "@/components/flow-builder/components/blocks/types";
import { Input } from "@/components/ui/input";
import { AUTOMATIONS } from "@/mocks/api";
import { AutomatedStepNodeData } from "../../../../nodes/automated-step-node/automated.step.node";

type Props = Readonly<{ id: string; type: BuilderNodeType; data: AutomatedStepNodeData; updateData: (d: Partial<AutomatedStepNodeData>) => void }>;

export default function AutomatedStepNodePropertyPanel({ id, data, updateData }: Props) {
  const selectedAction = AUTOMATIONS.find((a) => a.id === data.actionId);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="text-xs text-card-foreground/20 self-end -mb-4">{id}</div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-card-foreground/60 font-semibold">Title</label>
        <Input value={data.title || ""} onChange={(e) => updateData({ title: e.target.value })} placeholder="Step title..." />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-card-foreground/60 font-semibold">Action</label>
        <select
          value={data.actionId || ""}
          onChange={(e) => updateData({ actionId: e.target.value, actionParams: {} })}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
        >
          <option value="">Select an action...</option>
          {AUTOMATIONS.map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
        </select>
      </div>

      {selectedAction && (
        <div className="flex flex-col gap-2">
          <label className="text-xs text-card-foreground/60 font-semibold">Parameters</label>
          {selectedAction.params.map((param) => (
            <div key={param} className="flex flex-col gap-1">
              <label className="text-xs text-card-foreground/40">{param}</label>
              <Input
                value={data.actionParams[param] || ""}
                onChange={(e) => updateData({ actionParams: { ...data.actionParams, [param]: e.target.value } })}
                placeholder={`Enter ${param}...`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}