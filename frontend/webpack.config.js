const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  
  devtool: "inline-source-map",
  
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
    }),
  ],
  
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {loader: "babel-loader"},
          {loader: "ts-loader"}
        ],
        exclude: /node_modules/,
      }
    ]
  },
  
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    historyApiFallback: true,
    publicPath: "dist",
    host: "localhost",
    port: "3000",
    open: true,
  },

  cache: {
    type: "filesystem",
    cacheDirectory: path.resolve(__dirname, '.temp_cache'),
  },
};
