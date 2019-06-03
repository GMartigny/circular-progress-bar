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
        filename: "circular-progress-bar.min.js",
        library: "CircularProgressBar",
        libraryTarget: "window",
        libraryExport: "default",
    },
};
