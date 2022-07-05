module.exports = {
  friendlyName: 'Create',

  description: 'Create users.',

  inputs: {
    user: {
      type: any,
    },
  },

  exits: {},

  fn: async function (inputs) {
    console.log('entro al post de usuario');
    const { user } = inputs;

    console.log('user log', user);

    return true;
  },
};
