/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'tibet-red': '#8B1A1A',   // 硃砂紅
        'tibet-gold': '#D4AF37',  // 金色
        'tibet-blue': '#0F4C81',  // 藏青藍
        'tibet-white': '#F8F4E3', // 羊皮紙白
      },
      backgroundImage: {
        'tibet-pattern': "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
      }
    },
  },
  plugins: [],
}
