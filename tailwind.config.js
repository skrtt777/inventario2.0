/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Procura nos arquivos do src todos com essas extensões
  ],
  theme: {
    extend: {
      colors: {
        // Cores personalizadas, se quiser pode ajustar aqui
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          600: '#2563eb',
        },
        indigo: {
          100: '#e0e7ff',
        },
      },
    },
  },
  plugins: [],
};
