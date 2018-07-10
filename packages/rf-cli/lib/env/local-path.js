const os = require('os');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

const projectDir = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.join(projectDir, relativePath);

const tmp = os.tmpdir();
// const app = (arr = [], p) =>
//   arr.reduce((a, b) => {
//     if (a[b]) {
//       return a;
//     }
//     a[b] = p;
//   }, {});

module.exports = {
  projectDir: resolveApp(args[0]),
  app_lib: resolveApp(args[0] + '/lib'),
  app_dll_dllManifestJson: resolveApp(args[0] + '/lib/dll/dll-manifest.json'),
  tmpRfTemplate: path.join(tmp, 'rf-cli'),
  rfTemp: path.join(tmp, 'rf-cli/packages/rf-template'),
};
