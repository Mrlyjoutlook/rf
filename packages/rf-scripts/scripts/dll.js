const debug = require('debug');
const chalk = require('chalk');
const webpack = require('webpack');
const fs = require('fs-extra');
const filesize = require('filesize');
const clearConsole = require('../lib/utils/clearConsole');
const { configOverrides, appDllConfigJson } = require('../lib/env/paths');
const rfConfig = require(configOverrides);
const config = require('../lib/webpack.config.dll');

clearConsole();
console.log(chalk.cyan('⏳ use webpack dll optimization, build file...\n'));

if (
  rfConfig.config['compiler_vendors'] &&
  rfConfig.config['compiler_vendors'].length !== 0
) {
  webpack(config).run((err, stats) => {
    debug('rf-scripts:webpack compiler fail:')(err);
    if (err) {
      console.log(chalk.red('✖︎ webpack compiler fail...'));
      return false;
    }
    const jsonStats = stats.toJson();
    debug('rf-scripts:jsonStats:')(jsonStats);
    if (jsonStats.errors.length > 0) {
      debug('rf-scripts:webpack compiler errors:')(jsonStats.errors.join('\n'));
    } else if (jsonStats.warnings.length > 0) {
      debug('rf-scripts:webpack compiler warnings:')(
        jsonStats.warnings.join('\n')
      );
    } else {
      const { assets, endTime, startTime } = jsonStats;
      const { name, size } = assets[0];

      fs.writeJsonSync(appDllConfigJson, {
        name,
        size,
        chunk: config.entry.vendor,
      });

      console.log(chalk.cyan('📜 build file info:\n'));
      console.log(
        '     ' + filesize(size, { base: 10 }) + '  ' + chalk.green(name) + '\n'
      );

      console.log(chalk.cyan('📜 config file desc:\n'));
      console.log('     ' + chalk.dim('name: ') + chalk.cyan(name));
      console.log('     ' + chalk.dim('size: ') + chalk.cyan(size));
      console.log(
        '     ' + chalk.dim('chunk: ') + chalk.cyan(config.entry.vendor) + '\n'
      );
      console.log('⏰ time:\n');
      console.log('     ' + chalk.yellow((endTime - startTime) / 1000) + '\n');
      console.log('😀 Build OK!\n');
      console.log(chalk.magenta('tip:'));
      console.log(
        chalk.blue(`
        |--------------------------------------------------
        | ${chalk.dim('# build or edit .env file')}
        | eg:
        |   ...
        |   REACT_APP_DLL: **/**/**.js
        |   ...
        | ${chalk.dim('# edit html file')}
        | eg:
        |   <script src="%REACT_APP_DLL%"></script>
        | 
        | see: 
        |  ${chalk.cyan(
          'https://github.com/facebook/create-react-app/blob/master/'
        )}
        |  ${chalk.cyan(
          'packages/react-scripts/template/README.md#adding-custom-environment-variables'
        )}
        |  
        |--------------------------------------------------
        `)
      );
    }
  });
} else {
  console.log(chalk.red('✖︎ build fail!\n'));
  console.log(
    chalk.yellow(
      '💡 Check if the field (compiler_vendors) in the config file (.rf.js) exists or the value is not empty.'
    )
  );
  console.log(
    chalk.blue(`
    .rf.js eg:
    |--------------------------------------------------
    | ...
    | config: {
    |   ...
    |   compiler_vendors: ['react']
    |   ... 
    | }
    | ...
    |--------------------------------------------------
    `)
  );
}
