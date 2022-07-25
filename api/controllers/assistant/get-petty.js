module.exports = {
  friendlyName: 'Get One',

  description: '',

  inputs: {},

  exits: {},

  fn: async function () {
    const assistantQuery = {
      deletedBy: null,
      deletedAt: null,
      isPettyCash: true,
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

    const isNewPeriod = await FinancialPeriod.validateAndCreate(true);
    currentPeriod = isNewPeriod ? isNewPeriod : currentPeriod;

    assistant.periods = [currentPeriod];
    return ApiService.response(this.res, assistant);
  },
};
