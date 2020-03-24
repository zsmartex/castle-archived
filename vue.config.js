const webpack = require("webpack");
const path = require("path");
const TransformModulesPlugin = require("webpack-transform-modules-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const isProduction = process.env.NODE_ENV === "production";

const configWebPack = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  chainWebpack: config => {
    config.plugins.delete("prefetch");
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: smp.wrap({
    resolve: {
      extensions: ["*", "ts", "tsx", ".js", ".vue", "less", ".json"],
      alias: {
        "@styles": path.resolve(__dirname, "src/assets/css")
      }
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            {
              loader: "less-loader",
              options: {
                javascriptEnabled: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({}),
      new TransformModulesPlugin(),
      new BundleAnalyzerPlugin(),
      new PreloadWebpackPlugin()
    ]
  }),
  productionSourceMap: false,
  devServer: {
    proxy: {
      //Mocks Server
      /*"^/api/v2/auth": {
        target: "http://localhost:9002",
        secure: false,
        ws: false,
        changeOrigin: true
      },
      "^/api/v2/trade": {
        target: "http://localhost:9002",
        secure: false,
        ws: false,
        changeOrigin: true
      },
      "/api/v2/websocket": {
        target: "ws://localhost:9003",
        secure: false,
        ws: true,
        changeOrigin: true
      }*/
      //Test Server
      "^/api": {
        target: "https://demo.zsmart.tech",
        secure: false,
        ws: true,
        changeOrigin: true
      }
    },
    host: "0.0.0.0",
    port: 3000,
    hot: true,
    disableHostCheck: true
  }
};

if (isProduction) {
  configWebPack.configureWebpack.plugins.push(
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CompressionPlugin(),
    new HardSourceWebpackPlugin({
      cachePrune: {
        // Caches younger than `maxAge` are not considered for deletion. They must
        // be at least this (default: 2 days) old in milliseconds.
        maxAge: 2 * 24 * 60 * 60 * 1000,
        // All caches together must be larger than `sizeThreshold` before any
        // caches will be deleted. Together they must be at least this
        // (default: 50 MB) big in bytes.
        sizeThreshold: 1024 * 1024 * 1024
      }
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  );
}

module.exports = configWebPack;
