import { Button, TodoItem } from "@/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import en from "@/lang/en.json";
import { MdAdd } from "react-icons/md";

import { useAtom } from "jotai";
import {
  getTodoListAtom,
  todoListAtom,
  todoTextAtom,
  setTodoListAtom,
} from "@/helpers";

const Page = () => {
  const router = useRouter();
  const spaceName = router.query.id;

  const [todo, setTodo] = useAtom(todoTextAtom);
  const [todos] = useAtom(todoListAtom);
  const [, getTodoList] = useAtom(getTodoListAtom);
  const [, setTodoList] = useAtom(setTodoListAtom);

  useEffect(() => {
    getTodoList({ id: router.query.id });

    const worldNames = localStorage.getItem("todoWorldNames")?.split(",");
    const names = worldNames?.map((name) => name.trim());

    const isExist = names?.find((name) => name === (spaceName as string));

    if (!isExist && spaceName !== undefined) {
      localStorage.setItem(
        "todoWorldNames",
        `${worldNames ? `${worldNames}, ${spaceName}` : `${spaceName}`}`
      );
    }
  }, [spaceName]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      todo.length > 0 &&
      localStorage.getItem(`todo_${spaceName}`) !== undefined
    ) {
      const editedTodo = { text: todo, completed: false };

      const newTodos =
        todos?.length > 0
          ? JSON.stringify([...todos, editedTodo])
          : JSON.stringify([editedTodo]);

      localStorage.setItem(`todo_${spaceName}`, newTodos);
      setTodo("");
      newTodos && setTodoList({ text: todo, completed: false });
    }
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
                return (
                  <TodoItem
                    setTodoList={"setTodoList"}
                    key={i}
                    todo={todo}
                    todoId={i}
                  />
                );
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
