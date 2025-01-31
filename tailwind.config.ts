import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'my-color-01': '#7BC74D',
        'my-color-02': '#222831',
        'my-color-03': '#393E46',
        'my-color-04': '#EEEEEE',
      },
    },
  },
  plugins: [],
} satisfies Config;
