module.exports = {
  friendlyName: 'Create',

  description: 'Create contribution.',

  inputs: {
    publicId: { type: 'string' },
    contribution: { type: 'string' },
  },

  exits: {},

  fn: async function (inputs) {
    const { publicId, contribution } = inputs;
    const sessionUser = this.req.session.user;

    const user = await User.findOne({ publicId }).populate('council');

    const newContribution = await Contribution.create({
      contribution: contribution,
      council: user.council.id,
      createdBy: sessionUser.email,
      publicId: '-',
    }).fetch();
    return ApiService.response(this.res, newContribution);
  },
};
