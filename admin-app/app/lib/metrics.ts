import { axiosBasic } from "utils/axios/axios";

export type URLMetrics = {
  url: string;
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  pwa: number;
  largest_contentful_paint: number;
  first_input_delay: number;
  commulative_layout_shift: number;
  time_to_first_byte: number;
  time_to_interactive: number;
  first_contentful_paint: number;
};

export const getMetrics = async (
  urls: string[]
): Promise<URLMetrics[] | null> => {
  const body = {
    urls: urls,
  };

  type response = {
    data: URLMetrics[] | null;
  };

  return axiosBasic
    .post<response>("/api/v1/metrics", body)
    .then((response) => response.data.data);
};
