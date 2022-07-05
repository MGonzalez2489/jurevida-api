/**
 * AssociatedController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getAll: async function (req, res) {
    const { keyword } = req.allParams();
    const query = {
      deletedAt: null,
      deletedBy: null,
      associated: { '!=': null },
    };

    if (_.isNull(keyword) && keyword !== '') {
      query.or = [
        { email: { contains: keyword } },
        { firstName: { contains: keyword } },
        { lastName: { contains: keyword } },
        { phone: { contains: keyword } },
      ];
    }
    return ApiService.paginatePopulatedResponse(
      req,
      res,
      User,
      query,
      'associated',
      {}
    );
  },
};
