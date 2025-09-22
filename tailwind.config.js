/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
          'inter': ['Inter', 'sans-serif'],
          'poppins': ['Poppins', 'sans-serif'],
          'bengali': ['Noto Sans Bengali', 'sans-serif'],
        },
          colors: {
            // Primary color palette - Modern orange/amber
            'primary': '#f97316', // Orange-500
            'primary-dark': '#ea580c', // Orange-600
            'primary-light': '#fed7aa', // Orange-200
            
            // Secondary color palette - Neutral grays
            'secondary': '#64748b', // Slate-500
            'secondary-dark': '#475569', // Slate-600
            'secondary-light': '#cbd5e1', // Slate-300
            
            // Accent color - Deep red for highlights
            'accent': '#dc2626', // Red-600
            'accent-light': '#fecaca', // Red-200
            
            // Background colors
            'bg-primary': '#ffffff', // White
            'bg-secondary': '#f8fafc', // Slate-50
            'bg-tertiary': '#f1f5f9', // Slate-100
            
            // Text colors
            'text-primary': '#0f172a', // Slate-900
            'text-secondary': '#475569', // Slate-600
            'text-tertiary': '#94a3b8', // Slate-400
            
            // Status colors
            'success': '#059669', // Emerald-600
            'warning': '#d97706', // Amber-600
            'error': '#dc2626', // Red-600
            'info': '#0284c7', // Sky-600
          },
          animation: {
            'fade-in': 'fade-in 0.6s ease-out forwards',
            'bounce-slow': 'bounce 2s infinite',
            'pulse-slow': 'pulse 3s infinite',
            'glow': 'glow 2s ease-in-out infinite alternate',
            'float': 'float 3s ease-in-out infinite',
            'shimmer': 'shimmer 2s linear infinite',
            'wiggle': 'wiggle 1s ease-in-out infinite',
            'ripple': 'ripple 0.6s ease-out',
            'scale-press': 'scale-press 0.2s ease-out',
            'slide-up': 'slide-up 0.3s ease-out',
          },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'glow': {
          '0%': {
            'box-shadow': '0 0 5px rgba(255, 107, 53, 0.5)',
          },
          '100%': {
            'box-shadow': '0 0 20px rgba(255, 107, 53, 0.8), 0 0 30px rgba(255, 107, 53, 0.6)',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'shimmer': {
          '0%': {
            'background-position': '-200% 0',
          },
          '100%': {
            'background-position': '200% 0',
          },
        },
            'wiggle': {
              '0%, 100%': {
                transform: 'rotate(-3deg)',
              },
              '50%': {
                transform: 'rotate(3deg)',
              },
            },
            'ripple': {
              '0%': {
                transform: 'scale(0)',
                opacity: '1',
              },
              '100%': {
                transform: 'scale(4)',
                opacity: '0',
              },
            },
            'scale-press': {
              '0%': {
                transform: 'scale(1)',
              },
              '50%': {
                transform: 'scale(0.95)',
              },
              '100%': {
                transform: 'scale(1)',
              },
            },
            'slide-up': {
              '0%': {
                transform: 'translateY(100%)',
                opacity: '0',
              },
              '100%': {
                transform: 'translateY(0)',
                opacity: '1',
              },
            },
      },
          backgroundImage: {
            'app-gradient': 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
            'card-gradient': 'linear-gradient(145deg, #ffffff 0%, #F9FAFB 100%)',
            'metro-gradient': 'linear-gradient(135deg, #6B7280 0%, #9CA3AF 100%)',
          },
    },
  },
  plugins: [],
}
