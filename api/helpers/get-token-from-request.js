module.exports = {
  friendlyName: 'Get token from request',

  description: '',

  inputs: {
    request: {
      type: 'ref',
    },
  },

  exits: {
    success: {
      outputFriendlyName: 'Token from request',
    },
  },

  fn: async function (inputs) {
    let token = inputs.request.headers.authorization;
    if (!token || token === '') {
      return null;
    }

    token = token.toString().replace('Bearer', '').trim();
    return token;
  },
};
