var path = require("path");
var webpack = require("webpack");

module.exports = {
  module: {
    rules: [{ test: /\.(js)$/, use: "babel-loader" }]
  }
};
