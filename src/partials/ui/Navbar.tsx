import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";
import en from "@/lang/en.json";

import { useAtom } from "jotai";
import { todoWorldNamesAtom } from "@/helpers";
import WorldsPopover from "../popovers/WorldsPopover";
import { Button, CircularLoadingSpinner } from "@/components";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const spaceName = router.query.id as string;

  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const [todoWorldNames, setTodoWorldNames] = useAtom(todoWorldNamesAtom);

  const switchTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
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
          {mounted && resolvedTheme === "light" ? (
            <MdDarkMode color="black" size={25} />
          ) : (
            <MdLightMode color="white" size={25} />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
