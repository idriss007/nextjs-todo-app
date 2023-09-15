import { CreateWorldForm } from "@/components";
import en from "@/lang/en.json";

export default function Home() {
  return (
    <div className="w-full flex flex-col flex-1 justify-center items-center">
      <p className="text-5xl font-bold text-center">{en.appTitle}</p>
      <CreateWorldForm margin="mb-5 mt-10" />
    </div>
  );
}
