const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

module.exports = {
  exportData: async function (data, headers) {
    if (!headers) {
      const first = data[0];
      headers = Object.keys(first);
    }

    const docsConfig = await JurevidaConfig.findOne({
      key: sails.config.custom.CONFIG_KEY.DOCS_PATH,
    });

    if (!fs.existsSync(docsConfig.value)) {
      fs.mkdirSync(docsConfig.value);
    }

    let fileName =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    fileName = `${docsConfig.value}${fileName}.csv`;
    const writer = createCsvWriter({ path: fileName, header: headers });
    await writer.writeRecords(data);

    return fileName;
  },
};
