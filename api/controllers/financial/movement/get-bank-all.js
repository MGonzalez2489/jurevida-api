module.exports = {
  friendlyName: 'Get bank all',

  description: '',

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    const query = {
      deletedAt: null,
      deletedBy: null,
    };

    const assistant = await FinancialAssistant.findOne({
      deletedAt: null,
      deletedBy: null,
      isPettyCash: false,
    });

    if (!assistant) {
      return ApiService.paginateCollection(this.req, this.res, [], {});
    }

    const period = await FinancialPeriod.findOne({ assistant: assistant.id });

    if (!period) {
      return ApiService.paginateCollection(this.req, this.res, [], {});
    }

    query.period = period.id;

    return ApiService.paginateResponse(
      this.req,
      this.res,
      FinancialMovement,
      query,
      {}
    );
  },
};
