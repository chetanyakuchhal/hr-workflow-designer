import { BuilderNodeType } from "@/components/flow-builder/components/blocks/types";
import { Input } from "@/components/ui/input";
import { EndNodeData } from "../../../../nodes/end.node";

type Props = Readonly<{
  id: string;
  type: BuilderNodeType;
  data: EndNodeData;
  updateData: (d: Partial<EndNodeData>) => void;
}>;

export default function EndNodePropertyPanel({ id, data, updateData }: Props) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="text-xs text-card-foreground/20 self-end -mb-4">{id}</div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-card-foreground/60 font-semibold">End Message</label>
        <Input
          value={(data.endMessage as string) || ""}
          onChange={(e) => updateData({ endMessage: e.target.value })}
          placeholder="e.g. Workflow completed successfully."
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-card-foreground/60 font-semibold">Show Summary</label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => updateData({ showSummary: !data.showSummary })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              data.showSummary ? "bg-primary" : "bg-card-foreground/20"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                data.showSummary ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className="text-xs text-card-foreground/60">
            {data.showSummary ? "Summary enabled" : "Summary disabled"}
          </span>
        </div>
      </div>
    </div>
  );
}