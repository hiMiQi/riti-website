/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F7F8FA",
        ink: "#24262B",
        muted: "#6F7480",
        line: "#E8ECF2",
        blue: {
          50: "#EEF5FF",
          100: "#DCEAFF",
          500: "#2E6BB8",
          600: "#255DA3",
          700: "#1F4F8A",
        },
        warm: "#F4C76A",
        chestnut: "#8B4A2F",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(55, 64, 83, 0.10)",
        card: "0 14px 34px rgba(44, 57, 79, 0.08)",
        glow: "0 0 0 5px rgba(46, 107, 184, 0.12), 0 14px 28px rgba(46, 107, 184, 0.18)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Microsoft YaHei",
          "PingFang SC",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
