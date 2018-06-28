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
      // preset.imp.push("const webpack = require('webpack')");
      // preset.config["compiler_commons"] = [];
      preset.configFile.push(`
        // webpack optimize commons code split
        config.plugins.splice(1,1);
      `);
    }
  });
};
