/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        footer: "#0a4151",
        home: "#015871",
        border: "#4e4b66",
        footerText: "rgba(252,252,252,0.6)",
        solution: "#3e4a56",
        darkcyan: "rgb(0,139,139)",
        career: "rgba(10,65,81,0.5)",
      },
      fontFamily: {
        helvetica: "Helvetica",
        serif: "Serif",
        italiana: "Italiana",
        lato: "Lato",
        latothin: "LatoThin",
        manrope: "Manrope",
        pacifico: "Pacifico",
        poppins: "Poppins",
      },
    },
  },
  plugins: [],
};
