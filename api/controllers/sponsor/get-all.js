module.exports = {
  friendlyName: 'Get all',

  description: '',

  inputs: {
    keyword: { type: 'string' },
  },

  exits: {},

  fn: async function (inputs) {
    const { keyword } = inputs;

    const query = {
      deletedAt: null,
      deletedBy: null,
      sponsor: { '!=': null },
    };

    if (keyword && keyword !== '') {
      query.or = [
        { email: { contains: keyword } },
        { firstName: { contains: keyword } },
        { lastName: { contains: keyword } },
        { phone: { contains: keyword } },
      ];
    }

    return ApiService.paginateResponse(this.req, this.res, User, query, {});
  },
};
