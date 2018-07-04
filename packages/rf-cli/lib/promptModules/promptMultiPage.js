const fs = require("fs-extra");
const path = require("path");
const { app_lib } = require("../env/local-path");

module.exports = cli => {
  cli.injectPrompt({
    type: "features",
    prompt: {
      type: "confirm",
      name: "value",
      message: "Do you use dev multi page(html)?",
      format: answer => {
        return answer ? "page" : false;
      },
      initial: false
    }
  });
  cli.onPromptComplete((answers, preset) => {
    if (answers.features.includes("page")) {
      preset.imp.push(
        ...[
          "const getEntry = require('./lib/getEntry');",
          "const HtmlWebpackPlugin = require('html-webpack-plugin');"
        ]
      );
      preset.configFile.push(`
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
      `);
      preset.cbs.push(() => {
        fs.copyFileSync(
          path.resolve(__dirname, "../utils/getEntry.js"),
          app_lib + "/getEntry.js"
        );
      });
    }
  });
};
