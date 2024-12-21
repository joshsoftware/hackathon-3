// Implment support to render browser specific icons or images

export const browserIcons = {
  Chrome: "chrome",
  Firefox: "firefox",
  Safari: "safari",
  Edge: "edge",
  IE: "ie",
  Opera: "opera",
};

export type BrowserTypes = keyof typeof browserIcons;

export const BrowserIcon = ({ browser }: { browser: BrowserTypes }) => {
  const icon = browserIcons[browser] || "default";
  return (
    <img
      src={`/icons/${icon}.png`}
      alt={browser}
      className="w-6 h-6 object-cover"
    />
  );
};
