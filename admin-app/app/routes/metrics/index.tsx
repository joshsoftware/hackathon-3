import { useState } from "react";
import Metric from "~/components/ui/metric";
import { getMetrics, URLMetrics } from "~/lib/metrics";
import { isValidURL } from "~/lib/utils";

export default function MetricsIndex() {
  const [url, setUrl] = useState<string>("");
  const [urls, setUrls] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<URLMetrics[]>([]);

  const [state, setState] = useState<
    "NORMAL" | "LOADING" | "METRICS" | "ERROR"
  >("NORMAL");

  const addUrl = () => {
    if (!url || url === "") {
      setUrl("");
      return;
    }

    if (!isValidURL(url)) {
      setUrl("");
      return;
    }

    const foundUrl = urls.find((val) => val === url);
    if (foundUrl) {
      setUrl("");
      return;
    }

    setUrls([...urls, url]);
    setUrl("");
  };

  const removeUrl = (url: string) => {
    const newUrls = urls.filter((val) => val != url);
    setUrls(newUrls);
  };

  const findMetrics = async () => {
    setState("LOADING");

    try {
      const data = await getMetrics(urls);
      if (!data) return;

      setMetrics(data);
    } catch (error) {
      setState("ERROR");
    } finally {
      setState("METRICS");
    }
    console.log("Finding metrics");
  };

  return (
    <div>
      {state === "NORMAL" && (
        <div className="container mx-auto py-5 px-40">
          <div className="flex flex-wrap gap-2 justify-center">
            <input
              type="text"
              placeholder="website url"
              className="hidden sm:flex items-center w-72 text-left space-x-3 px-4 h-12 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              type="button"
              onClick={addUrl}
              className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
            >
              Add
            </button>
            <button
              type="button"
              onClick={findMetrics}
              className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
            >
              Find Metrics
            </button>
          </div>

          <div className="my-5">
            <div className="relative flex flex-col rounded-lg bg-white shadow-sm border border-slate-200">
              <nav className="flex min-w-[240px] flex-col gap-1 p-1.5">
                {!urls || urls.length === 0 ? (
                  <p className="text-center p-2">Please add website urls</p>
                ) : null}

                {urls.map((url) => (
                  <div
                    key={url}
                    role="button"
                    className="text-slate-800 flex w-full items-center rounded-md p-2 pl-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                  >
                    {url}
                    <div className="ml-auto grid place-items-center justify-self-end">
                      <button
                        className="rounded-md border border-transparent p-2.5 text-center text-sm transition-all text-slate-600 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={() => removeUrl(url)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {state === "LOADING" && (
        <div className="container mx-auto py-5 px-40">
          <h1>Loading...</h1>
        </div>
      )}

      {state === "ERROR" && (
        <div className="container mx-auto py-5 px-40">
          <h1>Something went wrong</h1>
        </div>
      )}

      {state === "METRICS" && (
        <div className="container mx-auto py-5 px-40">
          <h3 className="text-2xl font-bold">Metrics</h3>

          <div className="my-5 flex flex-wrap gap-2">
            {metrics.map((data) => (
              <Metric key={data.url} metric={data} />
            ))}
          </div>

          <button
            onClick={() => {
              setState("NORMAL");
              setMetrics([]);
            }}
            className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}
