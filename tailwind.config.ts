import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}","./components/**/*.{ts,tsx}","./lib/**/*.{ts,tsx}"],
  theme: { extend: {
    fontFamily: { sans: ['"Hiragino Kaku Gothic ProN"','"Noto Sans JP"','system-ui','sans-serif'] },
    colors: { brand: {
      50:"#fff7ed",100:"#ffedd5",200:"#fed7aa",300:"#fdba74",400:"#fb923c",
      500:"#f97316",600:"#ea580c",700:"#c2410c",800:"#9a3412",900:"#7c2d12" },
      leaf: { 500:"#16a34a",600:"#15803d",700:"#166534" } },
  } },
  plugins: [],
};
export default config;
