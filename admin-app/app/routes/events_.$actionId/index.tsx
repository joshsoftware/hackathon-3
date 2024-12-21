import { useState, useMemo } from "react";
import { ChevronsRight, CircleX } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "~/shared/data-table";
import { Link, useParams } from "@remix-run/react";
import { useQuery } from "react-query";
import { cn } from "~/lib/utils";

type Event = {
  id: string;
  url: string;
  action: string;
  captured_at: string;
  browsers: string[];
  screenshot?: string;
};

export type EventDetails = {
  action: string;
  url: string;
  element: string;
  browsers: string[];
  userEvents?: Event[];
};

const browserIcons: { [key: string]: string } = {
  chrome: "/public/safari.png",
  firefox: "/public/safari.png",
};

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "timestamp",
    header: "Capture Time",
    cell: ({
      row: {
        original: { captured_at },
      },
    }) => {
      const date = new Date(captured_at);
      return (
        <div>
          <div>{date.toLocaleDateString()}</div>
          <div>
            {date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "browsers",
    header: "Browsers",
    cell: ({
      row: {
        original: { browsers = [] },
      },
    }) => {
      if (!browsers.length) return null;
      return (
        <div className="flex space-x-2">
          {browsers.map((browser: string) => (
            <img
              key={browser}
              src={browserIcons[browser] || "https://placehold.co/400"}
              alt={browser}
              className="w-8 h-8 object-cover"
            />
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "os",
    header: "OS",
  },
  {
    accessorKey: "screenshot",
    header: "Screenshot",
    cell: ScreenshotCell,
  },
];

function VerticalKeyValueList({
  items: rawItems,
  className,
}: {
  items: { label: string; value: string }[];
  className?: string;
}) {
  const items = rawItems.filter((item) => item.label && item.value);

  return (
    <dl
      className={cn("m-0 block text-base", className)}
      data-cname="VerticalKeyValueList"
    >
      {items.map(({ label, value }, index) => (
        <div
          key={index}
          className="mt-1 flex flex-row min-h-8 items-start first:mt-0"
        >
          <dt className="font-bold w-1/3">{label}</dt>
          <dd className="ml-2 w-2/3">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Breadcrumb() {
  return (
    <nav className="text-sm font-medium mb-4 flex items-center mx-16 px-4 py-4 my-4">
      <Link to="/events" className="text-blue-600 hover:underline">
        Events
      </Link>
      <ChevronsRight />
      <span>Event Details</span>
    </nav>
  );
}

export default function EventsIndex() {
  const { actionId } = useParams<"actionId">();

  const { data = {} } = useQuery(["events", actionId], async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/aggregate_events/${actionId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
        },
      }
    );
    return response.json();
  });

  const events = useMemo(() => (data.user_events as Event[]) || [], [data]);
  const color = useMemo(() => {
    return events.length > 10
      ? "text-red-600"
      : events.length > 5
      ? "text-orange-500"
      : "text-yellow-500";
  }, [events.length]);

  return (
    <>
      <Breadcrumb />

      <div className="container flex justify-between mx-auto px-4 py-4 my-4 shadow-sm bg-white rounded-md text-primary-background">
        <div className="flex flex-col w-1/2">
          <h1 className="text-3xl font-bold capitalize pb-4">{`${
            data.action ?? ""
          }: ${data.element}`}</h1>
          <VerticalKeyValueList
            items={[
              { label: "Url", value: data.url },
              { label: "Browsers", value: (data?.browsers || []).join(", ") },
            ]}
            className="mt-2"
          />
        </div>
        <div className={cn("font-bold text-4xl pr-20", color)}>
          {events.length}
        </div>
      </div>

      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={events} />
      </div>
    </>
  );
}

function ScreenshotCell({ row }: { row: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  return (
    <>
      {row.original?.screenshot && (
        <button
          className="w-24 h-24 object-cover cursor-pointer p-0 border-none bg-transparent"
          onClick={() => handleImageClick(row.original.screenshot)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleImageClick(row.original.screenshot);
            }
          }}
        >
          <img
            className="w-24 h-24 object-cover"
            src={row.original.screenshot}
            alt="screenshot"
          />
        </button>
      )}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center shadow-sm bg-white border-white bg-opacity-50">
          <div className="relative">
            <div className="bg-white relative w-full h-full max-w-4xl max-h-4xl">
              <img
                className="w-full h-full object-cover"
                src={selectedImage}
                alt="screenshot preview"
              />
              <button
                className="absolute top-0 right-0 mt-2 mr-2 text-white"
                onClick={() => setIsModalOpen(false)}
              >
                <CircleX className="text-black" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
