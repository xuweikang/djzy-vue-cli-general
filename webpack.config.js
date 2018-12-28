let environment = function (_nodeEnv) {
  let ret = {
    entry: './src/entry.js',
    inputPath: './src',
    outputPath: '/' + _nodeEnv[0] + '/wechat',
    env: _nodeEnv[0],
  }
  return ret
}

let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let TransferWebpackPlugin = require('transfer-webpack-plugin')
let VueLoaderPlugin = require('vue-loader/lib/plugin')

let rootPath = path.resolve(__dirname, './')
let _env = environment(process.env.NODE_ENV.split('@'))
let config = require('./src/config/' + _env.env)
let json = require('./package.json')
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
let CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
// let CompressionPlugin = require('compression-webpack-plugin');

let ret = {
  entry: {
    entry: _env.inputPath + '/entry.js',
  },
  output: {
    path: path.resolve(__dirname, './dist' + _env.outputPath),
    filename: 'wx/[name].js?[chunkhash]',
    chunkFilename: 'wx/js/[name].js?[chunkhash]',
  },

  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      tkAppId: config.tkAppId,
      aliyunArmsId: config.aliyunArmsId,
      version: json.version,
      lastcompiletime:Date.parse(new Date()), //eslint-disable-line
      filename: 'main.html',
      template: './main.html',
      inject: 'body',
      hash: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
    //拷贝服务器资源到dist目录
    new TransferWebpackPlugin([
      { from: './static', to: './' },
    ], path.resolve(__dirname, 'src')),
    new VueLoaderPlugin(),
    // new CompressionPlugin(),
    new CaseSensitivePathsPlugin(),
  ],
  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'test')],
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter')
        },
      },
      {
        test: /\.less$/,
        use: ['vue-style-loader', 'css-loader', 'less-loader'],
      },
      { test: /\.(png|jpg|gif)$/, use: ['url-loader?limit=16384&name=../../img/[hash].[ext]'] },
      { test: /\.(woff|svg|eot|ttf)\??.*$/, use: ['url-loader?limit=50000&name=[path][name].[ext]'] },
      { test: /\.js$/, exclude: [/node_modules/, /NIM_Web_SDK.*\.js/, /NIM_Web_NIM.*\.js/], use: ['babel-loader'], },
    ]
  },

  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ],
    extensions: ['.js', '.json', '.less', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.min.js',
      '@': path.resolve('./src'),
      "config": path.resolve(rootPath, './src/config/' + _env.env),
    }
  },

  devServer: {
    index: 'main.html'
  }
}

if (_env.env.indexOf('devhttp') > -1 || _env.env.indexOf('prohttp') > -1) {
  ret.devtool = 'source-map'
  ret.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  )
}

module.exports = ret
