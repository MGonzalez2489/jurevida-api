/**
 * AccessToken.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    user: {
      model: 'user',
      unique: true,
    },
    access_token: {
      type: 'string',
      required: true,
    },
    createdBy: false,
    updatedAt: false,
    updatedBy: false,
    deletedAt: false,
    deletedBy: false,
    publicId: false,
  },
  beforeCreate: async function (valuesToSet, proceed) {
    return proceed();
  },
  validateAndCreate: async function (token, userId) {
    await AccessToken.destroyOne({ user: userId });
    await AccessToken.create({ user: userId, access_token: token });
  },
};
