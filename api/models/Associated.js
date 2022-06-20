/**
 * Associated.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: { type: 'string' },
    placeOfBirth: { type: 'string' },
    rfc: { type: 'string' },
    maritalStatus: { type: 'string' },
    profession: { type: 'string' },
    phone: { type: 'string' },
    email: { type: 'string' },
    address: { type: 'string' },
    avatar: { type: 'string' },
  },
};
