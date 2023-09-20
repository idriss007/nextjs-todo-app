import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";
import en from "@/lang/en.json";

import { useAtom } from "jotai";
import { darkModeAtom } from "@/helpers";
import { todoWorldNamesAtom } from "@/helpers";
import WorldsPopover from "../popovers/WorldsPopover";
import { Button, CircularLoadingSpinner } from "@/components";

const Navbar = () => {
  const router = useRouter();
  const spaceName = router.query.id as string;

  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const [todoWorldNames, setTodoWorldNames] = useAtom(todoWorldNamesAtom);

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
            <div className="flex justify-center items-center">
              <CircularLoadingSpinner />
            </div>
          ))}
      </div>
      <div className="flex-1 flex items-center gap-4  justify-end">
        {todoWorldNames.length > 0 && <WorldsPopover />}

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
