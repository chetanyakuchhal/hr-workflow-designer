import { metadata as StartNodeMetadata } from "./nodes/start.node";
import { metadata as EndNodeMetadata } from "./nodes/end.node";
import { metadata as TaskNodeMetadata } from "./nodes/task-node/task.node";
import { metadata as ApprovalNodeMetadata } from "./nodes/approval-node/approval.node";
import { metadata as AutomatedStepNodeMetadata } from "./nodes/automated-step-node/automated.step.node";
import { BuilderNodeType, RegisterNodeMetadata } from "./types";

export const NODES: RegisterNodeMetadata[] = [
  StartNodeMetadata,
  EndNodeMetadata,
  TaskNodeMetadata,
  ApprovalNodeMetadata,
  AutomatedStepNodeMetadata,
];

export const NODE_TYPES = NODES.reduce((acc, { type, node }) => {
  acc[type] = node;
  return acc;
}, {} as Record<string, any>);

export const NODES_METADATA = NODES.reduce((acc, current) => {
  acc[current.type] = {
    ...current,
    __details: { type: current.type, ...current.detail },
  };
  return acc;
}, {} as Record<BuilderNodeType, RegisterNodeMetadata & { __details: { type: RegisterNodeMetadata["type"] } & RegisterNodeMetadata["detail"] }>);

export const AVAILABLE_NODES = NODES.filter(
  (node) => node.available === undefined || node.available
).map((node) => ({
  type: node.type,
  icon: node.detail.icon,
  title: node.detail.title,
  description: node.detail.description,
  gradientColor: node.detail.gradientColor,
}));