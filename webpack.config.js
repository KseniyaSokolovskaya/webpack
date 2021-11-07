const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const esLintPlugin = (isDev) => isDev ? [] : [new ESLintPlugin({ extensions: ['ts', 'js'] })];

const devServer = (isDev) => !isDev ? {} : {
	devServer: {
		open: true,
		port: 8080,
		// contentBase: path.join(__dirname, 'public'),
	},
};

module.exports = ({ development }) => ({
	mode: development ? 'development' : 'production',
	devtool: development ? 'inline-source-map' : false,
	entry: {
		main: './src/index.ts',
	},
	output: {
		filename: '[name][contenthash].js',
		path: path.resolve(__dirname, 'dist'),
		assetModuleFilename: 'assets/[contenthash][ext]',
	},
	module: {
		rules: [
			{
				test: /\.[tj]s$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(?:ico|png|jpeg|jpg|gif|svg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
		]
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	plugins: [
		...esLintPlugin(development),
		new HtmlWebpackPlugin({
			title: 'Webpack',
			template: './src/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		new CopyPlugin({
			patterns: [
				{ from: './public' },
			]
		}),
		new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
		new ESLintPlugin({ extensions: ['.ts', '.js'] })

	],
	...devServer(development),
});
