const { merge } = require('webpack-merge');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const dependencies = require('../package.json').dependencies;

const domain = process.env.PRODUCTION_DOMAIN || 'gui_common';

const prodConfig = {
  mode: 'production',
  entry: path.resolve('src/index.js'),
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/mfe/common',
    path: path.join(__dirname, '../dist'),
  },
  resolve: {
    alias: {
      Components: path.resolve('./src/components'),
      Assets: path.resolve('./src/assets'),
      Utils: path.resolve('./src/utils'),
      Constants: path.resolve('./src/constants'),
      Hooks: path.resolve('./src/hooks'),
      Services: path.resolve('./src/adapters/services'),
      APIs: path.resolve('./src/adapters/api'),
    },
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'sharedComponents',
      filename: 'remoteEntry.js',
      exposes: {
        './Cards': './src/components/Cards',
        './Checkbox': './src/components/Checkbox',
        './Constants': './src/constants',
        './Containers': './src/components/Containers',
        './CollapsibleList': './src/components/CollapsibleList',
        './CopyTextToClipboardButton': './src/components/CopyTextToClipboardButton',
        './DataTable': './src/components/DataTable',
        './Dialogs': './src/components/Dialogs',
        './EmptyPlaceholder': './src/components/EmptyPlaceholder',
        './Header': './src/components/Header',
        './Hooks': './src/hooks',
        './Loading': './src/components/Loading',
        './MainLayout': './src/components/Layouts/MainLayout.jsx',
        './MapMarkers': './src/components/MapMarkers',
        './Paginator': './src/components/Paginator',
        './PrivateRoute': './src/components/Routes',
        './StepIcon': './src/components/StepIcon',
        './StepLine': './src/components/StepLine',
        './Table': './src/components/Table',
        './Tabs': './src/components/Tabs',
        './TemplatesTable': './src/components/TemplatesTable',
        './WizardForms': './src/components/WizardForms',
        './Utils': './src/utils',
      },
      shared: {
        ...dependencies,
        react: {
          eager: true,
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
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
