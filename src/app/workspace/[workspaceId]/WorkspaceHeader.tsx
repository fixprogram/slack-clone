import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Doc } from "../../../../convex/_generated/dataModel";
import { FC, useState } from "react";
import { ChevronDown, ListFilter, SquarePen } from "lucide-react";
import { Hint } from "@/components/hint";
import { PreferencesModal } from "./PreferencesModal";

interface WorkspaceHeaderPropsType {
  workspace: Doc<"workspaces">;
  isAdmin: boolean;
}

export const WorkspaceHeader: FC<WorkspaceHeaderPropsType> = ({ workspace, isAdmin }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <PreferencesModal open={open} setOpen={setOpen} initialValue={workspace.name} />
      <div className="flex items-center justify-between px-4 h-[49px] gap-0.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"transparent"} className="font-semibold text-lg w-auto p-1.5 overflow-hidden" size={"sm"}>
              <span className="truncate">{workspace.name}</span>
              <ChevronDown className="size-4 ml-1 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start" className="w-64">
            <DropdownMenuItem className="cursor-pointer capitalize">
              <div className="size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center justify-center">
                {workspace.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col items-start">
                <p className="font-bold ">{workspace.name}</p>
                <p className="text-xs text-muted-foreground">Active workspace</p>
              </div>
            </DropdownMenuItem>
            {isAdmin && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer py-2" onClick={() => {}}>
                  Invite people to {workspace.name}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer py-2" onClick={() => setOpen(true)}>
                  Preferences
                </DropdownMenuItem>
                {/* TODO */}
                {/* <PreferencesDropdownMenuItem workspace={workspace} /> */}
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-0.5">
          <Hint label="Filter conversations" side="bottom">
            <Button variant={"transparent"} size={"iconSm"}>
              <ListFilter size={4} />
            </Button>
          </Hint>
          <Hint label="New message" side="bottom">
            <Button variant={"transparent"} size={"iconSm"}>
              <SquarePen size={4} />
            </Button>
          </Hint>
        </div>
      </div>
    </>
  );
};
