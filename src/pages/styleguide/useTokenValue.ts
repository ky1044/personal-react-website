import { useCallback, useEffect, useState } from "react";
import { useDarkMode } from "src/providers/DarkModeProvider";

/**
 * Reads custom properties off :root at runtime.
 *
 * This is what makes the styleguide "living": it never hardcodes a value, it
 * asks the browser what the stylesheet currently resolves to. Re-reads on
 * theme change so both palettes stay honest.
 */
const useTokenValue = () => {
  const { isDarkMode } = useDarkMode();
  const [version, setVersion] = useState(0);

  // The theme class lands on <html> in an effect, so re-read on the tick after.
  useEffect(() => {
    const id = requestAnimationFrame(() => setVersion((v) => v + 1));
    return () => cancelAnimationFrame(id);
  }, [isDarkMode]);

  const read = useCallback(
    (token: string): string => {
      if (typeof window === "undefined") return "";
      void version; // re-read whenever the theme flips
      return getComputedStyle(document.documentElement)
        .getPropertyValue(token)
        .trim();
    },
    [version]
  );

  return read;
};

export default useTokenValue;
