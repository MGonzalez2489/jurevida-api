/**
 * CouncilController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getAll: async function (req, res) {
    const { keyword } = req.allParams();
    const query = {
      deletedAt: null,
      deletedBy: null,
      council: { '!=': null },
    };

    if (_.isNull(keyword) && keyword !== '') {
      query.or = [
        { email: { contains: keyword } },
        { firstName: { contains: keyword } },
        { lastName: { contains: keyword } },
        { phone: { contains: keyword } },
      ];
    }

    return ApiService.paginateResponse(req, res, User, query, {});
  },

  getOne: async function (req, res) {
    const { publicId } = req.allParams();
    const query = {
      publicId,
      deletedAt: '',
      deletedBy: '',
      council: { '!=': null },
    };
    const user = await User.findOne(query).populate('council');
    return ApiService.response(res, user);
  },
  create: async function (req, res) {
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

    const newCouncil = _.clone(newUser.council);
    delete newUser.council;

    const contributions = _.clone(newCouncil.contributions);
    delete newCouncil.contributions;

    if (contributions === null || contributions.length === 0) {
      return res.badRequest(
        'Para registrar un miembro del consejo es necesario indicar una contribucion'
      );
    }

    //actions
    const resNewUser = await User.create(newUser).fetch();

    const resNewCouncil = await CouncilProfile.create({
      user: resNewUser.id,
      publicId: '-',
    }).fetch();
    const resContribution = await Contribution.create({
      contribution: contributions[0].contribution,
      council: resNewCouncil.id,
      publicId: '-',
    }).fetch();

    await User.update({ id: resNewUser.id }).set({ council: resNewCouncil.id });
    return ApiService.response(res, newUser);
  },
  putUser: async function (req, res) {
    const { publicId } = req.allParams();
    const userToUpdate = await User.generateModelExistingUser(req);
    let updatedUser = await User.update({ publicId: publicId })
      .set(userToUpdate)
      .fetch();

    return ApiService.response(res, updatedUser[0]);
  },
};
