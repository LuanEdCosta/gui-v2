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
    publicPath: '/mfe/reports',
    path: path.join(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      Assets: path.resolve('./src/assets'),
    },
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'reports',
      filename: 'remoteEntry.js',
      exposes: {
        './Reports': './src/bootstrap',
      },
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: dependencies.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: dependencies['react-dom'],
        },
        '@material-ui/styles': {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['@material-ui/styles'],
        },
        '@material-ui/core': {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['@material-ui/core'],
        },
        '@material-ui/icons': {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['@material-ui/icons'],
        },
        '@material-ui/lab': {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['@material-ui/lab'],
        },
        '@material-ui/pickers': {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['@material-ui/pickers'],
        },
        'prop-types': {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['prop-types'],
        },
        'react-transition-group': {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['react-transition-group'],
        },
        clsx: {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['clsx'],
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
