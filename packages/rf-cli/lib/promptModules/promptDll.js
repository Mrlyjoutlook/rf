const fs = require("fs-extra");
const { webpackConfigDllJs } = require("../env/local-path");

module.exports = cli => {
  cli.injectPrompt({
    type: "features",
    prompt: {
      type: "confirm",
      name: "value",
      message: "Do you use webpack dll optimization?",
      format: answer => {
        return answer ? "dll" : false;
      },
      initial: false
    }
  });
  cli.onPromptComplete((answers, preset) => {
    if (answers.features.includes("dll")) {
      preset.cbs.push(async (config, dir) => {
        config["compiler_vendors"] = [];
        await fs.copySync(webpackConfigDllJs, dir + "/dll");
      });
    }
  });
};
