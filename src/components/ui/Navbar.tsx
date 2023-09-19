import { MdDarkMode, MdLightMode } from "react-icons/md";
import Button from "../buttons/Button";
import { useRouter } from "next/router";
import Link from "next/link";
import en from "@/lang/en.json";
import { CircularProgress } from "@mui/material";
import { WorldsPopover } from "@/components";

import { useAtom } from "jotai";
import { darkModeAtom, todosAtom } from "@/helpers";
import { todoWorldNamesAtom } from "@/helpers";

const Navbar = () => {
  const router = useRouter();
  const spaceName = router.query.id as string;

  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const [todoWorldNames, setTodoWorldNames] = useAtom(todoWorldNamesAtom);
  const [todos, setTodos] = useAtom(todosAtom(spaceName));

  const switchTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
      return;
    }
    document.documentElement.classList.add("dark");
    setDarkMode(true);
  };

  return (
    <div className="flex w-full justify-between items-center min-h-[40px] max-h-[40px]">
      <Link className="font-bold flex-1" href={"/"}>
        <p>{en.appTitle}</p>
      </Link>
      <div className="flex-1 w-1/3 whitespace-nowrap flex justify-center items-center">
        {router.pathname !== "/" &&
          (spaceName ? (
            <p className="text-xl break-keep overflow-auto">{spaceName}</p>
          ) : (
            <CircularProgress
              size={25}
              className="dark:text-white text-black"
            />
          ))}
      </div>
      <div className="flex-1 flex justify-end items-center gap-4">
        {todoWorldNames.length > 0 && <WorldsPopover setTodos={setTodos} />}

        <Button padding="p-0" bgColor="inherit" hover="" onClick={switchTheme}>
          {darkMode ? (
            <MdLightMode color="white" size={25} />
          ) : (
            <MdDarkMode color="black" size={25} />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
