/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        "max-md": { max: "767px" }, // Custom max-md breakpoint
      },
      fontFamily: {
        sans: ['"Space Grotesk"', "Roboto", "ui-sans-serif", "system-ui"],
      },
      colors: {
        "custom-purple": "#8c48ff",
        "custom-orange": "#ff5f3d",
        "custom-blue": "#1664df",
        "custom-hover-purple": "#7a3ede",
        "custom-hover-orange": "#e65232",
      },
      backgroundImage: {
        "gradient-45": "linear-gradient(45deg, #8c48ff, #ff5f3d)",
        "gradient-hover": "linear-gradient(45deg, #7a3ede, #e65232)",
        "custom-gradient":
          "linear-gradient(135deg, rgba(140, 72, 255, 0.2), rgba(22, 100, 223, 0.2))",
        "custom-gradient-light":
          "linear-gradient(135deg, rgba(140, 72, 255, 0.1), rgba(22, 100, 223, 0.1))",
        "custom-gradient-ultra-light":
          "linear-gradient(135deg, rgba(140, 72, 255, 0.05), rgba(22, 100, 223, 0.05))",
      },
    },
  },
  plugins: [],
};
