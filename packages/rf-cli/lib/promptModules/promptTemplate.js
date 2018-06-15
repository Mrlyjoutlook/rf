module.exports = cli => {
  cli.injectPrompt({
    type: "template",
    prompt: {
      type: "select",
      name: "value",
      message: "Select a template?",
      choices: [
        { title: "create-react-app template", value: "default" },
        { title: "rf mobx template", value: "mobx" },
        { title: "rf redux template", value: "redux" }
      ],
      initial: 0
    }
  });
};
