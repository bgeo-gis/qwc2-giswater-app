const webpack = require('webpack');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const today = new Date();
const buildDate = today.getFullYear() + "." + String(1 + today.getMonth()).padStart(2, '0') + "." + String(today.getDate()).padStart(2, '0');

module.exports = (env, argv) => {
    const isProd = argv.mode === "production";

    return {
        entry: {
            QWC2App: path.resolve(__dirname, 'js', 'app.jsx')
        },
        output: {
            hashFunction: 'sha256',
            path: path.resolve(__dirname, 'prod'),
            filename: 'dist/QWC2App.js',
            assetModuleFilename: 'dist/[hash][ext][query]'
        },
        watchOptions: {
            ignored: /node_modules(\\|\/)(?!qwc2)/
        },
        devtool: isProd ? 'source-map' : 'inline-source-map',
        optimization: {
            minimize: isProd
        },
        devServer: {
            static: [
                {
                    directory: path.resolve(__dirname, 'static'),
                    publicPath: '/'
                }
            ],
            compress: true,
            hot: true,
            port: 8080
        },
        resolve: {
            extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
            fallback: {
                path: require.resolve("path-browserify"),
                stream: require.resolve("stream-browserify"),
                buffer: require.resolve("buffer/"),
                timers: require.resolve("timers-browserify")
            }
        },
        snapshot: {
            managedPaths: [/(.*(\\|\/)node_modules(\\|\/)(?!qwc2))/]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(argv.mode),
                    BuildDate: JSON.stringify(buildDate),
                    Buffer: ['buffer', 'Buffer'],
                    process: 'process/browser'
                }
            }),
            new webpack.NormalModuleReplacementPlugin(/openlayers$/, path.join(__dirname, "qwc2", "libs", "openlayers")),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "index.html"),
                build: buildDate,
                hash: true
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: 'static' }
                ]
            })
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'ts-loader',
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        {loader: 'style-loader'},
                        {loader: 'css-loader'}
                    ]
                },
                {
                    test: /(.woff|.woff2|.png|.jpg|.gif|.svg|.glb)/,
                    type: 'asset/inline'
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules(\\|\/)(?!qwc2)/,
                    use: {
                        loader: 'babel-loader',
                        options: { babelrcRoots: ['.', path.resolve(__dirname, 'node_modules', 'qwc2')] }
                    }
                },
                {
                    test: /(.mjs|.js)$/,
                    type: 'javascript/auto'
                },
                {
                    test: /\.js$/,
                    enforce: "pre",
                    use: ["source-map-loader"]
                }
            ]
        }
    };
};