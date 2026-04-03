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
        "primary-light": "#818CF8",
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
        "grotesk": ["Space Grotesk", "sans-serif"],
      },
      boxShadow: {
        'soft': '0 2px 12px rgba(0, 0, 0, 0.03)',
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.05), 0 4px 10px -5px rgba(0, 0, 0, 0.02)',
        'elevated': '0 25px 60px -12px rgba(0, 0, 0, 0.1), 0 10px 30px -10px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 24px rgba(99, 102, 241, 0.2)',
        'glow-lg': '0 0 40px rgba(99, 102, 241, 0.25)',
        'hero-glow': '0 0 60px rgba(99, 102, 241, 0.1), 0 20px 50px -12px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 40px -12px rgba(99, 102, 241, 0.12), 0 8px 20px -8px rgba(0, 0, 0, 0.06)',
        'inner-glow': 'inset 0 1px 1px rgba(255, 255, 255, 0.8)',
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem"
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
      },
    },
  },
  plugins: [require('tailwindcss/plugin')(function({ addUtilities }) {
    addUtilities({
      '.glass-hero': {
        'background': 'rgba(255, 255, 255, 0.88)',
        'backdrop-filter': 'blur(16px) saturate(180%)',
        '-webkit-backdrop-filter': 'blur(16px) saturate(180%)',
      },
      '.glass-header': {
        'background': 'rgba(248, 250, 252, 0.82)',
        'backdrop-filter': 'blur(20px) saturate(180%)',
        '-webkit-backdrop-filter': 'blur(20px) saturate(180%)',
      },
      '.primary-gradient': {
        'background': 'linear-gradient(135deg, #6366F1 0%, #4F46E5 50%, #4338CA 100%)',
      },
      '.primary-gradient-soft': {
        'background': 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(79, 70, 229, 0.04) 100%)',
      },
      '.hover-card-effect': {
        'transition': 'all 350ms cubic-bezier(0.22, 1, 0.36, 1)',
        '&:hover': {
          'transform': 'translateY(-4px)',
          'box-shadow': '0 20px 40px -12px rgba(99, 102, 241, 0.1), 0 8px 20px -8px rgba(0, 0, 0, 0.05)',
        }
      },
    })
  })],
}
