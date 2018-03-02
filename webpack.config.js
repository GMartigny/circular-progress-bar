const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    entry: "./circular-progress-bar.js",
    plugins: [
        new UglifyJsPlugin(),
    ],
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                },
            },
        }, {
            test: /\.css/,
            use: ["style-loader", {
                loader: "css-loader",
                options: {
                    minimize: true,
                },
            }],
        }],
    },
    output: {
        filename: "dist/circular-progress-bar.min.js",
        library: "CircularProgressBar",
        libraryTarget: "this",
        libraryExport: "default",
    },
};
