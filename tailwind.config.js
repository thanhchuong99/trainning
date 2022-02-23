module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sora: ["Sora"],
    },
    extend: {
      colors: {
        "primary-blue": "#1b87c6",
        "secondary-white": "#C5C2C1",
      },
      fontSize: {
        13: "13px",
        14: "14px",
        16: "16px",
        20: "20px",
        26: "26px",
        24: "24px",
        32: "32px",
        36: "36px",
        48: "48px",
      },
      boxShadow: {
        md: "6px 6px 16px 0 rgba(0, 0, 0, 0.25),-4px -4px 12px 0 rgba(255, 255, 255, 0.3);",
      },
    },
  },
  plugins: [],
};
