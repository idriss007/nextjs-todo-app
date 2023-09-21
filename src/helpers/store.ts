import { TodoItem } from "@/types";
import { atomFamily, atomWithStorage } from "jotai/utils";

export const todosAtom = atomFamily((slug: string) => {
  return atomWithStorage<TodoItem[]>(`todo_${slug}`, []);
});

export const todoWorldNamesAtom = atomWithStorage<string[]>(
  "todoWorldNames",
  []
);
