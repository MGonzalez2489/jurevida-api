/**
 * Rol.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: "string",
      protect: true,
      example: "consejo",
      required: true,
    },
    displayName: {
      type: "string",
      protect: true,
      example: "Consejo",
      required: true,
    },
    users: {
      collection: "User",
      via: "roles",
    },
    createdAt: false,
    createdBy: false,
    updatedAt: false,
    updatedBy: false,
    deletedAt: false,
    deletedBy: false,
  },
};
