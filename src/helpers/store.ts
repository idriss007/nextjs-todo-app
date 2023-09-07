import { TodoItem } from "@/types";
import { atom } from "jotai";

export const todoListAtom = atom<TodoItem[]>([]);
export const todoTextAtom = atom<string>("");

export const getTodoListAtom = atom(
  () => "",
  (get, set, { id }: { id: any }) => {
    set(todoListAtom, JSON.parse(localStorage.getItem(`todo_${id}`)!));
  }
);

export const setTodoListAtom = atom(
  () => "",
  (get, set, { text, completed }: { text: string; completed: boolean }) => {
    set(todoListAtom, [...get(todoListAtom), { text, completed }]);
  }
);
