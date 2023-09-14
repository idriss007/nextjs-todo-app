import { MdDarkMode, MdLightMode } from "react-icons/md";
import Button from "../buttons/Button";
import { useRouter } from "next/router";
import Link from "next/link";
import en from "@/lang/en.json";
import { darkModeAtom } from "@/helpers";
import { useAtom } from "jotai";
import { CircularProgress } from "@mui/material";

const Navbar = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

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
      <div className="flex-1 flex justify-end items-center">
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
