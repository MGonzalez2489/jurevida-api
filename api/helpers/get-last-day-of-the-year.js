module.exports = {
  friendlyName: 'Get last day of the year',

  description: '',

  inputs: {},

  exits: {
    success: {
      outputFriendlyName: 'Last day of the year',
    },
  },

  fn: async function () {
    const currentYear = new Date().getFullYear();

    return new Date(currentYear, 11, 31, 23, 59, 59, 999);
  },
};
