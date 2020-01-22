const { resolve } = require("path");

module.exports = {
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "less-loader",
                    },
                ],
            },
        ],
    },
    entry: "./src/index.js",
    output: {
        path: resolve(__dirname, "./public"),
        filename: "circular-progress-bar.min.js",
        library: "CircularProgressBar",
        libraryTarget: "window",
        libraryExport: "default",
    },
};
