import { Button, TodoItem } from "@/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import en from "@/lang/en.json";
import { MdAdd } from "react-icons/md";

import { useAtom } from "jotai";
import { todoTextAtom, todosAtom } from "@/helpers";

const Page = () => {
  const router = useRouter();
  const spaceName = router.query.id! as string;

  const [todo, setTodo] = useAtom(todoTextAtom);
  const [todos, setTodos] = useAtom(todosAtom(spaceName));

  useEffect(() => {
    const worldNames = localStorage.getItem("todoWorldNames")?.split(",");
    const names = worldNames?.map((name) => name.trim());

    const isExist = names?.find((name) => name === (spaceName as string));

    if (!isExist && spaceName !== undefined) {
      localStorage.setItem(
        "todoWorldNames",
        `${worldNames ? `${worldNames}, ${spaceName}` : `${spaceName}`}`
      );
    }
  }, [router.query.id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (todo.length > 0 && todos !== undefined) {
      setTodos((prevValues) => {
        return [
          ...prevValues,
          { id: generateUniqeId(), text: todo, completed: false },
        ];
      });
      setTodo("");
    }
  };

  const generateUniqeId = () => {
    return Math.floor(Math.random() * Date.now());
  };

  if (!spaceName) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <div className="">
        <div className="flex flex-col gap-0">
          {todos?.length > 0
            ? todos.map((todo, i) => {
                return <TodoItem key={i} todo={todo} spaceName={spaceName} />;
              })
            : null}
        </div>
        <form
          className="flex gap-5 md:gap-10 mt-4"
          action=""
          onSubmit={handleSubmit}
        >
          <input
            className="w-full p-2 dark:bg-neutral-600 outline outline-0 focus:outline-1
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
