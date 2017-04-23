const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack/hot/only-dev-server',
        './src/app.tsx'
    ],
    output: {
        filename: 'app.js',
        path: path.resolve('dist/dev')
    },
    devServer: {
        contentBase: 'public',
        hot: true, // Live-reload
        port: 4001
    },
    devtool: 'source-map',
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.PrefetchPlugin("process/browser"),
        new webpack.PrefetchPlugin("strip-ansi/index"),
        new webpack.PrefetchPlugin("url/url"),
        new webpack.PrefetchPlugin("webpack/hot/log-apply-result"),
        new webpack.PrefetchPlugin("react-tap-event-plugin/src/injectTapEventPlugin"),
        new webpack.PrefetchPlugin("react/react")
    ],
    module: {
        rules: [
            {
                test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$/,
                loader: 'url-loader',
                query: {
                    name: '[path][name].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.tsx?$/,
                exclude: /(node_modules)/,
                use: [
                    { loader: 'react-hot-loader/webpack' },
                    { loader: 'ts-loader' }
                ]
            }
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css"]
    }
};
