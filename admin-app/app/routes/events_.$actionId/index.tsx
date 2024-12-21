import { useState } from "react";
import { ArrowLeft, ChevronRight, ChevronsRight, CircleX } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "../../components/ui/table";
import { DataTable } from "~/shared/data-table";
import { Link } from "react-router-dom"; // Assuming you are using react-router

type Event = {
  id: string;
  url: string;
  action: string;
  timestamp: string;
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

export const event = {
  action: "view",
  url: "/events",
  element: "button",
  browsers: ["chrome", "firefox"],
  userEvents: [
    {
      id: "1",
      ip: 123456,
      url: "/events",
      action: "view",
      timestamp: "2021-01-01T00:00:00",
      browsers: ["chrome"],
      os: "windows",
      screenshot: "https://placehold.co/400",
    },
    {
      id: "2",
      ip: 123456,
      url: "/events",
      action: "view",
      timestamp: "2021-01-01T00:00:00",
      browsers: ["firefox"],
      os: "mac",
      screenshot: "https://placehold.co/400",
    },
  ],
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
        original: { timestamp },
      },
    }) => new Date(timestamp).toLocaleString(),
  },
  {
    accessorKey: "browsers",
    header: "Browsers",
    cell: ({
      row: {
        original: { browsers },
      },
    }) => (
      <div className="flex space-x-2">
        {browsers.map((browser: string) => (
          <img
            key={browser}
            src={browserIcons[browser] || ""}
            alt={browser}
            className="w-8 h-8 object-cover"
          />
        ))}
      </div>
    ),
  },
  {
    accessorKey: "os",
    header: "OS",
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({
      row: {
        original: { timestamp },
      },
    }) => new Date(timestamp).toLocaleString(),
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
      className={`m-0 block text-base ${className}`}
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
    <nav className="text-sm font-medium mb-4 flex items-center mx-12 px-4 py-4 my-4">
      <Link to="/events" className="text-blue-600 hover:underline">
        Events
      </Link>
      {"  "}
      <ChevronsRight />
      <span>Event Details</span>
    </nav>
  );
}

export default function EventsIndex() {
  const events = event.userEvents || [];
  return (
    <>
      <Breadcrumb />

      <div className="container mx-auto px-4 py-4 my-4 bg-white rounded-md text-primary-background">
        <h1 className="text-3xl font-bold capitalize">{`${event.action}: ${event.element}`}</h1>
        <VerticalKeyValueList
          items={[
            { label: "Url", value: event.url },
            { label: "Browsers", value: event.browsers.join(", ") },
          ]}
          className="mt-2"
        />
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
          onClick={() =>
            row.original.screenshot && handleImageClick(row.original.screenshot)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              row.original.screenshot &&
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative">
            <img
              className="max-w-full max-h-full"
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
      )}
    </>
  );
}
