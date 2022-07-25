/**
 * FinancialAssistant.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    bank: {
      type: 'string',
      allowNull: true,
    },
    accountNumber: {
      type: 'string',
      allowNull: true,
    },
    isPettyCash: {
      type: 'boolean',
      defaultsTo: false,
    },
    periods: {
      collection: 'FinancialPeriod',
      via: 'assistant',
    },
  },
};
