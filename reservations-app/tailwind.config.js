/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-orange": "#F96D00",
        "custom-black": "#222831",
        "custom-text-black": "#313131",
        "custom-grey": "#393E46",
        "custom-white": "#aaaaaa",
      },
    },
  },
  plugins: [],
};
