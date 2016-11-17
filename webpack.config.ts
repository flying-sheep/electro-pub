import { DefinePlugin, NoErrorsPlugin, Configuration } from 'webpack'

import * as BitBarProgressPlugin from 'bitbar-webpack-progress-plugin'
import * as CopyPlugin from 'copy-webpack-plugin'
import * as ExtractTextPlugin from 'extract-text-webpack-plugin'

//import * as cssnext from 'postcss-cssnext'

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

const config: Configuration = {
	target: 'electron',
	entry: {
		app:    `${paths.app.js}/cli.ts`,
		client: `${paths.client.js}/main.tsx`,
	},
	output: {
		path: paths.build,
		filename: '[name].js',
		devtoolModuleFilenameTemplate: 'file://[absolute-resource-path]',
		devtoolFallbackModuleFilenameTemplate: 'file://[absolute-resource-path]?[hash]',
	},
	devServer: {
		contentBase: paths.build,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
	},
	module: {
		rules: [
			{
				test: /.*\.tsx?/,
				loader: 'awesome-typescript-loader',
			},
			{
				test: /.*\.json/,
				loader: 'json-loader',
			},
			{
				test: /.*\.css/,
				loader: ExtractTextPlugin.extract({
					//fallbackLoader: 'style-loader',
					loader: [
						//bug: ExtractTextPlugin only knows query, not options
						{ loader: 'css-loader', query: { importLoaders: 1 } },
						{
							loader: 'postcss-loader',
							/*query: {
								map: true,
								plugins: [
									cssnext,
								],
							},*/
						},
					],
				}),
			},
		],
	},
	plugins: [
		new BitBarProgressPlugin(),
		new CopyPlugin([
			{ from: paths.client.html },
		]),
		new ExtractTextPlugin('style.css'),
		new DefinePlugin({
			'process.versions': {
				electroPub: JSON.stringify(packageInfo.version),
				electron: '"1.4.6"',
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

export default config
