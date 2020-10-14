const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {merge} = require('webpack-merge');
const {commBrowserConfig, commServerConfig} = require('./webpack.config.common');


var browserConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin()],
  optimization: {
    splitChunks: {
      maxSize: 1024 * 100,
    },
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCssAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: [
            'default', 
            {
              discardComments: {
                removeAll: true
              }
            }
          ],
        }
      })]
  }
};

var serverConfig = {
  mode: 'production'
};

module.exports = [merge(commBrowserConfig, browserConfig), merge(commServerConfig, serverConfig)];
