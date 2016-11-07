import { DefinePlugin, NoErrorsPlugin } from 'webpack'

import * as BitBarWebpackProgressPlugin from 'bitbar-webpack-progress-plugin'
import * as CopyWebpackPlugin from 'copy-webpack-plugin'


const packageInfo = require('./package.json')

const paths = {
	package_json: `${__dirname}/'package.json'`,
	build: `${__dirname}/build`,
	app: {
		js: `${__dirname}/src/app`,
	},
	client: {
		js:   `${__dirname}/src/client/js`,
		css:  `${__dirname}/src/client/style.css`,
		html: `${__dirname}/src/client/index.html`,
	},
}

export default {
	target: 'electron',
	entry: {
		app:    `${paths.app.js}/cli.ts`,
		client: `${paths.client.js}/main.tsx`,
	},
	output: {
		path: paths.build,
		filename: '[name].js',
		devtoolModuleFilenameTemplate: 'file://[absolute-resource-path]'
	},
	devServer: {
		contentBase: paths.build,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	module: {
		loaders: [
			{
				loader: 'awesome-typescript-loader',
				test: [paths.client.js, paths.app.js],
			},
		],
	},
	plugins: [
		new BitBarWebpackProgressPlugin(),
		new CopyWebpackPlugin([
			{ from: paths.client.css },
			{ from: paths.client.html },
		]),
		new DefinePlugin({
			'process.versions': {
				electroPub: JSON.stringify(packageInfo.version),
			},
		}),
		new NoErrorsPlugin(),
	],
	stats: {
		colors: true,
	},
	node: {
		__dirname: false,  // make it work
	},
	devtool: 'source-map',
}
