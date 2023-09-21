import { todoWorldNamesAtom } from "@/helpers";
import { useAtom } from "jotai";
import { useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { MdAdd, MdOutlineChecklist } from "react-icons/md";
import { Button, Modal } from "@/components";
import CreateWorldForm from "../forms/CreateWorldForm";
import { Menu } from "@headlessui/react";

const WorldsPopover = () => {
  const router = useRouter();
  const spaceName = router.query.id as string;

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const [todoWorldNames, setTodoWorldNames] = useAtom(todoWorldNamesAtom);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Modal
        title="Create your own special to-dos world"
        open={openModal}
        setOpen={setOpenModal}
      >
        <CreateWorldForm handleClose={handleClose} margin="mb-5" />
      </Modal>
      <div className="flex justify-center items-center">
        <Menu.Button className="outline-none border-none">
          <MdOutlineChecklist
            size={25}
            className={"dark:text-white text-black"}
          />
        </Menu.Button>
      </div>

      <Menu.Items className="absolute z-10 left-[50%] translate-x-[-50%] mt-1 outline-none border-none">
        <div className="flex flex-col min-w-[139px] max-w-[139px] max-h-[200px] min-h-[200px] overflow-y-auto overflow-x-hidden">
          {todoWorldNames.map((todoWorld, i) => (
            <Menu.Item as="a" key={i}>
              <Button
                bgColor="hover:bg-stone-400 bg-stone-800 dark:hover:bg-stone-200"
                textColor="hover:text-black text-white"
                width="w-full"
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
            <Menu.Item as="a" key={todoWorldNames.length}>
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
