import * as React from "react";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Button from "./Button";

import { useAtom } from "jotai";
import { todoWorldNamesAtom } from "@/helpers";
import { useRouter } from "next/router";

type PopoverButtonProps = {
  children: any;
};

export default function PopoverButton(props: PopoverButtonProps) {
  const { children } = props;

  const router = useRouter();

  const [todoWorldNames, setTodoWorldNames] = useAtom(todoWorldNamesAtom);

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button bgColor="inherit" hover="" {...bindTrigger(popupState)}>
            {children}
          </Button>
          <Popover
            className="rounded-none-important"
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
            <div className="bg-stone-800 dark:bg-white flex flex-col">
              {todoWorldNames.map((todoWorld, i) => (
                <Button
                  bgColor="inherit"
                  width="100%"
                  padding="py-2 px-4"
                  hover="hover:bg-stone-900 dark:hover:bg-stone-300"
                  rounded="rounded-none"
                  key={i}
                  onClick={() => router.push(`/${todoWorld}`)}
                >
                  {todoWorld}
                </Button>
              ))}
            </div>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
