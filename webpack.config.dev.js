const {merge} = require('webpack-merge')
const {commBrowserConfig, commServerConfig} = require('./webpack.config.common')

var browserConfig =  {
  mode: 'development',
  output: {
    filename: '[name].bundle.js'
  },
  optimization: {
    splitChunks: {
      maxSize: 0,
    },
  },
};

var serverConfig = {
  mode: 'development'
};

module.exports = [merge(commBrowserConfig, browserConfig), merge(commServerConfig, serverConfig)];
