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
    nombres: {
      type: "string",
      required: true,
      maxLength: 120,
      example: "Alejandra",
    },
    apePaterno: {
      type: "string",
      required: true,
      maxLength: 120,
      example: "Gonzalez",
    },
    apeMaterno: {
      type: "string",
      required: true,
      maxLength: 120,
      example: "Carrasco",
    },
    birthday: {
      type: "string",
      required: true,
      example: "2015-10-08",
    },
    telefono: {
      type: "string",
      required: true,
      example: "6147894512",
    },
    genero: {
      type: "string",
      required: true,
      example: "masculino / femenino",
    },
    rol: {
      model: "Rol",
      required: true,
    },
  },
};
