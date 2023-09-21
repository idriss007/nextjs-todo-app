import Link from "next/link";
import { ReactNode } from "react";
import Button from "../buttons/Button";
import { useRouter } from "next/router";

type TodoWorldItemProps = {
  children: ReactNode;
};

const TodoWorldItem = (props: TodoWorldItemProps) => {
  const { children } = props;

  const router = useRouter();

  return (
    <Button
      rounded="rounded-none"
      bgColor="bg-stone-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 hover:bg-stone-300"
      textColor="text-black dark:text-white"
      width="max-w-fit min-w-full w-0"
      padding="p-3"
      className="flex active:dark:bg-stone-700 active:bg-stone-400"
      onClick={() => router.push(`/${children}`)}
    >
      <Link href="" className="text-center truncate">
        {children}
      </Link>
    </Button>
  );
};

export default TodoWorldItem;
