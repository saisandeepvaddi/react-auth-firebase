var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [{ test: /\.(js)$/, use: "babel-loader" }]
  }
};
