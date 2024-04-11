const path = require("path");
const { HotModuleReplacementPlugin, DefinePlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === "development";
const IS_PROD = NODE_ENV === "production";
const GLOBAL_CSS_REG = /\.global\.css$/;
const DEV_PLUGINS = [new CleanWebpackPlugin(), new HotModuleReplacementPlugin()];
const COMMON_PLUGINS = [new DefinePlugin({"process.env.CLIENT_ID": `'${process.env.CLIENT_ID}'`})]

function setupDevtool() {
  if (IS_DEV) return "eval";
  if (IS_PROD) return false;
}
module.exports = {
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "react-dom": IS_DEV ? "@hot-loader/react-dom" : "react-dom",
    },
  },
  mode: NODE_ENV ? NODE_ENV : "development",
  entry: [
    path.resolve(__dirname, "../src/client/index.jsx"),
    "webpack-hot-middleware/client?path=//localhost:3001/static/__webpack_hmr",
  ],
  output: {
    path: path.resolve(__dirname, "../dist/client"),
    filename: "client.js",
    publicPath: "//localhost:3001/static",
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|js|jsx|mjs)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        // Preprocess our own style files
        test: /\.(css|less|styl|scss|sass|sss)$/,
        exclude: GLOBAL_CSS_REG,
        use: ["style-loader", "css-loader"],
      },
      {
        test: GLOBAL_CSS_REG,
        use: ["style-loader", "css-loader"],
      },
      {
        // Preprocess 3rd party style files located in node_modules
        test: /\.(css|less|styl|scss|sass|sss)$/,
        include: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        type: "asset",
      },
      {
        test: /\.(bmp|gif|jpe?g|svg|png)$/,
        loader: 'file-loader',
        options: {
          name: "[name].[ext]",
          publicPath: "//localhost:3001/static"
        }
      },
    ],
  },
  devtool: setupDevtool(),

  plugins: IS_DEV
    ? DEV_PLUGINS.concat(COMMON_PLUGINS)
    : COMMON_PLUGINS,
};
