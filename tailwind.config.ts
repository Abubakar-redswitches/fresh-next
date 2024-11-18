import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "semi-white": "#FFFFFF38",
        "custom-bg": "rgba(250, 250, 250, 0.9)",
      },
    },
  },
  plugins: [],
};
export default config;
