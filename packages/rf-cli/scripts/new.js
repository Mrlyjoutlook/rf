#!/usr/bin/env node

const path = require('path');
const debug = require('debug');
const chalk = require('chalk');
const fs = require('fs-extra');
const Creator = require('../lib/Creator');

const args = process.argv[2];

function getPromptModules() {
  return [
    'promptTemplate',
    'promptPackageManager',
    'promptCss',
    'promptDll',
    'promptMultiPage',
    'promptCommonsSplit',
    'promptTools',
    // "promptAdaptae"
  ].map(file => require(`../lib/promptModules/${file}`));
}

async function create(projectName, options) {
  try {
    const targetDir = path.resolve(projectName || '.');
    const creator = new Creator(projectName, targetDir, getPromptModules());
    await creator.create(options);
  } catch (error) {
    console.log(chalk.red('✖︎ build fail!'));
    debug('rf-cli:new:build fail:')(error);
    throw error;
  }
}

console.log(chalk.cyan('⏰ build a react project...'));

if (fs.existsSync(args)) {
  console.log(
    chalk.red('✖︎  project name is exist! please replace  project name')
  );
} else {
  create(args, process.argv.slice(3));
}
