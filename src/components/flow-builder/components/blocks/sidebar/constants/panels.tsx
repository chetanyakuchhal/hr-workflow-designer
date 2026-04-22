import type { ComponentType } from "react";

import AvailableNodesPanel from "../panels/available-nodes/available-nodes-panel";
import { NodePropertiesPanel } from "../panels/node-properties/node-properties-panel";
import { SandboxPanel } from "../panels/sandbox/sandbox-panel";

type PanelComponent = ComponentType<any>;

export const PANEL_COMPONENTS: Record<
  "node-properties" | "available-nodes" | "sandbox" | "none",
  PanelComponent
> = {
  "available-nodes": AvailableNodesPanel,
  "node-properties": NodePropertiesPanel,
  "sandbox": SandboxPanel,
  none: () => null,
};