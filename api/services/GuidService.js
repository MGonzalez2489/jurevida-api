const { v4: uuidv4 } = require("uuid");

module.exports = {
  generateGuid: function () {
    return uuidv4();
  },
};
