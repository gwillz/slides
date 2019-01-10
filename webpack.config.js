// @ts-check
const path = require('path')
const BundleAnalyzerPlugin  = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const presetMode = process.env.NODE_ENV || 'development';
const isProduction = (presetMode === 'production');

module.exports = {
    entry: {
        'index': path.resolve(__dirname, 'src/index.tsx'),
    },
    output: {
        // filename: isProduction ? '[id].[chunkhash].js' : '[id].js',
        filename: '[name].js',
        path: path.resolve(__dirname, 'public'),
        publicPath: "/",
        pathinfo: false,
    },
    mode: presetMode,
    devtool: isProduction ? false : 'cheap-module-source-map',
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: {
            chunks: 'all',
        },
    },
    performance: {
        maxAssetSize: 3000000, // 3mb
        maxEntrypointSize: 3000000, // 3mb
    },
    module: {
        rules: [
            {
                test: /\.(js|json|ts|tsx)$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'ts-loader',
                options: {
                    transpileOnly: false,
                    experimentalWatchApi: true,
                    configFile: path.resolve(__dirname, 'tsconfig.json'),
                },
            },
        ],
    },
    resolve: {
        extensions: [
            '.js', '.json',
            '.ts', '.ts.d', '.tsx',
        ],
    },
    plugins: [],
}

if (isProduction) {
    module.exports.plugins = module.exports.plugins.concat([
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: path.resolve(__dirname, 'report.html'),
        }),
    ])
}
