import { ColumnDef } from "@tanstack/react-table";
import { Table } from "../../components/ui/table";
import { DataTable } from "~/shared/data-table";

type Event = {
  id: string;
  ip: number;
  url: string;
  action: string;
  timestamp: string;
};

export const events: Event[] = [
  {
    id: "1",
    ip: 123456,
    url: "/events",
    action: "view",
    timestamp: "2021-01-01T00:00:00",
  },
  {
    id: "2",
    ip: 123456,
    url: "/events",
    action: "view",
    timestamp: "2021-01-01T00:00:00",
  },
];

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "ip",
    header: "Ip Address",
  },
  {
    accessorKey: "url",
    header: "Url",
  },
  {
    accessorKey: "action",
    header: "Action",
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
  },
];

export default function EventsIndex() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={events} />
    </div>
  );
}
