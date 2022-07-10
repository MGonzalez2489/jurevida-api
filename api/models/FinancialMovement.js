/**
 * FinancialMovement.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    type: {
      type: 'string',
      required: true,
      isIn: ['income', 'expense'],
    },
    amount: {
      type: 'number',
      required: true,
    },
    concept: {
      type: 'string',
      required: true,
    },
    // associations
    period: {
      model: 'FinancialPeriod',
    },
    sponsor: {
      model: 'user',
      required: false,
    },
    oTSponsor: {
      model: 'OneTimeSponsor',
      required: false,
    },
  },
  customToJSON: function () {
    return _.omit(this, [
      'id',
      'createdBy',
      'updatedAt',
      'updatedBy',
      'deletedAt',
      'deletedBy',
      'period',
    ]);
  },
  afterCreate: async function (movement, proceed) {
    const period = await FinancialPeriod.findOne({ id: movement.period });
    if (movement.type === 'income') {
      period.currentAmount += movement.amount;
    }
    if (movement.type === 'expense') {
      period.currentAmount -= movement.amount;
    }
    await FinancialPeriod.update({ id: period.id }).set({
      currentAmount: period.currentAmount,
    });

    return proceed();
  },
};
