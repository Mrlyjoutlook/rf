module.exports = config => {
  // eslint
  let eslintLoader = config.module.rules[0];
  eslintLoader.use[0].options.useEslintrc = true;

  return config;
};
