import { todoWorldNamesAtom } from "@/helpers";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";
import en from "@/lang/en.json";
import Button from "../buttons/Button";
import clsx from "clsx";

type CreateWorldFormProps = {
  handleClose?: any;
  margin?: string;
};

const CreateWorldForm = (props: CreateWorldFormProps) => {
  const { handleClose, margin } = props;

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
    if (handleClose) {
      handleClose();
    }
  };

  return (
    <div>
      <p className={clsx("text-xl text-center", margin)}>{en.appDesc}</p>
      <form className="flex gap-3" action="" onSubmit={handleSubmit}>
        <input
          className={clsx(
            "w-full p-2 dark:bg-neutral-600 outline outline-0 focus:outline-1 outline-indigo-600 border border-1 border-gray-400 focus:border-transparent rounded-sm",
            `${router.query.id ? "text-black dark:text-white" : null}`
          )}
          type="text"
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setWorldName((e.target as HTMLInputElement).value)
          }
          placeholder={en._createSpace.inputPlaceholder}
        />

        <Button
          height="h-auto"
          bgColor={router.query.id ? "bg-black" : undefined}
          textColor={router.query.id ? "text-white" : undefined}
          hover={router.query.id ? "hover:bg-stone-800" : undefined}
          disabled={worldName.length <= 0}
          type="submit"
        >
          {en._createSpace.button}
        </Button>
      </form>
    </div>
  );
};

export default CreateWorldForm;
