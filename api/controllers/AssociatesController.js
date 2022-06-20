/**
 * AssociatesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getAll: async function (req, res) {
    let query = {
      deletedAt: '',
      deletedBy: '',
    };

    return ApiService.paginateResponse(req, res, Associated, query, {});
  },
  getOne: async function (req, res) {
    const { publicId } = req.allParams();
    let query = {
      publicId,
      deletedAt: '',
      deletedBy: '',
    };
    const associated = await Associated.findOne(query);

    return ApiService.response(res, associated);
  },
};
