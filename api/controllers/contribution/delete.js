module.exports = {
  friendlyName: 'Delete',

  description: 'Delete contribution.',

  inputs: {
    publicId: { type: 'string' },
  },

  exits: {},

  fn: async function (inputs) {
    const { publicId } = inputs;
    const user = this.req.session.user;
    console.log('user', user);
    await Contribution.update({ publicId: publicId })
      .set({
        deletedAt: new Date().toISOString(),
        deletedBy: user.email,
      })
      .fetch();

    return ApiService.response(this.res, true);
  },
};
