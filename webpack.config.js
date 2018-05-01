const path = require("path")
const webpack = require('webpack')

module.exports = {
    entry: ["./src/index.js"],
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                ],
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        modules: [path.join(__dirname, 'src'), 'node_modules']
    },
    devServer: {
        proxy: { // proxy URLs to backend development server
            '/app': 'http://localhost:9191'
        },
        contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        // hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload
    },
    devtool:'eval-source-map'

}
