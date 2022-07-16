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

  validateAndCreate: async function () {
    const bankAssistant = await FinancialAssistant.findOne({
      deletedAt: null,
      deletedBy: null,
      isPettyCash: false,
    });

    if (!bankAssistant) {
      return null;
    }

    const currentPeriod = await FinancialPeriod.findOne({
      deletedAt: null,
      deletedBy: null,
      active: true,
      assistant: bankAssistant.id,
    });

    const now = new Date().toISOString();
    if (now < currentPeriod.endDate) {
      return null;
    }
    await FinancialPeriod.update({
      id: currentPeriod.id,
      deletedAt: null,
      deletedBy: null,
      active: true,
      createdAt: currentPeriod.createdAt,
    }).set({
      active: false,
      endAmount: currentPeriod.endAmount,
    });

    const firstDayOfTheYear = await sails.helpers.getFirstDayOfTheYear();
    const lastDayOfTheYear = await sails.helpers.getLastDayOfTheYear();
    const newPeriod = await FinancialPeriod.create({
      startDate: firstDayOfTheYear,
      endDate: lastDayOfTheYear,
      startAmount: currentPeriod.currentAmount,
      currentAmount: currentPeriod.currentAmount,
      endAmount: 0,
      active: true,
      assistant: bankAssistant.id,
      publicId: '-',
    }).fetch();

    return newPeriod;
  },
};
