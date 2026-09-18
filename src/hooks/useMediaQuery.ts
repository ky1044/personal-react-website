import { useEffect, useState } from "react";

/**
 * Subscribes to a CSS media query.
 *
 * Replaces the one import of @mui/material/useMediaQuery, which was the only
 * thing pulling MUI (and its Emotion peers) into the bundle.
 */
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();

    // addEventListener is unsupported on Safari < 14.
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }
    mql.addListener(update);
    return () => mql.removeListener(update);
  }, [query]);

  return matches;
};

export default useMediaQuery;
