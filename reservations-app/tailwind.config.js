/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: { max: "620px" },

      ms: { max: "750px" },

      md: { max: "935px" },

      lg: { max: "1024px" },

      xl: { max: "1400px" },

      "2xl": { max: "1600px" },
    },
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
