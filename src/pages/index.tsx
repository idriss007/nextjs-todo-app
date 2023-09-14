import { Button } from "@/components";
import { useState } from "react";
import en from "@/lang/en.json";
import { useRouter } from "next/router";
import { todoWorldNamesAtom } from "@/helpers";
import { useAtom } from "jotai";

export default function Home() {
  const router = useRouter();

  const [worldName, setWorldName] = useState<string>("");
  const [todoWorldNames, setTodoWorldNames] = useAtom(todoWorldNamesAtom);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTodoWorldNames((prevValues: string[]) => {
      if (prevValues.length <= 0) {
        return [worldName];
      } else {
        const isWorldExist = prevValues.includes(worldName);
        if (!isWorldExist) {
          return [...prevValues, worldName.trim()];
        } else {
          return [...prevValues];
        }
      }
    });

    router.push(`/${worldName.trim()}`);
  };

  return (
    <div className="w-full flex flex-col flex-1 justify-center items-center">
      <p className="text-5xl font-bold text-center">{en.appTitle}</p>
      <p className="text-xl mb-5 mt-10 text-center">
        Create your own special todos world
      </p>
      <form
        className="flex gap-3"
        action=""
        onSubmit={(e) => {
          if (worldName.length > 0) {
            handleSubmit(e);
          }
        }}
      >
        <input
          className="w-full p-2 dark:bg-neutral-600 outline outline-0 focus:outline-1
           outline-indigo-600 border border-1 border-gray-400 focus:border-transparent rounded-sm"
          type="text"
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setWorldName((e.target as HTMLInputElement).value)
          }
          placeholder={en._createSpace.inputPlaceholder}
        />

        <Button type="submit">{en._createSpace.button}</Button>
      </form>
    </div>
  );
}
