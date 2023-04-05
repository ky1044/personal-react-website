export enum Emojis {
  NYC = "NYC",
  TOKYO = "TOKYO",
  COLLEGE = "COLLEGE",
  SOFTWARE_ENGINEER = "SOFTWARE_ENGINEER",
  RUNNING = "RUNNING",
  CYCLING = "CYCLING",
  MUSIC = "MUSIC",
  PHOTOGRAPHY = "PHOTOGRAPHY",
}

export interface EmojiData {
  id: string;
  label: string;
  symbol: string;
}

export const EMOJI_MAPPING: { [key in Emojis]: EmojiData } = {
  [Emojis.NYC]: {
    id: "nyc",
    label: "New York City",
    symbol: "🗽",
  },
  [Emojis.TOKYO]: {
    id: "tokyo",
    label: "Tokyo",
    symbol: "🗼",
  },
  [Emojis.COLLEGE]: {
    id: "college",
    label: "college",
    symbol: "🎓",
  },
  [Emojis.SOFTWARE_ENGINEER]: {
    id: "software_engineer",
    label: "software engineer",
    symbol: "💻",
  },
  [Emojis.RUNNING]: {
    id: "run",
    label: "running",
    symbol: "🏃",
  },
  [Emojis.CYCLING]: {
    id: "cycling",
    label: "cycling",
    symbol: "🚴",
  },
  [Emojis.MUSIC]: {
    id: "music",
    label: "music",
    symbol: "🎵",
  },
  [Emojis.PHOTOGRAPHY]: {
    id: "photography",
    label: "photography",
    symbol: "📷",
  },
};
