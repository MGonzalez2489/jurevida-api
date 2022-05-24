const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  encriptString: async function (text) {
    const salt = bcrypt.genSaltSync(saltRounds);
    var encriptedText = await bcrypt.hashSync(text, salt);
    return encriptedText;
  },
  compareEncriptedStrings: async function (plaintText, hashedText) {
    return bcrypt.compareSync(plaintText, hashedText);
  },
};
