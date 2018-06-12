#!/usr/bin/env node

// const { mkdirpSync, copySync, writeJsonSync } = require("fs-extra");
// const vfs = require("vinyl-fs");
const path = require("path");
const chalk = require("chalk");
const fs = require("fs-extra");
const Creator = require("../lib/Creator");

const args = process.argv[2];

function getPromptModules() {
  return ["promptTemplate", "promptCss"].map(file =>
    require(`../lib/promptModules/${file}`)
  );
}

async function create(projectName, options) {
  const targetDir = path.resolve(projectName || ".");
  const creator = new Creator(projectName, targetDir, getPromptModules());
  await creator.create(options);
}

if (!args) {
  console.log(chalk.red("rf: command error, please run 'rf -h'"));
} else {
  console.log(chalk.green("peak: building..."));

  if (fs.existsSync(args[0])) {
    console.log(chalk.red("rf: project name is exist!"));
  } else {
    create(args, process.argv.slice(3));
  }
}
