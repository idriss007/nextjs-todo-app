import { MdDarkMode, MdLightMode } from "react-icons/md";
import Button from "../buttons/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import en from "@/lang/en.json";

const Navbar = () => {
  const [theme, setTheme] = useState<string>();

  const router = useRouter();

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "light");
  }, [theme]);

  const switchTheme = () => {
    if (localStorage.getItem("theme") === "dark") {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
      setTheme("Light");
      return;
    }
    localStorage.setItem("theme", "dark");
    setTheme("Dark");
    document.documentElement.classList.add("dark");
  };

  return (
    <div className="flex w-full justify-between">
      <Link className="font-bold flex-1" href={"/"}>
        {en.appTitle}
      </Link>
      <div className="flex-1 text-center">
        {router.pathname !== "/" &&
          (router.query.id ? router.query.id : "Loading")}
      </div>
      <div className="flex-1 text-end">
        <Button padding="p-0" bgColor="inherit" hover="" onClick={switchTheme}>
          {theme === "dark" ? (
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
