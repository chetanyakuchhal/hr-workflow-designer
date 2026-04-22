import { BuilderNodeType } from "@/components/flow-builder/components/blocks/types";
import { Input } from "@/components/ui/input";
import { ApprovalNodeData } from "../../../../nodes/approval-node/approval.node";

type Props = Readonly<{ id: string; type: BuilderNodeType; data: ApprovalNodeData; updateData: (d: Partial<ApprovalNodeData>) => void }>;

const APPROVER_ROLES = ["Manager", "HRBP", "Director", "VP", "C-Suite"];

export default function ApprovalNodePropertyPanel({ id, data, updateData }: Props) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="text-xs text-card-foreground/20 self-end -mb-4">{id}</div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-card-foreground/60 font-semibold">Title</label>
        <Input value={data.title || ""} onChange={(e) => updateData({ title: e.target.value })} placeholder="Approval step title..." />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-card-foreground/60 font-semibold">Approver Role</label>
        <select
          value={data.approverRole || "Manager"}
          onChange={(e) => updateData({ approverRole: e.target.value })}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
        >
          {APPROVER_ROLES.map((role) => <option key={role} value={role}>{role}</option>)}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-card-foreground/60 font-semibold">Auto-Approve Threshold (days)</label>
        <Input
          type="number"
          value={data.autoApproveThreshold ?? ""}
          onChange={(e) => updateData({ autoApproveThreshold: e.target.value ? Number(e.target.value) : null })}
          placeholder="e.g. 3"
        />
      </div>
    </div>
  );
}