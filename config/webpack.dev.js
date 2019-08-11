const merge = require('webpack-merge');
const path = require('path');
// const webpack = require('webpack'); // dla Webpack @3

const parts = require('./webpack.parts');

const config = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js',
    // app: './src/index.tsx', // @TS
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './../dist'),
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
      filename: 'index.html',
      template: path.resolve(__dirname, './../src/template/template.html'),
      nimify: false,
    },
  }),
  parts.devServer({
    contentBase: path.join(__dirname, './../dist'),
  }),
  parts.browserSync(),
  // { // Dla Webpack @3
  //   plugins: [
  //     new webpack.DefinePlugin({
  //       'process.env.NODE_ENV': JSON.stringify("development"),
  //     }),
  //   ],
  // },
]);

module.exports = merge(config, prod);
