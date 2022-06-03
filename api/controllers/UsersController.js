/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getAll: async function (req, res) {
    const query = {
      deletedAt: '',
      deletedBy: '',
    };
    return ApiService.paginatePopulatedResponse(
      req,
      res,
      User,
      query,
      'roles',
      {}
    );
  },
  getOne: async function (req, res) {
    const { publicId } = req.allParams();
    const query = {
      publicId,
    };
    const user = await User.findOne(query);
    return ApiService.response(res, user);
  },

  postUser: async function (req, res) {
    //const newUser = await User.generateModelFromRequet(req);
    const newUser = await User.generateModelFromRequest(req);

    const existValidation = await User.validateNewUser(newUser);

    if (existValidation) {
      return res.badRequest(existValidation);
    }

    //newUser.password = await sails.helpers.generatePassword();

    const resNewUser = await User.create(newUser).fetch();

    //aqui se envia el correo electronico para confirmar la creacion
    //de la cuenta e incluir la contrasena a ser cambiada

    return ApiService.response(res, resNewUser);
  },
};
