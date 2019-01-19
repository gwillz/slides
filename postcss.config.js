
const typescriptCss = require('postcss-typescript-css');
const isProduction = (process.env.NODE_ENV === 'production');

module.exports = {
    map: !isProduction,
    plugins: {
        'postcss-import': {},
        'postcss-preset-env': {
            stage: 0,
            features: {
                'custom-properties': {
                    preserve: false,
                },
            },
        },
        'autoprefixer': {},
        'postcss-scrollbar': {},
    }
}

if (isProduction) {
    module.exports.plugins =
    Object.assign(module.exports.plugins, {
        'cssnano': {
            preset: 'default',
        },
    })
}
