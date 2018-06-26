const debug = require("debug");
const webpack = require("webpack");
const chalk = require("chalk");
const fs = require("fs-extra");
const filesize = require("filesize");
const clearConsole = require("../lib/utils/clearConsole");
const { dll } = require("../lib/env/paths");
const config = require("../lib/webpack.config.dll");

clearConsole();
debug("rf-scripts:dll")("Creating an optimized production build...");

webpack(config).run((err, stats) => {
  if (err) {
    debug("rf-scripts:dll")("Webpack compiler encountered a fatal error.", err);
    return false;
  }
  const jsonStats = stats.toJson();
  if (jsonStats.errors.length > 0) {
    debug("rf-scripts:dll")("Webpack compiler encountered errors.");
    debug("rf-scripts:dll")(jsonStats.errors.join("\n"));
  } else if (jsonStats.warnings.length > 0) {
    debug("rf-scripts:dll")("Webpack compiler encountered warnings.");
    debug("rf-scripts:dll")(jsonStats.warnings.join("\n"));
  } else {
    const { assets, endTime, startTime } = jsonStats;
    const { name, size } = assets[0];

    fs.writeJsonSync(dll, {
      name,
      size,
      chunk: config.compiler_vendors
    });

    console.log(chalk.dim("\nFile info:\n"));
    console.log(
      "     " + filesize(size, { base: 10 }) + "  " + chalk.cyan(name)
    );
    console.log();

    console.log(chalk.dim("build file(dll-config.json):\n"));
    console.log("     " + chalk.dim("name: ") + chalk.cyan(name));
    console.log("     " + chalk.dim("size: ") + chalk.cyan(size));
    console.log(
      "     " + chalk.dim("chunk: ") + chalk.cyan(peak.compiler_vendors)
    );
    console.log();

    debug("Spend Time: " + (endTime - startTime) / 1000);
    debug("Build OK!");

    console.log(chalk.dim("\nWarn:\n"));
    console.log(
      "     " + chalk.yellow("please edit peak.json(html), add key-value")
    );
    console.log("     " + chalk.yellow("eg:"));
    console.log("       " + chalk.yellow("{..."));
    console.log("       " + chalk.yellow("html: { test: **/**/**.js }"));
    console.log("       " + chalk.yellow("...}"));
    console.log();
    console.log(
      "     " + chalk.yellow("please edit index.html templ, print key")
    );
    console.log("     " + chalk.yellow("eg:"));
    console.log("       " + chalk.yellow('<script src="%test%"></script>'));
    console.log();
  }
});
