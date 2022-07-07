module.exports = {
  friendlyName: 'Get one',

  description: '',

  inputs: {
    publicId: { type: 'string' },
  },

  exits: {},

  fn: async function (inputs) {
    const { publicId } = inputs;
    const query = {
      publicId,
      deletedAt: null,
      deletedBy: null,
      council: { '!=': null },
    };
    const user = await User.findOne(query).populate('council');
    return ApiService.response(this.res, user);
  },
};
