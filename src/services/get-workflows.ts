import type { IFlowState } from "@/stores/flow-store";

export const getWorkflows = async (): Promise<IFlowState["workflow"][]> => {
  return [
    {
      id: "1",
      name: "Employee Onboarding",
      edges: [
        { id: "e1", source: "node-start", target: "node-task", type: "deletable" },
        { id: "e2", source: "node-task", target: "node-approval", type: "deletable" },
        { id: "e3", source: "node-approval", target: "node-auto", type: "deletable" },
        { id: "e4", source: "node-auto", target: "node-end", type: "deletable" },
      ],
      nodes: [
        {
          id: "node-start",
          type: "start",
          position: { x: 0, y: 200 },
          deletable: false,
          data: { label: "Start", deletable: false },
          measured: { width: 96, height: 42 },
        },
        {
          id: "node-task",
          type: "task",
          position: { x: 200, y: 140 },
          deletable: false,
          data: {
            title: "Collect Documents",
            description: "Gather all required onboarding documents.",
            assignee: "HR Team",
            dueDate: "2025-01-10",
            customFields: [],
            deletable: false,
          },
          measured: { width: 288, height: 200 },
        },
        {
          id: "node-approval",
          type: "approval",
          position: { x: 600, y: 140 },
          deletable: false,
          data: {
            title: "Manager Approval",
            approverRole: "Manager",
            autoApproveThreshold: 3,
            deletable: false,
          },
          measured: { width: 288, height: 200 },
        },
        {
          id: "node-auto",
          type: "automated-step",
          position: { x: 1000, y: 140 },
          deletable: false,
          data: {
            title: "Send Welcome Email",
            actionId: "send_email",
            actionParams: { to: "newhire@company.com", subject: "Welcome aboard!" },
            deletable: false,
          },
          measured: { width: 288, height: 200 },
        },
        {
          id: "node-end",
          type: "end",
          position: { x: 1400, y: 200 },
          deletable: false,
          data: { label: "End", deletable: false },
          measured: { width: 90, height: 42 },
        },
      ],
      sidebar: {
        active: "available-nodes",
        panels: { nodeProperties: { selectedNode: null } },
      },
    },
    {
      id: "2",
      name: "Leave Approval",
      edges: [
        { id: "e1", source: "node-start", target: "node-task", type: "deletable" },
        { id: "e2", source: "node-task", target: "node-approval", type: "deletable" },
        { id: "e3", source: "node-approval", target: "node-auto", type: "deletable" },
        { id: "e4", source: "node-auto", target: "node-end", type: "deletable" },
      ],
      nodes: [
        {
          id: "node-start",
          type: "start",
          position: { x: 0, y: 200 },
          deletable: false,
          data: { label: "Start", deletable: false },
          measured: { width: 96, height: 42 },
        },
        {
          id: "node-task",
          type: "task",
          position: { x: 200, y: 140 },
          deletable: false,
          data: {
            title: "Submit Leave Request",
            description: "Employee submits leave application form.",
            assignee: "Employee",
            dueDate: "",
            customFields: [],
            deletable: false,
          },
          measured: { width: 288, height: 200 },
        },
        {
          id: "node-approval",
          type: "approval",
          position: { x: 600, y: 140 },
          deletable: false,
          data: {
            title: "HRBP Approval",
            approverRole: "HRBP",
            autoApproveThreshold: 5,
            deletable: false,
          },
          measured: { width: 288, height: 200 },
        },
        {
          id: "node-auto",
          type: "automated-step",
          position: { x: 1000, y: 140 },
          deletable: false,
          data: {
            title: "Notify Employee",
            actionId: "send_email",
            actionParams: { to: "employee@company.com", subject: "Leave Request Update" },
            deletable: false,
          },
          measured: { width: 288, height: 200 },
        },
        {
          id: "node-end",
          type: "end",
          position: { x: 1400, y: 200 },
          deletable: false,
          data: { label: "End", deletable: false },
          measured: { width: 90, height: 42 },
        },
      ],
      sidebar: {
        active: "available-nodes",
        panels: { nodeProperties: { selectedNode: null } },
      },
    },
  ];
};