var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

var browserConfig = {
  entry: './src/universal/index.js',
  output: {
    path: path.join(__dirname, 'build', 'static', 'js'),
    filename: '[name].bundle.js',
    publicPath: '/'
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
          name: '[name].[hash].[ext]',
          outputPath: '../svg',
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
          name: '[name].[hash].[ext]',
          outputPath: 'static/svg',
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
