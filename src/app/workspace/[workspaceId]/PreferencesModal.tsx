import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRemoveWorkspace } from "@/features/workspaces/hooks/use-remove-workspace";
import { useUpdateWorkspace } from "@/features/workspaces/hooks/use-update-workspace";
import { useConfirm } from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, FormEvent, useState } from "react";
import { toast } from "sonner";

interface PreferencesModalPropsType {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
}

export const PreferencesModal: FC<PreferencesModalPropsType> = ({ open, setOpen, initialValue }) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const [ConfirmDialog, confirmRemoval] = useConfirm("Are you sure?", "this action is irreversible.");

  const [value, setValue] = useState(initialValue);
  const [editOpen, setEditOpen] = useState(false);

  const { mutate: update, isPending: isUpdating } = useUpdateWorkspace();
  const { mutate: remove, isPending: isRemoving } = useRemoveWorkspace();

  const handleEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    update(
      { id: workspaceId, name: value },
      {
        onSuccess: () => {
          setEditOpen(false);
          toast.success("Updated");
        },
        onError: () => toast.error("Failed to update workspace"),
      }
    );
  };

  const handleRemove = async () => {
    const ok = await confirmRemoval();

    if (!ok) return;

    remove(
      { id: workspaceId },
      {
        onSuccess: () => {
          setEditOpen(false);
          router.replace(`/`);
          toast.success("Workspace removed");
        },
        onError: () => toast.error("Failed to remove workspace"),
      }
    );
  };

  return (
    <>
      <ConfirmDialog />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle>{value}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Workspace name</p>
                    <p className="text-sm text-[#1264a3] hover:underline font-semibold">Edit</p>
                  </div>
                  <p className="text-sm">{value}</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename this workspace</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleEdit}>
                  <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={isUpdating}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={80}
                    placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant={"outline"} disabled={isUpdating}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button disabled={isUpdating}>Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <button
              disabled={isRemoving}
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
            >
              <TrashIcon className="size-4" />
              <p className="text-sm font-semibold">Delete workspace</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
