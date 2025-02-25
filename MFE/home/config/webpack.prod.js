const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const commonConfig = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const dependencies = require('../package.json').dependencies;

const domain = process.env.PRODUCTION_DOMAIN || '/mfe';

const prodConfig = {
  mode: 'production',
  entry: path.resolve('./src/index'),
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/mfe/home',
    path: path.join(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'home',
      filename: 'remoteEntry.js',
      exposes: {
        './Home': './src/bootstrap',
      },
      shared: {
        ...dependencies,
        react: {
          eager: true,
          singleton: true,
          requiredVersion: dependencies.react,
        },
        'react-dom': {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['react-dom'],
        },
        '@material-ui/styles': {
          eager: false,
          singleton: true,
          requiredVersion: dependencies['@material-ui/styles'],
        },
        '@material-ui/core': {
          singleton: true,
          requiredVersion: dependencies['@material-ui/core'],
        },
        '@material-ui/icons': {
          singleton: true,
          requiredVersion: dependencies['@material-ui/icons'],
        },
      },
      remotes: {
        sharedComponents: `sharedComponents@${domain}/common/remoteEntry.js`,
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
