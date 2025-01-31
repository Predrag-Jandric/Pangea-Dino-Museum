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
        // primary: "#4489C5",
        // primaryHover: "#639DCF",

        // grayOne: "#d4d4d8",
        // greenOne: "#22c55e",
        // greenOneHover: "#19b352",

        
        
        primary: "rgb(255, 24, 166)",
        secondary: "rgb(140, 51, 217)",
        highlight: "rgb(52, 239, 200)",
        dark: "rgb(21, 1, 79)",
        light: "rgb(246, 254, 223)",
      },

      // "Comic Sans MS" for testing
      // Work Sans and Nunito not integrated into the app at this time!
      fontFamily: {
        // headings: ["Work Sans", "sans-serif"],
        body: ["Nunito", "sans-serif"],
        pressStart: ['"Press Start 2P"', "serif"]
      },
      fontSize: {
        headings: "1.5rem",
        body: "1.05rem",
      },
      borderRadius: {
        custom: "5px",
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
