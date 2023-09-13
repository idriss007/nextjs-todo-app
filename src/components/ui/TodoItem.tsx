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

type TodoItemProps = {
  todo: TodoItem;
  spaceName: string;
  handleEdit: any;
  handleDelete: any;
};

const TodoItem = (props: TodoItemProps) => {
  const { todo, spaceName, handleEdit, handleDelete } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [todoText, setTodoText] = useState(todo.text);

  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-1 w-full items-center">
        <MdOutlineDragIndicator />
        <Button
          bgColor={todo.completed ? "bg-green-500" : "bg-neutral-300"}
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
          className="dark:bg-neutral-600 ml-1 p-1 px-2"
          type="text"
          value={todoText}
          readOnly={!isEditing}
          ref={ref}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setTodoText((e.target as HTMLInputElement).value);
          }}
        />
      </div>
      <div className="flex">
        {isEditing ? (
          <Button
            padding="p-1"
            hover=""
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
              color={todo.text == todoText ? "#d4d4d8" : "#22c55e"}
            />
          </Button>
        ) : (
          <Button
            padding="p-1"
            hover=""
            bgColor=""
            onClick={() => {
              setIsEditing(true);
              ref.current?.focus();
            }}
          >
            <MdOutlineMode color="#0ea5e9" />
          </Button>
        )}
        {isEditing ? (
          <Button
            padding="p-1"
            hover=""
            bgColor=""
            onClick={() => {
              // if (confirm("Are you sure to exit edit mode?")) {
              setTodoText(todo.text);
              setIsEditing(false);
              // }
            }}
          >
            <MdOutlineClose color="#facc15" />
          </Button>
        ) : (
          <Button
            padding="p-1"
            hover=""
            bgColor=""
            onClick={() => handleDelete(todo.id)}
          >
            <MdOutlineDeleteForever color="#ef4444" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
