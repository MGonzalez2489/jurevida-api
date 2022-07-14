module.exports = {
  friendlyName: 'Export',

  description: 'Export movement.',

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    const movements = await FinancialMovement.find();

    const headers = [
      'id',
      'publicId',
      'createdAt',
      'createdBy',
      'updatedAt',
      'updatedBy',
      'deletedAt',
      'deletedBy',
      'type',
      'amount',
      'concept',
      'period',
      'sponsor',
      'oTSponsor',
    ];

    const file = await ExportCSVService.exportData(headers, movements);
    return ApiService.response(this.res, file);
  },
};
