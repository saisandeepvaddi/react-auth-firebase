var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  externals: {
    react: "commonjs react",
    firebase: "firebase"
  }
};
