const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports = {
	entry: './client/src/index.jsx',
	output: {
		filename: 'bundle.js',
		publicPath: '',
		path: path.resolve(__dirname, './dist')
	},
	module: {
		//Editing to find only CSS files
		rules: [
			{ test: /\.(js|jsx)$/, exclude: /node_modules/,  use: ['babel-loader'] },
			//{ test: /\.s[ac]ss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{ test: /\.pug$/, loader: 'pug-loader'}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: false,
			cache: false,
			template: './client/index.pug',
			filename: 'index.html',
			title: 'demo'
		}),
		new MiniCssExtractPlugin({ filename: 'bundle.css' })
	]
};