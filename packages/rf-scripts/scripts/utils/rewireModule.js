const rewire = require("rewire");
const fs = require("fs");

module.exports = (modulePath, customizer) => {
  let defaults = rewire(modulePath);
  let config = defaults.__get__("config");
  customizer(config);
  console.log("config", config.module.rules[0].use[0].options);
};
