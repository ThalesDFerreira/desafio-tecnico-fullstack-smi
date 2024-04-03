/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        rgb: {
          preto: '#000000',
          cinza: '#767f7c',
          vermelho: '#ff693e',
        },
      },
    },
  },
  plugins: [],
};