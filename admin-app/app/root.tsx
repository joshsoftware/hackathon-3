import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import Header from "./shared/header";
import { QueryClient, QueryClientProvider } from "react-query";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function clientLoader() {
  const userToken = localStorage.getItem("AUTH_TOKEN");
  if (!userToken) return null;

  return { userToken };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof clientLoader>();
  const userToken = data ? data.userToken : null;

  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-blue-50 min-h-screen text-black-900">
        <QueryClientProvider client={queryClient}>
          <Header userToken={userToken} />
          {children}
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
