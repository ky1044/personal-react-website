import { useLayoutEffect, useState } from "react";

const useWindow = () => {
  const [width, setWidth] = useState(window?.innerWidth ?? 0);
  const [height, setHeight] = useState(window?.innerHeight ?? 0);

  const isTablet = width <= 960;
  const isMobile = width <= 640;

  if (global.window) {
    useLayoutEffect(() => {
      function update() {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      }
      window.addEventListener("resize", update);
      return () => {
        window.removeEventListener("resize", update);
      };
    }, []);
  }

  return { width, height, isMobile, isTablet };
};

export default useWindow;
