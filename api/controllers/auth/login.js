module.exports = {
  friendlyName: 'Login',

  description: 'Login auth.',

  inputs: {
    email: { type: 'string' },
    password: { type: 'string' },
  },

  exits: {},

  fn: async function (inputs) {
    const { email, password } = inputs;

    if (!email || !password) {
      return this.res.badRequest();
    }

    const existingUser = await User.findOne({
      email: email,
      deletedBy: null,
      deletedAt: null,
    })
      .populate('council')
      .populate('sponsor')
      .populate('administrator')
      .populate('associated');

    if (!existingUser) {
      return this.res.badRequest('La cuenta no existe');
    }

    const isValidPassword = await EncriptService.compareEncriptedStrings(
      password,
      existingUser.password
    );

    if (!isValidPassword) {
      return this.res.badRequest('Usuario o contrasena incorrectos.');
    }

    const newToken = await sails.helpers.generateToken(existingUser.email);

    const loginResponse = {
      user: existingUser,
      token: newToken,
    };

    await AccessToken.validateAndCreate(newToken, existingUser.id);
    return ApiService.response(this.res, loginResponse);
  },
};
