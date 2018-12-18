const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const path = require('path');
const zopfli = require('@gfx/zopfli');

module.exports = {
	mode: 'development',
	entry: './public/js/main.js',
	devtool: 'source-map',
    
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
				test: /\.(woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=4096',
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader',
				options: {
					name: 'images/[name].[ext]',
					limit: 4096
				},
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
		new UglifyJsPlugin({
			cache: true,
			parallel: true,
			sourceMap: true,
		}),
		new OptimizeCSSAssetsPlugin({}),
		new CompressionPlugin({
			compressionOptions: {
				numiterations: 15
			},
			algorithm(input, compressionOptions, callback) {
				return zopfli.gzip(input, compressionOptions, callback);
			}
		}),
		new CleanWebpackPlugin('dist', {} ),
		new ServiceWorkerWebpackPlugin({
			entry: path.join(__dirname, 'public/sw.js'),
		}),
		new MiniCssExtractPlugin({
			filename: 'style.css',
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './public/index.html',
			inject: false,
		}),
	]
};
