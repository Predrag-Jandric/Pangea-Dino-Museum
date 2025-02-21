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

        grayOne: "#d4d4d8", // good
        greenOne: "#22c55e",
        greenOneHover: "#19b352",

        // primary: "rgb(255, 24, 166)",
        // secondary: "rgb(140, 51, 217)",
        // highlight: "rgb(52, 239, 200)",
        dark: "#3E3C3C",
        // dark: "#D93737",
        // light: "rgb(246, 254, 223)",
      },

      // "Comic Sans MS" for testing
      // Work Sans and Nunito not integrated into the app at this time!
      fontFamily: {
        titles: ["Playfair Display", "serif"],
        body: ["Proza Libre", "serif"],
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
        "custom": "0 4px 6px -1px rgb(0, 0, 0, 1)"
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
