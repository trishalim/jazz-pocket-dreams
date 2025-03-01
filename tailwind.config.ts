import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

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
  plugins: [],
};
export default config;
