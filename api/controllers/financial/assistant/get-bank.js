module.exports = {
  friendlyName: 'Get bank',

  description: '',

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    const assistantQuery = {
      deletedBy: null,
      deletedAt: null,
      isPettyCash: false,
    };

    const assistant = await FinancialAssistant.findOne(assistantQuery);

    if (!assistant) {
      return ApiService.response(this.res, null);
    }

    const periodQuery = {
      deletedAt: null,
      deletedBy: null,
      active: true,
      assistant: assistant.id,
    };

    const currentPeriod = await FinancialPeriod.findOne(periodQuery).populate(
      'movements'
    );
    assistant.periods = [currentPeriod];
    return ApiService.response(this.res, assistant);
  },
};
