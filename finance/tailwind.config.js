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
        "primary": "#6366F1",
        "primary-dark": "#4F46E5",
        "surface": "#F8FAFC",
        "card": "#FFFFFF",
        "on-surface": "#0F172A",
        "on-surface-variant": "#64748B",
        "success": "#10B981",
        "error": "#EF4444",
        "warning": "#F59E0B",
        "border": "#E2E8F0"
      },
      fontFamily: {
        "headline": ["Manrope", "sans-serif"],
        "body": ["Inter", "sans-serif"],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.02)',
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.04), 0 4px 10px -5px rgba(0, 0, 0, 0.02)',
        'elevated': '0 25px 60px -12px rgba(0, 0, 0, 0.08), 0 10px 30px -10px rgba(0, 0, 0, 0.03)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.15)',
        'hero-glow': '0 0 40px rgba(99, 102, 241, 0.12), 0 20px 50px -12px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem"
      },
      transitionDuration: {
        '200': '200ms',
      },
      animation: {
        'fade-in': 'fadeInUp 0.6s ease-out forwards',
        'chart-draw': 'drawLine 2s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        drawLine: {
          'from': { strokeDashoffset: '1000' },
          'to': { strokeDashoffset: '0' },
        }
      }
    },
  },
  plugins: [require('tailwindcss/plugin')(function({ addUtilities }) {
    addUtilities({
      '.glass-hero': {
        'background': 'rgba(255, 255, 255, 0.9)',
        'backdrop-filter': 'blur(10px)',
        '-webkit-backdrop-filter': 'blur(10px)',
      },
      '.glass-header': {
        'background': 'rgba(248, 250, 252, 0.85)',
        'backdrop-filter': 'blur(12px)',
        '-webkit-backdrop-filter': 'blur(12px)',
      },
      '.primary-gradient': {
        'background': 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
      },
      '.hover-card-effect': {
        'transition': 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          'transform': 'translateY(-4px)',
          'box-shadow': '0 20px 40px -12px rgba(0, 0, 0, 0.08)',
        }
      },
      '.custom-scrollbar::-webkit-scrollbar': {
        'width': '4px',
      },
      '.custom-scrollbar::-webkit-scrollbar-track': {
        'background': 'transparent',
      },
      '.custom-scrollbar::-webkit-scrollbar-thumb': {
        'background': '#E2E8F0',
        'border-radius': '10px',
      }
    })
  })],
}
