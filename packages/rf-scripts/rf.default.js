module.exports = config => {
  // default open useEslintrc ignore
  let eslintLoader = config.module.rules[0];
  eslintLoader.use[0].options.useEslintrc = true;
  eslintLoader.use[0].options.ignore = true;
  return config;
};
