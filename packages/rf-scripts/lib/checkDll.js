const fs = require("fs-extra");
const chalk = require("chalk");
const { isEqual } = require("lodash/lang");
const {
  app_dll_dllConfigJson,
  app_dll_dllManifestJson,
  configOverrides
} = require("./env/paths");
const dll = require(app_dll_dllConfigJson);
const { config } = require(configOverrides);

module.exports = async () => {
  console.log(chalk.green("check webpack dll optimization..."));
  const exit = await fs.existsSync(app_dll_dllManifestJson);
  if (exit) {
    console.log(
      chalk.magenta("Check if the file(dll-manifest.json) exists:\n")
    );
    console.log("     " + chalk.green("Exist!"));
    console.log();
    const result = isEqual(dll.chunk, config.compiler_vendors);

    if (result) {
      console.log(chalk.green("result: no problem."));
    } else {
      console.log(
        chalk.yellow(
          "result: changes in the compiler_vendors field in the .rf.js file"
        )
      );
      console.log(
        chalk.green("\n you can see ./dll/dll-config.json and ./rf.js")
      );
    }
    return result;
  } else {
    console.log(chalk.dim("Check if the file(dll-manifest.json) exists:\n"));
    console.log("     " + chalk.red("No search!"));
    console.log("     " + chalk.red("Please run: npm run dll!"));
    console.log();
    return false;
  }
};
