import { TodoItem } from "@/types";
import {
  MdOutlineClose,
  MdOutlineDeleteOutline,
  MdOutlineDone,
  MdOutlineMode,
} from "react-icons/md";
import Button from "../buttons/Button";
import { useRef, useState, useEffect } from "react";
import en from "@/lang/en.json";
import clsx from "clsx";
import { confirm } from "../confirm";

type TodoItemProps = {
  todo: TodoItem;
  handleEdit: any;
  handleDelete: any;
};

const TodoItem = (props: TodoItemProps) => {
  const { todo, handleEdit, handleDelete } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [todoText, setTodoText] = useState(todo.text);

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.select();
    }
  }, [ref, isEditing]);

  return (
    <div className="flex items-center justify-between flex-1 touch-auto overflow-y-auto overflow-x-hidden">
      <div className="flex gap-1 w-full items-center">
        <div className="">
          <Button
            bgColor={todo.completed ? "bg-green-500" : "bg-neutral-300"}
            hover="hover:bg-neutral-500"
            padding="p-1"
            width="100%"
            onClick={() => {
              handleEdit({ ...todo, completed: !todo.completed });
            }}
          >
            <MdOutlineDone
              visibility={todo.completed ? undefined : "hidden"}
              color="white"
            />
          </Button>
        </div>
        <div className="flex w-full">
          {isEditing ? (
            <input
              className={clsx(
                "bg-inherit dark:bg-inherit m-1 p-1 px-2 w-full resize-none overflow-hidden break-all",
                `${isEditing ? "" : "todoInputNotInEditMode"}`
              )}
              type="text"
              value={todoText}
              ref={ref}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTodoText((e.target as HTMLInputElement).value);
              }}
            />
          ) : (
            <p
              className={clsx(
                "bg-inherit dark:bg-inherit m-1 p-1 px-2 w-full resize-none overflow-hidden break-all",
                `${isEditing ? "" : "todoInputNotInEditMode"}`
              )}
            >
              {todoText}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-1 mx-2">
        {isEditing ? (
          <Button
            padding="p-2"
            hover={`${
              todo.text == todoText || todoText.length <= 0
                ? ""
                : "hover:bg-green-100 dark:hover:bg-green-950 hover:rounded-lg"
            }`}
            bgColor=""
            disabled={todo.text == todoText || todoText.length <= 0}
            onClick={async () => {
              if (
                await confirm({
                  confirmation: en._confirmation.editConfirmationMessage,
                })
              ) {
                handleEdit({ ...todo, text: todoText });
                setIsEditing(false);
              }
            }}
          >
            <MdOutlineDone
              className="text-lg"
              color={
                todo.text == todoText || todoText.length <= 0
                  ? "#d4d4d8"
                  : "#22c55e"
              }
            />
          </Button>
        ) : (
          <Button
            padding="p-2"
            hover="hover:bg-sky-100 dark:hover:bg-sky-950 hover:rounded-lg"
            bgColor=""
            onClick={() => {
              setIsEditing(true);
            }}
          >
            <MdOutlineMode className="text-sky-500 dark:text-sky-400 text-lg" />
          </Button>
        )}
        {isEditing ? (
          <Button
            padding="p-2"
            hover="hover:bg-yellow-100 dark:hover:bg-yellow-950 hover:rounded-lg"
            bgColor=""
            onClick={() => {
              setTodoText(todo.text);
              setIsEditing(false);
            }}
          >
            <MdOutlineClose className="text-lg text-yellow-400" />
          </Button>
        ) : (
          <Button
            padding="p-2"
            hover="hover:bg-red-100 dark:hover:bg-red-950 hover:rounded-lg"
            bgColor=""
            onClick={async () => {
              if (
                await confirm({
                  confirmation: en._confirmation.deleteConfirmationMessage,
                })
              ) {
                handleDelete(todo.id);
              }
            }}
          >
            <MdOutlineDeleteOutline className="text-red-500 text-lg dark:text-red-400" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
