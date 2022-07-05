/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //getAll: async function (req, res) {
  //const { keyword, profile } = req.allParams();
  //let query = {
  //deletedAt: null,
  //deletedBy: null,
  //};

  //if (keyword && keyword !== '') {
  //query.or = [
  //{ email: { contains: keyword } },
  //{ firstName: { contains: keyword } },
  //{ lastName: { contains: keyword } },
  //{ phone: { contains: keyword } },
  //];
  //}
  //if (profile && profile !== '') {
  //query[profile] = { '!=': null };
  //}

  //return ApiService.paginateResponse(req, res, User, query, {});
  //},
  //getOne: async function (req, res) {
  //console.log('entro al controlleeeeer');
  //const { publicId } = req.allParams();
  //const query = {
  //publicId,
  //deletedAt: null,
  //deletedBy: null,
  //};
  //const user = await User.findOne(query)
  //.populate('council')
  //.populate('sponsor')
  //.populate('associated');

  //if (user.council) {
  //user.council.contributions = await Contribution.find({
  //council: user.council.id,
  //deletedAt: null,
  //deletedBy: null,
  //}).sort('createdAt desc');
  //}

  //return ApiService.response(res, user);
  //},
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

    if (userToUpdate.sponsor) {
      const sponsorUpdate = _.clone(userToUpdate.sponsor);
      await SponsorProfile.update({ publicId: sponsorUpdate.publicId }).set({
        useNickName: sponsorUpdate.useNickName,
        nickName: sponsorUpdate.nickName,
      });
      delete userToUpdate.sponsor;
    }
    if (userToUpdate.associated) {
      const associatedUpdate = _.clone(userToUpdate.associated);
      await AssociatedProfile.update({
        publicId: associatedUpdate.publicId,
      }).set({
        maritalStatus: associatedUpdate.maritalStatus,
      });
      delete userToUpdate.associated;
    }
    if (userToUpdate.council) {
      delete userToUpdate.council;
    }

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
