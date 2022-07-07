module.exports = {
  friendlyName: 'Validate token',

  description: '',

  inputs: {
    token: { type: 'string' },
  },

  exits: {},

  fn: async function (inputs) {
    // All done.
    const { token } = inputs;
    const isValid = await sails.helpers.validateToken(token);
    return ApiService.response(this.res, isValid);
  },
};
