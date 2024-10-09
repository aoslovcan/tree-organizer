/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', './src/**/*.{html, js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        color: {
          primaryText: '#1E1E1E',
          error: '#DC3C3C'
        },
        background: {
          primary: '#C1DCDC',
          secondary: '#869F9F',
          success: '#008000',
          error: '#DC3C3C'
        }
      }
    }
  },
  plugins: []
};
