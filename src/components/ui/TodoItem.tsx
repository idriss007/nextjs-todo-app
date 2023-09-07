import { TodoItem } from "@/types";
import { MdOutlineDeleteForever, MdOutlineMode } from "react-icons/md";
import Button from "../buttons/Button";
import { useRouter } from "next/router";

type TodoItemProps = {
  todoId?: number;
  todo: TodoItem;
  setTodoList: any;
};

const TodoItem = (props: TodoItemProps) => {
  const { todo, todoId, setTodoList } = props;

  const router = useRouter();
  const { id } = router.query;

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTodoList((prevValue: TodoItem[]) => {
      const newList = prevValue.filter((todo, key) => {
        return key != todoId;
      });
      localStorage.setItem(`todo_${id}`, JSON.stringify(newList));

      return newList;
    });
  };

  return (
    <div className="flex items-center justify-between">
      <input
        className="dark:bg-neutral-600"
        type="text"
        value={todo.text}
        readOnly
      />
      {/* {todo.text} */}
      <div className="">
        <Button hover="" bgColor="">
          <MdOutlineMode color="#0ea5e9" />
        </Button>
        <Button hover="" bgColor="" onClick={handleDelete}>
          <MdOutlineDeleteForever color="#ef4444" />
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
