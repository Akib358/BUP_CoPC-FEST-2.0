/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#092763', // Deep Navy Blue
          light: '#133e94',
          dark: '#05163a',
          glow: 'rgba(9, 39, 99, 0.4)',
        },
        accent: {
          cyan: '#00f2fe',
          emerald: '#10b981',
          gold: '#fbbf24', // Standard Yellow
          rose: '#f43f5e',
        },
        bgLight: {
          DEFAULT: '#0EA5E9', // Custom sky blue requested
          card: '#EEF4FA',
          border: '#0ea5e9',
        },
        bgDark: {
          DEFAULT: '#020b1e',
          card: '#051638',
          border: '#0d2d6c',
        }
      },
      fontFamily: {
        mono: ['Share Tech Mono', 'monospace'],
        sans: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'scroll-left': 'scroll-left 25s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'grid-drift': 'grid-drift 20s linear infinite',
      },
      keyframes: {
        'scroll-left': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            opacity: '0.4',
            transform: 'scale(1)' 
          },
          '50%': { 
            opacity: '0.8',
            transform: 'scale(1.02)' 
          },
        },
        'grid-drift': {
          '0%': { 'background-position': '0 0' },
          '100%': { 'background-position': '40px 40px' },
        }
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(9, 39, 99, 0.35)',
        'glow-cyan': '0 0 20px rgba(0, 242, 254, 0.25)',
        'glow-gold': '0 0 20px rgba(251, 191, 36, 0.25)',
      }
    },
  },
  plugins: [],
}