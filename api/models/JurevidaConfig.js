/**
 * JurevidaConfig.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    key: {
      type: 'string',
      required: true,
      unique: true,
    },
    value: {
      type: 'string',
      required: true,
    },
    publicId: false,
    createdAt: false,
    createdBy: false,
    updatedAt: false,
    updatedBy: false,
    deletedAt: false,
    deletedBy: false,
  },
  customToJSON: function () {},
  beforeCreate: function (valuesToSet, proceed) {
    return proceed();
  },
};
