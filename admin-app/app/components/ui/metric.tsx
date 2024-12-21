import { URLMetrics } from "~/lib/metrics";

interface Props {
  metric: URLMetrics;
}

export default function Metric({ metric }: Props) {
  return (
    <div className="p-6 max-w-sm min-w-sm flex-grow-0 bg-white rounded-xl shadow-md space-y-4 border border-gray-200">
      <div>
        <a
          href="http://localhost:5173/metrics"
          className="text-lg font-semibold text-gray-800"
        >
          {metric.url}
        </a>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm font-medium text-gray-600">
            Performance:
          </span>
          <span className="text-sm text-gray-800">{metric.performance}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium text-gray-600">
            Accessibility:
          </span>
          <span className="text-sm text-gray-800">{metric.accessibility}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium text-gray-600">
            Best Practices:
          </span>
          <span className="text-sm text-gray-800">{metric.bestPractices}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium text-gray-600">SEO:</span>
          <span className="text-sm text-gray-800">{metric.seo}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium text-gray-600">PWA:</span>
          <span className="text-sm text-gray-800">{metric.pwa}</span>
        </div>
      </div>
    </div>
  );
}
