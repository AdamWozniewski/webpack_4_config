const { merge } = require('webpack-merge');
const glob = require('glob');
const path = require('path');
const parts = require('./webpack.parts');
const pathToBuild = require('./static').PATH_TO_BUILD;

const config = {
  entry: {
    app: './src/index.jsx',
    // app: './src/index.tsx', // @TS
  },
  output: {
    filename: './src/js/[name].[chunkhash].js',
    path: path.resolve(pathToBuild),
  },
  devtool: false,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
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
      // root: path.resolve(__dirname, '../'),
      verbose: true,
      dry: false,
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
      title: 'Custom template',
      filename: 'index.html',
      template: path.resolve(__dirname, './../src/template/template.html'),
      nimify: {},
    },
  }),
  parts.PurifyCSSPlugin({
    paths: glob.sync(path.join(__dirname, './src/**/*.(js|jsx)'), { nodir: true }),
    // paths: glob.sync(path.join(__dirname, 'index.html')),
    purifyOptions: {
      whitelist: ['*purify*'],
      minify: true,
    },
  }),
  parts.UglifyJS(),
  parts.CompressionPlugin(),
  parts.extractBundle(),
]);

module.exports = merge(config, prod);
