import { Link } from "@remix-run/react";
import { DataTable } from "~/shared/data-table";

type UserSession = {
  id: string;
  ip: number;
  url: string;
};

export const userSessions: UserSession[] = [
  {
    id: "1",
    ip: 123456,
    url: "/user-sessions",
  },
  {
    id: "2",
    ip: 123456,
    url: "/user-sessions",
  },
];

const columns = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => {
      return (
        <Link
          className="text-blue"
          to={`/user-sessions/${row.original.id}/events`}
        >
          {row.original.id}
        </Link>
      );
    },
  },
  {
    accessorKey: "ip",
    header: "Ip Address",
  },
  {
    accessorKey: "url",
    header: "Url",
  },
];

export default function Users() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={userSessions} />
    </div>
  );
}
