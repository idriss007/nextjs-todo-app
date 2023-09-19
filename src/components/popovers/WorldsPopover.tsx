import { todoWorldNamesAtom } from "@/helpers";
import { Menu } from "@headlessui/react";
import { useAtom } from "jotai";
import { Fragment, useState } from "react";
import Button from "../buttons/Button";
import clsx from "clsx";
import { useRouter } from "next/router";
import { RESET } from "jotai/utils";
import { MdAdd, MdOutlineDeleteForever, MdReorder } from "react-icons/md";
import en from "@/lang/en.json";
import CreateWorldModal from "../modals/CreateWorldModal";

type WorldsPopoverProps = {
  setTodos: any;
};

const WorldsPopover = (props: WorldsPopoverProps) => {
  const { setTodos } = props;

  const router = useRouter();
  const spaceName = router.query.id as string;

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const [todoWorldNames, setTodoWorldNames] = useAtom(todoWorldNamesAtom);

  // const getPopoverButtons = () => {
  //   const buttons = todoWorldNames.map((todoWorld, i) => (
  //     <div
  //       className={clsx(
  //         "flex hover:bg-stone-400 hover:text-black text-white bg-stone-800 dark:bg-stone-800 dark:hover:bg-stone-200"
  //       )}
  //       key={i}
  //     >
  //       <Button
  //         bgColor="inherit"
  //         textColor=""
  //         // width="100%"
  //         padding="py-2 px-4"
  //         hover=""
  //         rounded="rounded-none"
  //         className="flex-1 max-w-[100px]"
  //         onClick={() => router.push(`/${todoWorld}`)}
  //       >
  //         <p className="truncate">{todoWorld}</p>
  //       </Button>
  //       <Button
  //         bgColor="inherit"
  //         textColor=""
  //         height="h-auto"
  //         padding="py-2 px-4"
  //         hover="hover:text-red-500"
  //         rounded="rounded-none"
  //         className="flex-1 flex flex-col justify-center items-center max-w-[20px] text-lg"
  //         onClick={() => {
  //           if (confirm(en.deleteWorldConfirmationMessage)) {
  //             setTodoWorldNames((prevValue) => {
  //               const updatedTodoWorlds = prevValue.filter(
  //                 (oldTodoWorld) => oldTodoWorld !== todoWorld
  //               );
  //               return updatedTodoWorlds;
  //             });
  //             setTodos(RESET);
  //             spaceName === todoWorld ? router.push("/") : null;
  //           }
  //         }}
  //       >
  //         <MdOutlineDeleteForever />
  //       </Button>
  //     </div>
  //   ));
  //   return buttons;
  // };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <CreateWorldModal open={openModal} handleClose={handleClose} />
      <div className="flex justify-center items-center">
        <Menu.Button>
          <MdReorder size={25} className={"dark:text-white text-black"} />
        </Menu.Button>
      </div>

      <Menu.Items className="absolute z-10 left-[50%] translate-x-[-50%] mt-1">
        <div className="flex flex-col min-w-[133px] max-w-[133px]">
          {todoWorldNames.map((todoWorld, i) => (
            <Menu.Item key={i}>
              <Button
                bgColor="hover:bg-stone-400 bg-stone-800 dark:hover:bg-stone-200"
                textColor="hover:text-black text-white"
                width="100%"
                padding="py-2 px-4"
                hover=""
                rounded="rounded-none"
                className={clsx(
                  "justify-center items-center flex-1 flex dark:bg-stone-700 "
                )}
                onClick={() => router.push(`/${todoWorld}`)}
              >
                <p className="truncate">{todoWorld}</p>
              </Button>
            </Menu.Item>
          ))}
          {spaceName && (
            <Menu.Item key={todoWorldNames.length}>
              <Button
                className="flex justify-center items-center"
                hover="hover:bg-stone-400 dark:hover:bg-stone-200"
                width="w-full"
                rounded="rounded-none"
                padding="py-2 px-4"
                textColor="text-lime-300 hover:text-lime-200 dark:hover:text-lime-500"
                bgColor="dark:bg-stone-700 bg-stone-800"
                onClick={handleOpen}
              >
                <MdAdd size={18} />
                <p>New world</p>
              </Button>
            </Menu.Item>
          )}
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default WorldsPopover;
