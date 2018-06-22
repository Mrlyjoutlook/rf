module.exports = cli => {
  cli.injectPrompt({
    type: "complete",
    prompt: {
      type: "select",
      name: "value",
      message: "Select a mobile adaptae?",
      choices: [{ title: "rem", value: "rem" }, { title: "vw", value: "vw" }]
    }
  });
  cli.onPromptComplete((answers, preset) => {
    if (answers.complete.includes("rem")) {
      preset.plugins["less-loader"] = {};
    }
    if (answers.complete.includes("vw")) {
      preset.plugins["less-loader"] = {};
    }
  });
};
