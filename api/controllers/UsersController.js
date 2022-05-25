/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getAll: async function (req, res) {
    const query = {};
    //return ApiService.paginateResponse(req, res, User, query, {});
    return ApiService.paginatePopulatedResponse(
      req,
      res,
      User,
      query,
      "roles",
      {}
    );
  },
};
