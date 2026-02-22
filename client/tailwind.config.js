export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["General Sans", "Inter", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        xl: "24px",
        "2xl": "24px",
      },
      animation: {
        "fade-in": "fadeIn 300ms ease-out forwards",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
    },
  },
  plugins: [],
};
