var path = require("path");
const WebpackWatchedGlobEntries = require("webpack-watched-glob-entries-plugin");

module.exports = {
  entry: WebpackWatchedGlobEntries.getEntries([
    path.resolve(__dirname, "src/**/*.ts"),
  ]),
  output: {
    path: path.resolve(__dirname, "dist"),
    iife: false,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new WebpackWatchedGlobEntries()],
  optimization: {
    minimize: false,
  },
  target: "node",
};
