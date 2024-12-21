import { useEffect, useState } from "react";

export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN");
    setIsLoggedIn(!!token);
  }, []);

  return isLoggedIn;
};
