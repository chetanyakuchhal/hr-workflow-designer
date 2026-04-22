

```markdown
# HR Workflow Designer — Tredence Case Study

A visual HR Workflow Designer built with Next.js, React Flow, TypeScript, and Zustand. HR admins can create, configure, and simulate internal workflows like employee onboarding, leave approval, and document verification.

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Features

### Workflow Canvas
- Drag-and-drop nodes from the sidebar onto the canvas
- Connect nodes with edges
- Delete nodes and edges
- Double-click any node to open its configuration form
- Auto-validates basic constraints (Start node must exist for simulation)

### Node Types
| Node | Description |
|---|---|
| **Start** | Workflow entry point — configurable title and metadata key-value pairs |
| **Task** | Human task — title, description, assignee, due date, custom key-value fields |
| **Approval** | Approval step — approver role (Manager/HRBP/Director), auto-approve threshold |
| **Automated Step** | System action — select from mock API action list, dynamic params per action |
| **End** | Workflow completion — end message, summary flag toggle |

### Mock API Layer (`src/mocks/api.ts`)
- `GET /automations` — returns available automated actions with their parameter definitions
- `POST /simulate` — accepts workflow JSON, performs BFS traversal from Start node, returns step-by-step execution log

### Sandbox / Test Panel
- Serializes the full workflow graph (nodes + edges)
- Runs it through the simulate function
- Displays a step-by-step execution log with status indicators
- Validates that a Start node exists before running

---

## Architecture

```
src/
├── app/                        # Next.js app router pages
│   └── workflow/               # Workflow canvas page
├── components/
│   └── flow-builder/
│       └── components/
│           └── blocks/
│               ├── nodes/      # One folder per node type
│               │   ├── start.node.tsx
│               │   ├── end.node.tsx
│               │   ├── task-node/
│               │   ├── approval-node/
│               │   └── automated-step-node/
│               ├── sidebar/
│               │   └── panels/
│               │       ├── available-nodes/   # Drag palette
│               │       ├── node-properties/   # Per-node config forms
│               │       └── sandbox/           # Simulation panel
│               ├── types.ts    # Shared types and enums
│               └── index.ts    # Node registry
├── hooks/                      # Custom React hooks
├── mocks/
│   └── api.ts                  # Mock API (automations + simulate)
├── services/                   # Mock data fetching
└── stores/
    └── flow-store.ts           # Zustand global state
```

### Key Design Decisions

**Node Registry Pattern** — Every node exports a `metadata` object containing its type, component, icon, default data, and property panel. The registry in `index.ts` auto-builds `NODE_TYPES`, `NODES_METADATA`, and `AVAILABLE_NODES` from this single source of truth. Adding a new node type requires only one new file and one line in `index.ts`.

**Separation of Concerns** — Canvas logic lives in `flow-builder.tsx`, node rendering is isolated per node folder, API logic lives in `src/mocks/api.ts`, and state is managed centrally in Zustand. None of these layers know about each other directly.

**Dynamic Property Panels** — Each node type declares its own `propertyPanel` component. The `NodePropertyPanel` looks up the correct panel at runtime via the registry — no switch statements, fully extensible.

**Mock API as a Real Abstraction** — `src/mocks/api.ts` is structured to mirror a real REST API (typed interfaces, exported functions). Swapping it for a real backend requires only changing the import targets — no component changes needed.

**BFS Simulation** — The `simulateWorkflow` function performs a breadth-first traversal of the graph starting from the Start node, producing an ordered execution log. This correctly handles linear and branching workflows.

---

## Tech Stack

| Technology | Usage |
|---|---|
| Next.js 14 | App framework (SSR, routing) |
| React Flow (@xyflow/react) | Workflow canvas, nodes, edges |
| TypeScript | Full type safety throughout |
| Zustand + Immer | Global state management |
| Tailwind CSS | Styling |
| shadcn/ui | UI component library |
| nanoid | Unique ID generation |

---

## What I Completed

- ✅ All 5 node types with full configuration forms
- ✅ Drag-and-drop canvas with connect/delete
- ✅ Mock API layer (automations + simulate)
- ✅ Sandbox simulation panel with step-by-step log
- ✅ Dynamic action parameters in Automated Step node
- ✅ Two pre-built HR workflows (Onboarding, Leave Approval)
- ✅ Dark/light theme toggle
- ✅ MiniMap and zoom controls (bonus)

## What I Would Add With More Time

- Export/Import workflow as JSON
- Workflow validation errors shown visually on nodes (red border)
- Undo/Redo using `useUndoable`
- Auto-layout using ELKjs or Dagre
- Unit tests with Jest/RTL for node forms and simulation logic
- Persistent storage via a real backend (FastAPI + PostgreSQL)
```

