const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [new NodePolyfillPlugin()],
  resolve: {
    fallback: {
      path: false,
      fs: false,
      tls: false,
      net: false,
      assert: false,
      util: false,
    },
  },
};
