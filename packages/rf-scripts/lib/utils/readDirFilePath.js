const fs = require('fs-extra');

/**
 * get the path to all files and folders in the directory
 * @param {Array} exInclude 排除文件或者文件夹
 * @param {string} dir 读取目录路径
 * @param {number} level 读取目录路径层级，默认值为1
 * @returns {Object}
 */
module.exports = async (exInclude, dir, level = 1) => {
  if (isNaN(Number(level))) {
    return {};
  }
  const paths = {};
  function readDirRecur(p) {
    return fs.readdir(p).then(files => {
      files = files.filter(item => !exInclude.includes(item)).map(item => {
        const fullPath = p + '/' + item;
        return fs.stat(fullPath).then(stats => {
          if (
            stats.isDirectory() &&
            fullPath.replace(dir, '').split('/').length - 1 <= level
          ) {
            const name = fullPath.replace(dir, 'app').replace('/', '_');
            paths[name] = fullPath;
            return readDirRecur(fullPath);
          }
          if (stats.isFile()) {
            const name = fullPath
              .replace(dir, 'app')
              .replace(/\//g, '_')
              .replace(/\./g, '');
            paths[name] = fullPath;
          }
        });
      });
      return Promise.all(files);
    });
  }

  await readDirRecur(dir);
  return paths;
};
