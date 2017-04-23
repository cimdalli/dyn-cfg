var webpack = require('webpack')
var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = {
    entry: {
        app: './src/app.tsx'
    },
    output: {
        filename: 'app.js',
        path: path.resolve('dist/prod/public')
    },
    devtool: 'source-map',
    plugins: [
        new CopyWebpackPlugin([
            {
                from: 'public'
            }
        ])
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
                test: /\.tsx?$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            noEmitHelpers: true
                        }
                    }
                }]
            }
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css"]
    },
};