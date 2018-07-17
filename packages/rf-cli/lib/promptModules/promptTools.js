module.exports = cli => {
  cli.injectPrompt({
    type: 'features',
    prompt: {
      type: 'multiselect',
      name: 'value',
      message: 'choose tools to help develop',
      choices: [
        { title: 'lodashJS', value: 'lodashJS' },
        { title: 'vconsole', value: 'vconsole' },
        { title: 'bundleAnalyzer', value: 'bundleAnalyzer' },
        { title: 'bundleBuddy', value: 'bundleBuddy' },
      ],
      hint: '- Space to select. Return to submit',
    },
  });
  cli.onPromptComplete((answers, preset) => {
    if (answers.features.includes('lodashJS')) {
      preset.plugins['lodash-webpack-plugin'] = {
        depend: 'dev',
        version: '^0.11.4',
      };
      preset.imp.push(
        "const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');"
      );
      preset.configFile.push(`
        // tools lodash
        config.plugins.push(
          new LodashModuleReplacementPlugin({
            disable: false,
            config: {
              collections: true,
              paths: true,
            },
          })
        );
      `);
    }
    if (answers.features.includes('vconsole')) {
      preset.config['vconsole'] = false;
      preset.imp.push(
        "const vConsolePlugin = require('vconsole-webpack-plugin');"
      );
      preset.plugins['vconsole-webpack-plugin'] = {
        depend: 'dev',
        version: '^1.1.2',
      };
      preset.configFile.push(`
        // tools vconsole
        if (base.vconsole) {
          config.plugins.push(
            new vConsolePlugin({ enable: true }),
          );
        }
      `);
    }
    if (answers.features.includes('bundleAnalyzer')) {
      preset.config['bundleAnalyzer'] = false;
      preset.imp.push(
        "const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;"
      );
      preset.plugins['webpack-bundle-analyzer'] = {
        depend: 'dev',
        version: '^2.9.0',
      };
      preset.configFile.push(`
        // tools bundleAnalyzer 包大小分析工具
        if (base.bundleAnalyzer) {
          config.plugins.push(
            new BundleAnalyzerPlugin(),
          );
        }
      `);
    }
    if (answers.features.includes('bundleBuddy')) {
      preset.config['bundleBuddy'] = false;
      preset.imp.push(
        "const BundleBuddyWebpackPlugin = require('bundle-buddy-webpack-plugin');"
      );
      preset.plugins['bundle-buddy-webpack-plugin'] = {
        depend: 'dev',
        version: '^0.3.0',
      };
      preset.configFile.push(`
        // tools bundleBuddy 打包后代码分割依赖包分析
        if (env['NODE_ENV'] === 'production' && base.bundleBuddy) {
          config.plugins.push(new BundleBuddyWebpackPlugin({ warnings: false }));
        }
      `);
    }
  });
};
