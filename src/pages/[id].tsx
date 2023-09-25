import {
  Button,
  CircularLoadingSpinner,
  DraggableItems,
  ProgressBar,
} from "@/components";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import en from "@/lang/en.json";
import { MdAdd } from "react-icons/md";

import { useAtom } from "jotai";
import { generateUniqeId, todosAtom, todoWorldNamesAtom } from "@/helpers";
import sanitizeHtml from "sanitize-html";
import { WorldSetttingsPopover } from "@/partials";
import Head from "next/head";

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

  if (!spaceName) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <CircularLoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 items-center mt-5">
      <Head>
        <title>{spaceName}</title>
      </Head>
      <div className="w-full md:w-3/5">
        <div className="flex justify-between items-center">
          <p className="font-bold text-2xl">{en._todoWorld.toDo}</p>
          <WorldSetttingsPopover
            todos={todos}
            setTodos={setTodos}
            setTodoWorldNames={setTodoWorldNames}
          />
        </div>
        <hr className="border-gray-200 dark:border-stone-700 my-2" />
        <div className="mb-4 leading-8 select-none">
          <ProgressBar
            label="Progress"
            value={todos.length <= 0 ? 0 : completedTodosRatio}
          />
          <p className="text-end">
            {`${todos.filter((todo) => todo.completed === true).length}/${
              todos.length
            } completed`}
          </p>
        </div>
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
              setTodo(sanitizeHtml((e.target as HTMLInputElement).value))
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
