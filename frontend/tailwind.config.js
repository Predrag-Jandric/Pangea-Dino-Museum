/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // pure colors
        pureWhite: "#ffffff",
        pureBlack: "#000000",

        // primary colors
        primary: "#4489C5",
        primaryHover: "#639DCF",

        bgcolor: "#F7F7F7",
        bgcolortwo: "#EFEFEF",

        grayOne: "#d4d4d8", // good
        greenOne: "#22c55e",

        dark: "#3E3C3C",
      },

      // Comic Sans MS and Papyrus for testing
      fontFamily: {
        titles: ["Londrina Solid", "serif"],
        body: ["Poppins", "serif"],
        // titles: ["Comic Sans MS", "serif"],
        // body: ["Papyrus", "serif"],
      },
      fontSize: {
        titlessize: "2rem",
        textsize: "1rem",
      },
      borderRadius: {
        custom: "0px",
      },
      boxShadow: {
        custom: "0 7px 10px -2px rgb(0, 0, 0, 0.1)",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1536px",
      },
    },
    plugins: [],
  },
};
