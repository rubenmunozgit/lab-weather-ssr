const {merge} = require('webpack-merge')
const {commBrowserConfig, commServerConfig} = require('./webpack.config.common');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

var browserConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].bundle.js'
  },
  optimization: {
    splitChunks: {
      maxSize: 1024 * 100,
    },
  }
};

var serverConfig = {
  mode: 'production'
};

module.exports = [merge(commBrowserConfig, browserConfig), merge(commServerConfig, serverConfig)];
