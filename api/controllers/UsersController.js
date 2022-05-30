/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getAll: async function (req, res) {
    const query = {};
    return ApiService.paginatePopulatedResponse(
      req,
      res,
      User,
      query,
      "roles",
      {}
    );
  },
  postUser: async function (req, res) {
    const u = {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      gender: "",
      address: "",
      roles: [],
      firstLogin: true, //lo seteamos aqui
    };

    if (!u.firstName) {
      return res.badRequest("Nombre de usuario es requerido.");
    }
    if (!u.lastName) {
      return res.badRequest("Apellido de usuario es requerido.");
    }
    if (u.roles.length < 1) {
      return res.badRequest("Al menos un rol es requerido para el usuario.");
    }

    const newPassword = Math.random().toString(36).slice(-8);

    u.firstLogin = true;
    //u.password =

    //1.- validar parametros del usuario:
    //  A) campos requeridos
    //  B) setear password min 8 digitos y encriptarlo
    //  C) mandar correo de bienvenida al usuario incluyendo las credenciales para el primer logueo
  },
};
