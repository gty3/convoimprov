/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    // height: theme => ({
    //   auto: 'auto',
    //   ...theme('spacing'),
    //   full: '100%',
    //   screen: 'calc(var(--vh) * 100)',
    // }),
    // minHeight: theme => ({
    //   '0': '0',
    //   ...theme('spacing'),
    //   full: '100%',
    //   screen: 'calc(var(--vh) * 100)',
    // }),
  },
  plugins: [],
}
