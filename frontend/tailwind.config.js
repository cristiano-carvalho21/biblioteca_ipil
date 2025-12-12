/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",           // necessário para Vite
    "./src/**/*.{js,jsx,ts,tsx}"  // todos os arquivos React/JS/TS dentro de src
  ],
  theme: {
    extend: {
       colors: {
        laranja: {
          50:  "#FFF4E9",
          100: "#FFE2C5",
          200: "#FFC38A",
          300: "#FFA553",
          400: "#FF8E2C",
          500: "#F86417", // cor base F86417
          600: "#D96411",
          700: "#B7500D",
          800: "#8E3C0B",
          900: "#5C2607",
        },
        cinza: {
          50:  "#FAFAFA",
          100: "#F0F0F0",
          300: "#E5E5E5",
          500: "#BFBFBF",
          700: "#7A7A7A",
          900: "#3A3A3A",
        },
         preto: {
          100: "#1A1A1A",
          300: "#0F0F0F",
          500: "#000000",
        },
        branco:{
          50: "#F9F9F9",
          100: "#FFFFFF"
        }
      }
    },
  },
  plugins: [],
}


