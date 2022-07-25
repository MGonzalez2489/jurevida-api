module.exports = {
  friendlyName: 'Reset',

  description: 'Reset password.',

  inputs: {
    publicId: { type: 'string' },
    currentPassword: { type: 'string' },
    newPassword: { type: 'string' },
  },

  exits: {},

  fn: async function (inputs) {
    const { publicId, currentPassword, newPassword } = inputs;
    const sessionUser = req.session.user;

    const user = await User.findOne({ publicId });

    if (!user) {
      return this.res.notFound('Usuario inexistente');
    }

    const isValidCurrentPassword = await EncriptService.compareEncriptedStrings(
      currentPassword,
      user.password
    );

    if (!isValidCurrentPassword) {
      return this.res.badRequest('Password Incorrecto');
    }

    const encriptedPassword = await EncriptService.encriptString(newPassword);

    const updatedUser = await User.update({ publicId: publicId })
      .set({
        password: encriptedPassword,
        firstLogin: false,
        updatedBy: sessionUser.id,
      })
      .fetch();
    return ApiService.response(this.res, updatedUser[0]);
  },
};
