module.exports = {
  friendlyName: 'Get all',

  description: '',

  inputs: {
    keyword: { type: 'string' },
    profile: { type: 'string' },
  },

  exits: {},

  fn: async function (inputs) {
    const { keyword, profile } = inputs;

    const query = {
      deletedAt: null,
      deletedBy: null,
    };

    if (keyword && keyword !== '') {
      query.or = [
        { email: { contains: keyword } },
        { firstName: { contains: keyword } },
        { lastName: { contains: keyword } },
        { phone: { contains: keyword } },
      ];
    }
    if (profile && profile !== '') {
      query[profile] = { '!=': null };
    }

    return ApiService.paginateResponse(this.req, this.res, User, query, {});
  },
};
