const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    entry: "./boiler.js",
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
        }],
    },
    output: {
        filename: "dist/boiler.min.js",
        library: "Boiler",
        libraryTarget: "this",
        libraryExport: "default",
    },
};
