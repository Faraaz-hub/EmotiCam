import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        'comic': ['Comic Sans MS', 'cursive'],
        'fun': ['Fredoka One', 'Comic Sans MS', 'cursive'],
      },
      colors: {
        'rainbow': {
          'red': '#FF6B6B',
          'orange': '#FFB347',
          'yellow': '#FFD93D',
          'green': '#6BCF7F',
          'blue': '#4ECDC4',
          'indigo': '#45B7D1',
          'purple': '#96CEB4',
          'pink': '#FFEAA7',
        },
        'pastel': {
          'pink': '#FFB3D9',
          'blue': '#B3D9FF',
          'green': '#B3FFB3',
          'yellow': '#FFFFB3',
          'purple': '#D9B3FF',
          'orange': '#FFD9B3',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'rainbow': 'rainbow 3s linear infinite',
        'bounce-fun': 'bounceFun 1.5s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'jiggle': 'jiggle 0.5s ease-in-out infinite',
        'heart-beat': 'heartBeat 1.5s ease-in-out infinite',
        'color-shift': 'colorShift 4s ease-in-out infinite',
        'bubble': 'bubble 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        rainbow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        bounceFun: {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translateY(0)' },
          '40%, 43%': { transform: 'translateY(-15px)' },
          '70%': { transform: 'translateY(-7px)' },
          '90%': { transform: 'translateY(-3px)' },
        },
        jiggle: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '25%': { transform: 'scale(1.05) rotate(1deg)' },
          '50%': { transform: 'scale(1.1) rotate(0deg)' },
          '75%': { transform: 'scale(1.05) rotate(-1deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        heartBeat: {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.1)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.1)' },
          '70%': { transform: 'scale(1)' },
        },
        colorShift: {
          '0%': { backgroundColor: '#FF6B6B' },
          '25%': { backgroundColor: '#4ECDC4' },
          '50%': { backgroundColor: '#45B7D1' },
          '75%': { backgroundColor: '#96CEB4' },
          '100%': { backgroundColor: '#FF6B6B' },
        },
        bubble: {
          '0%': { transform: 'scale(1) translateY(0)' },
          '50%': { transform: 'scale(1.05) translateY(-5px)' },
          '100%': { transform: 'scale(1) translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} satisfies Config;
