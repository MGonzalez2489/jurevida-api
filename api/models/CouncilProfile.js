/**
 * CouncilProfile.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    user: {
      model: 'User',
      unique: true,
    },
    contributions: {
      collection: 'Contribution',
      via: 'council',
    },
  },
  customToJSON: function () {
    let result = _.omit(this, [
      'id',
      'createdBy',
      'updatedAt',
      'updatedBy',
      'deletedAt',
      'deletedBy',
      'password',
      'resetPasswordToken',
      'user',
    ]);
    return result;
  },
  beforeCreate: async function (valuesToSet, proceed) {
    valuesToSet.publicId = await sails.helpers.generateGuid();
    return proceed();
  },
  afterCreate: async function (council, proceed) {
    await User.update({ id: council.user }).set({ council: council.id });
    return proceed();
  },
};
