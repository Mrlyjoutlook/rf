const webpack = require("webpack");
const getEntry = require("./lib/getEntry");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  config: {
    html: {},
    public_path: "/",
    js_path: "static/js/",
    css_path: "static/css/",
    media_path: "static/media/",
    compiler_vendors: ["react", "react-dom"],
    compiler_commons: ["mobx"]
  },
  webpack: (config, env, base, paths) => {
    // less
    let cssLoader = config.module.rules[1]["oneOf"][2];
    cssLoader.test = /.(css|less)$/;
    if (env === "development") {
      cssLoader.use.push({
        loader: require.resolve("less-loader")
      });
    } else {
      cssLoader.loader.push({
        loader: require.resolve("less-loader")
      });
    }

    // webpack optimize dll
    config.plugins.push(
      new webpack.DllReferencePlugin({
        context: "/Users/j.ie/react/rf-cli/example/mobx",
        manifest:
          "/Users/j.ie/react/rf-cli/example/mobx/lib/dll/dll-manifest.json"
      })
    );

    // multi page
    config.plugins.splice(1, 1);
    const arr = [...config.entry];
    config.entry = {};
    getEntry().forEach(item => {
      // Keep the commons keyword for webpack variable commons code split
      if (item !== "commons") {
        // arr[0] is create-react-app polyfills file
        config.entry[item] = [arr[0], paths.appSrc + "/" + item + ".js"];
        config.plugins.push(
          new HtmlWebpackPlugin(
            Object.assign(
              {},
              {
                inject: true,
                filename: item + ".html",
                template: paths.appPublic + "/" + item + ".html",
                chunks: [item, "commons", "manifest"]
              },
              env === "development"
                ? {
                    minify: {
                      removeComments: true,
                      collapseWhitespace: true,
                      removeRedundantAttributes: true,
                      useShortDoctype: true,
                      removeEmptyAttributes: true,
                      removeStyleLinkTypeAttributes: true,
                      keepClosingSlash: true,
                      minifyJS: true,
                      minifyCSS: true,
                      minifyURLs: true
                    }
                  }
                : {}
            )
          )
        );
      }
    });

    // webpack optimize commons code split
    if (env === "production" && base.compiler_commons.length !== 0) {
      if (Array.isArray(config.entry)) {
        const arr = [...config.entry];
        config.entry = {
          index: arr,
          commons: base.compiler_commons
        };
      } else {
        config.entry["commons"] = base.compiler_commons;
      }
      config.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
          names: ["commons", "manifest"],
          minChunks: Infinity
        })
      );
    }

    return config;
  },
  devServer: (config, env, base, paths) => {
    return config;
  }
};
