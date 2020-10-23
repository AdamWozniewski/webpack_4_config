const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin"); // Webpack @3
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
// var FileManagerPlugin = require('filemanager-webpack-plugin'); // Webpack @3
const CleanPlugin = require('clean-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCSSPlugin = require('mini-css-extract-plugin');

// ------------------------------------- Ładowanie plików JS / JSX---------
exports.loadJS = ({
  test = /\.(js|jsx)$/,
  // test: /\.ts(x?)$/, // @TS
  exclude = /node_modules/,
} = {}) => {
  return {
    module: {
      rules: [
        {
          test,
          exclude,
          use: 'babel-loader',
          // use: [ // @TS
          //   {
          //     loader: "ts-loader",
          //   },
          //   {
          //     enforce: "pre",
          //     test: /\.js$/,
          //     loader: "source-map-loader"
          //   },
          // ],
        },
      ],
    },
  };
};
// ------------------------------------- Ładowanie oczyszczania JS / JSX---------
exports.UglifyJS = () => {
  return {
    plugins: [new UglifyJSPlugin()],
  };
};
// ------------------------------------- Ładowanie stylów SASS---------
exports.loadSCSS = ({
  extractOptions = {
    filename: 'src/css/[chunkhash].css',
    allChunks: true,
  },
  isDev = false,
} = {}) => {
  extractOptions.disable = isDev;
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use:
            // ExtractTextWebpackPlugin.extract({ dla webpack @3
            // publicPath: './../',
            // use:
            [
              isDev
                ? 'style-loader'
                : {
                    loader: MiniCSSPlugin.loader,
                    options: {
                      publicPath: './../../../',
                    },
                  },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  modules: true,
                  localIdentName: '[name]__[local]--[hash:base64:5]-purify',
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: () => [new require('autoprefixer')()], // plugins: loader => ...
                  sourceMap: true,
                },
              },
              {
                loader: 'resolve-url-loader',
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
          // }), Dla Webpack @3
        },
      ],
    },
    plugins: [
      // new ExtractTextWebpackPlugin(extractOptions), // Dla Webpack @3
      new MiniCSSPlugin(extractOptions),
    ],
  };
};
// ------------------------------------- Ładowanie obrazów---------
exports.loadImages = ({
  fileOptions = {
    name: '[name].[ext]',
    outputPath: 'src/images/',
  },
  imageOptions,
  isDev = false,
} = {}) => {
  const loaders = [
    {
      loader: 'file-loader',
      options: fileOptions,
    },
  ];
  if (isDev === false) {
    loaders.push({
      loader: 'image-webpack-loader',
      options: imageOptions,
    });
  }
  return {
    module: {
      rules: [
        {
          test: /\.(jpg|jpeg|gif|png)$/,
          exclude: /node_modules/,
          use: loaders,
        },
      ],
    },
  };
};
// ------------------------------------- Ładowanie fontów---------
exports.loadFonts = ({
  test = /\.(woff|woff2|eot|ttf|otf)$/,
  exclude = /node_modules/,
  options = {
    limit: 30000,
    name: 'src/fonts/[name].[ext]',
  },
} = {}) => {
  return {
    module: {
      rules: [
        {
          test,
          exclude,
          use: {
            loader: 'url-loader',
            options,
          },
        },
      ],
    },
  };
};
// ------------------------------------- Ładowanie szablonów HTML---------
exports.loadHTML = ({ pluginOptions } = {}) => {
  return {
    module: {
      rules: [
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'html-loader',
              options: {
                attrs: ['img:src'],
              },
            },
          ],
        },
      ],
    },
    plugins: [new HTMLWebpackPlugin(pluginOptions)],
  };
};
// ------------------------------------- Ładowanie optymalizacji---------
exports.CleanPlugin = ({ paths, options }) => {
  return {
    plugins: [new CleanPlugin(paths, options)],
  };
};
// ------------------------------------- Ładowanie oczyszczania CSS---------
exports.PurifyCSSPlugin = ({ paths, purifyOptions }) => {
  return {
    plugins: [
      new PurifyCSSPlugin({
        paths,
        purifyOptions,
      }),
    ],
  };
};
// ------------------------------------- Ładowanie kompresji plików---------
exports.CompressionPlugin = () => {
  return {
    plugins: [
      new CompressionPlugin({
        test: /\.(js|css|html)$/,
      }),
    ],
  };
};

exports.extractBundle = ({ name = 'libs' } = {}) => {
  return {
    // Tylko Webpack @4
    optimization: {
      splitChunks: {
        cacheGroups: {
          app: {
            test: /node_modules/,
            name,
            chunks: 'all',
          },
        },
      },
    },
    plugins: [
      // Dla Webpack @3
      // new webpack.HashedModuleIdsPlugin(),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name,
      // }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: '_',
      // }),
    ],
  };
};
// ------------------------------------- Ładowanie BrowserSync---------
exports.browserSync = ({
  host = 'localhost',
  port = 9105,
  proxy = 'http://localhost:9005',
  options = {
    reload: false,
  },
} = {}) => {
  return {
    plugins: [
      new BrowserSyncPlugin(
        {
          host,
          port,
          proxy,
        },
        options,
      ),
    ],
  };
};
// ------------------------------------- Ładowanie Serwera deweloperskiego---------
exports.devServer = ({
  port = 9005,
  hot = true,
  overlay = true,
  contentBase,
  historyApiFallback = true,
} = {}) => {
  const plugins = [];
  if (hot) {
    plugins.push(new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin());
  }
  return {
    devServer: {
      port,
      contentBase,
      hot,
      overlay,
      historyApiFallback,
    },
    plugins,
  };
};
