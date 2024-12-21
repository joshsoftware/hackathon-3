import { URLMetrics } from "~/lib/metrics";
import { CheckCircleIcon, OctagonAlertIcon } from "lucide-react";

interface Props {
  metric: URLMetrics | null;
}

const METRIC_THRESHOLD = {
  performance: 90,
  accessibility: 80,
  bestPractices: 80,
  seo: 90,
  largest_contentful_paint: 2.5,
  first_input_delay: 100,
  commulative_layout_shift: 0.1,
  time_to_first_byte: 600,
  time_to_interactive: 3.8,
  first_contentful_paint: 1.8,
};

export default function Metric({ metric }: Props) {
  if (!metric) return null;

  return (
    <div className="p-6 max-w-sm min-w-sm flex-grow-0 bg-white rounded-xl shadow-md space-y-4 border border-gray-200">
      <div>
        <a href={metric.url} className="text-lg font-semibold text-gray-800">
          {metric.url}
        </a>
      </div>
      <div className="space-y-2">
        {Object.entries(metric).map(([key, value]) => {
          if (key === "url") return null;
          const threshold =
            METRIC_THRESHOLD[key as keyof typeof METRIC_THRESHOLD];
          const isBelowThreshold =
            typeof value === "number" && value <= threshold;
          return (
            <div key={key} className="flex justify-start items-center gap-2">
              {threshold !== undefined &&
                (isBelowThreshold ? (
                  <CheckCircleIcon className="h-5 w-5 text-white bg-green-500 rounded-full" />
                ) : (
                  <OctagonAlertIcon className="h-5 w-5 bg-orange-500 text-white rounded-full" />
                ))}
              <span className="text-sm font-medium text-gray-600">
                {(key.charAt(0).toUpperCase() + key.slice(1)).replace(
                  /_/g,
                  " "
                )}
                :
              </span>
              <span className="text-sm text-gray-800 jus">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
