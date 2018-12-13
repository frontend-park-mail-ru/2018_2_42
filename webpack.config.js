const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var path = require('path');

module.exports = {
    mode: 'development',
    entry: './public/js/main.js',
    devtool: "source-map",
    
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: './build.js'
    },

    module: {
      rules: [
              {
                test: /\.xml$/,
                use: [
                  {
                    loader: 'fest-webpack-loader'
                  }
                ]
              },
              {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                  {
                    loader: 'babel-loader',
                    options: {presets: [['@babel/preset-env']]}
                  }
                ]
              },
              {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=4096'
              },
              {
                test: /\.css$/,
                use:['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
              },
              {
                test: /\.scss$/,
                use:['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader','sass-loader']
              },
      ]
    },

    plugins: [
      new CleanWebpackPlugin('dist', {} ),
      new ServiceWorkerWebpackPlugin({
        entry: path.join(__dirname, 'public/sw.js'),
      }),
      new MiniCssExtractPlugin({
        filename: "style.css",
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './public/index.html',
        inject: false,
      }),
    ]
  };
