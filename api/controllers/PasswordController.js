/**
 * PasswordController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  resetPassword: async function (req, res) {
    const { password, publicId } = req.allParams();

    const encriptedPassword = await EncriptService.encriptString(password);

    const userToUpdate = await User.findOne({ publicId });

    if (!userToUpdate) {
      res.status(404).send('Not Found');
      return;
    }

    const updatedUser = await User.update({ publicId: publicId })
      .set({
        password: encriptedPassword,
        firstLogin: false,
      })
      .fetch();
    return ApiService.response(res, updatedUser[0]);
  },
};
