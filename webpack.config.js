const path = require('path');


module.exports = {
    entry: ["@babel/polyfill", "./src/app.js"],
    output: {
        path: path.join(__dirname, "public"),
        publicPath: "",
        filename: "bundle.js"
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/,
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, "public"),
        port: 5500,
        watchContentBase: true,
        hot: true,
        watchOptions: {
            poll: true
        },
        disableHostCheck: true,
        historyApiFallback: true
    }
}