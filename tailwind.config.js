/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": "var(--primary-blue)",
        "secondary-blue": "var(--secondary-blue)",
        "content-primary": "var(--content-primary)",
        "content-secondary": "var(--content-secondary)",
        "content-tertiary": "var(--content-tertiary)",
        "background-primary": "var(--background-primary)",
        "background-secondary": "var(--background-secondary)",
        "background-tertiary": "var(--background-tertiary)",
        "highlight-primary": "var(--highlight-primary)",
        "layout-divider": "var(--layout-divider)",
        "background-site": "var(--background-site)",
      },
      borderColor: {
        light: "var(--border-light)",
      },
    },
  },
  plugins: [],
};
