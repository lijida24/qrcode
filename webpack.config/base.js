const path = require('path')

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'qrcode.min.js',
    publicPath: '/',
    library: 'qrcode',
    libraryTarget: 'umd',
    umdNamedDefine: false,
    globalObject: 'this',
    libraryExport: 'default'
  },
  resolve: {
    extensions: [' ', '.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: "/node_modules/"
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      }
    ]
  }
}
