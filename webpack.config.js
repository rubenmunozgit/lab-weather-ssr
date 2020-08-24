const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devMode = process.env.NODE_ENV !== "production";

var browserConfig = {
  entry: './src/universal/index.js',
  output: {
    path: path.join(__dirname, 'build', 'static'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js)$/, 
        exclude: /node_modules/, 
        use: 'babel-loader'
      },
      {
        test: /\.svg$/, 
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  //mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'true',
    }),
    new HtmlWebpackPlugin({
      filename: '../views/404.hbs',
      template: path.resolve(__dirname, 'src', 'views', '404.handlebars'),
      excludeChunks: [ 'main' ]
    }),
    new HtmlWebpackPlugin({
      filename: '../views/main.hbs',
      template: path.resolve(__dirname, 'src', 'views', 'main.handlebars'),
      minify: devMode ? false : {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
  ],
};

var serverConfig = {
  entry: './src/server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'server.js',
    publicPath: '/',
  },
  //mode: 'production',
  module: {
    rules: [
      { 
        test: /\.(js)$/, 
        use: 'babel-loader' 
      },
      {
        test: /\.svg$/, 
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'false',
    }),
  ],
};

module.exports = [browserConfig, serverConfig];
