/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.ts'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
