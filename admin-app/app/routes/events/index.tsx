import { Link } from "@remix-run/react";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "react-query";
import { UAParser } from "ua-parser-js";
import { BrowserIcon, BrowserTypes } from "~/shared/browser";
import { DataTable } from "~/shared/data-table";

export type Event = {
  action_id: string;
  rage_count: number;
  action: {
    action: string;
    id: number;
  };
  url: string;
  element: string;
  state?: string;
  browsers?: string[];
  user_agent: string;
};

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "rage_count",
    header: "Rage Count",
    cell: ({ row }) => {
      const rageCount = row.original.rage_count as number;
      const color =
        rageCount > 10
          ? "text-red-600"
          : rageCount > 5
          ? "text-orange-500"
          : "text-yellow-500";

      return (
        <span className={`text-3xl ${color} block text-center`}>
          {rageCount}
        </span>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Info",
    cell: ({ row }) => {
      return (
        <div>
          <p className="text-lg ">
            <span className="font-bold capitalize">
              {row.original?.action?.action}:
              {row.original.element.length < 100
                ? row.original.element
                : row.original.element.slice(0, 100)}
            </span>
            <div className="flex flex-col gap-2 ">
              <Link to={row.original.url}>{row.original.url}</Link>
            </div>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "user_agent",
    header: "Browsers",
    cell: ({ row }) => {
      const browser = new UAParser(row.original.user_agent).getBrowser().name;
      return <BrowserIcon browser={browser as BrowserTypes} />;
    },
  },
  {
    accessorKey: "action_id",
    header: "Details",
    cell: ({ row }) => (
      <Link
        to={`/events/${row.original.action_id}`}
        className="px-4 py-2 text-white bg-slate-900 rounded hover:bg-slate-700 "
      >
        View
      </Link>
    ),
  },
];

export default function EventsIndex() {
  const { data = [] } = useQuery("events", async () => {
    const response = await fetch(
      "http://localhost:3000/api/v1/aggregate_events",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
        },
      }
    );
    return response.json();
  });

  console.log(typeof data, data);

  return (
    <div className="container mx-auto py-5 px-30">
      <h2 className="text-2xl font-bold text-black-900 pb-2">Rage Events</h2>
      <div className="overflow-x-auto rounded-lg">
        {data.length > 0 ? (
          <DataTable columns={columns} data={data} />
        ) : (
          <div className="overflow-x-auto rounded-lg">No events available</div>
        )}
      </div>
    </div>
  );
}
