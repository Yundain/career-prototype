/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9e1a21',
        'text-dark': '#101828',
        'text-mid': '#364153',
        'text-light': '#4a5565',
        'text-muted': '#99a1af',
        'border-base': '#e5e7eb',
        'border-step': '#d1d5dc',
        'bg-page': '#f9fafb',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
