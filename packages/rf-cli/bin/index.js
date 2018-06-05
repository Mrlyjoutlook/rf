#!/usr/bin/env node
'use strict';

const path = require('path');
const fs = require('fs-extra'),
const program = require('commander');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const package = require('../package.json');

function wrap(sp) {
  sp.on('close', function(code) {
    process.exit(code);
  });
}

function executable(subcmd) {
  var file = path.join(__dirname, subcmd+'.js');
  if (fs.existsSync(file)) {
    return file;
  }
}

program
  .version(package.version)
//   .option('-C, --chdir <path>', 'change the working directory')
//   .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
//   .option('-T, --no-tests', 'ignore test hook')

program
  .command('new')
  .description('构建项目工程')
  .usage('<project name>')
  .action(function (cmd) {
        console.log(chalk.green('peak: build project.'));
        /**
         * 判断是否存在文件
         * 是 -> 提示
         * 否 -> 执行命令
         */
        if(fs.existsSync(cmd)){
            console.log(chalk.red('peak: project name is exist!'));
            process.exit(1);
        }else{
            console.log(chalk.green('peak: executing command (new...).'));
            const args = process.argv.slice(3);
            // const subcmd = program.args[0];
            const runPath = executable(process.argv.slice(2,3));
            wrap(spawn(runPath, args, {stdio: 'inherit', customFds: [0, 1, 2]}));
        }
    }).on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ peak new react-demo');
    console.log();
  });

  program
      .command('*')
      .description('无此命令')
      .action(function(cmd){
          console.log('peak: deploying "%s"', cmd);
      });

program.parse(process.argv);
