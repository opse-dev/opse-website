const colors = require('tailwindcss/colors');

export default {
    colorScheme: 'dark',
    colors: {
        dark: Object.keys(colors.slate)
            .map((key) => colors.slate[key])
            .slice(1, 8),
        gray: Object.keys(colors.gray).map((key) => colors.gray[key]),
        red: Object.keys(colors.red).map((key) => colors.red[key]),
        pink: Object.keys(colors.pink).map((key) => colors.pink[key]),
        grape: Object.keys(colors.purple).map((key) => colors.purple[key]),
        violet: Object.keys(colors.violet).map((key) => colors.violet[key]),
        indigo: Object.keys(colors.indigo).map((key) => colors.indigo[key]),
        blue: Object.keys(colors.blue).map((key) => colors.blue[key]),
        cyan: Object.keys(colors.cyan).map((key) => colors.cyan[key]),
        teal: Object.keys(colors.teal).map((key) => colors.teal[key]),
        green: Object.keys(colors.green).map((key) => colors.green[key]),
        lime: Object.keys(colors.lime).map((key) => colors.lime[key]),
        yellow: Object.keys(colors.yellow).map((key) => colors.yellow[key]),
        orange: Object.keys(colors.orange).map((key) => colors.orange[key]),
    },
};
