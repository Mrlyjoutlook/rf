module.exports = cli => {
  cli.injectPrompt({
    type: 'complete',
    prompt: {
      type: 'multiselect',
      name: 'value',
      message: 'multi select css translater tools',
      choices: [
        { title: 'postcss', value: 'postcss', selected: true },
        { title: 'less', value: 'less' },
        { title: 'css+modules', value: 'cssmodules' },
      ],
      initial: 1,
      max: 3,
      hint: '- Space to select. Return to submit',
    },
  });
  cli.onPromptComplete((answers, preset) => {
    if (answers.complete.includes('less')) {
      preset.configFile.push(`
        // less
        let cssLoader = config.module.rules[1]["oneOf"][2];
        cssLoader.test = /\.(css|less)$/;
        cssLoader[env['NODE_ENV'] === "development" ? 'use' : 'loader'].push({
          loader: require.resolve("less-loader"),
        });
      `);
      preset.plugins['less'] = {
        depend: 'dev',
        version: '^3.0.4',
      };
      preset.plugins['less-loader'] = {
        depend: 'dev',
        version: '^4.1.0',
      };
    }
    if (answers.complete.includes('cssmodules')) {
      if (answers.complete.includes('less')) {
        preset.configFile.push(`
          // open css modules
          cssLoader[env['NODE_ENV'] === "development" ? 'use' : 'loader'][1].options.modules = true;
        `);
        return false;
      }
    }
  });
};
