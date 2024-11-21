import { useCurrentMember } from "@/features/members/hooks/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/hooks/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { AlertTriangle, Loader } from "lucide-react";
import { WorkspaceHeader } from "./WorkspaceHeader";

export const WorkspaceSidebar = () => {
  const id = useWorkspaceId();

  const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId: id });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id });

  if (memberLoading || workspaceLoading) {
    return (
      <div className="flex flex-col bg-[#5e2c5f] h-full items-center justify-center">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className="flex flex-col gap-y-2 bg-[#5e2c5f] h-full items-center justify-center">
        <AlertTriangle className="size-5 text-white" />
        <p className="text-white text-sm">Workspace not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#5e2c5f] h-full">
      <WorkspaceHeader workspace={workspace} isAdmin={member.role === "admin"} />
    </div>
  );
};
