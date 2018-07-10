module.exports = config => {
  // default open useEslintrc ignore
  let eslintLoader = config.module.rules[0];
  eslintLoader.use[0].options.useEslintrc = true;
  eslintLoader.use[0].options.ignore = true;
  // default open .babelrc
  let babelLoad = config.module.rules[1]['oneOf'][1];
  babelLoad.options = {
    compact: true,
  };
  return config;
};
