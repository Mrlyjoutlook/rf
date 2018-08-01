const path = require('path');
const fs = require('fs');

module.exports = () => {
  const pb = path.resolve(__dirname, '../public');
  const src = path.resolve(__dirname, '../src');

  const htmlFiles = fs
    .readdirSync(pb)
    .filter(filename => /\.html$/.test(filename))
    .map(filename => filename.replace(/\.html$/, ''));

  return fs
    .readdirSync(src)
    .filter(filename => /\.(js|jsx)$/.test(filename))
    .filter(filename =>
      htmlFiles.includes(filename.replace(/\.(js|jsx)$/, ''))
    );
};
