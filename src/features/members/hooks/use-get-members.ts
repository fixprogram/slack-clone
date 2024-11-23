import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface useGetMembersPropsType {
  workspaceId: Id<"workspaces">;
}

export const useGetMembers = ({ workspaceId }: useGetMembersPropsType) => {
  const data = useQuery(api.members.get, { workspaceId });
  return { data, isLoading: data === undefined };
};
