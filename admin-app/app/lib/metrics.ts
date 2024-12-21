export type URLMetrics = {
  url: string;
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  pwa: number;
};

export const getMetrics = async (urls: string[]): Promise<URLMetrics[]> => {
  const metrics = urls.map((url) => {
    return {
      url: url,
      performance: 0,
      accessibility: 0,
      bestPractices: 0,
      seo: 0,
      pwa: 0,
    };
  });

  return metrics;
};
