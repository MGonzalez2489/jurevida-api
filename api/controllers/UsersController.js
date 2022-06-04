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
    let results = await User.find(query).populate('roles');

    results = results.filter((f) => {
      return !f.roles.some((p) => p.name === 'root');
    });

    return ApiService.paginateCollection(req, res, results, null);
  },
  getOne: async function (req, res) {
    const { publicId } = req.allParams();
    const query = {
      publicId,
    };
    const user = await User.findOne(query).populate('roles');
    return ApiService.response(res, user);
  },

  postUser: async function (req, res) {
    const newUser = await User.generateModelNewUser(req);

    const existValidation = await User.validateNewUser(newUser);

    if (existValidation) {
      return res.badRequest(existValidation);
    }

    newUser.password = await sails.helpers.generatePassword();

    const resNewUser = await User.create(newUser).fetch();

    //aqui se envia el correo electronico para confirmar la creacion
    //de la cuenta e incluir la contrasena a ser cambiada

    return ApiService.response(res, resNewUser);
  },
  putUser: async function (req, res) {
    const { publicId } = req.allParams();
    const userToUpdate = await User.generateModelExistingUser(req);
    const updatedUser = await User.update({ publicId: publicId })
      .set(userToUpdate)
      .fetch();

    return ApiService.response(res, updatedUser);
  },
};
