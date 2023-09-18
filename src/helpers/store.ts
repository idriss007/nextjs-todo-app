import { TodoItem } from "@/types";
import { atom } from "jotai";
import { atomFamily, atomWithStorage } from "jotai/utils";

export const darkModeAtom = atomWithStorage<boolean>("darkMode", false);

export const todosAtom = atomFamily((slug: string) => {
  return atomWithStorage<TodoItem[]>(`todo_${slug}`, []);
});

export const todoWorldNamesAtom = atomWithStorage<string[]>(
  "todoWorldNames",
  []
);
