import { Navbar } from "@/partials";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Provider as JotaiProvider } from "jotai";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin-ext"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={clsx(
        inter.className,
        "p-4 md:p-7 min-h-screen h-screen flex bg-white dark:bg-black dark:text-white text-black overflow-hidden"
      )}
    >
      <div className="w-full md:w-2/3 ml-auto mr-auto flex flex-col">
        <JotaiProvider>
          <Navbar />
          <Component {...pageProps} />
        </JotaiProvider>
      </div>
    </div>
  );
}
