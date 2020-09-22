const isDev = process.env.NODE_ENV === "development";
const webpack = require("webpack");
const path = require("path");

const config = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "dist/",
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [],
    target: "web",
};
if (isDev) {
    config.devServer = {
        port: 9090,
        // host: "0.0.0.0",
        overlay: {
            errors: true,
        },
        hot: true, // 当修改一个组件时只修改当前的部分，不需要修改整个页面
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(), // 作用：HMR插件将HMR Runtime代码嵌入到bundle中，能够操作APP代码，完成代码替换
        new webpack.NoEmitOnErrorsPlugin() // 作用：跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误。
    );
}
module.exports = config;
