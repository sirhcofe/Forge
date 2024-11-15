module.exports = {
  content: [
    "./path_to_your_files/**/*.{html,js,jsx,ts,tsx}", // adjust path as necessary
  ],
  theme: {
    extend: {
      colors: {
        // Define a specific color for 'accent'
        accent: "#f97316", // This is a Tailwind CSS orange-500 as an example

        // Define a palette for 'primary'
        primary: {
          100: "#eff6ff", // lightest
          200: "#dbeafe",
          300: "#bfdbfe",
          400: "#93c5fd",
          500: "#60a5fa", // default
          600: "#3b82f6",
          700: "#2563eb",
          800: "#1d4ed8",
          900: "#1e40af", // darkest
        },
      },
    },
  },
  plugins: [],
};
