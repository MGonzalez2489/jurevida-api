module.exports = {
  friendlyName: 'Get bank all',

  description: '',

  inputs: {
    startDate: { type: 'string' },
    endDate: { type: 'string' },
    name: { type: 'string' },
    concept: { type: 'string' },
    type: { type: 'string' },
  },

  exits: {},

  fn: async function (inputs) {
    const { startDate, endDate, name, concept, type } = inputs;

    const bankAssistant = await FinancialAssistant.findOne({
      deletedAt: null,
      deletedBy: null,
      isPettyCash: false,
    });

    if (!bankAssistant) {
      return ApiService.paginateCollection(this.req, this.res, [], {});
    }

    const period = await FinancialPeriod.findOne({
      assistant: bankAssistant.id,
      active: true,
      deletedAt: null,
      deletedBy: null,
    });

    const movements = await MovementService.searchMovements(
      bankAssistant.publicId,
      startDate,
      endDate,
      name,
      concept,
      type,
      period.publicId
    );

    return ApiService.paginateCollection(this.req, this.res, movements, {});
  },
};
