const merge = require('webpack-merge').merge;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//清空之前编译文件 
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');//多进程压缩js
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const baseConfig = require('./webpack.config.base.js');
const smp = new SpeedMeasurePlugin();
// const utils = require('./utils');

const prodConfig = {
  mode: 'production',  // webpack4指定模式
  devtool: 'none',    // 指定source map来增强调试过程
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'fast-sass-loader',
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({             // 提取css文件
      filename: "css/[name].[hash:7].css",
    }),
    // 拷贝输出静态资源
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: utils.resolve('./src/assets'),
    //       to: utils.resolve('./dist/assets')
    //     }
    //   ]
    // }),
    // new BundleAnalyzerPlugin(),
    new WebpackParallelUglifyPlugin({
      workerCount: 4, // 开启几个子进程去并发的执行压缩，默认是当前电脑的cpu数量减1
      uglifyES: {
        output: {
          beautify: false, // 不需要格式化
          comments: false // 不保留注释
        },
        compress: {
          warnings: false, // Uglifyjs 删除没有代码时，不输出警告
          drop_console: true, // 删除所有console语句
          collapse_vars: true,
          reduce_vars: true
        }
      }
    }),
  ],

}

// module.exports = smp.wrap(merge(baseConfig, prodConfig))
module.exports = merge(baseConfig, prodConfig)