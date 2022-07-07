module.exports = {
  friendlyName: 'Delete',

  description: 'Delete users.',

  inputs: {
    publicId: { type: 'string' },
  },

  exits: {},

  fn: async function (inputs) {
    const { publicId } = inputs;

    if (!publicId) {
      return this.res.badRequest('Usuario requerido');
    }

    const user = req.session.user;
    const deletedUser = await User.update({ publicId })
      .set({
        deletedAt: new Date().toISOString(),
        deletedBy: user.email,
      })
      .fetch();

    return ApiService.response(this.res, deletedUser[0]);
  },
};
