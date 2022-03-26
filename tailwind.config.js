module.exports = {
    mode: 'jit',
    content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'opse-red': '#D7282F',
                'opse-blue': '#101820',
            },
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
};
