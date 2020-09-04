const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const merge = require('webpack-merge').merge;
const baseConfig = require('./webpack.config.base.js')
const utils = require('./utils')

const devConfig = {
  mode: 'development',  // webpack4指定模式
  devtool: 'cheap-module-eval-source-map', // 指定source map来增强调试过程
  devServer: {
    hot: true,    // 开启HMR
    open: true,   // 运行自动打开浏览器
    inline: true, // 自动刷新模式:inline/iframe
    compress: false, // 开启Gzip压缩
    overlay: { warnings: false, errors: true },
    contentBase: utils.resolve('dist'), // 将dist目录下的文件，作为可访问文件。
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'fast-sass-loader',
        ]
      }
    ]
  },
  plugins: [
    new HardSourceWebpackPlugin(),
    new webpack.SourceMapDevToolPlugin(),
    new webpack.HotModuleReplacementPlugin(),  //热模块更新
    new FriendlyErrorsWebpackPlugin(),
  ]
}

module.exports = merge(baseConfig, devConfig)