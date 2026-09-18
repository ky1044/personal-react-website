/** @type {import('tailwindcss').Config} */

/* Every value below resolves to a custom property defined in
   src/style/tokens.css. Keep the two files in sync — tokens.css is the
   source of truth, this file is only the Tailwind surface for it. */

/**
 * Wraps a token so Tailwind's opacity modifiers work on it.
 *
 * A plain "var(--x)" color silently loses its value the moment you write
 * `bg-foo/70`, because Tailwind emits `rgb(var(--x) / 0.7)` and the variable
 * holds a hex string, not channels. color-mix keeps the token readable and
 * makes `/70` behave.
 */
const token = (name) =>
  ({ opacityValue }) =>
    opacityValue === undefined || opacityValue === 1
      ? `var(${name})`
      : `color-mix(in srgb, var(${name}) calc(${opacityValue} * 100%), transparent)`;
module.exports = {
  darkMode: "class",
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand
        "primary-blue": token("--primary-blue"),
        "secondary-blue": token("--secondary-blue"),
        blue: {
          50: token("--blue-50"),
          100: token("--blue-100"),
          200: token("--blue-200"),
          300: token("--blue-300"),
          400: token("--blue-400"),
          500: token("--blue-500"),
          600: token("--blue-600"),
          700: token("--blue-700"),
          800: token("--blue-800"),
          900: token("--blue-900"),
        },
        // Content
        "content-primary": token("--content-primary"),
        "content-secondary": token("--content-secondary"),
        "content-tertiary": token("--content-tertiary"),
        "content-tertiary-light": token("--content-tertiary-light"),
        "content-inverse": token("--content-inverse"),
        "content-accent": token("--content-accent"),
        // Background
        "background-site": token("--background-site"),
        "background-primary": token("--background-primary"),
        "background-secondary": token("--background-secondary"),
        "background-tertiary": token("--background-tertiary"),
        "background-inverse": token("--background-inverse"),
        "background-veil": token("--background-veil"),
        // Accent / structure
        "highlight-primary": token("--highlight-primary"),
        "layout-divider": token("--layout-divider"),
      },
      borderColor: {
        subtle: token("--border-subtle"),
        DEFAULT: token("--border-default"),
        strong: token("--border-strong"),
        light: token("--border-default"),
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
        mark: "var(--font-mark)",
      },
      fontSize: {
        // Additive only — Tailwind's numeric scale (text-sm ... text-4xl)
        // already matches these tokens and keeps its paired line-heights.
        "2xs": "var(--text-2xs)",
        display: "var(--text-display)",
        h1: "var(--text-h1)",
        h2: "var(--text-h2)",
        h3: "var(--text-h3)",
        h4: "var(--text-h4)",
      },
      lineHeight: {
        none: "var(--leading-none)",
        tight: "var(--leading-tight)",
        snug: "var(--leading-snug)",
        normal: "var(--leading-normal)",
        relaxed: "var(--leading-relaxed)",
      },
      letterSpacing: {
        tight: "var(--tracking-tight)",
        normal: "var(--tracking-normal)",
        wide: "var(--tracking-wide)",
        display: "var(--tracking-display)",
      },
      fontWeight: {
        regular: "var(--weight-regular)",
        medium: "var(--weight-medium)",
        semibold: "var(--weight-semibold)",
        display: "var(--weight-display)",
      },
      spacing: {
        // Additive only — the numeric scale stays Tailwind's 4px rhythm,
        // which --space-* in tokens.css mirrors. These are the named
        // section-level steps used by page layout.
        gutter: "var(--space-gutter)",
        section: "var(--space-section)",
        "section-lg": "var(--space-section-lg)",
      },
      borderRadius: {
        none: "var(--radius-none)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        1: "var(--elevation-1)",
        2: "var(--elevation-2)",
        3: "var(--elevation-3)",
        accent: "var(--elevation-accent)",
      },
      transitionDuration: {
        instant: "var(--duration-instant)",
        fast: "var(--duration-fast)",
        base: "var(--duration-base)",
        slow: "var(--duration-slow)",
        slower: "var(--duration-slower)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
        "in-out": "var(--ease-in-out)",
        standard: "var(--ease-standard)",
      },
      maxWidth: {
        layout: "var(--layout-max)",
        "layout-narrow": "var(--layout-max-narrow)",
      },
    },
  },
  plugins: [],
};
