module.exports = cli => {
  cli.injectPrompt({
    type: 'features',
    prompt: {
      type: 'confirm',
      name: 'value',
      message: 'Do you use webpack optimize dll?',
      format: answer => {
        return answer ? 'dll' : false;
      },
      initial: false,
    },
  });
  cli.onPromptComplete((answers, preset) => {
    if (answers.features.includes('dll')) {
      if (!preset.pkgFields['scripts']) {
        preset.pkgFields['scripts'] = {};
      }
      preset.pkgFields['scripts']['dll'] = 'better-npm-run dll';
      if (!preset.pkgFields['betterScripts']) {
        preset.pkgFields['betterScripts'] = {};
      }
      preset.pkgFields['betterScripts']['dll'] = {
        command: 'rf-scripts dll',
        env: {
          DEBUG: 'app:*',
          NODE_ENV: 'production',
        },
      };
      preset.imp.push("const webpack = require('webpack')");
      preset.config['compiler_vendors'] = [];
      preset.configFile.push(`
        // webpack optimize dll
        if (base['compiler_vendors']) {
          config.plugins.push(
            new webpack.DllReferencePlugin({
              context: paths.appPath,
              manifest: paths.appDllManifestJson,
            })
          );
        }
      `);
    }
  });
};
