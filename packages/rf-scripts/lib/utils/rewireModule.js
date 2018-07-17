const rewire = require('rewire');

function webpackPath(command) {
  switch (command) {
    case 'start':
      return '/config/webpack.config.dev';
    case 'build':
      return '/config/webpack.config.prod';
    default:
      return '';
  }
}

module.exports = (modulePath, customizer, expandPaths, base) => {
  const env = rewire(
    expandPaths.scriptVersion + webpackPath(process.argv[2])
  ).__get__('env');
  let defaults = rewire(modulePath);
  let paths = defaults.__get__('paths');
  let config = defaults.__get__('config');

  customizer(config, Object.assign(paths, expandPaths), env.raw, base);
};
