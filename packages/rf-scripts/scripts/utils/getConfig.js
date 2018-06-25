const paths = require("./utils/paths");
const c = require(paths.configOverrides);

module.exports = () => {
  return Object.assign(
    {},
    c.config,
    c[process.env.NODE_ENV === "development" ? "config_dev" : "config_prod"]
  );
};
