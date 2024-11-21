import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface UseCurrentMemberPropsType {
  workspaceId: Id<"workspaces">;
}

export const useCurrentMember = ({ workspaceId }: UseCurrentMemberPropsType) => {
  const data = useQuery(api.members.current, { workspaceId });
  return { data, isLoading: data === undefined };
};
