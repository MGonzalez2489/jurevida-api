module.exports = {
  friendlyName: 'Get one',

  description: '',

  inputs: {
    publicId: { type: 'string' },
  },

  exits: {},

  fn: async function (inputs) {
    const { publicId } = inputs;

    if (!publicId) {
      return this.res.badRequest('Usuario requerido');
    }

    const query = {
      publicId,
      deletedAt: null,
      deletedBy: null,
    };

    const user = await User.findOne(query)
      .populate('council')
      .populate('sponsor')
      .populate('associated');

    if (user.council) {
      user.council.contributions = await Contribution.find({
        council: user.council.id,
        deletedAt: null,
        deletedBy: null,
      }).sort('createdAt desc');
    }

    return ApiService.response(this.res, user);
  },
};
