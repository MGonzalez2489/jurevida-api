/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getAll: async function (req, res) {
    const query = {};
    return ApiService.paginatePopulatedResponse(
      req,
      res,
      User,
      query,
      'roles',
      {}
    );
  },
  postUser: async function (req, res) {
    const newUser = User.generateModelFromRequest(req);

    const existValidation = User.validateNewUser(newUser);

    if (existValidation) {
      return res.badRequest(existValidation);
    }

    const newPassword = Math.random().toString(36).slice(-8);
    newUser.password = newPassword;

    const resNewUser = await User.create(newUser).fetch();

    //aqui se envia el correo electronico para confirmar la creacion
    //de la cuenta e incluir la contrasena a ser cambiada

    return ApiService.response(res, resNewUser);
  },
};
