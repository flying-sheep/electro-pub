import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'

import packageInfo from './package.json'

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
		app:    `${paths.app.js}/cli.js`,
		client: `${paths.client.js}/main.js`,
	},
	output: {
		path: paths.build,
		filename: '[name].js',
	},
	devServer: {
		contentBase: paths.build,
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				test: paths.client.js,
			},
		],
	},
	plugins: [
		new CopyWebpackPlugin([
			{ from: paths.client.css },
			{ from: paths.client.html },
		]),
		new webpack.DefinePlugin({
			'process.versions': {
				electroPub: JSON.stringify(packageInfo.version),
			},
		}),
		new webpack.NoErrorsPlugin(),
	],
	stats: {
		colors: true,
	},
	node: {
		__dirname: false,  // make it work
	},
	devtool: 'source-map',
}
