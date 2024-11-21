// import { FC, useState } from "react";
// import { PreferencesModal } from "./PreferencesModal";
// import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
// import { Doc } from "../../../../convex/_generated/dataModel";

// interface PreferencesDropdownMenuItemPropsType {
//   workspace: Doc<"workspaces">;
// }

// export const PreferencesDropdownMenuItem: FC<PreferencesDropdownMenuItemPropsType> = ({ workspace }) => {
//   const [open, setOpen] = useState(false);

//   console.log("open: ", open);

//   return (
//     <>
//       <PreferencesModal open={open} setOpen={setOpen} initialValue={workspace.name} />

//       <DropdownMenuItem className="cursor-pointer py-2" onClick={() => setOpen(true)}>
//         Preferences
//       </DropdownMenuItem>
//     </>
//   );
// };
