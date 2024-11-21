import { useMutation } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import { useCallback, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

type RequestType = { id: Id<"workspaces"> };
type ResponseType = Id<"workspaces"> | null;

type OptionsType = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: VoidFunction;
  throwError?: boolean;
};

export const useRemoveWorkspace = () => {
  const [data, setData] = useState<ResponseType>(null);
  const [error, setError] = useState<Error | null>(null);
  const [state, setState] = useState<"success" | "error" | "pending" | "settled" | "idle">("idle");

  const mutation = useMutation(api.workspaces.remove);

  const mutate = useCallback(
    async (values: RequestType, options?: OptionsType) => {
      try {
        setData(null);
        setError(null);
        setState("pending");
        const response = await mutation(values);
        setState("success");
        options?.onSuccess?.(response);
        return response;
      } catch (error) {
        setState("error");
        options?.onError?.(error as Error);
        if (options?.throwError) {
          throw error;
        }
      } finally {
        setState("settled");
        options?.onSettled?.();
      }
    },
    [mutation]
  );

  return {
    mutate,
    data,
    error,
    isError: state === "error",
    isPending: state === "pending",
    isSettled: state === "settled",
    isSuccess: state === "success",
  };
};
