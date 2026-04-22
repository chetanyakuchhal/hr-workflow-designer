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
import AutomatedStepNodePropertyPanel from "../../sidebar/panels/node-properties/property-panels/automated-step-property-panel";

const NODE_TYPE = BuilderNode.AUTOMATED_STEP;

export interface AutomatedStepNodeData extends BaseNodeData {
  title: string | null;
  actionId: string | null;
  actionParams: Record<string, string>;
}

type AutomatedStepNodeProps = NodeProps<Node<AutomatedStepNodeData, typeof NODE_TYPE>>;

export function AutomatedStepNode({ id, isConnectable, selected, data }: AutomatedStepNodeProps) {
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
          {data.actionId && (
            <div className="mt-2 text-xs text-card-foreground/60">Action: {data.actionId}</div>
          )}
        </div>
        <NodeCardDescription description="A system-triggered automated action." />
        <NodeCardFooter nodeId={id} />
      </NodeCardContent>
      <CustomHandle type="target" id={targetHandleId} position={Position.Left} isConnectable={isConnectable} />
      <CustomHandle type="source" id={sourceHandleId} position={Position.Right} isConnectable={isConnectable} />
    </NodeCard>
  );
}

export const metadata: RegisterNodeMetadata<AutomatedStepNodeData> = {
  type: NODE_TYPE,
  node: memo(AutomatedStepNode),
  detail: {
    icon: "solar:bolt-bold",
    title: "Automated Step",
    description: "A system action like sending an email or generating a document.",
    gradientColor: "orange",
  },
  connection: { inputs: 1, outputs: 1 },
  defaultData: { title: null, actionId: null, actionParams: {} },
  propertyPanel: AutomatedStepNodePropertyPanel,
};