const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const packageJson = require('../../package.json');
const vendorDependencies = Object.keys(packageJson['dependencies']);

module.exports = {
    context: process.cwd(), // to automatically find tsconfig.json
    entry: {
        main: [
            'core-js',
            'whatwg-fetch',
            './src/index.tsx'
        ],
        vendor: vendorDependencies.filter(function (dependency) {
            return dependency !== 'core-js' && // core-js is used in main to polyfill missing apis
                dependency !== 'bulma' &&
                dependency !== 'react-icons';
        })
    },
    output: {
        path: path.join(process.cwd(), 'dist'),
        filename: '[name].js',
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
        new ForkTsCheckerWebpackPlugin({
            async: false,
            memoryLimit: 4096,
            checkSyntacticErrors: true
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.API_BASE_URL': JSON.stringify('#{ApiBaseUrl}'),
            'process.env.APP_BASE_URL': JSON.stringify('#{AppBaseUrl}'),
            'process.env.LOGIN_APP_BASE_URL': JSON.stringify('#{LoginAppBaseUrl}'),
            'process.env.LOGIN_API_BASE_URL': JSON.stringify('#{LoginApiBaseUrl}'),
        }),
        new HtmlWebpackPlugin({
            hash: true,
            inject: true,
            template: 'src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: [
                    // { loader: 'cache-loader' },
                    // {
                    //     loader: 'thread-loader',
                    //     options: {
                    //         // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                    //         workers: require('os').cpus().length - 1,
                    //     },
                    // },
                    { loader: 'ts-loader', options: { happyPackMode: true } }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            camelCase: true,
                            importLoaders: 2,
                            minimize: true
                        }
                    },
                    { loader: 'resolve-url-loader' },
                    { loader: "sass-loader?sourceMap" }
                ]
            },
            {
                test: /\.svg/,
                use: {
                    loader: 'svg-url-loader',
                    options: {
                        noquotes: false
                    }
                }
            },
            {
            test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                    },
                ]
            },
            {
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$/,
                loader: 'file-loader?name=[name].[hash].[ext]'
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    }
};
