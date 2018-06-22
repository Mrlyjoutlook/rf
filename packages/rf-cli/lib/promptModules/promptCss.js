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
        let lessLoader = {};
        config.module.rules[1]['oneOf'].psuh = lessLoader;
      `);
      preset.plugins["less-loader"] = {};
    }
  });
};
