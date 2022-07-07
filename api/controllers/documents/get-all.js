module.exports = {
  friendlyName: 'Get all',

  description: '',

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    const query = {
      deletedAt: null,
      deletedBy: null,
    };

    return ApiService.paginateResponse(this.req, this.res, Document, query, {});
  },
};
