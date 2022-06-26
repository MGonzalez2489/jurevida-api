/**
 * SponsorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
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

    const newSponsor = _.clone(newUser.sponsor);
    delete newUser.sponsor;

    if (
      newSponsor.useNickName &&
      (!newSponsor.nickName || newSponsor.nickName === '')
    ) {
      res.badRequest('Es necesario indicar un nickname si desea ser usado.');
    }

    //actions
    const resNewUser = await User.create(newUser).fetch();

    const resNewSponsor = await SponsorProfile.create({
      user: resNewUser.id,
      publicId: '-',
      useNickName: newSponsor.useNickName,
      nickName: newSponsor.nickName,
    }).fetch();

    await User.update({ id: resNewUser.id }).set({ sponsor: resNewSponsor.id });
    return ApiService.response(res, newUser);
  },
};
