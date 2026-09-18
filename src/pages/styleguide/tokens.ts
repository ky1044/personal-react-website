/**
 * The token manifest the styleguide renders from.
 *
 * Only names live here — every *value* is read from the live stylesheet at
 * runtime (see useTokenValue), so the page can never drift from
 * src/style/tokens.css. Adding a token there and its name here is all it
 * takes to document it.
 */

export type TokenGroup = {
  title: string;
  description: string;
  tokens: string[];
};

export const COLOR_PRIMITIVES: TokenGroup[] = [
  {
    title: "Brand blue",
    description:
      "The site's one accent. 500 is the identity color; 600 carries the hero gradient; 100 is the highlighter behind “people”.",
    tokens: [
      "--blue-50",
      "--blue-100",
      "--blue-200",
      "--blue-300",
      "--blue-400",
      "--blue-500",
      "--blue-600",
      "--blue-700",
      "--blue-800",
      "--blue-900",
    ],
  },
  {
    title: "Cyan",
    description:
      "Never used alone — only as the far end of a gradient that starts in blue.",
    tokens: ["--cyan-300", "--cyan-400", "--cyan-500", "--cyan-600"],
  },
  {
    title: "Neutrals",
    description:
      "One ramp serves both themes. Light mode draws from the top, dark mode from the bottom.",
    tokens: [
      "--neutral-0",
      "--neutral-25",
      "--neutral-50",
      "--neutral-100",
      "--neutral-200",
      "--neutral-300",
      "--neutral-400",
      "--neutral-500",
      "--neutral-600",
      "--neutral-700",
      "--neutral-750",
      "--neutral-800",
      "--neutral-850",
      "--neutral-900",
      "--neutral-925",
      "--neutral-950",
      "--neutral-1000",
    ],
  },
];

export const COLOR_SEMANTIC: TokenGroup[] = [
  {
    title: "Content",
    description: "Text and icons, in descending order of emphasis.",
    tokens: [
      "--content-primary",
      "--content-secondary",
      "--content-tertiary",
      "--content-tertiary-light",
      "--content-inverse",
      "--content-accent",
    ],
  },
  {
    title: "Background",
    description:
      "site is the page itself; primary is a raised surface on top of it.",
    tokens: [
      "--background-site",
      "--background-primary",
      "--background-secondary",
      "--background-tertiary",
      "--background-inverse",
      "--background-veil",
    ],
  },
  {
    title: "Accent & structure",
    description: "Brand aliases and the hairlines that build the grid.",
    tokens: [
      "--primary-blue",
      "--secondary-blue",
      "--highlight-primary",
      "--layout-divider",
      "--border-subtle",
      "--border-default",
      "--border-strong",
      "--focus-ring",
    ],
  },
];

export const TYPE_SPECIMENS: {
  token: string;
  label: string;
  sample: string;
  element: "h1" | "h2" | "h3" | "h4" | "p";
}[] = [
  { token: "--text-h1", label: "h1", sample: "PROJECTS", element: "h1" },
  {
    token: "--text-h2",
    label: "h2",
    sample: "Software Engineer @ Bloomberg",
    element: "h2",
  },
  {
    token: "--text-h3",
    label: "h3",
    sample: "I have experience in the full stack",
    element: "h3",
  },
  { token: "--text-h4", label: "h4", sample: "New York, NY", element: "h4" },
  {
    token: "--text-base",
    label: "body",
    sample:
      "Upload images of your clothing to easily organize and categorize your entire wardrobe.",
    element: "p",
  },
];

export const SCALE_TOKENS: TokenGroup[] = [
  {
    title: "Type scale",
    description: "1rem base, ~1.25 ratio. Display steps are fluid clamps.",
    tokens: [
      "--text-2xs",
      "--text-xs",
      "--text-sm",
      "--text-base",
      "--text-lg",
      "--text-xl",
      "--text-2xl",
      "--text-3xl",
      "--text-4xl",
      "--text-5xl",
      "--text-6xl",
      "--text-display",
    ],
  },
  {
    title: "Line height",
    description: "Display type sits tight; body text gets room to breathe.",
    tokens: [
      "--leading-none",
      "--leading-tight",
      "--leading-snug",
      "--leading-normal",
      "--leading-relaxed",
    ],
  },
  {
    title: "Weight & tracking",
    description:
      "Roboto Flex carries the display weight; Libre Franklin the body.",
    tokens: [
      "--weight-regular",
      "--weight-medium",
      "--weight-semibold",
      "--weight-display",
      "--tracking-tight",
      "--tracking-normal",
      "--tracking-wide",
      "--tracking-display",
    ],
  },
];

export const SPACE_TOKENS = [
  "--space-1",
  "--space-2",
  "--space-3",
  "--space-4",
  "--space-5",
  "--space-6",
  "--space-8",
  "--space-10",
  "--space-12",
  "--space-16",
  "--space-24",
];

export const NAMED_SPACE_TOKENS = [
  "--space-gutter",
  "--space-section",
  "--space-section-lg",
];

export const RADIUS_TOKENS = [
  "--radius-none",
  "--radius-sm",
  "--radius-md",
  "--radius-lg",
  "--radius-xl",
  "--radius-2xl",
  "--radius-pill",
];

export const ELEVATION_TOKENS = [
  "--elevation-1",
  "--elevation-2",
  "--elevation-3",
  "--elevation-accent",
];

export const DURATION_TOKENS = [
  "--duration-instant",
  "--duration-fast",
  "--duration-base",
  "--duration-slow",
  "--duration-slower",
];

export const EASING_TOKENS = ["--ease-out", "--ease-in-out", "--ease-standard"];

export const LAYOUT_TOKENS = [
  "--layout-max",
  "--layout-max-narrow",
  "--nav-height",
  "--nav-height-expanded",
];
