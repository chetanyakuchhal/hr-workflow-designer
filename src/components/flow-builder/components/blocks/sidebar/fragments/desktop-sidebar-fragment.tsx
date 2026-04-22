import { useEffect } from "react";
import { SwitchSidebarPanel } from "../components/sidebar-switch-panel";
import SidebarButtonItem from "../components/sidebar-button-item";
import { Icon } from "@iconify/react";

type ActivePanel = "node-properties" | "available-nodes" | "sandbox" | "none";

type DesktopSidebarFragmentProps = Readonly<{
  activePanel: ActivePanel;
  setActivePanel: (panel: ActivePanel) => void;
}>;

export function DesktopSidebarFragment({
  activePanel,
  setActivePanel,
}: DesktopSidebarFragmentProps) {
  useEffect(() => {
    if (activePanel === "none") {
      setActivePanel("available-nodes");
    }
  }, [activePanel, setActivePanel]);

  return (
    <div className="relative max-w-sm w-fit flex shrink-0 divide-x divide-card-foreground/10">
      {activePanel !== "none" && (
        <div className="min-w-xs grow bg-card">
          <SwitchSidebarPanel active={activePanel} />
        </div>
      )}

      <div className="shrink-0 bg-card p-1.5">
        <div className="h-full flex flex-col gap-2">
          <SidebarButtonItem
            active={activePanel === "available-nodes"}
            onClick={() => setActivePanel("available-nodes")}
          >
            <Icon icon="mynaui:grid" className="size-5" />
          </SidebarButtonItem>

          <div className="mx-auto h-px w-4 bg-card-foreground/10" />

          <SidebarButtonItem
            active={activePanel === "node-properties"}
            onClick={() => setActivePanel("node-properties")}
          >
            <Icon icon="mynaui:layers-three" className="size-5" />
          </SidebarButtonItem>

          <div className="mx-auto h-px w-4 bg-card-foreground/10" />

          <SidebarButtonItem
            active={activePanel === "sandbox"}
            onClick={() => setActivePanel("sandbox")}
          >
            <Icon icon="solar:play-bold" className="size-5" />
          </SidebarButtonItem>
        </div>
      </div>
    </div>
  );
}