
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
        'postcss-modules': {
            // generateScopedName: isProduction ? 'gt[sha1:hash:hex:4]' : '[local]',
            generateScopedName: '[local]',
            getJSON: (cssFileName, content) => {
                typescriptCss({
                    cssFileName,
                    content,
                })();
            },
        }
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
