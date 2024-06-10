/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#F77171",
      },
      height: {
        card: "570px",
      },
    },
  },
  plugins: [require("tailwindcss-filters")],
};
