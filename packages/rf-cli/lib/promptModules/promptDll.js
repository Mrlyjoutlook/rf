const { projectDir, app_dll_dllManifestJson } = require("../env/local-path");

module.exports = cli => {
  cli.injectPrompt({
    type: "features",
    prompt: {
      type: "confirm",
      name: "value",
      message: "Do you use webpack dll optimization?",
      format: answer => {
        return answer ? "dll" : false;
      },
      initial: false
    }
  });
  cli.onPromptComplete((answers, preset) => {
    if (answers.features.includes("dll")) {
      if (!preset.pkgFields["scripts"]) {
        preset.pkgFields["scripts"] = {};
      }
      preset.pkgFields["scripts"]["dll"] = "better-npm-run dll";
      if (!preset.pkgFields["betterScripts"]) {
        preset.pkgFields["betterScripts"] = {};
      }
      preset.pkgFields["betterScripts"]["dll"] = {
        command: "rf-scripts dll",
        env: {
          DEBUG: "app:*",
          NODE_ENV: "production"
        }
      };
      preset.imp.push("const webpack = require('webpack')");
      preset.configFile.push(`
        // webpack dll optimization
        config.plugins.push(
          new webpack.DllReferencePlugin({
            context: "${projectDir}",
            manifest: "${app_dll_dllManifestJson}",
          }),
        );
      `);
      preset.cbs.push(config => {
        config["compiler_vendors"] = [];
      });
    }
  });
};
