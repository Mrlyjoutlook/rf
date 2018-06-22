const os = require("os");
const path = require("path");

// const app = (arr = [], p) =>
//   arr.reduce((a, b) => {
//     if (a[b]) {
//       return a;
//     }
//     a[b] = p;
//   }, {});

module.exports = {
  tmpRfTemplate: path.join(os.tmpdir(), "rf-cli")
};
