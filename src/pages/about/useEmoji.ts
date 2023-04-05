import { useState, useCallback } from "react";

export type EmojiHook = {
  hoveredKey: string | null;
  onHover: (key: string | null) => void;
};

const useEmoji = (): EmojiHook => {
  const [hoveredKey, setEmojiedKey] = useState<string | null>(null);

  const onHover = useCallback((key: string | null) => {
    setEmojiedKey(key);
  }, []);

  return {
    hoveredKey,
    onHover,
  };
};

export default useEmoji;
