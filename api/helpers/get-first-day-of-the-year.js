module.exports = {
  friendlyName: 'Get first day of the year',

  description: '',

  inputs: {},

  exits: {
    success: {
      outputFriendlyName: 'First day of the year',
    },
  },

  fn: async function (inputs) {
    const res = Date(new Date().getFullYear(), 0, 1, 0, 0, 001);
    return res;
  },
};
