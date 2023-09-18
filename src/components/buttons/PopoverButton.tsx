import * as React from "react";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Button from "./Button";

import { useAtom } from "jotai";
import { todoWorldNamesAtom, todosAtom } from "@/helpers";
import { useRouter } from "next/router";
import { ThemeProvider, createTheme } from "@mui/material";
import { MdAdd, MdOutlineDeleteForever } from "react-icons/md";
import en from "@/lang/en.json";
import { RESET } from "jotai/utils";
import clsx from "clsx";

type PopoverButtonProps = {
  children: any;
  additionalFields?: any;
};

export default function PopoverButton(props: PopoverButtonProps) {
  const { children, additionalFields } = props;

  const router = useRouter();
  const spaceName = router.query.id as string;

  const [todoWorldNames, setTodoWorldNames] = useAtom(todoWorldNamesAtom);
  const [todos, setTodos] = useAtom(todosAtom(spaceName));

  const theme = createTheme({
    components: {
      // Name of the component
      MuiPopover: {
        styleOverrides: {
          // Name of the slot
          paper: {
            // Some CSS
            backgroundColor: "transparent",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (
          <div className="flex justify-center items-center">
            <Button
              padding="p-0"
              bgColor="inherit"
              hover=""
              {...bindTrigger(popupState)}
            >
              {children}
            </Button>
            <Popover
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
              <div className="flex flex-col">
                {todoWorldNames.map((todoWorld, i) => (
                  <div
                    className={clsx(
                      "flex hover:bg-stone-200 hover:text-black text-white bg-stone-800 dark:bg-stone-800 dark:hover:bg-stone-200"
                    )}
                    key={i}
                  >
                    <Button
                      bgColor="inherit"
                      textColor=""
                      // width="100%"
                      padding="py-2 px-4"
                      hover=""
                      rounded="rounded-none"
                      className="flex-1 max-w-[100px]"
                      onClick={() => router.push(`/${todoWorld}`)}
                    >
                      <p className="truncate">{todoWorld}</p>
                    </Button>
                    <Button
                      bgColor=""
                      textColor=""
                      height="h-auto"
                      padding="py-2 px-4"
                      hover="hover:text-red-500"
                      rounded="rounded-none"
                      className="flex-1 flex flex-col justify-center items-center max-w-[20px] text-lg"
                      onClick={() => {
                        if (confirm(en.deleteWorldConfirmationMessage)) {
                          setTodoWorldNames((prevValue) => {
                            const updatedTodoWorlds = prevValue.filter(
                              (oldTodoWorld) => oldTodoWorld !== todoWorld
                            );
                            return updatedTodoWorlds;
                          });
                          setTodos(RESET);
                          spaceName === todoWorld ? router.push("/") : null;
                        }
                      }}
                    >
                      <MdOutlineDeleteForever />
                    </Button>
                  </div>
                ))}
                {spaceName ? additionalFields : null}
              </div>
            </Popover>
          </div>
        )}
      </PopupState>
    </ThemeProvider>
  );
}
