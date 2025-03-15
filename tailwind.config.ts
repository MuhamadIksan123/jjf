import type { Config } from 'tailwindcss';

export default {
  content: ['./app/pages/**/*.{js,ts,jsx,tsx,mdx}', './app/components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        blackJF: '#262626',
        blackJ: '#444543',
        blackJT: '#283847',
        brownJ: '#606060',
        orangeJ: '#EF9F3F',
        grayJ: '#566A7F',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
} satisfies Config;
