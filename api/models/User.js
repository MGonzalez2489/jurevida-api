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
    birthday: {
      type: "string",
      required: true,
      example: "2015-10-08",
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
    roles: {
      collection: "Role",
      via: "users",
    },
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
};
