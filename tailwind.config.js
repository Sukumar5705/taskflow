/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        bg:        '#0b0d14',
        surface:   '#11141c',
        raised:    '#1a1e28',
        line:      'rgba(238,240,245,0.08)',
        line2:     'rgba(238,240,245,0.12)',
        text:      '#eef0f5',
        text2:     '#a3a9b8',
        muted:     '#7a8296',
        accent:    '#4C6EF5',
        'accent-ink': '#0b1020',
        positive:  '#4cc38a',
        negative:  '#e5484d',
        warning:   '#e8a33d',
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        rise: { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
      animation: {
        rise: 'rise 0.32s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
    },
  },
  plugins: [],
};
