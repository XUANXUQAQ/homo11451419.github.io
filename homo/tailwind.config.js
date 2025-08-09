/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent1: 'var(--accent1)',
        accent2: 'var(--accent2)',
        muted: 'var(--muted)',
      },
      fontFamily: {
        sans: ['Poppins', 'Noto Sans SC', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
