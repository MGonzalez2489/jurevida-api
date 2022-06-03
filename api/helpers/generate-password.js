module.exports = {
  friendlyName: 'Generate password',

  description: '',

  inputs: {},

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function () {
    let password = Math.random().toString(36).slice(-8);

    if (process.env.NODE_ENV !== 'production') {
      password = '12345';
    }
    return password;
  },
};
