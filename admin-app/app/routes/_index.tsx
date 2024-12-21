import type { MetaFunction } from "@remix-run/node";
import { useIsLoggedIn } from "~/shared/hooks/useIsLoggedIn";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const isLoggedIn = useIsLoggedIn();

  return (
    <div className="flex items-center justify-center bg-slate-50">
      <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
        <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
          Enhance User Experience Before Frustration Strikes
        </h1>
        <p className="mt-2 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
          A powerful
          <span className="font-mono font-medium text-sky-500 dark:text-sky-400">
            {" "}
            monitoring tool{" "}
          </span>
          designed to identify and address pain points before they escalate,
          ensuring a{" "}
          <span className="font-mono font-medium text-sky-500 dark:text-sky-400">
            smoother
          </span>{" "}
          and more{" "}
          <span className="font-mono font-medium text-sky-500 dark:text-sky-400">
            satisfying
          </span>{" "}
          user experience.
        </p>
        <div className="flex justify-center align-middle">
          {isLoggedIn ? (
            <a
              href="/events"
              className="mx-auto my-5 px-20 w-10 m-auto bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 rounded-lg inline-flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
            >
              Events
            </a>
          ) : (
            <a
              href="/login"
              className="mx-auto my-5 px-20 w-10 m-auto bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 rounded-lg inline-flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
            >
              Login
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
