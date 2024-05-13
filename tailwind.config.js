import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx,html}'
  ],
  theme: {
    extend: {}
  },
  darkMode: 'class', // or 'media' or 'class
  plugins: [nextui()]
};
