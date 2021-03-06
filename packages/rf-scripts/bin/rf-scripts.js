#!/usr/bin/env node

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const debug = require('debug');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const { configOverrides } = require('../lib/env/paths');
const clearConsole = require('../lib/utils/clearConsole');
const { config } = require(configOverrides);

const args = process.argv.slice(2);
const scriptIndex = args.findIndex(x => x === 'build' || x === 'start');
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

process.on('unhandledRejection', err => {
  throw err;
});

async function run(script) {
  let result = true;
  if (config.compiler_vendors) {
    const checkDll = require('../lib/checkDll');
    result = await checkDll();
  }
  debug('rf-scripts:check webpack-dll result:')(result);
  if (result) {
    const result = spawn.sync(
      'node',
      nodeArgs
        .concat(require.resolve('../scripts/overrides'))
        .concat(script)
        .concat(args.slice(scriptIndex + 1)),
      { stdio: 'inherit' }
    );
    if (result.signal) {
      if (result.signal === 'SIGKILL') {
        console.log(
          chalk.yellow(
            'The build failed because the process exited too early. ' +
              'This probably means the system ran out of memory or someone called ' +
              '`kill -9` on the process.'
          )
        );
      } else if (result.signal === 'SIGTERM') {
        console.log(
          chalk.yellow(
            'The build failed because the process exited too early. ' +
              'Someone might have called `kill` or `killall`, or the system could ' +
              'be shutting down.'
          )
        );
      }
      process.exit(1);
    }
    process.exit(result.status);
  }
}

clearConsole();

switch (script) {
  case 'build':
  case 'start': {
    run(script);
    break;
  }
  case 'dll': {
    const result = spawn.sync(
      'node',
      nodeArgs.concat(require.resolve('../scripts/dll')),
      {
        stdio: 'inherit',
      }
    );
    if (result.signal) {
      process.exit(1);
    }
    process.exit(result.status);
    break;
  }
  default:
    console.log(chalk.gray('Unknown script "' + chalk.white(script) + '".'));
    console.log(chalk.gray('Perhaps you need to update rf-scripts?'));
    console.log(
      chalk.gray('See:') + chalk.blue('https://github.com/Mrlyjoutlook/rf-cli')
    );
    break;
}
