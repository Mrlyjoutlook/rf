const fs = require('fs');
const path = require('path');

module.exports = (exInclude, dir, level) => {
  return new Promise(resolve => {
    if (isNaN(Number(level))) {
      resolve({});
    }
    const ap = {};
    let forCount = 0;
    const resolveApp = relativePath => path.join(dir, relativePath);
    const read = p => {
      forCount++;
      fs.readdirSync(p)
        .filter(item => !exInclude.includes(item))
        .forEach((item, i, arr) => {
          fs.statSync(p + `/${item}`, (err, stat) => {
            if (err) {
              throw err;
            }
            if (stat.isDirectory()) {
              if (level < 0) {
                return false;
              }
              level--;
              const name = p.replace(dir, 'app').replace('/', '_');
              ap[name] = resolveApp(p + `/${item}`);
              console.log(ap);
              read(p + `/${item}`);
            } else {
              const name =
                p.replace(dir, 'app').replace('/', '_') +
                '_' +
                item.replace('.', '');
              ap[name] = resolveApp(p + `/${item}`);
            }
          });
          if (arr.length === i + 1) {
            forCount--;
          }
        });
      if (forCount === 0) {
        resolve(ap);
      }
    };
    read(dir);
  });
};
