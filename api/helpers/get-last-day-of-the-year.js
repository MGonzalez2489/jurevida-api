module.exports = {
  friendlyName: 'Get last day of the year',

  description: '',

  inputs: {},

  exits: {
    success: {
      outputFriendlyName: 'Last day of the year',
    },
  },

  fn: async function (inputs) {
    const currentYear = new Date().getFullYear();

    return new Date(currentYear, 11, 31);
  },
};
