module.exports = {
  friendlyName: 'Get bank',

  description: '',

  inputs: {},

  exits: {},

  fn: async function () {
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

    let currentPeriod = await FinancialPeriod.findOne(periodQuery);

    if (!currentPeriod) {
      return ApiService.response(this.res, null);
    }

    const isNewPeriod = await FinancialPeriod.validateAndCreate(false);
    currentPeriod = isNewPeriod ? isNewPeriod : currentPeriod;

    assistant.periods = [currentPeriod];
    return ApiService.response(this.res, assistant);
  },
};
