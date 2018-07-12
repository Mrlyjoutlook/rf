const path = require('path');
const fs = require('fs');
const readDirFilePath = require('../utils/readDirFilePath');

//try to detect if user is using a custom scripts version
var custom_scripts = false;
const cs_index = process.argv.indexOf('--scripts-version');

if (cs_index > -1 && cs_index + 1 <= process.argv.length) {
  custom_scripts = process.argv[cs_index + 1];
}

//Allow custom overrides package location
const projectDir = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.join(projectDir, relativePath);

var config_overrides = projectDir + '/.rf';
const co_index = process.argv.indexOf('--config-overrides');

if (co_index > -1 && co_index + 1 <= process.argv.length) {
  config_overrides = path.resolve(process.argv[co_index + 1]);
  process.argv.splice(co_index, 2);
}

const scriptVersion = custom_scripts || 'react-scripts';
const modulePath = path.join(
  require.resolve(`${scriptVersion}/package.json`),
  '..'
);

const paths = require(modulePath + '/config/paths.js');

// work dir or file path
const getProjectPaths = async () => {
  const projectDirAllPaths = await readDirFilePath(
    [
      'node_modules',
      '.gitignore',
      '.eslintrc',
      '.eslintignore',
      '.editorconfig',
      '.DS_Store',
      'yarn.lock',
      'README.md',
      '.idea',
      '.vscode',
      '.rf.js',
      '.babelrc',
    ],
    projectDir,
    2
  );
  return projectDirAllPaths;
};

module.exports = Object.assign(
  {
    scriptVersion: modulePath,
    configOverrides: config_overrides,
    customScriptsIndex: custom_scripts ? cs_index : -1,
    appDllManifestJson: resolveApp('/lib/dll/manifest.json'),
    appDllConfigJson: resolveApp('/lib/dll/config.json'),
    projectDir,
    getProjectPaths,
  },
  paths
);
