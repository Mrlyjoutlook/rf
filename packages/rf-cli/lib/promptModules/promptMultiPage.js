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
        config.plugins.splice(1,1);
        getEntry().forEach(item => {
          config.entry[item]
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
