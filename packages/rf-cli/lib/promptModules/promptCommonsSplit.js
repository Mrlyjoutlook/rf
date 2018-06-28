module.exports = cli => {
  cli.injectPrompt({
    type: "features",
    prompt: {
      type: "confirm",
      name: "value",
      message:
        "Do you use webpack optimize commons code split in production env?",
      format: answer => {
        return answer ? "commons" : false;
      },
      initial: false
    }
  });
  cli.onPromptComplete((answers, preset) => {
    if (answers.features.includes("commons")) {
      preset.imp.push("const webpack = require('webpack')");
      preset.config["compiler_commons"] = [];
      preset.configFile.push(`
        // webpack optimize commons code split
        if (env === "production") {
          config.entry["commons"] = base.compiler_commons;
          config.output["chunkFilename"] = '[name].[chunkhash:8].chunk.js';
          config.plugins.push(
            new webpack.optimize.CommonsChunkPlugin({
              names: ['commons', 'manifest'],
              minChunks: Infinity,
            })
          );
        }
      `);
    }
  });
};
