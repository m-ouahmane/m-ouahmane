/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fffeec',
          100: '#fffacd',
          200: '#fff49c',
          300: '#fff06c',
          400: '#3674B5', // Couleur primaire principale (jaune du logo)
          500: '#f6dd00',
          600: '#578FCA',
          700: '#b19500',
          800: '#8f7400',
          900: '#6c5500',
          950: '#443700',
        },
        secondary: {
          50: '#ecf3f7',
          100: '#d3e2ea',
          200: '#a7c6d6',
          300: '#7ba9c3',
          400: '#4e8daf',
          500: '#3674b5', // Couleur secondaire principale (bleu du logo)
          600: '#305f99',
          700: '#2a4f7d',
          800: '#244162',
          900: '#1e3246',
          950: '#142239',
        },
        light: {
          50: '#f2f9ff', // Fond clair principal
          100: '#e6f3ff',
          200: '#bae6ff',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['Fira Code', 'ui-monospace', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'custom': '0 4px 6px -1px rgba(246, 221, 0, 0.1), 0 2px 4px -1px rgba(246, 221, 0, 0.06)',
        'custom-lg': '0 10px 15px -3px rgba(246, 221, 0, 0.1), 0 4px 6px -2px rgba(246, 221, 0, 0.05)',
      },
      textColor: {
        muted: 'var(--color-muted)',
      }
    },
  },
  plugins: [],
}
