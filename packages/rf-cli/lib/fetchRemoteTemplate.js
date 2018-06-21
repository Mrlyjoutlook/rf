const axios = require("axios");
const chalk = require("chalk");
const downloadGitRepo = require("download-git-repo");
const { logWithSpinner, stopSpinner } = require("./utils/spinner");
const { tmpRfTemplate } = require("./env/local-path");

module.exports = function fetchRemoteTemplate(isGet) {
  const download = () =>
    new Promise((resolve, reject) => {
      logWithSpinner("Download remote rf-template ...");
      downloadGitRepo("Mrlyjoutlook/rf-cli", tmpRfTemplate, {}, err => {
        stopSpinner();
        if (err) {
          console.log(chalk.red("Download remote rf-template fail:", err));
          return reject(false);
        }
        resolve(true);
      });
    });

  const checkVersion = async () => {
    logWithSpinner("Fetching remote rf-template check version...");
    const { status, data } = await axios.get(
      "https://raw.githubusercontent.com/Mrlyjoutlook/rf-cli/master/packages/rf-template/package.json"
    );
    if (status === 200) {
      const currentVersion = require(tmpRfTemplate +
        "/packages/rf-template/package.json").version;
      console.log("");
      console.log(chalk.green("current version:", currentVersion));
      console.log(chalk.green("remote version:", data.version));
      stopSpinner();
      return currentVersion !== data.version ? download() : true;
    }
  };

  return isGet ? download() : checkVersion();
};
