import { CreateWorldForm } from "@/partials";
import en from "@/lang/en.json";
import { TodoWorldItem } from "@/components";
import { useAtom } from "jotai";
import { todoWorldNamesAtom } from "@/helpers";
import Head from "next/head";

export default function Home() {
  const [todoWorldNames, setTodoWorldNames] = useAtom(todoWorldNamesAtom);

  const editedTodoWorldNames = todoWorldNames
    .map((todoWorldName, i) => todoWorldNames[todoWorldNames.length - (i + 1)])
    .slice(0, 4);

  return (
    <div className="w-fit mr-auto max-w-fit ml-auto flex flex-col flex-1 justify-center items-center">
      <Head>
        <title>{en.appTitle}</title>
      </Head>
      <p className="text-5xl font-bold text-center">{en.appTitle}</p>
      <CreateWorldForm title={en.appDesc} margin="mb-5 mt-10" />
      {editedTodoWorldNames?.length > 0 && (
        <div className="mt-10 flex flex-col w-full max-w-full">
          <div className="flex justify-center items-center">
            <p className="text-lg font-bold self-center mb-2">Latest Worlds</p>
          </div>
          <div className="overflow-hidden rounded flex flex-col gap-1">
            {editedTodoWorldNames.map((todoWorld, i) => (
              <TodoWorldItem key={i}>{todoWorld}</TodoWorldItem>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
