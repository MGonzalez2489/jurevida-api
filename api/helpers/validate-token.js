const jwt = require('jsonwebtoken');
module.exports = {
  friendlyName: 'Generate new jwt token',

  description: '',

  inputs: {
    token: {
      type: 'string',
      required: true,
    },
  },
  exits: {
    success: {
      description: 'Valid Token.',
    },
    fail: {
      description: 'Invalid Token.',
    },
  },

  fn: async function (inputs) {
    const secret = sails.config.custom.JWT_SECRET || process.env.JWT_SECRET;

    try {
      const res = await jwt.verify(inputs.token, secret);
      return true;
    } catch (e) {
      console.log('e', e);
      return false;
    }
  },
};
