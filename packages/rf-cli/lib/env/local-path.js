const os = require("os");
const path = require("path");

module.exports = {
  tmpRfTemplate: path.join(os.tmpdir(), "rf-cli")
};
