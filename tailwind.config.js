/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      fontSize: {
        'paragraph': '18px',
        'h1': '48px',
        'h2': '32px',
        'h3': '24px',
      },
      lineHeight: {
        'paragraph': '150%',
      },
      spacing: {
        '8': '8px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '40': '40px',
        '48': '48px',
      },
      colors: {
        // Light Theme
        'light-bg': '#FFFBF1',
        'light-secondary': '#FFFFFF',
        'accent': '#FF9269',
        'light-text': '#5D5237',
        
        // Dark Theme
        'dark-bg': '#0F0D0E',
        'dark-secondary': '#231F20',
        'dark-tertiary': '#353132',
        'dark-text': '#FFFBF1',
      },
      boxShadow: {
        'card': '4px 4px 0px 0px #000000',
      },
    },
  },
  plugins: [],
}