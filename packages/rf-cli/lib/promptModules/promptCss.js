module.exports = cli => {
  cli.injectPrompt({
    type: "complete",
    prompt: {
      type: "multiselect",
      name: "value",
      message: "multi select css tools",
      choices: [
        { title: "postcss", value: "postcss", selected: true },
        { title: "less", value: "less" },
        { title: "sass", value: "sass" },
      ],
      initial: 1,
      max: 3,
      hint: "- Space to select. Return to submit",
    },
  });
  cli.onPromptComplete(answers => {});
};
