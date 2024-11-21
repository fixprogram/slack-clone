import { useQuery } from "convex/react";

import { api } from "../../../../convex/_generated/api";

export const useGetWorkspaces = () => {
  const data = useQuery(api.workspaces.get);

  return { data, isLoading: data === undefined };
};
