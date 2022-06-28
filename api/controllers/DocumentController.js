/**
 * DocumentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getAll: async function (req, res) {
    const query = {
      deletedAt: null,
      deletedBy: null,
    };

    return ApiService.paginateResponse(req, res, Document, query, {});
  },
};
