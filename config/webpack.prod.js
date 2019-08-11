const merge = require('webpack-merge');
const glob = require('glob');
const path = require('path');

const parts = require('./webpack.parts');

// import { PATH_TO_BUILD } from './static';
const pathToBuild = require('./static').PATH_TO_BUILD;

const config = {
  entry: {
    app: './src/index.js',
    // app: './src/index.tsx', // @TS
    // libs: ['react', 'react-dom', 'react-css-modules'], // Tylko dla Webpack @3
  },
  output: {
    filename: './src/js/[name].[chunkhash].js',
    path: pathToBuild,
  },
  devtool: false,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // externals: {
  //   "react": "React",
  //   "react-dom": "ReactDOM"
  // },
  mode: 'production',
};

const prod = merge([
  parts.CleanPlugin({
    paths: ['dist'],
    options: {
      root: path.resolve(__dirname, '../'),
    },
  }),
  parts.loadJS(),
  parts.loadSCSS(),
  parts.loadImages({
    imageOptions: {
      mozjpeg: {
        progressive: true,
        quality: 90,
      },
    },
  }),
  parts.loadFonts(),
  parts.loadHTML({
    pluginOptions: {
      filename: 'index.html',
      template: path.resolve(__dirname, './../src/template/template.html'),
      nimify: {},
    },
  }),
  parts.PurifyCSSPlugin({
    paths: glob.sync(path.join(__dirname, './src/**/*.(js|jsx)'), { nodir: true }),
    purifyOptions: {
      whitelist: ['*purify*'],
      minify: true,
    }
  }),
  parts.UglifyJS(),
  parts.CompressionPlugin(),
  parts.extractBundle(),
]);

module.exports = merge(config, prod);
