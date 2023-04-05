import { createContext, useContext } from 'react';
import { EmojiHook } from './useEmoji';

const EmojiContext = createContext<EmojiHook | null>(null);

export const useEmojiContext = (): EmojiHook => {
  const context = useContext(EmojiContext);
  if (!context) {
    throw new Error('useEmojiContext must be used within a EmojiProvider');
  }
  return context;
};

export const EmojiProvider = EmojiContext.Provider;