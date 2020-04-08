const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: "development",
  entry: {
    '404': path.resolve(__dirname, './src/page/404/entry.js'),
    '500': path.resolve(__dirname, './src/page/500/entry.js'),
    'index': path.resolve(__dirname, './src/page/index/entry.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: "./",
    filename: "[name].[hash:8].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: '/node_modules/'
      }, {
        test: /\.scss$/,
        // use: ['style-loader',
        //   'css-loader','sass-loader']
        use: [MiniCssExtractPlugin.loader,
          'css-loader', 'postcss-loader','sass-loader']
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      entryName: 'index',
      template: path.resolve(__dirname, './src/page/index/index.html'),
      filename: "index.html",
      title: "hello index"
    }),
    new HtmlWebpackPlugin({
      entryName: '404',
      template: path.resolve(__dirname, './src/page/404/index.html'),
      filename: "404.html",
      title: "hello 404",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash:8].css"
    })
  ],
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunks: "all",   // 共有3个值"initial"，"async"和"all"。配置后，代码分割优化仅选择初始块，按需块或所有块
      minSize: 30000,   // （默认值：30000）块的最小大小
      minChunks: 1,    // （默认值：1）在拆分之前共享模块的最小块数
      maxAsyncRequests: 5,   //（默认为5）按需加载时并行请求的最大数量
      maxInitialRequests: 3,  //（默认值为3）入口点的最大并行请求数
      automaticNameDelimiter: '~',  // 默认情况下，webpack将使用块的来源和名称生成名称，例如vendors~main.js
      name: true,
      cacheGroups: {  // 以上条件都满足后会走入cacheGroups进一步进行优化的判断
        commons: {
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0 // This is example is too small to create commons chunks
        },
        react: {
          test: /react/,
          chunks: "initial",
          name: "react",
          priority: 11,
          enforce: true
        },
        vendors: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        },
        // default: {   //所有代码分割快都符合默认值，此时判断priority优先级
        //   minChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true   // 允许在模块完全匹配时重用现有的块，而不是创建新的块。
        // }
      }
    }
  },

}
