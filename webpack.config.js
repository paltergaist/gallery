const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  const commonRules = [
    {
      test: /\.html$/i,
      use: {
        loader: 'html-loader',
        options: {
          minimize: true
        },
      },
    },
    {
      test: /\.js$/,
      use: 'babel-loader',
      exclude: '/node_modules/',
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'images/[name][ext]',
      },
    },
    {
      test: /\.(woff2?|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'fonts/[name][ext]',
      },
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          }
        },
        'postcss-loader',
      ]
    }
  ];

  // Конфигурация для dist (без очистки)
  const distConfig = {
    entry: {
      main: './script.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[contenthash].js',
      publicPath: '/',
      assetModuleFilename: 'assets/[name][ext]',
    },
    mode: argv.mode || 'development',
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'),
        publicPath: '/',
      },
      open: true,
      compress: true,
      port: 8080,
      historyApiFallback: {
        disableDotRule: true,
      }
    },
    module: {
      rules: commonRules
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public'),
            to: path.resolve(__dirname, 'dist'),
            noErrorOnMissing: true,
            globOptions: {
              ignore: ['**/.DS_Store'],
            },
          }
        ]
      })
    ]
  };

  // Конфигурация для библиотеки (bundlers)
  const bundlersConfig = {
    entry: './script.js',
    output: {
      filename: 'simple-gallery.min.js',
      path: path.resolve(__dirname, 'bundlers'),
      library: {
        name: 'SimpleGallery',
        type: 'umd',
        export: 'default'
      },
      globalObject: 'this',
    },
    mode: 'production',
    module: {
      rules: commonRules
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            format: {
              comments: false,
            },
          },
        }),
      ],
    },
    plugins: [
      new CleanWebpackPlugin({  // Очищаем только bundlers перед сборкой
        cleanOnceBeforeBuildPatterns: ['bundlers/*']
      }),
      new MiniCssExtractPlugin({
        filename: 'simple-gallery.min.css'
      }),
    ],
    externals: {
      // Внешние зависимости (если есть)
    }
  };

  return [distConfig, bundlersConfig];
};