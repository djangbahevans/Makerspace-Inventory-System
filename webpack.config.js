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
    optimization: {
        minimize: true
    },
};
