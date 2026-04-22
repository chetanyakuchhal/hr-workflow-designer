import { type Node, type NodeProps, Position } from "@xyflow/react";
import { nanoid } from "nanoid";
import { memo, useCallback, useMemo, useState } from "react";
import { BaseNodeData, BuilderNode, RegisterNodeMetadata } from "../../types";
import { getNodeDetail } from "../../utils";
import { useDeleteNode } from "@/hooks/use-delete-node";
import CustomHandle from "../../../handles/custom-handler";
import { NodeCard, NodeCardContent, NodeCardDescription, NodeCardFooter, NodeCardHeader } from "@flow-builder-ui/node-card";
import { useFlowStore } from "@/stores/flow-store";
import { useShallow } from "zustand/shallow";
import { isEmpty } from "lodash";
import TaskNodePropertyPanel from "../../sidebar/panels/node-properties/property-panels/task-property-panel";

const NODE_TYPE = BuilderNode.TASK;

export interface TaskNodeData extends BaseNodeData {
  title: string | null;
  description: string | null;
  assignee: string | null;
  dueDate: string | null;
  customFields: { id: string; key: string; value: string }[];
}

type TaskNodeProps = NodeProps<Node<TaskNodeData, typeof NODE_TYPE>>;

export function TaskNode({ id, isConnectable, selected, data }: TaskNodeProps) {
  const meta = useMemo(() => getNodeDetail(NODE_TYPE), []);
  const [showNodePropertiesOf] = useFlowStore(useShallow((s) => [s.actions.sidebar.showNodePropertiesOf]));
  const [sourceHandleId] = useState<string>(nanoid());
  const [targetHandleId] = useState<string>(nanoid());
  const deleteNode = useDeleteNode();

  const handleShowNodeProperties = useCallback(() => {
    showNodePropertiesOf({ id, type: NODE_TYPE });
  }, [id, showNodePropertiesOf]);

  return (
    <NodeCard data-selected={selected} onDoubleClick={handleShowNodeProperties}>
      <NodeCardHeader
        icon={meta.icon} title={meta.title}
        handleDeleteNode={() => deleteNode(id)}
        handleShowNodeProperties={handleShowNodeProperties}
        gradientColor={meta.gradientColor}
      />
      <NodeCardContent>
        <div className="flex flex-col p-4 min-h-10">
          <div className="text-xs font-medium text-card-foreground">Title</div>
          <div className="mt-2 text-sm leading-snug line-clamp-2 italic text-card-foreground">
            {isEmpty(data.title) ? "No title..." : data.title}
          </div>
          {data.assignee && (
            <div className="mt-2 text-xs text-card-foreground/60">Assignee: {data.assignee}</div>
          )}
        </div>
        <NodeCardDescription description="A human task to be completed." />
        <NodeCardFooter nodeId={id} />
      </NodeCardContent>
      <CustomHandle type="target" id={targetHandleId} position={Position.Left} isConnectable={isConnectable} />
      <CustomHandle type="source" id={sourceHandleId} position={Position.Right} isConnectable={isConnectable} />
    </NodeCard>
  );
}

export const metadata: RegisterNodeMetadata<TaskNodeData> = {
  type: NODE_TYPE,
  node: memo(TaskNode),
  detail: {
    icon: "solar:document-text-bold",
    title: "Task",
    description: "A human task such as collecting documents or filling a form.",
    gradientColor: "blue",
  },
  connection: { inputs: 1, outputs: 1 },
  defaultData: { title: null, description: null, assignee: null, dueDate: null, customFields: [] },
  propertyPanel: TaskNodePropertyPanel,
};