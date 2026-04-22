import { BuilderNodeType } from "@/components/flow-builder/components/blocks/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";
import { TaskNodeData } from "../../../../nodes/task-node/task.node";

type Props = Readonly<{ id: string; type: BuilderNodeType; data: TaskNodeData; updateData: (d: Partial<TaskNodeData>) => void }>;

export default function TaskNodePropertyPanel({ id, data, updateData }: Props) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="text-xs text-card-foreground/20 self-end -mb-4">{id}</div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-card-foreground/60 font-semibold">Title *</label>
        <Input value={data.title || ""} onChange={(e) => updateData({ title: e.target.value })} placeholder="Task title..." />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-card-foreground/60 font-semibold">Description</label>
        <Input value={data.description || ""} onChange={(e) => updateData({ description: e.target.value })} placeholder="Task description..." />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-card-foreground/60 font-semibold">Assignee</label>
        <Input value={data.assignee || ""} onChange={(e) => updateData({ assignee: e.target.value })} placeholder="Assignee name..." />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-card-foreground/60 font-semibold">Due Date</label>
        <Input type="date" value={data.dueDate || ""} onChange={(e) => updateData({ dueDate: e.target.value })} />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-card-foreground/60 font-semibold">Custom Fields</label>
        {data.customFields.map((field) => (
          <div key={field.id} className="flex gap-2 items-center">
            <Input value={field.key} onChange={(e) => updateData({ customFields: data.customFields.map(f => f.id === field.id ? { ...f, key: e.target.value } : f) })} placeholder="Key" className="w-5/12" />
            <Input value={field.value} onChange={(e) => updateData({ customFields: data.customFields.map(f => f.id === field.id ? { ...f, value: e.target.value } : f) })} placeholder="Value" className="w-5/12" />
            <Button size="sm" variant="ghost" onClick={() => updateData({ customFields: data.customFields.filter(f => f.id !== field.id) })}>✕</Button>
          </div>
        ))}
        <Button size="sm" variant="outline" onClick={() => updateData({ customFields: [...data.customFields, { id: nanoid(), key: "", value: "" }] })}>
          Add Field
        </Button>
      </div>
    </div>
  );
}