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
        fuelYellow: "rgb(255,167,0)",
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
        fueldeyserifreg: "SerifRegular",
        fueldeyserifitalic: "SerifItalic",
      },
      boxShadow: {
        "form-bx-sh": "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
