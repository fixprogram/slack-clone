import { useCurrentMember } from "@/features/members/hooks/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/hooks/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { AlertTriangle, HashIcon, Loader, MessageSquareText, SendHorizontal } from "lucide-react";
import { WorkspaceHeader } from "./WorkspaceHeader";
import { SidebarItem } from "./SidebarItem";
import { useGetChannels } from "@/features/channels/hooks/useGetChannels";
import { WorkspaceSection } from "./WorkspaceSection";
import { useGetMembers } from "@/features/members/hooks/use-get-members";
import { UserItem } from "./UserItem";

export const WorkspaceSidebar = () => {
  const id = useWorkspaceId();

  const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId: id });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id });
  const { data: channels, isLoading: channelsLoading } = useGetChannels({ workspaceId: id });
  const { data: members, isLoading: membersLoading } = useGetMembers({ workspaceId: id });

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
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem label="Threads" icon={MessageSquareText} id="threads" />
        <SidebarItem label="Drafts & Sent" icon={SendHorizontal} id="drafts" />
      </div>
      <WorkspaceSection label="Channels" hint="New channel" onNew={() => {}}>
        {channels?.map((item) => <SidebarItem key={item._id} icon={HashIcon} label={item.name} id={item._id} />)}
      </WorkspaceSection>
      <WorkspaceSection label="Direct Messages" hint="New direct message" onNew={() => {}}>
        {members?.map((item) => (
          <UserItem key={item._id} id={item._id} label={item.user.name} image={item.user.image} />
        ))}
      </WorkspaceSection>
    </div>
  );
};
