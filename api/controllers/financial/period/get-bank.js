module.exports = {
  friendlyName: 'Get bank',

  description: '',

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    const assistant = await FinancialAssistant.findOne({
      deletedAt: null,
      deletedBy: null,
      isPettyCash: false,
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
