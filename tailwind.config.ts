import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}","./components/**/*.{ts,tsx}","./lib/**/*.{ts,tsx}"],
  theme: { extend: {
    fontFamily: { sans: ['"Hiragino Kaku Gothic ProN"','"Noto Sans JP"','system-ui','sans-serif'] },
    colors: {
      // アクセント＝鮮やかなブルー
      brand: {
        50:"#eff6ff",100:"#dbeafe",200:"#bfdbfe",300:"#93c5fd",400:"#60a5fa",
        500:"#3b82f6",600:"#2563eb",700:"#1d4ed8",800:"#1e40af",900:"#1e3a8a" },
      // 見出し＝濃いネイビー
      navy: {
        50:"#f1f5fb",100:"#dde8f5",200:"#b9cde8",300:"#8badd6",400:"#5a86bf",
        500:"#3767a6",600:"#274e85",700:"#1e3d6b",800:"#132a4d",900:"#0b1c38" },
      // 水色
      sky2: { 100:"#e0f2fe",200:"#bae6fd",300:"#7dd3fc",400:"#38bdf8",500:"#0ea5e9" } },
    boxShadow: { card: "0 1px 3px rgba(15,42,77,.06), 0 8px 24px rgba(15,42,77,.06)" },
  } },
  plugins: [],
};
export default config;
