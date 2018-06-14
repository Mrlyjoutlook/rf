const axios = require("axios");
const { logWithSpinner, stopSpinner } = require("./utils/spinner");

module.exports = function fetchRemoteTemplate() {
  return new Promise(async resolve => {
    logWithSpinner(`Fetching remote rf-template version ...`);
    try {
      const { status, data } = await axios.get(
        "https://raw.githubusercontent.com/Mrlyjoutlook/rf-cli/master/packages/rf-template/package.json"
      );
      if (status === 200) {
        stopSpinner();
        resolve(data.version !== "0.01");
      }
    } catch (error) {
      stopSpinner();
      error(`Failed fetching remote rf-template version fail...`);
      throw error;
    }
  });
};
