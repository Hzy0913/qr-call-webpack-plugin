const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const QrCodeWebpackPlugin = require('./index')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: __dirname + '/example/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    after: function server(app, server, compiler) {
      app.get('/test', function (req, res) {
        console.log('test')
        res.send()
      })
    }
  },
  module: {
    rules: [{
      test: /(\.jsx|\.js)$/,
      use: {
        loader: 'babel-loader',
      },
      exclude: /node_modules/
    }]
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new QrCodeWebpackPlugin({
      small: true,
      fileNames: 'index.js'
    }),
  ]
}
