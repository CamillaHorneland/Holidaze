/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "node_modules/daisyui/dist/**/*.js", "node_modules/react-daisyui/dist/**/*.js"],
  theme: {
    extend: {
      colors: {
        'blue': '#ABD2DC',
        'light-blue': '#E5F1F4',
        'dark-blue': '#5490A0'
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};


