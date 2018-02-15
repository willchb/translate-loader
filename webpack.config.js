const path = require("path");

const translateRule = {
  test: /_nls\.js(on)?$/,
  use: {
    loader: "translate-loader",
    options: {
      locales: [ "en", "en-US", "fr" ],
    },
  },
};

module.exports = {
  entry: {
    webpack: "./test/webpack.js",
  },
  module: {
    rules: [ translateRule ],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),

  },
  resolveLoader: {
    modules: [ ".", "node_modules" ],
  },
  target: "node",
};
