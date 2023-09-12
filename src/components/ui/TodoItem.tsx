import { TodoItem } from "@/types";
import { MdOutlineDeleteForever, MdOutlineMode } from "react-icons/md";
import Button from "../buttons/Button";
import { useAtom } from "jotai";
import { todosAtom } from "@/helpers";

type TodoItemProps = {
  todo: TodoItem;
  spaceName: string;
};

const TodoItem = (props: TodoItemProps) => {
  const { todo, spaceName } = props;

  const [todos, setTodos] = useAtom(todosAtom(spaceName));

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTodos((prevValue) =>
      prevValue.filter((td) => {
        return td.id !== todo.id;
      })
    );
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
