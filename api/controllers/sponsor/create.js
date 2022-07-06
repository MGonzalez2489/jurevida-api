module.exports = {
  friendlyName: 'Create',

  description: 'Create sponsor.',

  inputs: {
    user: { type: 'ref' },
  },

  exits: {},

  fn: async function (inputs) {
    const { user } = inputs;

    const usedEmail = await User.findOne({ email: user.email });

    if (usedEmail) {
      return this.res.badRequest(
        `La cuenta de correo ya se encuentra registrada.`
      );
    }

    if (!user.firstName) {
      return this.res.badRequest('Nombre de usuario requerido.');
    }
    if (!user.lastName) {
      return this.res.badRequest('Apellido de usuario requerido.');
    }

    user.password = await sails.helpers.generatePassword();
    user.publicId = '-';

    if (!user.sponsor) {
      return this.res.badRequest('Patrocinador Invalido');
    }

    const newSponsor = _.clone(user.sponsor);
    delete user.sponsor;

    if (
      newSponsor.useNickName &&
      (!newSponsor.nickName || newSponsor.nickName === '')
    ) {
      this.res.badRequest(
        'Es necesario indicar un nickname si desea ser usado.'
      );
    }

    //actions
    const resNewUser = await User.create(user).fetch();

    const resNewSponsor = await SponsorProfile.create({
      user: resNewUser.id,
      publicId: '-',
      useNickName: newSponsor.useNickName,
      nickName: newSponsor.nickName,
    }).fetch();

    return ApiService.response(this.res, resNewUser);
  },
};
