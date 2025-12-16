import path from "node:path";
import type { Configuration } from "webpack";

const config: Configuration = {
  entry: ["@babel/polyfill", "./src/app.tsx"],
  output: {
    path: path.join(__dirname, "public"),
    publicPath: "",
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: true,
  },
};

export default config;
