/** @type {import('tailwindcss').Config} */
import {nextui} from '@nextui-org/theme'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'blue': '#1fb6ff',
      'blue2': '#00b5f1',
      'blue3': '#e8f2f7',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'red': '#e74c3c',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
    },
    darkMode: "class",
    plugins: [nextui()],
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      textW: {
        fontSize: '16px',
        color: '#f0f0f0',
        fontWeight: 400,
        lineHeight: '25px'
      },
      liMenu: {
        backgroundColor: '#f0f0f0',
        color: '#333',
        fontWeight: 400,
        fontSize: '1.125rem',
      },
      animation: {
        'neon-glow': 'neon-glow 1.5s infinite alternate',
      },
      keyframes: {
        'neon-glow': {
          from: {
            textShadow: '0 0 5px #fff, 0 0 10px #00c4ff, 0 0 20px #00c4ff, 0 0 30px #00c4ff, 0 0 40px #00c4ff, 0 0 50px #00c4ff, 0 0 60px #00c4ff',
          },
          to: {
            textShadow: '0 0 10px #fff, 0 0 20px #00c4ff, 0 0 30px #00c4ff, 0 0 40px #00c4ff, 0 0 50px #00c4ff, 0 0 60px #00c4ff, 0 0 70px #00c4ff',
          },
        },
      },
    }
  },
  plugins: [],
}

