import { useNodes, useEdges } from "@xyflow/react";
import { useState } from "react";
import { simulateWorkflow, SimulateStep } from "@/mocks/api";
import SidebarPanelWrapper from "../../components/sidebar-panel-wrapper";
import SidebarPanelHeading from "../../components/sidebar-panel-heading";
import { HeaderWithIcon } from "@/components/flow-builder/components/ui/header-with-icon";
import { Button } from "@/components/ui/button";

export function SandboxPanel() {
  const nodes = useNodes();
  const edges = useEdges();
  const [steps, setSteps] = useState<SimulateStep[]>([]);
  const [ran, setRan] = useState(false);

  const handleSimulate = () => {
    const result = simulateWorkflow(nodes, edges);
    setSteps(result);
    setRan(true);
  };

  const handleReset = () => {
    setSteps([]);
    setRan(false);
  };

  const statusColor = (status: SimulateStep["status"]) =>
    status === "success" ? "text-green-500" : "text-red-500";

  const nodeTypeIcon: Record<string, string> = {
    start: "▶",
    task: "📋",
    approval: "✅",
    "automated-step": "⚡",
    end: "🏁",
  };

  return (
    <SidebarPanelWrapper>
      <div className="w-80 flex flex-col">
        <SidebarPanelHeading className="shrink-0">
          <HeaderWithIcon icon="solar:play-bold" title="Test Workflow" />
        </SidebarPanelHeading>

        <div className="flex flex-col gap-3 p-4">
          <p className="text-xs text-card-foreground/50">
            Simulates your workflow from Start to End and shows a step-by-step execution log.
          </p>

          <div className="flex gap-2">
            <Button size="sm" onClick={handleSimulate} className="flex-1">
              ▶ Run Simulation
            </Button>
            {ran && (
              <Button size="sm" variant="outline" onClick={handleReset}>
                Reset
              </Button>
            )}
          </div>

          {ran && steps.length === 0 && (
            <div className="text-xs text-red-400 mt-2">
              No steps found. Make sure a Start node exists and nodes are connected.
            </div>
          )}

          {steps.length > 0 && (
            <div className="flex flex-col gap-2 mt-2 max-h-[480px] overflow-y-auto">
              {steps.map((step, i) => (
                <div
                  key={step.nodeId + i}
                  className="flex flex-col gap-0.5 rounded-md border border-card-foreground/10 bg-card p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-card-foreground flex items-center gap-1.5">
                      <span>{nodeTypeIcon[step.nodeType] ?? "•"}</span>
                      <span>{step.label}</span>
                    </span>
                    <span className={`text-xs font-bold ${statusColor(step.status)}`}>
                      {step.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xs text-card-foreground/50 mt-0.5">
                    {step.message}
                  </div>
                  <div className="text-xs text-card-foreground/20 mt-0.5">
                    ID: {step.nodeId}
                  </div>
                </div>
              ))}

              <div className="rounded-md bg-green-500/10 border border-green-500/20 p-3 text-xs text-green-400 font-medium text-center">
                ✓ Simulation complete — {steps.length} step{steps.length !== 1 ? "s" : ""} executed
              </div>
            </div>
          )}
        </div>
      </div>
    </SidebarPanelWrapper>
  );
}