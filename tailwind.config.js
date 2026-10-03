/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        card: "var(--card)",
        ink: "var(--ink)",
        mut: "var(--mut)",
        line: "var(--line)",
        gold: "#C6A15B",
        sand: "#C9B28A",
        brand: "var(--brand)",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ["Inter", "Helvetica", "Arial", "sans-serif"],
      },
      keyframes: {
        rise: { from: { opacity: "0", transform: "translateY(14px)" }, to: { opacity: "1", transform: "none" } },
        bump: { "0%": { transform: "scale(1)" }, "40%": { transform: "scale(1.18)" }, "100%": { transform: "scale(1)" } },
      },
      animation: {
        rise: "rise .55s cubic-bezier(.2,.7,.2,1) both",
        bump: "bump .45s ease",
      },
    },
  },
  plugins: [],
};
