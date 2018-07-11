const debug = require('debug');
const chalk = require('chalk');
const fs = require('fs-extra');
const { isEqual } = require('lodash/lang');
const {
  app_dll_dllConfigJson,
  app_dll_dllManifestJson,
  configOverrides,
  getProjectPaths,
} = require('./env/paths');
const { config } = require(configOverrides);

module.exports = async () => {
  console.log(chalk.green('Check if using webpack dll optimization'));

  const projectPaths = await getProjectPaths();
  console.log('projectPaths', projectPaths);

  const exit = await fs.existsSync(projectPaths['app_lib_dll-manifestjson']);
  if (exit) {
    console.log(
      chalk.magenta('Check if the file(dll-manifest.json) exists:\n')
    );
    console.log('     ' + chalk.green('Exist!'));
    console.log();
    const dll = require(app_dll_dllConfigJson);
    const result = isEqual(dll.chunk, config.compiler_vendors);

    if (result) {
      console.log(chalk.green('result: no problem.'));
    } else {
      console.log(
        chalk.yellow(
          'result: changes in the compiler_vendors field in the .rf.js file'
        )
      );
      console.log(
        chalk.green('\n you can see ./dll/dll-config.json and ./rf.js')
      );
    }
    return result;
  } else {
    console.log(chalk.dim('Check if the file(dll-manifest.json) exists:\n'));
    console.log('     ' + chalk.red('No search!'));
    console.log('     ' + chalk.red('Please run: npm run dll!'));
    console.log();
    return false;
  }
};
