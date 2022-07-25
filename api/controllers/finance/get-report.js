module.exports = {
  friendlyName: 'Get report',

  description: 'This action will generate a report for a specific assistant.',

  inputs: {
    isPettyCash: { type: 'boolean' },
    periodYear: {
      type: 'string',
      description: 'Year of the period to search by',
    },
    startDate: { type: 'string' },
    endDate: { type: 'string' },
    name: { type: 'string' },
    concept: { type: 'string' },
    type: { type: 'string' },
  },

  exits: {},

  fn: async function (inputs) {
    const { isPettyCash, periodYear, startDate, endDate, name, concept, type } =
      inputs;

    const paginationParams = {
      page: this.req.param('page'),
      perPage: this.req.param('perPage'),
      orderBy: this.req.param('orderBy'),
      orderDir: this.req.param('orderDir'),
    };

    const assistant = await FinancialAssistant.findOne({
      deletedBy: null,
      deletedAt: null,
      isPettyCash,
    });

    const periodQuery = {
      deletedBy: null,
      deletedAt: null,
      assistant: assistant.id,
    };
    if (periodYear && periodYear !== '') {
      const startDate = new Date(periodYear + 1, 0, 1, 1, 1, 1, 1);
      const endDate = new Date(periodYear, 11, 31, 23, 59, 59, 9999);
      periodQuery.startDate = { '>=': startDate };
      periodQuery.endDate = { '<=': endDate };
    }
    const period = await FinancialPeriod.findOne(periodQuery);

    const movementSearch = {
      assistantPublicId: assistant.publicId,
      startDate,
      endDate,
      name,
      concept,
      type,
      periodPublicId: period.publicId,
    };

    const movements = await MovementService.searchMovements(
      movementSearch.assistantPublicId,
      movementSearch.startDate,
      movementSearch.endDate,
      movementSearch.name,
      movementSearch.concept,
      movementSearch.type,
      movementSearch.periodPublicId
    );

    const allMovements = await MovementService.searchMovements(
      movementSearch.assistantPublicId,
      null,
      null,
      null,
      null,
      null,
      movementSearch.periodPublicId
    );

    const incomeMovements = allMovements.filter((f) => f.type === 'income');
    const expenseMovements = allMovements.filter((f) => f.type === 'expense');

    const response = {
      assistant: assistant.publicId,
      period: period.publicId,
      periodYear: new Date(period.startDate).getFullYear(),
      startAmount: period.startAmount,
      endAmount: period.endAmount,
      currentAmount: period.currentAmount,
      isCurrentPeriod: period.active,
      incomeCount: incomeMovements.length,
      expenseCount: expenseMovements.length,
      incomeTotalAmount: 0,
      expenseTotalAmount: 0,
      isPettyCash: assistant.isPettyCash,
      movements: PaginatorService.paginateCollection(
        movements,
        paginationParams
      ),
    };

    response.incomeTotalAmount = incomeMovements
      .map((item) => item.amount)
      .reduce((prev, curr) => prev + curr, 0);

    response.expenseTotalAmount = expenseMovements
      .map((item) => item.amount)
      .reduce((prev, curr) => prev + curr, 0);

    return ApiService.response(this.res, response);
  },
};
