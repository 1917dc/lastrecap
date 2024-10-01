/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,svelte,js,ts}'],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#d51007",

          "secondary": "#700000",

          "accent": "#6b7280",

          "neutral": "#303030",

          "base-100": "#212121",

          "info": "#e0e0e0",

          "success": "#168821",

          "warning": "#ffcd07",

          "error": "#e52207",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}

