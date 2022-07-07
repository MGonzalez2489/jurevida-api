module.exports = {
  friendlyName: 'Get all',

  description: '',

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    console.log('documents from action');
    const query = {
      deletedAt: null,
      deletedBy: null,
    };

    return ApiService.paginateResponse(this.req, this.res, Document, query, {});
  },
};
