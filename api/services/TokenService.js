const randToken = require("rand-token");

module.exports = {
  generateSessionToken: function () {
    const length = sails.config.session.tokenLength;
    return randToken.generate(length);
  },
};
