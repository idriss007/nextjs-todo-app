import { Button } from "@/components";
import { useState } from "react";
import en from "@/lang/en.json";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const [todoWorldName, setTodoWorldName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      todoWorldName.length > 0 &&
      localStorage.getItem("todoWorldNames") !== undefined
    ) {
      const worldNames = localStorage.getItem("todoWorldNames");

      localStorage.setItem(
        "todoWorldNames",
        `${worldNames ? `${worldNames}, ${todoWorldName}` : `${todoWorldName}`}`
      );

      router.push(`/${todoWorldName}`);
    }
  };

  return (
    <div className="w-full flex flex-col flex-1 justify-center items-center">
      <p className="text-5xl font-bold text-center">{en.appTitle}</p>
      <p className="text-xl mb-5 mt-10 text-center">
        Create your own special todos world
      </p>
      <form className="flex gap-3" action="" onSubmit={handleSubmit}>
        <input
          className="w-full p-2 dark:bg-neutral-600 outline outline-0 focus:outline-1
           outline-indigo-600 border border-1 border-gray-400 focus:border-transparent rounded-sm"
          type="text"
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setTodoWorldName((e.target as HTMLInputElement).value)
          }
          placeholder={en._createSpace.inputPlaceholder}
        />

        <Button type="submit">{en._createSpace.button}</Button>
      </form>
    </div>
  );
}
