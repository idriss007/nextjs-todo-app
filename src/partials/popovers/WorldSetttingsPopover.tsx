import { Menu } from "@headlessui/react";
import { Button } from "@/components";
import clsx from "clsx";
import { useRouter } from "next/router";
import { RESET } from "jotai/utils";
import {
  MdOutlineDeleteForever,
  MdOutlineMoreVert,
  MdOutlinePlaylistRemove,
} from "react-icons/md";
import en from "@/lang/en.json";
import { TodoItem } from "@/types";

type WorldsPopoverProps = {
  todos: TodoItem[];
  setTodos: any;
  setTodoWorldNames: any;
};

const WorldsPopover = (props: WorldsPopoverProps) => {
  const { setTodos, setTodoWorldNames, todos } = props;

  const router = useRouter();
  const spaceName = router.query.id as string;

  //   const [todoWorldNames, setTodoWorldNames] = useAtom(todoWorldNamesAtom);

  const deleteAllTodos = () => {
    if (confirm(en.deleteAllTodosConfirmationMessage)) {
      setTodos(RESET);
    }
  };

  console.log(todos.length);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="flex justify-center items-center">
        <Menu.Button className="outline-none border-none">
          <MdOutlineMoreVert
            size={25}
            className={"dark:text-white text-black"}
          />
        </Menu.Button>
      </div>

      <Menu.Items className="absolute z-10 right-0 md:right-auto md:left-[50%] md:translate-x-[-50%] mt-1 outline-none border-none">
        <div className="flex flex-col min-w-[170px] max-w-[170px] outline-none border-none">
          <Menu.Item as="a" key="1">
            <Button
              bgColor="hover:bg-stone-400 bg-stone-800 dark:hover:bg-stone-200"
              textColor=""
              width="w-full"
              padding="py-2 px-4"
              disabled={!(todos.length > 0)}
              hover=""
              rounded="none"
              onClick={deleteAllTodos}
              className={clsx(
                `${
                  todos.length > 0
                    ? "text-red-600 dark:text-red-500"
                    : "text-gray-600 dark:text-gray-600"
                }`,
                "justify-between items-center flex-1 flex dark:bg-stone-700"
              )}
            >
              <p className="truncate">Delete to-dos</p>
              <div className="max-w-[40px]">
                <MdOutlinePlaylistRemove size={20} />
              </div>
            </Button>
          </Menu.Item>
          <Menu.Item as="a" key="2">
            <Button
              bgColor="hover:bg-stone-400 bg-stone-800 dark:hover:bg-stone-200"
              textColor="text-red-600 dark:text-red-500"
              width="w-full"
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
                "justify-between items-center flex-1 flex dark:bg-stone-700"
              )}
            >
              <p className="truncate">Delete world</p>
              <div className="max-w-[40px]">
                <MdOutlineDeleteForever size={20} />
              </div>
            </Button>
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default WorldsPopover;
