module.exports = cli => {
  cli.injectPrompt({
    type: "template",
    prompt: {
      type: "select",
      name: "value",
      message: "Select a template?",
      choices: [
        { title: "create-react-app template", value: "default-template" },
        { title: "rf mobx template", value: "mobx-template" },
        { title: "rf redux template", value: "redux-template" },
      ],
      initial: 0,
    },
  });
};
