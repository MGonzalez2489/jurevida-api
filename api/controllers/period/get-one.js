module.exports = {
  friendlyName: 'Get bank',

  description: '',

  inputs: {
    isPettyCash: { type: 'boolean' },
  },

  exits: {},

  fn: async function (inputs) {
    const { isPettyCash } = inputs;
    const assistant = await FinancialAssistant.findOne({
      deletedAt: null,
      deletedBy: null,
      isPettyCash,
    });

    if (!assistant) {
      return ApiService.response(this.res, null);
    }

    const period = await FinancialPeriod.findOne({
      deletedAt: null,
      deletedBy: null,
      assistant: assistant.id,
      active: true,
    });

    return ApiService.response(this.res, period);
  },
};
