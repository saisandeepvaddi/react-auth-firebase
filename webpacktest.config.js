var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: path.resolve(__dirname, "__tests__", "index.js"),
  output: {
    filename: "bundle.test.js",
    path: path.resolve(__dirname, "__tests__")
  },
  devServer: {
    contentBase: "__tests__"
  },
  module: {
    rules: [{ test: /\.(js)$/, use: "babel-loader" }]
  }
};
