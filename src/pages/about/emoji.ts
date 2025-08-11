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
  [Emojis.MUSIC]: {
    id: "music",
    label: "music",
  },
  [Emojis.PHOTOGRAPHY]: {
    id: "photography",
    label: "photography",
  },
};
