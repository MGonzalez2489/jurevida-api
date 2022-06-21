/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getAll: async function (req, res) {
    const { keyword, profile } = req.allParams();
    let query = {
      deletedAt: '',
      deletedBy: '',
    };

    if (keyword && keyword !== '') {
      query.or = [
        { email: { contains: keyword } },
        { firstName: { contains: keyword } },
        { lastName: { contains: keyword } },
        { phone: { contains: keyword } },
      ];
    }
    if (profile && profile !== '' && profile !== 'todos') {
      if (profile === 'consejo') {
        query.council = { '!=': null };
      }
      if (profile === 'patrocinador') {
        query.sponsor = { '!=': null };
      }

      if (profile === 'asociado') {
        query.associated = { '!=': null };
      }
    }

    return ApiService.paginateResponse(req, res, User, query, {});
    //return ApiService.paginatePopulatedResponse(
    //req,
    //res,
    //User,
    //query,
    //null,
    //{}
    //);
    //if (keyword || keyword !== '') {
    //query = {
    //deletedAt: '',
    //deletedBy: '',
    //or: [
    //{ email: { contains: keyword } },
    //{ firstName: { contains: keyword } },
    //{ lastName: { contains: keyword } },
    //{ phone: { contains: keyword } },
    //],
    //};
    //}

    //let results = await User.find(query).populate('roles');

    //results = results.filter((f) => {
    //return !f.roles.some(
    //(p) => p.name === 'root' || p.name === 'administrador'
    //);
    //});

    //return ApiService.paginateCollection(req, res, results, null);
  },
  getOne: async function (req, res) {
    const { publicId } = req.allParams();
    const query = {
      publicId,
      deletedAt: '',
      deletedBy: '',
    };
    const user = await User.findOne(query).populate('roles');
    return ApiService.response(res, user);
  },
  postUser: async function (req, res) {
    const newUser = await User.generateModelNewUser(req);

    const usedEmail = await User.findOne({ email: newUser.email });

    if (usedEmail) {
      return res.badRequest(`La cuenta de correo ya se encuentra registrada`);
    }

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
    let updatedUser = await User.update({ publicId: publicId })
      .set(userToUpdate)
      .fetch();

    return ApiService.response(res, updatedUser[0]);
  },
  deleteUser: async function (req, res) {
    const { publicId } = req.allParams();
    const user = req.session.user;
    const deletedUser = await User.update({ publicId })
      .set({
        deletedAt: new Date().toISOString(),
        deletedBy: user.email,
      })
      .fetch();

    return ApiService.response(res, deletedUser[0]);
  },
};
