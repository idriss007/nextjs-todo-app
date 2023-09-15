import {
  MdAdd,
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
import { useState, useEffect } from "react";
import { CreateWorldModal } from "@/components";

import { useAtom } from "jotai";
import { darkModeAtom } from "@/helpers";
import { todoWorldNamesAtom } from "@/helpers";

const Navbar = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const [todoWorldNames, setTodoWorldNames] = useAtom(todoWorldNamesAtom);

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  useEffect(() => {}, [openModal]);

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
      <CreateWorldModal open={openModal} handleClose={handleClose} />
      <Link className="font-bold flex-1" href={"/"}>
        <p>{en.appTitle}</p>
      </Link>
      <div className="flex-1 w-1/3 whitespace-nowrap flex justify-center items-center">
        {router.pathname !== "/" &&
          (router.query.id ? (
            <p className="text-xl break-keep overflow-auto">
              {router.query.id}
            </p>
          ) : (
            <CircularProgress
              size={25}
              className="dark:text-white text-black"
            />
          ))}
      </div>
      <div className="flex-1 flex justify-end items-center gap-4">
        {todoWorldNames.length > 0 && (
          <PopoverButton
            additionalFields={
              <Button
                className="flex justify-center items-center"
                hover="dark:hover:bg-stone-500 hover:bg-stone-200"
                width="w-full"
                rounded="rounded-t-none"
                padding="py-2 px-4"
                textColor="text-lime-300 hover:text-green-500"
                bgColor="bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-200"
                onClick={handleOpen}
              >
                <MdAdd />
                <p>New world</p>
              </Button>
            }
          >
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
