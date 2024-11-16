/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Define a specific color for 'accent'
        background: "#CDCDCD",
        foreground: "#F8F8F8",
        primary: { dark: "#023047", light: "#8ECAE6" },
        accent: "#FB8500",
        tertiary: "#219E8B",

        // Define a palette for 'primary'
        // primary: {
        //   100: "#eff6ff", // lightest
        //   200: "#dbeafe",
        //   300: "#bfdbfe",
        //   400: "#93c5fd",
        //   500: "#60a5fa", // default
        //   600: "#3b82f6",
        //   700: "#2563eb",
        //   800: "#1d4ed8",
        //   900: "#1e40af", // darkest
        // },
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"], // Add the font
      },
    },
  },
  plugins: [],
};
