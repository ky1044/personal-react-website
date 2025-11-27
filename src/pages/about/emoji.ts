export enum Emojis {
  NYC = "NYC",
  TOKYO = "TOKYO",
  COLLEGE = "COLLEGE",
  SOFTWARE_ENGINEER = "SOFTWARE_ENGINEER",
  RUNNING = "RUNNING",
  CYCLING = "CYCLING",
  BOOKS = "BOOKS",
  PHOTOGRAPHY = "PHOTOGRAPHY",
}

export interface EmojiData {
  id: string;
  label: string;
}

export const EMOJI_MAPPING: { [key in Emojis]: EmojiData } = {
  [Emojis.NYC]: {
    id: "nyc",
    label: "New York City",
  },
  [Emojis.TOKYO]: {
    id: "tokyo",
    label: "Tokyo",
  },
  [Emojis.COLLEGE]: {
    id: "college",
    label: "college",
  },
  [Emojis.SOFTWARE_ENGINEER]: {
    id: "software_engineer",
    label: "software engineer",
  },
  [Emojis.RUNNING]: {
    id: "run",
    label: "running",
  },
  [Emojis.CYCLING]: {
    id: "cycling",
    label: "cycling",
  },
  [Emojis.BOOKS]: {
    id: "books",
    label: "coffee table books",
  },
  [Emojis.PHOTOGRAPHY]: {
    id: "photography",
    label: "photography",
  },
};
