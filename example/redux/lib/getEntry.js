const path = require("path");
const fs = require("fs");

module.exports = () => {
  const public = path.resolve(__dirname, "../public");
  const src = path.resolve(__dirname, "../src");
  const srcFile = fs
    .readdirSync(src)
    .filter(filename => /\.(js|jsx)$/.test(filename))
    .map(filename => filename.replace(/\.(js|jsx)$/, ""));
  return fs
    .readdirSync(public)
    .filter(filename => /\.html$/.test(filename))
    .filter(filename => srcFile.includes(filename.replace(/\.html$/, "")))
    .map(filename => filename.replace(/\.html$/, ""));
};
