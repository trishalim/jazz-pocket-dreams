import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-fraunces)"],
      },
      colors: {
        purple: {
          ...colors.purple,
          950: "#211f5a",
        },
        amber: {
          50: "#fffcf1",
          ...colors.amber,
        },
      },
    },
  },
  plugins: [
    plugin(({ addBase }) =>
      addBase({
        ":root": {
          "--p-border-color": colors.slate[200],
          "--p-invert-border-color": colors.slate[800],
        },
        "*": {
          borderColor: "var(--p-border-color)",
        },
        "@media (prefers-color-scheme: dark)": {
          "*": {
            borderColor: "var(--p-invert-border-color)",
          },
        },
        "*:focus": {
          outline: "none",
        },
      }),
    ),
  ],
};
export default config;
