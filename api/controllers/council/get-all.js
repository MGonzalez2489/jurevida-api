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
      council: { '!=': null },
    };

    if (keyword && keyword !== '') {
      query.or = [
        { email: { contains: keyword } },
        { firstName: { contains: keyword } },
        { lastName: { contains: keyword } },
        { phone: { contains: keyword } },
      ];
    }
    const resUser = await User.find(query).populate('council');
    for await (let user of resUser) {
      const contributions = await Contribution.find({
        council: user.council.id,
        deletedAt: null,
        deletedBy: null,
      });
      user.council.contributions = contributions;
    }
    return ApiService.paginateCollection(this.req, this.res, resUser, {});
  },
};
