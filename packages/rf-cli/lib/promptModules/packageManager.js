module.exports = cli => {
  cli.injectPrompt({
    type: "packageManager",
    prompt: {
      type: "select",
      name: "value",
      message: "Select a package manager",
      choices: [
        { title: "yarn", value: "yarn" },
        { title: "npm", value: "npm" }
      ],
      initial: 0
    }
  });
};
