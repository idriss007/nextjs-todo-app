import * as React from "react";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Button from "./Button";

import { useAtom } from "jotai";
import { todoWorldNamesAtom } from "@/helpers";
import { useRouter } from "next/router";
import { ThemeProvider, createTheme } from "@mui/material";
import { MdOutlineDeleteForever } from "react-icons/md";
import en from "@/lang/en.json";

type PopoverButtonProps = {
  children: any;
};

export default function PopoverButton(props: PopoverButtonProps) {
  const { children } = props;

  const router = useRouter();

  const [todoWorldNames, setTodoWorldNames] = useAtom(todoWorldNamesAtom);

  const { id } = router.query;

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
          <div>
            <Button bgColor="inherit" hover="" {...bindTrigger(popupState)}>
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
              <div className="bg-stone-700 flex flex-col">
                {todoWorldNames.map((todoWorld, i) => (
                  <div className="flex" key={i}>
                    <Button
                      bgColor={id === todoWorld ? "bg-stone-400" : "inherit"}
                      textColor="text-white hover:text-black dark:text-white dark:hover:text-black"
                      // width="100%"
                      padding="py-2 px-4"
                      hover="hover:bg-stone-200"
                      rounded="rounded-none"
                      className="flex-1"
                      onClick={() => router.push(`/${todoWorld}`)}
                    >
                      <p>{todoWorld}</p>
                    </Button>
                    <Button
                      bgColor={id === todoWorld ? "bg-stone-400" : "inherit"}
                      textColor="text-white hover:text-black dark:text-white dark:hover:text-black"
                      height="h-auto"
                      padding="py-2 px-4"
                      hover="hover:bg-red-200"
                      rounded="rounded-none"
                      className="flex-1 flex flex-col justify-center items-center max-w-[20px]"
                      onClick={() => {
                        if (confirm(en.deleteWorldConfirmationMessage)) {
                          setTodoWorldNames((prevValue) => {
                            const updatedTodoWorlds = prevValue.filter(
                              (oldTodoWorld) => oldTodoWorld !== todoWorld
                            );
                            return updatedTodoWorlds;
                          });
                          id === todoWorld ? router.push("/") : null;
                        }
                      }}
                    >
                      <MdOutlineDeleteForever className="text-red-500 text-lg dark:text-red-400" />
                    </Button>
                  </div>
                ))}
              </div>
            </Popover>
          </div>
        )}
      </PopupState>
    </ThemeProvider>
  );
}
