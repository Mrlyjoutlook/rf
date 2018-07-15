const chalk = require('chalk');
const fs = require('fs-extra');
const { isEqual } = require('lodash/lang');
const {
  configOverrides,
  appDllManifestJson,
  appDllConfigJson,
} = require('./env/paths');
const { config } = require(configOverrides);

module.exports = async () => {
  console.log(chalk.cyan('⏳ Check use or not webpack dll optimization...'));
  if (!config.compiler_vendors) {
    return false;
  }
  console.log(chalk.green('\n✔︎ use webpack dll\n'));
  const exit = await fs.existsSync(appDllManifestJson);
  console.log(chalk.cyan('⏳ Check if the file(manifest.json) exists:\n'));
  if (exit) {
    console.log(' ' + chalk.green('Exist!\n'));
    const dll = require(appDllConfigJson);
    const result = isEqual(dll.chunk, config.compiler_vendors);
    if (result) {
      console.log(chalk.green('result: no problem.'));
    } else {
      console.log(
        chalk.yellow(
          'result: changes in the compiler_vendors field in the .rf.js file'
        )
      );
      console.log(chalk.green('\n you can see ./dll/config.json and ./rf.js'));
    }
    return result;
  } else {
    console.log(chalk.red('✖︎  No search!'));
    console.log(chalk.magenta('🖥  Please run:'));
    console.log(
      chalk.blue(`
      |--------------------------------------------------
      | $ yarn dll
      | ${chalk.gray('# or')}
      | $ npm run dll
      |--------------------------------------------------
      `)
    );
    return false;
  }
};
