import { TodoItem } from "@/types";
import {
  MdCheckCircleOutline,
  MdOutlineClose,
  MdOutlineDeleteForever,
  MdOutlineDone,
  MdOutlineDragIndicator,
  MdOutlineMode,
} from "react-icons/md";
import Button from "../buttons/Button";
import { useRef, useState } from "react";
import en from "@/lang/en.json";
import clsx from "clsx";

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

  return (
    <div className="flex items-center justify-between flex-1 touch-auto overflow-auto">
      <div className="flex gap-1 w-full items-center">
        {/* <MdOutlineDragIndicator /> */}
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
        <input
          // className="dark:bg-neutral-600 ml-1 p-1 px-2 w-full"
          className={clsx(
            "bg-inherit dark:bg-inherit ml-1 p-1 px-2 w-full",
            `${isEditing ? "" : "todoInputNotInEditMode"}`
          )}
          type="text"
          value={todoText}
          readOnly={!isEditing}
          ref={ref}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setTodoText((e.target as HTMLInputElement).value);
          }}
        />
      </div>
      <div className="flex gap-3">
        {isEditing ? (
          <Button
            padding="p-1"
            hover={`${
              todo.text == todoText
                ? ""
                : "hover:bg-green-100 dark:hover:bg-green-950 hover:rounded-lg"
            }`}
            bgColor=""
            disabled={todo.text == todoText}
            onClick={() => {
              if (confirm(en.editConfirmationMessage)) {
                handleEdit({ ...todo, text: todoText });
                setIsEditing(false);
              }
            }}
          >
            <MdOutlineDone
              className="text-lg"
              color={todo.text == todoText ? "#d4d4d8" : "#22c55e"}
            />
          </Button>
        ) : (
          <Button
            padding="p-1"
            hover="hover:bg-sky-100 dark:hover:bg-sky-950 hover:rounded-lg"
            bgColor=""
            onClick={() => {
              setIsEditing(true);
              ref.current?.select();
            }}
          >
            <MdOutlineMode className="text-sky-500 dark:text-sky-400 text-lg" />
          </Button>
        )}
        {isEditing ? (
          <Button
            padding="p-1"
            hover="hover:bg-yellow-100 dark:hover:bg-yellow-950 hover:rounded-lg"
            bgColor=""
            onClick={() => {
              // if (confirm("Are you sure to exit edit mode?")) {
              setTodoText(todo.text);
              setIsEditing(false);
              // }
            }}
          >
            <MdOutlineClose className="text-lg text-yellow-400" />
          </Button>
        ) : (
          <Button
            padding="p-1"
            hover="hover:bg-red-100 dark:hover:bg-orange-950 hover:rounded-lg"
            bgColor=""
            onClick={() => {
              if (confirm(en.deleteConfirmationMessage)) {
                handleDelete(todo.id);
              }
            }}
          >
            <MdOutlineDeleteForever className="text-red-500 text-lg dark:text-red-400" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
