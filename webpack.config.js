// const path = require('path');
// const glob = require('glob');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
// const webpack = require('webpack');
// const HTMLWebpackPlugin = require('html-webpack-plugin');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
// // var FileManagerPlugin = require('filemanager-webpack-plugin');
// const CleanPlugin = require('clean-webpack-plugin');
// const PurifyCss = require('purifycss-webpack');
// const CompressionPlugin = require('compression-webpack-plugin');
//
// const config = {
//   // mode: 'development',
//   // mode: 'production',
//   // entry: [
//   //   'react-hot-loader/patch',
//   //   'react-css-modules',
//   //   './src/index'
//   // ],
//   entry: {
//     app: './src/index.js',
//     libs: ['react', 'react-dom', 'react-css-modules']
//   },
//   output: {
//     filename: 'src/js/[name].[hash].js',
//     path: path.resolve(__dirname, 'dist'),
//   },
//   // devtool: 'inline-source-map',
//   resolve: {
//     extensions: ['.js', '.jsx'],
//   },
//   devServer: {
//     port: 9000,
//     contentBase: path.join(__dirname, 'dist'),
//     hot: true,
//     overlay: true,
//   },
//   watch: true,
//   module:{
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: 'babel-loader'
//       },
//       {
//         test: /\.scss$/,
//         use: ExtractTextWebpackPlugin.extract({
//           fallback: 'style-loader',
//           publicPath: './src/style/',
//           use: [
//             {
//               loader: 'css-loader',
//               options: {
//                 sourceMap: true,
//                 minimize: true,
//                 modules: true,
//                 localIdentName: '[name]__[local]--[hash:base64:5]-purify',
//               },
//             },
//             {
//               loader: 'postcss-loader',
//               options: {
//                 plugins: (loader) => [
//                   new require('autoprefixer')(),
//                 ],
//                 sourceMap: true,
//               }
//             },
//             {
//               loader: 'resolve-url-loader',
//               options: {
//                 sourceMap: true
//               }
//             },
//             {
//               loader: 'sass-loader'
//             },
//           ]
//         }),
//       },
//       {
//         test: /\.(jpg|jpeg|gif|png)$/,
//         use: [
//           {
//             loader: 'file-loader',
//             options: {
//               name: 'src/images/[name].[ext]'
//             }
//           },
//           {
//             loader: 'image-webpack-loader',
//             options: {
//               mozjpeg: {
//                 progressive: true,
//                 quality: 90,
//               }
//             },
//           },
//         ],
//       },
//       {
//         test: /\.(woff|woff2)$/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 40000,
//             name: './src/fonts/[name].[ext]'
//           }
//         }
//       },
//       {
//         test: /\.html$/,
//         use: [
//           // Opcje dodatkowe do plików html
//           // {
//           //   loader: 'file-loader',
//           //   options: {
//           //     name: '[hash].html',
//           //   }
//           // },
//           // {
//           //   loader: 'extract-loader',
//           // },
//           {
//             loader: 'html-loader',
//             options: {
//               attrs: ['img:src', 'link:href'],
//             }
//           },
//
//         ]
//       }
//     ],
//   },
//   plugins: [
//     new CleanPlugin('dist'),
//     // new FileManagerPlugin({
//     //   onStart: {
//     //     delete: [
//     //       path.join(__dirname, 'dist', '*'),
//     //     ],
//     //   },
//     //   onEnd: {
//     //     copy: [
//     //       {
//     //         source: path.join(__dirname, 'dist', 'bundle.js'),
//     //         destination: path.join(__dirname, 'main.js')
//     //       },
//     //     ]
//     //   },
//     // }),
//     new UglifyJSPlugin(),
//     new ExtractTextWebpackPlugin('src/css/styles.css'),
//     new HTMLWebpackPlugin({
//       // hash: true,
//       title: 'Moja aplikacja JS',
//       filename: 'index.html',
//       inject: 'body',
//       template: './src/template/template.html',
//       minify: {},
//     }),
//     new PurifyCss({
//       paths: glob.sync(path.join(__dirname, 'src/**/*.(js|jsx)'),{
//         nodir: true
//       }),
//       purifyOptions: {
//         whitelist: ['*purify*'],
//         minify: true,
//       }
//     }),
//     // new CompressionPlugin({
//     //   test: /\.(js|css|html)$/
//     // }),
//     new webpack.NamedModulesPlugin(),
//     new webpack.HotModuleReplacementPlugin(),
//     new BrowserSyncPlugin({
//       host: 'localhost',
//       port: 9100,
//       proxy: 'http://localhost:9000'
//     }, {
//       reload: false
//     }),
//   ],
// };
//
// module.exports = config;

const prod = require('./config/webpack.prod');
const dev = require('./config/webpack.dev');

module.exports = (env) => {
	if(env.prod) {
		return prod;
	}
	return dev;
};