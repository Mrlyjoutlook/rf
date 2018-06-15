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
};
