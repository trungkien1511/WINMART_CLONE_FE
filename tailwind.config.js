/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontSize: {
                h1: ['clamp(2rem,1.2rem+3vw,3rem)', { lineHeight: '1.1' }],
                h2: ['2rem', { lineHeight: '1.2' }],
                body: ['1rem', { lineHeight: '1.6' }],
                price: ['1.25rem', { lineHeight: '1.35' }],
                'price-lg': ['1.5rem', { lineHeight: '1.3' }],
                'price-sm': ['1rem', { lineHeight: '1.4' }],
                caption: ['0.75rem', { lineHeight: '1.3' }]
            }
        }
    }
};
