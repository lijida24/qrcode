const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const base_config = require('./base')

module.exports = merge(base_config, {
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    host: 'dev.f2e.163.com',
    port: 3306,
    compress: true,
    open: true,
    inline: true,
    hot: true,
    disableHostCheck: true
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: './test/index.html',
      inject: false
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
})