module.exports = {
    entry: "./app.js",
    module: {
        rules: [{
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
        filename: "circular-progress-bar.min.js",
        library: "CircularProgressBar",
        libraryTarget: "this",
        libraryExport: "default",
    },
};
