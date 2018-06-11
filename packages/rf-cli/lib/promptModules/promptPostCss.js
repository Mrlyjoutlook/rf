module.exports = cli => {
  cli.injectPrompt({
    type: "complete",
    prompt: {
      type: "confirm",
      name: "value",
      message: "Can you confirm use postcss?",
      initial: true,
    },
  });
};
