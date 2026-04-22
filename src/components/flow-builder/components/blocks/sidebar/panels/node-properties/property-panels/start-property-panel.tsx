import { BuilderNodeType } from "@/components/flow-builder/components/blocks/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";
import { StartNodeData } from "../../../../nodes/start.node";

type Props = Readonly<{
  id: string;
  type: BuilderNodeType;
  data: StartNodeData;
  updateData: (d: Partial<StartNodeData>) => void;
}>;

export default function StartNodePropertyPanel({ id, data, updateData }: Props) {
  const metadata = (data.metadata as { id: string; key: string; value: string }[]) || [];

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="text-xs text-card-foreground/20 self-end -mb-4">{id}</div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-card-foreground/60 font-semibold">Start Title</label>
        <Input
          value={data.label || ""}
          onChange={(e) => updateData({ label: e.target.value })}
          placeholder="Workflow start title..."
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-card-foreground/60 font-semibold">Metadata</label>
        {metadata.map((field) => (
          <div key={field.id} className="flex gap-2 items-center">
            <Input
              value={field.key}
              onChange={(e) => updateData({ metadata: metadata.map(f => f.id === field.id ? { ...f, key: e.target.value } : f) })}
              placeholder="Key"
              className="w-5/12"
            />
            <Input
              value={field.value}
              onChange={(e) => updateData({ metadata: metadata.map(f => f.id === field.id ? { ...f, value: e.target.value } : f) })}
              placeholder="Value"
              className="w-5/12"
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => updateData({ metadata: metadata.filter(f => f.id !== field.id) })}
            >
              ✕
            </Button>
          </div>
        ))}
        <Button
          size="sm"
          variant="outline"
          onClick={() => updateData({ metadata: [...metadata, { id: nanoid(), key: "", value: "" }] })}
        >
          Add Metadata
        </Button>
      </div>
    </div>
  );
}