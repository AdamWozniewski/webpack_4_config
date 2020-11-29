const { merge } = require('webpack-merge');
const path = require('path');
const parts = require('./webpack.parts');
const pathToBuild = require('./static').PATH_TO_BUILD;

const config = {
  entry: [
    'react-hot-loader/patch',
    './src/index.jsx',
    // app: './src/index.tsx', // @TS
  ],
  output: {
    path: path.resolve('./dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'development',
};

const prod = merge([
  parts.loadJS(),
  parts.loadSCSS({
    isDev: true,
  }),
  parts.loadImages({
    isDev: true,
  }),
  parts.loadFonts(),
  parts.loadHTML({
    pluginOptions: {
      title: 'Custom template',
      filename: 'index.html',
      template: path.resolve(__dirname, './../src/template/template.html'),
      nimify: {},
    },
  }),
  parts.devServer({
    contentBase: path.join(pathToBuild),
    hot: true,
  }),
  parts.browserSync(),
]);

module.exports = merge(config, prod);
