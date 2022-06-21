/**
 * SponsorProfile.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    nickName: {
      type: 'string',
      allowNull: true,
    },

    useNickName: {
      type: 'boolean',
      defaultsTo: false,
    },
    user: {
      model: 'User',
      unique: true,
    },
  },
  beforeCreate: async function (valuesToSet, proceed) {
    valuesToSet.publicId = await sails.helpers.generateGuid();
    return proceed();
  },
};
