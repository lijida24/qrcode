const webpack = require('webpack')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const base_config = require('./base')
const package = require('../package.json')

module.exports = merge(base_config, {
  plugins: [
    new cleanWebpackPlugin(["dist"]),
    new webpack.BannerPlugin('qrcode version ' + package.version + ' by lijida24@163.com')
  ]
})