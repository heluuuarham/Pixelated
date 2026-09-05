/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // All tokens map to CSS variables so light/dark mode swaps cleanly.
        // Defined in src/index.css under :root/.light and .dark.
        ink: {
          50: 'var(--text)',
          100: 'var(--text)',
          200: 'var(--text-muted)',
          300: 'var(--text-muted)',
          400: 'var(--text-faint)',
          500: 'var(--text-faint)',
        },
        workshop: {
          900: 'var(--bg)',
          800: 'var(--surface)',
          700: 'var(--surface-2)',
          600: 'var(--surface-3)',
          500: 'var(--surface-3)',
        },
        brass: {
          400: 'var(--accent-hover)',
          500: 'var(--accent)',
          600: 'var(--accent-hover)',
          700: 'var(--accent-hover)',
        },
        stamp: {
          500: 'var(--error)',
          600: 'var(--error)',
        },
        teal: {
          500: 'var(--success)',
          600: 'var(--success)',
        },
      },
      fontFamily: {
        display: ['"Anton"', 'sans-serif'],
        serif: ['"Fraunces"', 'serif'],
        mono: ['"Space Mono"', 'monospace'],
        sans: ['"Space Grotesk"', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        shell: '1280px',
      },
      keyframes: {
        toastIn: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        toastOut: {
          '0%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(20px) scale(0.96)' },
        },
        flyToCart: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8' },
          '100%': { opacity: '0', transform: 'scale(0.2) translate(var(--fly-x), var(--fly-y))' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        toastIn: 'toastIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards',
        toastOut: 'toastOut 0.3s ease forwards',
        flyToCart: 'flyToCart 0.7s cubic-bezier(0.5,-0.2,0.7,1) forwards',
        fadeUp: 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        shimmer: 'shimmer 1.5s linear infinite',
      },
    },
  },
  plugins: [],
};
