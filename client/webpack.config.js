const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
let path = require("path");
let webpack = require("webpack");

const PATHS = {
	DIST: "dist",
	APP: "./sources/myapp.ts",
	IMAGES: "./sources/img"
};

module.exports = function (env) {
	// eslint-disable-next-line global-require
	let pack = require("./package.json");
	// eslint-disable-next-line global-require
	let MiniCssExtractPlugin = require("mini-css-extract-plugin");

	let production = !!(env && env.production === "true");
	let asmodule = !!(env && env.module === "true");
	let standalone = !!(env && env.standalone === "true");

	const removeEmpty = array => array.filter(Boolean);

	let config = {
		mode: production ? "production" : "development",
		entry: {
			myapp: PATHS.APP
		},
		output: {
			path: path.join(__dirname, PATHS.DIST),
			publicPath: "/",
			filename: "[name].js",
			chunkFilename: "[name].bundle.js"
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					use: "ts-loader"
				},
				{
					test: /\.(svg|png|jpg|gif)$/,
					use: "asset/inline"
				},
				{
					test: /\.(scss|css)$/,
					use: [MiniCssExtractPlugin.loader,
						{loader: "css-loader",
							options: {
								url: false
							}
						}, "sass-loader"]
				}
			]
		},
		stats: "minimal",
		resolve: {
			extensions: [".js", ".ts"],
			modules: ["./sources", "node_modules"],
			alias: {
				"jet-views": path.resolve(__dirname, "sources/views"),
				"jet-locales": path.resolve(__dirname, "sources/locales")
			}
		},
		plugins: removeEmpty([
			new CleanWebpackPlugin(),
			production
				? new CopyPlugin({
					patterns: [
						{from: "index.html", to: "index.html"},
						{from: PATHS.IMAGES, to: "img/"}
					]
				})
				: new CopyPlugin({
					patterns: [
						{from: "index.html", to: "index.html"},
						{from: PATHS.IMAGES, to: "img/"}
					]
				}),
			new MiniCssExtractPlugin({
				filename: "[name].css"
			}),
			new webpack.DefinePlugin({
				VERSION: `"${pack.version}"`,
				APPNAME: `"${pack.name}"`,
				PRODUCTION: production,
				BUILD_AS_MODULE: asmodule || standalone
			})
		]),
		devServer: {
			client: {
				logging: "error"
			},
			static: {directory: path.join(__dirname, PATHS.DIST)},
			historyApiFallback: true
		}
	};

	if (!production) {
		config.devtool = "inline-source-map";
	}

	if (asmodule) {
		if (!standalone) {
			// config.externals = config.externals || {};
			config.externals = ["webix-jet"];
		}

		const out = config.output;
		const sub = standalone ? "full" : "module";

		out.library = pack.name.replace(/[^a-z0-9]/gi, "");
		out.libraryTarget = "umd";
		out.path = path.join(__dirname, "dist", sub);
		out.publicPath = `/dist/${sub}/`;
	}

	return config;
};
