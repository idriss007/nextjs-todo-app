import { TodoItem } from "@/types";
import { atom } from "jotai";
import { atomFamily, atomWithStorage } from "jotai/utils";

export const todossAtom = atomFamily((slug: string) => {
  return atomWithStorage<TodoItem[]>(`todo_${slug}`, []);
});

export const todoTextAtom = atom<string>("");
