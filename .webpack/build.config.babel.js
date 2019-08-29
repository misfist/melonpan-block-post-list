const { name, version, description, homepage } = require("../package.json");
const { BannerPlugin, DefinePlugin } = require("webpack");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nib = require("nib");

export default {
	entry: ["./src/index.ts", "./src/index.styl"],
	output: {
		path: __dirname + "/../build",
		filename: `${name}.js`
	},
	resolve: {
		alias: {
			Components: __dirname + "/../src/Components",
			utils: __dirname + "/../src/utils"
		}
	},
	externals: {
		lodash: "lodash",
		react: "React",
		"react-dom": "ReactDOM"
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				resolve: {
					extensions: [".tsx", ".ts", ".js", ".jsx"]
				}
			},
			{
				test: /\.(css|styl)$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "stylus-loader",
						options: {
							use: [nib()],
							import: ["~nib/index.styl"]
						}
					}
				]
			}
		]
	},
	plugins: [
		new DefinePlugin({
			l: (...args) => console.log(...args)
		}),
		new MiniCssExtractPlugin({
			filename: `${name}.css`
		}),
		new BannerPlugin({
			banner: [
				`/*! ${description} | ${version} | ${homepage} */`,
				"/*! uuid | https://github.com/kelektiv/node-uuid | MIT License */",
				`/*! react-tiny-popover | https://github.com/alexkatz/react-tiny-popover | Alex Katz | MIT License */`,
				`/*! immer | https://github.com/mweststrate/immer | Michel Weststrate | MIT License */`,
				`/*! React-Select | https://github.com/JedWatson/react-select | Jed Watson | MIT License */`,
				`/*! array-move | https://github.com/sindresorhus/array-move | Sindre Sorhus | MIT License */`
			].join(""),
			raw: true,
			include: new RegExp(/.*?\.js/)
		}),
		new BannerPlugin({
			banner: `${description} | ${version} | ${homepage}`,
			include: new RegExp(/.*?\.css/)
		})
	],
	optimization: {
		minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
	}
};