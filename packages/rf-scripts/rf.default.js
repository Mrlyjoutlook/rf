module.exports = (config, paths, env) => {
  // default open useEslintrc ignore
  let eslintLoader = config.module.rules[0];
  eslintLoader.use[0].options.useEslintrc = true;
  eslintLoader.use[0].options.ignore = true;
  // default open .babelrc
  let babelLoad = config.module.rules[1]['oneOf'][1];
  babelLoad.options = {
    compact: true,
  };
  // default open postcss config
  let cssLoader = config.module.rules[1]['oneOf'][2];
  let options =
    cssLoader[env['NODE_ENV'] === 'development' ? 'use' : 'loader'][2].options;
  delete options.plugins;
  options.config = {
    path: paths.appPath,
  };

  return config;
};
