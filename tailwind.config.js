/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "node_modules/daisyui/dist/**/*.js", "node_modules/react-daisyui/dist/**/*.js"],
  theme: {
    extend: {
      colors: {
        'blue': '#ABD2DC',
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};


