export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      spacing: {
        4: "4px",
        8: "8px",
        12: "12px",
        16: "16px",
        24: "24px",
        32: "32px",
        40: "40px",
        48: "48px",
        64: "64px",
        80: "80px",
        96: "96px",
      },
      borderRadius: {
        "2xl": "20px",
        "3xl": "24px",
      },
      fontSize: {
        h1: ["32px", { lineHeight: "1.2", fontWeight: "600" }],
        "h1-landing": ["48px", { lineHeight: "1.1", fontWeight: "600", letterSpacing: "-0.02em" }],
        h2: ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        body: ["15px", { lineHeight: "1.6" }],
        caption: ["12px", { letterSpacing: "0.2em", textTransform: "uppercase" }],
      },
      colors: {
        white: {
          DEFAULT: "#FFFFFF",
          80: "rgba(255, 255, 255, 0.8)",
          10: "rgba(255, 255, 255, 0.1)",
          5: "rgba(255, 255, 255, 0.05)",
        },
      },
      backdropBlur: {
        xl: "20px",
      },
    },
  },
  plugins: [],
};
