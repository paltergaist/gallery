const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const common = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};

const minified = {
  ...common,
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.min.js",
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "main.min.css" }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inject: "body",
      scriptLoading: "blocking",
      minify: true,
    }),
  ],
};

const unminified = {
  ...common,
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    clean: false,
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "main.css" }),
  ],
};

module.exports = [minified, unminified];
