import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: ['class'],
    theme: {
        extend: {
            fontFamily: {
                primary: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
            },
            colors: {
                'burnt-sienna': {
                    50: '#fef5f2',
                    100: '#fee8e2',
                    200: '#fed5ca',
                    300: '#fcb8a5',
                    400: '#f88f71',
                    500: '#f07755',
                    600: '#dc4e26',
                    700: '#b93e1c',
                    800: '#99371b',
                    900: '#7f321d',
                    950: '#45170a',
                },
                dark: '#161615',
            },
            keyframes: {
                flicker: {
                    '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
                        opacity: '0.99',
                        filter: 'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
                    },
                    '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
                        opacity: '0.4',
                        filter: 'none',
                    },
                },
                shimmer: {
                    '0%': {
                        backgroundPosition: '-700px 0',
                    },
                    '100%': {
                        backgroundPosition: '700px 0',
                    },
                },
            },
            animation: {
                flicker: 'flicker 3s linear infinite',
                shimmer: 'shimmer 1.3s linear infinite',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
