const HtmlWebpackPlugin = require('html-webpack-plugin');// HTML注入
const VueLoaderPlugin = require('vue-loader/lib/plugin'); //.vue 文件编译
const AutoDllPlugin = require('autodll-webpack-plugin');
const utils = require('./utils');
const WebpackBar = require('webpackbar');
const baseConfig = {
  entry: './src/main.js',
  output: {
    // publicPath: '.',
    path: utils.resolve('dist'),
    filename: 'js/[name].[hash].bundle.js',
    chunkFilename: 'js/[name].[hash].chunk.js'
  },
  resolve: { // 构建解析
    mainFiles: ['index'],               // 解析目录时默认使用文件
    modules: ['src', 'node_modules'],    // 解析模块搜索目录,优化模块查找路径
    extensions: ['.vue', '.js'], // 自动解析确定的扩展,优化文件查找效率
    alias: {
      'apis': utils.resolve('src/apis'),
      'utils': utils.resolve('src/utils'),
      'views': utils.resolve('src/views'),
      'assets': utils.resolve('src/assets'),
      'routes': utils.resolve('src/routes'),
      'styles': utils.resolve('src/styles'),
      'components': utils.resolve('src/components'),
      'directives': utils.resolve('src/directives'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: "[name]-[contenthash:7].[ext]",
            limit: 10000, // size <= 10KB
            outputPath: 'assets/images',
            publicPath: '../assets/images',
          }
        }
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[name]-[hash:5].min.[ext]',
            limit: 5000,
            publicPath: '../static/fonts/',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new WebpackBar(),
    new HtmlWebpackPlugin({
      inject: true,
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      },
      filename: 'index.html',
      template: 'index.html'
    }),
    new AutoDllPlugin({
      inject: true,
      filename: '[name].[hash].dll.js',
      path: 'dll',
      publicPath: '.',
      entry: {
        vendor: [
          'vue',
          'vue-router',
          'element-ui'
        ]
      }
    }),
  ],
  optimization: { // webpack4优化配置
    splitChunks: {
      name: true,                // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，此选项可接收 function
      chunks: "async",           // 代码块类型 必须三选一： "initial"（初始化） | "all"(默认就是all) | "async"（动态加载minSize: 0,                // 最小尺寸，默认0
      minChunks: 1,              // 模块被引用 默认1
      minSize: 30000,            // 模块超过30k自动被抽离成公共模块
      maxAsyncRequests: 5,       // 最大异步请求数 默认1
      maxInitialRequests: 3,     // 一个入口并发最大初始化请求数 默认1
      automaticNameDelimiter: '~', // 命名分隔符
      cacheGroups: {                  // 缓存组会继承splitChunks的配置，但是test、priorty和reuseExistingChunk只能用于配置缓存组。
        default: {
          minChunks: 2,           // 模块被引用>=2次，拆分至vendors公共模块
          priority: -20,            // 缓存组优先级
          reuseExistingChunk: true,// 默认使用已有的模块
        },
        // vendors: {                   // key 为entry中定义的 入口名称
        //   // test: /vue/,            // 正则规则验证，如果符合就提取 chunk
        //   name: "venders",         // 要缓存的 分隔出来的 chunk 名称
        //   chunks: 'all',
        //   enforce: true,
        //   priority: 1,             // 缓存组优先级 false | object
        // }
      }
    }
  }
}

module.exports = baseConfig