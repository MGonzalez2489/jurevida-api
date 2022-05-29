const jwt = require("jsonwebtoken");
module.exports = {
  friendlyName: "Generate new jwt token",

  description: "",

  inputs: {
    token: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function (inputs) {
    const secret = sails.config.custom.jwtSecret || process.env.JWT_SECRET;

    const result = jwt.verify(inputs.token,secret);
    return result;
  },
};
