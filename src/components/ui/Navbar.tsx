import {
  MdDarkMode,
  MdDensityMedium,
  MdDensitySmall,
  MdLightMode,
  MdReorder,
} from "react-icons/md";
import Button from "../buttons/Button";
import { useRouter } from "next/router";
import Link from "next/link";
import en from "@/lang/en.json";
import { CircularProgress } from "@mui/material";
import PopoverButton from "../buttons/PopoverButton";

import { useAtom } from "jotai";
import { darkModeAtom } from "@/helpers";
import { todoWorldNamesAtom } from "@/helpers";

const Navbar = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const [todoWorldNames, setTodoWorldNames] = useAtom(todoWorldNamesAtom);

  const router = useRouter();

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
    <div className="flex w-full justify-between items-center">
      <Link className="font-bold flex-1" href={"/"}>
        {en.appTitle}
      </Link>
      <div className="flex-1 flex justify-center items-center">
        {router.pathname !== "/" &&
          (router.query.id ? (
            router.query.id
          ) : (
            <CircularProgress
              size={25}
              className="dark:text-white text-black"
            />
          ))}
      </div>
      <div className="flex-1 flex justify-end items-center gap-4">
        {todoWorldNames.length > 0 && (
          <PopoverButton>
            <MdReorder
              size={25}
              className={darkMode ? "text-white" : "text-black"}
            />
          </PopoverButton>
        )}

        {/* <MdDensitySmall className={darkMode ? "text-white" : "text-black"} /> */}

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
