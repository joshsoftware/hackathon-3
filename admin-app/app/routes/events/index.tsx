import { Link } from "@remix-run/react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "~/shared/data-table";

export type Event = {
  action_id: string;
  rage_count: number;
  action: string;
  url: string;
  element: string;
  state: string;
  browsers: string[];
};

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "rage_count",
    header: "Rage Count",
    cell: ({ getValue }) => {
      const rageCount = getValue() as number;
      const color =
        rageCount > 10
          ? "text-red-600"
          : rageCount > 5
          ? "text-orange-500"
          : "text-yellow-500";

      return (
        <span className={`text-3xl font-bold ${color} block text-center`}>
          {rageCount}
        </span>
      );
    },
  },
  {
    header: "Details",
    cell: ({ row }) => {
      return (
        <div>
          <p className="text-lg">
            {row.original.action}:{row.original.element}
          </p>
          <p>{row.original.url}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "browsers",
    header: "Browsers",
    cell: ({ getValue }) => (
      <div className="flex flex-wrap gap-1">
        {(getValue() as string[]).map((browser, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-blue-100 text-blue-700 rounded"
          >
            {browser}
          </span>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "action_id",
    header: "Details",
    cell: ({ getValue }) => (
      <Link
        to={`/events/${getValue() as string}`}
        className="px-4 py-2 text-white bg-slate-900 rounded hover:bg-slate-700"
      >
        View
      </Link>
    ),
  },
];

export const events: Event[] = [
  {
    rage_count: 10,
    action: "Click",
    url: "https://example.com",
    element: "Button",
    state: "Active",
    browsers: ["Chrome", "Firefox"],
    action_id: "abc",
  },
  {
    rage_count: 5,
    action: "Hover",
    url: "https://example.org",
    element: "Link",
    state: "Inactive",
    browsers: ["Safari", "Edge"],
    action_id: "efg",
  },
];

export default function EventsIndex() {
  return (
    <div className="container mx-auto py-5 px-40">
      <h2 className="text-2xl font-bold text-black-900 pb-2">Rage Events</h2>
      <div className="overflow-x-auto rounded-lg">
        {events.length > 0 ? (
          <DataTable columns={columns} data={events} />
        ) : (
          <div className="p-5 text-center text-gray-500">
            No events available
          </div>
        )}
      </div>
    </div>
  );
}
