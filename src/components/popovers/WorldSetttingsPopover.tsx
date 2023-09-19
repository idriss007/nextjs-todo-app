import { todoWorldNamesAtom } from "@/helpers";
import { Menu } from "@headlessui/react";
import { useAtom } from "jotai";
import { Fragment, useState } from "react";
import Button from "../buttons/Button";
import clsx from "clsx";
import { useRouter } from "next/router";
import { RESET } from "jotai/utils";
import {
  MdAdd,
  MdOutlineDeleteForever,
  MdOutlineMoreVert,
  MdReorder,
} from "react-icons/md";
import en from "@/lang/en.json";
import CreateWorldModal from "../modals/CreateWorldModal";

type WorldsPopoverProps = {
  setTodos: any;
  setTodoWorldNames: any;
};

const WorldsPopover = (props: WorldsPopoverProps) => {
  const { setTodos, setTodoWorldNames } = props;

  const router = useRouter();
  const spaceName = router.query.id as string;

  //   const [todoWorldNames, setTodoWorldNames] = useAtom(todoWorldNamesAtom);

  const deleteAllTodos = () => {
    if (confirm(en.deleteAllTodosConfirmationMessage)) {
      setTodos(RESET);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="flex justify-center items-center">
        <Menu.Button>
          <MdOutlineMoreVert
            size={25}
            className={"dark:text-white text-black"}
          />
        </Menu.Button>
      </div>

      <Menu.Items className="absolute z-10 right-0 md:right-auto md:left-[50%] md:translate-x-[-50%] mt-1">
        <div className="flex flex-col max-w-[133px]">
          <Menu.Item key="1">
            <Button
              bgColor="hover:bg-stone-400 bg-stone-800 dark:hover:bg-stone-200"
              textColor="hover:text-black text-white"
              width="100%"
              padding="py-2 px-4"
              hover=""
              rounded="none"
              onClick={deleteAllTodos}
              className={clsx(
                "justify-center items-center flex-1 flex dark:bg-stone-700 text-sm"
              )}
            >
              <p className="truncate">Delete to-dos</p>
            </Button>
          </Menu.Item>
          <Menu.Item key="1">
            <Button
              bgColor="hover:bg-stone-400 bg-stone-800 dark:hover:bg-stone-200"
              textColor="hover:text-black text-white"
              width="100%"
              padding="py-2 px-4"
              hover=""
              rounded="none"
              onClick={() => {
                if (confirm(en.deleteWorldConfirmationMessage)) {
                  setTodoWorldNames((prevValue: string[]) => {
                    const updatedTodoWorlds = prevValue.filter(
                      (oldTodoWorld) => oldTodoWorld !== spaceName
                    );
                    return updatedTodoWorlds;
                  });
                  setTodos(RESET);
                  router.push("/");
                }
              }}
              className={clsx(
                "justify-center items-center flex-1 flex dark:bg-stone-700 text-sm"
              )}
            >
              <p className="truncate">Delete world</p>
            </Button>
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default WorldsPopover;
