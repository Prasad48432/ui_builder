/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primarybg': '#0a0a0a',
        'secondarybg': '#141414',
        'primarytext': '#ededed',
        'primarybrdr': 'rgb(255 255 255 / .145)',
      },
      animation: {
        shine: "shine 4s linear infinite"
      },
      keyframes: {
        shine: {
          "0%": {
            backgroundPosition: "0 0",
          },
          "33.33%": {
            backgroundPosition: "-220% 0",
          },
          "100%": {
            backgroundPosition: "-220% 0", // Maintain end state during delay
          },
        }
      },
    },
  },
  plugins: [],
};
