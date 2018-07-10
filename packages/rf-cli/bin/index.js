#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const fs = require('fs-extra');
const spawn = require('cross-spawn');
const pg = require('../package.json');

function wrap(sp) {
  sp.on('close', function(code) {
    process.exit(code);
  });
}

function executable(subcmd) {
  var file = path.join(__dirname, '../scripts/' + subcmd + '.js');
  if (fs.existsSync(file)) {
    return file;
  }
}

program.version(pg.version);
//   .option('-C, --chdir <path>', 'change the working directory')
//   .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
//   .option('-T, --no-tests', 'ignore test hook')

program
  .command('new')
  .description('build project')
  .usage('<project name>')
  .action(function() {
    const args = process.argv.slice(3);
    const runPath = executable(process.argv.slice(2, 3));
    wrap(spawn(runPath, args, { stdio: 'inherit' }));
  })
  .on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ rf new react-demo');
    console.log();
  });

program
  .command('*')
  .description('no command')
  .action(function(cmd) {
    console.log('rf: deploying "%s"', cmd);
  });

program.parse(process.argv);
