

```markdown
# HR Workflow Designer
**Tredence Studio · Full Stack Engineering Intern · Case Study Submission**

---

## What This Is

An interactive workflow builder that lets HR teams design, configure, and simulate internal processes — onboarding, leave approvals, document verification — directly on a visual canvas. Built from scratch with Next.js, React Flow, TypeScript, and Zustand.

---

## Running Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`, pick a workflow, and start building.

---

## Core Capabilities

**Visual Canvas**
Drag nodes from the panel onto the canvas, wire them together with edges, double-click to configure, and delete anything with a keystroke. The canvas includes a minimap and zoom controls out of the box.

**Five HR Node Types**

| Node | Purpose | Configurable Fields |
|---|---|---|
| Start | Workflow entry point | Title, metadata key-value pairs |
| Task | Human-assigned work item | Title, description, assignee, due date, custom fields |
| Approval | Sign-off gate | Title, approver role, auto-approve threshold |
| Automated Step | System-triggered action | Title, action (from API), dynamic action params |
| End | Workflow termination | End message, show-summary toggle |

Every form is a controlled component with full TypeScript types. The interface — `{ id, type, data, updateData }` — is identical across all five panels, so adding a new node type follows a pattern you already know.

**Mock API (`src/mocks/api.ts`)**

Built to behave like a real service — typed interfaces, exported functions, no external dependencies.

- `GET /automations` — list of system actions, each with an id, label, and parameter schema
- `POST /simulate` — accepts a workflow graph, runs a BFS traversal from the Start node, returns a step-by-step execution log per node

Replacing this with a real FastAPI or Express backend means changing one import path. Nothing else touches.

**Simulation Sandbox**

Hit the play button in the sidebar to serialize the full graph and run it through the simulator. The panel renders a timestamped log entry per node — type icon, label, status, and a plain-English description of what happened. Validates that a Start node exists before running.

---

## Project Structure

```
src/
├── app/workflow/               # Canvas page (Next.js App Router)
├── components/flow-builder/
│   └── blocks/
│       ├── nodes/              # Self-contained folder per node type
│       │   ├── start.node.tsx
│       │   ├── end.node.tsx
│       │   ├── task-node/
│       │   ├── approval-node/
│       │   └── automated-step-node/
│       ├── sidebar/panels/
│       │   ├── available-nodes/    # Drag palette
│       │   ├── node-properties/    # Per-node config forms
│       │   └── sandbox/            # Simulation runner
│       ├── types.ts                # Enums and shared interfaces
│       └── index.ts                # Node registry
├── hooks/                      # Custom hooks
├── mocks/api.ts                 # Mock API
├── services/                   # Workflow data layer
└── stores/flow-store.ts         # Zustand store
```

---

## Architecture Decisions

**Registry over configuration**
Each node exports a single `metadata` object — type, component, icon, default data, property panel. `index.ts` derives everything else (`NODE_TYPES`, `NODES_METADATA`, `AVAILABLE_NODES`) from that list automatically. A new node type = one new file + one new import. Nothing else changes.

**Hard separation between layers**
Canvas orchestration, node rendering, API calls, and global state live in four completely separate locations and do not import from each other directly. Each layer can be swapped or tested in isolation.

**Runtime panel resolution**
The property panel for a selected node is looked up through the registry at runtime — not through a switch statement or if-else chain. This means the form system scales to any number of node types without touching shared code.

**BFS execution model**
The simulator builds an adjacency map from the edge list and performs a standard breadth-first traversal from the Start node. This naturally handles both linear pipelines and branching workflows, visiting every reachable node exactly once.

---

## Stack

| | |
|---|---|
| Next.js 14 | Framework, SSR, App Router |
| @xyflow/react | Canvas, nodes, edges, handles |
| TypeScript | Full type coverage |
| Zustand + Immer | Global state, immutable updates |
| Tailwind CSS | Styling |
| shadcn/ui | UI primitives |
| nanoid | ID generation |

---

## Delivered

- Five node types with complete configuration forms
- Drag-and-drop canvas with edge connections and deletion
- Mock API with automations list and BFS simulation
- Sandbox panel with live step-by-step execution log
- Dynamic parameter inputs on Automated Step (changes per action)
- Two working HR workflows preloaded — Employee Onboarding, Leave Approval
- Dark / light theme, MiniMap, zoom controls

## Given More Time

- Cycle detection with visual error indicators on offending nodes
- JSON export and import for saving/sharing workflows
- Undo / Redo via `useUndoable`
- Auto-layout with Dagre or ELKjs
- Jest + RTL unit tests for forms and simulation logic
- FastAPI + PostgreSQL backend for persistent workflow storage
```


