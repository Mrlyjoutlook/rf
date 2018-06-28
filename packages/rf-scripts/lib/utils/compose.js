module.exports = (env, base, paths) => (...funcs) => {
  if (funcs.length === 0) {
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => config =>
    a(b(config, env, base, paths), env, base, paths)
  );
};
