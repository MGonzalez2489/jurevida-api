module.exports = {
  friendlyName: 'Export',

  description: 'Export movement.',

  inputs: {
    startDate: { type: 'string' },
    endDate: { type: 'string' },
    name: { type: 'string' },
    concept: { type: 'string' },
    type: { type: 'string' },
    assistantId: { type: 'string' },
  },

  exits: {},

  fn: async function (inputs) {
    const { startDate, endDate, name, concept, type, assistantId } = inputs;

    const movements = await MovementService.searchMovements(
      assistantId,
      startDate,
      endDate,
      name,
      concept,
      type
    );

    const file = await ExportCSVService.exportData(movements);
    return ApiService.response(this.res, file);
  },
};
