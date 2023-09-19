import {
  Button,
  DraggableItems,
  ProgressBar,
  WorldSetttingsPopover,
} from "@/components";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import en from "@/lang/en.json";
import { MdAdd, MdOutlineDeleteForever } from "react-icons/md";

import { useAtom } from "jotai";
import { todosAtom, todoWorldNamesAtom } from "@/helpers";
import { LinearProgress } from "@mui/material";
import { RESET } from "jotai/utils";

const Page = () => {
  const router = useRouter();
  const spaceName = router.query.id! as string;

  const [isScrolled, setIsScrolled] = useState(false);
  const [todo, setTodo] = useState("");
  const [todoWorldNames, setTodoWorldNames] = useAtom(todoWorldNamesAtom);
  const [todos, setTodos] = useAtom(todosAtom(spaceName));

  const boxRef = useRef<HTMLDivElement>(null);

  const completedTodosRatio = useMemo(() => {
    return Math.round(
      (todos.filter((todo) => todo.completed === true).length / todos.length) *
        100
    );
  }, [todos]);

  useEffect(() => {
    if (isScrolled) {
      boxRef.current?.scrollIntoView({ behavior: "instant" });
      setIsScrolled(false);
    }
    const isExist = todoWorldNames.find((name) => name === spaceName);

    if (!isExist && spaceName !== undefined) {
      setTodoWorldNames((prevValues: string[]) => {
        if (prevValues.length <= 0) {
          return [spaceName];
        } else {
          const isWorldExist = prevValues.includes(spaceName);
          if (!isWorldExist) {
            return [...prevValues, spaceName.trim()];
          } else {
            return [...prevValues];
          }
        }
      });
    }
  }, [spaceName, isScrolled]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedTodoText = todo.trim();

    if (normalizedTodoText.length > 0 && normalizedTodoText !== undefined) {
      setTodos((prevValues) => {
        return [
          ...prevValues,
          {
            id: generateUniqeId(),
            text: todo,
            completed: false,
          },
        ];
      });
      setTodo("");
      setIsScrolled(true);
    }
  };

  const generateUniqeId = () => {
    return Math.floor(Math.random() * Date.now());
  };

  const deleteAllTodos = () => {
    if (confirm(en.deleteAllTodosConfirmationMessage)) {
      setTodos(RESET);
    }
  };

  if (!spaceName) {
    return (
      <div className="h-screen w-full md:w-3/5 flex flex-col justify-center m-auto">
        <LinearProgress color="inherit" />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 items-center mt-5">
      <div className="w-full md:w-3/5">
        <div className="flex justify-between items-center">
          <p className="font-bold text-2xl">{en._todoWorld.toDo}</p>
          {/* <Button
            hover=""
            padding="p-2"
            rounded="rounded-lg"
            bgColor="hover:bg-red-100 dark:hover:bg-red-950"
            textColor="text-red-600 dark:text-red-400"
            onClick={deleteAllTodos}
          >
            <MdOutlineDeleteForever className="text-2xl" />
          </Button> */}
          <WorldSetttingsPopover
            setTodos={setTodos}
            setTodoWorldNames={setTodoWorldNames}
          />
        </div>
        <hr className="border-gray-200 dark:border-stone-700 my-2" />
        <div className="mb-4 leading-8 select-none">
          <div className="flex justify-between">
            <p>{en._todoWorld.progressBar}</p>
            <p>{todos.length <= 0 ? "0%" : `${completedTodosRatio}%`}</p>
          </div>
          <ProgressBar value={todos.length <= 0 ? 0 : completedTodosRatio} />
          <p className="text-end">
            {`${todos.filter((todo) => todo.completed === true).length}/${
              todos.length
            } completed`}
          </p>
        </div>
        {/* )} */}
        <div className="flex flex-col max-h-72 md:max-h-96 h-72 md:h-96 overflow-y-auto overflow-x-hidden">
          <DraggableItems />
          <div ref={boxRef} />
        </div>
        <form
          className="flex gap-5 md:gap-3 mt-4"
          action=""
          onSubmit={handleSubmit}
        >
          <input
            className="w-full p-2 dark:bg-black text-black dark:text-gray-300 placeholder:dark:text-gray-600 outline outline-0 focus:outline-1
          outline-indigo-600 border border-1 border-gray-400 focus:border-transparent rounded-sm"
            type="text"
            value={todo}
            placeholder={en._createTodo.inputPlaceholder}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setTodo((e.target as HTMLInputElement).value)
            }
          />
          <Button
            position="flex justify-center items-center"
            width="w-10"
            height=""
            type="submit"
          >
            <MdAdd />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
