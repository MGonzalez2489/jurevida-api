/**
 * AssociatedProfile.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    placeOfBirth: { type: 'string' },
    rfc: { type: 'string' },
    maritalStatus: { type: 'string' },
    profession: { type: 'string' },
    user: {
      model: 'User',
      unique: true,
    },
  },
  customToJSON: function () {
    return _.omit(this, [
      'id',
      'createdAt',
      'createdBy',
      'updatedAt',
      'updatedBy',
      'deletedAt',
      'deletedBy',
      'password',
      'user',
    ]);
  },
  beforeCreate: async function (valuesToSet, proceed) {
    valuesToSet.publicId = await sails.helpers.generateGuid();
    return proceed();
  },
};
