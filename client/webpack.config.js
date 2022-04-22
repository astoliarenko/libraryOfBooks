let path = require("path");
let webpack = require("webpack");

module.exports = function (env) {
	// eslint-disable-next-line global-require
	let pack = require("./package.json");
	// eslint-disable-next-line global-require
	let MiniCssExtractPlugin = require("mini-css-extract-plugin");

	let production = !!(env && env.production === "true");
	let asmodule = !!(env && env.module === "true");
	let standalone = !!(env && env.standalone === "true");

	let config = {
		mode: production ? "production" : "development",
		entry: {
			myapp: "./sources/myapp.ts"
		},
		output: {
			path: path.join(__dirname, "codebase"),
			publicPath: "/codebase/",
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
					use: "url-loader?limit=25000"
				},
				{
					test: /\.(less|css)$/,
					use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
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
		plugins: [
			new MiniCssExtractPlugin({
				filename: "[name].css"
			}),
			new webpack.DefinePlugin({
				VERSION: `"${pack.version}"`,
				APPNAME: `"${pack.name}"`,
				PRODUCTION: production,
				BUILD_AS_MODULE: asmodule || standalone
			})
		],
		devServer: {
			stats: "errors-only"
		}
	};

	if (!production) {
		config.devtool = "inline-source-map";
	}

	if (asmodule) {
		if (!standalone) {
			config.externals = config.externals || {};
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
