const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

var commBrowserConfig = {
  entry: './src/universal/index.js',
  output: {
    path: path.join(__dirname, 'build', 'static'),
    publicPath: 'static/',
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
          limit: 10000,
        },
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/].*\.js$/,
          enforce: true,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'true',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(
            __dirname,
            'node_modules',
            'bootstrap',
            'dist',
            'css',
            'bootstrap.min.css'
          ),
          to: path.join(
            __dirname,
            'build',
            'views',
            'partials',
            'baseline.hbs'
          ),
        },
      ],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(
            __dirname,
            'src',
            'universal',
            'components',
            'Icons'
          ),
          filter: async (resourcePath) => {
            const filterSources = [
              'sunrise',
              'sunset',
              'umbrella',
              'wind',
              'map-pin',
              'droplet',
            ];
            if (filterSources.some((value) => resourcePath.includes(value))) {
              return false;
            }
            return true;
          },
          to: path.join(__dirname, 'build', 'static', 'icons'),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: '../views/404.hbs',
      template: path.resolve(__dirname, 'src', 'views', '404.handlebars'),
      favicon: path.resolve(__dirname, 'src', 'favicons', 'favicon.ico'),
      excludeChunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      filename: '../views/main.hbs',
      template: path.resolve(__dirname, 'src', 'views', 'main.handlebars'),
      favicon: path.resolve(__dirname, 'src', 'favicons', 'favicon.ico'),
      inject: false // loadadable/server does the inject
    }),
    new LoadablePlugin(),
  ],
};

var commServerConfig = {
  entry: './src/server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'server.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.svg$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.css$/,
        use: ['null-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'false',
    }),
  ],
};

module.exports = { commBrowserConfig, commServerConfig };
