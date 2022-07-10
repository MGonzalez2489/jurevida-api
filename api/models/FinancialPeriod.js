/**
 * FinancialPeriod.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    startDate: { type: 'string', required: true },
    endDate: { type: 'string', required: true },
    startAmount: { type: 'number', required: true },
    currentAmount: { type: 'number', required: true },
    endAmount: { type: 'number', required: true },

    active: { type: 'boolean', defaultsTo: false },
    assistant: { model: 'FinancialAssistant', required: true },
    movements: {
      collection: 'FinancialMovement',
      via: 'period',
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
      'assistant',
    ]);
  },
};
