/**
 * Usuario.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    email: {
      type: "string",
      description: "Email e identificador unico del usuario.",
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200,
      example: "carol.test@example.com",
    },
    password: {
      type: "string",
      protect: true,
      example: "2$28a8eabna301089103-13948134nad",
    },
    firstName: {
      type: "string",
      required: true,
      maxLength: 120,
      example: "Alejandra",
    },
    lastName: {
      type: "string",
      required: true,
      maxLength: 120,
      example: "Gonzalez",
    },
    phone: {
      type: "string",
      required: true,
      example: "6147894512",
    },
    gender: {
      type: "string",
      required: true,
      example: "masculino",
      isIn: ["masculino", "femenino"],
    },
    address: {
      type: "string",
      required: false,
    },
    firstLogin: {
      type: "boolean",
      required: false,
      defaultsTo: true,
      description:
        "When one user is created, they must to change the password on the first login",
    },
    resetPasswordToken: {
      type: "string",
      required: false,
      allowNull: true,
      description:
        "This value is used when the user request a reset password workflow",
    },
    roles: {
      collection: "Role",
      via: "users",
    },
  },
  beforeCreate: async function (valuesToSet, proceed) {
    valuesToSet.publicId = await sails.helpers.generateGuid();
    valuesToSet.password = await EncriptService.encriptString(
      valuesToSet.password
    );
    return proceed();
  },
  customToJSON: function () {
    return _.omit(this, [
      "id",
      "createdAt",
      "createdBy",
      "updatedAt",
      "updatedBy",
      "deletedAt",
      "deletedBy",
      "password",
    ]);
  },
  generateModelFromRequest: async function (req) {
    const newUser = req.body;
    newUser.firstLogin = true;
    newUser.publicId = "guid";
    return newUser;
  },
  validateNewUser: async function (newUser) {
    if (!newUser.firstName) {
      return "Nombre de usuario es requerido.";
    }
    if (!newUser.lastName) {
      return "Apellido de usuario es requerido.";
    }
    if (newUser.roles.length < 1) {
      return "Al menos un rol es requerido para el usuario.";
    }

    return null;
  },
};
