const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js', // Ваш основной JS-файл
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    port: 3000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i, // Обрабатываем CSS-файлы
        use: [
          'style-loader', // Вставляет стили в DOM через <style>
          'css-loader'    // Позволяет импортировать CSS в JS
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // Ваш HTML-шаблон
    })
  ],
  resolve: {
    extensions: ['.js'] // Автоматическое разрешение расширений
  }
};