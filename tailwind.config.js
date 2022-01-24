module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    "./node_modules/@themesberg/flowbite/**/*.js"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@themesberg/flowbite/plugin')
  ],
}

// purge: [
//  './src/**/*.html',
//  './src/**/*.js',
// ],