export interface Automation {
    id: string;
    label: string;
    params: string[];
  }
  
  export const AUTOMATIONS: Automation[] = [
    { id: "send_email", label: "Send Email", params: ["to", "subject"] },
    { id: "generate_doc", label: "Generate Document", params: ["template", "recipient"] },
    { id: "notify_slack", label: "Notify Slack", params: ["channel", "message"] },
    { id: "assign_role", label: "Assign Role", params: ["userId", "role"] },
  ];
  
  export interface SimulateStep {
    nodeId: string;
    nodeType: string;
    label: string;
    status: "success" | "error";
    message: string;
  }
  
  export function simulateWorkflow(nodes: any[], edges: any[]): SimulateStep[] {
    const steps: SimulateStep[] = [];
  
    const adjacency: Record<string, string[]> = {};
    for (const edge of edges) {
      if (!adjacency[edge.source]) adjacency[edge.source] = [];
      adjacency[edge.source].push(edge.target);
    }
  
    const startNode = nodes.find((n) => n.type === "start");
    if (!startNode) {
      return [{ nodeId: "none", nodeType: "error", label: "Error", status: "error", message: "No Start node found." }];
    }
  
    const visited = new Set<string>();
    const queue = [startNode.id];
  
    while (queue.length > 0) {
      const currentId = queue.shift()!;
      if (visited.has(currentId)) continue;
      visited.add(currentId);
  
      const node = nodes.find((n) => n.id === currentId);
      if (!node) continue;
  
      steps.push({
        nodeId: node.id,
        nodeType: node.type,
        label: String(node.data?.title || node.data?.label || node.type),
        status: "success",
        message: getStepMessage(node),
      });
  
      (adjacency[currentId] || []).forEach((id) => queue.push(id));
    }
  
    return steps;
  }
  
  function getStepMessage(node: any): string {
    switch (node.type) {
      case "start": return `Workflow started: ${node.data?.label || "Start"}`;
      case "task": return `Task "${node.data?.title || "Untitled"}" assigned to ${node.data?.assignee || "unassigned"}`;
      case "approval": return `Approval requested from ${node.data?.approverRole || "Manager"}`;
      case "automated-step": return `Automated action "${node.data?.actionId || "none"}" triggered`;
      case "end": return `Workflow completed`;
      default: return `Executed: ${node.type}`;
    }
  }
