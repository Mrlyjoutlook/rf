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
  cli.onPromptComplete((answers, preset) => {
    const commons = {
      lodash: {
        depend: "dep",
        version: "^4.17.4"
      },
      "normalize.css": {
        depend: "dep",
        version: "^8.0.0"
      },
      "prop-types": {
        depend: "dep",
        version: "^15.6.2"
      },
      "react-loadable": {
        depend: "dep",
        version: "^5.4.0"
      },
      "react-router-dom": {
        depend: "dep",
        version: "^4.3.1"
      }
    };

    if (answers.base.template === "mobx") {
      preset.plugins = Object.assign({}, preset.plugins, commons);
      preset.plugins["babel-plugin-transform-decorators-legacy"] = {
        depend: "dev",
        version: "^1.3.5"
      };
      preset.plugins["mobx"] = {
        depend: "dep",
        version: "^5.0.3"
      };
      preset.plugins["mobx-react"] = {
        depend: "dep",
        version: "^5.2.3"
      };
      preset.babel.push({
        plugins: ["transform-decorators-legacy"]
      });
    }
    if (answers.base.template === "redux") {
      preset.plugins = Object.assign({}, preset.plugins, commons);
      preset.plugins["redux"] = {
        depend: "dep",
        version: "^4.0.0"
      };
      preset.plugins["react-redux"] = {
        depend: "dep",
        version: "^5.0.7"
      };
      preset.plugins["redux-thunk"] = {
        depend: "dep",
        version: "^2.3.0"
      };
    }
  });
};
