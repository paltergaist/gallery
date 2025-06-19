const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    gallery: "./src/gallery.js",
    "gallery.min": "./src/gallery.js",
  },
  output: {
    path: path.resolve(__dirname, "bundler"),
    filename: "[name].js",
    clean: true,
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.min\.js$/,
        extractComments: false,
      }),
      new CssMinimizerPlugin({
        test: /\.min\.css$/,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};
