/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  logIn: async function (req, res) {
    const { email, password } = req.allParams();
    const badRequestResponse = "El usuario o la contrasena no son correctos.";

    if (!email) {
      return res.badRequest("El email es requerido para la autenticacion.");
    }
    if (!password) {
      return res.badRequest(
        "La contrasena es requerida para la autenticación.)"
      );
    }

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.badRequest(badRequestResponse);
    }

    const isValidPassword = await EncriptService.compareEncriptedStrings(
      password,
      existingUser.password
    );

    if (!isValidPassword) {
      return res.badRequest(badRequestResponse);
    }

    const newToken = await sails.helpers.generateToken(existingUser.email);

    const loginResponse = {
      user: existingUser,
      token: newToken,
    };

    req.session[existingUser.id] = newToken;
    console.log("session", req.session);

    return ApiService.response(res, loginResponse);
  },
};
