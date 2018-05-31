const rewire = require("rewire");
const fs = require("fs");

module.exports = (modulePath, customizer) => {
  let defaults = rewire(modulePath);
  let config = defaults.__get__("config");
  customizer(config);
};
