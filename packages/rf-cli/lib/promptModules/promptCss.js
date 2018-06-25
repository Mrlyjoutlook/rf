module.exports = cli => {
  cli.injectPrompt({
    type: "complete",
    prompt: {
      type: "multiselect",
      name: "value",
      message: "multi select css tools",
      choices: [
        { title: "postcss", value: "postcss", selected: true },
        { title: "less", value: "less" }
      ],
      initial: 1,
      max: 3,
      hint: "- Space to select. Return to submit"
    }
  });
  cli.onPromptComplete((answers, preset) => {
    if (answers.complete.includes("less")) {
      preset.configFile.push(`
        // less
        let cssLoader = config.module.rules[1]["oneOf"][2];
        cssLoader.test = /\.(css|less)$/;
        if (env === "development") {
          cssLoader.use.push({
            loader: require.resolve("less-loader")
          });
        } else {
          cssLoader.loader.push({
            loader: require.resolve("less-loader")
          });
        }
      `);
      preset.plugins["less"] = {
        version: "^3.0.4"
      };
      preset.plugins["less-loader"] = {
        version: "^4.1.0"
      };
    }
  });
};
