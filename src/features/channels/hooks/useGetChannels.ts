import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

interface UseGetChannelArgumentsType {
  workspaceId: Id<"workspaces">;
}

export const useGetChannels = ({ workspaceId }: UseGetChannelArgumentsType) => {
  const data = useQuery(api.channels.get, { workspaceId });

  return { data, isLoading: data === undefined };
};
