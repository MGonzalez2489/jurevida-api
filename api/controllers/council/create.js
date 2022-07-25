module.exports = {
  friendlyName: 'Create',

  description: 'Create council.',

  inputs: {
    user: { type: 'ref' },
  },

  exits: {},

  fn: async function (inputs) {
    const { user } = inputs;
    const sessionUser = this.req.session.user;

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
    user.createdBy = sessionUser.email;
    const newCouncil = _.clone(user.council);
    delete user.council;

    const contributions = _.clone(newCouncil.contributions);
    delete newCouncil.contributions;

    if (contributions === null || contributions.length === 0) {
      return this.res.badRequest(
        'Para registrar un miembro del consejo es necesario indicar una contribucion'
      );
    }

    const resNewUser = await User.create(user).fetch();

    const resNewCouncil = await CouncilProfile.create({
      user: resNewUser.id,
      publicId: '-',
      createdBy: sessionUser.email,
    }).fetch();
    await Contribution.create({
      contribution: contributions[0].contribution,
      council: resNewCouncil.id,
      publicId: '-',
      createdBy: sessionUser.email,
    }).fetch();
    //pendiente de enviar correo de verificacion
    return ApiService.response(this.res, resNewUser);
  },
};
